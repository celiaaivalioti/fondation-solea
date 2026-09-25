import Image from "next/image";
import { BriefcaseBusiness, Coins, Download, Handshake, Heart, HeartHandshake, Leaf, Users } from "lucide-react";
import CTAButton from "@/components/CTAButton";
import Hero from "@/components/Hero";
import ScrollReveal from "@/components/ScrollReveal";
import { getCmsContent } from "@/lib/cms";
import { type Locale, defaultLocale, localizeHref } from "@/lib/locales";
import { createPageMetadata } from "@/lib/page-metadata";

const icons = { heart: Heart, users: Users, leaf: Leaf, handshake: Handshake, coins: Coins, briefcase: BriefcaseBusiness, heartHandshake: HeartHandshake };

function SectionHeading({ eyebrow, title }: { eyebrow: string; title: string }) {
  return <div className="mb-10 max-w-5xl">
    <p className="text-[13px] font-semibold uppercase tracking-[0.18em] text-moss">{eyebrow}</p>
    <h2 className="mt-4 font-display text-[clamp(1.9rem,3vw,2.8rem)] font-light leading-[1.15] text-bark text-balance">{title}</h2>
  </div>;
}

function DossierLink({ url, label }: { url?: string; label: string }) {
  if (!url) return null;
  return <a href={url} target="_blank" rel="noopener noreferrer" className="inline-flex min-h-14 items-center justify-center gap-3 rounded-full border border-moss/40 px-6 py-3 text-center font-medium text-bark transition-colors hover:bg-paper focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-4 focus-visible:outline-moss">
    {label}<Download aria-hidden="true" className="h-4 w-4 flex-none" />
  </a>;
}

export async function generateBusinessMetadata(locale: Locale = defaultLocale) {
  const { business } = await getCmsContent(locale);
  return createPageMetadata(business.metadataTitle, business.hero.text);
}

export default async function BusinessPage({ locale = defaultLocale }: { locale?: Locale } = {}) {
  const { business, sponsors } = await getCmsContent(locale);
  const contactHref = localizeHref("/contact", locale);
  const partners = sponsors.sections.flatMap((section) => section.logos).filter((partner) => partner.image?.url);

  return <>
    <Hero eyebrow={business.hero.eyebrow} title={business.hero.title} text={business.hero.text}
      image={business.hero.image.url} imageAlt={business.hero.image.alt} imageClassName={business.hero.image.className}
      action={<div className="mt-8 flex flex-wrap gap-3">
        <CTAButton href={contactHref}>{business.contactLabel}</CTAButton>
        <DossierLink url={business.dossierUrl} label={business.dossierLabel} />
      </div>} />

    <section className="bg-fern/35 px-5 py-16 sm:px-8 lg:py-20">
      <div className="mx-auto max-w-6xl">
        <SectionHeading {...business.benefits} />
        <ScrollReveal className="grid gap-10 sm:grid-cols-2 lg:grid-cols-4">
          {business.benefits.items.map((item) => {
            const Icon = icons[item.icon as keyof typeof icons] ?? Heart;
            return <article key={item.title} className="text-center">
              <div className="mx-auto mb-5 flex h-16 w-16 items-center justify-center rounded-full bg-fern/60 text-brand-dark"><Icon aria-hidden="true" className="h-8 w-8" strokeWidth={1.4} /></div>
              <h3 className="text-xl font-semibold leading-snug text-bark">{item.title}</h3>
              <p className="mx-auto mt-3 max-w-xs leading-relaxed text-bark/75">{item.text}</p>
            </article>;
          })}
        </ScrollReveal>
      </div>
    </section>

    <section className="px-5 py-16 sm:px-8 lg:py-20">
      <div className="mx-auto max-w-6xl">
        <SectionHeading {...business.engagement} />
        <ScrollReveal className="grid gap-5 sm:grid-cols-2 lg:grid-cols-4">
          {business.engagement.items.map((item) => {
            const Icon = icons[item.icon as keyof typeof icons] ?? Heart;
            return <article key={item.title} className="rounded-2xl bg-linen/55 p-7">
              <Icon aria-hidden="true" className="mb-5 h-7 w-7 text-brand-dark" strokeWidth={1.4} />
              <h3 className="text-lg font-semibold leading-snug text-bark">{item.title}</h3>
              <p className="mt-3 leading-relaxed text-bark/75">{item.text}</p>
            </article>;
          })}
        </ScrollReveal>
      </div>
    </section>

    <section className="px-5 pb-16 sm:px-8 lg:pb-20">
      <div className="mx-auto max-w-6xl">
        <SectionHeading {...business.projects} />
        <ScrollReveal className="grid gap-6 md:grid-cols-3">
          {business.projects.items.map((project) => <article key={project.title} className="flex flex-col overflow-hidden rounded-2xl border border-bark/10 bg-paper">
            <div className="relative aspect-[2/1]"><Image src={project.image.url} alt={project.image.alt} fill sizes="(min-width: 768px) 33vw, 100vw" className="object-cover" /></div>
            <div className="flex flex-1 flex-col p-6">
              <h3 className="text-xl font-semibold leading-snug text-bark">{project.title}</h3>
              <p className="mt-3 leading-relaxed text-bark/75">{project.text}</p>
              <dl className="mt-auto space-y-3 pt-6 text-sm leading-relaxed">
                {[
                  [locale === "fr" ? "Objectif" : "Funding goal", project.objective],
                  [locale === "fr" ? "Statut" : "Status", project.status],
                  [locale === "fr" ? "Impact visé" : "Intended impact", project.impact]
                ].map(([label, value]) => <div key={label} className="grid grid-cols-[5.5rem_1fr] gap-3 border-t border-bark/10 pt-3"><dt className="text-bark/60">{label}</dt><dd className="font-medium text-bark">{value}</dd></div>)}
              </dl>
            </div>
          </article>)}
        </ScrollReveal>
      </div>
    </section>

    <section className="bg-fern/40 px-5 py-16 sm:px-8 lg:py-20">
      <div className="mx-auto max-w-6xl">
        <SectionHeading {...business.impact} />
        <ScrollReveal className="grid gap-10 sm:grid-cols-2 lg:grid-cols-4">
          {business.impact.items.map((item) => <div key={item.value} className="text-center">
            <p className="font-display text-3xl leading-tight text-brand-dark">{item.value}</p>
            <p className="mx-auto mt-3 max-w-[24ch] leading-relaxed text-bark/75">{item.text}</p>
          </div>)}
        </ScrollReveal>
      </div>
    </section>

    <section className="grid bg-linen/55 md:grid-cols-2">
      <div className="relative min-h-64 md:min-h-96"><Image src={business.closing.image.url} alt={business.closing.image.alt} fill sizes="(min-width: 768px) 50vw, 100vw" className="object-cover" /></div>
      <ScrollReveal className="self-center px-6 py-12 sm:px-10 lg:p-16">
        <SectionHeading eyebrow={business.closing.eyebrow} title={business.closing.title} />
        <p className="max-w-xl leading-relaxed text-bark/75">{business.closing.text}</p>
        <div className="mt-8 flex flex-wrap gap-3"><CTAButton href={contactHref}>{business.closing.contactLabel}</CTAButton><DossierLink url={business.dossierUrl} label={business.dossierLabel} /></div>
      </ScrollReveal>
    </section>

    {partners.length > 0 && <section className="px-5 py-12 sm:px-8">
      <div className="mx-auto max-w-6xl">
        <h2 className="text-[13px] font-semibold uppercase tracking-[0.18em] text-moss">{business.partnersEyebrow}</h2>
        <p className="mt-3 text-bark/70">{business.partnersIntro}</p>
        <div className="mt-8 flex flex-wrap items-center gap-10">
          {partners.map((partner, index) => <div key={`${partner.name}-${index}`} className="relative h-16 w-40"><Image src={partner.image!.url} alt={partner.image!.alt || partner.name} fill sizes="160px" className="object-contain" /></div>)}
        </div>
      </div>
    </section>}
  </>;
}
