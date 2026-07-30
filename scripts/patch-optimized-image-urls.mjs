// One-off: switch Studio-managed local image fallbacks from heavy PNG photos
// to the optimized WebP files committed in public/images.
//
// Run with: node scripts/patch-optimized-image-urls.mjs [--dry-run]
import { existsSync, readFileSync } from "node:fs";
import { dirname, join } from "node:path";
import { fileURLToPath } from "node:url";
import { createClient } from "@sanity/client";

const rootDir = join(dirname(fileURLToPath(import.meta.url)), "..");
const dryRun = process.argv.includes("--dry-run");

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

const replacements = new Map([
  ["/images/therapies/acupuncture-auriculotherapie.png", "/images/therapies/acupuncture-auriculotherapie.webp"],
  ["/images/therapies/art-therapie.png", "/images/therapies/art-therapie.webp"],
  ["/images/therapies/echanges-remission.png", "/images/therapies/echanges-remission.webp"],
  ["/images/therapies/equicoaching.png", "/images/therapies/equicoaching.webp"],
  ["/images/therapies/hypnose-visualisation.png", "/images/therapies/hypnose-visualisation.webp"],
  ["/images/therapies/massages-shiatsu.png", "/images/therapies/massages-shiatsu.webp"],
  ["/images/therapies/meditation-sophrologie.png", "/images/therapies/meditation-sophrologie.webp"],
  ["/images/therapies/nutrition-naturopathie.png", "/images/therapies/nutrition-naturopathie.webp"],
  ["/images/therapies/sonotherapie.png", "/images/therapies/sonotherapie.webp"],
  ["/images/therapies/yoga-qi-gong-tai-chi.png", "/images/therapies/yoga-qi-gong-tai-chi.webp"]
]);

const token = env.SANITY_API_WRITE_TOKEN;
if (!token && !dryRun) {
  console.error(
    "Missing SANITY_API_WRITE_TOKEN in .env.local.\n" +
      "Create one at https://www.sanity.io/manage (project > API > Tokens, role: Editor)."
  );
  process.exit(1);
}

const client = createClient({
  projectId: env.NEXT_PUBLIC_SANITY_PROJECT_ID ?? "edrl2rre",
  dataset: env.NEXT_PUBLIC_SANITY_DATASET ?? "production",
  apiVersion: env.NEXT_PUBLIC_SANITY_API_VERSION ?? "2026-07-09",
  token,
  useCdn: false
});

const documentIds = [
  "siteSettings",
  "navigation",
  "homePage",
  "aboutPage",
  "retreatPage",
  "seminarsPage",
  "supportPage",
  "sponsorsPage",
  "registrationPage",
  "contactPage",
  "privacyPage",
  "faqPage"
];

function replaceUrls(value) {
  if (Array.isArray(value)) {
    let changed = false;
    const next = value.map((item) => {
      const replaced = replaceUrls(item);
      changed ||= replaced !== item;
      return replaced;
    });

    return changed ? next : value;
  }

  if (!value || typeof value !== "object") {
    return replacements.get(value) ?? value;
  }

  let changed = false;
  const next = {};

  for (const [key, nestedValue] of Object.entries(value)) {
    const replaced = replaceUrls(nestedValue);
    next[key] = replaced;
    changed ||= replaced !== nestedValue;
  }

  return changed ? next : value;
}

const docs = await client.fetch("*[_id in $ids]", { ids: documentIds });
let changedCount = 0;

for (const doc of docs) {
  const next = replaceUrls(doc);
  if (next === doc) {
    continue;
  }

  changedCount += 1;
  console.log(`${dryRun ? "Would update" : "Updating"} ${doc._id}`);

  if (!dryRun) {
    const { _id, _rev, _type, ...fields } = next;
    await client.patch(doc._id).set(fields).commit();
  }
}

console.log(`${dryRun ? "Would update" : "Updated"} ${changedCount} document(s).`);
