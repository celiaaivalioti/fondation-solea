import { defaultContent } from "./default-content";
import { hasSanityConfig, sanityClient } from "./sanity";
import type { CmsContent } from "./cms-types";

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

function mergeContent<T>(fallback: T, override: unknown): T {
  if (override === null || override === undefined) {
    return fallback;
  }

  if (Array.isArray(fallback)) {
    return (Array.isArray(override) && override.length > 0 ? override : fallback) as T;
  }

  if (isRecord(fallback) && isRecord(override)) {
    const merged: UnknownRecord = { ...fallback };

    for (const [key, value] of Object.entries(override)) {
      if (value === null || value === undefined || value === "") {
        continue;
      }

      merged[key] = mergeContent((fallback as UnknownRecord)[key], value);
    }

    return merged as T;
  }

  return override as T;
}

export async function getCmsContent(): Promise<CmsContent> {
  if (!hasSanityConfig || !sanityClient) {
    return defaultContent;
  }

  try {
    const sanityContent = await sanityClient.fetch(contentQuery);
    const normalized = normalizeSanityValue(sanityContent);

    return mergeContent(defaultContent, normalized);
  } catch (error) {
    console.warn("Sanity content fetch failed. Falling back to bundled defaults.", error);
    return defaultContent;
  }
}

export type { CmsContent };
