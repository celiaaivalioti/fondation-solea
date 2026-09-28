// Preview: sanity exec scripts/consolidate-business-buttons.mjs --with-user-token
// Apply: append -- --apply. Drafts remain drafts; concurrent edits abort the patch.
import { getCliClient } from "sanity/cli";
const client = getCliClient({ apiVersion: "2026-07-09" }).withConfig({ perspective: "raw", useCdn: false });
const apply = process.argv.includes("--apply");
const nonempty = (value, fallback) => typeof value === "string" && value.trim() ? value : fallback;
function migrate(value, english = false, inherited = {}) {
  const contact = nonempty(value.contactLabel, english ? "Talk to us" : "Échanger avec nous");
  const brochure = nonempty(value.dossierLabel, english ? "Download our partnership brochure" : "Télécharger notre dossier partenariat");
  const buttons = (block, closing) => {
    const primary = block?.primary ?? {};
    const secondary = block?.secondary ?? {};
    return {
      ...block,
      primary: { ...primary, label: nonempty(primary.label, closing ? nonempty(block?.contactLabel, english ? "Arrange a meeting" : "Prendre rendez-vous") : contact), href: nonempty(primary.href, "/contact"), visible: primary.visible ?? inherited[closing ? "closing" : "hero"]?.primary?.visible ?? true },
      secondary: { ...secondary, label: nonempty(secondary.label, brochure), visible: secondary.visible ?? inherited[closing ? "closing" : "hero"]?.secondary?.visible ?? true }
    };
  };
  const hero = buttons(value.hero, false);
  const closing = buttons(value.closing, true);
  delete closing.contactLabel;
  return { hero, closing };
}
async function main() {
  const docs = await client.fetch('*[_type == "businessPage"]');
  for (const doc of docs) {
    const french = migrate(doc);
    const english = migrate(doc.en ?? {}, true, french);
    const en = { ...doc.en, ...english };
    delete en.contactLabel; delete en.dossierLabel;
    console.log(JSON.stringify({id:doc._id, fr:{primary:french.hero.primary,secondary:french.hero.secondary},en:{primary:english.hero.primary,secondary:english.hero.secondary}}));
    if (apply) await client.patch(doc._id).ifRevisionId(doc._rev).set({...french,en}).unset(['contactLabel','dossierLabel']).commit();
  }
  console.log(`${apply ? 'Updated' : 'Previewed'} ${docs.length} document(s).`);
}
main().catch(error=>{console.error(error.message);process.exitCode=1});
