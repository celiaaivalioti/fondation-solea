import { DONATION_METADATA_KIND } from "@/lib/donations";
import { getStripe } from "@/lib/stripe";

export type DonationStatus = {
  state: "paid" | "pending" | "cancelled" | "unavailable";
  amountMinor?: number;
  monthly?: boolean;
  test?: boolean;
};

export async function getDonationStatus(sessionId: unknown, cancelled: boolean): Promise<DonationStatus> {
  if (typeof sessionId !== "string" || !/^cs_(?:test_|live_)?[A-Za-z0-9]{10,200}$/.test(sessionId)) {
    return { state: cancelled ? "cancelled" : "unavailable" };
  }
  try {
    const session = await getStripe().checkout.sessions.retrieve(sessionId);
    if (session.metadata?.kind !== DONATION_METADATA_KIND || session.currency !== "chf") return { state: "unavailable" };
    // A success query parameter alone never proves that a donation was paid.
    const state = session.payment_status === "paid" ? "paid" : session.status === "expired" || session.status === "open" ? "cancelled" : "pending";
    return {
      state, amountMinor: session.amount_total ?? undefined,
      monthly: session.mode === "subscription", test: !session.livemode
    };
  } catch {
    return { state: "unavailable" };
  }
}
