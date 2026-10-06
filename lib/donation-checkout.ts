import type Stripe from "stripe";
import { donationAmounts, DONATION_METADATA_KIND, type DonationSelection } from "@/lib/donations";
import { localizeHref } from "@/lib/locales";

export function buildDonationCheckout(selection: DonationSelection, origin: string): Stripe.Checkout.SessionCreateParams {
  const { amountMinor, contributionMinor } = donationAmounts(selection.amountMinor, selection.coverFees);
  const french = selection.locale === "fr";
  const monthly = selection.frequency === "monthly";
  const metadata = {
    kind: DONATION_METADATA_KIND,
    donation_amount_minor: String(amountMinor),
    contribution_minor: String(contributionMinor),
    frequency: selection.frequency,
    donor_type: selection.donorType,
    locale: selection.locale
  };
  const lineItem = (name: string, unitAmount: number): Stripe.Checkout.SessionCreateParams.LineItem => ({
    quantity: 1,
    price_data: {
      currency: "chf", unit_amount: unitAmount, product_data: { name },
      ...(monthly ? { recurring: { interval: "month" as const } } : {})
    }
  });
  const returnPath = localizeHref("/nous-soutenir/merci/", selection.locale);
  return {
    mode: monthly ? "subscription" : "payment",
    locale: selection.locale,
    adaptive_pricing: { enabled: false },
    // Card Checkout includes eligible wallets; add other methods after testing.
    allowed_payment_method_types: ["card"],
    billing_address_collection: "required",
    name_collection: selection.donorType === "company"
      ? { business: { enabled: true, optional: false } }
      : { individual: { enabled: true, optional: false } },
    line_items: [
      lineItem(french ? "Don à la Fondation Solea" : "Donation to the Solea Foundation", amountMinor),
      ...(contributionMinor ? [lineItem(french ? "Contribution aux frais de paiement" : "Payment fee contribution", contributionMinor)] : [])
    ],
    metadata,
    ...(monthly ? { subscription_data: { metadata } } : { submit_type: "donate", payment_intent_data: { metadata } }),
    success_url: `${origin}${returnPath}?session_id={CHECKOUT_SESSION_ID}`,
    cancel_url: `${origin}${returnPath}?status=cancelled`
  };
}
