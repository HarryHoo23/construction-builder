"use client";

import { defineConfig } from "sanity";
import { structureTool } from "sanity/structure";
import { visionTool } from "@sanity/vision";
import { apiVersion, dataset, projectId } from "./src/sanity/env";
import { schemaTypes } from "./src/sanity/schemaTypes";
import { structure } from "./src/sanity/structure";

export default defineConfig({
  name: "default",
  title: "Builder Website",
  projectId,
  dataset,
  basePath: "/studio",
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
