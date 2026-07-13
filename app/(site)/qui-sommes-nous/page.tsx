import Image from "next/image";
import CTAButton from "@/components/CTAButton";
import Hero from "@/components/Hero";
import ScrollReveal from "@/components/ScrollReveal";
import Section from "@/components/Section";
import { getCmsContent } from "@/lib/cms";
import { getSectionIcon } from "@/lib/icons";

export async function generateMetadata() {
  const { about } = await getCmsContent();

  return {
    title: about.metadataTitle
  };
}

export default async function AboutPage() {
  const { about } = await getCmsContent();

  return (
    <>
      <Hero
        eyebrow={about.hero.eyebrow}
        title={about.hero.title}
        text={about.hero.text}
        image={about.hero.image.url}
        imageAlt={about.hero.image.alt}
        imageClassName={about.hero.image.className}
        primaryHref={about.hero.primary?.href}
        primaryLabel={about.hero.primary?.label}
        secondaryHref={about.hero.secondary?.href}
        secondaryLabel={about.hero.secondary?.label}
      />

      <section className="relative bg-parchment px-5 py-16 text-bark sm:px-8 lg:py-20 lg:pb-28">
        <div className="mx-auto grid max-w-[1400px] gap-14 lg:grid-cols-2 lg:gap-20">
          <ScrollReveal className="max-w-2xl">
            <div className="mb-5">
              <p className="text-[13px] font-semibold uppercase tracking-[0.22em] text-moss">
                {about.foundation.eyebrow}
              </p>
            </div>
            <h2 className="font-display text-[clamp(1.95rem,3.4vw,3.25rem)] font-light leading-[1.1] text-bark text-balance">
              {about.foundation.visionTitle}
            </h2>
            <p className="mt-8 leading-[1.9] text-bark/82">
              {about.foundation.visionText}
            </p>
          </ScrollReveal>

          <ScrollReveal className="max-w-2xl">
            <h2 className="font-display text-[clamp(1.95rem,3.4vw,3.25rem)] font-light leading-[1.1] text-bark text-balance lg:mt-10">
              {about.foundation.historyTitle}
            </h2>
            <p className="mt-8 leading-[1.9] text-bark/76">
              {about.foundation.historyTextBefore}{" "}
              {about.foundation.founderLinks.map((link, index) => (
                <span key={link.href}>
                  {index > 0 && " et "}
                  <a
                    href={link.href}
                    className="font-semibold text-bark underline decoration-bark/35 underline-offset-4 transition hover:decoration-bark"
                  >
                    {link.label}
                  </a>
                </span>
              ))}
              {about.foundation.historyTextAfter}
            </p>
          </ScrollReveal>
        </div>
      </section>

      <section className="relative bg-[rgb(var(--button-primary-bg)/1)] px-5 py-16 text-paper sm:px-8 lg:py-28">
        <ScrollReveal className="mx-auto grid max-w-5xl gap-12">
          {about.testimonials.map((testimonial) => (
            <figure key={testimonial.attribution} className="text-center">
              <blockquote className="mx-auto max-w-2xl font-display text-[clamp(1.35rem,2.2vw,1.65rem)] font-light leading-[1.45] text-paper">
                {testimonial.quote}
              </blockquote>
              <figcaption className="mt-6 text-base font-semibold uppercase tracking-[0.16em] text-paper/58">
                {testimonial.attribution}
              </figcaption>
            </figure>
          ))}
        </ScrollReveal>
      </section>

      <section className="relative bg-ivory/65 px-5 py-24 sm:px-8 lg:py-28">
        <div className="mx-auto max-w-[1400px]">
          <div className="max-w-xl">
            <div className="mb-5">
              <p className="text-[13px] font-semibold uppercase tracking-[0.22em] text-moss">
                {about.values.eyebrow}
              </p>
            </div>
            <h2 className="font-display text-[clamp(1.95rem,3.4vw,3.25rem)] font-light leading-[1.1] text-bark text-balance">
              {about.values.title}
            </h2>
          </div>

          <ScrollReveal className="mt-14 grid gap-x-20 lg:grid-cols-2">
            {about.values.items.map(({ label, icon }) => {
              const Icon = getSectionIcon(icon);

              return (
              <div
                key={label}
                className="flex items-center gap-6 border-t border-bark/12 py-7 sm:gap-8 lg:py-9"
              >
                <Icon
                  aria-hidden="true"
                  strokeWidth={1}
                  className="h-10 w-10 flex-none text-moss sm:h-12 sm:w-12"
                />
                <h3 className="font-display text-[clamp(1.5rem,2.4vw,2.3rem)] font-light leading-snug text-bark">
                  {label.split(" & ").map((part, partIndex) => (
                    <span key={part}>
                      {partIndex > 0 && <span className="italic text-moss"> & </span>}
                      {part}
                    </span>
                  ))}
                </h3>
              </div>
              );
            })}
          </ScrollReveal>
        </div>
      </section>

      <Section
        tone="linen"
        eyebrow={about.principles.eyebrow}
        title={about.principles.title}
      >
        <ScrollReveal className="grid gap-8 sm:grid-cols-2">
          {about.principles.items.map((principle, index) => (
            <article key={principle.title} className="grid content-start gap-3">
              <div className="flex h-14 w-14 items-center justify-center rounded-full bg-paper text-3xl font-semibold text-moss">
                {index + 1}
              </div>
              <div>
                <h3 className="font-display text-[clamp(1.45rem,2vw,2rem)] font-light leading-tight text-bark">
                  {principle.title}
                </h3>
                <p className="mt-3 leading-[1.8] text-bark/70">{principle.text}</p>
              </div>
            </article>
          ))}
        </ScrollReveal>
      </Section>

      <section className="relative bg-ivory/65 px-5 py-24 sm:px-8 lg:py-28">
        <div className="mx-auto max-w-[1400px]">
          <div className="max-w-4xl">
            <div className="mb-5">
              <p className="text-[13px] font-semibold uppercase tracking-[0.22em] text-moss">
                {about.committee.eyebrow}
              </p>
            </div>
            <h2 className="font-display text-[clamp(1.95rem,3.4vw,3.25rem)] font-light leading-[1.1] text-bark text-balance">
              {about.committee.title}
            </h2>
          </div>

          <ScrollReveal className="mt-12 grid gap-4 md:grid-cols-2 lg:grid-cols-3 xl:grid-cols-5">
            {about.committee.members.map((member) => (
              <article
                key={member.name}
                className="overflow-hidden rounded-[1.5rem] bg-paper "
              >
                <div className="p-6 pb-2">
                  <div
                    className="relative mb-2 mr-2 aspect-square overflow-hidden bg-linen"
                    style={{
                      boxShadow: "8px 8px 0 rgb(var(--color-brand) / 1)"
                    }}
                  >
                    <Image
                      src={member.image.url}
                      alt={member.image.alt}
                      fill
                      className="object-cover"
                      sizes="(min-width: 1280px) 18vw, (min-width: 768px) 45vw, 90vw"
                    />
                  </div>
                </div>

                <div className="p-6">
                  <p className="font-display text-[1.25rem] font-regular leading-[1.5] text-bark">
                    “{member.quote}”
                  </p>
                  <div className="mt-7">
                    <h3 className="text-lg font-semibold leading-snug text-bark">
                      {member.name}
                    </h3>
                    <p className="mt-2 text-base leading-6 text-bark/56">
                      {member.role}
                    </p>
                  </div>
                </div>
              </article>
            ))}
          </ScrollReveal>
        </div>
      </section>

      <Section
        tone="linen"
        eyebrow={about.founders.eyebrow}
        title={about.founders.title}
        intro={about.founders.intro}
      >
        <ScrollReveal className="grid gap-6">
          {about.founders.people.map((founder) => (
            <article
              key={founder.name}
              id={founder.id}
              className="scroll-mt-36 rounded-[1.5rem] bg-paper/85 p-8 lg:scroll-mt-44"
            >
              {founder.image && (
                <div className="mb-8 max-w-64">
                  <div
                    className="relative mb-2 mr-2 aspect-square overflow-hidden bg-linen"
                    style={{
                      boxShadow: "8px 8px 0 rgb(var(--color-brand) / 1)"
                    }}
                  >
                    <Image
                      src={founder.image.url}
                      alt={founder.image.alt}
                      fill
                      className="object-cover"
                      sizes="16rem"
                    />
                  </div>
                </div>
              )}
              <p className="text-sm font-semibold uppercase tracking-[0.2em] text-moss">
                {founder.role}
              </p>
              <h3 className="mt-4 font-display text-[clamp(1.8rem,3vw,2.8rem)] font-light leading-tight text-bark">
                {founder.name}
              </h3>
              <div className="mt-5 grid gap-5 leading-[1.85] text-bark/72">
                {founder.paragraphs?.slice(0, 1).map((paragraph) => (
                  <p key={paragraph}>{paragraph}</p>
                ))}
                {founder.quote && (
                  <blockquote className="border-l-2 border-moss/30 pl-5 font-display text-[1.25rem] font-light leading-[1.55] text-bark">
                    “{founder.quote}”
                  </blockquote>
                )}
                {founder.paragraphs?.slice(1).map((paragraph) => (
                  <p key={paragraph}>{paragraph}</p>
                ))}
              </div>
              {founder.cta && (
                <div className="mt-8">
                  <CTAButton href={founder.cta.href} variant={founder.cta.variant ?? "secondary"}>
                    {founder.cta.label}
                  </CTAButton>
                </div>
              )}
            </article>
          ))}
        </ScrollReveal>
      </Section>
    </>
  );
}
