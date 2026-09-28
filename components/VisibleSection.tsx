import type { ReactNode } from "react";

/** Server-rendered visibility gate with no layout wrapper or hidden DOM. */
export default function VisibleSection({ visible, children }: { visible: boolean; children: ReactNode }) {
  return visible ? children : null;
}
