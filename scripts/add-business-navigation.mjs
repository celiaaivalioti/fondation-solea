// Run: npx sanity exec scripts/add-business-navigation.mjs --with-user-token
import { getCliClient } from "sanity/cli";

const client = getCliClient({ apiVersion: "2026-07-09" }).withConfig({
  useCdn: false,
  perspective: "raw"
});
const documents = await client.fetch('*[_type == "navigation"]');
for (const doc of documents) {
  let patch = client.patch(doc._id).ifRevisionId(doc._rev);
  let changed = false;
  for (const [path, items, label] of [
    ["items", doc.items, "Entreprises"],
    ["en.items", doc.en?.items, "Businesses"]
  ]) {
    if (!Array.isArray(items) || items.some((item) => item.href?.replace(/\/$/, "") === "/entreprises")) continue;
    const index = items.findIndex((item) => item.href?.replace(/\/$/, "") === "/seminaires-ressources");
    const updatedItems = [...items];
    updatedItems.splice(index >= 0 ? index + 1 : items.length, 0, {
      _key: "businesses", _type: "link", label, href: "/entreprises", newTab: false
    });
    patch = patch.set({ [path]: updatedItems });
    changed = true;
  }
  if (changed) {
    await patch.commit();
    console.log(`Added Entreprises / Businesses to ${doc._id}.`);
  }
}
