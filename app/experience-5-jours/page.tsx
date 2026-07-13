import Image from "next/image";
import { Brain, Heart, Leaf, Sparkles } from "lucide-react";
import CheckList from "@/components/CheckList";
import CTAButton from "@/components/CTAButton";
import Hero from "@/components/Hero";
import Section from "@/components/Section";
import ScrollReveal from "@/components/ScrollReveal";
import TherapyCard from "@/components/TherapyCard";
import { getCmsContent } from "@/lib/cms";
import type { ApproachPillar } from "@/lib/cms-types";

export async function generateMetadata() {
  const { retreat } = await getCmsContent();

  return {
    title: retreat.metadataTitle
  };
}

const approachIcons: Record<ApproachPillar["icon"], typeof Leaf> = {
  leaf: Leaf,
  brain: Brain,
  heart: Heart,
  sparkles: Sparkles
};

export default async function RetreatPage() {
  const { retreat } = await getCmsContent();

  return (
    <>
      <Hero
        eyebrow={retreat.hero.eyebrow}
        title={retreat.hero.title}
        text={retreat.hero.text}
        image={retreat.hero.image.url}
        imageAlt={retreat.hero.image.alt}
        imageClassName={retreat.hero.image.className}
        primaryHref={retreat.hero.primary?.href}
        primaryLabel={retreat.hero.primary?.label}
        secondaryHref={retreat.hero.secondary?.href}
        secondaryLabel={retreat.hero.secondary?.label}
      />
      <section className="px-5 py-16 sm:px-8 lg:py-20">
        <div className="mx-auto max-w-4xl">
          <h2 className="font-display text-[clamp(2.4rem,4.6vw,3rem)] font-light leading-[1.05] text-bark">
            {retreat.immersive.title}
          </h2>

          <div className="mt-8 grid gap-6 text-[1.15rem] leading-[1.85] text-bark/80 text-pretty">
            {retreat.immersive.paragraphs?.map((paragraph) => (
              <p key={paragraph}>{paragraph}</p>
            ))}
          </div>
        </div>
      </section>

      <Section
        tone="linen"
        eyebrow={retreat.mission.eyebrow}
        title={retreat.mission.title}
        intro={retreat.mission.intro}
      >
        <ScrollReveal>
          <CheckList items={retreat.mission.items} />
        </ScrollReveal>
      </Section>

      <Section
        eyebrow={retreat.approach.eyebrow}
        title={retreat.approach.title}
        intro={retreat.approach.intro}
      >
        <ScrollReveal className="grid gap-6 md:grid-cols-2">
          {retreat.approach.items.map(({ title, icon, text }) => {
            const Icon = approachIcons[icon];

            return (
              <article
                key={title}
                className="group relative overflow-hidden rounded-[1.25rem] bg-paper/85 p-9 shadow-soft backdrop-blur-sm transition-all duration-500 ease-out-soft hover:-translate-y-1 hover:shadow-glow"
              >
                <Icon aria-hidden="true" strokeWidth={1.5} className="h-8 w-8 text-moss" />
                <h3 className="mt-5 font-display text-[1.55rem] font-light leading-tight text-bark">
                  {title}
                </h3>
                <p className="mt-5 text-[1.05rem] leading-[1.85] text-bark/70 text-pretty">{text}</p>
              </article>
            );
          })}
        </ScrollReveal>
      </Section>

      <section
        id="therapies-proposees"
        className="relative scroll-mt-28 bg-ivory/65 px-5 py-24 sm:px-8 lg:scroll-mt-32 lg:py-28"
      >
        <div className="mx-auto max-w-[1400px]">
          <div className="max-w-4xl">
            <div className="mb-5">
              <p className="text-[13px] font-semibold uppercase tracking-[0.22em] text-moss">
                {retreat.therapies.eyebrow}
              </p>
            </div>
            <h2 className="font-display text-[clamp(1.95rem,3.4vw,3.25rem)] font-light leading-[1.1] text-bark text-balance">
              {retreat.therapies.title}
            </h2>
            <p className="mt-6 max-w-[72ch] text-[1.12rem] leading-[1.85] text-bark/72 text-pretty">
              {retreat.therapies.intro}
            </p>
          </div>
          <ScrollReveal className="mt-12 grid gap-6 md:grid-cols-2 xl:grid-cols-3">
            {retreat.therapies.items.map((therapy) => (
              <TherapyCard
                key={therapy.title}
                title={therapy.title}
                text={therapy.text}
                image={therapy.image?.url}
              />
            ))}
          </ScrollReveal>
        </div>
      </section>

      <Section tone="linen" eyebrow={retreat.program.eyebrow} title={retreat.program.title}>
        <ScrollReveal>
          <CheckList items={retreat.program.items} />
        </ScrollReveal>
      </Section>

      <Section
        eyebrow={retreat.place.eyebrow}
        title={retreat.place.title}
        intro={retreat.place.intro}
      >
        <ScrollReveal className="grid gap-6">
          <div className="grid gap-5 sm:grid-cols-3">
            {retreat.place.gallery.map((photo) => (
              <div
                key={photo.url}
                className={`relative overflow-hidden rounded-[1.25rem] shadow-soft ${photo.frameClass ?? "aspect-[4/3]"}`}
              >
                <Image
                  src={photo.url}
                  alt={photo.alt}
                  fill
                  className="object-cover"
                  sizes="(min-width: 1024px) 32vw, (min-width: 640px) 45vw, 90vw"
                />
              </div>
            ))}
          </div>
          <div className="mt-4">
            <CTAButton href={retreat.place.cta.href} variant={retreat.place.cta.variant ?? "primary"}>
              {retreat.place.cta.label}
            </CTAButton>
          </div>
        </ScrollReveal>
      </Section>
    </>
  );
}
