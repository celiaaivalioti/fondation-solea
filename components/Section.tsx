import RichText from "./RichText";

type SectionProps = {
  eyebrow?: string;
  title?: string;
  intro?: string;
  children: React.ReactNode;
  className?: string;
  tone?: "default" | "linen" | "ivory" | "parchment";
  /**
   * Tighter vertical padding - used on the first section of a page,
   * directly under the hero, to avoid an oversized seam.
   */
  compact?: boolean;
};

export default function Section({
  eyebrow,
  title,
  intro,
  children,
  className = "",
  tone = "default",
  compact = false
}: SectionProps) {
  const toneClass = {
    default: "",
    linen: "bg-linen/55",
    ivory: "bg-ivory/65",
    parchment: "bg-parchment"
  }[tone];

  const paddingClass = compact
    ? "py-8 lg:py-10"
    : "py-24 lg:py-28";

  return (
    <section className={`relative px-5 ${paddingClass} sm:px-8 ${toneClass} ${className}`}>
      <div className="mx-auto grid max-w-[1400px] gap-14 lg:grid-cols-[0.82fr_1.18fr] lg:gap-20">
        {(eyebrow || title || intro) && (
          <div className="max-w-xl">
            {eyebrow && (
              <div className="mb-5">
                <p className="text-[13px] font-semibold uppercase tracking-[0.22em] text-moss">
                  {eyebrow}
                </p>
              </div>
            )}
            {title && (
              <h2 className="font-display text-[clamp(1.95rem,3.4vw,3.25rem)] font-light leading-[1.1] text-bark text-balance">
                {title}
              </h2>
            )}
            <RichText
              text={intro}
              className="mt-6 max-w-[58ch]"
              paragraphClassName="text-[1.12rem] leading-[1.65] text-bark/72 text-pretty"
            />
          </div>
        )}
        <div>{children}</div>
      </div>
    </section>
  );
}
