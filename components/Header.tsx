"use client";

import { useEffect, useState } from "react";
import Image from "next/image";
import Link from "next/link";
import { usePathname } from "next/navigation";
import { ChevronDown } from "lucide-react";
import type { NavigationItem, SiteSettings } from "@/lib/cms-types";
import { type Locale, defaultLocale, getLanguageSwitchHref, localizeHref } from "@/lib/locales";
import { newTabProps } from "@/lib/links";
import CTAButton from "./CTAButton";

type HeaderProps = {
  navigation: NavigationItem[];
  site: SiteSettings;
  locale?: Locale;
};

export default function Header({ navigation, site, locale = defaultLocale }: HeaderProps) {
  const [isOpen, setIsOpen] = useState(false);
  const [isLanguageOpen, setIsLanguageOpen] = useState(false);
  const [isScrolled, setIsScrolled] = useState(false);
  const pathname = usePathname();
  const homeHref = localizeHref("/", locale);
  const normalizedPathname = pathname.replace(/\/$/, "") || "/";
  const normalizedHomeHref = homeHref.replace(/\/$/, "") || "/";
  const isHome = normalizedPathname === normalizedHomeHref;
  const isOverlay = isHome && !isScrolled;

  const isActive = (href: string) =>
    href === "/" ? pathname === "/" : pathname.startsWith(href);

  useEffect(() => {
    const updateHeader = () => setIsScrolled(window.scrollY > 8);

    updateHeader();
    window.addEventListener("scroll", updateHeader, { passive: true });

    return () => window.removeEventListener("scroll", updateHeader);
  }, []);

  const languageOptions: Array<{ locale: Locale; label: string }> = [
    { locale: "fr", label: "Français" },
    { locale: "en", label: "English" }
  ];

  const languageSwitcher = (
    <div
      className="relative"
      onBlur={(event) => {
        if (!event.currentTarget.contains(event.relatedTarget)) {
          setIsLanguageOpen(false);
        }
      }}
    >
      <button
        type="button"
        aria-expanded={isLanguageOpen}
        aria-haspopup="menu"
        className={`inline-flex min-h-10 items-center gap-2 rounded-full border px-4 text-sm font-semibold uppercase tracking-[0.12em] transition-all duration-500 ease-out-soft ${
          isOverlay
            ? "border-paper/35 text-paper hover:border-paper hover:bg-paper/10"
            : "border-moss/25 text-moss hover:border-moss hover:bg-linen"
        }`}
        onClick={() => setIsLanguageOpen((value) => !value)}
      >
        {locale}
        <ChevronDown
          aria-hidden="true"
          strokeWidth={1.8}
          className={`h-4 w-4 transition-transform ${isLanguageOpen ? "rotate-180" : ""}`}
        />
      </button>

      {isLanguageOpen && (
        <div
          role="menu"
          className="absolute right-0 z-[70] mt-2 min-w-36 overflow-hidden rounded-2xl border border-moss/15 bg-paper p-1.5 shadow-soft"
        >
          {languageOptions.map((option) => {
            const active = option.locale === locale;

            return (
              <Link
                key={option.locale}
                href={getLanguageSwitchHref(pathname, option.locale)}
                hrefLang={option.locale}
                role="menuitem"
                aria-current={active ? "true" : undefined}
                className={`block rounded-xl px-4 py-3 text-sm font-semibold transition ${
                  active ? "bg-linen text-moss" : "text-bark/78 hover:bg-linen hover:text-moss"
                }`}
                onClick={() => setIsLanguageOpen(false)}
              >
                {option.label}
              </Link>
            );
          })}
        </div>
      )}
    </div>
  );

  return (
    <header
      className={`${isHome ? "fixed inset-x-0 top-0" : "sticky top-0"} z-50 border-b px-5 transition-all duration-500 ease-out-soft sm:px-8 ${
        isScrolled
          ? "bg-paper py-4 shadow-glow"
          : "border-transparent bg-paper/0 py-6"
      }`}
    >
      <div className="mx-auto flex max-w-[1400px] items-center justify-between gap-6">
        <Link
          href={homeHref}
          className="group flex items-center"
          aria-label={`${site.name} - ${locale === "fr" ? "accueil" : "home"}`}
        >
          <Image
            src={isOverlay ? "/images/logo-solea-white.png" : "/images/logo-solea.png"}
            alt={site.name}
            width={5342}
            height={1504}
            priority
            className={`w-auto transition-all duration-500 ease-out-soft ${
              isScrolled ? "h-7" : "h-10"
            }`}
          />
        </Link>
        <nav
          className="ml-auto hidden items-center justify-end gap-7 xl:flex"
          aria-label="Navigation principale"
        >
          {navigation.slice(1).map((item) => {
            const active = isActive(item.href);

            return (
              <Link
                key={item.href}
                href={item.href}
                {...newTabProps(item.newTab)}
                aria-current={active ? "page" : undefined}
                className={`relative ${isScrolled ? "text-[16px]" : "text-[18px]"} tracking-[0.005em] transition-all duration-500 ease-out-soft after:absolute after:bottom-[-7px] after:left-0 after:h-px after:transition-all after:duration-500 after:ease-out-soft ${
                  isOverlay
                    ? `after:bg-paper hover:text-paper ${active ? "font-semibold text-paper after:w-full" : "text-paper/85 after:w-0"}`
                    : `after:bg-moss hover:text-moss ${active ? "font-semibold text-moss after:w-full" : "text-bark/74 after:w-0"}`
                }`}
              >
                {item.label}
              </Link>
            );
          })}
        </nav>
        <div className="hidden items-center gap-3 sm:flex">
          {site.showDonationCta && (
            <CTAButton
              href={localizeHref("/nous-soutenir", locale)}
              className={isScrolled ? "!min-h-10 !px-5 !py-2.5 !text-base" : "!min-h-12 !px-6 !py-3"}
            >
              {site.donationLabel}
            </CTAButton>
          )}
          {languageSwitcher}
          <button
            className={`inline-flex items-center gap-2 rounded-full border font-medium transition-all duration-500 ease-out-soft xl:hidden ${
              isScrolled ? "min-h-10 px-5 py-2.5 text-base" : "min-h-12 px-6 py-3 text-lg"
            } ${
              isOverlay
                ? "border-paper/40 text-paper hover:border-paper hover:bg-paper/10"
                : "border-moss/25 text-moss hover:border-moss hover:bg-linen"
            }`}
            type="button"
            aria-expanded={isOpen}
            aria-controls="mobile-menu"
            onClick={() => setIsOpen((value) => !value)}
          >
            <span className="flex flex-col gap-[3px]">
              <span className={`h-px w-4 transition ${isOverlay ? "bg-paper" : "bg-moss"} ${isOpen ? "translate-y-[3px] rotate-45" : ""}`} />
              <span className={`h-px w-4 transition ${isOverlay ? "bg-paper" : "bg-moss"} ${isOpen ? "-translate-y-[3px] -rotate-45" : ""}`} />
            </span>
            Menu
          </button>
        </div>
        <button
          className={`inline-flex items-center gap-2 rounded-full border font-medium transition-all duration-500 ease-out-soft sm:hidden ${
            isScrolled ? "min-h-10 px-5 py-2.5 text-base" : "min-h-12 px-6 py-3 text-lg"
          } ${
            isOverlay
              ? "border-paper/40 text-paper hover:border-paper hover:bg-paper/10"
              : "border-moss/25 text-moss hover:border-moss hover:bg-linen"
          }`}
          type="button"
          aria-expanded={isOpen}
          aria-controls="mobile-menu"
          onClick={() => setIsOpen((value) => !value)}
        >
          <span className="flex flex-col gap-[3px]">
            <span className={`h-px w-4 transition ${isOverlay ? "bg-paper" : "bg-moss"} ${isOpen ? "translate-y-[3px] rotate-45" : ""}`} />
            <span className={`h-px w-4 transition ${isOverlay ? "bg-paper" : "bg-moss"} ${isOpen ? "-translate-y-[3px] -rotate-45" : ""}`} />
          </span>
          Menu
        </button>
      </div>
      {isOpen && (
        <nav
          id="mobile-menu"
          className="mx-auto mt-4 grid max-w-[1400px] gap-1 rounded-2xl border border-moss/15 bg-paper p-3 shadow-soft xl:hidden"
          aria-label="Navigation mobile"
        >
          {navigation.map((item) => {
            const active = isActive(item.href);

            return (
              <Link
                key={item.href}
                href={item.href}
                {...newTabProps(item.newTab)}
                aria-current={active ? "page" : undefined}
                className={`rounded-xl px-4 py-3.5 text-xl font-medium transition hover:bg-linen hover:text-moss ${
                  active ? "bg-linen text-moss" : "text-bark/82"
                }`}
                onClick={() => setIsOpen(false)}
              >
                {item.label}
              </Link>
            );
          })}
          {site.showDonationCta && (
            <CTAButton href={localizeHref("/nous-soutenir", locale)} className="mt-2 w-full" onClick={() => setIsOpen(false)}>
              {site.donationLabel}
            </CTAButton>
          )}
          <div className="mt-2 grid grid-cols-2 gap-2">
            {languageOptions.map((option) => {
              const active = option.locale === locale;

              return (
                <Link
                  key={option.locale}
                  href={getLanguageSwitchHref(pathname, option.locale)}
                  hrefLang={option.locale}
                  aria-current={active ? "true" : undefined}
                  className={`rounded-xl border px-4 py-3.5 text-center text-lg font-semibold transition ${
                    active
                      ? "border-moss bg-linen text-moss"
                      : "border-moss/20 text-bark/78 hover:border-moss hover:bg-linen hover:text-moss"
                  }`}
                  onClick={() => setIsOpen(false)}
                >
                  {option.locale.toUpperCase()}
                </Link>
              );
            })}
          </div>
        </nav>
      )}
    </header>
  );
}
