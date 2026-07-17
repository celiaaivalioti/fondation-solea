import Link from "next/link";

type CTAButtonProps = {
  href?: string;
  children: React.ReactNode;
  variant?: "primary" | "secondary" | "paper" | "ghost" | "paperGhost";
  className?: string;
  onClick?: () => void;
  newTab?: boolean;
};

export default function CTAButton({
  href,
  children,
  variant = "primary",
  className = "",
  onClick,
  newTab
}: CTAButtonProps) {
  const variantClass = {
    primary:
      "group border border-[rgb(var(--button-primary-border)/1)] bg-[rgb(var(--button-primary-bg)/1)] text-[rgb(var(--button-primary-text)/1)] hover:brightness-95",
    secondary:
      "group border border-[rgb(var(--button-secondary-border)/0.35)] bg-[rgb(var(--button-secondary-bg)/0.7)] text-[rgb(var(--button-secondary-text)/1)] backdrop-blur-sm hover:border-[rgb(var(--button-secondary-border)/1)] hover:bg-[rgb(var(--button-secondary-bg)/1)]",
    paper:
      "group border border-[rgb(var(--button-paper-border)/1)] bg-[rgb(var(--button-paper-bg)/1)] text-[rgb(var(--button-paper-text)/1)] hover:brightness-95",
    ghost:
      "group border border-transparent bg-transparent text-[rgb(var(--button-ghost-text)/1)] hover:border-[rgb(var(--button-ghost-border)/0.35)] hover:bg-[rgb(var(--button-ghost-bg)/0.5)]",
    paperGhost:
      "group border border-[rgb(var(--button-paper-ghost-border)/0.4)] bg-[rgb(var(--color-overlay-neutral)/0.7)] backdrop-blur-sm text-[rgb(var(--button-paper-ghost-text)/1)] hover:border-[rgb(var(--button-paper-ghost-border)/1)] hover:bg-[rgb(var(--button-paper-ghost-bg)/1)] hover:text-[rgb(var(--button-paper-text)/1)]"
  }[variant];

  const spacingClass =
    variant === "ghost"
      ? "px-1 py-3 text-[16px] tracking-[0.01em]"
      : "px-7 py-4";

  const baseClass =
    variant === "ghost"
      ? "inline-flex min-h-12 items-center"
      : "inline-flex min-h-14 items-center justify-center rounded-full";

  const sharedClassName = `${baseClass} ${spacingClass} text-center text-lg font-medium transition-all duration-300 ease-out-soft focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-4 focus-visible:outline-clay ${variantClass} ${className}`;

  if (!href) {
    return (
      <button type="button" aria-disabled="true" className={sharedClassName}>
        {children}
      </button>
    );
  }

  return (
    <Link
      href={href}
      onClick={onClick}
      className={sharedClassName}
      {...(newTab ? { target: "_blank", rel: "noopener noreferrer" } : {})}
    >
      {children}
    </Link>
  );
}
