import Image from "next/image";
import Link from "next/link";
import type { NavigationItem, SiteSettings } from "@/lib/cms-types";

type FooterProps = {
  navigation: NavigationItem[];
  site: SiteSettings;
};

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
                  key={item.platform}
                  href={item.href}
                  aria-label={item.label}
                  className="flex h-9 w-9 items-center justify-center rounded-full border border-bark/25 transition hover:border-bark hover:bg-bark hover:text-fern"
                >
                  {item.platform === "linkedin" && (
                    <svg viewBox="0 0 24 24" className="h-4 w-4" fill="currentColor" aria-hidden="true">
                      <path d="M4.98 3.5a2.5 2.5 0 1 1 0 5 2.5 2.5 0 0 1 0-5ZM3 9.75h4v11h-4v-11Zm6 0h3.84v1.5h.05c.54-.96 1.86-1.97 3.83-1.97 4.1 0 4.86 2.7 4.86 6.21v5.26h-4v-4.66c0-1.11-.02-2.54-1.55-2.54-1.55 0-1.79 1.21-1.79 2.46v4.74H9v-11Z" />
                    </svg>
                  )}
                  {item.platform === "facebook" && (
                    <svg viewBox="0 0 24 24" className="h-4 w-4" fill="currentColor" aria-hidden="true">
                      <path d="M13.5 22v-8h2.7l.4-3.2h-3.1v-2c0-.93.26-1.56 1.6-1.56h1.7V4.4c-.3-.04-1.3-.13-2.46-.13-2.43 0-4.1 1.49-4.1 4.22v2.31H7.5V14h2.74v8h3.26Z" />
                    </svg>
                  )}
                  {item.platform === "instagram" && (
                    <svg viewBox="0 0 24 24" className="h-4 w-4" fill="currentColor" aria-hidden="true">
                      <path d="M12 2.16c3.2 0 3.58.01 4.85.07 1.17.05 1.8.25 2.23.41.56.22.96.48 1.38.9.42.42.68.82.9 1.38.16.42.35 1.06.41 2.23.06 1.26.07 1.64.07 4.85s-.01 3.58-.07 4.85c-.05 1.17-.25 1.8-.41 2.23-.22.56-.48.96-.9 1.38-.42.42-.82.68-1.38.9-.42.16-1.06.35-2.23.41-1.26.06-1.64.07-4.85.07s-3.58-.01-4.85-.07c-1.17-.05-1.8-.25-2.23-.41a3.72 3.72 0 0 1-1.38-.9 3.72 3.72 0 0 1-.9-1.38c-.16-.42-.35-1.06-.41-2.23-.06-1.26-.07-1.64-.07-4.85s.01-3.58.07-4.85c.05-1.17.25-1.8.41-2.23.22-.56.48-.96.9-1.38.42-.42.82-.68 1.38-.9.42-.16 1.06-.35 2.23-.41 1.26-.06 1.64-.07 4.85-.07M12 .16C8.74.16 8.33.17 7.05.23 5.78.29 4.9.49 4.14.79c-.8.31-1.48.72-2.13 1.38A5.88 5.88 0 0 0 .63 4.3c-.3.76-.5 1.64-.56 2.91C.01 8.49 0 8.9 0 12.16s.01 3.67.07 4.95c.06 1.27.26 2.15.56 2.91.31.8.72 1.48 1.38 2.13.65.66 1.33 1.07 2.13 1.38.76.3 1.64.5 2.91.56 1.28.06 1.69.07 4.95.07s3.67-.01 4.95-.07c1.27-.06 2.15-.26 2.91-.56a5.88 5.88 0 0 0 2.13-1.38 5.88 5.88 0 0 0 1.38-2.13c.3-.76.5-1.64.56-2.91.06-1.28.07-1.69.07-4.95s-.01-3.67-.07-4.95c-.06-1.27-.26-2.15-.56-2.91a5.88 5.88 0 0 0-1.38-2.13A5.88 5.88 0 0 0 19.86.79c-.76-.3-1.64-.5-2.91-.56C15.67.17 15.26.16 12 .16Zm0 5.84a6.16 6.16 0 1 0 6.16 6.16A6.16 6.16 0 0 0 12 6Zm0 10.15a4 4 0 1 1 4-4 4 4 0 0 1-4 4Zm7.85-10.4a1.44 1.44 0 1 1-1.44-1.44 1.44 1.44 0 0 1 1.44 1.44Z" />
                    </svg>
                  )}
                </a>
              ))}
            </div>
          </div>
        </div>
      </div>
    </footer>
  );
}
