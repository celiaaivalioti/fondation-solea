# Deployment with Sanity

This site is a Next.js App Router site connected to Sanity.

The preferred production setup is a Node.js host, so the public website can fetch published Sanity content at request time. This makes CMS updates visible quickly without rebuilding and uploading a static export after every content change.

The previous static export setup is still possible, but it is no longer the recommended production path for this project.

## Required environment variables

Create `.env.local` for local development and set the same variables in your hosting environment:

```bash
NEXT_PUBLIC_SANITY_PROJECT_ID=your-project-id
NEXT_PUBLIC_SANITY_DATASET=production
NEXT_PUBLIC_SANITY_API_VERSION=2026-07-09
```

The frontend fetches published content from Sanity. If these variables are missing, the bundled default content is used so the site remains runnable.

## Node.js hosting

Use a Node.js hosting environment such as Infomaniak Node.js hosting.

Recommended settings:

```bash
Install command: npm ci
Build command: npm run build
Start command: npm run start
Node version: 22
```

The `start` script runs:

```bash
next start -p ${PORT:-3000}
```

Infomaniak should provide a `PORT` environment variable for the Node process. If it does not, set one in the hosting panel and make sure the app listens on that same port.

## Updating content

With Node.js hosting, published Sanity changes are read by the live website at request time. The Sanity webhook to GitHub is no longer required for content-only changes.

Use the GitHub/Sanity rebuild workflow only if you choose to return to static export hosting.

## Local development

```bash
npm install
npm run dev
```

Open:

```text
http://localhost:3000
```

## Build check

Before deploying code changes:

```bash
npm run lint
npm run build
```

## Static export fallback

If you need to deploy to a server that can only serve static files, restore `output: "export"` in `next.config.ts`, run:

```bash
npm run build:static
```

and upload the contents of `out/` to the public web root.

## GitHub repository

This project is connected to GitHub:

```text
https://github.com/celiaaivalioti/fondation-solea
```

The workflow in `.github/workflows/deploy-infomaniak.yml` checks that the app builds successfully. It runs on pushes to `main`, and it can also be started manually from:

```text
GitHub > Actions > Build check > Run workflow
```

The workflow in `.github/workflows/deploy-node-preview.yml` updates the Infomaniak Node preview app over SSH after code is pushed to `main`.

Required GitHub repository secrets for the Node preview deployment:

```bash
INFOMANIAK_SSH_HOST
INFOMANIAK_SSH_USERNAME
INFOMANIAK_SSH_PASSWORD
INFOMANIAK_SSH_PORT
```

The workflow runs:

```bash
cd /srv/customer/sites/preview.fondation-solea.ch
git fetch origin main
git reset --hard origin/main
npm ci
npm run build
```

If Infomaniak does not automatically reload the managed Node process after a build, restart it from the Node site dashboard.

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
