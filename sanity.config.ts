import { defineConfig } from "sanity";
import { structureTool } from "sanity/structure";
import { visionTool } from "@sanity/vision";

import { schema } from "./src/sanity/schemaTypes";
import { structure } from "./src/sanity/structure";

// Studio embarqué via @sanity/astro (monté sur /admin par astro.config.mjs).
// import.meta.env est fourni par Vite côté Studio ; fallback process.env pour la CLI Sanity.
const env = (import.meta as { env?: Record<string, string | undefined> }).env;
const projectId =
  env?.PUBLIC_SANITY_PROJECT_ID ||
  process.env.PUBLIC_SANITY_PROJECT_ID ||
  "your-project-id";
const dataset =
  env?.PUBLIC_SANITY_DATASET || process.env.PUBLIC_SANITY_DATASET || "production";
const apiVersion =
  env?.PUBLIC_SANITY_API_VERSION ||
  process.env.PUBLIC_SANITY_API_VERSION ||
  "2024-10-01";

export default defineConfig({
  name: "easyvirtualtours",
  title: "easyvirtual.tours",
  projectId,
  dataset,
  plugins: [
    structureTool({ structure }),
    visionTool({ defaultApiVersion: apiVersion }),
  ],
  schema,
});
