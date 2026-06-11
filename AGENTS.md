# easyvirtual.tours — Stack & conventions

Plateforme **Astro + Sanity** : SaaS de visites virtuelles 360°. TypeScript strict.

- **Astro 6** — pages dans `src/pages`, layouts dans `src/layouts`. React via `@astrojs/react`
  (îlots ; n'hydrater qu'avec une directive `client:*` quand c'est interactif).
- **Sanity** — Studio embarqué sur **`/admin`** (`@sanity/astro`), schémas dans
  `src/sanity/schemaTypes`, config racine `sanity.config.ts`, structure `src/sanity/structure.ts`.
  Client : `import { sanityClient } from "sanity:client"`. Images : `urlFor` dans `src/sanity/lib/image.ts`.
  Requêtes GROQ : `src/sanity/lib/queries.ts`.
- **Tailwind CSS v4** — plugin `@tailwindcss/vite`, tokens dans `src/styles/global.css`
  (importé par `src/layouts/BaseLayout.astro`).
- **Layout** — largeur de conteneur standard **1440px** (token `--container`). Wrapper tout
  contenu avec le composant `<Container>` (`src/components/Container.astro`), ou
  `mx-auto w-full max-w-[var(--container)] px-6`. Les sections générées par le MCP Gemini
  doivent caper leur contenu à **1440px**.
- **Marque** — **fond blanc dominant**, accent **orange easyJet `#FF6600`** (hover `#e85c00`,
  clair `#ff8533`, teinte `#fff4ec`). Typo — **corps** : Futura → Jost (`@fontsource-variable/jost`) ;
  **titres** : **Manrope** (`@fontsource-variable/manrope`, token `--font-heading` / classe `font-heading`,
  appliqué par défaut aux `h1..h6`), graisse fine (`font-extralight` / `font-light`) + `tracking-tight`.
  Utiliser les classes `bg-brand`, `text-brand`, `bg-brand-tint`, etc.
- **Env** — variables `PUBLIC_SANITY_*` dans `.env` (voir `.env.example`). Penser à ajouter les
  origines CORS du projet sur sanity.io/manage (`http://localhost:4321` en dev).

# Design — OBLIGATOIRE : passer par le MCP Gemini Design

Toute création ou modification d'UI (pages, sections, composants, écrans, redesigns)
DOIT passer par le serveur MCP `gemini-design-mcp`. Ne JAMAIS coder une UI à la main
quand l'un de ces outils s'applique :

- `mcp__gemini-design-mcp__create_frontend` — nouveau fichier/page/section avec design premium.
- `mcp__gemini-design-mcp__snippet_frontend` — nouveau composant à insérer dans un fichier
  existant (Claude écrit la logique/état, Gemini produit le markup).
- `mcp__gemini-design-mcp__modify_frontend` — redesign d'un élément UI existant
  (un seul changement par appel ; paralléliser les appels si plusieurs changements).

Règles :
1. Avant tout appel, lire `design-system.md` (racine) et passer son contenu INTÉGRAL dans le
   paramètre `designSystem`. Ne pas résumer.
2. Respecter la marque ci-dessus (blanc + orange `#FF6600`, typo Futura/Jost). Tokens dans
   `src/styles/global.css`.
3. `techStack` à passer : `Astro 6 + React (islands) + TypeScript + Tailwind CSS v4`.
   Demander des composants React `.tsx` utilisables comme îlots Astro (ou du markup `.astro`),
   sans dépendances externes (icônes en SVG inline).
4. Claude reste responsable de la **logique** (état, data-fetching Sanity via `sanity:client`,
   handlers, types) ; Gemini ne produit que le **markup/design**.
5. Exceptions (codables à la main, sans Gemini) : utilitaires, types, config, logique pure,
   schémas/intégrations Sanity et data — tout ce qui n'est PAS du design visuel.

Si `design-system.md` n'existe pas encore : suivre le workflow de sélection
(5 vibes → choix de l'utilisateur → enregistrement dans `design-system.md`) AVANT de générer
de nouvelles pages.
