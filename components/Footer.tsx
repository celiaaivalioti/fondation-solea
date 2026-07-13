import Image from "next/image";
import Link from "next/link";
import type { ReactElement } from "react";
import type { NavigationItem, SiteSettings } from "@/lib/cms-types";

type FooterProps = {
  navigation: NavigationItem[];
  site: SiteSettings;
};

const socialIcons: Record<string, ReactElement> = {
  linkedin: (
    <path d="M4.98 3.5a2.5 2.5 0 1 1 0 5 2.5 2.5 0 0 1 0-5ZM3 9.75h4v11h-4v-11Zm6 0h3.84v1.5h.05c.54-.96 1.86-1.97 3.83-1.97 4.1 0 4.86 2.7 4.86 6.21v5.26h-4v-4.66c0-1.11-.02-2.54-1.55-2.54-1.55 0-1.79 1.21-1.79 2.46v4.74H9v-11Z" />
  ),
  facebook: (
    <path d="M13.5 22v-8h2.7l.4-3.2h-3.1v-2c0-.93.26-1.56 1.6-1.56h1.7V4.4c-.3-.04-1.3-.13-2.46-.13-2.43 0-4.1 1.49-4.1 4.22v2.31H7.5V14h2.74v8h3.26Z" />
  ),
  instagram: (
    <path d="M12 2.16c3.2 0 3.58.01 4.85.07 1.17.05 1.8.25 2.23.41.56.22.96.48 1.38.9.42.42.68.82.9 1.38.16.42.35 1.06.41 2.23.06 1.26.07 1.64.07 4.85s-.01 3.58-.07 4.85c-.05 1.17-.25 1.8-.41 2.23-.22.56-.48.96-.9 1.38-.42.42-.82.68-1.38.9-.42.16-1.06.35-2.23.41-1.26.06-1.64.07-4.85.07s-3.58-.01-4.85-.07c-1.17-.05-1.8-.25-2.23-.41a3.72 3.72 0 0 1-1.38-.9 3.72 3.72 0 0 1-.9-1.38c-.16-.42-.35-1.06-.41-2.23-.06-1.26-.07-1.64-.07-4.85s.01-3.58.07-4.85c.05-1.17.25-1.8.41-2.23.22-.56.48-.96.9-1.38.42-.42.82-.68 1.38-.9.42-.16 1.06-.35 2.23-.41 1.26-.06 1.64-.07 4.85-.07M12 .16C8.74.16 8.33.17 7.05.23 5.78.29 4.9.49 4.14.79c-.8.31-1.48.72-2.13 1.38A5.88 5.88 0 0 0 .63 4.3c-.3.76-.5 1.64-.56 2.91C.01 8.49 0 8.9 0 12.16s.01 3.67.07 4.95c.06 1.27.26 2.15.56 2.91.31.8.72 1.48 1.38 2.13.65.66 1.33 1.07 2.13 1.38.76.3 1.64.5 2.91.56 1.28.06 1.69.07 4.95.07s3.67-.01 4.95-.07c1.27-.06 2.15-.26 2.91-.56a5.88 5.88 0 0 0 2.13-1.38 5.88 5.88 0 0 0 1.38-2.13c.3-.76.5-1.64.56-2.91.06-1.28.07-1.69.07-4.95s-.01-3.67-.07-4.95c-.06-1.27-.26-2.15-.56-2.91a5.88 5.88 0 0 0-1.38-2.13A5.88 5.88 0 0 0 19.86.79c-.76-.3-1.64-.5-2.91-.56C15.67.17 15.26.16 12 .16Zm0 5.84a6.16 6.16 0 1 0 6.16 6.16A6.16 6.16 0 0 0 12 6Zm0 10.15a4 4 0 1 1 4-4 4 4 0 0 1-4 4Zm7.85-10.4a1.44 1.44 0 1 1-1.44-1.44 1.44 1.44 0 0 1 1.44 1.44Z" />
  ),
  youtube: (
    <path d="M23.5 6.19a3.02 3.02 0 0 0-2.12-2.14C19.5 3.55 12 3.55 12 3.55s-7.5 0-9.38.5A3.02 3.02 0 0 0 .5 6.19C0 8.07 0 12 0 12s0 3.93.5 5.81a3.02 3.02 0 0 0 2.12 2.14c1.88.5 9.38.5 9.38.5s7.5 0 9.38-.5a3.02 3.02 0 0 0 2.12-2.14C24 15.93 24 12 24 12s0-3.93-.5-5.81ZM9.55 15.57V8.43L15.82 12l-6.27 3.57Z" />
  ),
  x: (
    <path d="M18.9 1.15h3.68l-8.04 9.19L24 22.85h-7.41l-5.8-7.58-6.64 7.58H.47l8.6-9.83L0 1.15h7.59l5.24 6.93 6.07-6.93Zm-1.29 19.5h2.04L6.49 3.24H4.3l13.31 17.4Z" />
  ),
  tiktok: (
    <path d="M12.53.02C13.84 0 15.14.01 16.44 0c.08 1.53.63 3.09 1.75 4.17 1.12 1.11 2.7 1.62 4.24 1.79v4.03c-1.44-.05-2.89-.35-4.2-.97-.57-.26-1.1-.59-1.62-.93-.01 2.92.01 5.84-.02 8.75-.08 1.4-.54 2.79-1.35 3.94-1.31 1.92-3.58 3.17-5.91 3.21-1.43.08-2.86-.31-4.08-1.03-2.02-1.19-3.44-3.37-3.65-5.71-.02-.5-.03-1-.01-1.49.18-1.9 1.12-3.72 2.58-4.96 1.66-1.44 3.98-2.13 6.15-1.72.02 1.48-.04 2.96-.04 4.44-.99-.32-2.15-.23-3.02.37-.63.41-1.11 1.04-1.36 1.75-.21.51-.15 1.07-.14 1.61.24 1.64 1.82 3.02 3.5 2.87 1.12-.01 2.19-.66 2.77-1.61.19-.33.4-.67.41-1.06.1-1.79.06-3.57.07-5.36.01-4.03-.01-8.05.02-12.07Z" />
  ),
  whatsapp: (
    <path d="M17.47 14.38c-.3-.15-1.76-.87-2.03-.97-.27-.1-.47-.15-.67.15-.2.3-.77.97-.94 1.17-.17.2-.35.22-.64.07-.3-.15-1.26-.46-2.4-1.47-.88-.79-1.48-1.76-1.65-2.06-.17-.3-.02-.46.13-.6.13-.13.3-.35.44-.52.15-.17.2-.3.3-.5.1-.2.05-.37-.02-.52-.08-.15-.67-1.62-.92-2.22-.24-.58-.49-.5-.67-.51h-.57c-.2 0-.52.07-.8.37-.27.3-1.04 1.02-1.04 2.5 0 1.47 1.07 2.89 1.22 3.09.15.2 2.11 3.22 5.1 4.51.71.31 1.27.49 1.7.63.72.23 1.37.2 1.88.12.57-.09 1.76-.72 2.01-1.42.25-.7.25-1.29.17-1.42-.07-.13-.27-.2-.57-.35Zm-5.42 7.4h-.01a9.87 9.87 0 0 1-5.03-1.38l-.36-.21-3.74.98 1-3.65-.24-.37a9.86 9.86 0 0 1-1.51-5.26c0-5.45 4.44-9.88 9.9-9.88 2.64 0 5.13 1.03 7 2.9a9.82 9.82 0 0 1 2.89 7c0 5.45-4.44 9.88-9.9 9.88Zm8.42-18.3A11.82 11.82 0 0 0 12.05 0C5.5 0 .16 5.33.16 11.89c0 2.1.55 4.14 1.59 5.94L.06 24l6.33-1.66a11.88 11.88 0 0 0 5.66 1.44h.01c6.55 0 11.89-5.33 11.89-11.89 0-3.18-1.24-6.16-3.48-8.4Z" />
  )
};

// Shown for platforms without a dedicated icon, so a new value chosen in the
// CMS never renders an empty circle.
const fallbackIcon = (
  <path d="M12 2a10 10 0 1 0 0 20 10 10 0 0 0 0-20Zm7.93 9h-3.45a15.7 15.7 0 0 0-1.46-6.03A8.02 8.02 0 0 1 19.93 11ZM12 4.04c.83 1.2 1.9 3.6 2.16 6.96H9.84c.26-3.35 1.33-5.76 2.16-6.96ZM4.07 13h3.45c.12 2.27.63 4.33 1.46 6.03A8.02 8.02 0 0 1 4.07 13Zm4.91-2H4.07a8.02 8.02 0 0 1 4.91-6.03A15.7 15.7 0 0 0 7.52 11h1.46Zm3.02 8.96c-.83-1.2-1.9-3.6-2.16-6.96h4.32c-.26 3.35-1.33 5.76-2.16 6.96Zm3.02-.93A15.7 15.7 0 0 0 16.48 13h3.45a8.02 8.02 0 0 1-4.91 6.03Z" />
);

export default function Footer({ navigation, site }: FooterProps) {
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
          <Link href="/" className="group inline-flex items-center" aria-label={`${site.name} - accueil`}>
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
            <div className="mt-6">
              <Link
                href="/nous-soutenir"
                className="inline-flex min-h-14 items-center rounded-full bg-parchment px-8 py-4 text-lg font-medium text-bark transition hover:brightness-95"
              >
                {site.donationLabel}
              </Link>
            </div>
          )}
        </div>
        <div className="grid gap-8 sm:grid-cols-3">
          <nav className="grid gap-3" aria-label="Navigation secondaire">
            {navigation.map((item) => (
              <Link
                key={item.href}
                href={item.href}
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
          </div>
          <div className="text-lg leading-8 text-bark/75">
            <p className="mb-2 font-bold text-bark">Liens</p>
            {site.legalLinks.map((item) => (
              <Link key={item.label} href={item.href} className="block transition hover:text-bark">
                {item.label}
              </Link>
            ))}
            <div className="mt-4 flex gap-3" aria-label="Réseaux sociaux">
              {site.socialLinks.map((item) => (
                <a
                  key={`${item.platform}-${item.href}`}
                  href={item.href}
                  aria-label={item.label}
                  className="flex h-9 w-9 items-center justify-center rounded-full border border-bark/25 transition hover:border-bark hover:bg-bark hover:text-fern"
                >
                  <svg viewBox="0 0 24 24" className="h-4 w-4" fill="currentColor" aria-hidden="true">
                    {socialIcons[item.platform] ?? fallbackIcon}
                  </svg>
                </a>
              ))}
            </div>
          </div>
        </div>
      </div>
    </footer>
  );
}
