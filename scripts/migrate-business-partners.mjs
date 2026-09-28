// sanity exec scripts/migrate-business-partners.mjs --with-user-token [-- --apply]
import { defaultContent } from "../lib/default-content.ts";
import { createReadStream } from "node:fs";
import { resolve, basename } from "node:path";
import { getCliClient } from "sanity/cli";
const client = getCliClient({apiVersion:"2026-07-09"}).withConfig({perspective:"raw",useCdn:false});
const apply = process.argv.includes("--apply");
const defaults = {
  fr: {eyebrow:"Ils nous soutiennent déjà", title:"", intro:"Des entreprises et fondations engagées à nos côtés."},
  en: {eyebrow:"Already supporting us", title:"", intro:"Partners committed alongside us."}
};
function merge(fallback, value) {
  if (value == null || value === "") return fallback;
  if (Array.isArray(fallback)) return Array.isArray(value) && value.length ? value.map((item,index)=>merge(fallback[index],item)) : fallback;
  if (fallback && typeof fallback === "object" && value && typeof value === "object") return Object.fromEntries([...new Set([...Object.keys(fallback),...Object.keys(value)])].map(key=>[key,merge(fallback[key],value[key])]));
  return value;
}
const text = (value, fallback) => typeof value === "string" && value.trim() ? value : fallback;
async function main() {
  const docs=await client.fetch('*[_type in ["businessPage", "sponsorsPage"]]');
  for(const doc of docs.filter(d=>d._type==="businessPage")) {
    const publishedSponsors=docs.find(d=>d._type==="sponsorsPage" && !d._id.startsWith("drafts.") && !d._id.startsWith("versions."));
    const source=doc._id.startsWith("drafts.") ? docs.find(d=>d._id===`drafts.${publishedSponsors?._id}`) ?? publishedSponsors : publishedSponsors;
    const effectiveSponsors=merge(defaultContent.sponsors,source);
    const logos=(effectiveSponsors.sections??[]).flatMap(section=>(section.logos??[]).map(logo=>({...logo,visible:section.visible!==false && logo.visible!==false}))).map((logo,index)=>({...logo,_key:`partner-${index}`}));
    const partners={...defaults.fr,eyebrow:text(doc.partnersEyebrow,defaults.fr.eyebrow),intro:text(doc.partnersIntro,defaults.fr.intro),logos,...doc.partners};
    const en={...doc.en,partners:{...defaults.en,eyebrow:text(doc.en?.partnersEyebrow,defaults.en.eyebrow),intro:text(doc.en?.partnersIntro,defaults.en.intro),...doc.en?.partners}};
    delete en.partnersEyebrow; delete en.partnersIntro; delete en.partners.logos;
    console.log(JSON.stringify({id:doc._id,eyebrow:partners.eyebrow,logos:partners.logos.map(l=>({name:l.name,linked:!!l.image?.asset?._ref,href:l.href,visible:l.visible}))}));
    if(apply) {
      for (const logo of partners.logos) {
        const image=logo.image;
        const localUrl=image?.localUrl || image?.url;
        if(image && !image.asset?._ref && localUrl?.startsWith("/images/")) {
          const file=resolve("public", `.${localUrl}`);
          const asset=await client.assets.upload("image",createReadStream(file),{filename:basename(file)});
          logo.image={...image,_type:"image",localUrl,asset:{_type:"reference",_ref:asset._id}};
          delete logo.image.url;
        }
        logo._type="sponsorLogo";
      }
      await client.patch(doc._id).ifRevisionId(doc._rev).set({partners,en}).unset(['partnersEyebrow','partnersIntro']).commit();
    }
  }
  console.log(apply?'Migration complete.':'Preview only.');
}
main().catch(error=>{console.error(error.message);process.exitCode=1});
