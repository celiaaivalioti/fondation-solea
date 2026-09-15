import ContactForm from "@/components/ContactForm";
import CTAButton from "@/components/CTAButton";
import FormPageLayout from "@/components/FormPageLayout";
import { getCmsContent } from "@/lib/cms";
import { isCtaVisible } from "@/lib/cta";
import { type Locale, defaultLocale, sanitizeHref } from "@/lib/locales";
import { createPageMetadata } from "@/lib/page-metadata";

export async function generateContactMetadata(locale: Locale = defaultLocale) {
  const { contact } = await getCmsContent(locale);

  return createPageMetadata(contact.metadataTitle, contact.text);
}

export default async function ContactPage({ locale = defaultLocale }: { locale?: Locale } = {}) {
  const { contact, site, contactForm } = await getCmsContent(locale);
  const primaryHref = sanitizeHref(
    contact.primary?.href.startsWith("tel:")
      ? contact.primary.href
      : `tel:${site.phone.replaceAll(" ", "")}`
  );

  const actions = (
    <div className="mt-12 flex flex-col gap-4 sm:flex-row sm:flex-wrap sm:items-center">
      {isCtaVisible(contact.primary) && (
        <CTAButton href={primaryHref} variant={contact.primary.variant ?? "primary"} newTab={contact.primary.newTab}>
          {contact.primary.label}
        </CTAButton>
      )}
      {isCtaVisible(contact.secondary) && (
        <CTAButton href={contact.secondary.href} variant={contact.secondary.variant ?? "secondary"} newTab={contact.secondary.newTab}>
          {contact.secondary.label}
        </CTAButton>
      )}
    </div>
  );

  return (
    <FormPageLayout
      eyebrow={contact.eyebrow}
      title={contact.title}
      text={contact.text}
      actions={actions}
    >
      <ContactForm config={contactForm} locale={locale} />
    </FormPageLayout>
  );
}
