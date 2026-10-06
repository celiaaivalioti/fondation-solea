import Stripe from "stripe";

let stripe: Stripe | undefined;

export function getStripe(): Stripe {
  if (stripe) return stripe;
  const key = process.env.STRIPE_SECRET_KEY;
  if (!key) throw new Error("Stripe is not configured");
  stripe = new Stripe(key, { apiVersion: "2026-09-30.endive", timeout: 10_000, maxNetworkRetries: 1 });
  return stripe;
}

// Return URLs come from configuration, never from untrusted Host headers.
export function getDonationSiteOrigin(): string {
  const configured = process.env.STRIPE_SITE_URL ||
    (process.env.NODE_ENV !== "production" ? "http://localhost:3000" : "");
  const url = new URL(configured);
  if (url.username || url.password ||
      (url.protocol !== "https:" && !(process.env.NODE_ENV !== "production" && url.protocol === "http:"))) {
    throw new Error("Invalid Stripe site URL");
  }
  return url.origin;
}
