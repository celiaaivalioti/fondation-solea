import Image from "next/image";
import Link from "next/link";
import CTAButton from "@/components/CTAButton";
import Hero from "@/components/Hero";
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
    <>
      <Hero
        eyebrow={locale === "fr" ? "Sponsors" : "Sponsors"}
        title={sponsors.title}
        text={sponsors.intro}
        image="/images/sponsors/hero-swiss-lakeside-meadow.png"
        imageAlt={
          locale === "fr"
            ? "Prairie au bord d'un lac en Suisse romande dans une lumière douce"
            : "Lakeside meadow in French-speaking Switzerland in soft morning light"
        }
        imageClassName="object-cover object-[50%_center]"
        action={<></>}
      />

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
                      <div className="relative h-12 w-full">
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
                        className="flex min-h-20 items-center justify-start transition opacity-90 hover:opacity-100"
                      >
                        {logo}
                      </Link>
                    ) : (
                      <div
                        key={`${section.title}-${sponsor.name}`}
                        className="flex min-h-20 items-center justify-start"
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

      <section className="bg-parchment px-5 py-20 sm:px-8 lg:py-24">
        <ScrollReveal className="mx-auto flex max-w-3xl flex-col items-center gap-8 text-center">
          <p className="font-display text-[clamp(1.8rem,3.2vw,3rem)] font-light leading-[1.12] text-bark text-balance">
            {locale === "fr"
              ? "Vous souhaitez, vous aussi, faire grandir Solea ?"
              : "Would you also like to help Solea grow?"}
          </p>
          <CTAButton href={sponsors.cta.href} variant={sponsors.cta.variant ?? "primary"} newTab={sponsors.cta.newTab}>
            {sponsors.cta.label}
          </CTAButton>
        </ScrollReveal>
      </section>
    </>
  );
}
