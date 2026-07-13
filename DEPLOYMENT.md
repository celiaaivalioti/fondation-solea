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

## Deploying code changes

From the `main` branch, with your changes committed:

```bash
npm run deploy
```

This pushes to GitHub, then watches the "Deploy to Infomaniak" workflow live in your terminal. The workflow lints and builds the app first, and only deploys to the Infomaniak server if those checks pass. When the command prints a green check, the preview site is updated.

A plain `git push origin main` triggers exactly the same workflow — `npm run deploy` just adds the live progress and the failure log in your terminal.

To check things locally before pushing:

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

The workflow in `.github/workflows/deploy.yml` runs on pushes to `main` (and manually from GitHub > Actions > Deploy to Infomaniak > Run workflow). It lints and builds the app on GitHub's runners with `output: "standalone"`, then rsyncs the ready-to-run bundle (`server.js`, minimal `node_modules`, `.next`, `public`) to the Infomaniak Node hosting over SSH.

**Nothing is built on the server.** Infomaniak's SSH sessions are memory-capped (about 1 GB) and silently kill `npm ci` / `next build`, so the server only ever receives finished files.

Required GitHub repository secrets:

```bash
INFOMANIAK_SSH_HOST        # e.g. 57-114193.ssh.hosting-ik.com (Node hosting, not the web hosting)
INFOMANIAK_SSH_USERNAME
INFOMANIAK_SSH_PASSWORD
INFOMANIAK_SSH_PORT
NEXT_PUBLIC_SANITY_PROJECT_ID
NEXT_PUBLIC_SANITY_DATASET
NEXT_PUBLIC_SANITY_API_VERSION
```

The Sanity variables are baked into the bundle at build time, so the hosting itself needs no environment variables.

Expected Infomaniak Node site settings (Manager > Node.js hosting):

```text
Install command: (empty — the bundle arrives complete)
Build command:   (empty)
Start command:   npm run start
```

`npm run start` on the server runs `start-standalone.js`, a small wrapper that starts the Next.js server and watches `.next/BUILD_ID`. When a deploy uploads a new build, the wrapper exits and Infomaniak's supervisor restarts the app with the new code — no manual restart needed. If the site ever keeps serving an old version long after a green deploy, restart the Node app once from the Manager.

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
