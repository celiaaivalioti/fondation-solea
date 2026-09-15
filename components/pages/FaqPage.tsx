import Accordion from "@/components/Accordion";
import PageGlow from "@/components/PageGlow";
import { getCmsContent } from "@/lib/cms";
import { type Locale, defaultLocale } from "@/lib/locales";
import { createPageMetadata } from "@/lib/page-metadata";

export async function generateFaqMetadata(locale: Locale = defaultLocale) {
  const { faq } = await getCmsContent(locale);

  return createPageMetadata(faq.metadataTitle, faq.title);
}

export default async function FaqPage({ locale = defaultLocale }: { locale?: Locale } = {}) {
  const { faq } = await getCmsContent(locale);

  return (
    <div className="relative isolate overflow-hidden px-5 py-12 sm:px-8 lg:py-16">
      <PageGlow />

      <div className="mx-auto w-full max-w-[1000px] relative z-10">
        <div className="mb-12 sm:mb-16">
          <p className="text-[13px] font-semibold uppercase tracking-[0.22em] text-moss mb-6">
            {faq.eyebrow}
          </p>
          <h1 className="font-display text-[clamp(1.75rem,3vw,2.75rem)] font-light leading-[1.1] text-bark text-balance">
            {faq.title}
          </h1>
        </div>

        <Accordion items={faq.items} />
      </div>
    </div>
  );
}
