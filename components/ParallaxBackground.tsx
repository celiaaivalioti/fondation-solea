"use client";

import { useEffect, useRef } from "react";

type ParallaxBackgroundProps = {
  children: React.ReactNode;
  /** Fraction of scroll speed the layer lags behind (0 = fixed with page, 1 = pinned). */
  speed?: number;
  className?: string;
};

export default function ParallaxBackground({
  children,
  speed = 0.3,
  className = ""
}: ParallaxBackgroundProps) {
  const layerRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    const layer = layerRef.current;
    if (!layer) {
      return;
    }

    if (window.matchMedia("(prefers-reduced-motion: reduce)").matches) {
      return;
    }

    let frame = 0;

    const update = () => {
      frame = 0;
      const offset = Math.max(0, window.scrollY) * speed;
      layer.style.transform = `translate3d(0, ${offset}px, 0)`;
    };

    const onScroll = () => {
      if (!frame) {
        frame = window.requestAnimationFrame(update);
      }
    };

    update();
    window.addEventListener("scroll", onScroll, { passive: true });

    return () => {
      window.removeEventListener("scroll", onScroll);
      if (frame) {
        window.cancelAnimationFrame(frame);
      }
    };
  }, [speed]);

  return (
    <div ref={layerRef} className={`will-change-transform ${className}`}>
      {children}
    </div>
  );
}
