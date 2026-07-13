# AGENTS.md — Solea

## Project goal
Build a premium, modern French foundation website for “Solea”, a nonprofit supporting people affected by cancer through a free 5-day restorative experience.

The website must feel:
- warm
- human
- hopeful
- elegant
- calm
- non-clinical
- high-quality Swiss foundation style

Avoid:
- hospital look
- medical/corporate design
- generic NGO templates
- clutter
- excessive text density
- invented medical claims

## Tech stack
Use:
- Next.js App Router
- TypeScript
- Tailwind CSS
- React components
- Semantic HTML

Do not use:
- Bootstrap
- jQuery
- inline styles unless absolutely necessary
- lorem ipsum

## Site pages
Create these routes:

- `/` — Accueil
- `/qui-sommes-nous`
- `/experience-5-jours`
- `/seminaires-ressources`
- `/nous-soutenir`
- `/inscription`
- `/contact`

## Visual identity

### Colors
Use these CSS variables in `globals.css`:

```css
:root {
  --color-forest: #2D5A3D;
  --color-forest-dark: #173824;
  --color-sage: #6F8F72;
  --color-cream: #F5F0E8;
  --color-offwhite: #FBF8F2;
  --color-text: #1F2A24;
  --color-muted: #6B6B63;
  --color-border: #DDD4C7;
}
```
