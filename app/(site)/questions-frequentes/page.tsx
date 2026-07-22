import Accordion from "@/components/Accordion";
import { getCmsContent } from "@/lib/cms";

export async function generateMetadata() {
  const { faq } = await getCmsContent();

  return {
    title: faq.metadataTitle
  };
}

export default async function FAQPage() {
  const { faq } = await getCmsContent();

  return (
    <div className="relative isolate overflow-hidden px-5 py-12 sm:px-8 lg:py-16">
      <div
        aria-hidden="true"
        className="pointer-events-none absolute -right-24 -top-24 h-96 w-96 rounded-full bg-gradient-to-br from-fern/20 to-transparent blur-3xl"
      />
      <div
        aria-hidden="true"
        className="pointer-events-none absolute -left-24 bottom-12 h-72 w-72 rounded-full bg-gradient-to-br from-cream/40 to-transparent blur-3xl"
      />

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
