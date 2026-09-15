import RegistrationForm from "@/components/RegistrationForm";
import FormPageLayout from "@/components/FormPageLayout";
import { getCmsContent } from "@/lib/cms";
import { type Locale, defaultLocale } from "@/lib/locales";
import { createPageMetadata } from "@/lib/page-metadata";

export async function generateRegistrationMetadata(locale: Locale = defaultLocale) {
  const { registration } = await getCmsContent(locale);

  return createPageMetadata(registration.metadataTitle, registration.text);
}

export default async function RegistrationPage({ locale = defaultLocale }: { locale?: Locale } = {}) {
  const { registration, registrationForm } = await getCmsContent(locale);

  return (
    <FormPageLayout
      eyebrow={registration.eyebrow}
      title={registration.title}
      text={registration.text}
      generousBottomPadding
    >
      <RegistrationForm config={registrationForm} locale={locale} />
    </FormPageLayout>
  );
}
