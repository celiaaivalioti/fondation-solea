import { isLocale, type Locale } from "@/lib/locales";

export const MIN_DONATION_MINOR = 100;
export const MAX_DONATION_MINOR = 10_000_000;
export const DONATION_METADATA_KIND = "solea_donation";

export type DonationFrequency = "once" | "monthly";
export type DonorType = "individual" | "company";
export type DonationSelection = {
  amountMinor: number;
  frequency: DonationFrequency;
  donorType: DonorType;
  coverFees: boolean;
  locale: Locale;
  requestId: string;
};

// Parse CHF into integer centimes; reject exponents and fractions of a centime.
export function parseDonationAmount(value: unknown): number | null {
  if (typeof value !== "string" && typeof value !== "number") return null;
  const text = String(value).trim().replace(",", ".");
  if (!/^\d{1,6}(?:\.\d{1,2})?$/.test(text)) return null;
  const [whole, fraction = ""] = text.split(".");
  const amount = Number(whole) * 100 + Number(fraction.padEnd(2, "0"));
  return amount >= MIN_DONATION_MINOR && amount <= MAX_DONATION_MINOR ? amount : null;
}

export function donationAmounts(amountMinor: number, coverFees: boolean) {
  const contributionMinor = coverFees ? Math.round(amountMinor * 27 / 1000) : 0;
  return { amountMinor, contributionMinor, totalMinor: amountMinor + contributionMinor };
}

export function parseDonationSelection(value: unknown): DonationSelection | null {
  if (!value || typeof value !== "object" || Array.isArray(value)) return null;
  const payload = value as Record<string, unknown>;
  const amountMinor = parseDonationAmount(payload.amount);
  if (
    amountMinor === null ||
    (payload.frequency !== "once" && payload.frequency !== "monthly") ||
    (payload.donorType !== "individual" && payload.donorType !== "company") ||
    (payload.donorType === "company" && payload.frequency !== "once") ||
    typeof payload.coverFees !== "boolean" ||
    typeof payload.locale !== "string" || !isLocale(payload.locale) ||
    typeof payload.requestId !== "string" ||
    !/^[0-9a-f]{8}-[0-9a-f]{4}-4[0-9a-f]{3}-[89ab][0-9a-f]{3}-[0-9a-f]{12}$/i.test(payload.requestId)
  ) return null;
  return {
    amountMinor, frequency: payload.frequency, donorType: payload.donorType,
    coverFees: payload.coverFees, locale: payload.locale, requestId: payload.requestId
  };
}

export function formatDonationAmount(amountMinor: number, locale: Locale) {
  return new Intl.NumberFormat(locale === "fr" ? "fr-CH" : "en-CH", {
    minimumFractionDigits: amountMinor % 100 ? 2 : 0,
    maximumFractionDigits: 2
  }).format(amountMinor / 100);
}
