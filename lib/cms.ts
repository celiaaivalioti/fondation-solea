import { defaultContent } from "./default-content";
import { defaultContentEn } from "./default-content-en";
import { hasSanityConfig, sanityClient } from "./sanity";
import type { CmsContent } from "./cms-types";
import { type Locale, defaultLocale, localizeHref } from "./locales";

const imageProjection = `{
  ...,
  "url": coalesce(asset->url, url, localUrl)
}`;

const contentQuery = `{
  "site": *[_type == "siteSettings"][0],
  "navigation": *[_type == "navigation"][0].items[],
  "home": *[_type == "homePage"][0]{
    ...,
    hero{..., image${imageProjection}}
  },
  "about": *[_type == "aboutPage"][0]{
    ...,
    hero{..., image${imageProjection}},
    committee{..., members[]{..., image${imageProjection}}},
    founders{..., people[]{..., image${imageProjection}}}
  },
  "retreat": *[_type == "retreatPage"][0]{
    ...,
    hero{..., image${imageProjection}},
    therapies{..., items[]{..., image${imageProjection}}},
    place{..., gallery[]{..., image${imageProjection}, "url": coalesce(image.asset->url, image.localUrl, image.url, localUrl, url)}}
  },
  "seminars": *[_type == "seminarsPage"][0]{
    ...,
    hero{..., image${imageProjection}}
  },
  "support": *[_type == "supportPage"][0]{
    ...,
    hero{..., image${imageProjection}}
  },
  "sponsors": *[_type == "sponsorsPage"][0]{
    ...,
    heroImage${imageProjection},
    sections[]{..., logos[]{..., image${imageProjection}}}
  },
  "registration": *[_type == "registrationPage"][0],
  "contact": *[_type == "contactPage"][0],
  "privacy": *[_type == "privacyPage"][0],
  "faq": *[_type == "faqPage"][0],
  "registrationForm": *[_type == "registrationForm"][0],
  "contactForm": *[_type == "contactForm"][0]
}`;

type UnknownRecord = Record<string, unknown>;

function isRecord(value: unknown): value is UnknownRecord {
  return Boolean(value) && typeof value === "object" && !Array.isArray(value);
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

function mergeContent<T>(fallback: T, override: unknown, preserveArrayFallback = false): T {
  if (override === null || override === undefined) {
    return fallback;
  }

  if (Array.isArray(fallback)) {
    if (!Array.isArray(override) || override.length === 0) {
      return fallback;
    }

    const length = preserveArrayFallback ? Math.max(fallback.length, override.length) : override.length;

    return Array.from({ length }, (_, index) =>
      mergeContent(fallback[index], override[index], preserveArrayFallback)
    ) as T;
  }

  if (isRecord(fallback) && isRecord(override)) {
    const merged: UnknownRecord = { ...fallback };

    for (const [key, value] of Object.entries(override)) {
      if (value === null || value === undefined || value === "") {
        continue;
      }

      merged[key] = mergeContent((fallback as UnknownRecord)[key], value, preserveArrayFallback);
    }

    return merged as T;
  }

  return override as T;
}

const sharedStringKeys = new Set([
  "url",
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

  return localizeLinks(
    mergeContent(mergeContent(fallback, sharedValues), englishValues, true),
    locale
  );
}

export async function getCmsContent(locale: Locale = defaultLocale): Promise<CmsContent> {
  const fallback = locale === "en" ? defaultContentEn : defaultContent;

  if (!hasSanityConfig || !sanityClient) {
    return localizeLinks(fallback, locale);
  }

  try {
    const sanityContent = await sanityClient.fetch(contentQuery);
    const normalized = normalizeSanityValue(sanityContent);

    return resolveContent(fallback, normalized, locale);
  } catch (error) {
    console.warn("Sanity content fetch failed. Falling back to bundled defaults.", error);
    return localizeLinks(fallback, locale);
  }
}

export type { CmsContent };
