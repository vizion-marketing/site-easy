# Design System — easyvirtual.tours

Système de design **canonique** du projet, extrait de l'identité déjà en place
(tokens `src/styles/global.css`, section Marque d'AGENTS.md, composants Navbar / Hero /
Franchises / **AboutBento**). À passer **intégralement** dans le paramètre `designSystem`
de tout appel au MCP Gemini Design. Ne pas résumer.

> **Référence cartes & tuiles : la section bento `AboutBento`**
> (`src/components/AboutBento.tsx`). C'est le motif **canonique** pour les cartes, tuiles,
> titres de section, dégradés et ombres. En cas de doute ou de conflit avec une description
> plus ancienne ci-dessous, **le bento fait foi** : ombres grises neutres à deux couches
> (pas teintées orange), **fond de section blanc**, tuiles crème `#fdfaf6` discrètes, tuile
> orange en dégradé diagonal, badges numérotés, CTA contour plein qui se remplit au survol,
> **en-tête de section aligné à gauche**.

---

## 1. Marque & principe

- **Fond blanc dominant.** Les sections de contenu sont sur fond blanc `#ffffff`.
  Les sections « hero » immersives peuvent être sur fond sombre (`bg-zinc-950`) avec image.
- **Crème chaud `#fdfaf6`** réservé aux **tuiles de contenu** (à peine plus chaud que le
  blanc, détaché par l'ombre grise neutre) — cf. `AboutBento`, qui est lui-même sur **fond
  de section blanc**. `#f7f2ec` (crème de section) reste un fond alternatif possible mais
  n'est plus utilisé par le bento.
- **Accent orange easyJet `#FF6600`** : CTA, eyebrows, chiffres-clés, icônes, liens,
  traits décoratifs, ainsi que des **aplats / cartes orange** mis en avant (encarts promo,
  tuiles, blocs de mise en valeur) — texte en blanc dessus.
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

**Crèmes & neutres chauds (bento)** — hors tokens, littéraux utilisés tels quels :
```
#f7f2ec   /* crème de section (fond alternatif — non utilisé par le bento) */
#fdfaf6   /* fond de tuile crème + bornes des fondus latéraux de marquee   */
#ff8a3d   /* stop clair du dégradé de la tuile orange (≈ brand-light)     */
#fff1e3   /* point clair du reflet `highlight-shine` sur les highlights   */
```

Texte secondaire : `text-gray-600` (paragraphes), `text-gray-500` (labels), `text-gray-400`.

## 3. Typographie

- **Corps** : Inter / Jost variable → token `--font-sans` (classe par défaut `font-sans`).
  Tailles courantes : `text-lg`/`text-xl` pour les paragraphes d'intro, `text-sm` pour les
  textes secondaires, `leading-relaxed`.
- **Titres** : token `--font-heading` (Futura → Jost → fallback), classe **`font-heading`**,
  appliquée par défaut aux `h1..h6`. **Manrope** disponible aussi.
  - Graisses : par défaut **fines** sur les titres immersifs (`font-extralight` / `font-light`).
    **Les titres de section éditoriale (bento) sont au contraire affirmés en `font-bold`**
    (cf. H2 d'`AboutBento`) — le contraste vient alors du fragment Cooper Black orange.
  - **`tracking-tight`** voire `tracking-[-0.03em]` / `tracking-[-0.04em]` sur les très grands titres.
  - `leading-[0.95]` à `leading-[1.05]` pour les gros titres.
  - Échelles : H1 hero `text-[2.5rem] md:text-[4rem] lg:text-[4.5rem]` ; **H2 de section
    `text-3xl md:text-4xl lg:text-5xl font-bold leading-[1.05] tracking-tight text-[#0a0a0a]`**
    (motif bento : `titre `+`<span class="font-cooper text-[#FF6600]">highlight</span>`+` suite`,
    **en-tête aligné à gauche** `text-left max-w-7xl`, intro dessous `mt-8 max-w-2xl text-lg
    text-gray-600`) ;
    H3 de carte / tuile `font-heading text-2xl` (couleur `text-[#0a0a0a]` sur clair, `text-white`
    sur fond orange/photo).
- **Eyebrow / sur-titre** : composant **`<Eyebrow>`** (`src/components/Eyebrow.tsx`) — une
  **seule icône** (sparkle orange) + texte **`text-xs font-bold text-[#FF6600]`**.
  Bold, petit, MÊME icône partout. **TOUJOURS une majuscule au début** (la capitale
  initiale est forcée par le composant, y compris pour les eyebrows saisis dans Sanity).
- **Accent typographique / highlights de titres** : **Cooper Black** (self-hostée, token
  `--font-cooper`, classe **`font-cooper`** ; voir `@font-face` dans `src/styles/global.css`),
  en `text-[#FF6600]`. C'est la police des fragments mis en valeur dans les titres
  (ex. le `*mot*` orange rendu par `renderHeading`). Le fichier licencié se dépose dans
  `public/fonts/cooper-black.woff2` (fallback serif tant qu'il est absent).

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
- **Secondaire (contour plein, se remplit au survol)** — variante canonique du bento :
  `inline-flex items-center gap-2 rounded-full border border-[#FF6600] px-6 py-3.5
  text-sm font-semibold text-[#FF6600] transition-all duration-300 hover:bg-[#FF6600]
  hover:text-white active:scale-95`, flèche SVG qui glisse (`group-hover:translate-x-1`).
- **Secondaire (contour pointillé)** : `bg-transparent text-[#FF6600] rounded-full
  border border-dashed border-[#FF6600] hover:bg-[#FF6600]/10 px-8 py-4 font-semibold`
  (variante plus discrète, hors bento).
- **Lien texte fléché** : `inline-flex items-center gap-1.5 font-semibold underline
  underline-offset-4` ; sur photo/orange `text-white decoration-white/60 hover:decoration-white`,
  sur fond clair `text-[#FF6600] decoration-[#FF6600]/40 hover:decoration-[#FF6600]` +
  flèche `group-hover:translate-x-1`.
- **Bouton sur photo** : cercle `h-9 w-9 rounded-full border border-white/50 bg-white/10
  text-white backdrop-blur-sm hover:bg-white/25 hover:scale-110`.

### Cartes & tuiles (motif canonique — bento `AboutBento`)

**Rayons** : tuiles images / cartes majeures `rounded-3xl` ; tuiles de contenu et CTA
`rounded-2xl`. Padding intérieur `p-8` (à `p-8 md:p-10` sur les tuiles texte).

**Ombre canonique des tuiles** — deux couches **grises neutres** (contact net + diffusion
large), qui se renforcent légèrement au survol (préférer `transition-shadow duration-300`
seul sur les tuiles qui n'animent pas leur `transform`) :
```
shadow-[0_2px_8px_-3px_rgba(10,10,10,0.10),0_22px_48px_-18px_rgba(10,10,10,0.14)]
hover:shadow-[0_4px_12px_-3px_rgba(10,10,10,0.14),0_32px_64px_-20px_rgba(10,10,10,0.20)]
```
> ⚠️ Remplace les anciennes ombres **teintées orange** des cartes : les tuiles utilisent
> désormais une ombre **grise neutre** (l'orange ne sert plus à l'ombre, seulement aux aplats).

- **Tuile image** : `group relative overflow-hidden rounded-3xl bg-zinc-100`, image en
  `h-full w-full object-cover` qui zoome au survol
  (`transition-transform duration-700 ease-in-out motion-safe:group-hover:scale-105`),
  voile texte `absolute inset-0 bg-gradient-to-t from-black via-black/55 to-transparent`
  (ou `via-black/45` quand la tuile est plus courte), contenu blanc en bas
  (`absolute inset-x-0 bottom-0 p-8 md:p-10 text-white`).
- **Tuile crème (contenu) — CARTE PAR DÉFAUT.** C'est **le** style de carte du projet :
  sur un **fond de section blanc**, toute carte/encart de contenu utilise par défaut ce motif,
  identique à la tuile « +30 agences partout en France » du bento (`AboutBento`, TUILE 3).
  Recette exacte : `bg-[#fdfaf6] rounded-2xl` + **ombre canonique des tuiles** (ci-dessus) +
  `transition-shadow duration-300` (l'ombre se renforce **seule** au survol, **pas** de
  `-translate-y` ni de changement de fond). Titre `font-heading text-2xl text-[#0a0a0a]`,
  paragraphe `text-gray-600 leading-relaxed`. Ne pas réinventer d'ombre plus légère ni de
  survol qui soulève la carte : on s'aligne sur ce motif.
- **Tuile orange (mise en avant)** : dégradé diagonal `bg-[#FF6600]` (fallback) +
  `style={{ backgroundImage: "linear-gradient(40deg, #e85c00 0%, #FF6600 52%, #ff8a3d 100%)" }}`,
  texte blanc (titres blancs, paragraphe `text-white/85`). Survol `hover:-translate-y-1`.
  Décor clippé au rayon dans une couche `overflow-hidden rounded-2xl` : halo blanc flou
  (`bg-white/10 blur-3xl`), cercles concentriques sur la droite
  (`absolute rounded-full border border-white/20`, tailles ~140/210/290/380px) + sparkle SVG.
- Survol global d'une carte qui se soulève : `transition-all duration-300 hover:-translate-y-1
  motion-reduce:transition-none`.

### Tuiles & badges du bento

- **Badge numéroté (étape 01–04)** — pastille « outline » posée en coin de tuile :
  `inline-flex h-10 w-10 items-center justify-center rounded-2xl border font-heading
  text-[13px] font-bold tracking-wide`, chiffre **zéro-paddé** (`01`, `02`…). Variantes :
  `border-white/45 text-white` (sur fond foncé / orange) ou `border-[#FF6600]/45 text-[#FF6600]`
  (sur fond clair).
- **Eyebrow numéroté (chip)** — sur tuile image : `inline-flex items-center gap-2.5 rounded-full
  border border-[#FF6600]/60 py-1.5 pl-2.5 pr-3.5 text-[10px] font-bold uppercase
  tracking-[0.18em]` → `<span orange>01</span>` + séparateur `h-3 w-px bg-white/30` +
  `<span text-white/90>libellé</span>`.
- **Citation / témoignage** : guillemet décoratif SVG `text-[#FF6600]`, citation
  `font-heading text-2xl md:text-3xl font-light leading-snug tracking-tight`, mots-clés en
  `font-cooper text-[#FF6600]`, signature avec avatar rond `ring-2 ring-white/80`.
- **Infobulle (« i »)** : bouton SVG cercle-info `text-white/75 hover:text-white`, bulle
  `rounded-xl bg-white p-3.5 text-xs text-[#0a0a0a] shadow-[0_18px_40px_-12px_rgba(10,10,10,0.35)]`
  avec petite flèche carrée pivotée, révélée en `group-hover/group-focus-within` (opacité +
  léger translate). Toujours bornée à la fenêtre (`max-w-[calc(100vw-2.5rem)]`).
- **Marquee d'avatars** (réseau) : piste `flex w-max animate-[bento-marquee_28s_linear_infinite]
  motion-reduce:animate-none` (liste dupliquée ×2 pour la boucle), avatars
  `h-12 w-12 rounded-full object-cover ring-2 ring-white`, fondus latéraux
  `bg-gradient-to-r from-[#fdfaf6] to-transparent` (et symétrique à droite).

### Grille bento
- Conteneur 1440px, `grid grid-cols-1 gap-4 md:gap-6 lg:grid-cols-12`. Tuiles placées en
  `lg:col-start-* lg:col-span-* lg:row-start-* lg:row-span-*` (mix image dominante haute +
  tuiles empilées + image verticale pleine hauteur). En-tête de section centré au-dessus.

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
- **Zoom image au survol de tuile** : `transition-transform duration-700 ease-in-out
  motion-safe:group-hover:scale-105`.
- **Marquee bento** : keyframe `bento-marquee` (`translateX(0 → -50%)`, `src/styles/global.css`),
  piste dupliquée ×2 → boucle sans couture ; aussi `marquee` (logos) et `highlight-shine`
  (reflet sur les highlights Cooper) déjà définis.
- Respecter `prefers-reduced-motion` (`motion-safe:` / `motion-reduce:` / `motion-reduce:animate-none`).

## 7. Contraintes techniques

- **Astro 6 + React (islands) + TypeScript + Tailwind CSS v4.**
- Composants livrables en **React `.tsx`** (utilisables comme îlots via `client:*`) ou markup `.astro`.
- **Aucune dépendance externe** (pas de lib d'icônes/UI) : icônes en **SVG inline**.
- Claude gère la logique (état, data Sanity via `sanity:client`, types, handlers) ;
  le design ne produit que le markup/style.
