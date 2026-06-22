import { useState, type ReactNode } from "react";
import Eyebrow from "./Eyebrow";

/* Ombre canonique des tuiles — deux couches grises neutres (contact net +
   diffusion large), renforcées au survol. */
const TILE_SHADOW =
  "shadow-[0_2px_8px_-3px_rgba(10,10,10,0.10),0_22px_48px_-18px_rgba(10,10,10,0.14)] hover:shadow-[0_4px_12px_-3px_rgba(10,10,10,0.14),0_32px_64px_-20px_rgba(10,10,10,0.20)]";

/* Dégradé diagonal orange de marque — pastille d'icône de l'onglet actif. */
const BRAND_DIAGONAL = {
  backgroundImage: "linear-gradient(40deg, #e85c00 0%, #FF6600 52%, #ff8a3d 100%)",
};

type Point = {
  title: string;
  description: string;
};

type UseCase = {
  /** Identifiant d'onglet (clé React + ancres aria). */
  id: string;
  /** Libellé court affiché dans l'onglet. */
  tabLabel: string;
  /** Icône SVG inline de l'onglet (aucune dépendance externe). */
  icon: ReactNode;
  /** Titre fort du panneau. */
  headline: string;
  /** Paragraphe descriptif du panneau. */
  description: string;
  /** 3 bénéfices clés. */
  points: Point[];
  /** Illustration de la colonne droite (brandable Sanity plus tard). */
  image: string;
};

type Props = {
  eyebrow?: string;
  titlePart1?: string;
  titleHighlight?: string;
  titlePart2?: string;
  intro?: string;
  /** Cas d'usage (défauts FR, branchables à Sanity plus tard). */
  useCases?: UseCase[];
  /** CTA communs à tous les onglets. */
  primaryLabel?: string;
  primaryHref?: string;
  secondaryLabel?: string;
  secondaryHref?: string;
};

/* Flèche de CTA — glisse vers la droite au survol du groupe parent. */
function ArrowIcon({ className = "" }: { className?: string }) {
  return (
    <svg
      viewBox="0 0 24 24"
      fill="none"
      stroke="currentColor"
      strokeWidth="2.5"
      strokeLinecap="round"
      strokeLinejoin="round"
      className={`transition-transform duration-300 group-hover:translate-x-1 motion-reduce:transform-none ${className}`}
      aria-hidden="true"
    >
      <line x1="5" y1="12" x2="19" y2="12" />
      <polyline points="12 5 19 12 12 19" />
    </svg>
  );
}

/* Les 6 cas d'usage de la visite virtuelle — mêmes intitulés que le méga-menu
   « Cas d'usages » de la navbar. Icônes en SVG inline (aucune dépendance externe). */
const DEFAULT_USE_CASES: UseCase[] = [
  {
    id: "distance",
    tabLabel: "Visite à distance",
    icon: (
      <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" aria-hidden="true">
        <circle cx="12" cy="12" r="2" />
        <path d="M16.24 7.76a6 6 0 0 1 0 8.49m-8.48-.01a6 6 0 0 1 0-8.49m11.31-2.82a10 10 0 0 1 0 14.14m-14.14 0a10 10 0 0 1 0-14.14" />
      </svg>
    ),
    headline: "Faites visiter vos biens en temps réel, à distance",
    description:
      "Guidez vos clients dans une visite 360° en visioconférence, comme si vous y étiez ensemble. Plus besoin de déplacement inutile : qualifiez vos prospects bien avant la visite physique.",
    points: [
      { title: "Visite guidée en direct", description: "Prenez la main et commentez chaque pièce en visio." },
      { title: "Zéro déplacement inutile", description: "Pré-qualifiez acheteurs et locataires à distance." },
      { title: "Accessible partout", description: "Vos clients à l'étranger visitent sans bouger de chez eux." },
    ],
    image: "https://picsum.photos/seed/ev-distance/800/1000",
  },
  {
    id: "showroom",
    tabLabel: "Showroom virtuel",
    icon: (
      <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" aria-hidden="true">
        <rect x="2" y="3" width="20" height="14" rx="2" ry="2" />
        <line x1="8" y1="21" x2="16" y2="21" />
        <line x1="12" y1="17" x2="12" y2="21" />
      </svg>
    ),
    headline: "Un showroom ouvert 24h/24, 7j/7",
    description:
      "Transformez votre espace en boutique immersive toujours accessible. Vos clients explorent vos produits et vos espaces à toute heure, depuis n'importe quel appareil.",
    points: [
      { title: "Toujours ouvert", description: "Vos clients visitent quand ils veulent, jour et nuit." },
      { title: "Produits cliquables", description: "Tags interactifs : prix, fiche produit, lien d'achat." },
      { title: "Sur tous les écrans", description: "Mobile, tablette, ordinateur ou casque VR." },
    ],
    image: "https://picsum.photos/seed/ev-showroom/800/1000",
  },
  {
    id: "formation",
    tabLabel: "Formation immersive",
    icon: (
      <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" aria-hidden="true">
        <path d="M4.5 16.5c-1.5 1.26-2 5-2 5s3.74-.5 5-2c.71-.84.7-2.13-.09-2.91a2.18 2.18 0 0 0-2.91-.09z" />
        <path d="m12 15-3-3a22 22 0 0 1 2-3.95A12.88 12.88 0 0 1 22 2c0 2.72-.78 7.5-6 11a22.35 22.35 0 0 1-4 2z" />
        <path d="M9 12H4s.5-1 1-4c2 1 2 1 4 1" />
        <path d="M15 15v5c-1 2-1 2-1 4h-3" />
      </svg>
    ),
    headline: "Onboarding et sécurité en immersion totale",
    description:
      "Formez vos équipes dans un environnement reproduit à l'identique. Idéal pour l'accueil des nouveaux arrivants et les parcours de sécurité, sans mobiliser un site réel.",
    points: [
      { title: "Apprendre par la pratique", description: "Vos équipes explorent les lieux avant d'y être." },
      { title: "Procédures de sécurité", description: "Repérez points sensibles et consignes en 360°." },
      { title: "Reproductible à l'infini", description: "Une formation cohérente pour tous, partout." },
    ],
    image: "https://picsum.photos/seed/ev-formation/800/1000",
  },
  {
    id: "events",
    tabLabel: "Salons & Événements",
    icon: (
      <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" aria-hidden="true">
        <rect x="3" y="4" width="18" height="18" rx="2" ry="2" />
        <line x1="16" y1="2" x2="16" y2="6" />
        <line x1="8" y1="2" x2="8" y2="6" />
        <line x1="3" y1="10" x2="21" y2="10" />
      </svg>
    ),
    headline: "Des événements digitaux, hybrides et persistants",
    description:
      "Prolongez vos salons et événements bien au-delà de la date. Recréez votre stand ou votre espace événementiel en visite virtuelle accessible toute l'année.",
    points: [
      { title: "Stand toujours visitable", description: "Votre présence reste en ligne après l'événement." },
      { title: "Format hybride", description: "Touchez aussi ceux qui n'ont pas pu se déplacer." },
      { title: "Génération de leads", description: "Formulaires et contacts intégrés à la visite." },
    ],
    image: "https://picsum.photos/seed/ev-events/800/1000",
  },
  {
    id: "tech",
    tabLabel: "Documentation Tech",
    icon: (
      <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" aria-hidden="true">
        <path d="M3 7V5a2 2 0 0 1 2-2h2" />
        <path d="M17 3h2a2 2 0 0 1 2 2v2" />
        <path d="M21 17v2a2 2 0 0 1-2 2h-2" />
        <path d="M7 21H5a2 2 0 0 1-2-2v-2" />
        <circle cx="12" cy="12" r="3" />
        <line x1="12" y1="8" x2="12" y2="12" />
        <line x1="12" y1="12" x2="15" y2="15" />
      </svg>
    ),
    headline: "Inventaires et relevés 360° fidèles au réel",
    description:
      "Conservez un jumeau numérique précis de vos espaces. Mesures, plans d'étage et état des lieux : tout est capturé et consultable à distance, à tout moment.",
    points: [
      { title: "Mesures précises", description: "Cotes et distances exploitables après captation." },
      { title: "État des lieux daté", description: "Un instantané fidèle pour l'avant/après." },
      { title: "Plans d'étage", description: "Vue de dessus générée automatiquement." },
    ],
    image: "https://picsum.photos/seed/ev-doc/800/1000",
  },
  {
    id: "marketing",
    tabLabel: "Marketing Immo",
    icon: (
      <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" aria-hidden="true">
        <polygon points="12 2 15.09 8.26 22 9.27 17 14.14 18.18 21.02 12 17.77 5.82 21.02 7 14.14 2 9.27 8.91 8.26 12 2" />
      </svg>
    ),
    headline: "Boostez vos annonces immobilières",
    description:
      "Démarquez-vous avec des annonces qui captent l'attention. Les biens présentés en visite virtuelle génèrent plus de contacts qualifiés et réduisent les visites inutiles.",
    points: [
      { title: "Plus de contacts", description: "Les annonces 360° attirent davantage de prospects." },
      { title: "Visites mieux ciblées", description: "Seuls les acheteurs vraiment intéressés se déplacent." },
      { title: "Image premium", description: "Valorisez chaque bien avec une expérience moderne." },
    ],
    image: "https://picsum.photos/seed/ev-marketing/800/1000",
  },
];

/* Section « Cas d'usages » — réutilise le PRINCIPE D'ONGLETS de la section
   « Comment ça se passe » (HowItWorks) : un sélecteur d'onglets (ici 6 cas d'usage,
   en pills qui passent à la ligne sur mobile) pilote un panneau qui se recompose en
   fondu (crossfade via la `key` + classe `animate-fade-in`). Îlot React interactif :
   l'onglet actif est géré ici (useState), les contenus arrivent par props (défauts FR,
   branchables à Sanity plus tard). Fond blanc, conteneurisée (1440px). */
export default function UseCases({
  eyebrow = "Cas d'usages",
  titlePart1 = "La visite virtuelle, ",
  titleHighlight = "à chaque étape",
  titlePart2 = " de votre activité",
  intro = "Découvrez comment la technologie Matterport s'adapte à vos besoins métier pour créer de la valeur et fluidifier vos process.",
  useCases = DEFAULT_USE_CASES,
  primaryLabel = "Demander ma visite virtuelle",
  primaryHref = "#contact",
  secondaryLabel = "Voir des réalisations",
  secondaryHref = "#visites",
}: Props) {
  const [activeId, setActiveId] = useState(useCases[0]?.id);
  const current = useCases.find((uc) => uc.id === activeId) ?? useCases[0];

  return (
    <section id="cas-dusages" className="overflow-hidden bg-white py-24 md:py-32 lg:py-40">
      <div className="mx-auto w-full max-w-[var(--container)] px-6 sm:px-8">

        {/* EN-TÊTE DE SECTION (centré) */}
        <div className="mx-auto mb-14 max-w-4xl text-center md:mb-20">
          <Eyebrow>{eyebrow}</Eyebrow>
          <h2 className="mt-4 font-heading text-4xl font-bold leading-[1.05] tracking-tight text-[#0a0a0a] md:text-5xl lg:text-6xl">
            {titlePart1}
            <span className="font-cooper text-[#FF6600]">{titleHighlight}</span>
            {titlePart2}
          </h2>
          <p className="mx-auto mt-8 max-w-2xl text-lg leading-relaxed text-gray-600">{intro}</p>
        </div>

        {/* SÉLECTEUR D'ONGLETS (pills — passent à la ligne sur mobile) */}
        <div className="mb-14 flex justify-center md:mb-20">
          <div
            role="tablist"
            aria-label="Choisissez un cas d'usage"
            className="flex flex-wrap justify-center gap-1.5 rounded-[2rem] border border-gray-100 bg-[#fdfaf6] p-1.5"
          >
            {useCases.map((uc) => {
              const isActive = activeId === uc.id;
              return (
                <button
                  key={uc.id}
                  role="tab"
                  type="button"
                  id={`uc-tab-${uc.id}`}
                  aria-selected={isActive}
                  aria-controls={`uc-panel-${uc.id}`}
                  onClick={() => setActiveId(uc.id)}
                  className={`group flex items-center gap-3 rounded-full px-4 py-2.5 transition-all duration-300 active:scale-[0.97] motion-reduce:transition-none ${
                    isActive
                      ? "bg-white text-[#0a0a0a] shadow-[0_4px_20px_-4px_rgba(10,10,10,0.10)] ring-1 ring-black/5"
                      : "text-gray-500 hover:bg-white/60"
                  }`}
                >
                  <span
                    className={`flex h-9 w-9 shrink-0 items-center justify-center rounded-xl transition-colors duration-300 ${
                      isActive ? "text-white" : "bg-gray-100 text-gray-400 group-hover:bg-gray-200"
                    }`}
                    style={isActive ? BRAND_DIAGONAL : undefined}
                  >
                    <span className="h-5 w-5">{uc.icon}</span>
                  </span>
                  <span className="whitespace-nowrap text-sm font-bold">{uc.tabLabel}</span>
                </button>
              );
            })}
          </div>
        </div>

        {/* PANNEAU ACTIF — re-déclenche le fondu via la clé (crossfade) */}
        <div
          key={current.id}
          id={`uc-panel-${current.id}`}
          role="tabpanel"
          aria-labelledby={`uc-tab-${current.id}`}
          className="grid animate-fade-in grid-cols-1 items-center gap-12 lg:grid-cols-12 lg:gap-20"
        >
          {/* COLONNE GAUCHE — texte + bénéfices + CTA */}
          <div className="lg:col-span-7 xl:col-span-6">
            <h3 className="font-heading text-3xl font-bold leading-tight tracking-tight text-[#0a0a0a] md:text-4xl">
              {current.headline}
            </h3>
            <p className="mt-6 text-lg leading-relaxed text-gray-600">{current.description}</p>

            <div className="mt-10 space-y-7">
              {current.points.map((point) => (
                <div key={point.title} className="flex gap-5">
                  <span className="flex h-10 w-10 shrink-0 items-center justify-center rounded-xl bg-[#fff4ec] text-[#FF6600]">
                    <svg className="h-5 w-5" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="3" strokeLinecap="round" strokeLinejoin="round" aria-hidden="true">
                      <polyline points="20 6 9 17 4 12" />
                    </svg>
                  </span>
                  <div>
                    <h4 className="font-heading text-lg font-bold leading-tight text-[#0a0a0a]">{point.title}</h4>
                    <p className="mt-1 leading-relaxed text-gray-600">{point.description}</p>
                  </div>
                </div>
              ))}
            </div>

            <div className="mt-12 flex flex-wrap items-center gap-6">
              <a
                href={primaryHref}
                className="group inline-flex items-center gap-3 rounded-full bg-[#FF6600] px-8 py-4 font-semibold text-white shadow-xl shadow-orange-900/10 transition-all duration-300 hover:bg-[#e85c00] active:scale-95 motion-reduce:transition-none"
              >
                {primaryLabel}
                <ArrowIcon className="h-4 w-4" />
              </a>
              <a
                href={secondaryHref}
                className="group inline-flex items-center gap-1.5 font-semibold text-[#FF6600] underline decoration-[#FF6600]/40 underline-offset-4 transition-all hover:decoration-[#FF6600]"
              >
                {secondaryLabel}
                <ArrowIcon className="h-[18px] w-[18px]" />
              </a>
            </div>
          </div>

          {/* COLONNE DROITE — tuile image illustrative (suit l'onglet actif) */}
          <div className="lg:col-span-5 xl:col-span-6">
            <div className={`group relative aspect-[4/5] min-h-[480px] overflow-hidden rounded-3xl bg-zinc-100 transition-shadow duration-300 lg:min-h-[560px] ${TILE_SHADOW}`}>
              <img
                src={current.image}
                alt={current.headline}
                className="h-full w-full object-cover transition-transform duration-700 ease-in-out motion-safe:group-hover:scale-105"
                loading="lazy"
              />

              {/* Voile dégradé */}
              <div className="absolute inset-0 bg-gradient-to-t from-black via-black/45 to-transparent" aria-hidden="true" />

              {/* Chip du cas d'usage actif (bas-gauche) */}
              <div className="absolute inset-x-0 bottom-0 p-8 md:p-10">
                <span className="inline-flex items-center gap-2 rounded-full border border-white/30 bg-black/10 px-4 py-2 text-[10px] font-bold uppercase tracking-[0.18em] text-white backdrop-blur-md">
                  <span className="h-3.5 w-3.5 text-[#FF6600]">{current.icon}</span>
                  {current.tabLabel}
                </span>
              </div>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}
