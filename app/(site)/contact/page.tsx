import ContactForm from "@/components/ContactForm";
import CTAButton from "@/components/CTAButton";
import { getCmsContent } from "@/lib/cms";

export async function generateMetadata() {
  const { contact } = await getCmsContent();

  return {
    title: contact.metadataTitle
  };
}

export default async function ContactPage() {
  const { contact, site, contactForm } = await getCmsContent();
  const primaryHref = contact.primary?.href.startsWith("tel:")
    ? contact.primary.href
    : `tel:${site.phone.replaceAll(" ", "")}`;

  return (
    <section className="relative isolate overflow-hidden px-5 py-12 sm:px-8 lg:min-h-[calc(100vh-6rem)] lg:py-10">
      <div
        aria-hidden="true"
        className="pointer-events-none absolute -right-24 -top-24 h-96 w-96 rounded-full bg-gradient-to-br from-fern/20 to-transparent blur-3xl"
      />
      <div
        aria-hidden="true"
        className="pointer-events-none absolute -left-24 bottom-12 h-72 w-72 rounded-full bg-gradient-to-br from-cream/40 to-transparent blur-3xl"
      />

      <div className="mx-auto grid w-full max-w-[1400px] gap-14 lg:grid-cols-[1.05fr_1fr] lg:gap-20">
        <div className="relative z-10 max-w-2xl pt-2 lg:sticky lg:top-24 lg:self-start">
          <div className="mb-6">
            <p className="text-[13px] font-semibold uppercase tracking-[0.22em] text-moss">
              {contact.eyebrow}
            </p>
          </div>
          <h1 className="font-display text-[clamp(2rem,4.2vw,4rem)] font-light leading-[1.05] text-bark text-balance">
            {contact.title}
          </h1>
          <p className="mt-8 max-w-[58ch] whitespace-pre-line text-[1.15rem] leading-9 text-bark/72 sm:text-[1.25rem] sm:leading-[1.65] text-pretty">
            {contact.text}
          </p>
          <div className="mt-12 flex flex-col gap-4 sm:flex-row sm:flex-wrap sm:items-center">
            {contact.primary && (
              <CTAButton href={primaryHref} variant={contact.primary.variant ?? "primary"} newTab={contact.primary.newTab}>
                {contact.primary.label}
              </CTAButton>
            )}
            {contact.secondary && (
              <CTAButton href={contact.secondary.href} variant={contact.secondary.variant ?? "secondary"} newTab={contact.secondary.newTab}>
                {contact.secondary.label}
              </CTAButton>
            )}
          </div>
        </div>

        <div className="relative z-10">
          <ContactForm config={contactForm} />
        </div>
      </div>
    </section>
  );
}
