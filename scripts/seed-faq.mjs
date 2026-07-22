// One-off: create the editable faqPage singleton document in Sanity, pre-filled
// from the bundled default content. Run with:
//   npx sanity exec scripts/seed-faq.mjs --with-user-token
// Uses createIfNotExists, so it never overwrites an existing document.
import { getCliClient } from "sanity/cli";

const { defaultContent } = await import("../lib/default-content.ts");

const client = getCliClient({ apiVersion: "2026-07-09" });

const faq = defaultContent.faq;

const doc = {
  _id: "faqPage",
  _type: "faqPage",
  metadataTitle: faq.metadataTitle,
  eyebrow: faq.eyebrow,
  title: faq.title,
  items: faq.items.map((item, index) => ({
    _key: `faq-${index}`,
    _type: "faqItem",
    question: item.question,
    answer: item.answer
  }))
};

const result = await client.createIfNotExists(doc);
console.log(`faqPage ready: ${result._id} (${result.items?.length ?? 0} questions)`);
