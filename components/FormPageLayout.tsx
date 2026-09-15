import type { ReactNode } from "react";
import PageGlow from "./PageGlow";
import RichText from "./RichText";

type FormPageLayoutProps = {
  eyebrow: string;
  title: string;
  text: string;
  actions?: ReactNode;
  generousBottomPadding?: boolean;
  children: ReactNode;
};

export default function FormPageLayout({
  eyebrow,
  title,
  text,
  actions,
  generousBottomPadding = false,
  children
}: FormPageLayoutProps) {
  const paddingClass = generousBottomPadding
    ? "pb-24 pt-12 lg:pb-32 lg:pt-10"
    : "py-12 lg:py-10";

  return (
    <section className={`relative isolate overflow-hidden px-5 sm:px-8 lg:min-h-[calc(100vh-6rem)] ${paddingClass}`}>
      <PageGlow />
      <div className="mx-auto grid w-full max-w-[1400px] gap-14 lg:grid-cols-[1.05fr_1fr] lg:gap-20">
        <div className="relative z-10 max-w-2xl pt-2 lg:sticky lg:top-24 lg:self-start">
          <p className="mb-6 text-[13px] font-semibold uppercase tracking-[0.22em] text-moss">
            {eyebrow}
          </p>
          <h1 className="font-display text-[clamp(2rem,4.2vw,4rem)] font-light leading-[1.05] text-bark text-balance">
            {title}
          </h1>
          <RichText
            text={text}
            className="mt-8 max-w-[58ch]"
            paragraphClassName="text-[1.15rem] leading-9 text-bark/72 sm:text-[1.25rem] sm:leading-[1.65] text-pretty"
          />
          {actions}
        </div>
        <div className="relative z-10">{children}</div>
      </div>
    </section>
  );
}
