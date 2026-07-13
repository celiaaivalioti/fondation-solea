import { defineConfig } from "sanity";
import { structureTool } from "sanity/structure";
import { schemaTypes } from "./sanity/schemaTypes";

export default defineConfig({
  name: "solea",
  title: "Solea",
  projectId: "edrl2rre",
  dataset: "production",
  plugins: [structureTool()],
  schema: {
    types: schemaTypes
  }
});
