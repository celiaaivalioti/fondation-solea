import Image from "next/image";
import { getCmsContent } from "@/lib/cms";

export async function generateMetadata() {
  const { site } = await getCmsContent();

  return {
    title: { absolute: site.name },
    robots: { index: false, follow: false }
  };
}

export default async function ComingSoonPage() {
  const { site } = await getCmsContent();

  return (
    <main className="flex min-h-screen flex-col items-center justify-center bg-paper px-6 text-center">
      <Image
        src="/images/logo-solea.png"
        alt={site.name}
        width={5342}
        height={1504}
        priority
        className="h-12 w-auto"
      />
      <h1 className="mt-10 max-w-2xl font-display text-[clamp(2rem,5vw,3.25rem)] font-light leading-tight text-bark">
        Notre site ouvre bientôt
      </h1>
      <p className="mt-6 max-w-xl text-lg leading-8 text-bark/70">
        {site.tagline}
      </p>
      <p className="mt-10 text-lg text-bark/70">
        Pour nous contacter&nbsp;:{" "}
        <a href={`mailto:${site.email}`} className="font-medium text-moss underline-offset-4 hover:underline">
          {site.email}
        </a>
      </p>
    </main>
  );
}
