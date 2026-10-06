import type Stripe from "stripe";
import { randomUUID } from "node:crypto";
import { mkdir, writeFile, link, unlink } from "node:fs/promises";
import path from "node:path";
import { DONATION_METADATA_KIND } from "@/lib/donations";

export type DonationRecord = {
  eventId: string;
  eventType: string;
  created: number;
  livemode: boolean;
  resourceId: string;
  status: "paid" | "failed" | "cancelled";
  frequency: "once" | "monthly";
  amountMinor: number | null;
  currency: string | null;
};

// Monthly payments are recorded from invoices, including the first invoice.
// Recording their Checkout events as payments too would count the first gift twice.
export function donationRecordFromEvent(event: Stripe.Event): DonationRecord | null {
  const base = { eventId: event.id, eventType: event.type, created: event.created, livemode: event.livemode };
  switch (event.type) {
    case "checkout.session.completed":
    case "checkout.session.async_payment_succeeded":
    case "checkout.session.async_payment_failed": {
      const session = event.data.object as Stripe.Checkout.Session;
      if (session.metadata?.kind !== DONATION_METADATA_KIND || session.mode !== "payment" || session.currency !== "chf") return null;
      const failed = event.type === "checkout.session.async_payment_failed";
      if (!failed && session.payment_status !== "paid") return null;
      return {
        ...base, resourceId: session.id, status: failed ? "failed" : "paid",
        frequency: "once", amountMinor: session.amount_total, currency: session.currency
      };
    }
    case "invoice.paid":
    case "invoice.payment_failed": {
      const invoice = event.data.object as Stripe.Invoice;
      if (invoice.parent?.subscription_details?.metadata?.kind !== DONATION_METADATA_KIND || invoice.currency !== "chf") return null;
      const paid = event.type === "invoice.paid";
      if (paid && invoice.status !== "paid") return null;
      return {
        ...base, resourceId: invoice.id, status: paid ? "paid" : "failed",
        frequency: "monthly", amountMinor: paid ? invoice.amount_paid : invoice.amount_due, currency: invoice.currency
      };
    }
    case "customer.subscription.deleted": {
      const subscription = event.data.object as Stripe.Subscription;
      if (subscription.metadata?.kind !== DONATION_METADATA_KIND) return null;
      return {
        ...base, resourceId: subscription.id, status: "cancelled", frequency: "monthly",
        amountMinor: null, currency: null
      };
    }
    default: return null;
  }
}

export function donationStorePath() {
  const configured = process.env.STRIPE_DONATION_STORE_PATH;
  if (configured) {
    if (!path.isAbsolute(configured)) throw new Error("Donation store path must be absolute");
    return configured;
  }
  if (process.env.NODE_ENV === "production") throw new Error("Donation store is not configured");
  return path.join(process.cwd(), ".data", "stripe-donations");
}

export async function saveDonationRecord(record: DonationRecord): Promise<boolean> {
  if (!/^(?:cs|in|sub)_[A-Za-z0-9_]+$/.test(record.resourceId)) throw new Error("Invalid Stripe resource ID");
  const directory = donationStorePath();
  await mkdir(directory, { recursive: true, mode: 0o700 });
  const finalPath = path.join(directory, `${record.status}_${record.resourceId}.json`);
  const temporaryPath = path.join(directory, `.pending-${randomUUID()}`);
  try {
    await writeFile(temporaryPath, JSON.stringify(record) + "\n", { mode: 0o600, flag: "wx" });
    // Atomic publication of a complete record. The destination can be created
    // only once, even for simultaneous webhook deliveries or distinct event IDs.
    await link(temporaryPath, finalPath);
    return true;
  } catch (error) {
    if ((error as NodeJS.ErrnoException).code === "EEXIST") return false;
    throw error;
  } finally {
    await unlink(temporaryPath).catch(() => {});
  }
}

export async function readStripeWebhookBody(request: Request): Promise<string> {
  const maxBytes = 512 * 1024;
  if (Number(request.headers.get("content-length")) > maxBytes || !request.body) throw new Error("Invalid webhook body");
  const reader = request.body.getReader();
  const chunks: Uint8Array[] = [];
  let bytes = 0;
  while (true) {
    const { done, value } = await reader.read();
    if (done) break;
    bytes += value.byteLength;
    if (bytes > maxBytes) {
      await reader.cancel();
      throw new Error("Webhook body too large");
    }
    chunks.push(value);
  }
  return Buffer.concat(chunks).toString("utf8");
}
