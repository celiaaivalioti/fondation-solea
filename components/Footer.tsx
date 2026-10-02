import Image from "next/image";
import Link from "next/link";
import SocialIcon from "@/components/SocialIcon";
import type { NavigationItem, SiteSettings } from "@/lib/cms-types";
import { type Locale, defaultLocale, getLanguageSwitchHref, localizeHref } from "@/lib/locales";
import { newTabProps } from "@/lib/links";

type FooterProps = {
  navigation: NavigationItem[];
  site: SiteSettings;
  locale?: Locale;
};

const iconButtonClassName = "flex h-9 w-9 items-center justify-center rounded-full border border-bark/25 transition hover:border-bark hover:bg-bark hover:text-fern";

export default function Footer({ navigation, site, locale = defaultLocale }: FooterProps) {
  const languageOptions: Array<{ locale: Locale; label: string }> = [
    { locale: "fr", label: "FR" },
    { locale: "en", label: "EN" }
  ];

  return (
    <footer className="relative overflow-hidden bg-fern px-5 py-28 text-bark sm:px-8">
      <div
        aria-hidden="true"
        className="pointer-events-none absolute -right-32 -top-32 h-96 w-96 rounded-full bg-gradient-to-br from-paper/40 to-transparent blur-3xl"
      />
      <div
        aria-hidden="true"
        className="pointer-events-none absolute -left-24 bottom-0 h-72 w-72 rounded-full bg-gradient-to-tr from-moss/25 to-transparent blur-3xl"
      />

      <div className="relative mx-auto grid max-w-[1400px] gap-12 md:grid-cols-[1fr_1.5fr]">
        <div>
          <Link href={localizeHref("/", locale)} prefetch={false} className="group inline-flex items-center" aria-label={`${site.name} - ${locale === "fr" ? "accueil" : "home"}`}>
            <Image
              src="/images/logo-solea-ink.png"
              alt={site.name}
              width={5342}
              height={1504}
              className="h-8 w-auto"
            />
          </Link>
          <p className="mt-4 max-w-sm leading-8 text-bark/75">{site.footerTagline}</p>
          {site.showDonationCta && (
            <div className="mt-4">
              <Link
                href={localizeHref("/nous-soutenir", locale)}
                prefetch={false}
                className="inline-flex min-h-14 items-center rounded-full bg-parchment px-8 py-4 text-lg font-medium text-bark transition hover:brightness-95"
              >
                {site.donationLabel}
              </Link>
            </div>
          )}
          <div
            className="mt-12 inline-flex rounded-full border border-bark/15 p-0.5"
            aria-label={locale === "fr" ? "Choix de langue" : "Language selection"}
          >
            {languageOptions.map((option) => {
              const active = option.locale === locale;

              return (
                <Link
                  key={option.locale}
                  href={getLanguageSwitchHref(locale === "fr" ? "/" : "/en", option.locale)}
                  prefetch={false}
                  hrefLang={option.locale}
                  aria-current={active ? "true" : undefined}
                  className={`inline-flex min-h-8 min-w-11 items-center justify-center rounded-full border px-3 text-[12px] font-semibold tracking-[0.12em] transition ${
                    active
                      ? "border-bark/65 text-bark"
                      : "border-transparent text-bark/55 hover:border-bark/20 hover:text-bark/78"
                  }`}
                >
                  {option.label}
                </Link>
              );
            })}
          </div>
        </div>
        <div className="grid gap-8 sm:grid-cols-3">
          <nav className="grid gap-3" aria-label={locale === "fr" ? "Navigation secondaire" : "Footer navigation"}>
            {navigation.map((item) => (
              <Link
                key={item.href}
                href={item.href}
                prefetch={false}
                {...newTabProps(item.newTab)}
                className="text-lg text-bark/75 transition hover:text-bark"
              >
                {item.label}
              </Link>
            ))}
          </nav>
          <div className="text-lg leading-8 text-bark/75">
            <p className="mb-2 font-bold text-bark">Contact</p>
            <p>{site.email}</p>
            <p>{site.phone}</p>
            <Link
              href={localizeHref("/contact", locale)}
              prefetch={false}
              className="mt-4 inline-flex min-h-9 items-center justify-center rounded-full border border-bark/25 px-4 py-2 text-center text-base leading-snug transition hover:border-bark hover:bg-bark hover:text-fern"
            >
              {locale === "fr" ? "Formulaire de contact" : "Contact form"}
            </Link>
          </div>
          <div className="text-lg leading-8 text-bark/75">
            <p className="mb-2 font-bold text-bark">{locale === "fr" ? "Liens" : "Links"}</p>
            {site.legalLinks.map((item) => (
              <Link
                key={item.label}
                href={/^(mentions légales|legal notice)$/i.test(item.label.trim())
                  ? localizeHref("/mentions-legales", locale)
                  : item.href}
                prefetch={false}
                {...newTabProps(item.newTab)}
                className="block transition hover:text-bark"
              >
                {item.label}
              </Link>
            ))}
            <div className="mt-4 flex gap-3" aria-label={locale === "fr" ? "Réseaux sociaux" : "Social media"}>
              {site.socialLinks.map((item) => (
                <a
                  key={`${item.platform}-${item.href}`}
                  href={item.href}
                  {...newTabProps(item.newTab)}
                  aria-label={item.label}
                  className={iconButtonClassName}
                >
                  <SocialIcon platform={item.platform} />
                </a>
              ))}
            </div>
          </div>
        </div>
      </div>
    </footer>
  );
}
