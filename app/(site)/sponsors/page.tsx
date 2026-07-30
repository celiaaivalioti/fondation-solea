import Image from "next/image";
import Link from "next/link";
import CTAButton from "@/components/CTAButton";
import RichText from "@/components/RichText";
import ScrollReveal from "@/components/ScrollReveal";
import { getCmsContent } from "@/lib/cms";
import { type Locale, defaultLocale } from "@/lib/locales";

export async function generateSponsorsMetadata(locale: Locale = defaultLocale) {
  const { sponsors } = await getCmsContent(locale);

  return {
    title: sponsors.metadataTitle,
    description: sponsors.intro
  };
}

export const generateMetadata = () => generateSponsorsMetadata();

export default async function SponsorsPage({ locale = defaultLocale }: { locale?: Locale } = {}) {
  const { sponsors } = await getCmsContent(locale);

  return (
    <div className="relative isolate overflow-hidden">
      <section className="px-5 pb-16 pt-32 sm:px-8 lg:pb-20 lg:pt-40">
        <div
          aria-hidden="true"
          className="pointer-events-none absolute -right-24 top-0 h-96 w-96 rounded-full bg-gradient-to-br from-fern/18 to-transparent blur-3xl"
        />
        <div className="relative mx-auto max-w-[1400px]">
          <div className="max-w-5xl">
            <p className="mb-6 text-[13px] font-semibold uppercase tracking-[0.22em] text-moss">
              {locale === "fr" ? "Sponsors" : "Sponsors"}
            </p>
            <h1 className="font-display text-[clamp(2.4rem,6vw,5.5rem)] font-light leading-[1.02] text-bark text-balance">
              {sponsors.title}
            </h1>
            <RichText
              text={sponsors.intro}
              className="mt-10 max-w-[74ch]"
              gapClassName="gap-6"
              paragraphClassName="text-[1.12rem] leading-[1.75] text-bark/76 text-pretty"
            />
          </div>
        </div>
      </section>

      <section className="bg-ivory/65 px-5 py-20 sm:px-8 lg:py-24">
        <div className="mx-auto grid max-w-[1400px] gap-16">
          {sponsors.sections.map((section) => (
            <ScrollReveal key={section.title} className="grid gap-8 lg:grid-cols-[0.36fr_1fr] lg:gap-14">
              <div>
                <h2 className="text-[13px] font-semibold uppercase tracking-[0.22em] text-moss">
                  {section.title}
                </h2>
              </div>

              {section.logos.length > 0 ? (
                <div className="grid gap-4 sm:grid-cols-2 lg:grid-cols-3">
                  {section.logos.map((sponsor) => {
                    const logo = (
                      <div className="relative h-20 w-full">
                        <Image
                          src={sponsor.image.url}
                          alt={sponsor.image.alt}
                          fill
                          className="object-contain"
                          sizes="(min-width: 1024px) 22vw, (min-width: 640px) 42vw, 88vw"
                        />
                      </div>
                    );

                    return sponsor.href ? (
                      <Link
                        key={`${section.title}-${sponsor.name}`}
                        href={sponsor.href}
                        target={sponsor.newTab ? "_blank" : undefined}
                        rel={sponsor.newTab ? "noopener noreferrer" : undefined}
                        aria-label={sponsor.name}
                        className="flex min-h-36 items-center justify-center rounded-[1.25rem] border border-moss/12 bg-paper/80 p-8 shadow-rim transition hover:-translate-y-0.5 hover:border-moss/24 hover:bg-paper"
                      >
                        {logo}
                      </Link>
                    ) : (
                      <div
                        key={`${section.title}-${sponsor.name}`}
                        className="flex min-h-36 items-center justify-center rounded-[1.25rem] border border-moss/12 bg-paper/80 p-8 shadow-rim"
                      >
                        {logo}
                      </div>
                    );
                  })}
                </div>
              ) : (
                <div className="h-px bg-bark/10" aria-hidden="true" />
              )}
            </ScrollReveal>
          ))}
        </div>
      </section>

      <section className="px-5 py-20 sm:px-8 lg:py-24">
        <ScrollReveal className="mx-auto flex max-w-[1400px] flex-col items-start gap-8 sm:flex-row sm:items-center sm:justify-between">
          <p className="max-w-2xl font-display text-[clamp(1.8rem,3.2vw,3rem)] font-light leading-[1.12] text-bark text-balance">
            {locale === "fr"
              ? "Vous souhaitez, vous aussi, faire grandir Solea ?"
              : "Would you also like to help Solea grow?"}
          </p>
          <CTAButton href={sponsors.cta.href} variant={sponsors.cta.variant ?? "primary"} newTab={sponsors.cta.newTab}>
            {sponsors.cta.label}
          </CTAButton>
        </ScrollReveal>
      </section>
    </div>
  );
}
