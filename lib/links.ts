// Anchor attributes for the CMS "open in a new tab" switch.
export function newTabProps(newTab?: boolean) {
  return newTab ? { target: "_blank", rel: "noopener noreferrer" } : {};
}
