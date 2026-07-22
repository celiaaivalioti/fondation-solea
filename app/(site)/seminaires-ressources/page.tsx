import CheckList from "@/components/CheckList";
import CTAButton from "@/components/CTAButton";
import Hero from "@/components/Hero";
import Section from "@/components/Section";
import ScrollReveal from "@/components/ScrollReveal";
import { getCmsContent } from "@/lib/cms";

export async function generateMetadata() {
  const { seminars } = await getCmsContent();

  return {
    title: seminars.metadataTitle
  };
}

export default async function SeminarsPage() {
  const { seminars } = await getCmsContent();

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
        secondaryHref={seminars.hero.secondary?.href}
        secondaryLabel={seminars.hero.secondary?.label}
        tertiaryHref={seminars.hero.tertiary?.href}
        tertiaryLabel={seminars.hero.tertiary?.label}
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
      {seminars.resources && seminars.resources.items.length > 0 && (
        <Section
          tone="linen"
          eyebrow={seminars.resources.eyebrow}
          title={seminars.resources.title}
          intro={seminars.resources.intro}
        >
          <ScrollReveal className="grid gap-5">
            {seminars.resources.items.map((resource) => (
              <article key={resource.title} className="rounded-[1.25rem] bg-paper/85 p-7 shadow-soft">
                <h3 className="font-display text-[1.45rem] font-light leading-tight text-bark">
                  {resource.title}
                </h3>
                <p className="mt-4 whitespace-pre-line text-[1rem] leading-[1.75] text-bark/70 text-pretty">
                  {resource.text}
                </p>
                {resource.href && (
                  <div className="mt-6">
                    <CTAButton href={resource.href} variant="secondary" newTab={resource.newTab}>
                      Découvrir
                    </CTAButton>
                  </div>
                )}
              </article>
            ))}
          </ScrollReveal>
        </Section>
      )}
    </>
  );
}
