import Eyebrow from "./Eyebrow";
import { FRANCHISE_AVATARS } from "../lib/franchises";

type Props = {
  eyebrow?: string;
  titlePart1?: string;
  titleHighlight?: string;
  titlePart2?: string;
  intro?: string;
  imagePath?: string;
  /* Témoignage (en anglais) superposé sur la tuile image dominante (gauche). */
  testimonialQuote?: string;
  testimonialAuthor?: string;
  testimonialRole?: string;
  testimonialAvatars?: string[];
  tallImagePath?: string;
  /* Texte superposé sur la tuile image verticale (droite). */
  tallTitle?: string;
  tallDescription?: string;
  networkTitle?: string;
  networkDescription?: string;
  /* Têtes de franchisés (photos rondes de profil) défilant en marquee plein-largeur
     en bas de la tuile « réseau ». */
  franchiseeAvatars?: string[];
  easyGroupTitle?: string;
  /* Texte de l'infobulle du « i » informationnel à côté du titre. */
  easyGroupInfo?: string;
  easyGroupDescription?: string;
  /* Suffixes des marques sœurs « easy » affichées en grille de logos (wordmarks). */
  easyBrands?: string[];
  /* Tuile « acteur engagé » (éco-responsable / RSE) — bas de la colonne droite. */
  engagementTitle?: string;
  engagementDescription?: string;
};

/* Pastille numérotée (01–04) — badge « outline » : contour fin + chiffre zéro-paddé.
   Posée en coin de tuile. `variant` : "light" (blanc, sur fond foncé/orange) ou
   "orange" (sur fond clair). */
function StepBadge({
  n,
  variant = "light",
  className = "",
}: {
  n: number;
  variant?: "light" | "orange";
  className?: string;
}) {
  const styles =
    variant === "orange"
      ? "border-[#FF6600]/45 text-[#FF6600]"
      : "border-white/45 text-white";
  return (
    <span
      aria-hidden="true"
      className={`inline-flex h-10 w-10 items-center justify-center rounded-2xl border font-heading text-[13px] font-bold tracking-wide ${styles} ${className}`}
    >
      {String(n).padStart(2, "0")}
    </span>
  );
}

/* Rend un titre en mettant le(s) fragment(s) *entourés d'astérisques* en écriture
   secondaire de marque (Cooper Black → classe `font-cooper`). Ex. « groupe *easy* ». */
function renderBrandTitle(text: string, highlightClass = "font-cooper") {
  return text.split(/\*(.*?)\*/g).map((part, i) =>
    i % 2 === 1 ? (
      <span key={i} className={highlightClass}>
        {part}
      </span>
    ) : (
      part
    ),
  );
}

/* Ombre commune des tuiles — deux couches grises neutres : contact net + diffusion
   large. Se renforce légèrement au survol. (La transition est gérée par tuile pour
   ne pas entrer en conflit avec un `transition-all` existant.) */
const TILE_SHADOW =
  "shadow-[0_2px_8px_-3px_rgba(10,10,10,0.10),0_22px_48px_-18px_rgba(10,10,10,0.14)] hover:shadow-[0_4px_12px_-3px_rgba(10,10,10,0.14),0_32px_64px_-20px_rgba(10,10,10,0.20)]";

/* Section « Qui sommes-nous » en bento — fond blanc, conteneurisée (1440px).
   Image dominante de la easy family (gauche) + tuile réseau franchise + tuile
   groupe easyJet + bande de chiffres-clés. Section éditoriale statique :
   props optionnelles (valeurs par défaut FR), branchables à Sanity plus tard. */
export default function AboutBento({
  eyebrow = "Qui sommes-nous",
  titlePart1 = "easyVirtual.tours, le ",
  titleHighlight = "leader français",
  titlePart2 = " de la visite virtuelle",
  intro = "Derrière chaque visite virtuelle, quatre forces réunies : l'appui d'un grand groupe, un réseau d'agences de proximité partout en France, la technologie de capture 3D la plus avancée du marché, et un engagement éco-responsable assumé.",
  imagePath = "/easyfamily.png",
  testimonialQuote = "Nous avons rejoint le groupe *easy* en 2023 avec une conviction : rendre, nous aussi, une technologie de pointe accessible au plus grand nombre comme Stelios l'a fait avec l'aviation et easyJet avant nous.",
  testimonialAuthor = "Clément Carrère & Léo Bouyssou",
  testimonialRole = "Cofondateurs d'easyVirtual.tours",
  // Portraits placeholder — à remplacer par les vrais portraits des cofondateurs (/public).
  testimonialAvatars = ["https://i.pravatar.cc/96?img=15", "https://i.pravatar.cc/96?img=33"],
  tallImagePath = "/matterportpro3.png",
  tallTitle = "Nous distribuons la technologie Matterport",
  tallDescription =
    "Matterport, c'est la pointe de la technologie de capture 3D : un jumeau numérique d'un réalisme et d'une précision inégalés, devenu la référence mondiale de la visite virtuelle.",
  networkTitle = "Nous avons +30 agences dans toute la France",
  networkDescription = "easyvirtual.tours est le premier réseau de franchise français entièrement dédié à la visite virtuelle 360°. Des franchisés locaux partout en France, un savoir-faire commun, une qualité homogène.",
  // Portraits réels des franchisés (public/franchises/, voir src/lib/franchises.ts).
  franchiseeAvatars = FRANCHISE_AVATARS,
  easyGroupTitle = "Nous sommes une marque du groupe *easy*",
  easyGroupInfo = "easy (easyGroup) est l'écosystème de marques fondé par Sir Stelios Haji-Ioannou — easyJet, easyHotel, easyGym, easyCar… — réunies par une même promesse : rendre le premium simple et accessible à tous.",
  easyGroupDescription = "Non, nous ne sommes pas des imposteurs ! Nous faisons bien partie de la easy family, l'écosystème de marques fondé par Sir Stelios Haji-Ioannou en 1998.",
  easyBrands = ["Jet", "Gym", "Voyage", "Pet", "Hotel", "Car"],
  engagementTitle = "Un acteur engagé pour la planète",
  engagementDescription =
    "Chaque visite virtuelle, ce sont des déplacements en moins. Le jumeau numérique permet de tout visiter à distance : moins de trajets, moins de CO₂, sans rien sacrifier à la qualité de la visite.",
}: Props) {
  // Piste du marquee : on répète la liste pour remplir la largeur du bloc (au moins ~14
  // vignettes), puis le rendu la duplique (translateX -50%) pour une boucle sans couture.
  const MIN_TILES = 14;
  const reps = Math.max(1, Math.ceil(MIN_TILES / Math.max(franchiseeAvatars.length, 1)));
  const marqueeAvatars = Array.from({ length: reps }, () => franchiseeAvatars).flat();

  return (
    <section id="a-propos" className="overflow-hidden bg-white pt-10 md:pt-14 lg:pt-16 pb-16 md:pb-24 lg:pb-32">
      <div className="mx-auto w-full max-w-[var(--container)] px-6 sm:px-8">

        {/* EN-TÊTE DE SECTION */}
        <div className="mb-12 md:mb-20 text-left">
          <Eyebrow>{eyebrow}</Eyebrow>

          <h2 className="mt-4 max-w-7xl font-heading text-3xl font-bold leading-[1.05] tracking-tight text-[#0a0a0a] md:text-4xl lg:text-5xl">
            {titlePart1}
            <span className="font-cooper text-[#FF6600]">{titleHighlight}</span>
            {titlePart2}
          </h2>

          {intro && (
            <p className="mt-8 max-w-2xl text-lg leading-relaxed text-gray-600">{intro}</p>
          )}
        </div>

        {/* GRILLE BENTO — 6 tuiles CARRÉES en damier 3 colonnes × 2 rangées
           (`lg:aspect-square` → colonnes égales donc carrés identiques). Le carré est
           dimensionné pour le contenu texte ; la photo Matterport se recadre (object-cover).
           Ordre : photo · ① · ② / ③ · ④ · photo. Bande témoignage pleine largeur juste après. */}
        <div className="grid grid-cols-1 gap-4 md:gap-6 lg:grid-cols-3">

          {/* CASE PHOTO A (placeholder gris — coin haut-gauche, à remplacer par une image) */}
          <div className="flex min-h-[240px] flex-col items-center justify-center gap-3 rounded-3xl border border-dashed border-gray-300 bg-zinc-100 p-8 text-gray-400 lg:min-h-0 min-[1440px]:aspect-square">
            <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round" className="h-9 w-9" aria-hidden="true">
              <rect x="3" y="3" width="18" height="18" rx="2" ry="2" />
              <circle cx="9" cy="9" r="2" />
              <path d="m21 15-3.086-3.086a2 2 0 0 0-2.828 0L6 21" />
            </svg>
            <span className="text-xs font-semibold uppercase tracking-wider">Photo à venir</span>
          </div>

          {/* TUILE 2 — GROUPE EASYJET */}
          {/* Dégradé orange très léger : profond (brand-dark) en bas à gauche → clair
             (brand-light) en haut à droite. `bg-[#FF6600]` reste en fallback. */}
          <div
            style={{
              backgroundImage:
                "linear-gradient(40deg, #e85c00 0%, #FF6600 52%, #ff8a3d 100%)",
            }}
            className={`relative z-20 rounded-2xl bg-[#FF6600] p-8 text-white transition-all duration-300 hover:-translate-y-1 motion-reduce:transition-none ${TILE_SHADOW} min-[1440px]:aspect-square`}
          >
            {/* Décorations clippées au rayon de la tuile. Isolées dans cette couche
               `overflow-hidden` pour que la tuile elle-même NE clippe PAS l'infobulle
               du « i » (sinon elle est rognée au bord de la tuile). */}
            <div className="pointer-events-none absolute inset-0 overflow-hidden rounded-2xl" aria-hidden="true">
              <div className="absolute -right-12 -top-12 h-40 w-40 rounded-full bg-white/10 blur-3xl" />

              {/* Cercles concentriques sur la droite (centrés verticalement) —
                 même motif que le CTA « Passez à la visite virtuelle ». */}
              <div className="absolute right-[-2rem] top-1/2 -translate-y-1/2">
                {[380, 290, 210, 140].map((size) => (
                  <div
                    key={size}
                    className="absolute rounded-full border border-white/20"
                    style={{ width: size, height: size, left: -size / 2, top: -size / 2 }}
                  />
                ))}
              </div>
            </div>
            {/* Sparkle décoratif (haut droit) */}
            <svg viewBox="0 0 24 24" fill="currentColor" aria-hidden="true" className="absolute right-6 top-6 z-10 h-5 w-5 text-white/80">
              <path d="M12 2 14 10 22 12 14 14 12 22 10 14 2 12 10 10Z" />
            </svg>

            <div className="relative z-10 flex h-full flex-col">
              <StepBadge n={1} variant="light" className="mb-5" />

              {/* Titre + « i » informationnel collé à « easy » (groupe nowrap → ils
                 passent ensemble à la ligne si besoin, l'icône n'est jamais orpheline). */}
              <h3 className="mb-4 font-heading text-2xl">
                {easyGroupTitle.split(/\*(.*?)\*/).map((part, i) =>
                  i === 1 ? (
                    <span key={i} className="whitespace-nowrap">
                      <span className="font-cooper">{part}</span>
                      <span className="group/info relative ml-2 inline-flex translate-y-0.5 align-middle">
                        <button
                          type="button"
                          aria-label="Qu'est-ce que le groupe easy ?"
                          className="inline-flex rounded-full text-white/75 transition-colors duration-200 hover:text-white focus:outline-none focus-visible:ring-2 focus-visible:ring-white/70"
                        >
                          <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" className="h-[18px] w-[18px]" aria-hidden="true">
                            <circle cx="12" cy="12" r="10" />
                            <line x1="12" y1="16" x2="12" y2="12" />
                            <line x1="12" y1="8" x2="12.01" y2="8" />
                          </svg>
                        </button>

                        {/* Infobulle — centrée sur le « i », largeur bornée à la fenêtre
                           (jamais hors écran), n'est plus rognée (la tuile ne clippe plus). */}
                        <span
                          role="tooltip"
                          className="pointer-events-none absolute left-1/2 top-full z-40 mt-3 w-64 max-w-[calc(100vw-2.5rem)] whitespace-normal rounded-xl bg-white p-3.5 text-left text-xs font-normal leading-relaxed text-[#0a0a0a] opacity-0 shadow-[0_18px_40px_-12px_rgba(10,10,10,0.35)] transition-[opacity,transform] duration-200 [transform:translate(-50%,4px)] group-hover/info:opacity-100 group-hover/info:[transform:translate(-50%,0)] group-focus-within/info:opacity-100 group-focus-within/info:[transform:translate(-50%,0)]"
                        >
                          {/* Flèche pointant vers le « i » */}
                          <span className="absolute -top-1.5 left-1/2 h-3 w-3 -translate-x-1/2 rotate-45 rounded-[3px] bg-white" aria-hidden="true" />
                          {easyGroupInfo}
                        </span>
                      </span>
                    </span>
                  ) : (
                    part
                  ),
                )}
              </h3>
              <p className="mb-6 leading-relaxed text-white/85">{easyGroupDescription}</p>

              {/* Grille des marques sœurs de la easy family (wordmarks `font-cooper`) */}
              <div className="mb-4">
                <p className="mb-3 text-[10px] font-bold uppercase tracking-[0.2em] text-white/60">
                  Les autres marques du groupe
                </p>
                <div className="grid grid-cols-3 gap-2">
                  {easyBrands.map((suffix) => (
                    <div
                      key={suffix}
                      className="group/brand flex items-center justify-center rounded-xl border border-white/10 bg-white/5 py-2.5 backdrop-blur-sm transition-all duration-300 hover:border-white/25 hover:bg-white/15"
                    >
                      <span className="pointer-events-none font-cooper text-[13px] tracking-tight text-white transition-transform duration-300 group-hover/brand:scale-105">
                        easy<span className="opacity-80">{suffix}</span>
                      </span>
                    </div>
                  ))}
                </div>
              </div>

              {/* Lien « En savoir plus » (texte, sur tuile orange) */}
              <a
                href="#a-propos"
                className="group inline-flex w-fit items-center gap-1.5 font-semibold text-white underline underline-offset-4 decoration-white/60 hover:decoration-white"
              >
                En savoir plus
                <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.5" strokeLinecap="round" strokeLinejoin="round" className="h-4 w-4 transition-transform duration-300 group-hover:translate-x-1 motion-reduce:transition-none" aria-hidden="true">
                  <line x1="5" y1="12" x2="19" y2="12" />
                  <polyline points="12 5 19 12 12 19" />
                </svg>
              </a>
            </div>
          </div>

          {/* TUILE 3 — RÉSEAU FRANCHISE */}
          <div className={`relative flex flex-col overflow-hidden rounded-2xl bg-white transition-shadow duration-300 ${TILE_SHADOW} min-[1440px]:aspect-square`}>
            {/* Contenu paddé */}
            <div className="flex flex-1 flex-col p-8">
              <StepBadge n={2} variant="orange" className="mb-5" />
              <h3 className="font-heading text-2xl text-[#0a0a0a]">{networkTitle}</h3>
              <p className="mt-3 leading-relaxed text-gray-600">{networkDescription}</p>

              {/* CTA secondaire — contour orange, se remplit au survol */}
              <a
                href="#franchises"
                className="group mt-6 inline-flex w-fit items-center gap-2 rounded-full border border-[#FF6600] px-6 py-3.5 text-sm font-semibold text-[#FF6600] transition-all duration-300 hover:bg-[#FF6600] hover:text-white active:scale-95 motion-reduce:transition-none"
              >
                Rejoindre le réseau de franchise
                <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.5" strokeLinecap="round" strokeLinejoin="round" className="h-4 w-4 shrink-0 transition-transform duration-300 group-hover:translate-x-1 motion-reduce:transition-none" aria-hidden="true">
                  <line x1="5" y1="12" x2="19" y2="12" />
                  <polyline points="12 5 19 12 12 19" />
                </svg>
              </a>
            </div>

            {/* MARQUEE pleine largeur — têtes de franchisés (photos rondes) qui défilent */}
            <div className="relative overflow-hidden border-t border-gray-200/70 py-4">
              {/* Fondus latéraux (entrée/sortie douce) */}
              <div className="pointer-events-none absolute inset-y-0 left-0 z-10 w-14 bg-gradient-to-r from-white to-transparent" aria-hidden="true" />
              <div className="pointer-events-none absolute inset-y-0 right-0 z-10 w-14 bg-gradient-to-l from-white to-transparent" aria-hidden="true" />
              <ul className="flex w-max animate-[bento-marquee_28s_linear_infinite] motion-reduce:animate-none">
                {[...marqueeAvatars, ...marqueeAvatars].map((src, i) => (
                  <li key={i} className="mx-1.5 shrink-0">
                    <img
                      src={src}
                      alt=""
                      loading="lazy"
                      className="h-12 w-12 rounded-full object-cover ring-2 ring-white"
                    />
                  </li>
                ))}
              </ul>
            </div>
          </div>

          {/* TUILE 4 — IMAGE MATTERPORT (③) — la photo se recadre dans le carré (object-cover).
             Image en `absolute inset-0` pour qu'elle ne dicte pas la hauteur de la tuile. */}
          <div className={`group relative min-h-[420px] overflow-hidden rounded-3xl bg-zinc-100 transition-shadow duration-300 ${TILE_SHADOW} min-[1440px]:aspect-square min-[1440px]:min-h-0`}>
            <img
              src={tallImagePath}
              alt={`easyvirtual.tours — ${tallTitle}`}
              className="absolute inset-0 h-full w-full object-cover transition-transform duration-700 ease-in-out motion-safe:group-hover:scale-105"
            />
            <div className="absolute inset-0 bg-gradient-to-t from-black via-black/45 to-transparent" />
            <StepBadge n={3} variant="light" className="absolute left-6 top-6 z-10" />
            <div className="absolute bottom-0 left-0 p-6 text-white md:p-8">
              {/* Logo Matterport — lockup inline (cube + wordmark). Remplacer par le
                 SVG officiel si une licence d'usage de la marque est fournie. */}
              <div className="mb-3 flex items-center gap-2 text-white">
                <svg viewBox="0 0 20 20" className="h-6 w-auto fill-current" aria-hidden="true">
                  <path d="M10 0L18.66 5V15L10 20L1.34 15V5L10 0Z" fillOpacity="0.2" />
                  <path d="M10 0L1.34 5L10 10L18.66 5L10 0Z" />
                  <path d="M1.34 5V15L10 20V10L1.34 5Z" fillOpacity="0.7" />
                  <path d="M18.66 5V15L10 20V10L18.66 5Z" fillOpacity="0.5" />
                </svg>
                <span className="font-heading text-lg font-medium tracking-tight">matterport</span>
              </div>
              <p className="font-heading text-2xl leading-snug tracking-tight">
                {tallTitle}
              </p>

              {tallDescription && (
                <p className="mt-2 max-w-xs text-sm leading-relaxed text-white/80">
                  {tallDescription}
                </p>
              )}

              {/* Lien « En savoir plus » (texte, lisible sur la photo) */}
              <a
                href="#a-propos"
                className="group mt-3 inline-flex w-fit items-center gap-1.5 text-sm font-semibold text-white underline underline-offset-4 decoration-white/60 hover:decoration-white"
              >
                En savoir plus
                <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.5" strokeLinecap="round" strokeLinejoin="round" className="h-4 w-4 transition-transform duration-300 group-hover:translate-x-1 motion-reduce:transition-none" aria-hidden="true">
                  <line x1="5" y1="12" x2="19" y2="12" />
                  <polyline points="12 5 19 12 12 19" />
                </svg>
              </a>
            </div>
          </div>

          {/* TUILE 5 — ACTEUR ENGAGÉ (④, éco-responsable / RSE) */}
          <div className={`flex flex-col rounded-2xl bg-[#fdfaf6] p-8 transition-shadow duration-300 md:p-10 ${TILE_SHADOW} min-[1440px]:aspect-square`}>
            <StepBadge n={4} variant="orange" className="mb-6" />

            {/* Chip d'icône éco-responsable (feuille) */}
            <div className="mb-5 flex h-14 w-14 items-center justify-center rounded-xl bg-[#fff4ec] text-[#FF6600]">
              <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round" className="h-7 w-7" aria-hidden="true">
                <path d="M11 20A7 7 0 0 1 9.8 6.1C15.5 5 17 4.48 19 2c1 2 2 3.5 1 9.2a7 7 0 0 1-9 8.8Zm0 0v-2" />
                <path d="M11 13c0-3 2-3 2-3" />
              </svg>
            </div>

            <h3 className="font-heading text-2xl text-[#0a0a0a]">{engagementTitle}</h3>
            <p className="mt-4 leading-relaxed text-gray-600">{engagementDescription}</p>

            {/* Lien « Notre engagement » (texte, sur fond clair) */}
            <a
              href="#a-propos"
              className="group mt-auto inline-flex w-fit items-center gap-1.5 pt-4 font-semibold text-[#FF6600] underline underline-offset-4 decoration-[#FF6600]/40 hover:decoration-[#FF6600]"
            >
              Notre engagement
              <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.5" strokeLinecap="round" strokeLinejoin="round" className="h-4 w-4 transition-transform duration-300 group-hover:translate-x-1 motion-reduce:transition-none" aria-hidden="true">
                <line x1="5" y1="12" x2="19" y2="12" />
                <polyline points="12 5 19 12 12 19" />
              </svg>
            </a>
          </div>

          {/* CASE PHOTO B (placeholder gris — coin bas-droite, à remplacer par une image) */}
          <div className="flex min-h-[240px] flex-col items-center justify-center gap-3 rounded-3xl border border-dashed border-gray-300 bg-zinc-100 p-8 text-gray-400 lg:min-h-0 min-[1440px]:aspect-square">
            <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round" className="h-9 w-9" aria-hidden="true">
              <rect x="3" y="3" width="18" height="18" rx="2" ry="2" />
              <circle cx="9" cy="9" r="2" />
              <path d="m21 15-3.086-3.086a2 2 0 0 0-2.828 0L6 21" />
            </svg>
            <span className="text-xs font-semibold uppercase tracking-wider">Photo à venir</span>
          </div>

        </div>

        {/* BANDE TÉMOIGNAGE — pleine largeur, photo d'équipe en arrière-plan (paysage).
           Voile dégradé depuis la gauche pour garder le texte lisible. */}
        <div className={`group relative mt-4 min-h-[360px] overflow-hidden rounded-3xl bg-zinc-100 transition-shadow duration-300 md:mt-6 md:min-h-[440px] ${TILE_SHADOW}`}>
          <img
            src={imagePath}
            alt="L'équipe easyVirtual.tours"
            className="absolute inset-0 h-full w-full object-cover transition-transform duration-700 ease-in-out motion-safe:group-hover:scale-105"
          />
          {/* Dégradé noir depuis la gauche (lisibilité du témoignage) */}
          <div className="absolute inset-0 bg-gradient-to-r from-black via-black/70 to-transparent md:via-black/55" />

          {/* Témoignage des cofondateurs — calé à gauche, centré verticalement */}
          <figure className="absolute inset-0 flex flex-col justify-center p-8 text-white md:p-12 lg:p-16">
            {/* Guillemet décoratif */}
            <svg viewBox="0 0 32 32" fill="currentColor" className="mb-4 h-9 w-9 text-[#FF6600]" aria-hidden="true">
              <path d="M10 8C6.7 8 4 10.7 4 14s2.7 6 6 6c.34 0 .67-.03 1-.1-.5 2.3-2.4 4-4.7 4.1-.7.03-1.3.6-1.3 1.3 0 .73.6 1.32 1.34 1.3C12.27 26.5 16 22.6 16 18v-4c0-3.3-2.7-6-6-6Zm12 0c-3.3 0-6 2.7-6 6s2.7 6 6 6c.34 0 .67-.03 1-.1-.5 2.3-2.4 4-4.7 4.1-.7.03-1.3.6-1.3 1.3 0 .73.6 1.32 1.34 1.3C24.27 26.5 28 22.6 28 18v-4c0-3.3-2.7-6-6-6Z" />
            </svg>

            <blockquote className="max-w-2xl font-heading text-2xl font-light leading-snug tracking-tight md:text-3xl lg:text-4xl">
              {renderBrandTitle(testimonialQuote, "font-cooper text-[#FF6600]")}
            </blockquote>

            <figcaption className="mt-6 flex items-center gap-3">
              {testimonialAvatars.length > 0 && (
                <div className="flex -space-x-3">
                  {testimonialAvatars.map((src) => (
                    <img
                      key={src}
                      src={src}
                      alt=""
                      loading="lazy"
                      className="h-11 w-11 shrink-0 rounded-full object-cover ring-2 ring-white/80"
                    />
                  ))}
                </div>
              )}
              <div>
                <p className="text-sm font-semibold tracking-tight">{testimonialAuthor}</p>
                <p className="text-xs text-white/70">{testimonialRole}</p>
              </div>
            </figcaption>
          </figure>
        </div>
      </div>
    </section>
  );
}
