// Uploads the bundled images from public/images to Sanity as real image
// assets and links them to the documents that currently reference them via
// the "localUrl" fallback field. Idempotent: documents whose images already
// have a Sanity asset are left untouched.
//
// Requires a write token in .env.local:
//   SANITY_API_WRITE_TOKEN=...   (sanity.io/manage > project > API > Tokens, role Editor)
//
// Run with: node scripts/upload-sanity-images.mjs [--dry-run]
import { createReadStream, existsSync, readFileSync } from "node:fs";
import { join, dirname, basename } from "node:path";
import { fileURLToPath } from "node:url";
import { createClient } from "@sanity/client";

const rootDir = join(dirname(fileURLToPath(import.meta.url)), "..");
const dryRun = process.argv.includes("--dry-run");

// Minimal .env.local loader (no dependency needed).
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
  "registrationPage",
  "contactPage"
];

// Collect every {localUrl} image object without an asset, walk-and-patch.
const pendingUploads = new Map(); // localUrl -> asset _id (filled after upload)

function collectLocalUrls(value) {
  if (Array.isArray(value)) {
    value.forEach(collectLocalUrls);
    return;
  }
  if (!value || typeof value !== "object") {
    return;
  }
  if (typeof value.localUrl === "string" && !value.asset) {
    pendingUploads.set(value.localUrl, null);
  }
  Object.values(value).forEach(collectLocalUrls);
}

function linkAssets(value) {
  if (Array.isArray(value)) {
    return value.map(linkAssets);
  }
  if (!value || typeof value !== "object") {
    return value;
  }
  if (typeof value.localUrl === "string" && !value.asset && pendingUploads.get(value.localUrl)) {
    return {
      ...Object.fromEntries(Object.entries(value).map(([k, v]) => [k, linkAssets(v)])),
      _type: value._type ?? "image",
      asset: { _type: "reference", _ref: pendingUploads.get(value.localUrl) }
    };
  }
  return Object.fromEntries(Object.entries(value).map(([k, v]) => [k, linkAssets(v)]));
}

const docs = (
  await Promise.all(documentIds.map((id) => client.getDocument(id)))
).filter(Boolean);

docs.forEach(collectLocalUrls);

if (pendingUploads.size === 0) {
  console.log("Nothing to do: every image already has a Sanity asset.");
  process.exit(0);
}

console.log(`${pendingUploads.size} image(s) referenced without a Sanity asset:`);
for (const localUrl of pendingUploads.keys()) {
  const filePath = join(rootDir, "public", localUrl);
  console.log(`  ${localUrl} ${existsSync(filePath) ? "" : "  (!! file missing in public/)"}`);
}

if (dryRun) {
  console.log("Dry run: no uploads performed.");
  process.exit(0);
}

for (const localUrl of pendingUploads.keys()) {
  const filePath = join(rootDir, "public", localUrl);
  if (!existsSync(filePath)) {
    console.warn(`Skipping ${localUrl}: file not found.`);
    pendingUploads.delete(localUrl);
    continue;
  }
  const asset = await client.assets.upload("image", createReadStream(filePath), {
    filename: basename(localUrl)
  });
  pendingUploads.set(localUrl, asset._id);
  console.log(`Uploaded ${localUrl} -> ${asset._id}`);
}

for (const doc of docs) {
  const linked = linkAssets(doc);
  if (JSON.stringify(linked) === JSON.stringify(doc)) {
    continue;
  }
  await client.createOrReplace(linked);
  console.log(`Linked assets in ${doc._id}`);
}

console.log("Done. The website prefers Sanity assets automatically (localUrl stays as fallback).");
