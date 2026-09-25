import Link from "next/link";
import { ArrowUpRight, Heart, House, Sprout } from "lucide-react";
import { newTabProps } from "@/lib/links";
import { notFound } from "next/navigation";
import CheckList from "@/components/CheckList";
import DonationSelector from "@/components/DonationSelector";
import Hero from "@/components/Hero";
import Section from "@/components/Section";
import ScrollReveal from "@/components/ScrollReveal";
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

      <section className="px-5 py-16 sm:px-8 lg:py-20" aria-labelledby="donation-impact-title">
        <div className="mx-auto max-w-6xl">
          <p className="text-[13px] font-semibold uppercase tracking-[0.22em] text-moss">{support.cause.eyebrow}</p>
          <h2 id="donation-impact-title" className="mt-4 font-display text-[clamp(1.95rem,3.4vw,3.25rem)] font-light leading-tight text-bark">
            {support.cause.title}
          </h2>
          <ScrollReveal className="mt-12 grid gap-8 md:grid-cols-3 md:gap-0">
            {support.cause.paragraphs?.flatMap((paragraph) => paragraph.split(/\n{2,}/)).map((paragraph, index) => {
              const separator = paragraph.indexOf(":");
              const title = separator > 0 ? paragraph.slice(0, separator).trim() : undefined;
              const text = separator > 0 ? paragraph.slice(separator + 1).trim() : paragraph;
              const Icon = [House, Sprout, Heart][index] ?? Heart;
              return (
                <article key={paragraph} className="border-b border-bark/10 pb-8 text-center last:border-0 last:pb-0 md:border-b-0 md:px-8 md:pb-0">
                  <div className="mx-auto mb-5 flex h-16 w-16 items-center justify-center rounded-full bg-fern/45 text-brand-dark">
                    <Icon aria-hidden="true" className="h-8 w-8" strokeWidth={1.5} />
                  </div>
                  {title && <h3 className="text-2xl font-semibold leading-tight text-bark lg:text-[1.75rem]">{title}</h3>}
                  <p className="mt-3 text-base leading-relaxed text-bark/75">{text}</p>
                </article>
              );
            })}
          </ScrollReveal>
        </div>
      </section>

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

      {site.socialLinks.some((link) => ["linkedin", "facebook", "instagram"].includes(link.platform)) && (
        <section className="px-5 py-16 sm:px-8 lg:py-20" aria-labelledby="support-social-title">
          <ScrollReveal className="mx-auto flex max-w-6xl flex-col gap-8 rounded-[1.5rem] bg-linen/65 p-8 sm:p-12 lg:flex-row lg:items-center lg:justify-between">
            <div className="max-w-lg">
              <p className="text-[13px] font-semibold uppercase tracking-[0.22em] text-moss">{locale === "fr" ? "Gardons le lien" : "Stay connected"}</p>
              <h2 id="support-social-title" className="mt-4 font-display text-3xl font-light leading-tight text-bark">
                {locale === "fr" ? "Suivez la vie de Solea" : "Follow Solea’s journey"}
              </h2>
              <p className="mt-4 leading-relaxed text-bark/75">
                {locale === "fr" ? "Découvrez les avancées de la Fondation et partagez notre engagement autour de vous." : "Discover the Foundation’s progress and share our commitment with those around you."}
              </p>
            </div>
            <div className="flex flex-wrap gap-3">
              {site.socialLinks.filter((link) => ["linkedin", "facebook", "instagram"].includes(link.platform)).map((link) => (
                <Link key={link.platform} href={link.href} {...newTabProps(link.newTab)} className="inline-flex min-h-12 items-center gap-3 rounded-full border border-moss/35 px-5 py-3 font-semibold text-bark transition-colors hover:bg-paper focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-4 focus-visible:outline-moss">
                  {{ linkedin: "LinkedIn", facebook: "Facebook", instagram: "Instagram" }[link.platform]}
                  <ArrowUpRight aria-hidden="true" className="h-4 w-4" />
                </Link>
              ))}
            </div>
          </ScrollReveal>
        </section>
      )}
    </>
  );
}
