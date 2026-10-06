import { NextResponse } from "next/server";
import { getStripe } from "@/lib/stripe";
import { donationRecordFromEvent, readStripeWebhookBody, saveDonationRecord } from "@/lib/donation-webhook";
import { sendDonationAttestation } from "@/lib/donation-email";

export const runtime = "nodejs";
const json = (body: Record<string, unknown>, status = 200) =>
  NextResponse.json(body, { status, headers: { "Cache-Control": "no-store" } });

export async function POST(request: Request) {
  const webhookSecret = process.env.STRIPE_WEBHOOK_SECRET;
  if (!webhookSecret || !process.env.STRIPE_SECRET_KEY) return json({ error: "unavailable" }, 503);
  const signature = request.headers.get("stripe-signature");
  if (!signature) return json({ error: "invalid_signature" }, 400);
  let event;
  try {
    // Stripe's signature must be checked against the unmodified raw body.
    event = getStripe().webhooks.constructEvent(await readStripeWebhookBody(request), signature, webhookSecret);
  } catch {
    return json({ error: "invalid_signature" }, 400);
  }
  try {
    const record = donationRecordFromEvent(event);
    if (record) {
      await saveDonationRecord(record);
      // Delivery is retried even when the payment record already exists.
      if (record.status === "paid" && record.amountMinor !== null && record.amountMinor > 0) await sendDonationAttestation(event, record);
    }
    return json({ received: true });
  } catch {
    console.error("Stripe donation event could not be processed", event.id);
    // Stripe retries storage, PDF generation and email failures.
    return json({ error: "processing_failed" }, 500);
  }
}
