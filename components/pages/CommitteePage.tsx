import CommitteeDirectory from "@/components/CommitteeDirectory";
import PageGlow from "@/components/PageGlow";
import ScrollReveal from "@/components/ScrollReveal";
import { getCmsContent } from "@/lib/cms";
import { type Locale, defaultLocale } from "@/lib/locales";
import { createPageMetadata } from "@/lib/page-metadata";

function IntroText({ text }: { text: string }) {
  return (
    <div className="grid gap-6 text-[1.08rem] leading-[1.78] text-bark/76 sm:text-[1.16rem]">
      {text.split(/\n\s*\n/).map((paragraph) => (
        <p key={paragraph}>
          {paragraph.split(/(\*\*.*?\*\*)/g).map((part, index) =>
            part.startsWith("**") && part.endsWith("**") ? (
              <strong key={`${part}-${index}`} className="font-semibold text-bark">
                {part.slice(2, -2)}
              </strong>
            ) : (
              part
            )
          )}
        </p>
      ))}
    </div>
  );
}

export async function generateCommitteeMetadata(locale: Locale = defaultLocale) {
  const { committee } = await getCmsContent(locale);
  return createPageMetadata(committee.metadataTitle, committee.intro);
}

export default async function CommitteePage({ locale = defaultLocale }: { locale?: Locale } = {}) {
  const { committee } = await getCmsContent(locale);

  return (
    <>
      <section className="relative overflow-hidden bg-ivory px-5 py-20 sm:px-8 lg:py-28">
        <PageGlow />
        <div className="relative mx-auto grid max-w-[1400px] gap-12 lg:grid-cols-[0.82fr_1.18fr] lg:gap-24">
          <ScrollReveal>
            <p className="text-[13px] font-semibold uppercase tracking-[0.22em] text-moss">
              {committee.eyebrow}
            </p>
            <h1 className="mt-6 max-w-2xl font-display text-[clamp(2.6rem,5vw,5rem)] font-light leading-[1.02] text-bark text-balance">
              {committee.title}
            </h1>
          </ScrollReveal>
          <ScrollReveal className="self-end lg:pt-16">
            <IntroText text={committee.intro} />
          </ScrollReveal>
        </div>
      </section>

      <section className="bg-parchment px-5 py-20 sm:px-8 lg:py-28">
        <div className="mx-auto max-w-[1400px]">
          <ScrollReveal className="max-w-4xl">
            <p className="text-[13px] font-semibold uppercase tracking-[0.22em] text-moss">
              {committee.sectionEyebrow}
            </p>
            <h2 className="mt-5 font-display text-[clamp(2rem,4vw,3.75rem)] font-light leading-[1.08] text-bark text-balance">
              {committee.sectionTitle}
            </h2>
          </ScrollReveal>
          <ScrollReveal className="mt-12">
            <CommitteeDirectory
              members={committee.members}
              bioLabel="Bio"
              closeLabel={locale === "fr" ? "Fermer la biographie" : "Close biography"}
            />
          </ScrollReveal>
        </div>
      </section>
    </>
  );
}
