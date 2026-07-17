import type { ReactNode } from "react";

type NameLink = { label: string; href: string };

// Wraps every occurrence of the given names in a text with a link to their
// bio anchor. Names that don't appear in the text are simply ignored, so
// CMS edits can never break the page.
export function linkifyNames(text: string, links: NameLink[]): ReactNode {
  const parts: ReactNode[] = [];
  let rest = text;
  let key = 0;

  while (rest.length > 0) {
    let earliest: { index: number; link: NameLink } | null = null;

    for (const link of links) {
      if (!link.label || !link.href) {
        continue;
      }
      const index = rest.indexOf(link.label);
      if (index !== -1 && (earliest === null || index < earliest.index)) {
        earliest = { index, link };
      }
    }

    if (!earliest) {
      parts.push(rest);
      break;
    }

    if (earliest.index > 0) {
      parts.push(rest.slice(0, earliest.index));
    }

    parts.push(
      <a
        key={key++}
        href={earliest.link.href}
        className="font-semibold text-bark underline decoration-bark/35 underline-offset-4 transition hover:decoration-bark"
      >
        {earliest.link.label}
      </a>
    );

    rest = rest.slice(earliest.index + earliest.link.label.length);
  }

  return parts;
}
