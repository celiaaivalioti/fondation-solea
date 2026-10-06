import type Stripe from "stripe";
import nodemailer from "nodemailer";
import { readFile, mkdir, writeFile, unlink } from "node:fs/promises";
import path from "node:path";
import { donationStorePath, type DonationRecord } from "@/lib/donation-webhook";
import { attestationFromEvent, buildDonationAttestation, isDonationEmail, attestationAmount } from "@/lib/donation-attestation";

export function donationMailTransport() {
  const host = process.env.SMTP_HOST, user = process.env.SMTP_USER, pass = process.env.SMTP_PASSWORD;
  const port = Number(process.env.SMTP_PORT ?? 465);
  if (!host || !user || !pass || !Number.isInteger(port) || port < 1 || port > 65535) throw new Error("Donation email SMTP is not configured");
  return nodemailer.createTransport({
    host, port, secure: port === 465, requireTLS: port !== 465, auth: { user, pass },
    connectionTimeout: 10_000, greetingTimeout: 10_000, socketTimeout: 20_000,
    disableFileAccess: true, disableUrlAccess: true
  });
}

async function sent(file: string) {
  try { await readFile(file); return true; }
  catch (error) { if ((error as NodeJS.ErrnoException).code === "ENOENT") return false; throw error; }
}

export async function sendDonationAttestation(event: Stripe.Event, record: DonationRecord): Promise<"sent" | "already_sent" | "test_skipped"> {
  if (record.status !== "paid") throw new Error("Attestation requires a paid record");
  // Sandbox messages go only to an explicitly configured test mailbox.
  const testRecipient = process.env.STRIPE_DONATION_TEST_EMAIL;
  if (!record.livemode && !testRecipient) return "test_skipped";
  if (!record.livemode && testRecipient && !isDonationEmail(testRecipient)) throw new Error("Invalid donation test mailbox");
  if (!/^(?:cs|in)_[A-Za-z0-9_]+$/.test(record.resourceId)) throw new Error("Invalid donation resource ID");
  const directory = path.join(donationStorePath(), "attestations");
  await mkdir(directory, { recursive: true, mode: 0o700 });
  const prefix = `${record.livemode ? "live" : "test"}_${record.resourceId}`;
  const sentPath = path.join(directory, `${prefix}.sent.json`);
  const sendingPath = path.join(directory, `${prefix}.sending.json`);
  if (await sent(sentPath)) return "already_sent";
  // A shared on-disk claim protects simultaneous deliveries across processes.
  // It remains after an uncertain SMTP outcome/crash; never blindly resend it.
  try {
    await writeFile(sendingPath, JSON.stringify({ eventId: record.eventId, startedAt: new Date().toISOString() }), { mode: 0o600, flag: "wx" });
  } catch (error) {
    if ((error as NodeJS.ErrnoException).code === "EEXIST" && await sent(sentPath)) return "already_sent";
    throw error;
  }
  let smtpStarted = false;
  let delivered = false;
  try {
    // Recheck after acquiring the claim, in case a previous sender just finished.
    if (await sent(sentPath)) return "already_sent";
    const persisted = JSON.parse(await readFile(path.join(donationStorePath(), `paid_${record.resourceId}.json`), "utf8")) as DonationRecord;
    const data = attestationFromEvent(event, persisted);
    const pdf = await buildDonationAttestation(data);
    const from = process.env.SMTP_FROM ?? process.env.SMTP_USER ?? "";
    if (!isDonationEmail(from)) throw new Error("Invalid donation sender");
    const transport = donationMailTransport();
    const french = data.locale === "fr";
    const messageId = `<${data.reference.toLowerCase()}@fondation-solea.ch>`;
    const text = french
      ? `Bonjour ${data.name},\n\nMerci pour votre don de ${attestationAmount(data.amountMinor)} CHF et pour votre soutien à la Fondation Solea.\n\nVous trouverez votre attestation de don en PDF en pièce jointe.\n\nLes membres du Conseil de la Fondation Solea et toute l’équipe vous remercient chaleureusement.\n\nFondation Solea\ncontact@fondation-solea.ch\nwww.fondation-solea.ch`
      : `Hello ${data.name},\n\nThank you for your donation of CHF ${attestationAmount(data.amountMinor)} and for supporting the Solea Foundation.\n\nYour donation certificate, issued in French, is attached as a PDF.\n\nThe Foundation Board and the entire team warmly thank you.\n\nFondation Solea\ncontact@fondation-solea.ch\nwww.fondation-solea.ch`;
    smtpStarted = true;
    try {
      const info = await transport.sendMail({
        from: { name: "Fondation Solea", address: from },
        to: record.livemode ? data.email : testRecipient!,
        replyTo: "contact@fondation-solea.ch", messageId,
        subject: `${data.test ? "[TEST] " : ""}${french ? "Votre attestation de don - Fondation Solea" : "Your donation certificate - Fondation Solea"}`,
        text: data.test ? `TEST - Aucun paiement réel. Document sans valeur fiscale.\n\n${text}` : text,
        attachments: [{ filename: `${data.test ? "TEST-" : ""}attestation-don-${data.reference}.pdf`, content: pdf, contentType: "application/pdf" }],
        disableFileAccess: true, disableUrlAccess: true
      });
      if (!info.accepted?.length || info.rejected?.length) throw Object.assign(new Error("Donation email recipient rejected"), { responseCode: 550 });
      delivered = true;
    } finally { transport.close(); }
    await writeFile(sentPath, JSON.stringify({ reference: data.reference, messageId, sentAt: new Date().toISOString(), template: "v3", amountMinor: data.amountMinor, livemode: record.livemode }) + "\n", { mode: 0o600, flag: "wx" });
    return "sent";
  } catch (error) {
    // Explicit SMTP rejection is safe to retry. Connection/time-out failures can
    // happen after acceptance; retain the claim for operator reconciliation.
    const failure = error as { responseCode?: number; code?: string; command?: string };
    const code = failure.responseCode;
    const beforeData = ["EDNS", "EAUTH"].includes(failure.code ?? "") || ["CONN", "EHLO", "HELO", "STARTTLS", "MAIL FROM", "RCPT TO"].includes(failure.command ?? "");
    if (!delivered && (!smtpStarted || code && code >= 400 || beforeData)) await unlink(sendingPath);
    throw error;
  } finally {
    if (await sent(sentPath)) await unlink(sendingPath).catch(() => {});
  }
}
