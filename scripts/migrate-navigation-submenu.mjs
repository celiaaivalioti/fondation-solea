import { getCliClient } from 'sanity/cli';

const client = getCliClient({ apiVersion: '2026-07-09' }).withConfig({ perspective: 'raw', useCdn: false });
const apply = process.argv.includes('--apply');
const anchors = ['notre-histoire', 'ce-qui-nous-anime', 'conseil-de-fondation', 'direction'];
const links = (labels) => labels.map((label, index) => ({
  _key: anchors[index], _type: 'link', label,
  href: `/qui-sommes-nous#${anchors[index]}`
}));
const french = links(['Notre histoire', 'Ce qui nous anime', 'Conseil de Fondation', 'La Direction']);
const english = links(['Our story', 'What drives us', 'Foundation Board', 'Leadership']);
const documents = await client.fetch('*[_type == "navigation"]');
for (const document of documents) {
  const values = {};
  if (document.aboutSubmenu === undefined) values.aboutSubmenu = french;
  if (document.en?.aboutSubmenu === undefined) {
    if (document.en) values['en.aboutSubmenu'] = english;
    else values.en = { aboutSubmenu: english };
  }
  if (!Object.keys(values).length) continue;
  console.log(`${apply ? 'Updating' : 'Would update'} ${document._id}: ${Object.keys(values).join(', ')}`);
  if (apply) await client.patch(document._id).ifRevisionId(document._rev).set(values).commit();
}
