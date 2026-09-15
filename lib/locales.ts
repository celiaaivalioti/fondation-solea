export const locales = ["fr", "en"] as const;

export type Locale = (typeof locales)[number];

export const defaultLocale: Locale = "fr";

const controlCharacters = /[\u0000-\u001F\u007F]/;
const explicitScheme = /^[a-zA-Z][a-zA-Z\d+.-]*:/;

export function sanitizeHref(value: string): string {
  const href = value.trim();

  if (!href || controlCharacters.test(href) || href.startsWith("//")) {
    return "#";
  }

  if (href.startsWith("#") || href.startsWith("/")) {
    return href;
  }

  if (href.startsWith("mailto:")) {
    const address = href.slice(7);
    return /^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(address) ? href : "#";
  }

  if (href.startsWith("tel:")) {
    return /^tel:\+?[\d\s().-]+$/.test(href) ? href : "#";
  }

  if (explicitScheme.test(href)) {
    try {
      const url = new URL(href);
      return url.protocol === "https:" || url.protocol === "http:" ? url.toString() : "#";
    } catch {
      return "#";
    }
  }

  return `/${href.replace(/^\/+/, "")}`;
}

export function isLocale(value: string): value is Locale {
  return locales.includes(value as Locale);
}

export function localizeHref(href: string, locale: Locale): string {
  const safeHref = sanitizeHref(href);

  if (
    safeHref.startsWith("#") ||
    safeHref.startsWith("mailto:") ||
    safeHref.startsWith("tel:") ||
    safeHref.startsWith("http://") ||
    safeHref.startsWith("https://")
  ) {
    return safeHref;
  }

  const [path, hash] = safeHref.split("#");
  const normalizedPath = path === "" ? "/" : path;
  const withoutEnglishPrefix =
    normalizedPath === "/en" ? "/" : normalizedPath.replace(/^\/en(?=\/)/, "");
  const localizedPath =
    locale === "en"
      ? withoutEnglishPrefix === "/"
        ? "/en"
        : `/en${withoutEnglishPrefix}`
      : withoutEnglishPrefix;

  return hash ? `${localizedPath}#${hash}` : localizedPath;
}

export function getLanguageSwitchHref(pathname: string, targetLocale: Locale): string {
  const [path, hash] = pathname.split("#");
  const normalizedPath = path || "/";
  const withoutEnglishPrefix =
    normalizedPath === "/en" ? "/" : normalizedPath.replace(/^\/en(?=\/)/, "");

  const switchedPath =
    targetLocale === "en"
      ? withoutEnglishPrefix === "/"
        ? "/en"
        : `/en${withoutEnglishPrefix}`
      : withoutEnglishPrefix;

  return hash ? `${switchedPath}#${hash}` : switchedPath;
}
