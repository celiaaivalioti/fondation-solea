// One-off: attach the bundled sponsors hero image to the editable Sanity
// sponsors page. Keeps localUrl as a fallback, while linking a real Sanity
// image asset so the image is visible and replaceable in Studio.
//
// Run with: node scripts/seed-sponsors-hero-image.mjs [--dry-run]
import { createReadStream, existsSync, readFileSync } from "node:fs";
import { basename, dirname, join } from "node:path";
import { fileURLToPath } from "node:url";
import { createClient } from "@sanity/client";

const rootDir = join(dirname(fileURLToPath(import.meta.url)), "..");
const dryRun = process.argv.includes("--dry-run");
const localUrl = "/images/sponsors/hero-swiss-lakeside-meadow.webp";
const filePath = join(rootDir, "public", localUrl);

const env = { ...process.env };
const envPath = join(rootDir, ".env.local");
if (existsSync(envPath)) {
  for (const line of readFileSync(envPath, "utf8").split("\n")) {
    const match = line.match(/^\s*([A-Za-z_][A-Za-z0-9_]*)\s*=\s*(.*)\s*$/);
    if (match && !(match[1] in process.env)) {
      env[match[1]] = match[2].replace(/^["']|["']$/g, "");
    }
  }
}

const token = env.SANITY_API_WRITE_TOKEN;
if (!token && !dryRun) {
  console.error(
    "Missing SANITY_API_WRITE_TOKEN in .env.local.\n" +
      "Create one at https://www.sanity.io/manage (project > API > Tokens, role: Editor)."
  );
  process.exit(1);
}

if (!existsSync(filePath)) {
  console.error(`Missing image file: ${filePath}`);
  process.exit(1);
}

const client = createClient({
  projectId: env.NEXT_PUBLIC_SANITY_PROJECT_ID ?? "edrl2rre",
  dataset: env.NEXT_PUBLIC_SANITY_DATASET ?? "production",
  apiVersion: env.NEXT_PUBLIC_SANITY_API_VERSION ?? "2026-07-09",
  token,
  useCdn: false
});

const imageBase = {
  _type: "image",
  localUrl,
  className: "object-cover object-[50%_center]"
};

const filename = basename(localUrl);
const existingAsset = await client.fetch(
  '*[_type == "sanity.imageAsset" && originalFilename == $filename][0]{_id}',
  { filename }
);

if (dryRun) {
  console.log(
    existingAsset
      ? `Would reuse existing asset ${existingAsset._id}.`
      : `Would upload ${localUrl} to Sanity.`
  );
  console.log("Would patch sponsorsPage.heroImage and sponsorsPage.en.heroImage.");
  process.exit(0);
}

const asset =
  existingAsset ??
  (await client.assets.upload("image", createReadStream(filePath), {
    filename
  }));

await client.createIfNotExists({ _id: "sponsorsPage", _type: "sponsorsPage" });
await client
  .patch("sponsorsPage")
  .setIfMissing({ en: {} })
  .set({
    heroImage: {
      ...imageBase,
      alt: "Prairie au bord d'un lac en Suisse romande dans une lumière douce",
      asset: { _type: "reference", _ref: asset._id }
    },
    "en.heroImage": {
      ...imageBase,
      alt: "Lakeside meadow in French-speaking Switzerland in soft morning light",
      asset: { _type: "reference", _ref: asset._id }
    }
  })
  .commit();

console.log(`Sponsors hero image linked to Sanity asset ${asset._id}.`);
