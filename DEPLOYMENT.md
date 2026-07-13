# Static deployment with Sanity

This site is built as a static export. It does not require Vercel, serverless functions, or Vercel webhooks.

## Required environment variables

Create `.env.local` for local development and set the same variables in your build environment:

```bash
NEXT_PUBLIC_SANITY_PROJECT_ID=your-project-id
NEXT_PUBLIC_SANITY_DATASET=production
NEXT_PUBLIC_SANITY_API_VERSION=2026-07-09
```

The frontend fetches published content from Sanity during `next build`. If these variables are missing, the bundled default content is used so the site remains buildable.

## Build command

```bash
npm install
npm run build:static
```

`build:static` runs `next build` with `output: "export"` from `next.config.ts`.

To preview the exported site locally:

```bash
npm run start
```

## Output folder

The static website is generated in:

```bash
out/
```

## Uploading to a standard web server

Upload the full contents of `out/` to the public web root of your hosting provider, for example:

```bash
rsync -avz out/ user@example.com:/var/www/solea/
```

Any static host can serve the files: Apache, Nginx, shared hosting, S3-compatible object storage, Netlify static hosting, Infomaniak static hosting, or another standard web server.

For Apache or Nginx, make sure clean URLs map to the exported `index.html` files inside each route folder. With `trailingSlash: true`, routes are exported as folders such as:

```text
out/
  index.html
  contact/
    index.html
  inscription/
    index.html
```

## Rebuilding after Sanity content changes

Because the final site is static, published Sanity changes appear after a rebuild:

1. Publish content in Sanity.
2. Run `npm run build:static` with the Sanity environment variables set.
3. Upload the refreshed `out/` folder to the web server.

You can automate those three steps with any CI system or cron job. No Vercel webhook is required.

## Sanity content model

The Sanity schema blueprint lives in:

```text
sanity/schemaTypes.ts
```

The included Sanity Studio config uses the same environment variables:

```bash
npm run sanity:dev
```

The Studio is an authoring tool only. It is not required by the generated static frontend and does not add serverless functionality to the website.

It covers:

- site settings and contact details
- navigation
- footer links and social links
- page heroes and page sections
- testimonials
- committee and founder profiles
- therapy cards and images
- seminar themes and optional resources
- donation and form-page copy

The frontend query and fallback merge live in:

```text
lib/cms.ts
lib/default-content.ts
```
