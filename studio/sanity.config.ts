import { defineConfig } from "sanity";
import { structureTool } from "sanity/structure";
import { visionTool } from "@sanity/vision";
import { schemaTypes } from "./schemaTypes";
import { structure } from "./structure";

const apiVersion = "2026-07-28";
const dataset = "production";
const projectId = "69j8m4rs";

export default defineConfig({
  name: "default",
  title: "Builder Construction",
  projectId,
  dataset,
  plugins: [structureTool({ structure }), visionTool({ defaultApiVersion: apiVersion })],
  schema: {
    types: schemaTypes,
  },
  document: {
    actions: (previousActions, context) =>
      context.schemaType === "siteSettings"
        ? previousActions.filter(
            ({ action }) => action !== "duplicate" && action !== "delete",
          )
        : previousActions,
  },
});
