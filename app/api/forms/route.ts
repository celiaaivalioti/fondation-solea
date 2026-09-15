import { NextResponse } from "next/server";
import nodemailer from "nodemailer";
import { getCmsContent } from "@/lib/cms";
import { buildContactFields, buildRegistrationFields } from "@/lib/form-config";
import {
  FormRequestError,
  getClientIp,
  hasAllowedOrigin,
  isPlainRecord,
  normalizeFormValue,
  readLimitedJson
} from "@/lib/form-security";
import { isLocale, type Locale } from "@/lib/locales";

export const runtime = "nodejs";

const subjects = {
  contact: "Nouveau message via le site (formulaire de contact)",
  inscription: "Nouvelle demande d'inscription via le site"
} as const;

type FormKind = keyof typeof subjects;

// The set of possible fields is fixed in lib/form-config.ts; Sanity only
// toggles/relabels known fields. So the effective (name, label) pairs and the
// required list are derived from the editable config, but can never contain a
// field the code does not define — the endpoint stays a strict whitelist.
async function resolveForm(kind: FormKind, locale: Locale) {
  const content = await getCmsContent(locale);
  const built =
    kind === "contact"
      ? buildContactFields(content.contactForm)
      : buildRegistrationFields(content.registrationForm, locale);

  return { subject: subjects[kind], ...built };
}

// Rate limit: at most 5 submissions per IP per 10 minutes. In-memory is
// fine here — the site runs as a single Node process.
const RATE_LIMIT = 5;
const RATE_WINDOW_MS = 10 * 60 * 1000;
const MAX_RATE_LIMIT_KEYS = 10_000;
const submissionLog = new Map<string, { count: number; resetAt: number }>();
let lastRateLimitCleanup = 0;

function isRateLimited(ip: string): boolean {
  const now = Date.now();
  if (now - lastRateLimitCleanup >= RATE_WINDOW_MS) {
    submissionLog.forEach((entry, key) => {
      if (entry.resetAt <= now) {
        submissionLog.delete(key);
      }
    });
    lastRateLimitCleanup = now;
  }

  const current = submissionLog.get(ip);
  if (current && current.resetAt > now) {
    if (current.count >= RATE_LIMIT) {
      return true;
    }

    current.count += 1;
    return false;
  }

  if (!current && submissionLog.size >= MAX_RATE_LIMIT_KEYS) {
    return true;
  }

  submissionLog.set(ip, { count: 1, resetAt: now + RATE_WINDOW_MS });
  return false;
}

// Humans need at least a few seconds to fill a form; the client sends how
// long the form was open. Too-fast submissions get a retriable error (the
// form keeps its values), so a fast legitimate user just clicks again.
const MIN_FILL_TIME_MS = 3000;

const json = (body: Record<string, unknown>, status = 200, extraHeaders?: HeadersInit) =>
  NextResponse.json(body, {
    status,
    headers: {
      "Cache-Control": "no-store",
      ...extraHeaders
    }
  });

export async function POST(request: Request) {
  if (!hasAllowedOrigin(request)) {
    return json({ error: "forbidden" }, 403);
  }

  let payload: Record<string, unknown>;

  try {
    const parsed = await readLimitedJson(request);
    if (!isPlainRecord(parsed)) {
      return json({ error: "invalid request" }, 400);
    }
    payload = parsed;
  } catch (error) {
    const status = error instanceof FormRequestError ? error.status : 400;
    return json({ error: error instanceof Error ? error.message : "invalid request" }, status);
  }

  // Honeypot: real visitors never fill this hidden field.
  if (payload.website) {
    return json({ ok: true });
  }

  const ip = getClientIp(request);
  if (isRateLimited(ip)) {
    return json({ error: "too many requests" }, 429, { "Retry-After": "600" });
  }

  if (typeof payload.elapsedMs !== "number" || payload.elapsedMs < MIN_FILL_TIME_MS) {
    return json({ error: "too fast" }, 400);
  }

  if (
    (payload.kind !== "contact" && payload.kind !== "inscription") ||
    !isPlainRecord(payload.values)
  ) {
    return json({ error: "invalid request" }, 400);
  }

  const locale = typeof payload.locale === "string" && isLocale(payload.locale) ? payload.locale : "fr";
  const form = await resolveForm(payload.kind, locale);

  const values: Record<string, string> = {};
  try {
    for (const [name] of form.fields) {
      const value = normalizeFormValue(name, payload.values[name]);
      if (value) {
        values[name] = value;
      }
    }
  } catch (error) {
    return json(
      { error: error instanceof Error ? error.message : "invalid fields" },
      error instanceof FormRequestError ? error.status : 400
    );
  }

  for (const name of form.required) {
    if (!values[name]) {
      return json({ error: "missing fields" }, 400);
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
    return json({ error: "mail not configured" }, 500);
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
      text: `${lines.join("\n")}\n\n—\nEnvoyé depuis le formulaire du site fondation-solea.ch`,
      disableFileAccess: true,
      disableUrlAccess: true
    });
  } catch (error) {
    console.error("Form email failed to send:", error);
    return json({ error: "send failed" }, 500);
  }

  return json({ ok: true });
}
