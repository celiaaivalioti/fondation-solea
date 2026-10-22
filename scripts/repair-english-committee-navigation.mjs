// Populate missing editable translations without replacing existing English copy.
// Preview: npx sanity exec scripts/repair-english-committee-navigation.mjs --with-user-token
// Apply: append -- --apply
import { getCliClient } from "sanity/cli";
import { defaultContentEn } from "../lib/default-content-en.ts";

const client = getCliClient({ apiVersion: "2026-07-09" }).withConfig({ perspective: "raw", useCdn: false });
const apply = process.argv.includes("--apply");
const documents = await client.fetch('*[_type in ["committeePage", "navigation"]]');
for (const document of documents) {
  const updates = {};
  if (document._type === "committeePage") {
    if (!document.en?.members?.length) {
      updates["en.members"] = document.members.map((member) => {
        const fallback = defaultContentEn.committee.members.find((item) => item.id === member.id);
        if (!fallback) throw new Error(`No English fallback for ${member.id}`);
        return {
          _key: member._key, _type: "person", id: member.id,
          name: fallback.name, role: fallback.role,
          paragraphs: fallback.paragraphs, quote: fallback.quote
        };
      });
    } else {
      const olivia = document.en.members.find((member) => /olivia/i.test(member.id ?? member.name ?? member._key));
      if (!olivia) throw new Error(`Olivia missing from ${document._id}`);
      updates[`en.members[_key==${JSON.stringify(olivia._key)}].quote`] =
        defaultContentEn.committee.members.find((member) => member.id === "olivia-braillard").quote;
    }
  } else {
    const direction = document.en?.aboutSubmenu?.find((item) => item.href?.endsWith("#direction"));
    if (!direction) throw new Error(`Management menu item missing from ${document._id}`);
    updates[`en.aboutSubmenu[_key==${JSON.stringify(direction._key)}].label`] = "Management";
  }
  console.log(`${apply ? "Updating" : "Would update"} ${document._id}: ${Object.keys(updates).join(", ")}`);
  if (apply) {
    await client.patch(document._id).ifRevisionId(document._rev)
      .setIfMissing({ en: {} }).set(updates).commit();
  }
}
