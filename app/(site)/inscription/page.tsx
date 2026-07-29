import RegistrationForm from "@/components/RegistrationForm";
import RichText from "@/components/RichText";
import { getCmsContent } from "@/lib/cms";
import { type Locale, defaultLocale } from "@/lib/locales";

export async function generateRegistrationMetadata(locale: Locale = defaultLocale) {
  const { registration } = await getCmsContent(locale);

  return {
    title: registration.metadataTitle,
    description: registration.text
  };
}

export const generateMetadata = () => generateRegistrationMetadata();

export default async function RegistrationPage({ locale = defaultLocale }: { locale?: Locale } = {}) {
  const { registration, registrationForm } = await getCmsContent(locale);

  return (
    <section className="relative isolate overflow-hidden px-5 pb-24 pt-12 sm:px-8 lg:min-h-[calc(100vh-6rem)] lg:pb-32 lg:pt-10">
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
              {registration.eyebrow}
            </p>
          </div>
          <h1 className="font-display text-[clamp(2rem,4.2vw,4rem)] font-light leading-[1.05] text-bark text-balance">
            {registration.title}
          </h1>
          <RichText
            text={registration.text}
            className="mt-8 max-w-[58ch]"
            paragraphClassName="text-[1.15rem] leading-9 text-bark/72 sm:text-[1.25rem] sm:leading-[1.65] text-pretty"
          />
        </div>

        <div className="relative z-10">
          <RegistrationForm config={registrationForm} locale={locale} />
        </div>
      </div>
    </section>
  );
}
