import { notFound } from "next/navigation";
import CheckList from "@/components/CheckList";
import Hero from "@/components/Hero";
import Section from "@/components/Section";
import ScrollReveal from "@/components/ScrollReveal";
import { getCmsContent } from "@/lib/cms";

export async function generateMetadata() {
  const { site, support } = await getCmsContent();

  if (!site.showDonationCta) {
    return {
      title: "Page indisponible"
    };
  }

  return {
    title: support.metadataTitle
  };
}

export default async function SupportPage() {
  const { site, support } = await getCmsContent();

  if (!site.showDonationCta) {
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
          <form className="mt-12 flex max-w-xl flex-col gap-4 sm:flex-row sm:items-center">
            <label className="sr-only" htmlFor="donation-amount">
              Montant du don en CHF
            </label>
            <div className="relative min-w-0 flex-1">
              <input
                id="donation-amount"
                name="donationAmount"
                type="number"
                min="1"
                inputMode="decimal"
                placeholder={support.donation.amountPlaceholder}
                className="h-16 w-full rounded-full border border-moss/15 bg-paper/85 px-6 pr-16 text-lg font-normal text-bark outline-none transition focus:bg-paper focus-visible:border-transparent focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-clay"
              />
              <span className="pointer-events-none absolute right-6 top-1/2 -translate-y-1/2 text-lg font-medium text-bark/58">
                {support.donation.currency}
              </span>
            </div>
            <button
              type="button"
              className="inline-flex h-16 items-center justify-center rounded-full border border-transparent bg-moss px-8 text-lg font-medium text-paper transition-all duration-300 ease-out-soft hover:bg-brand-dark hover:shadow-glow focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-4 focus-visible:outline-clay"
            >
              {support.donation.submitLabel}
            </button>
          </form>
        }
      />

      <Section compact eyebrow={support.cause.eyebrow} title={support.cause.title}>
        <ScrollReveal>
          {support.cause.paragraphs?.map((paragraph) => (
            <p key={paragraph} className="max-w-[58ch] whitespace-pre-line text-[1.15rem] leading-[1.65] text-bark/80 text-pretty">
              {paragraph}
            </p>
          ))}
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
