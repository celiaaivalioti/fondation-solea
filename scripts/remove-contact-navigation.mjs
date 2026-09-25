// Contact is now accessible through the dedicated footer button.
// Run: npx sanity exec scripts/remove-contact-navigation.mjs --with-user-token
import { getCliClient } from "sanity/cli";

const client = getCliClient({ apiVersion: "2026-07-09" }).withConfig({
  useCdn: false,
  perspective: "raw"
});
const documents = await client.fetch('*[_type == "navigation"]');
for (const doc of documents) {
  const updates = {};
  for (const [path, items] of [["items", doc.items], ["en.items", doc.en?.items]]) {
    if (!Array.isArray(items)) continue;
    const filtered = items.filter((item) => !/^\/(?:en\/)?contact\/?$/.test(item.href ?? ""));
    if (filtered.length !== items.length) updates[path] = filtered;
  }
  if (Object.keys(updates).length > 0) {
    await client.patch(doc._id).ifRevisionId(doc._rev).set(updates).commit();
    console.log(`Removed Contact from ${doc._id}.`);
  }
}
