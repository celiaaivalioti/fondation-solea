import type { Metadata } from "next";

const normalizeMetadataText = (value: string | null | undefined, maxLength: number) =>
  (value ?? "").replace(/\s+/g, " ").trim().slice(0, maxLength);

export function createPageMetadata(
  title: string | null | undefined,
  description: string | null | undefined
): Metadata {
  return {
    title: normalizeMetadataText(title, 120),
    description: normalizeMetadataText(description, 180)
  };
}
