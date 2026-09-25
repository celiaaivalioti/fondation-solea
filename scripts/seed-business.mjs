// Populate Entreprises from the same defaults used by the website and Studio.
// Run: npx sanity exec scripts/seed-business.mjs --with-user-token
// Existing published content and drafts are left untouched.
import { getCliClient } from "sanity/cli";
import { schemaTypes } from "../sanity/schemaTypes.ts";

const client = getCliClient({ apiVersion: "2026-07-09" }).withConfig({
  useCdn: false,
  perspective: "raw"
});
const existing = await client.fetch(
  '*[_id in ["businessPage", "drafts.businessPage"]]._id'
);

if (existing.length > 0) {
  console.log(`Entreprises already exists; no changes made (${existing.join(", ")}).`);
} else {
  const schema = schemaTypes.find((item) => item.name === "businessPage");
  const result = await client.createIfNotExists({
    ...schema.initialValue(),
    _id: "businessPage",
    _type: "businessPage"
  });
  console.log(`Entreprises created: ${result.benefits.items.length} benefits, ${result.engagement.items.length} engagement options, ${result.projects.items.length} projects, ${result.impact.items.length} impact figures; French and English content ready.`);
}
