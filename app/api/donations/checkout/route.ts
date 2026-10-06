import { NextResponse } from "next/server";
import { randomUUID } from "node:crypto";
import { buildDonationCheckout } from "@/lib/donation-checkout";
import { parseDonationSelection } from "@/lib/donations";
import { FormRequestError, getClientIp, readLimitedJson } from "@/lib/form-security";
import { getDonationSiteOrigin, getStripe } from "@/lib/stripe";

export const runtime = "nodejs";

const attempts = new Map<string, { count: number; resetAt: number }>();
const windowMs = 10 * 60 * 1000;
let lastCleanup = 0;
function rateLimited(ip: string) {
  const now = Date.now();
  if (now - lastCleanup > windowMs) {
    attempts.forEach((value, key) => { if (value.resetAt <= now) attempts.delete(key); });
    lastCleanup = now;
  }
  const current = attempts.get(ip);
  if (current && current.resetAt > now) return ++current.count > 15;
  if (!current && attempts.size >= 10_000) return true;
  attempts.set(ip, { count: 1, resetAt: now + windowMs });
  return false;
}
const json = (body: Record<string, unknown>, status = 200) =>
  NextResponse.json(body, { status, headers: { "Cache-Control": "no-store" } });

export async function POST(request: Request) {
  let origin: string;
  try {
    origin = getDonationSiteOrigin();
    if (!process.env.STRIPE_SECRET_KEY || !process.env.STRIPE_WEBHOOK_SECRET) return json({ error: "unavailable" }, 503);
  } catch {
    return json({ error: "unavailable" }, 503);
  }
  if (request.headers.get("origin") !== origin) return json({ error: "forbidden" }, 403);
  if (rateLimited(getClientIp(request))) return json({ error: "rate_limited" }, 429);
  let selection;
  try {
    selection = parseDonationSelection(await readLimitedJson(request));
  } catch (error) {
    return json({ error: "invalid_request" }, error instanceof FormRequestError ? error.status : 400);
  }
  if (!selection) return json({ error: "invalid_amount" }, 400);
  try {
    const session = await getStripe().checkout.sessions.create(buildDonationCheckout(selection, origin), {
      idempotencyKey: `solea-donation-${selection.requestId}`
    });
    if (!session.url || new URL(session.url).origin !== "https://checkout.stripe.com") {
      throw new Error("Unexpected Checkout URL");
    }
    return json({ url: session.url });
  } catch {
    // Do not log Stripe error objects: they can include donor data or headers.
    const incident = randomUUID();
    console.error("Donation checkout failed", incident);
    return json({ error: "checkout_failed", incident }, 502);
  }
}
