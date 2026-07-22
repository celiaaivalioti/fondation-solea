import type { StructureResolver } from "sanity/structure";

// NOTE: this file must NOT be named `structure.ts` — with tsconfig `baseUrl`
// set to ".", `import ... from "sanity/structure"` would resolve to the local
// file instead of the npm package and break `structureTool`.

// Documents that must exist exactly once. They open straight to the single
// document (no list, no "+"), so the client cannot create duplicates that
// would confuse the `*[_type == "..."][0]` frontend queries.
export const singletons = [
  { id: "registrationForm", title: "Formulaire d'inscription" },
  { id: "contactForm", title: "Formulaire de contact" }
];

const singletonIds = new Set(singletons.map((item) => item.id));

export const structure: StructureResolver = (S) =>
  S.list()
    .title("Content")
    .items([
      // Every other document type keeps the default list behaviour.
      ...S.documentTypeListItems().filter((item) => !singletonIds.has(item.getId() ?? "")),
      // The two forms open directly to their single document.
      ...singletons.map(({ id, title }) =>
        S.listItem()
          .id(id)
          .title(title)
          .child(S.document().schemaType(id).documentId(id))
      )
    ]);
