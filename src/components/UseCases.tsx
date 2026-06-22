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

/* Mesh gradient de fond de section — voiles ORANGÉS doux et diffus sur un gris très
   clair (quasi blanc), pour casser la monotonie en restant léger. */
const MESH_BG = {
  backgroundColor: "#fafafa",
  backgroundImage:
    "radial-gradient(at 12% 8%, rgba(255,133,51,0.18) 0px, transparent 55%)," +
    "radial-gradient(at 88% 6%, rgba(255,102,0,0.13) 0px, transparent 50%)," +
    "radial-gradient(at 82% 96%, rgba(255,138,61,0.16) 0px, transparent 55%)," +
    "radial-gradient(at 18% 92%, rgba(255,122,28,0.12) 0px, transparent 52%)",
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

/* Les 6 cas d'usage phares de la visite virtuelle, dans l'ordre des pills :
   Génération de lead · Qualification de leads · Génération de plans · Formation ·
   Marque employeur · Expérience innovante. Icônes en SVG inline (aucune dépendance externe). */
const DEFAULT_USE_CASES: UseCase[] = [
  {
    id: "lead",
    tabLabel: "Génération de lead",
    icon: (
      <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" aria-hidden="true">
        <path d="m6 15-4-4 6.75-6.77a7.79 7.79 0 0 1 11 11L13 22l-4-4 6.39-6.36a2.14 2.14 0 0 0-3-3L6 15" />
        <path d="m5 8 4 4" />
        <path d="m12 15 4 4" />
      </svg>
    ),
    headline: "Démarquez-vous et générez plus de leads",
    description:
      "Une visite virtuelle transforme vos annonces et vos campagnes. Les biens et espaces présentés en 360° captent l'attention, génèrent plus de contacts qualifiés et réduisent les visites inutiles.",
    points: [
      { title: "Plus de contacts qualifiés", description: "Les annonces 360° attirent et engagent davantage de prospects." },
      { title: "Visites mieux ciblées", description: "Seuls les acheteurs vraiment intéressés se déplacent." },
      { title: "Image de marque premium", description: "Valorisez chaque espace avec une expérience moderne et immersive." },
    ],
    image: "https://picsum.photos/seed/ev-lead/800/1000",
  },
  {
    id: "qualification",
    tabLabel: "Qualification de leads",
    icon: (
      <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" aria-hidden="true">
        <polygon points="22 3 2 3 10 12.46 10 19 14 21 14 12.46 22 3" />
      </svg>
    ),
    headline: "Qualifiez vos prospects avant même la visite",
    description:
      "La visite virtuelle filtre naturellement vos contacts : seuls les prospects réellement intéressés vont plus loin. Guidez-les à distance en visio, concentrez votre temps sur les acheteurs sérieux et supprimez les visites physiques inutiles.",
    points: [
      { title: "Des prospects pré-qualifiés", description: "Pré-qualifiez acheteurs et locataires à distance, 24h/24." },
      { title: "Moins de visites inutiles", description: "Les curieux se font une idée en ligne ; vous recevez des visiteurs décidés." },
      { title: "Du temps gagné", description: "Vous concentrez vos efforts sur les contacts à fort potentiel." },
    ],
    image: "https://picsum.photos/seed/ev-qualification/800/1000",
  },
  {
    id: "plans",
    tabLabel: "Génération de plans",
    icon: (
      <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" aria-hidden="true">
        <rect x="3" y="3" width="18" height="18" rx="1" />
        <path d="M10 3v18" />
        <path d="M3 9h7" />
        <path d="M10 14h11" />
      </svg>
    ),
    headline: "Des plans d'étage générés automatiquement",
    description:
      "À partir de la captation 360°, obtenez des plans d'étage 2D précis et cotés, sans relevé manuel. Idéal pour l'aménagement, les devis et la documentation technique de vos espaces.",
    points: [
      { title: "Cotes fidèles au réel", description: "Mesures et dimensions exploitables directement depuis le scan." },
      { title: "Aucun relevé manuel", description: "Le plan est généré depuis la visite, en quelques clics." },
      { title: "Export & partage", description: "Diffusez vos plans aux artisans, architectes et clients." },
    ],
    image: "https://picsum.photos/seed/ev-plans/800/1000",
  },
  {
    id: "formation",
    tabLabel: "Formation",
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
    id: "marque-employeur",
    tabLabel: "Marque employeur",
    icon: (
      <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" aria-hidden="true">
        <path d="M16 21v-2a4 4 0 0 0-4-4H6a4 4 0 0 0-4 4v2" />
        <circle cx="9" cy="7" r="4" />
        <path d="M22 21v-2a4 4 0 0 0-3-3.87" />
        <path d="M16 3.13a4 4 0 0 1 0 7.75" />
      </svg>
    ),
    headline: "Attirez les talents avec une visite immersive de vos locaux",
    description:
      "Donnez envie de vous rejoindre : faites découvrir vos bureaux, votre ambiance et vos espaces de travail en 360°. Une marque employeur incarnée qui rassure les candidats et accélère vos recrutements.",
    points: [
      { title: "Des candidats qui se projettent", description: "Vos futurs talents découvrent leur environnement de travail avant l'entretien." },
      { title: "Recrutement à distance facilité", description: "Présentez vos locaux aux candidats éloignés, sans déplacement." },
      { title: "Une image authentique", description: "Affichez vos vrais espaces : une marque employeur transparente et attractive." },
    ],
    image: "https://picsum.photos/seed/ev-marque-employeur/800/1000",
  },
  {
    id: "experience",
    tabLabel: "Expérience innovante",
    icon: (
      <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" aria-hidden="true">
        <path d="M15 14c.2-1 .7-1.7 1.5-2.5 1-.9 1.5-2.2 1.5-3.5A6 6 0 0 0 6 8c0 1 .2 2.2 1.5 3.5.7.7 1.3 1.5 1.5 2.5" />
        <path d="M9 18h6" />
        <path d="M10 22h4" />
      </svg>
    ),
    headline: "Offrez une expérience immersive à la pointe de l'innovation",
    description:
      "Positionnez votre marque comme moderne et avant-gardiste. La visite 360° enrichie — points d'intérêt, fiches produits, vidéos et liens intégrés — transforme la découverte de vos espaces en une expérience interactive mémorable, sur tous les écrans.",
    points: [
      { title: "Navigation libre et intuitive", description: "Vos visiteurs explorent vos espaces 24h/24, depuis n'importe quel écran." },
      { title: "Contenus enrichis intégrés", description: "Ajoutez fiches produits, vidéos et liens directement dans la visite." },
      { title: "Une image résolument moderne", description: "Démarquez-vous avec une technologie immersive qui marque les esprits." },
    ],
    image: "https://picsum.photos/seed/ev-experience/800/1000",
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
  titlePart1 = "À quoi sert ",
  titleHighlight = "une visite virtuelle",
  titlePart2 = " pour votre entreprise ?",
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
    <section id="cas-dusages" className="overflow-hidden py-24 md:py-32 lg:py-40" style={MESH_BG}>
      <div className="mx-auto w-full max-w-[var(--container)] px-6 sm:px-8">

        {/* EN-TÊTE DE SECTION (aligné à gauche — motif bento canonique) */}
        <div className="mb-14 max-w-4xl text-left md:mb-20">
          <Eyebrow>{eyebrow}</Eyebrow>
          <h2 className="mt-4 font-heading text-4xl font-bold leading-[1.05] tracking-tight text-[#0a0a0a] md:text-5xl lg:text-6xl">
            {titlePart1}
            <span className="font-cooper text-[#FF6600]">{titleHighlight}</span>
            {titlePart2}
          </h2>
          <p className="mt-8 max-w-2xl text-lg leading-relaxed text-gray-600">{intro}</p>
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
