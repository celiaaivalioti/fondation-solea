import Hero from "@/components/Hero";
import CTAButton from "@/components/CTAButton";
import ScrollReveal from "@/components/ScrollReveal";
import { getCmsContent } from "@/lib/cms";

export async function generateMetadata() {
  const { home } = await getCmsContent();

  return {
    title: home.metadataTitle
  };
}

export default async function Home() {
  const { home } = await getCmsContent();

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
        secondaryHref={home.hero.secondary?.href}
        secondaryLabel={home.hero.secondary?.label}
      />

      {/* Manifesto section - title, description, two passages, CTA */}
      <section className="px-5 py-16 sm:px-8 lg:py-20">
        <ScrollReveal className="mx-auto max-w-4xl">
          <div className="group">
            <h2 className="font-display text-[clamp(2.4rem,4.6vw,3rem)] font-light leading-[1.05] text-bark">
              {home.manifesto.title}
            </h2>
          </div>

          <div className="mt-8 grid gap-6">
            {home.manifesto.quote && (
              <blockquote className="whitespace-pre-line font-display text-[clamp(1.25rem,2.1vw,1.55rem)] font-light leading-[1.5] text-bark text-pretty">
                {home.manifesto.quote}
              </blockquote>
            )}

            {home.manifesto.paragraphs?.map((paragraph) => (
              <p key={paragraph} className="whitespace-pre-line text-[1.15rem] leading-[1.85] text-bark/80 text-pretty">
                {paragraph}
              </p>
            ))}
          </div>

          {home.manifesto.cta && (
            <div className="mt-12 flex justify-start">
              <CTAButton href={home.manifesto.cta.href} variant={home.manifesto.cta.variant ?? "primary"}>
                {home.manifesto.cta.label}
              </CTAButton>
            </div>
          )}
        </ScrollReveal>
      </section>
    </>
  );
}
