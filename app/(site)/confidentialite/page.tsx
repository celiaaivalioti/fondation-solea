import RichText from "@/components/RichText";
import { getCmsContent } from "@/lib/cms";

export async function generateMetadata() {
  const { privacy } = await getCmsContent();

  return {
    title: privacy.metadataTitle
  };
}

export default async function PrivacyPage() {
  const { privacy } = await getCmsContent();

  return (
    <div className="px-5 py-20 sm:px-8 lg:py-24">
      <div className="mx-auto max-w-3xl">
        <h1 className="font-display text-[clamp(2rem,4vw,3.25rem)] font-light leading-[1.1] text-bark text-balance">
          {privacy.title}
        </h1>
        <RichText
          text={privacy.intro}
          className="mt-6"
          paragraphClassName="text-[1.15rem] leading-[1.65] text-bark/72 text-pretty"
        />
        <div className="mt-14 grid gap-10">
          {privacy.sections.map((section) => (
            <section key={section.title}>
              <h2 className="font-display text-[1.6rem] font-light leading-tight text-bark">
                {section.title}
              </h2>
              <RichText
                text={section.text}
                className="mt-3"
                paragraphClassName="leading-[1.8] text-bark/72"
              />
            </section>
          ))}
        </div>
      </div>
    </div>
  );
}
