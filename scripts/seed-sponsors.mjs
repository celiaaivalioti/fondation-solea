// One-off: create/update the editable sponsors page in Sanity, including the
// first local sponsor logo and the English translation block. Run with:
//   npx sanity exec scripts/seed-sponsors.mjs --with-user-token
import { getCliClient } from "sanity/cli";

const { defaultContent } = await import("../lib/default-content.ts");
const { defaultContentEn } = await import("../lib/default-content-en.ts");

const client = getCliClient({ apiVersion: "2026-07-09" });

function keyFor(value, index) {
  const stable = value?.title || value?.name || value?.label || `item-${index}`;

  return stable
    .normalize("NFKD")
    .replace(/[\u0300-\u036f]/g, "")
    .toLowerCase()
    .replace(/[^a-z0-9]+/g, "-")
    .replace(/^-|-$/g, "")
    .slice(0, 48) || `item-${index}`;
}

function toSanityImage(image) {
  return {
    _type: "image",
    localUrl: image.url,
    alt: image.alt,
    ...(image.className ? { className: image.className } : {})
  };
}

function toSponsorLogo(logo, index, includeImage = true) {
  const value = {
    _key: keyFor(logo, index),
    _type: "sponsorLogo",
    name: logo.name
  };

  if (includeImage) {
    value.image = toSanityImage(logo.image);
  }

  if (logo.href) {
    value.href = logo.href;
  }

  if (logo.newTab) {
    value.newTab = logo.newTab;
  }

  return value;
}

function toSponsorSection(section, index, includeImages = true) {
  return {
    _key: keyFor(section, index),
    _type: "sponsorSection",
    title: section.title,
    logos: section.logos.map((logo, logoIndex) => toSponsorLogo(logo, logoIndex, includeImages))
  };
}

function toCta(cta) {
  return {
    label: cta.label,
    href: cta.href,
    ...(cta.variant ? { variant: cta.variant } : {}),
    ...(cta.newTab ? { newTab: cta.newTab } : {})
  };
}

const sponsors = defaultContent.sponsors;
const sponsorsEn = defaultContentEn.sponsors;

await client.createIfNotExists({ _id: "sponsorsPage", _type: "sponsorsPage" });

await client
  .patch("sponsorsPage")
  .set({
    metadataTitle: sponsors.metadataTitle,
    title: sponsors.title,
    intro: sponsors.intro,
    heroImage: toSanityImage(sponsors.heroImage),
    sections: sponsors.sections.map((section, index) => toSponsorSection(section, index, true)),
    cta: toCta(sponsors.cta),
    en: {
      metadataTitle: sponsorsEn.metadataTitle,
      title: sponsorsEn.title,
      intro: sponsorsEn.intro,
      heroImage: toSanityImage(sponsorsEn.heroImage),
      sections: sponsorsEn.sections.map((section, index) => toSponsorSection(section, index, false)),
      cta: toCta(sponsorsEn.cta)
    }
  })
  .commit();

console.log("sponsorsPage ready");
