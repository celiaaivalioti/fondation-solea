import type { ElementType } from "react";

type RichTextProps = {
  text?: string | null;
  /** Layout classes for the wrapper (margins, max-width, alignment). */
  className?: string;
  /** Typography classes applied to each paragraph. */
  paragraphClassName?: string;
  /** Tailwind gap between paragraphs. Decoupled from line-height on purpose. */
  gapClassName?: string;
  /** Wrapper element. Defaults to "div". */
  as?: ElementType;
};

// Renders CMS text with faithful, controlled spacing:
// - a blank line in Sanity (\n\n) starts a new paragraph, separated by a
//   fixed gap (NOT the line-height, which made the gap look oversized);
// - a single line break (\n) inside a paragraph is preserved via
//   white-space: pre-line.
export default function RichText({
  text,
  className = "",
  paragraphClassName = "",
  gapClassName = "gap-5",
  as: Wrapper = "div"
}: RichTextProps) {
  if (!text) {
    return null;
  }

  const paragraphs = text
    .split(/\n{2,}/)
    .map((paragraph) => paragraph.trim())
    .filter(Boolean);

  if (paragraphs.length === 0) {
    return null;
  }

  return (
    <Wrapper className={`grid ${gapClassName} ${className}`.trim()}>
      {paragraphs.map((paragraph, index) => (
        <p key={index} className={`whitespace-pre-line ${paragraphClassName}`.trim()}>
          {paragraph}
        </p>
      ))}
    </Wrapper>
  );
}
