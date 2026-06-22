import Eyebrow from "./Eyebrow";

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
  testimonialAvatar?: string;
  tallImagePath?: string;
  /* Texte superposé sur la tuile image verticale (droite). */
  tallEyebrow?: string;
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
  titlePart1 = "Le premier ",
  titleHighlight = "réseau de franchise",
  titlePart2 = " dédié à la visite virtuelle en France",
  intro = "Nous combinons la force d'un grand groupe et l'agilité d'un réseau local pour offrir des visites virtuelles 360° d'une qualité homogène, partout en France.",
  imagePath = "/easyfamily.png",
  testimonialQuote = "We built the easy family on one idea: make *premium* accessible.",
  testimonialAuthor = "Sir Stelios Haji-Ioannou",
  testimonialRole = "Founder of easyJet & the easy family",
  testimonialAvatar = "/stelios.png",
  tallImagePath = "/matterportpro3.png",
  tallEyebrow = "une technologie de pointe",
  tallTitle = "Partenaire Matterport",
  tallDescription =
    "Nous capturons vos espaces avec Matterport, la technologie de jumeau numérique 3D leader du marché — pour des visites virtuelles d'une précision et d'un réalisme inégalés.",
  networkTitle = "+30 agences partout en France",
  networkDescription = "easyvirtual.tours est le premier réseau de franchise français entièrement dédié à la visite virtuelle 360°. Des franchisés locaux partout en France, un savoir-faire commun, une qualité homogène.",
  // Photos placeholder — à remplacer par les vrais portraits de franchisés (/public).
  franchiseeAvatars = [
    "https://i.pravatar.cc/96?img=12",
    "https://i.pravatar.cc/96?img=32",
    "https://i.pravatar.cc/96?img=5",
    "https://i.pravatar.cc/96?img=47",
    "https://i.pravatar.cc/96?img=68",
  ],
  easyGroupTitle = "Une marque du groupe *easy*",
  easyGroupInfo = "easy (easyGroup) est l'écosystème de marques fondé par Sir Stelios Haji-Ioannou — easyJet, easyHotel, easyGym, easyCar… — réunies par une même promesse : rendre le premium simple et accessible à tous.",
  easyGroupDescription = "Nous faisons partie de la easy family, l'écosystème de marques fondé par easyJet (easyHotel, easyGym, easyCar…). La même promesse : rendre le premium simple et accessible à tous.",
}: Props) {
  // Piste du marquee : on triple la liste pour remplir la largeur du bloc, puis le
  // rendu la duplique (translateX -50%) pour une boucle continue sans couture.
  const marqueeAvatars = [
    ...franchiseeAvatars,
    ...franchiseeAvatars,
    ...franchiseeAvatars,
  ];

  return (
    <section id="a-propos" className="overflow-hidden bg-white pt-10 md:pt-14 lg:pt-16 pb-24 md:pb-32 lg:pb-40">
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

        {/* GRILLE BENTO */}
        <div className="grid grid-cols-1 gap-4 md:gap-6 lg:grid-cols-12">

          {/* TUILE 1 — IMAGE DOMINANTE (easy family) */}
          <div className={`group relative min-h-[420px] overflow-hidden rounded-3xl bg-zinc-100 transition-shadow duration-300 ${TILE_SHADOW} lg:col-start-1 lg:col-span-5 lg:row-start-1 lg:row-span-2`}>
            <img
              src={imagePath}
              alt="La easy family — l'écosystème de marques du groupe easyJet"
              className="h-full w-full object-cover transition-transform duration-700 ease-in-out motion-safe:group-hover:scale-105"
            />
            {/* Dégradé noir → transparent, du bas vers le haut */}
            <div className="absolute inset-0 bg-gradient-to-t from-black via-black/55 to-transparent" />

            {/* Témoignage de Stelios (anglais) */}
            <figure className="absolute inset-x-0 bottom-0 p-8 text-white md:p-10">
              {/* Eyebrow numéroté « 01 · THE EASY FAMILY » */}
              <span className="mb-5 inline-flex items-center gap-2.5 rounded-full border border-[#FF6600]/60 py-1.5 pl-2.5 pr-3.5 text-[10px] font-bold uppercase tracking-[0.18em]">
                <span className="text-[#FF6600]">01</span>
                <span className="h-3 w-px bg-white/30" aria-hidden="true" />
                <span className="text-white/90">the easy family</span>
              </span>

              {/* Guillemet décoratif */}
              <svg viewBox="0 0 32 32" fill="currentColor" className="mb-3 h-8 w-8 text-[#FF6600]" aria-hidden="true">
                <path d="M10 8C6.7 8 4 10.7 4 14s2.7 6 6 6c.34 0 .67-.03 1-.1-.5 2.3-2.4 4-4.7 4.1-.7.03-1.3.6-1.3 1.3 0 .73.6 1.32 1.34 1.3C12.27 26.5 16 22.6 16 18v-4c0-3.3-2.7-6-6-6Zm12 0c-3.3 0-6 2.7-6 6s2.7 6 6 6c.34 0 .67-.03 1-.1-.5 2.3-2.4 4-4.7 4.1-.7.03-1.3.6-1.3 1.3 0 .73.6 1.32 1.34 1.3C24.27 26.5 28 22.6 28 18v-4c0-3.3-2.7-6-6-6Z" />
              </svg>

              <blockquote className="font-heading text-2xl font-light leading-snug tracking-tight md:text-3xl">
                {renderBrandTitle(testimonialQuote, "font-cooper text-[#FF6600]")}
              </blockquote>

              <figcaption className="mt-5 flex items-center gap-3">
                {testimonialAvatar && (
                  <img
                    src={testimonialAvatar}
                    alt={testimonialAuthor}
                    loading="lazy"
                    className="h-11 w-11 shrink-0 rounded-full object-cover ring-2 ring-white/80"
                  />
                )}
                <div>
                  <p className="text-sm font-semibold tracking-tight">{testimonialAuthor}</p>
                  <p className="text-xs text-white/70">{testimonialRole}</p>
                </div>
              </figcaption>
            </figure>
          </div>

          {/* TUILE 2 — GROUPE EASYJET */}
          {/* Dégradé orange très léger : profond (brand-dark) en bas à gauche → clair
             (brand-light) en haut à droite. `bg-[#FF6600]` reste en fallback. */}
          <div
            style={{
              backgroundImage:
                "linear-gradient(40deg, #e85c00 0%, #FF6600 52%, #ff8a3d 100%)",
            }}
            className={`relative z-20 rounded-2xl bg-[#FF6600] p-8 text-white transition-all duration-300 hover:-translate-y-1 motion-reduce:transition-none ${TILE_SHADOW} lg:col-start-6 lg:col-span-4 lg:row-start-1`}
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
              <StepBadge n={2} variant="light" className="mb-5" />

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
          <div className={`relative flex flex-col overflow-hidden rounded-2xl bg-[#fdfaf6] transition-shadow duration-300 ${TILE_SHADOW} lg:col-start-6 lg:col-span-4 lg:row-start-2`}>
            {/* Contenu paddé */}
            <div className="flex flex-1 flex-col p-8 md:p-10">
              <StepBadge n={3} variant="orange" className="mb-6" />
              <h3 className="font-heading text-2xl text-[#0a0a0a]">{networkTitle}</h3>
              <p className="mt-4 leading-relaxed text-gray-600">{networkDescription}</p>

              {/* CTA secondaire — contour orange, se remplit au survol */}
              <a
                href="#franchises"
                className="group mt-8 inline-flex w-fit items-center gap-2 rounded-full border border-[#FF6600] px-6 py-3.5 text-sm font-semibold text-[#FF6600] transition-all duration-300 hover:bg-[#FF6600] hover:text-white active:scale-95 motion-reduce:transition-none"
              >
                Rejoindre le réseau de franchise
                <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.5" strokeLinecap="round" strokeLinejoin="round" className="h-4 w-4 shrink-0 transition-transform duration-300 group-hover:translate-x-1 motion-reduce:transition-none" aria-hidden="true">
                  <line x1="5" y1="12" x2="19" y2="12" />
                  <polyline points="12 5 19 12 12 19" />
                </svg>
              </a>
            </div>

            {/* MARQUEE pleine largeur — têtes de franchisés (photos rondes) qui défilent */}
            <div className="relative overflow-hidden border-t border-gray-200/70 py-5">
              {/* Fondus latéraux (entrée/sortie douce) */}
              <div className="pointer-events-none absolute inset-y-0 left-0 z-10 w-14 bg-gradient-to-r from-[#fdfaf6] to-transparent" aria-hidden="true" />
              <div className="pointer-events-none absolute inset-y-0 right-0 z-10 w-14 bg-gradient-to-l from-[#fdfaf6] to-transparent" aria-hidden="true" />
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

          {/* TUILE 4 — IMAGE VERTICALE PLEINE HAUTEUR (colonne droite) */}
          <div className={`group relative min-h-[420px] overflow-hidden rounded-3xl bg-zinc-100 transition-shadow duration-300 ${TILE_SHADOW} lg:col-start-10 lg:col-span-3 lg:row-start-1 lg:row-span-2 lg:min-h-0`}>
            <img
              src={tallImagePath}
              alt={`easyvirtual.tours — ${tallTitle}`}
              className="h-full w-full object-cover transition-transform duration-700 ease-in-out motion-safe:group-hover:scale-105"
            />
            <div className="absolute inset-0 bg-gradient-to-t from-black via-black/45 to-transparent" />
            <StepBadge n={4} variant="light" className="absolute left-6 top-6 z-10" />
            <div className="absolute bottom-0 left-0 p-6 text-white md:p-8">
              <span className="mb-2 inline-block text-[10px] font-bold uppercase tracking-widest text-white/80">
                {tallEyebrow}
              </span>
              <p className="font-heading text-lg font-light tracking-tight">
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

        </div>
      </div>
    </section>
  );
}
