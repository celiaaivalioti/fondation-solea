import type { Config } from "tailwindcss";

const config: Config = {
  content: [
    "./app/**/*.{js,ts,jsx,tsx,mdx}",
    "./components/**/*.{js,ts,jsx,tsx,mdx}",
    "./lib/**/*.{js,ts,jsx,tsx,mdx}"
  ],
  theme: {
    extend: {
      fontFamily: {
        display: ["Georgia", "Times New Roman", "serif"],
        sans: ["var(--font-sans)", "Figtree", "Arial", "sans-serif"]
      },
      colors: {
        bark: "rgb(var(--color-foreground) / <alpha-value>)",
        moss: "rgb(var(--color-brand) / <alpha-value>)",
        "brand-dark": "rgb(var(--color-brand-dark) / <alpha-value>)",
        fern: "rgb(var(--color-accent) / <alpha-value>)",
        cream: "rgb(var(--color-surface-warm) / <alpha-value>)",
        clay: "rgb(var(--color-foreground-muted) / <alpha-value>)",
        linen: "rgb(var(--color-surface-warm) / <alpha-value>)",
        paper: "rgb(var(--color-surface) / <alpha-value>)",
        parchment: "rgb(var(--color-surface-deep) / <alpha-value>)",
        ivory: "rgb(var(--color-surface-soft) / <alpha-value>)",
        border: "rgb(var(--color-stroke) / <alpha-value>)"
      },
      boxShadow: {
        soft: "0 24px 80px rgb(var(--color-stroke) / 0.55)",
        glow: "0 36px 120px -28px rgb(var(--color-stroke) / 0.95)",
        rim: "0 1px 0 rgb(var(--color-on-dark) / 0.7) inset, 0 0 0 1px rgb(var(--color-stroke) / 0.65)"
      },
      transitionTimingFunction: {
        "out-soft": "cubic-bezier(0.22, 1, 0.36, 1)"
      }
    }
  },
  plugins: []
};

export default config;
