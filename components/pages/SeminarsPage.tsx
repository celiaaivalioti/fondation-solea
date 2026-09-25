import CheckList from "@/components/CheckList";
import ResourceLibrary from "@/components/ResourceLibrary";
import Hero from "@/components/Hero";
import Section from "@/components/Section";
import ScrollReveal from "@/components/ScrollReveal";
import { getCmsContent } from "@/lib/cms";
import { isCtaVisible } from "@/lib/cta";
import { type Locale, defaultLocale } from "@/lib/locales";
import { createPageMetadata } from "@/lib/page-metadata";

export async function generateSeminarsMetadata(locale: Locale = defaultLocale) {
  const { seminars } = await getCmsContent(locale);

  return createPageMetadata(seminars.metadataTitle, seminars.hero.text);
}

export default async function SeminarsPage({ locale = defaultLocale }: { locale?: Locale } = {}) {
  const { seminars } = await getCmsContent(locale);

  return (
    <>
      <Hero
        eyebrow={seminars.hero.eyebrow}
        title={seminars.hero.title}
        text={seminars.hero.text}
        image={seminars.hero.image.url}
        imageAlt={seminars.hero.image.alt}
        imageClassName={seminars.hero.image.className}
        primaryHref={seminars.hero.primary?.href}
        primaryLabel={seminars.hero.primary?.label}
        primaryVisible={isCtaVisible(seminars.hero.primary)}
        secondaryHref={seminars.hero.secondary?.href}
        secondaryLabel={seminars.hero.secondary?.label}
        secondaryVisible={isCtaVisible(seminars.hero.secondary)}
        tertiaryHref={seminars.hero.tertiary?.href}
        tertiaryLabel={seminars.hero.tertiary?.label}
        tertiaryVisible={isCtaVisible(seminars.hero.tertiary)}
      />
      <Section
        tone="parchment"
        className="py-28 lg:py-36"
        eyebrow={seminars.themes.eyebrow}
        title={seminars.themes.title}
        intro={seminars.themes.intro}
      >
        <ScrollReveal>
          <CheckList items={seminars.themes.items} />
        </ScrollReveal>
      </Section>
      {seminars.resources && <ResourceLibrary resources={seminars.resources} locale={locale} />}
    </>
  );
}
