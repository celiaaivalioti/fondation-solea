import { NextResponse } from "next/server";
import nodemailer from "nodemailer";

export const runtime = "nodejs";

// Per-form whitelist: only these fields ever end up in the email, so the
// endpoint cannot be used to send arbitrary content.
const forms = {
  contact: {
    subject: "Nouveau message via le site (formulaire de contact)",
    fields: [
      ["firstName", "Prénom"],
      ["lastName", "Nom"],
      ["email", "Email"],
      ["phone", "Téléphone"],
      ["message", "Message"]
    ],
    required: ["firstName", "lastName", "email", "message"]
  },
  inscription: {
    subject: "Nouvelle demande d'inscription via le site",
    // The health fields stay whitelisted so re-enabling them is just a matter
    // of flipping SHOW_HEALTH_FIELDS in RegistrationForm.tsx and restoring
    // them to `required` below — empty/absent fields are simply skipped in the
    // email.
    fields: [
      ["firstName", "Prénom"],
      ["lastName", "Nom"],
      ["email", "Email"],
      ["phone", "Téléphone"],
      ["address", "Adresse"],
      ["cancerType", "Type de cancer"],
      ["diagnosisDate", "Date du diagnostic"],
      ["inTreatment", "Actuellement en traitement"],
      ["treatmentType", "Type de traitement"],
      ["needsAssistance", "Besoin d'assistance particulière"],
      ["assistanceType", "Type d'assistance"]
    ],
    // Health fields temporarily not required (hidden on the form). To bring
    // them back, add "cancerType", "inTreatment", "needsAssistance" here again.
    required: ["firstName", "lastName", "email", "phone", "address"]
  }
} as const;

type FormKind = keyof typeof forms;

// Rate limit: at most 5 submissions per IP per 10 minutes. In-memory is
// fine here — the site runs as a single Node process.
const RATE_LIMIT = 5;
const RATE_WINDOW_MS = 10 * 60 * 1000;
const submissionLog = new Map<string, number[]>();

function isRateLimited(ip: string): boolean {
  const now = Date.now();
  const recent = (submissionLog.get(ip) ?? []).filter((t) => now - t < RATE_WINDOW_MS);

  if (recent.length >= RATE_LIMIT) {
    submissionLog.set(ip, recent);
    return true;
  }

  recent.push(now);
  submissionLog.set(ip, recent);

  if (submissionLog.size > 10_000) {
    submissionLog.forEach((times, key) => {
      if (times.every((t) => now - t >= RATE_WINDOW_MS)) {
        submissionLog.delete(key);
      }
    });
  }

  return false;
}

// Humans need at least a few seconds to fill a form; the client sends how
// long the form was open. Too-fast submissions get a retriable error (the
// form keeps its values), so a fast legitimate user just clicks again.
const MIN_FILL_TIME_MS = 3000;

export async function POST(request: Request) {
  let payload: {
    kind?: string;
    values?: Record<string, unknown>;
    website?: string;
    elapsedMs?: unknown;
  };

  try {
    payload = await request.json();
  } catch {
    return NextResponse.json({ error: "invalid request" }, { status: 400 });
  }

  // Honeypot: real visitors never fill this hidden field.
  if (payload.website) {
    return NextResponse.json({ ok: true });
  }

  const ip = (request.headers.get("x-forwarded-for") ?? "unknown").split(",")[0].trim();
  if (isRateLimited(ip)) {
    return NextResponse.json({ error: "too many requests" }, { status: 429 });
  }

  if (typeof payload.elapsedMs !== "number" || payload.elapsedMs < MIN_FILL_TIME_MS) {
    return NextResponse.json({ error: "too fast" }, { status: 400 });
  }

  const form = forms[payload.kind as FormKind];
  if (!form || typeof payload.values !== "object" || payload.values === null) {
    return NextResponse.json({ error: "invalid request" }, { status: 400 });
  }

  const values: Record<string, string> = {};
  for (const [name] of form.fields) {
    const value = payload.values[name];
    if (typeof value === "string" && value.trim() !== "") {
      values[name] = value.trim().slice(0, 5000);
    }
  }

  for (const name of form.required) {
    if (!values[name]) {
      return NextResponse.json({ error: "missing fields" }, { status: 400 });
    }
  }

  const smtpHost = process.env.SMTP_HOST;
  const smtpUser = process.env.SMTP_USER;
  const smtpPassword = process.env.SMTP_PASSWORD;
  const smtpFrom = process.env.SMTP_FROM ?? smtpUser;
  const smtpFromName = process.env.SMTP_FROM_NAME ?? "Site Fondation Solea";
  const recipient = process.env.CONTACT_FORM_TO ?? "contact@fondation-solea.ch";

  if (!smtpHost || !smtpUser || !smtpPassword) {
    console.error("Form submission received but SMTP is not configured (SMTP_HOST/SMTP_USER/SMTP_PASSWORD).");
    return NextResponse.json({ error: "mail not configured" }, { status: 500 });
  }

  const transporter = nodemailer.createTransport({
    host: smtpHost,
    port: Number(process.env.SMTP_PORT ?? 465),
    secure: Number(process.env.SMTP_PORT ?? 465) === 465,
    auth: { user: smtpUser, pass: smtpPassword }
  });

  const lines = form.fields
    .filter(([name]) => values[name])
    .map(([name, label]) => `${label} : ${values[name]}`);

  try {
    await transporter.sendMail({
      from: `"${smtpFromName}" <${smtpFrom}>`,
      to: recipient,
      replyTo: values.email,
      subject: form.subject,
      text: `${lines.join("\n")}\n\n—\nEnvoyé depuis le formulaire du site fondation-solea.ch`
    });
  } catch (error) {
    console.error("Form email failed to send:", error);
    return NextResponse.json({ error: "send failed" }, { status: 500 });
  }

  return NextResponse.json({ ok: true });
}
