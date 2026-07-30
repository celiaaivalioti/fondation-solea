// One-off: populate the editable English translation blocks in Sanity from
// the bundled English fallback content. Run with:
//   npx sanity exec scripts/seed-english-content.mjs --with-user-token
import { getCliClient } from "sanity/cli";

const { defaultContentEn } = await import("../lib/default-content-en.ts");

const client = getCliClient({ apiVersion: "2026-07-09" });

const documents = [
  ["siteSettings", "siteSettings", {
    tagline: defaultContentEn.site.tagline,
    intro: defaultContentEn.site.intro,
    quote: defaultContentEn.site.quote,
    address: defaultContentEn.site.address,
    footerTagline: defaultContentEn.site.footerTagline,
    donationLabel: defaultContentEn.site.donationLabel,
    legalLinks: defaultContentEn.site.legalLinks
  }],
  ["navigation", "navigation", { items: defaultContentEn.navigation }],
  ["homePage", "homePage", defaultContentEn.home],
  ["aboutPage", "aboutPage", defaultContentEn.about],
  ["retreatPage", "retreatPage", defaultContentEn.retreat],
  ["seminarsPage", "seminarsPage", defaultContentEn.seminars],
  ["supportPage", "supportPage", defaultContentEn.support],
  ["sponsorsPage", "sponsorsPage", defaultContentEn.sponsors],
  ["registrationPage", "registrationPage", defaultContentEn.registration],
  ["contactPage", "contactPage", defaultContentEn.contact],
  ["privacyPage", "privacyPage", defaultContentEn.privacy],
  ["faqPage", "faqPage", defaultContentEn.faq],
  ["registrationForm", "registrationForm", defaultContentEn.registrationForm],
  ["contactForm", "contactForm", defaultContentEn.contactForm]
];

const sharedKeys = new Set([
  "url",
  "localUrl",
  "image",
  "className",
  "frameClass",
  "platform",
  "newTab",
  "variant",
  "icon",
  "id",
  "currency",
  "showDonationCta",
  "googleAnalyticsId",
  "email",
  "phone"
]);

function keyFor(value, index) {
  if (value && typeof value === "object") {
    const stable = value.id || value.platform || value.name || value.title || value.label || value.question;
    if (typeof stable === "string" && stable.trim()) {
      return stable
        .normalize("NFKD")
        .replace(/[\u0300-\u036f]/g, "")
        .toLowerCase()
        .replace(/[^a-z0-9]+/g, "-")
        .replace(/^-|-$/g, "")
        .slice(0, 48) || `item-${index}`;
    }
  }

  return `item-${index}`;
}

function toSanityValue(value, key, index = 0) {
  if (sharedKeys.has(key)) {
    return undefined;
  }

  if (Array.isArray(value)) {
    return value.map((item, itemIndex) => {
      if (!item || typeof item !== "object") {
        return item;
      }

      const mapped = toSanityValue(item, undefined, itemIndex);
      return mapped && typeof mapped === "object"
        ? { _key: keyFor(item, itemIndex), ...mapped }
        : mapped;
    });
  }

  if (!value || typeof value !== "object") {
    return value;
  }

  const entries = Object.entries(value)
    .map(([nestedKey, nestedValue]) => [nestedKey, toSanityValue(nestedValue, nestedKey, index)])
    .filter(([, nestedValue]) => nestedValue !== undefined);

  return Object.fromEntries(entries);
}

function ensureDocument(id, type) {
  return client.createIfNotExists({ _id: id, _type: type });
}

for (const [id, type, englishContent] of documents) {
  await ensureDocument(id, type);
  const en = toSanityValue(englishContent);
  await client.patch(id).set({ en }).commit();
  console.log(`Seeded English translation: ${id}`);
}
