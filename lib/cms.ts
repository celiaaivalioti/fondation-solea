import { cache } from "react";
import { defaultContent } from "./default-content";
import { defaultContentEn } from "./default-content-en";
import { hasSanityConfig, sanityClient } from "./sanity";
import type { CmsContent } from "./cms-types";
import { type Locale, defaultLocale, localizeHref } from "./locales";
import { pageSections } from "./section-visibility";

const imageProjection = `{
  ...,
  "url": coalesce(asset->url, url, localUrl)
}`;

const resourceProjection = `{..., items[]{..., image${imageProjection}, "fileUrl": file.asset->url, recommender{..., image${imageProjection}}}}`;

const contentQuery = `{
  "site": *[_type == "siteSettings"][0],
  "navigation": *[_type == "navigation"][0].items[],
  "en": {"navigation": *[_type == "navigation"][0].en.items[]},
  "home": *[_type == "homePage"][0]{
    ...,
    hero{..., image${imageProjection}},
    manifesto{..., portraitImage${imageProjection}},
    en{..., hero{..., image${imageProjection}}, manifesto{..., portraitImage${imageProjection}}}
  },
  "about": *[_type == "aboutPage"][0]{
    ...,
    hero{..., image${imageProjection}},
    committee{..., members[]{..., image${imageProjection}}},
    direction{..., members[]{..., image${imageProjection}}},
    founders{..., people[]{..., image${imageProjection}}},
    en{..., hero{..., image${imageProjection}}, committee{..., members[]{..., image${imageProjection}}}, direction{..., members[]{..., image${imageProjection}}}, founders{..., people[]{..., image${imageProjection}}}}
  },
  "committee": *[_type == "committeePage"][0]{
    ...,
    members[]{..., image${imageProjection}},
    en{..., members[]{..., image${imageProjection}}}
  },
  "retreat": *[_type == "retreatPage"][0]{
    ...,
    hero{..., image${imageProjection}},
    therapies{..., items[]{..., image${imageProjection}}},
    place{..., gallery[]{..., image${imageProjection}, "url": coalesce(image.asset->url, image.localUrl, image.url, localUrl, url)}},
    en{..., hero{..., image${imageProjection}}, therapies{..., items[]{..., image${imageProjection}}}, place{..., gallery[]{..., image${imageProjection}, "url": coalesce(image.asset->url, image.localUrl, image.url, localUrl, url)}}}
  },
  "seminars": *[_type == "seminarsPage"][0]{
    ...,
    hero{..., image${imageProjection}},
    resources${resourceProjection},
    en{..., hero{..., image${imageProjection}}, resources${resourceProjection}}
  },
  "business": *[_type == "businessPage" && _id == "businessPage"][0]{
    ...,
    "dossierUrl": dossier.asset->url,
    hero{..., image${imageProjection}},
    projects{..., items[]{..., image${imageProjection}}},
    closing{..., image${imageProjection}},
    partners{..., logos[]{..., image${imageProjection}}},
    en{..., "dossierUrl": dossier.asset->url, hero{..., image${imageProjection}}, projects{..., items[]{..., image${imageProjection}}}, closing{..., image${imageProjection}}}
  },
  "support": *[_type == "supportPage"][0]{
    ...,
    hero{..., image${imageProjection}},
    en{..., hero{..., image${imageProjection}}}
  },
  "sponsors": *[_type == "sponsorsPage"][0]{
    ...,
    heroImage${imageProjection},
    sections[]{..., logos[]{..., image${imageProjection}}},
    en{..., heroImage${imageProjection}, sections[]{..., logos[]{..., image${imageProjection}}}}
  },
  "registration": *[_type == "registrationPage"][0],
  "contact": *[_type == "contactPage"][0],
  "privacy": *[_type == "privacyPage"][0],
  "legal": *[_type == "legalPage" && _id == "legalPage"][0],
  "faq": *[_type == "faqPage"][0],
  "registrationForm": *[_type == "registrationForm"][0],
  "contactForm": *[_type == "contactForm"][0]
}`;

type UnknownRecord = Record<string, unknown>;

function isRecord(value: unknown): value is UnknownRecord {
  return Boolean(value) && typeof value === "object" && !Array.isArray(value);
}

function isCtaRecord(value: unknown): value is UnknownRecord {
  return isRecord(value) && typeof value.label === "string" && typeof value.href === "string";
}

function hasCtaOverride(value: UnknownRecord): boolean {
  return ["label", "href", "variant", "newTab", "visible", "show"].some((key) => key in value);
}

function normalizeImage(value: unknown): unknown {
  if (!isRecord(value)) {
    return value;
  }

  const asset = value.asset;
  const assetUrl = isRecord(asset) && typeof asset.url === "string" ? asset.url : undefined;
  const localUrl = typeof value.localUrl === "string" ? value.localUrl : undefined;

  return {
    ...value,
    url: assetUrl ?? (typeof value.url === "string" ? value.url : localUrl)
  };
}

function normalizeSanityValue(value: unknown): unknown {
  if (Array.isArray(value)) {
    return value.map(normalizeSanityValue).filter((item) => item !== null && item !== undefined);
  }

  if (!isRecord(value)) {
    return value;
  }

  const normalized: UnknownRecord = {};

  for (const [key, nestedValue] of Object.entries(value)) {
    if (key.startsWith("_")) {
      continue;
    }

    normalized[key] = key === "image" ? normalizeImage(nestedValue) : normalizeSanityValue(nestedValue);
  }

  return normalized;
}

function mergeContent<T>(fallback: T, override: unknown, preserveArrayFallback = false, inheritCtaHref = false): T {
  if (override === null || override === undefined) {
    return fallback;
  }

  if (Array.isArray(fallback)) {
    if (!Array.isArray(override) || override.length === 0) {
      return fallback;
    }

    const length = preserveArrayFallback ? Math.max(fallback.length, override.length) : override.length;

    return Array.from({ length }, (_, index) =>
      mergeContent(fallback[index], override[index], preserveArrayFallback, inheritCtaHref)
    ) as T;
  }

  if (isRecord(fallback) && isRecord(override)) {
    const merged: UnknownRecord = { ...fallback };
    const ctaOverrideHasNoHref =
      !inheritCtaHref &&
      isCtaRecord(fallback) &&
      hasCtaOverride(override) &&
      (!("href" in override) || override.href === "");

    for (const [key, value] of Object.entries(override)) {
      if (value === null || value === undefined || value === "") {
        continue;
      }

      merged[key] = mergeContent((fallback as UnknownRecord)[key], value, preserveArrayFallback, inheritCtaHref);
    }

    if (ctaOverrideHasNoHref) {
      merged.href = "";
      merged.visible = false;
    }

    return merged as T;
  }

  return override as T;
}

const sharedStringKeys = new Set([
  "url",
  "dossierUrl",
  "fileUrl",
  "category",
  "localUrl",
  "className",
  "href",
  "platform",
  "googleAnalyticsId",
  "email",
  "phone",
  "currency"
]);

function stripFrenchText(value: unknown, key?: string): unknown {
  if (Array.isArray(value)) {
    const stripped = value.map((item) => stripFrenchText(item));
    return stripped.some((item) => item !== undefined) ? stripped : undefined;
  }

  if (!isRecord(value)) {
    if (typeof value === "string" && !sharedStringKeys.has(key ?? "")) {
      return undefined;
    }

    return value;
  }

  const stripped: UnknownRecord = {};

  for (const [nestedKey, nestedValue] of Object.entries(value)) {
    if (nestedKey === "en") {
      continue;
    }

    if (nestedKey === "label" && typeof nestedValue === "string" && typeof value.platform === "string") {
      stripped[nestedKey] = nestedValue;
      continue;
    }

    const result = stripFrenchText(nestedValue, nestedKey);
    if (result !== undefined) {
      stripped[nestedKey] = result;
    }
  }

  return Object.keys(stripped).length > 0 ? stripped : undefined;
}

function extractEnglishOverrides(value: unknown): unknown {
  if (Array.isArray(value)) {
    const localized = value.map(extractEnglishOverrides);
    return localized.some((item) => item !== undefined) ? localized : undefined;
  }

  if (!isRecord(value)) {
    return undefined;
  }

  const extracted: UnknownRecord = {};

  if (isRecord(value.en)) {
    Object.assign(extracted, value.en);
  }

  for (const [key, nestedValue] of Object.entries(value)) {
    if (key === "en") {
      continue;
    }

    const nested = extractEnglishOverrides(nestedValue);
    if (nested !== undefined) {
      extracted[key] = nested;
    }
  }

  return Object.keys(extracted).length > 0 ? extracted : undefined;
}

function localizeLinks<T>(value: T, locale: Locale, key?: string): T {
  if (Array.isArray(value)) {
    return value.map((item) => localizeLinks(item, locale)) as T;
  }

  if (!isRecord(value)) {
    if (key === "href" && typeof value === "string") {
      return localizeHref(value, locale) as T;
    }

    return value;
  }

  const localized: UnknownRecord = {};
  for (const [nestedKey, nestedValue] of Object.entries(value)) {
    localized[nestedKey] = localizeLinks(nestedValue, locale, nestedKey);
  }

  return localized as T;
}

function resolveContent(fallback: CmsContent, override: unknown, locale: Locale): CmsContent {
  if (locale === defaultLocale) {
    return localizeLinks(mergeContent(fallback, override), locale);
  }

  const sharedValues = stripFrenchText(override);
  const englishValues = extractEnglishOverrides(override);

  const localized = localizeLinks(
    // Shared settings and translations are partial overrides: a translated label
    // without a URL must retain the button destination.
    mergeContent(mergeContent(fallback, sharedValues, false, true), englishValues, false, true),
    locale
  );

  // Visibility is editorial structure, shared across languages even when a
  // translated object or array replaces its French counterpart.
  const shared = mergeContent(fallback, override);
  for (const key of Object.keys(pageSections) as Array<keyof Pick<CmsContent,
    "home" | "about" | "committee" | "retreat" | "seminars" | "support" |
    "business" | "sponsors" | "registration" | "contact" | "privacy" | "legal" | "faq"
  >>) {
    localized[key].sectionVisibility = shared[key].sectionVisibility;
  }
  for (const key of ["privacy", "legal"] as const) {
    localized[key].sections = localized[key].sections.map((section, index) => ({
      ...section, visible: shared[key].sections[index]?.visible
    }));
  }
  localized.sponsors.sections = localized.sponsors.sections.map((section, index) => ({
    ...section,
    visible: shared.sponsors.sections[index]?.visible,
    logos: section.logos.map((logo, logoIndex) => ({
      ...logo, visible: shared.sponsors.sections[index]?.logos[logoIndex]?.visible
    }))
  }));
  localized.business.partners.logos = localizeLinks(shared.business.partners.logos, locale);
  return localized;
}

async function loadCmsContent(locale: Locale): Promise<CmsContent> {
  const fallback = locale === "en" ? defaultContentEn : defaultContent;

  if (!hasSanityConfig || !sanityClient) {
    return localizeLinks(fallback, locale);
  }

  try {
    const sanityContent = await sanityClient.fetch(contentQuery, {}, { cache: "no-store" });
    const normalized = normalizeSanityValue(sanityContent);

    return resolveContent(fallback, normalized, locale);
  } catch (error) {
    console.warn("Sanity content fetch failed. Falling back to bundled defaults.", error);
    return localizeLinks(fallback, locale);
  }
}

// Metadata, layouts and pages frequently request the same locale during one
// render. React's request cache keeps that to one CMS read and one merge pass.
export const getCmsContent = cache(
  async (locale: Locale = defaultLocale) => {
    const content = await loadCmsContent(locale);

    if (process.env.NODE_ENV === "development" && process.env.PREVIEW_DONATION_BUTTONS === "true") {
      return { ...content, site: { ...content.site, showDonationCta: true } };
    }

    return content;
  }
);

export type { CmsContent };
