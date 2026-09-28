/** Shared by the website and Sanity. Missing switches keep existing content visible. */
export type SectionVisibility = { sectionVisibility?: Record<string, boolean> };

export function isSectionVisible(content: SectionVisibility, section: string): boolean {
  return content.sectionVisibility?.[section] !== false;
}

export const pageSections: Record<string, Record<string, string>> = {
  "home": {
    "hero": "Introduction",
    "manifesto": "Construire son chemin, ensemble"
  },
  "about": {
    "hero": "Notre histoire",
    "foundation": "Ce qui nous anime",
    "testimonials": "Témoignages",
    "mission": "Mission",
    "principles": "Principes",
    "values": "Valeurs",
    "committee": "Conseil de fondation",
    "direction": "Direction",
    "founders": "Fondateurs"
  },
  "committee": {
    "intro": "Introduction",
    "members": "Comité médical"
  },
  "retreat": {
    "hero": "Introduction",
    "immersive": "Une expérience immersive",
    "approach": "Notre approche",
    "therapies": "Thérapies",
    "program": "Programme",
    "place": "Le lieu"
  },
  "seminars": {
    "hero": "Introduction",
    "themes": "Thèmes",
    "resources": "Bibliothèque de ressources"
  },
  "support": {
    "hero": "Introduction",
    "donation": "Faire un don",
    "cause": "Pourquoi donner ?",
    "help": "Comment nous aider ?",
    "testimonial": "Remerciement",
    "social": "Gardons le lien"
  },
  "business": {
    "hero": "Introduction",
    "benefits": "Pourquoi s’engager ?",
    "engagement": "Formes d’engagement",
    "projects": "Projets prioritaires",
    "impact": "Objectifs d’impact",
    "closing": "Contact et partenariat",
    "partners": "Ils nous soutiennent déjà"
  },
  "sponsors": {
    "hero": "Introduction",
    "sections": "Groupes de sponsors",
    "closing": "Appel à nous rejoindre"
  },
  "registration": {
    "intro": "Introduction",
    "form": "Formulaire d’inscription"
  },
  "contact": {
    "intro": "Introduction et boutons",
    "form": "Formulaire de contact"
  },
  "faq": {
    "intro": "Introduction",
    "questions": "Questions et réponses"
  },
  "privacy": {
    "intro": "Titre et introduction",
    "sections": "Sections de confidentialité"
  },
  "legal": {
    "intro": "Titre et introduction",
    "sections": "Mentions légales"
  }
};
