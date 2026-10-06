import assert from "node:assert/strict";
import { afterEach, before, beforeEach, mock, test } from "node:test";
import nodemailer from "nodemailer";
import { sanityClient } from "@/lib/sanity";

// Mock CMS reads so endpoint tests stay offline with bundled defaults.
let POST: typeof import("@/app/api/forms/route").POST;
before(async () => { ({ POST } = await import("@/app/api/forms/route")); });
let messages: nodemailer.SendMailOptions[];
let send: (mail: nodemailer.SendMailOptions) => Promise<{ accepted: string[]; rejected: string[] }>;
let requestNumber = 0;
const values = { firstName: "Test", lastName: "Visitor", email: "visitor@example.com", phone: "+41 79 123 45 67", address: "Test address", message: "Private message must not be echoed" };
const request = (overrides = {}, origin = "https://preview.fondation-solea.ch") => new Request("https://preview.fondation-solea.ch/api/forms/", {
  method: "POST", headers: { "content-type": "application/json", origin, "x-real-ip": `test-${++requestNumber}` },
  body: JSON.stringify({ kind: "contact", locale: "fr", elapsedMs: 5000, values, ...overrides })
});
const envKeys = ["SMTP_HOST", "SMTP_PORT", "SMTP_USER", "SMTP_PASSWORD", "SMTP_FROM", "CONTACT_FORM_TO"];
let previous: Array<string | undefined>;
beforeEach(() => {
  previous = envKeys.map(key => process.env[key]);
  Object.assign(process.env, { SMTP_HOST: "mail.example.com", SMTP_PORT: "465", SMTP_USER: "foundation@example.com", SMTP_PASSWORD: "dummy", CONTACT_FORM_TO: "staff@example.com" });
  delete process.env.SMTP_FROM;
  messages = [];
  send = async mail => { messages.push(mail); return { accepted: [String(mail.to)], rejected: [] }; };
  mock.method(nodemailer, "createTransport", () => ({ sendMail: (mail: nodemailer.SendMailOptions) => send(mail), close() {} }));
  mock.method(console, "error", () => {});
  if (sanityClient) mock.method(sanityClient, "fetch", async () => ({}));
});
afterEach(() => {
  mock.restoreAll();
  envKeys.forEach((key, index) => { if (previous[index] === undefined) delete process.env[key]; else process.env[key] = previous[index]; });
});

test("contact sends foundation notification then French acknowledgement without echoing private content", async () => {
  const response = await POST(request());
  assert.equal(response.status, 200);
  assert.deepEqual(await response.json(), { ok: true, confirmation: "sent" });
  assert.equal(messages.length, 2);
  assert.equal(messages[0].to, "staff@example.com");
  assert.equal(messages[0].replyTo, values.email);
  assert.match(String(messages[0].text), /Private message/);
  assert.equal(messages[1].to, values.email);
  assert.match(messages[1].subject!, /Votre message/);
  assert.ok(!String(messages[1].text).includes(values.message));
  assert.equal(messages[1].replyTo, "contact@fondation-solea.ch");
});

test("English registration acknowledges receipt without confirming participation", async () => {
  assert.equal((await POST(request({ kind: "inscription", locale: "en" }))).status, 200);
  assert.equal(messages.length, 2);
  assert.match(messages[1].subject!, /application/);
  assert.match(String(messages[1].text), /does not confirm participation/);
  assert.ok(!String(messages[1].text).includes(values.address));
  assert.ok(!String(messages[1].text).includes(values.message));
});

test("foundation notification failure returns error and never acknowledges submission", async () => {
  send = async mail => { messages.push(mail); throw new Error("SMTP unavailable"); };
  assert.equal((await POST(request())).status, 500);
  assert.equal(messages.length, 1);
});

test("visitor acknowledgement failure preserves successful submission and reports partial success", async () => {
  send = async mail => {
    messages.push(mail);
    return messages.length === 1 ? { accepted: [String(mail.to)], rejected: [] } : { accepted: [], rejected: [String(mail.to)] };
  };
  const response = await POST(request());
  assert.equal(response.status, 200);
  assert.deepEqual(await response.json(), { ok: true, confirmation: "failed" });
  assert.equal(messages.length, 2);
});

test("recipient injection, cross-origin requests and honeypots send no emails", async () => {
  for (const email of ["visitor@example.com,other@example.com", "Visitor <visitor@example.com>", "visitor@example.com\r\nBcc:other@example.com"]) {
    assert.equal((await POST(request({ values: { ...values, email } }))).status, 400);
  }
  assert.equal((await POST(request({}, "https://unrelated.example"))).status, 403);
  assert.equal((await POST(request({ website: "bot" }))).status, 200);
  assert.equal(messages.length, 0);
});
