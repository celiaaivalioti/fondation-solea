import type { Cta } from "./cms-types";

export function isCtaVisible(cta: Cta | undefined): cta is Cta {
  if (!cta) {
    return false;
  }

  return cta.visible !== false && cta.show !== false;
}
