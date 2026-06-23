// @ts-check
import { defineConfig } from "astro/config";
import react from "@astrojs/react";
import sanity from "@sanity/astro";
import tailwindcss from "@tailwindcss/vite";
import { loadEnv } from "vite";

const {
  PUBLIC_SANITY_PROJECT_ID,
  PUBLIC_SANITY_DATASET,
  PUBLIC_SANITY_API_VERSION,
} = loadEnv(process.env.NODE_ENV || "development", process.cwd(), "");

// Fallbacks alignés sur sanity.config.ts : sans var d'env (ex. build Vercel
// non configuré), le client Sanity reçoit toujours un projectId non vide, ce
// qui évite le crash « Configuration must contain projectId » au prérendu de
// /admin. Les vraies valeurs (env Vercel ou .env local) prennent le dessus.
const projectId = PUBLIC_SANITY_PROJECT_ID || "your-project-id";
const dataset = PUBLIC_SANITY_DATASET || "production";
const apiVersion = PUBLIC_SANITY_API_VERSION || "2024-10-01";

// https://astro.build/config
export default defineConfig({
  integrations: [
    sanity({
      projectId,
      dataset,
      apiVersion,
      // false pour des builds statiques toujours frais ; true pour servir via le CDN.
      useCdn: false,
      // Studio Sanity embarqué, accessible sur /admin
      studioBasePath: "/admin",
    }),
    react(),
  ],
  vite: {
    plugins: [tailwindcss()],
  },
});
