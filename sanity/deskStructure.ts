import type { StructureResolver } from "sanity/structure";

// NOTE: this file must NOT be named `structure.ts` — with tsconfig `baseUrl`
// set to ".", `import ... from "sanity/structure"` would resolve to the local
// file instead of the npm package and break `structureTool`.

// Documents that must exist exactly once. They open straight to the single
// document (no list, no "+"), so the client cannot create duplicates that
// would confuse the `*[_type == "..."][0]` frontend queries.
export const singletons = [
  { id: "businessPage", title: "Entreprises" },
  { id: "legalPage", title: "Mentions légales" },
  { id: "committeePage", title: "Le comité pluridisciplinaire" },
  { id: "faqPage", title: "Questions fréquentes" },
  { id: "registrationForm", title: "Formulaire d'inscription" },
  { id: "contactForm", title: "Formulaire de contact" }
];

const singletonIds = new Set(singletons.map((item) => item.id));

const studioMenuOrder = [
  "siteSettings",
  "navigation",
  "homePage",
  "aboutPage",
  "committeePage",
  "retreatPage",
  "seminarsPage",
  "faqPage",
  "registrationPage",
  "contactPage",
  "supportPage",
  "businessPage",
  "sponsorsPage",
  "privacyPage",
  "legalPage",
  "registrationForm",
  "contactForm"
];

export const structure: StructureResolver = (S) => {
  const defaultItems = new Map(
    S.documentTypeListItems().map((item) => [item.getId() ?? "", item])
  );
  const singletonTitles = new Map(singletons.map(({ id, title }) => [id, title]));

  return S.list()
    .title("Content")
    .items(
      studioMenuOrder.flatMap((id) => {
        if (singletonIds.has(id)) {
          return [
            S.listItem()
              .id(id)
              .title(singletonTitles.get(id) ?? id)
              .child(S.document().schemaType(id).documentId(id))
          ];
        }

        const item = defaultItems.get(id);
        return item ? [item] : [];
      })
    );
};
