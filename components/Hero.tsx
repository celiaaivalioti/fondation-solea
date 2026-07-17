import Image from "next/image";
import CTAButton from "./CTAButton";
import ParallaxBackground from "./ParallaxBackground";

type HeroProps = {
  eyebrow?: string;
  title: string;
  text: React.ReactNode;
  image: string;
  imageAlt: string;
  quote?: string;
  primaryHref?: string;
  primaryLabel?: string;
  secondaryHref?: string;
  secondaryLabel?: string;
  tertiaryHref?: string;
  tertiaryLabel?: string;
  action?: React.ReactNode;
  imageClassName?: string;
  /**
   * "split" - text-left, photo-right (default, used on inner pages).
   * "background" - full-bleed image with overlay + light text (used on home).
   */
  layout?: "split" | "background";
};

export default function Hero({
  eyebrow,
  title,
  text,
  image,
  imageAlt,
  quote,
  primaryHref = "/inscription",
  primaryLabel = "S'inscrire",
  secondaryHref = "/qui-sommes-nous",
  secondaryLabel = "Découvrir",
  tertiaryHref,
  tertiaryLabel,
  action,
  imageClassName,
  layout = "split"
}: HeroProps) {
  if (layout === "background") {
    return (
      <section className="relative isolate overflow-hidden">
        {/* Background image */}
        <div className="absolute inset-0 -z-10 overflow-hidden">
          <ParallaxBackground speed={0.3} className="absolute inset-0">
            <Image
              src={image}
              alt={imageAlt}
              fill
              priority
              className={imageClassName ?? "object-cover object-[35%_center]"}
              sizes="100vw"
            />
          </ParallaxBackground>
          {/* Gradient overlay - stronger on the left for text contrast */}
          <div
            aria-hidden="true"
            className="absolute inset-0 bg-gradient-to-r from-[rgb(var(--color-overlay-neutral)/0.65)] via-[rgb(var(--color-overlay-neutral)/0.25)] to-[rgb(var(--color-overlay-neutral)/0.08)]"
          />
          <div
            aria-hidden="true"
            className="absolute inset-0 bg-gradient-to-t from-[rgb(var(--color-overlay-neutral)/0.45)] via-transparent to-[rgb(var(--color-overlay-neutral)/0.14)]"
          />
        </div>

        <div className="mx-auto flex min-h-screen max-w-[1400px] flex-col justify-center px-5 py-6 sm:px-8 lg:py-8">
          <div className="mt-12 max-w-4xl text-paper lg:mt-16">
            {eyebrow && (
              <div className="mb-6">
                <p className="text-[13px] font-semibold uppercase tracking-[0.22em] text-paper/85">
                  {eyebrow}
                </p>
              </div>
            )}
            <h1 className="font-display text-[clamp(2rem,4.2vw,4rem)] font-light leading-[1.05] text-balance">
              {title}
            </h1>
            <p className="mt-7 max-w-[58ch] text-[1.15rem] leading-[1.85] text-paper/85 font-medium text-pretty sm:text-[1.25rem]">
              {text}
            </p>
            {quote && (
              <blockquote className="mt-10 max-w-xl border-l-2 border-paper/55 pl-6 font-display text-[1.5rem] font-light italic leading-[1.45] text-paper/95">
                {quote}
              </blockquote>
            )}
            {action ?? (
              <div className="mt-12 flex flex-col gap-4 sm:flex-row sm:flex-wrap sm:items-center">
                <CTAButton href={primaryHref}>
                  {primaryLabel}
                </CTAButton>
                <CTAButton
                  href={secondaryHref}
                  variant="paper"
                >
                  {secondaryLabel}
                </CTAButton>
                {tertiaryHref && tertiaryLabel && (
                  <CTAButton
                    href={tertiaryHref}
                    variant="paperGhost"
                  >
                    {tertiaryLabel}
                  </CTAButton>
                )}
              </div>
            )}
          </div>
        </div>
      </section>
    );
  }

  return (
    <section className="relative isolate flex items-center overflow-hidden px-5 pb-8 pt-8 sm:px-8 lg:min-h-[calc(100vh-6rem)] lg:pb-10 lg:pt-10">
      {/* Decorative organic shape, very subtle */}
      <div
        aria-hidden="true"
        className="pointer-events-none absolute -right-24 -top-24 h-96 w-96 rounded-full bg-gradient-to-br from-fern/20 to-transparent blur-3xl"
      />
      <div
        aria-hidden="true"
        className="pointer-events-none absolute -left-24 bottom-12 h-72 w-72 rounded-full bg-gradient-to-br from-cream/40 to-transparent blur-3xl"
      />

      <div className="mx-auto grid w-full max-w-[1400px] items-center gap-14 lg:grid-cols-[1.05fr_1fr] lg:gap-20">
        <div className="relative z-10 max-w-2xl">
          {eyebrow && (
            <div className="mb-6">
              <p className="text-[13px] font-semibold uppercase tracking-[0.22em] text-moss">
                {eyebrow}
              </p>
            </div>
          )}
          <h1 className="font-display text-[clamp(2rem,4.2vw,4rem)] font-light leading-[1.05] text-bark text-balance">
            {title}
          </h1>
          <p className="mt-8 max-w-[58ch] text-[1.15rem] leading-9 text-bark/72 sm:text-[1.25rem] sm:leading-[1.85] text-pretty">
            {text}
          </p>
          {quote && (
            <blockquote className="mt-10 max-w-xl border-l-2 border-moss/40 pl-6 font-display text-[1.55rem] font-light italic leading-[1.45] text-moss">
              {quote}
            </blockquote>
          )}
          {action ?? (
            <div className="mt-12 flex flex-col gap-4 sm:flex-row sm:flex-wrap sm:items-center">
              <CTAButton href={primaryHref}>
                {primaryLabel}
              </CTAButton>
              <CTAButton href={secondaryHref} variant="secondary">
                {secondaryLabel}
              </CTAButton>
              {tertiaryHref && tertiaryLabel && (
                <CTAButton href={tertiaryHref} variant="ghost">
                  {tertiaryLabel}
                </CTAButton>
              )}
            </div>
          )}
        </div>
        <div className="relative">
          <div className="relative aspect-[4/5] w-full max-w-xl overflow-hidden rounded-[2rem] shadow-glow lg:aspect-auto lg:h-[calc(100vh-12rem)] lg:max-h-[40rem]">
            <Image
              src={image}
              alt={imageAlt}
              fill
              priority
              className={imageClassName ?? "object-cover"}
              sizes="(min-width: 1024px) 48vw, 100vw"
            />
            {/* Subtle inner vignette */}
            <div
              aria-hidden="true"
              className="absolute inset-0 bg-gradient-to-tr from-bark/15 via-transparent to-transparent"
            />
          </div>
        </div>
      </div>
    </section>
  );
}
