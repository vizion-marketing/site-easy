import { useState, type ComponentType } from "react";
import {
  RotateMotion,
  GridMotion,
  FitToScreenMotion,
  DashboardMotion,
  ExploreMotion,
  PinMotion,
  MaximizeMotion,
  ConnectMotion,
} from "@carbon/icons-motion";

type MotionIconProps = { isAnimating?: boolean; size?: number };

type Feature = {
  title: string;
  description: string;
};

type Props = {
  eyebrow?: string;
  titlePart1?: string;
  titleHighlight?: string;
  titlePart2?: string;
  intro?: string;
  /* Photo de l'écran-titre orange (colonne droite). Visuel produit de la caméra
     de capture par défaut ; branchable plus tard sur Sanity. */
  photo?: string;
  photoAlt?: string;
  /* CTA de l'écran-titre orange : invite à scroller vers la visite (ancre #la-visite). */
  discoverLabel?: string;
  discoverHref?: string;
  /* URL d'embed Matterport de la visite « pilote » (démo phare). À brancher
     plus tard sur Sanity (champ `tourUrl`). Défaut = espace de démo public. */
  embedUrl?: string;
  /* Libellé de la fausse barre d'adresse du cadre « navigateur ». */
  embedAddress?: string;
  primaryLabel?: string;
  primaryHref?: string;
  secondaryLabel?: string;
  secondaryHref?: string;
  /* Overlay d'intro affiché par-dessus la visite au chargement (teaser créateurs). */
  introEyebrow?: string;
  introTitlePre?: string;
  introNames?: string;
  introSubscribers?: string;
  introTitlePost?: string;
  introText?: string;
  introButtonLabel?: string;
  /* Étiquettes de fonctionnalités superposées en bas de la visite. */
  features?: Feature[];
};

/* Ombre canonique des tuiles — deux couches grises neutres (contact net +
   diffusion large), renforcées au survol. */
const TILE_SHADOW =
  "shadow-[0_2px_8px_-3px_rgba(10,10,10,0.10),0_22px_48px_-18px_rgba(10,10,10,0.14)] hover:shadow-[0_4px_12px_-3px_rgba(10,10,10,0.14),0_32px_64px_-20px_rgba(10,10,10,0.20)]";

/* Icônes Carbon Motion — identiques au méga-menu de la navbar (cf. Navbar.tsx),
   colorées en orange marque via `.cds-motion-icon--brand`. Même ordre que `features`. */
const FEATURE_ICONS: ComponentType<MotionIconProps>[] = [
  RotateMotion,      // Navigation libre
  GridMotion,        // Vue dollhouse 3D
  FitToScreenMotion, // Mesures précises
  DashboardMotion,   // Plan d'étage
  ExploreMotion,     // Visite guidée
  PinMotion,         // Points d'intérêt
  MaximizeMotion,    // Mode immersif VR
  ConnectMotion,     // Partage & intégration
];

/* Mesh gradient orange de marque — pastille premium des icônes, identique au
   méga-menu « Secteurs d'activités » (composant SectorLink de Navbar.tsx). */
const MESH_BRAND = {
  backgroundColor: "#ff6600",
  backgroundImage:
    "radial-gradient(at 15% 18%, #ff8040 0px, transparent 50%)," +
    "radial-gradient(at 85% 12%, #ffc7a0 0px, transparent 42%)," +
    "radial-gradient(at 92% 60%, #ff7c2a 0px, transparent 46%)," +
    "radial-gradient(at 12% 92%, #ee6000 0px, transparent 52%)," +
    "radial-gradient(at 50% 50%, #ff741c 0px, transparent 55%)",
};

/* Dégradé diagonal orange de marque — fond de l'écran-titre (tuile orange du bento). */
const BRAND_DIAGONAL = {
  backgroundImage: "linear-gradient(40deg, #e85c00 0%, #FF6600 52%, #ff8a3d 100%)",
};

/* Section « La visite virtuelle » — révélation au scroll.
   Couche 1 : écran-titre plein écran orange (sticky) qui présente la promesse.
   Couche 2 : la visite Matterport interactive XXL qui glisse PAR-DESSUS l'orange.
   Cible de l'ancre #visite-virtuelle (bouton « Découvrir la visite virtuelle » du
   hero) ; le bouton de l'écran-titre pointe vers #la-visite (couche 2). Section
   éditoriale statique : props optionnelles (défauts FR), branchables à Sanity plus tard. */
export default function VirtualTourPilot({
  eyebrow = "Démonstration en direct",
  titlePart1 = "Vous vous apprêtez à plonger au cœur d'une ",
  titleHighlight = "visite virtuelle",
  titlePart2 = "…",
  intro = "Et pas n'importe laquelle : la véritable villa des créateurs Rachel & Emilien. Ouvrez chaque porte, explorez chaque recoin — et imaginez tout ce que la visite virtuelle rend possible.",
  photo = "/easybear.png",
  photoAlt = "La mascotte easy capturant un espace avec la caméra 360° Matterport Pro3",
  discoverLabel = "Découvrir la visite",
  discoverHref = "#la-visite",
  // Visite virtuelle pilote du site (même embed que la modale du méga-menu).
  // Branchable plus tard sur Sanity (champ `tourUrl`).
  embedUrl = "https://my.easyvirtual.tours/tour/visite-virtuelle",
  embedAddress = "my.easyvirtual.tours/tour/visite-virtuelle",
  primaryLabel = "Demander ma visite virtuelle",
  primaryHref = "#contact",
  secondaryLabel = "Voir d'autres réalisations",
  secondaryHref = "#visites",
  introEyebrow = "Visite exclusive",
  introTitlePre = "La maison des YouTubers",
  introNames = "Rachel & Emilien",
  introSubscribers = "2,4 M",
  introTitlePost = "",
  introText = "Vous vous apprêtez à explorer la véritable maison de créateurs célèbres comme Rachel & Emilien — et bien d'autres. Déplacez-vous librement, pièce par pièce, comme si vous y étiez.",
  introButtonLabel = "Démarrer la visite",
  features = [
    {
      title: "Navigation libre",
      description: "Déplacez-vous point à point, de façon fluide, dans tout l'espace.",
    },
    {
      title: "Vue dollhouse 3D",
      description: "Prenez de la hauteur avec la « maison de poupée » pour saisir les volumes.",
    },
    {
      title: "Mesures précises",
      description: "Activez le mode mesure pour vérifier n'importe quelle distance in situ.",
    },
    {
      title: "Plan d'étage",
      description: "Basculez en vue de dessus pour une lecture claire de l'agencement.",
    },
    {
      title: "Visite guidée",
      description: "Lancez un parcours automatique commenté qui met en avant les points clés.",
    },
    {
      title: "Points d'intérêt",
      description: "Des étiquettes interactives révèlent infos, photos et liens au bon endroit.",
    },
    {
      title: "Mode immersif VR",
      description: "Explorez au casque pour une immersion totale, comme si vous y étiez.",
    },
    {
      title: "Partage & intégration",
      description: "Partagez un lien ou intégrez la visite sur n'importe quel site web.",
    },
  ],
}: Props) {
  // Overlay d'intro : visible au départ, masqué (fondu) au clic sur le bouton.
  const [introVisible, setIntroVisible] = useState(true);

  return (
    <section id="visite-virtuelle" className="relative">

      {/* ═══════ COUCHE 1 — ÉCRAN-TITRE ORANGE (sticky, plein écran) ═══════ */}
      <div
        className="relative flex min-h-screen items-center overflow-x-clip bg-[#FF6600] lg:sticky lg:top-0 lg:h-screen"
        style={BRAND_DIAGONAL}
      >
        {/* Décors de fond (halos flous) */}
        <div className="pointer-events-none absolute inset-0 overflow-hidden">
          <div className="halo-drift absolute top-[10%] -right-[5%] h-[500px] w-[500px] rounded-full bg-white/10 blur-[120px]" />
          <div className="halo-drift-2 absolute -bottom-[10%] -left-[5%] h-[400px] w-[400px] rounded-full bg-white/10 blur-[100px]" />
        </div>

        <div className="relative mx-auto w-full max-w-[var(--container)] px-6 py-24 sm:px-8 lg:py-0">
          <div className="grid items-center gap-12 lg:grid-cols-12 lg:gap-20">

            {/* COLONNE GAUCHE — texte (blanc sur orange) */}
            <div className="z-10 flex flex-col items-start gap-8 lg:col-span-7">
              {/* Eyebrow */}
              <div className="inline-flex items-center gap-2 rounded-full border border-white/20 bg-white/10 px-3 py-1 backdrop-blur-sm">
                <svg className="h-3 w-3 fill-current text-white" viewBox="0 0 24 24" aria-hidden="true">
                  <path d="M12 2 14 10 22 12 14 14 12 22 10 14 2 12 10 10Z" />
                </svg>
                <span className="text-[10px] font-bold uppercase leading-none tracking-widest text-white">
                  {eyebrow}
                </span>
              </div>

              {/* Titre XXL */}
              <h2 className="font-heading text-4xl font-extralight leading-[1.05] tracking-tight text-white md:text-6xl lg:text-7xl">
                {titlePart1}
                <span className="font-cooper text-[#fff4ec]">
                  {titleHighlight}
                </span>
                {titlePart2}
              </h2>

              {/* Pastille créateurs / abonnés */}
              <div className="inline-flex items-center gap-2.5 rounded-full border border-white/15 bg-white/10 px-3 py-1.5 backdrop-blur-md">
                <span className="flex h-6 w-6 shrink-0 items-center justify-center rounded-full bg-[#FF0000]" aria-hidden="true">
                  <svg width="12" height="12" viewBox="0 0 24 24" fill="white">
                    <path d="M8 5v14l11-7z" />
                  </svg>
                </span>
                <span className="flex items-center gap-1.5">
                  <span className="text-sm font-semibold text-white">{introNames}</span>
                  <span className="text-xs text-white/40">•</span>
                  <span className="flex items-baseline gap-1">
                    <span className="text-sm font-bold text-white">{introSubscribers}</span>
                    <span className="text-[10px] font-medium text-white/70">abonnés</span>
                  </span>
                </span>
              </div>

              {/* Accroche */}
              {intro && (
                <p className="max-w-xl text-lg leading-relaxed text-white/85 lg:text-xl">{intro}</p>
              )}

              {/* Étiquettes de fonctionnalités (pilules) */}
              <div className="flex max-w-xl flex-wrap items-center gap-2">
                {features.map((feature, index) => {
                  const Icon = FEATURE_ICONS[index] ?? FEATURE_ICONS[0];
                  return (
                    <span
                      key={feature.title}
                      className="inline-flex items-center gap-1.5 rounded-full border border-white/20 bg-white/10 px-2.5 py-1 backdrop-blur-sm transition-transform duration-300 hover:scale-105 motion-reduce:transition-none"
                    >
                      <span className="flex h-5 w-5 shrink-0 items-center justify-center rounded-full bg-white" aria-hidden="true">
                        <span className="cds-motion-icon cds-motion-icon--brand">
                          <Icon size={12} />
                        </span>
                      </span>
                      <span className="whitespace-nowrap text-[11px] font-semibold text-white">{feature.title}</span>
                    </span>
                  );
                })}
              </div>

              {/* CTA — invite à scroller vers la visite */}
              <div className="flex flex-wrap items-center gap-6 pt-2">
                <a
                  href={discoverHref}
                  className="group relative inline-flex items-center gap-3 rounded-full bg-white px-8 py-4 font-semibold text-[#FF6600] shadow-xl shadow-orange-950/20 transition-all duration-300 hover:-translate-y-1 active:scale-95 motion-reduce:transition-none motion-reduce:hover:translate-y-0"
                >
                  <span>{discoverLabel}</span>
                  <svg className="h-5 w-5 transition-transform duration-300 group-hover:translate-y-1 motion-reduce:transform-none" fill="none" stroke="currentColor" viewBox="0 0 24 24" aria-hidden="true">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M19 14l-7 7m0 0l-7-7m7 7V3" />
                  </svg>
                </a>

                <a
                  href={secondaryHref}
                  className="font-semibold text-white underline decoration-white/40 underline-offset-4 transition-all duration-300 hover:decoration-white"
                >
                  {secondaryLabel}
                </a>
              </div>
            </div>

            {/* COLONNE DROITE — mascotte easy en cutout (cercles conservés) */}
            <div className="relative flex justify-center lg:col-span-5 lg:justify-end">
              {/* Halo de cercles concentriques (seule déco conservée) — en arrière-plan */}
              <div className="pointer-events-none absolute left-1/2 top-1/2 aspect-square w-full max-w-[500px] -translate-x-1/2 -translate-y-1/2">
                <div className="absolute inset-0 scale-[0.6] rounded-full border border-white/10" />
                <div className="absolute inset-0 scale-[0.8] rounded-full border border-white/15" />
                <div className="absolute inset-0 scale-100 rounded-full border border-white/20" />
                <svg className="absolute right-[10%] top-[10%] h-8 w-8 text-white/30" viewBox="0 0 24 24" fill="currentColor" aria-hidden="true">
                  <path d="M12 2 14 10 22 12 14 14 12 22 10 14 2 12 10 10Z" />
                </svg>
              </div>

              {/* Mascotte : agrandie, déborde du bas de la section, devant la couche blanche */}
              <img
                src={photo}
                alt={photoAlt}
                className="relative z-30 w-full max-w-[620px] translate-x-4 translate-y-16 lg:w-[920px] lg:max-w-none lg:translate-x-24 lg:translate-y-44"
              />
            </div>
          </div>
        </div>

        {/* Indice de scroll */}
        <div className="pointer-events-none absolute bottom-10 left-1/2 z-20 flex -translate-x-1/2 flex-col items-center gap-2">
          <div className="flex flex-col items-center gap-1 motion-safe:animate-bounce">
            <div className="h-10 w-px bg-gradient-to-b from-white/0 via-white/50 to-white" />
            <svg className="h-4 w-4 text-white" fill="none" stroke="currentColor" viewBox="0 0 24 24" aria-hidden="true">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M19 9l-7 7-7-7" />
            </svg>
          </div>
          <span className="ml-1 text-[10px] font-bold uppercase tracking-[0.2em] text-white/70">
            Scrollez pour découvrir
          </span>
        </div>
      </div>

      {/* ═══════ COUCHE 2 — LA VISITE XXL (glisse par-dessus l'orange) ═══════ */}
      <div
        id="la-visite"
        className="relative z-10 scroll-mt-24 rounded-t-[2rem] bg-white pb-24 pt-16 shadow-[0_-24px_70px_-24px_rgba(10,10,10,0.28)] md:pb-32 md:pt-20 lg:-mt-10 lg:rounded-t-[2.5rem] lg:pb-40 lg:pt-24"
      >
        <div className="mx-auto w-full max-w-[var(--container)] px-6 sm:px-8">

          {/* DISPOSITIF UNIFIÉ — Écran de navigation interactif (Browser Mockup) XXL */}
          <div className={`group relative flex flex-col overflow-hidden rounded-3xl bg-white transition-shadow duration-500 lg:h-[680px] xl:h-[780px] 2xl:h-[820px] ${TILE_SHADOW}`}>

            {/* Barre supérieure « navigateur » unifiée sur toute la largeur */}
            <div className="z-20 flex h-12 w-full shrink-0 items-center border-b border-gray-200/70 bg-white px-5">
              <div className="flex gap-1.5" aria-hidden="true">
                <span className="h-2.5 w-2.5 rounded-full bg-gray-200" />
                <span className="h-2.5 w-2.5 rounded-full bg-gray-200" />
                <span className="h-2.5 w-2.5 rounded-full bg-gray-200" />
              </div>
              <div className="mx-auto hidden max-w-md flex-1 px-4 md:block">
                <div className="flex h-7 items-center justify-center gap-2 rounded-lg bg-[#fdfaf6] px-3 text-[11px] font-medium text-gray-400">
                  <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" className="h-3 w-3 shrink-0" aria-hidden="true">
                    <rect width="18" height="11" x="3" y="11" rx="2" ry="2" />
                    <path d="M7 11V7a5 5 0 0 1 10 0v4" />
                  </svg>
                  {embedAddress}
                </div>
              </div>
              <div className="flex w-10 justify-end" aria-hidden="true">
                <span className="h-1.5 w-4 rounded-full bg-gray-100" />
              </div>
            </div>

            {/* Corps immersif : visite en pleine largeur + overlay de fonctionnalités en bas */}
            <div className="relative min-h-[480px] flex-1 overflow-hidden bg-zinc-100 sm:min-h-[560px]">
              {/* Visite interactive plein écran */}
              <iframe
                src={embedUrl}
                className="absolute inset-0 h-full w-full border-0"
                allow="fullscreen; xr-spatial-tracking; accelerometer; gyroscope; magnetometer"
                allowFullScreen
                loading="lazy"
                title="Visite virtuelle 360° interactive — démonstration easyvirtual.tours"
              />

              {/* Badges flottants supérieurs */}
              <div className="pointer-events-none absolute inset-x-0 top-0 z-20 flex items-start justify-between p-6">
                {/* Pastille « en direct » */}
                <div className="flex items-center gap-2 rounded-full border border-white/20 bg-black/30 px-3 py-1.5 text-white backdrop-blur-md">
                  <span className="relative flex h-2 w-2" aria-hidden="true">
                    <span className="absolute inline-flex h-full w-full rounded-full bg-[#FF6600] opacity-75 motion-safe:animate-ping" />
                    <span className="relative inline-flex h-2 w-2 rounded-full bg-[#FF6600]" />
                  </span>
                  <span className="text-[10px] font-bold uppercase tracking-[0.18em]">
                    Visite pilote · interactive
                  </span>
                </div>

                {/* Indice d'interaction (haut-droite) */}
                <div className="hidden items-center gap-2.5 rounded-xl bg-white/90 px-4 py-2 text-[#0a0a0a] shadow-[0_18px_40px_-12px_rgba(10,10,10,0.35)] backdrop-blur-sm sm:flex">
                  <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" className="h-[18px] w-[18px] text-[#FF6600]" aria-hidden="true">
                    <path d="M15 18l-2 2-1-1" />
                    <path d="M10 10l-2 2 1 1" />
                    <path d="M19 15V9a2 2 0 0 0-2-2h-6l-4-4" />
                    <path d="M11 21H5a2 2 0 0 1-2-2V5a2 2 0 0 1 2-2h11a2 2 0 0 1 2 2v4" />
                  </svg>
                  <span className="text-[10px] font-bold uppercase tracking-wider">Explorer à 360°</span>
                </div>
              </div>

              {/* OVERLAY D'INTRO — teaser créateurs, masqué (fondu) au clic sur le bouton */}
              <div
                className={`absolute inset-0 z-30 flex items-center justify-center overflow-hidden p-6 transition-opacity duration-500 ${introVisible ? "opacity-100" : "pointer-events-none opacity-0"}`}
                aria-hidden={!introVisible}
              >
                {/* Voile sombre + flou : la visite est teasée derrière */}
                <div className="absolute inset-0 bg-gradient-to-b from-black/20 via-black/40 to-black/60 backdrop-blur-sm" />

                {/* Halo décoratif */}
                <div className="pointer-events-none absolute left-1/2 top-1/2 h-96 w-96 -translate-x-1/2 -translate-y-1/2 rounded-full bg-[#FF6600]/20 blur-[120px]" />

                {/* Carte glass — bornée à 88% de la hauteur de la visite, défilable si besoin */}
                <div className="relative z-10 flex max-h-[88%] w-full max-w-[540px] flex-col overflow-y-auto rounded-3xl border border-white/15 bg-white/10 p-6 text-center shadow-[0_2px_8px_-3px_rgba(10,10,10,0.10),0_22px_48px_-18px_rgba(10,10,10,0.14)] backdrop-blur-xl [scrollbar-color:rgba(255,255,255,0.3)_transparent] [scrollbar-width:thin] md:p-10">
                  {/* Eyebrow */}
                  <div className="mb-4 flex justify-center">
                    <div className="inline-flex items-center gap-2 rounded-full border border-white/20 bg-white/5 py-1.5 pl-2.5 pr-3.5 backdrop-blur-md">
                      <svg width="14" height="14" viewBox="0 0 24 24" fill="none" className="text-[#FF6600]" stroke="currentColor" strokeWidth="2.5" strokeLinecap="round" strokeLinejoin="round" aria-hidden="true">
                        <path d="m12 3-1.912 5.813a2 2 0 0 1-1.275 1.275L3 12l5.813 1.912a2 2 0 0 1 1.275 1.275L12 21l1.912-5.813a2 2 0 0 1 1.275-1.275L21 12l-5.813-1.912a2 2 0 0 1-1.275-1.275L12 3Z" />
                      </svg>
                      <span className="text-[10px] font-bold uppercase tracking-[0.15em] text-white">{introEyebrow}</span>
                    </div>
                  </div>

                  {/* Header : icône 360 + titre */}
                  <div className="mb-4 space-y-3">
                    <div className="mx-auto flex h-14 w-14 items-center justify-center rounded-full bg-white/10 text-white ring-1 ring-white/20">
                      <svg width="28" height="28" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round" aria-hidden="true">
                        <path d="M12 2v3m0 14v3M5 12H2m20 0h-3" />
                        <path d="m17 7-2.12 2.12m-5.76 5.76L7 17m10 0-2.12-2.12m-5.76-5.76L7 7" />
                        <circle cx="12" cy="12" r="3" />
                        <path d="M12 7a5 5 0 0 1 5 5" />
                      </svg>
                    </div>

                    <h3 className="font-heading text-2xl font-bold leading-tight tracking-tight text-white md:text-3xl lg:text-4xl">
                      {introTitlePre} <span className="font-cooper text-[#FF6600]">{introNames}</span> {introTitlePost}
                    </h3>
                  </div>

                  <p className="mx-auto mb-6 max-w-sm text-lg leading-relaxed text-white/80">{introText}</p>

                  {/* Action */}
                  <div className="flex flex-col items-center gap-4">
                    <button
                      type="button"
                      onClick={() => setIntroVisible(false)}
                      className="group relative inline-flex items-center gap-3 overflow-hidden rounded-full bg-[#FF6600] px-10 py-4 font-heading text-lg font-bold text-white transition-all duration-300 hover:bg-[#e85c00] hover:shadow-xl hover:shadow-[#FF6600]/30 active:scale-95 motion-reduce:transition-none"
                    >
                      <span>{introButtonLabel}</span>
                      <svg width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.5" strokeLinecap="round" strokeLinejoin="round" className="transition-transform duration-300 group-hover:translate-x-1.5 motion-reduce:transform-none" aria-hidden="true">
                        <path d="M5 12h14m-7-7 7 7-7 7" />
                      </svg>
                    </button>

                    <div className="flex items-center gap-2 text-[10px] font-bold uppercase tracking-widest text-white/50">
                      <svg width="12" height="12" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" aria-hidden="true">
                        <path d="M15 18H9a2 2 0 0 1-2-2V6a2 2 0 0 1 2-2h6a2 2 0 0 1 2 2v10a2 2 0 0 1-2 2Z" />
                        <path d="M12 12v.01" />
                      </svg>
                      <span>Cliquez &amp; glissez pour explorer</span>
                    </div>
                  </div>
                </div>
              </div>
            </div>
          </div>

          {/* PIED — CTA */}
          <div className="mt-16 flex flex-col items-center justify-center gap-8 md:flex-row">
            <a
              href={primaryHref}
              className="group inline-flex items-center gap-2 rounded-full bg-[#FF6600] px-8 py-4 font-semibold text-white shadow-xl shadow-orange-900/10 transition-all duration-300 hover:bg-[#e85c00] active:scale-95 motion-reduce:transition-none"
            >
              {primaryLabel}
              <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.5" strokeLinecap="round" strokeLinejoin="round" className="h-5 w-5 transition-transform duration-300 group-hover:translate-x-1 motion-reduce:transform-none" aria-hidden="true">
                <line x1="5" y1="12" x2="19" y2="12" />
                <polyline points="12 5 19 12 12 19" />
              </svg>
            </a>

            <a
              href={secondaryHref}
              className="group inline-flex items-center gap-2 font-semibold text-[#FF6600] underline decoration-[#FF6600]/40 underline-offset-4 transition-all hover:decoration-[#FF6600]"
            >
              {secondaryLabel}
              <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.5" strokeLinecap="round" strokeLinejoin="round" className="h-[18px] w-[18px] transition-transform duration-300 group-hover:translate-x-1 motion-reduce:transform-none" aria-hidden="true">
                <line x1="5" y1="12" x2="19" y2="12" />
                <polyline points="12 5 19 12 12 19" />
              </svg>
            </a>
          </div>
        </div>
      </div>
    </section>
  );
}
