import Image from "next/image";
import Hero from "@/components/Hero";
import CTAButton from "@/components/CTAButton";
import ScrollReveal from "@/components/ScrollReveal";
import RichText from "@/components/RichText";
import { getCmsContent } from "@/lib/cms";
import { isCtaVisible } from "@/lib/cta";
import { type Locale, defaultLocale } from "@/lib/locales";
import { createPageMetadata } from "@/lib/page-metadata";

export async function generateHomeMetadata(locale: Locale = defaultLocale) {
  const { home } = await getCmsContent(locale);

  return createPageMetadata(home.metadataTitle, home.hero.text);
}

export default async function HomePage({ locale = defaultLocale }: { locale?: Locale } = {}) {
  const { home } = await getCmsContent(locale);
  const { portraitImage, portraitAlternativeText, quoteAttribution } = home.manifesto;
  const attributionLines = quoteAttribution?.split("\n").filter((line) => line.trim());
  const hasPortraitAttribution = Boolean(portraitImage?.url || attributionLines?.length);

  return (
    <>
      <Hero
        layout="background"
        eyebrow={home.hero.eyebrow}
        title={home.hero.title}
        text={home.hero.text}
        image={home.hero.image.url}
        imageAlt={home.hero.image.alt}
        imageClassName={home.hero.image.className}
        primaryHref={home.hero.primary?.href}
        primaryLabel={home.hero.primary?.label}
        primaryVisible={isCtaVisible(home.hero.primary)}
        secondaryHref={home.hero.secondary?.href}
        secondaryLabel={home.hero.secondary?.label}
        secondaryVisible={isCtaVisible(home.hero.secondary)}
      />

      {/* Manifesto section */}
      <section className="px-5 py-16 sm:px-8 lg:py-20">
        <ScrollReveal className="mx-auto max-w-4xl">
          <div className="group">
            <h2 className="font-display text-[clamp(2.4rem,4.6vw,3rem)] font-light leading-[1.05] text-bark">
              {home.manifesto.title}
            </h2>
          </div>

          <div className="mt-8 grid gap-6">
            {home.manifesto.quote && (
              <figure className={hasPortraitAttribution ? "grid items-center gap-8 lg:grid-cols-[minmax(0,1fr)_16rem] lg:gap-12" : undefined}>
                <blockquote className="whitespace-pre-line font-display text-[clamp(1.25rem,2.1vw,1.55rem)] font-light leading-[1.5] text-bark text-pretty">
                  {home.manifesto.quote}
                </blockquote>
                {hasPortraitAttribution && (
                  <figcaption className="grid justify-items-start gap-5">
                    {portraitImage?.url && (
                      <div className="relative aspect-square w-48 overflow-hidden rounded-[1.25rem] bg-linen lg:w-56">
                        <Image
                          src={portraitImage.url}
                          alt={portraitAlternativeText ?? portraitImage.alt ?? ""}
                          fill
                          className="object-cover object-top"
                          sizes="(min-width: 1024px) 224px, 192px"
                        />
                      </div>
                    )}
                    {attributionLines && attributionLines.length > 0 && (
                      <div className="text-sm leading-relaxed text-bark/70">
                        <p className="mb-1 text-base font-semibold text-bark">{attributionLines[0]}</p>
                        {attributionLines.slice(1).map((line, index) => <p key={index}>{line}</p>)}
                      </div>
                    )}
                  </figcaption>
                )}
              </figure>
            )}

            <RichText
              text={home.manifesto.paragraphs?.join("\n\n")}
              gapClassName="gap-6"
              paragraphClassName="text-[1.15rem] leading-[1.65] text-bark/80 text-pretty"
            />
          </div>

          {isCtaVisible(home.manifesto.cta) && (
            <div className="mt-12 flex justify-start">
              <CTAButton href={home.manifesto.cta.href} variant={home.manifesto.cta.variant ?? "primary"} newTab={home.manifesto.cta.newTab}>
                {home.manifesto.cta.label}
              </CTAButton>
            </div>
          )}
        </ScrollReveal>
      </section>
    </>
  );
}
