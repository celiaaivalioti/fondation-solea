export const locales = ["fr", "en"] as const;

export type Locale = (typeof locales)[number];

export const defaultLocale: Locale = "fr";

export function isLocale(value: string): value is Locale {
  return locales.includes(value as Locale);
}

export function localizeHref(href: string, locale: Locale): string {
  if (
    href.startsWith("#") ||
    href.startsWith("mailto:") ||
    href.startsWith("tel:") ||
    href.startsWith("http://") ||
    href.startsWith("https://")
  ) {
    return href;
  }

  const [path, hash] = href.split("#");
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
