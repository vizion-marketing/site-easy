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
  /* Pastille créateurs / abonnés de l'écran-titre orange (couche 1). */
  introNames?: string;
  introSubscribers?: string;
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
  primaryLabel = "Découvrir les cas d'usages",
  primaryHref = "#cas-dusages",
  secondaryLabel = "Voir d'autres réalisations",
  secondaryHref = "#visites",
  introNames = "Rachel & Emilien",
  introSubscribers = "2,4 M",
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
  // Panneau « fonctionnalités » : déplié au départ ; le replier fait s'agrandir la visite.
  const [featuresOpen, setFeaturesOpen] = useState(true);

  return (
    <section id="visite-virtuelle" className="relative overflow-clip">

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
                className="relative z-30 w-full max-w-[620px] translate-x-4 translate-y-2 lg:w-[920px] lg:max-w-none lg:translate-x-24 lg:translate-y-16"
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
          <div className={`group relative flex flex-col overflow-hidden rounded-3xl bg-white transition-shadow duration-500 lg:h-[600px] xl:h-[700px] 2xl:h-[740px] ${TILE_SHADOW}`}>

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
              {/* Toggle du panneau « fonctionnalités » */}
              <button
                type="button"
                onClick={() => setFeaturesOpen((v) => !v)}
                aria-expanded={featuresOpen}
                aria-controls="tour-features-panel"
                className={`group ml-auto inline-flex shrink-0 items-center gap-1.5 rounded-full px-3 py-1.5 text-[11px] font-semibold transition-all duration-300 active:scale-95 motion-reduce:transition-none ${
                  featuresOpen
                    ? "bg-[#FF6600] text-white shadow-sm shadow-orange-900/10"
                    : "border border-[#FF6600]/30 text-[#FF6600] hover:bg-[#fff4ec]"
                }`}
              >
                <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" className="h-3.5 w-3.5" aria-hidden="true">
                  <rect x="3" y="3" width="18" height="18" rx="2" />
                  <line x1="15" y1="3" x2="15" y2="21" />
                </svg>
                <span className="hidden whitespace-nowrap sm:inline">
                  {featuresOpen ? "Masquer" : "Fonctionnalités"}
                </span>
              </button>
            </div>

            {/* Corps : flex — colonne visite (rétrécit) + panneau « fonctionnalités » */}
            <div className="relative flex flex-1 flex-col overflow-hidden lg:flex-row">

              {/* COLONNE VISITE — iframe plein écran (rétrécit quand le panneau s'ouvre) */}
              <div className="relative min-h-[480px] w-full flex-1 overflow-hidden bg-zinc-100 sm:min-h-[560px]">
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

              {/* OVERLAY PLAYER — gros bouton play ; masqué (fondu) au clic pour révéler la visite */}
              <div
                className={`absolute inset-0 z-30 flex flex-col items-center justify-center overflow-hidden p-6 transition-opacity duration-700 ${introVisible ? "opacity-100" : "pointer-events-none opacity-0"}`}
                aria-hidden={!introVisible}
              >
                {/* Voile sombre immersif + flou de poster */}
                <div className="absolute inset-0 bg-black/35 backdrop-blur-[6px]" />
                <div className="absolute inset-0 bg-gradient-to-t from-black/80 via-transparent to-black/40" />

                {/* Badge supérieur discret */}
                <div className="relative z-10 mb-12">
                  <div className="inline-flex items-center gap-2.5 rounded-full border border-white/25 bg-black/20 px-4 py-2 backdrop-blur-xl">
                    <div className="relative flex h-2 w-2">
                      <span className="absolute inline-flex h-full w-full motion-safe:animate-ping rounded-full bg-[#FF6600] opacity-75"></span>
                      <span className="relative inline-flex h-2 w-2 rounded-full bg-[#FF6600]"></span>
                    </div>
                    <span className="text-[10px] font-bold uppercase tracking-[0.2em] text-white">
                      Visite pilote <span className="mx-1 opacity-40">·</span> interactive
                    </span>
                  </div>
                </div>

                {/* PLAY BUTTON HERO */}
                <div className="relative z-10">
                  {/* Anneau de pulsation extérieur */}
                  <div className="absolute inset-0 -m-4 motion-safe:animate-pulse rounded-full border border-white/10 ring-4 ring-white/5 motion-reduce:animate-none" />

                  <button
                    type="button"
                    onClick={() => setIntroVisible(false)}
                    aria-label="Démarrer la visite virtuelle"
                    className="group relative flex h-24 w-24 items-center justify-center rounded-full bg-[#FF6600] text-white shadow-[0_2px_8px_-3px_rgba(10,10,10,0.10),0_22px_48px_-18px_rgba(10,10,10,0.14)] transition-all duration-300 hover:scale-110 hover:bg-[#e85c00] hover:shadow-[0_0_40px_-5px_rgba(255,102,0,0.5)] active:scale-95 md:h-28 md:w-28 motion-reduce:transition-none"
                    style={{ backgroundImage: "linear-gradient(40deg, #e85c00 0%, #FF6600 52%, #ff8a3d 100%)" }}
                  >
                    {/* Icône Play Triangle */}
                    <svg
                      width="36"
                      height="36"
                      viewBox="0 0 24 24"
                      fill="currentColor"
                      className="ml-1 transition-transform duration-300 group-hover:scale-110 motion-reduce:transform-none"
                      aria-hidden="true"
                    >
                      <path d="M8 5v14l11-7z" />
                    </svg>

                    {/* Effet de brillance/glass au survol */}
                    <div className="absolute inset-0 rounded-full bg-white/0 transition-colors duration-300 group-hover:bg-white/5" />
                  </button>
                </div>

                {/* Hint Label */}
                <div className="relative z-10 mt-10 flex flex-col items-center gap-3">
                  <span className="text-[10px] font-bold uppercase tracking-[0.25em] text-white/70">
                    Cliquez pour explorer en 360°
                  </span>
                  <div className="h-px w-8 bg-white/20" />
                </div>
              </div>
              </div>

              {/* PANNEAU FONCTIONNALITÉS — se déplie à droite ; la visite rétrécit.
                 Largeur animée sur lg ; empilé (hauteur animée) sur mobile. */}
              <aside
                id="tour-features-panel"
                aria-hidden={!featuresOpen}
                className={`shrink-0 overflow-hidden transition-all duration-500 ease-in-out ${
                  featuresOpen
                    ? "max-h-[500px] w-full lg:max-h-none lg:w-[400px]"
                    : "max-h-0 w-full lg:max-h-none lg:w-0"
                }`}
              >
                <div className="flex h-[500px] w-full flex-col border-gray-200/70 bg-white border-t lg:h-full lg:w-[400px] lg:border-l lg:border-t-0">
                  {/* En-tête */}
                  <div className="flex items-start justify-between border-b border-gray-100 p-6">
                    <div className="space-y-1.5">
                      <div className="flex items-center gap-2">
                        <svg viewBox="0 0 24 24" fill="currentColor" className="h-3.5 w-3.5 text-[#FF6600]" aria-hidden="true">
                          <path d="M12 0 14.59 9.41 24 12 14.59 14.59 12 24 9.41 14.59 0 12 9.41 9.41 12 0Z" />
                        </svg>
                        <span className="text-[10px] font-bold uppercase tracking-wider text-[#FF6600]">
                          Fonctionnalités
                        </span>
                      </div>
                      <h3 className="font-heading text-xl font-bold tracking-tight text-[#0a0a0a]">
                        Tout ce que la visite permet
                      </h3>
                    </div>
                    <button
                      type="button"
                      onClick={() => setFeaturesOpen(false)}
                      className="group flex h-9 w-9 shrink-0 items-center justify-center rounded-full bg-gray-50 text-gray-400 transition-all duration-300 hover:bg-[#fff4ec] hover:text-[#FF6600] active:scale-90 motion-reduce:transition-none"
                      aria-label="Fermer le panneau des fonctionnalités"
                    >
                      <svg className="h-5 w-5 transition-transform duration-300 group-hover:rotate-90 motion-reduce:transform-none" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth="2" aria-hidden="true">
                        <path strokeLinecap="round" strokeLinejoin="round" d="M6 18 18 6M6 6l12 12" />
                      </svg>
                    </button>
                  </div>

                  {/* Liste scrollable des 8 fonctionnalités */}
                  <div className="ev-tour-scroll flex-1 space-y-4 overflow-y-auto p-5">
                    {features.map((feature, idx) => {
                      const Icon = FEATURE_ICONS[idx] ?? FEATURE_ICONS[0];
                      return (
                        <div
                          key={feature.title}
                          className={`group flex gap-4 rounded-2xl bg-[#fdfaf6] p-4 transition-shadow duration-300 ${TILE_SHADOW}`}
                        >
                          <div className="flex h-11 w-11 shrink-0 items-center justify-center rounded-xl bg-[#fff4ec] transition-transform duration-500 group-hover:scale-110 motion-reduce:transition-none">
                            <span className="cds-motion-icon cds-motion-icon--brand">
                              <Icon size={22} />
                            </span>
                          </div>
                          <div className="space-y-1">
                            <h4 className="font-heading text-[15px] font-bold text-[#0a0a0a]">{feature.title}</h4>
                            <p className="text-[13px] leading-relaxed text-gray-600">{feature.description}</p>
                          </div>
                        </div>
                      );
                    })}
                  </div>
                </div>
              </aside>

              {/* POIGNÉE — replier / déplier le panneau ; flèche centrée verticalement,
                 à cheval sur la bordure visite ↔ panneau. Suit la largeur animée du panneau
                 (à cheval sur la couture quand ouvert ; collée au bord droit quand replié).
                 Desktop uniquement (sur mobile le panneau s'empile : on garde le toggle de la
                 barre + le bouton « ✕ » de l'en-tête). */}
              <button
                type="button"
                onClick={() => setFeaturesOpen((v) => !v)}
                aria-expanded={featuresOpen}
                aria-controls="tour-features-panel"
                aria-label={featuresOpen ? "Replier le panneau des fonctionnalités" : "Déplier le panneau des fonctionnalités"}
                className={`group absolute top-1/2 z-30 hidden h-9 w-9 -translate-y-1/2 items-center justify-center rounded-full ring-2 ring-white shadow-[0_2px_8px_-3px_rgba(10,10,10,0.10),0_22px_48px_-18px_rgba(10,10,10,0.14)] transition-all duration-500 ease-in-out hover:scale-110 hover:shadow-[0_4px_12px_-3px_rgba(10,10,10,0.14),0_32px_64px_-20px_rgba(10,10,10,0.20)] focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-[#FF6600] focus-visible:ring-offset-2 active:scale-95 motion-reduce:transition-none lg:flex ${
                  featuresOpen
                    ? "right-[400px] translate-x-1/2 text-white"
                    : "right-3 translate-x-0 border border-gray-100 bg-white text-[#FF6600]"
                }`}
                style={featuresOpen ? { backgroundImage: "linear-gradient(40deg, #e85c00 0%, #FF6600 52%, #ff8a3d 100%)" } : undefined}
              >
                <svg
                  xmlns="http://www.w3.org/2000/svg"
                  viewBox="0 0 24 24"
                  fill="none"
                  stroke="currentColor"
                  strokeWidth="2.5"
                  strokeLinecap="round"
                  strokeLinejoin="round"
                  className={`h-[18px] w-[18px] transition-transform duration-300 ${featuresOpen ? "" : "rotate-180"}`}
                  aria-hidden="true"
                >
                  <path d="m9 18 6-6-6-6" />
                </svg>
              </button>

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
              href="#contact"
              className="group inline-flex items-center gap-2 font-semibold text-[#FF6600] underline decoration-[#FF6600]/40 underline-offset-4 transition-all hover:decoration-[#FF6600]"
            >
              Nous commander une visite virtuelle
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
