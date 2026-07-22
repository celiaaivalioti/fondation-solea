import { defineConfig } from "sanity";
import { structureTool } from "sanity/structure";
import { schemaTypes } from "./sanity/schemaTypes";
import { singletons, structure } from "./sanity/deskStructure";

const singletonTypes = new Set(singletons.map((item) => item.id));

export default defineConfig({
  name: "solea",
  title: "Solea",
  projectId: "edrl2rre",
  dataset: "production",
  plugins: [structureTool({ structure })],
  schema: {
    types: schemaTypes,
    // Hide the singleton forms from the "create new document" templates, so
    // they can only ever be edited, never duplicated.
    templates: (prev) => prev.filter(({ schemaType }) => !singletonTypes.has(schemaType))
  },
  document: {
    // Also remove them from the global "+" new-document menu.
    newDocumentOptions: (prev, { creationContext }) =>
      creationContext.type === "global"
        ? prev.filter((item) => !singletonTypes.has(item.templateId))
        : prev
  }
});
