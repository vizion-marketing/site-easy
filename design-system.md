# Design System — easyvirtual.tours

Système de design **canonique** du projet, extrait de l'identité déjà en place
(tokens `src/styles/global.css`, section Marque d'AGENTS.md, composants Navbar / Hero /
Franchises). À passer **intégralement** dans le paramètre `designSystem` de tout appel au
MCP Gemini Design. Ne pas résumer.

---

## 1. Marque & principe

- **Fond blanc dominant.** Les sections de contenu sont sur fond blanc `#ffffff`.
  Les sections « hero » immersives peuvent être sur fond sombre (`bg-zinc-950`) avec image.
- **Accent orange easyJet `#FF6600`**, utilisé avec parcimonie : CTA, eyebrows, chiffres-clés,
  icônes, liens, petits traits décoratifs. Jamais de grands aplats orange sauf la tuile CTA.
- Ton : premium, aéré, humain, technologique. Beaucoup de blanc, respirations généreuses.

## 2. Couleurs (tokens CSS — `src/styles/global.css`)

```
--background:       #ffffff
--foreground:       #0a0a0a   /* quasi-noir pour titres & texte fort */
--brand:            #ff6600   /* orange principal (classe bg-brand / text-brand) */
--brand-dark:       #e85c00   /* hover des CTA orange */
--brand-light:      #ff8533   /* dégradés, survols clairs */
--brand-tint:       #fff4ec   /* fond des chips d'icônes, zones très claires */
--muted:            #f6f6f7   /* fonds neutres */
--muted-foreground: #6b7280   /* texte secondaire (≈ gray-500/600) */
--border:           #e5e7eb   /* bordures fines (≈ gray-200) */
--container:        1440px    /* largeur de conteneur standard */
```

Classes utilitaires dispo : `bg-brand`, `text-brand`, `bg-brand-tint`, `bg-background`,
`text-foreground`, etc. On utilise aussi directement les littéraux `#FF6600`, `#e85c00`,
`#ff8533`, `#fff4ec`, `#0a0a0a` dans les composants existants.

Texte secondaire : `text-gray-600` (paragraphes), `text-gray-500` (labels), `text-gray-400`.

## 3. Typographie

- **Corps** : Inter / Jost variable → token `--font-sans` (classe par défaut `font-sans`).
  Tailles courantes : `text-lg`/`text-xl` pour les paragraphes d'intro, `text-sm` pour les
  textes secondaires, `leading-relaxed`.
- **Titres** : token `--font-heading` (Futura → Jost → fallback), classe **`font-heading`**,
  appliquée par défaut aux `h1..h6`. **Manrope** disponible aussi.
  - Graisses **fines** : `font-extralight` / `font-light` (les gros titres sont fins, pas gras).
  - **`tracking-tight`** voire `tracking-[-0.03em]` / `tracking-[-0.04em]` sur les très grands titres.
  - `leading-[0.95]` à `leading-[1.05]` pour les gros titres.
  - Échelles : H1 hero `text-[2.5rem] md:text-[4rem] lg:text-[4.5rem]` ; H2 de section
    `text-3xl md:text-4xl lg:text-5xl` ; H3 de carte `text-xl`/`text-2xl`.
- **Eyebrow / sur-titre** : `text-[#FF6600] font-semibold text-xs tracking-[0.2em] uppercase`.
- Accent typographique : pour mettre en valeur un fragment de titre, utiliser
  **`font-heading italic`** (PAS de police serif) éventuellement en `text-[#FF6600]`.

## 4. Layout & espacement

- Wrapper standard : `<Container>` ou `mx-auto w-full max-w-[var(--container)] px-6 sm:px-8`.
  **Cap tout contenu à 1440px.**
- Rythme vertical des sections : `py-24 md:py-32 lg:py-40`.
- Grilles : `grid` Tailwind, gaps `gap-4` (cartes) à `gap-12 lg:gap-20` (bandes header).
  Colonnes asymétriques fréquentes (`lg:grid-cols-12` + `col-span-7` / `col-span-5`).

## 5. Composants & motifs

### Boutons / CTA
- **Primaire (plein)** : `bg-[#FF6600] hover:bg-[#e85c00] text-white rounded-full
  px-8 py-4 (ou px-10 py-5) font-semibold inline-flex items-center gap-2/3`,
  avec flèche SVG qui glisse au survol (`group-hover:translate-x-1`).
  Ombre douce possible : `shadow-xl shadow-orange-900/10`.
- **Secondaire (contour pointillé)** : `bg-transparent text-[#FF6600] rounded-full
  border border-dashed border-[#FF6600] hover:bg-[#FF6600]/10 px-8 py-4 font-semibold`.
- **Bouton sur photo** : cercle `h-9 w-9 rounded-full border border-white/50 bg-white/10
  text-white backdrop-blur-sm hover:bg-white/25 hover:scale-110`.

### Cartes
- Carte claire : `rounded-2xl border border-gray-100 bg-white p-8` avec ombre teintée orange
  très douce `shadow-[0_12px_32px_-16px_rgba(255,102,0,0.18)]`.
- Survol carte : `transition-all duration-300 hover:-translate-y-1 hover:border-[#ff8533]/60
  hover:shadow-[0_22px_50px_-16px_rgba(255,102,0,0.35)]`.
- Image / portrait : `rounded-lg overflow-hidden`, ratio `aspect-[3/4]`, `object-cover`,
  voile dégradé `bg-gradient-to-t from-black/75 via-black/15 to-transparent` pour le texte.
- Tuile CTA orange : `rounded-lg bg-[#FF6600] text-white p-6/7`, halo blanc flou décoratif
  (`bg-white/10 blur-3xl`), bouton blanc interne `bg-white text-[#FF6600] rounded-full`.

### Chips d'icônes
- Conteneur : `flex h-14 w-14 items-center justify-center rounded-xl bg-[#fff4ec] text-[#FF6600]`.
- Icônes : **SVG inline** (stroke `currentColor`, `strokeWidth` 1.5–2, `strokeLinecap/Linejoin round`),
  pas de librairie d'icônes externe. Tailles `w-4 h-4` à `w-7 h-7`.

### Chiffres-clés (stats)
- Valeur : `font-heading font-light text-3xl md:text-4xl text-[#0a0a0a] tracking-tight`.
- Label : `text-gray-500 text-[10px] font-bold uppercase tracking-widest`.

### Bandeau logos partenaires
- Label : `text-gray-400/500 text-[10px]/xs font-semibold uppercase tracking-[0.15em]`.
- Logos en wordmarks `font-heading` + petit pictogramme SVG, en niveaux de gris / opacité
  réduite (`opacity-60 grayscale`), alignés sur une ligne, espacés (`gap-x-12/16`).

## 6. Animations & transitions

- `transition-all duration-300` par défaut ; fondus `duration-700 ease-in-out`.
- Micro-interactions : `hover:-translate-y-1`, `hover:scale-110`, flèches `group-hover:translate-x-1`.
- Respecter `prefers-reduced-motion`.

## 7. Contraintes techniques

- **Astro 6 + React (islands) + TypeScript + Tailwind CSS v4.**
- Composants livrables en **React `.tsx`** (utilisables comme îlots via `client:*`) ou markup `.astro`.
- **Aucune dépendance externe** (pas de lib d'icônes/UI) : icônes en **SVG inline**.
- Claude gère la logique (état, data Sanity via `sanity:client`, types, handlers) ;
  le design ne produit que le markup/style.
