import assert from "node:assert/strict";
import { randomUUID } from "node:crypto";
import { mkdtemp, readdir, readFile, rm, stat, writeFile } from "node:fs/promises";
import { tmpdir } from "node:os";
import path from "node:path";
import { test, mock, beforeEach, afterEach } from "node:test";
import nodemailer from "nodemailer";
import type Stripe from "stripe";
import { parseDonationAmount, parseDonationSelection, donationAmounts, DONATION_METADATA_KIND } from "@/lib/donations";
import { buildDonationCheckout } from "@/lib/donation-checkout";
import { donationRecordFromEvent, readStripeWebhookBody, saveDonationRecord } from "@/lib/donation-webhook";
import { getDonationStatus } from "@/lib/donation-status";
import { getDonationSiteOrigin, getStripe } from "@/lib/stripe";
import { POST as checkout } from "@/app/api/donations/checkout/route";
import { POST as webhook } from "@/app/api/stripe/webhook/route";

// Stripe and SMTP network calls are mocked; no payment or email is sent.
process.env.STRIPE_SECRET_KEY = "sk_test_dummy";
process.env.STRIPE_WEBHOOK_SECRET = "whsec_dummy";
process.env.STRIPE_SITE_URL = "https://preview.fondation-solea.ch";
const stripe = getStripe();
const smtpKeys = ["SMTP_HOST", "SMTP_PORT", "SMTP_USER", "SMTP_PASSWORD", "SMTP_FROM"];
let previousSmtp: Array<string | undefined>;
beforeEach(() => {
  previousSmtp = smtpKeys.map(key => process.env[key]);
  Object.assign(process.env, { SMTP_HOST: "mail.example.com", SMTP_PORT: "465", SMTP_USER: "foundation@example.com", SMTP_PASSWORD: "dummy" });
  delete process.env.SMTP_FROM;
  mock.method(nodemailer, "createTransport", () => ({
    sendMail: async (mail: nodemailer.SendMailOptions) => ({ accepted: [String(mail.to)], rejected: [] }),
    close() {}
  }));
});
afterEach(() => {
  mock.restoreAll();
  smtpKeys.forEach((key, index) => { if (previousSmtp[index] === undefined) delete process.env[key]; else process.env[key] = previousSmtp[index]; });
});
const origin = process.env.STRIPE_SITE_URL;
const sessionId = "cs_test_abcdefghijklmnop12345678";
const selection = (overrides = {}) => ({ amount: "100", frequency: "once", donorType: "individual", coverFees: false, locale: "fr", requestId: randomUUID(), ...overrides });
const paidSession = (overrides = {}) => ({ id: sessionId, object: "checkout.session", mode: "payment", payment_status: "paid", status: "complete", currency: "chf", amount_total: 10000, livemode: false, customer_details: { name: "Test Donor", email: "donor@example.com", address: { line1: "Test street 2", postal_code: "1205", city: "Genève", country: "CH" } }, metadata: { kind: DONATION_METADATA_KIND }, ...overrides });
const event = (type: string, object: unknown, overrides = {}) => ({ id: `evt_${randomUUID().replaceAll("-", "")}`, object: "event", api_version: "2026-08-26.dahlia", created: Math.floor(Date.now() / 1000), livemode: false, type, data: { object }, ...overrides } as Stripe.Event);
const checkoutRequest = (body = selection(), extraHeaders = {}) => new Request(`${origin}/api/donations/checkout/`, { method: "POST", headers: { "Content-Type": "application/json", origin, "x-real-ip": randomUUID(), ...extraHeaders }, body: JSON.stringify(body) });
const webhookRequest = (value: Stripe.Event, secret = "whsec_dummy", timestamp?: number) => {
  const payload = JSON.stringify(value);
  const header = stripe.webhooks.generateTestHeaderString({ payload, secret, ...(timestamp ? { timestamp } : {}) });
  return new Request(`${origin}/api/stripe/webhook/`, { method: "POST", headers: { "stripe-signature": header }, body: payload });
};

test("amounts enforce centimes and bounds; contribution is rounded and added transparently", () => {
  assert.equal(parseDonationAmount("1"), 100);
  assert.equal(parseDonationAmount("20.01"), 2001);
  assert.equal(parseDonationAmount("20,50"), 2050);
  assert.equal(parseDonationAmount("100000"), 10_000_000);
  for (const value of ["", "0.99", "100000.01", "1.001", "-1", "1e3", Infinity, NaN, {}, true]) assert.equal(parseDonationAmount(value), null);
  assert.deepEqual(donationAmounts(10000, true), { amountMinor: 10000, contributionMinor: 270, totalMinor: 10270 });
  assert.deepEqual(donationAmounts(100, true), { amountMinor: 100, contributionMinor: 3, totalMinor: 103 });
  assert.equal(donationAmounts(10000, false).totalMinor, 10000);
  for (const override of [{ frequency: "yearly" }, { donorType: "company", frequency: "monthly" }, { coverFees: "true" }, { locale: "de" }, { requestId: "fake" }]) assert.equal(parseDonationSelection(selection(override)), null);
});

test("one-time and recurring Checkout carry metadata, locale, safe return URLs and recurring contribution", () => {
  const oneTime = buildDonationCheckout(parseDonationSelection(selection({ donorType: "company" }))!, origin);
  assert.equal(oneTime.mode, "payment");
  assert.equal(oneTime.submit_type, "donate");
  assert.equal(oneTime.payment_intent_data?.metadata?.kind, DONATION_METADATA_KIND);
  assert.equal(oneTime.name_collection?.business?.optional, false);
  const monthly = buildDonationCheckout(parseDonationSelection(selection({ frequency: "monthly", coverFees: true, locale: "en" }))!, origin);
  assert.equal(monthly.mode, "subscription");
  assert.equal(monthly.submit_type, undefined);
  assert.equal(monthly.subscription_data?.metadata?.kind, DONATION_METADATA_KIND);
  assert.equal(monthly.line_items?.length, 2);
  assert.equal(monthly.line_items?.[1].price_data?.unit_amount, 270);
  for (const item of monthly.line_items!) assert.equal(item.price_data?.recurring?.interval, "month");
  assert.deepEqual(monthly.allowed_payment_method_types, ["card"]);
  assert.equal(monthly.success_url, `${origin}/en/nous-soutenir/merci/?session_id={CHECKOUT_SESSION_ID}`);
});

test("checkout validates origin and amount before using Stripe, reuses its idempotency key, and handles failures", async () => {
  const calls: Array<{ params: Stripe.Checkout.SessionCreateParams; key?: string }> = [];
  const createMock = mock.method(stripe.checkout.sessions, "create", async (params: Stripe.Checkout.SessionCreateParams, options: Stripe.RequestOptions) => {
    calls.push({ params, key: options.idempotencyKey });
    return { url: "https://checkout.stripe.com/c/pay/test" };
  });
  try {
    assert.equal((await checkout(checkoutRequest(selection(), { origin: "https://attacker.example" }))).status, 403);
    assert.equal((await checkout(checkoutRequest(selection({ amount: "1.001" })))).status, 400);
    assert.equal(calls.length, 0);
    const body = selection({ frequency: "monthly", coverFees: true });
    for (let i = 0; i < 2; i++) {
      const response = await checkout(checkoutRequest(body));
      assert.equal(response.status, 200);
      assert.equal((await response.json()).url, "https://checkout.stripe.com/c/pay/test");
    }
    assert.equal(calls[0].key, calls[1].key);
    assert.equal(calls[0].key, `solea-donation-${body.requestId}`);
    assert.equal(calls[0].params.mode, "subscription");
    createMock.mock.mockImplementation(async () => { throw new Error("dummy provider failure"); });
    assert.equal((await checkout(checkoutRequest())).status, 502);
    createMock.mock.mockImplementation(async () => ({ url: "https://attacker.example" }));
    assert.equal((await checkout(checkoutRequest())).status, 502);
    const secret = process.env.STRIPE_WEBHOOK_SECRET;
    delete process.env.STRIPE_WEBHOOK_SECRET;
    try { assert.equal((await checkout(checkoutRequest())).status, 503); }
    finally { process.env.STRIPE_WEBHOOK_SECRET = secret; }
  } finally { createMock.mock.restore(); }
});

test("checkout rate limits repeated attempts", async () => {
  const ip = randomUUID();
  for (let i = 0; i < 15; i++) assert.equal((await checkout(checkoutRequest(selection({ amount: "0" }), { "x-real-ip": ip }))).status, 400);
  assert.equal((await checkout(checkoutRequest(selection(), { "x-real-ip": ip }))).status, 429);
});

test("webhook verifies signatures, ignores unpaid/unrelated events, and records duplicate payments atomically", async () => {
  const directory = await mkdtemp(path.join(tmpdir(), "solea-webhook-"));
  process.env.STRIPE_DONATION_STORE_PATH = directory;
  try {
    assert.equal((await webhook(webhookRequest(event("checkout.session.completed", paidSession()), "wrong-secret"))).status, 400);
    assert.equal((await webhook(webhookRequest(event("checkout.session.completed", paidSession()), "whsec_dummy", 1))).status, 400);
    const tampered = webhookRequest(event("checkout.session.completed", paidSession()));
    const changed = new Request(tampered.url, { method: "POST", headers: tampered.headers, body: (await tampered.text()).replace('"paid"', '"unpaid"') });
    assert.equal((await webhook(changed)).status, 400);
    const unrelated = event("checkout.session.completed", paidSession({ metadata: { kind: "other" } }));
    assert.equal((await webhook(webhookRequest(unrelated))).status, 200);
    assert.equal((await webhook(webhookRequest(event("checkout.session.completed", paidSession({ payment_status: "unpaid" }))))).status, 200);
    assert.deepEqual(await readdir(directory), []);
    const payment = event("checkout.session.completed", paidSession());
    const responses = await Promise.all([webhook(webhookRequest(payment)), webhook(webhookRequest(payment)), webhook(webhookRequest({ ...payment, id: "evt_same_payment_different_event" }))]);
    assert.ok(responses.some(response => response.status === 200));
    assert.ok(responses.every(response => [200, 500].includes(response.status)));
    const files = (await readdir(directory)).filter(file => file.startsWith("paid_"));
    assert.deepEqual(files, [`paid_${sessionId}.json`]);
    const record = JSON.parse(await readFile(path.join(directory, files[0]), "utf8"));
    assert.equal(record.amountMinor, 10000);
    assert.equal(record.status, "paid");
    assert.equal(record.customer_details, undefined);
    assert.equal((await stat(path.join(directory, files[0]))).mode & 0o777, 0o600);
  } finally { await rm(directory, { recursive: true, force: true }); }
});

test("monthly gifts are recorded from invoices once, with renewal failures and cancellation handled", () => {
  assert.equal(donationRecordFromEvent(event("checkout.session.completed", paidSession({ mode: "subscription" }))), null);
  const invoice = { id: "in_monthly", amount_paid: 5135, amount_due: 5135, currency: "chf", status: "paid", parent: { subscription_details: { metadata: { kind: DONATION_METADATA_KIND } } } };
  const paid = donationRecordFromEvent(event("invoice.paid", invoice));
  assert.equal(paid?.frequency, "monthly");
  assert.equal(paid?.amountMinor, 5135);
  assert.equal(paid?.status, "paid");
  assert.equal(donationRecordFromEvent(event("invoice.payment_failed", { ...invoice, status: "open", amount_paid: 0 }))?.status, "failed");
  assert.equal(donationRecordFromEvent(event("invoice.paid", { ...invoice, parent: null })), null);
  assert.equal(donationRecordFromEvent(event("customer.subscription.deleted", { id: "sub_monthly", metadata: { kind: DONATION_METADATA_KIND } }))?.status, "cancelled");
  assert.equal(donationRecordFromEvent(event("checkout.session.async_payment_failed", paidSession({ payment_status: "unpaid" })))?.status, "failed");
});

test("storage failures return 500 for Stripe retries; recovery saves the payment", async () => {
  const directory = await mkdtemp(path.join(tmpdir(), "solea-storage-"));
  const blocker = path.join(directory, "blocked");
  await writeFile(blocker, "file, not a directory");
  process.env.STRIPE_DONATION_STORE_PATH = blocker;
  const payment = event("checkout.session.completed", paidSession());
  try {
    assert.equal((await webhook(webhookRequest(payment))).status, 500);
    process.env.STRIPE_DONATION_STORE_PATH = path.join(directory, "recovered");
    assert.equal((await webhook(webhookRequest(payment))).status, 200);
    assert.deepEqual((await readdir(process.env.STRIPE_DONATION_STORE_PATH)).filter(file => file.startsWith("paid_")), [`paid_${sessionId}.json`]);
    await assert.rejects(saveDonationRecord({ ...donationRecordFromEvent(payment)!, resourceId: "../../escape" }));
  } finally { await rm(directory, { recursive: true, force: true }); }
});

test("webhook body limits work even without a Content-Length", async () => {
  await assert.rejects(readStripeWebhookBody(new Request(`${origin}/api/stripe/webhook/`, { method: "POST", body: "x".repeat(512 * 1024 + 1) })));
});

test("confirmation uses Stripe's payment status, rejects forged IDs, and exposes no donor details", async () => {
  const retrieveMock = mock.method(stripe.checkout.sessions, "retrieve", async () => paidSession());
  try {
    assert.deepEqual(await getDonationStatus(sessionId, false), { state: "paid", amountMinor: 10000, monthly: false, test: true });
    retrieveMock.mock.mockImplementation(async () => paidSession({ payment_status: "unpaid" }));
    assert.equal((await getDonationStatus(sessionId, false)).state, "pending");
    retrieveMock.mock.mockImplementation(async () => paidSession({ metadata: {} }));
    assert.equal((await getDonationStatus(sessionId, false)).state, "unavailable");
    assert.deepEqual(await getDonationStatus("fake", false), { state: "unavailable" });
    assert.deepEqual(await getDonationStatus(undefined, true), { state: "cancelled" });
    retrieveMock.mock.mockImplementation(async () => { throw new Error("connection failed"); });
    assert.equal((await getDonationStatus(sessionId, false)).state, "unavailable");
  } finally { retrieveMock.mock.restore(); }
});

test("return URL origin comes only from trusted configuration", () => {
  process.env.STRIPE_SITE_URL = "https://preview.fondation-solea.ch/path";
  assert.equal(getDonationSiteOrigin(), origin);
  process.env.STRIPE_SITE_URL = "https://user:password@example.com";
  assert.throws(getDonationSiteOrigin);
  process.env.STRIPE_SITE_URL = origin;
});
