import { mkdirSync, writeFileSync } from "node:fs";
import { dirname, join } from "node:path";
import { fileURLToPath } from "node:url";

const __dirname = dirname(fileURLToPath(import.meta.url));
const rootDir = join(__dirname, "..");

const { defaultContent } = await import("../lib/default-content.ts");

function stripImage(value) {
  if (Array.isArray(value)) {
    return value.map(stripImage);
  }

  if (!value || typeof value !== "object") {
    return value;
  }

  if ("url" in value && "alt" in value && Object.keys(value).every((key) => ["url", "alt", "className", "frameClass"].includes(key))) {
    const stripped = {
      localUrl: value.url
    };

    if (value.alt) {
      stripped.alt = value.alt;
    }

    if (value.className) {
      stripped.className = value.className;
    }

    if (value.frameClass) {
      stripped.frameClass = value.frameClass;
    }

    return stripped;
  }

  return Object.fromEntries(
    Object.entries(value)
      .map(([key, nestedValue]) => [key, stripImage(nestedValue)])
  );
}

function doc(_id, _type, content) {
  return {
    _id,
    _type,
    ...stripImage(content)
  };
}

const documents = [
  doc("siteSettings", "siteSettings", defaultContent.site),
  doc("navigation", "navigation", { items: defaultContent.navigation }),
  doc("homePage", "homePage", defaultContent.home),
  doc("aboutPage", "aboutPage", defaultContent.about),
  doc("retreatPage", "retreatPage", defaultContent.retreat),
  doc("seminarsPage", "seminarsPage", defaultContent.seminars),
  doc("supportPage", "supportPage", defaultContent.support),
  doc("registrationPage", "registrationPage", defaultContent.registration),
  doc("contactPage", "contactPage", defaultContent.contact)
];

const outputPath = join(rootDir, "sanity", "seed-current-content.ndjson");
mkdirSync(dirname(outputPath), { recursive: true });
writeFileSync(outputPath, `${documents.map((document) => JSON.stringify(document)).join("\n")}\n`);

console.log(`Wrote ${documents.length} documents to ${outputPath}`);
