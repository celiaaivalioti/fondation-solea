"use client";

import Image from "next/image";
import Link from "next/link";
import { useState } from "react";
import { ArrowRight, BookOpen, FileText, Headphones, Presentation, Wrench } from "lucide-react";
import type { SeminarsContent } from "@/lib/cms-types";
import type { Locale } from "@/lib/locales";
import { newTabProps } from "@/lib/links";

const formats = {
  article: { fr: "Articles", en: "Articles", singularFr: "Article", singularEn: "Article", actionFr: "Lire l’article", actionEn: "Read article", icon: FileText },
  book: { fr: "Livres", en: "Books", singularFr: "Livre", singularEn: "Book", actionFr: "Découvrir le livre", actionEn: "Explore book", icon: BookOpen },
  podcast: { fr: "Podcasts", en: "Podcasts", singularFr: "Podcast", singularEn: "Podcast", actionFr: "Écouter le podcast", actionEn: "Listen to podcast", icon: Headphones },
  conference: { fr: "Conférences", en: "Talks", singularFr: "Conférence", singularEn: "Talk", actionFr: "Voir la conférence", actionEn: "Watch talk", icon: Presentation },
  guide: { fr: "Outils pratiques", en: "Practical tools", singularFr: "Outil pratique", singularEn: "Practical tool", actionFr: "Consulter le guide", actionEn: "Read guide", icon: Wrench }
};
type Category = keyof typeof formats;

export default function ResourceLibrary({ resources, locale }: { resources: NonNullable<SeminarsContent["resources"]>; locale: Locale }) {
  const [category, setCategory] = useState<Category | "all">("all");
  const [showAll, setShowAll] = useState(false);
  const isFrench = locale === "fr";
  const filtered = resources.items.filter((item) => category === "all" || (item.category ?? "article") === category);
  const visible = showAll ? filtered : filtered.slice(0, 4);

  return <section id="bibliotheque" aria-labelledby="resource-library-title" className="scroll-mt-28 bg-linen/40 px-5 py-16 sm:px-8 lg:py-24">
    <div className="mx-auto max-w-[1400px]">
      <div className="flex flex-col gap-6 lg:flex-row lg:items-start lg:justify-between">
        <div className="max-w-4xl">
          <p className="text-[13px] font-semibold uppercase tracking-[0.18em] text-moss">{resources.eyebrow}</p>
          <h2 id="resource-library-title" className="mt-4 font-display text-[clamp(1.9rem,3vw,2.8rem)] font-light leading-tight text-bark">{resources.title}</h2>
          {resources.intro && <p className="mt-5 whitespace-pre-line text-lg leading-relaxed text-bark/75">{resources.intro}</p>}
        </div>
        {resources.items.length > 4 && !showAll && <button type="button" onClick={() => { setCategory("all"); setShowAll(true); }} className="inline-flex min-h-12 flex-none items-center gap-2 self-start font-semibold text-brand-dark underline underline-offset-4 focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-4 focus-visible:outline-moss">
          {isFrench ? "Voir toutes les ressources" : "View all resources"}<ArrowRight aria-hidden="true" className="h-4 w-4" />
        </button>}
      </div>

      {resources.items.length > 0 ? <>
        <div role="group" aria-label={isFrench ? "Filtrer par type de ressource" : "Filter by resource type"} className="mt-8 flex flex-wrap gap-2">
          {(["all", ...Object.keys(formats)] as Array<Category | "all">).map((key) => <button
            key={key} type="button" aria-pressed={category === key}
            onClick={() => { setCategory(key); setShowAll(false); }}
            className={`min-h-11 rounded-full border px-5 py-2 text-sm font-semibold transition-colors focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-moss ${category === key ? "border-moss bg-moss text-paper" : "border-bark/15 text-bark hover:bg-paper"}`}
          >{key === "all" ? isFrench ? "Tout" : "All" : formats[key][locale]}</button>)}
        </div>
        <p aria-live="polite" className="sr-only">{filtered.length} {isFrench ? "ressources" : "resources"}</p>
        <div className="mt-8 grid gap-6 sm:grid-cols-2 xl:grid-cols-4">
          {visible.map((resource, index) => {
            const format = formats[resource.category ?? "article"] ?? formats.article;
            const Icon = format.icon;
            const href = resource.fileUrl || resource.href;
            return <article key={`${resource.title}-${index}`} className="flex flex-col overflow-hidden rounded-2xl border border-bark/10 bg-paper">
              <div className="relative flex aspect-[1.9/1] items-center justify-center bg-fern/30">
                {resource.image?.url
                  ? <Image src={resource.image.url} alt={resource.image.alt || ""} fill className="object-cover" sizes="(min-width: 1280px) 25vw, (min-width: 640px) 50vw, 100vw" />
                  : <Icon aria-hidden="true" className="h-12 w-12 text-moss" strokeWidth={1.2} />}
                <span className="absolute left-3 top-3 rounded bg-paper/95 px-2.5 py-1 text-xs font-semibold uppercase tracking-wide text-bark">{isFrench ? format.singularFr : format.singularEn}</span>
              </div>
              <div className="flex flex-1 flex-col p-5">
                <h3 className="text-lg font-semibold leading-snug text-bark">{resource.title}</h3>
                {resource.source && <p className="mt-2 text-sm leading-relaxed text-bark/60">{resource.source}</p>}
                <p className="mt-3 whitespace-pre-line leading-relaxed text-bark/75">{resource.text}</p>
                {href && resource.showButton !== false && <Link href={href} {...newTabProps(resource.newTab)} className="mt-4 inline-flex min-h-11 items-center gap-2 self-start font-semibold text-brand-dark underline-offset-4 hover:underline focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-4 focus-visible:outline-moss">
                  {resource.linkLabel || (resource.fileUrl ? isFrench ? "Télécharger le document" : "Download document" : isFrench ? format.actionFr : format.actionEn)}<ArrowRight aria-hidden="true" className="h-4 w-4 flex-none" />
                </Link>}
                {resource.recommender?.name && <div className="mt-auto flex items-center gap-3 pt-6">
                  {resource.recommender.image?.url && <div className="relative h-10 w-10 flex-none overflow-hidden rounded-full"><Image src={resource.recommender.image.url} alt={resource.recommender.image.alt || ""} fill className="object-cover" sizes="40px" /></div>}
                  <div className="text-xs leading-relaxed text-bark/65"><p>{isFrench ? "Recommandé par" : "Recommended by"}</p><p className="font-semibold text-bark">{resource.recommender.name}</p>{resource.recommender.role && <p>{resource.recommender.role}</p>}</div>
                </div>}
              </div>
            </article>;
          })}
        </div>
        {filtered.length === 0 && <p className="py-12 text-center text-bark/70">{isFrench ? "Aucune ressource dans cette catégorie pour le moment." : "No resources in this category yet."}</p>}
        {!showAll && filtered.length > 4 && <button type="button" onClick={() => setShowAll(true)} className="mx-auto mt-8 flex min-h-12 items-center gap-2 rounded-full border border-moss px-6 py-3 font-semibold text-brand-dark hover:bg-paper">
          {isFrench ? "Afficher la suite" : "Show more"}<ArrowRight aria-hidden="true" className="h-4 w-4" />
        </button>}
      </> : <div className="mt-10 flex items-center gap-4 rounded-2xl border border-bark/10 p-6 text-bark/70">
        <BookOpen aria-hidden="true" className="h-8 w-8 flex-none text-moss" strokeWidth={1.5} />
        <p>{isFrench ? "Notre sélection de ressources sera bientôt disponible ici." : "Our selected resources will be available here soon."}</p>
      </div>}
    </div>
  </section>;
}
