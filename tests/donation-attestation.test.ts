import assert from "node:assert/strict";
import { afterEach, beforeEach, mock, test } from "node:test";
import { mkdtemp, readFile, readdir, rm, stat } from "node:fs/promises";
import { tmpdir } from "node:os";
import path from "node:path";
import nodemailer from "nodemailer";
import type Stripe from "stripe";
import { PDFDocument } from "pdf-lib";
import { attestationFromEvent, buildDonationAttestation } from "@/lib/donation-attestation";
import { donationRecordFromEvent } from "@/lib/donation-webhook";
import { getStripe } from "@/lib/stripe";
import { POST as webhook } from "@/app/api/stripe/webhook/route";

process.env.STRIPE_SECRET_KEY = "sk_test_dummy";
process.env.STRIPE_WEBHOOK_SECRET = "whsec_dummy";
const stripe = getStripe();
let directory: string;
let messages: nodemailer.SendMailOptions[];
let send: (mail: nodemailer.SendMailOptions) => Promise<{ accepted: string[]; rejected: string[] }>;
const envKeys = ["STRIPE_DONATION_STORE_PATH", "STRIPE_DONATION_TEST_EMAIL", "SMTP_HOST", "SMTP_USER", "SMTP_PASSWORD", "SMTP_FROM", "SMTP_PORT"];
let previous: Array<string | undefined>;
const details = { individual_name: "Élodie Müller", business_name: "Atelier Espérance SA", name: "Billing name", email: "donor@example.com", address: { line1: "Rue de l’Aubépine 2", line2: null, postal_code: "1205", city: "Genève", state: null, country: "CH" } };
const payment = (overrides = {}) => ({ id: "cs_test_certificate", mode: "payment", currency: "chf", payment_status: "paid", amount_total: 10270, customer_details: details, metadata: { kind: "solea_donation", donor_type: "individual", locale: "fr" }, ...overrides });
const event = (type = "checkout.session.completed", object: unknown = payment(), overrides = {}) => ({ id: "evt_certificate", object: "event", api_version: "2026-08-26.dahlia", created: 1791288000, livemode: false, type, data: { object }, ...overrides } as Stripe.Event);
const request = (value: Stripe.Event) => {
  const payload = JSON.stringify(value);
  return new Request("https://preview.fondation-solea.ch/api/stripe/webhook/", { method: "POST", headers: { "stripe-signature": stripe.webhooks.generateTestHeaderString({ payload, secret: "whsec_dummy" }) }, body: payload });
};

beforeEach(async () => {
  previous = envKeys.map(key => process.env[key]);
  directory = await mkdtemp(path.join(tmpdir(), "solea-attestation-"));
  process.env.STRIPE_DONATION_STORE_PATH = directory;
  process.env.STRIPE_DONATION_TEST_EMAIL = "tester@example.com";
  process.env.SMTP_HOST = "mail.example.com";
  process.env.SMTP_PORT = "465";
  process.env.SMTP_USER = "foundation@example.com";
  process.env.SMTP_PASSWORD = "dummy";
  delete process.env.SMTP_FROM;
  messages = [];
  send = async mail => { messages.push(mail); return { accepted: [String(mail.to)], rejected: [] }; };
  mock.method(nodemailer, "createTransport", () => ({ sendMail: (mail: nodemailer.SendMailOptions) => send(mail), close() {} }));
});
afterEach(async () => {
  mock.restoreAll();
  envKeys.forEach((key, i) => { if (previous[i] === undefined) delete process.env[key]; else process.env[key] = previous[i]; });
  await rm(directory, { recursive: true, force: true });
});

test("certificate uses collected individual/company identity and actual paid total including contribution", async () => {
  const value = event();
  const data = attestationFromEvent(value, donationRecordFromEvent(value)!);
  assert.equal(data.name, "Élodie Müller");
  assert.deepEqual(data.address, ["Rue de l’Aubépine 2", "1205 Genève", "Suisse"]);
  assert.equal(data.amountMinor, 10270);
  assert.equal(data.test, true);
  const company = event(undefined, payment({ metadata: { kind: "solea_donation", donor_type: "company" } }));
  assert.equal(attestationFromEvent(company, donationRecordFromEvent(company)!).name, "Atelier Espérance SA");
  const pdf = await PDFDocument.load(await buildDonationAttestation(data));
  assert.equal(pdf.getPageCount(), 1);
  assert.match(pdf.getTitle()!, /^TEST - Attestation de dons/);
  assert.ok(Math.abs(pdf.getPage(0).getWidth() - 595.28) < 0.1);
});

test("sandbox emails donor with test PDF even without test mailbox, and deduplicates across events", async () => {
  const value = event();
  delete process.env.STRIPE_DONATION_TEST_EMAIL;
  assert.equal((await webhook(request(value))).status, 200);
  assert.equal(messages.length, 1);
  assert.equal(messages[0].to, details.email);
  assert.match(messages[0].subject!, /^\[TEST\]/);
  assert.match(String(messages[0].text), /sans valeur fiscale/);
  assert.equal(messages[0].attachments?.[0].contentType, "application/pdf");
  const attached = await PDFDocument.load(messages[0].attachments![0].content as Buffer);
  assert.equal(attached.getPageCount(), 1);
  assert.equal((await webhook(request({ ...value, id: "evt_other", created: value.created + 86400 }))).status, 200);
  assert.equal((await webhook(request({ ...value, type: "checkout.session.async_payment_succeeded" } as Stripe.Event))).status, 200);
  assert.equal(messages.length, 1);
  const sentFiles = await readdir(path.join(directory, "attestations"));
  assert.equal(sentFiles.length, 1);
  const marker = await readFile(path.join(directory, "attestations", sentFiles[0]), "utf8");
  assert.ok(!marker.includes(details.email) && !marker.includes(details.individual_name));
  assert.equal((await stat(path.join(directory, "attestations", sentFiles[0]))).mode & 0o777, 0o600);
  // The legacy setting must never redirect a donor's attestation anymore.
  process.env.STRIPE_DONATION_TEST_EMAIL = "tester@example.com";
  const second = event(undefined, payment({ id: "cs_test_second_donor" }));
  assert.equal((await webhook(request(second))).status, 200);
  assert.equal(messages.length, 2);
  assert.equal(messages[1].to, details.email);
  assert.equal(messages[1].attachments?.[0].contentType, "application/pdf");
});

test("live certificates go to donor, with stable message ID; simultaneous webhooks cannot send twice", async () => {
  const value = event(undefined, undefined, { livemode: true });
  const responses = await Promise.all([webhook(request(value)), webhook(request(value)), webhook(request(value))]);
  assert.ok(responses.some(response => response.status === 200));
  assert.ok(responses.every(response => [200, 500].includes(response.status)));
  assert.equal(messages.length, 1);
  assert.equal(messages[0].to, details.email);
  assert.ok(!messages[0].subject!.includes("TEST"));
  assert.match(messages[0].messageId!, /^<solea-[a-f0-9]+@fondation-solea\.ch>$/);
  const pdf = await PDFDocument.load(messages[0].attachments![0].content as Buffer);
  assert.equal(pdf.getPageCount(), 1);
  assert.ok(!pdf.getTitle()!.includes("TEST"));
  assert.equal((await webhook(request(value))).status, 200);
  assert.equal(messages.length, 1);
});

test("monthly certificates use invoice billing snapshot and paid date, with one PDF per invoice", async () => {
  const invoice = { id: "in_certificate_first", status: "paid", amount_paid: 5135, currency: "chf", customer_name: "Élodie Müller", customer_email: details.email, customer_address: details.address, status_transitions: { paid_at: 1791287000 }, parent: { subscription_details: { metadata: { kind: "solea_donation", locale: "en" } } } };
  const value = event("invoice.paid", invoice);
  const data = attestationFromEvent(value, donationRecordFromEvent(value)!);
  assert.equal(data.paidAt, 1791287000);
  assert.equal(data.locale, "en");
  assert.equal((await webhook(request(value))).status, 200);
  assert.equal((await webhook(request(value))).status, 200);
  assert.equal(messages.length, 1);
  assert.equal(messages[0].to, details.email);
  assert.equal(messages[0].attachments?.[0].contentType, "application/pdf");
  assert.match(String(messages[0].text), /issued in French/);
  assert.equal((await webhook(request(event("invoice.paid", { ...invoice, id: "in_certificate_renewal" })))).status, 200);
  assert.equal(messages.length, 2);
  assert.equal(messages[1].to, details.email);
  assert.equal(messages[1].attachments?.[0].contentType, "application/pdf");
  assert.notEqual(messages[0].messageId, messages[1].messageId);
  assert.equal((await webhook(request(event(undefined, payment({ mode: "subscription" }))))).status, 200);
  assert.equal((await webhook(request(event("invoice.payment_failed", { ...invoice, status: "open", amount_paid: 0 })))).status, 200);
  assert.equal((await webhook(request(event(undefined, payment({ payment_status: "unpaid" }))))).status, 200);
  assert.equal(messages.length, 2);
});

test("SMTP rejection returns 500 and retry sends even though payment already persisted", async () => {
  const value = event();
  send = async () => { throw Object.assign(new Error("SMTP rejected"), { responseCode: 451 }); };
  assert.equal((await webhook(request(value))).status, 500);
  assert.ok((await readdir(directory)).includes("paid_cs_test_certificate.json"));
  assert.deepEqual(await readdir(path.join(directory, "attestations")), []);
  send = async mail => { messages.push(mail); return { accepted: [String(mail.to)], rejected: [] }; };
  assert.equal((await webhook(request(value))).status, 200);
  assert.equal(messages.length, 1);
});

test("missing SMTP or donor details fail before send and can recover on replay", async () => {
  const value = event();
  delete process.env.SMTP_PASSWORD;
  assert.equal((await webhook(request(value))).status, 500);
  assert.equal(messages.length, 0);
  process.env.SMTP_PASSWORD = "dummy";
  for (const email of ["", "donor@example.com,other@example.com"]) {
    const invalidRecipient = event(undefined, payment({ customer_details: { ...details, email } }));
    assert.equal((await webhook(request(invalidRecipient))).status, 500);
    assert.equal(messages.length, 0);
  }
  const incomplete = event(undefined, payment({ customer_details: { ...details, address: null } }));
  assert.equal((await webhook(request(incomplete))).status, 500);
  assert.equal(messages.length, 0);
  assert.equal((await webhook(request(value))).status, 200);
  assert.equal(messages.length, 1);
});

test("ambiguous SMTP timeout preserves sending claim for manual reconciliation and never blindly resends", async () => {
  let attempts = 0;
  send = async () => { attempts++; throw Object.assign(new Error("Lost SMTP response"), { code: "ETIMEDOUT" }); };
  const value = event();
  assert.equal((await webhook(request(value))).status, 500);
  assert.equal((await webhook(request(value))).status, 500);
  assert.equal(attempts, 1);
  assert.deepEqual(await readdir(path.join(directory, "attestations")), ["test_cs_test_certificate.sending.json"]);
});

test("connection failures before SMTP DATA are safe to retry", async () => {
  const value = event();
  send = async () => { throw Object.assign(new Error("Connection timeout"), { code: "ETIMEDOUT", command: "CONN" }); };
  assert.equal((await webhook(request(value))).status, 500);
  assert.deepEqual(await readdir(path.join(directory, "attestations")), []);
  send = async mail => { messages.push(mail); return { accepted: [String(mail.to)], rejected: [] }; };
  assert.equal((await webhook(request(value))).status, 200);
  assert.equal(messages.length, 1);
});

test("no zero-value certificates; unsupported names fail visibly instead of corrupting the PDF", async () => {
  const zero = event(undefined, payment({ amount_total: 0 }));
  assert.throws(() => attestationFromEvent(zero, donationRecordFromEvent(zero)!));
  assert.equal((await webhook(request(zero))).status, 200);
  assert.equal(messages.length, 0);
  const value = event();
  const data = attestationFromEvent(value, donationRecordFromEvent(value)!);
  await assert.rejects(buildDonationAttestation({ ...data, name: "王" }), /Unsupported character/);
  const long = await PDFDocument.load(await buildDonationAttestation({ ...data, name: "Société " + "É".repeat(200), address: [...data.address, "Unité " + "A".repeat(200)] }));
  assert.ok(long.getPageCount() >= 1);
});
