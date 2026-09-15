import { notFound } from "next/navigation";
import CheckList from "@/components/CheckList";
import DonationSelector from "@/components/DonationSelector";
import Hero from "@/components/Hero";
import Section from "@/components/Section";
import ScrollReveal from "@/components/ScrollReveal";
import RichText from "@/components/RichText";
import { getCmsContent } from "@/lib/cms";
import { type Locale, defaultLocale } from "@/lib/locales";
import { createPageMetadata } from "@/lib/page-metadata";

const canPreviewHiddenDonationPage = (isPublic: boolean) =>
  isPublic || process.env.NODE_ENV === "development";

export async function generateSupportMetadata(locale: Locale = defaultLocale) {
  const { site, support } = await getCmsContent(locale);

  if (!canPreviewHiddenDonationPage(site.showDonationCta)) {
    return createPageMetadata(
      locale === "fr" ? "Page indisponible" : "Page unavailable",
      locale === "fr" ? "Cette page n’est pas disponible." : "This page is unavailable."
    );
  }

  return createPageMetadata(support.metadataTitle, support.hero.text);
}

export default async function SupportPage({ locale = defaultLocale }: { locale?: Locale } = {}) {
  const { site, support } = await getCmsContent(locale);

  if (!canPreviewHiddenDonationPage(site.showDonationCta)) {
    notFound();
  }

  return (
    <>
      <Hero
        eyebrow={support.hero.eyebrow}
        title={support.hero.title}
        text={support.hero.text}
        image={support.hero.image.url}
        imageAlt={support.hero.image.alt}
        imageClassName={support.hero.image.className}
        action={
          <p className="mt-10 text-lg font-semibold leading-relaxed text-moss sm:text-xl">
            {locale === "fr"
              ? "En Suisse, votre don est déductible des impôts."
              : "In Switzerland, your donation is tax-deductible."}
          </p>
        }
      />

      <DonationSelector locale={locale} />

      <Section
        compact
        eyebrow={support.cause.eyebrow}
        title={support.cause.title}
        className="pt-16 lg:pt-20"
      >
        <ScrollReveal>
          <RichText
            text={support.cause.paragraphs?.join("\n\n")}
            className="max-w-[58ch]"
            paragraphClassName="text-[1.15rem] leading-[1.65] text-bark/80 text-pretty"
          />
        </ScrollReveal>
      </Section>

      <Section tone="linen" eyebrow={support.help.eyebrow} title={support.help.title}>
        <ScrollReveal>
          <CheckList items={support.help.items} />
        </ScrollReveal>
      </Section>

      <section className="relative bg-[rgb(var(--button-primary-bg)/1)] px-5 py-16 text-paper sm:px-8 lg:py-24">
        <ScrollReveal className="mx-auto max-w-5xl">
          <figure className="text-center">
            <blockquote className="mx-auto max-w-2xl whitespace-pre-line font-display text-[clamp(1.35rem,2.2vw,1.65rem)] font-light leading-[1.45] text-paper">
              {support.testimonial.quote}
            </blockquote>
          </figure>
        </ScrollReveal>
      </section>
    </>
  );
}
