import { useState, type ReactNode } from "react";
import Eyebrow from "./Eyebrow";

/* Ombre canonique des tuiles — deux couches grises neutres (contact net +
   diffusion large), renforcées au survol. */
const TILE_SHADOW =
  "shadow-[0_2px_8px_-3px_rgba(10,10,10,0.10),0_22px_48px_-18px_rgba(10,10,10,0.14)] hover:shadow-[0_4px_12px_-3px_rgba(10,10,10,0.14),0_32px_64px_-20px_rgba(10,10,10,0.20)]";

/* Flèche de CTA — glisse vers la droite au survol du groupe parent. */
function ArrowIcon({ className = "" }: { className?: string }) {
  return (
    <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.5" strokeLinecap="round" strokeLinejoin="round" className={`transition-transform duration-300 group-hover:translate-x-1 motion-reduce:transform-none ${className}`} aria-hidden="true">
      <line x1="5" y1="12" x2="19" y2="12" />
      <polyline points="12 5 19 12 12 19" />
    </svg>
  );
}

type Step = {
  id: string; // numéro zéro-paddé "01".."04"
  title: string;
  description: string;
  icon: ReactNode;
  /** Illustration affichée à droite quand l'étape est active (brandable Sanity plus tard). */
  image: string;
};

type TourPath = {
  /** Libellé principal de l'onglet. */
  tabLabel: string;
  /** Sous-titre descriptif de l'onglet. */
  tabSublabel: string;
  /** Icône SVG inline de l'onglet. */
  tabIcon: ReactNode;
  /** Les 4 étapes du parcours. */
  steps: Step[];
  /** Bénéfice clé récapitulé sur la tuile orange. */
  benefitTitle: string;
  benefitText: string;
  /** CTA de la tuile orange. */
  ctaLabel: string;
  ctaHref: string;
};

type Props = {
  eyebrow?: string;
  titlePart1?: string;
  titleHighlight?: string;
  titlePart2?: string;
  intro?: string;
  /** Parcours « one-shot » : une visite pour un seul lieu. */
  single?: TourPath;
  /** Parcours « grands comptes » : plusieurs visites partout en France. */
  multi?: TourPath;
  /** CTA de pied de section (communs aux deux onglets). */
  finalPrimaryLabel?: string;
  finalPrimaryHref?: string;
  finalSecondaryLabel?: string;
  finalSecondaryHref?: string;
};

/* ----- Icônes SVG inline (aucune dépendance externe) ----- */
const IconBuilding = (
  <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" className="h-6 w-6" aria-hidden="true">
    <path d="M3 9l9-7 9 7v11a2 2 0 0 1-2 2H5a2 2 0 0 1-2-2z" />
    <polyline points="9 22 9 12 15 12 15 22" />
  </svg>
);
const IconMap = (
  <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" className="h-6 w-6" aria-hidden="true">
    <circle cx="12" cy="12" r="10" />
    <path d="M12 2a14.5 14.5 0 0 0 0 20 14.5 14.5 0 0 0 0-20" />
    <path d="M2 12h20" />
  </svg>
);

/* Parcours A — prestation ponctuelle (one-shot) pour un seul lieu. */
const SINGLE_PATH: TourPath = {
  tabLabel: "Une visite virtuelle",
  tabSublabel: "Pour votre bien, votre école, votre ERP…",
  tabIcon: IconBuilding,
  steps: [
    {
      id: "01",
      title: "Prise de contact",
      description: "Vous décrivez votre lieu (bien immobilier, école, ERP, commerce…). On vous envoie un devis clair sous 24 h.",
      image: "https://picsum.photos/seed/ev-contact/800/1000",
      icon: (
        <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" className="h-6 w-6" aria-hidden="true">
          <path d="M22 16.92v3a2 2 0 0 1-2.18 2 19.79 19.79 0 0 1-8.63-3.07 19.5 19.5 0 0 1-6-6 19.79 19.79 0 0 1-3.07-8.67A2 2 0 0 1 4.11 2h3a2 2 0 0 1 2 1.72 12.84 12.84 0 0 0 .7 2.81 2 2 0 0 1-.45 2.11L8.09 9.91a16 16 0 0 0 6 6l1.27-1.27a2 2 0 0 1 2.11-.45 12.84 12.84 0 0 0 2.81.7A2 2 0 0 1 22 16.92z" />
        </svg>
      ),
    },
    {
      id: "02",
      title: "Captation sur site",
      description: "Un expert local easyvirtual.tours se déplace et scanne l'intégralité de vos espaces en 3D (caméra Matterport).",
      image: "https://picsum.photos/seed/ev-capture/800/1000",
      icon: (
        <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" className="h-6 w-6" aria-hidden="true">
          <path d="M23 19a2 2 0 0 1-2 2H3a2 2 0 0 1-2-2V8a2 2 0 0 1 2-2h4l2-3h6l2 3h4a2 2 0 0 1 2 2z" />
          <circle cx="12" cy="13" r="4" />
        </svg>
      ),
    },
    {
      id: "03",
      title: "Production de la visite",
      description: "On assemble votre visite virtuelle 360° navigable : plan d'étage, mesures, points d'intérêt.",
      image: "https://picsum.photos/seed/ev-production/800/1000",
      icon: (
        <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" className="h-6 w-6" aria-hidden="true">
          <path d="M12 3H5a2 2 0 0 0-2 2v14a2 2 0 0 0 2 2h14a2 2 0 0 0 2-2v-7" />
          <path d="M18.375 2.625a2.121 2.121 0 1 1 3 3L12 15l-4 1 1-4Z" />
        </svg>
      ),
    },
    {
      id: "04",
      title: "Livraison & intégration",
      description: "Vous recevez un lien à partager et un embed à intégrer sur votre site. Hébergement inclus.",
      image: "https://picsum.photos/seed/ev-delivery/800/1000",
      icon: (
        <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" className="h-6 w-6" aria-hidden="true">
          <path d="M21 15v4a2 2 0 0 1-2 2H5a2 2 0 0 1-2-2v-4" />
          <polyline points="17 8 12 3 7 8" />
          <line x1="12" y1="3" x2="12" y2="15" />
        </svg>
      ),
    },
  ],
  benefitTitle: "Votre lieu en ligne en moins de 7 jours",
  benefitText: "Un expert près de chez vous, une visite clé en main, prête à partager et à intégrer.",
  ctaLabel: "Demander ma visite",
  ctaHref: "#contact",
};

/* Parcours B — déploiement multi-sites national pour grands comptes. */
const MULTI_PATH: TourPath = {
  tabLabel: "Plusieurs visites partout en France",
  tabSublabel: "Réseau, multi-sites, grands comptes",
  tabIcon: IconMap,
  steps: [
    {
      id: "01",
      title: "Cadrage multi-sites",
      description: "On audite votre parc (agences, magasins, campus…) et on construit un plan de déploiement national.",
      image: "https://picsum.photos/seed/ev-audit/800/1000",
      icon: (
        <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" className="h-6 w-6" aria-hidden="true">
          <path d="M3 6h18M3 12h18M3 18h18" />
        </svg>
      ),
    },
    {
      id: "02",
      title: "Réseau de franchisés",
      description: "Nos franchisés certifiés couvrent toute la France : un interlocuteur local par zone, des standards identiques partout.",
      image: "https://picsum.photos/seed/ev-network/800/1000",
      icon: (
        <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" className="h-6 w-6" aria-hidden="true">
          <path d="M17 21v-2a4 4 0 0 0-4-4H5a4 4 0 0 0-4 4v2" />
          <circle cx="9" cy="7" r="4" />
          <path d="M23 21v-2a4 4 0 0 0-3-3.87" />
          <path d="M16 3.13a4 4 0 0 1 0 7.75" />
        </svg>
      ),
    },
    {
      id: "03",
      title: "Captations coordonnées",
      description: "On planifie et réalise les captations en parallèle sur tous vos sites, avec un suivi centralisé.",
      image: "https://picsum.photos/seed/ev-coordinate/800/1000",
      icon: (
        <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" className="h-6 w-6" aria-hidden="true">
          <rect x="3" y="4" width="18" height="18" rx="2" ry="2" />
          <line x1="16" y1="2" x2="16" y2="6" />
          <line x1="8" y1="2" x2="8" y2="6" />
          <line x1="3" y1="10" x2="21" y2="10" />
        </svg>
      ),
    },
    {
      id: "04",
      title: "Plateforme centralisée",
      description: "Toutes vos visites réunies dans un espace de marque unique, avec statistiques et gestion des accès.",
      image: "https://picsum.photos/seed/ev-platform/800/1000",
      icon: (
        <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" className="h-6 w-6" aria-hidden="true">
          <rect x="2" y="3" width="20" height="14" rx="2" ry="2" />
          <line x1="8" y1="21" x2="16" y2="21" />
          <line x1="12" y1="17" x2="12" y2="21" />
        </svg>
      ),
    },
  ],
  benefitTitle: "Un déploiement homogène sur tout le territoire",
  benefitText: "Un seul interlocuteur, des standards identiques partout, une plateforme unique pour tout piloter.",
  ctaLabel: "Parler à un expert grands comptes",
  ctaHref: "#contact",
};

/* Section « Comment ça se passe » — deux parcours présentés en onglets pour
   séparer clairement la prestation ponctuelle (un seul lieu : bien, école, ERP…)
   du déploiement multi-sites national pour grands comptes. Îlot React interactif :
   l'onglet actif est géré ici (useState), les contenus arrivent par props (défauts
   FR, branchables à Sanity plus tard). Fond blanc, conteneurisée (1440px). */
export default function HowItWorks({
  eyebrow = "Comment ça se passe",
  titlePart1 = "En quelques ",
  titleHighlight = "étapes",
  titlePart2 = " simples",
  intro = "Que vous ayez un seul établissement ou un réseau national, notre processus est conçu pour être fluide, rapide et sans friction technique.",
  single = SINGLE_PATH,
  multi = MULTI_PATH,
  finalPrimaryLabel = "Demander un devis gratuit",
  finalPrimaryHref = "#contact",
  finalSecondaryLabel = "Voir des réalisations",
  finalSecondaryHref = "#visites",
}: Props) {
  const [activeKey, setActiveKey] = useState<"single" | "multi">("single");
  // Étape ouverte dans le stepper (gauche) ; pilote l'image affichée à droite.
  const [activeStep, setActiveStep] = useState(0);
  const tabs = [
    { key: "single" as const, path: single },
    { key: "multi" as const, path: multi },
  ];
  const current = activeKey === "single" ? single : multi;

  return (
    <section id="comment-ca-se-passe" className="overflow-hidden bg-white py-24 md:py-32 lg:py-40">
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

        {/* SÉLECTEUR D'ONGLETS (segmented control) */}
        <div className="mb-14 flex justify-center md:mb-20">
          <div role="tablist" aria-label="Choisissez votre cas" className="inline-flex w-full flex-col gap-1.5 rounded-[2rem] border border-gray-100 bg-[#fdfaf6] p-1.5 md:w-auto md:flex-row">
            {tabs.map(({ key, path }) => {
              const isActive = activeKey === key;
              return (
                <button
                  key={key}
                  role="tab"
                  type="button"
                  id={`tab-${key}`}
                  aria-selected={isActive}
                  aria-controls={`panel-${key}`}
                  onClick={() => {
                    setActiveKey(key);
                    setActiveStep(0);
                  }}
                  className={`group relative flex items-center gap-4 rounded-[1.75rem] px-6 py-5 text-left transition-all duration-300 active:scale-[0.98] motion-reduce:transition-none ${
                    isActive ? "bg-white shadow-[0_4px_20px_-4px_rgba(10,10,10,0.10)] ring-1 ring-black/5" : "hover:bg-white/60"
                  }`}
                >
                  <span className={`flex h-12 w-12 shrink-0 items-center justify-center rounded-xl transition-colors duration-300 ${isActive ? "bg-[#fff4ec] text-[#FF6600]" : "bg-gray-100 text-gray-400"}`}>
                    {path.tabIcon}
                  </span>
                  <span className="min-w-0">
                    <span className={`block text-sm font-bold leading-tight transition-colors duration-300 ${isActive ? "text-[#0a0a0a]" : "text-gray-500"}`}>
                      {path.tabLabel}
                    </span>
                    <span className="mt-0.5 block text-[11px] font-medium text-gray-400">{path.tabSublabel}</span>
                  </span>
                  {isActive && <span className="absolute right-3 top-3 h-1.5 w-1.5 rounded-full bg-[#FF6600]" aria-hidden="true" />}
                </button>
              );
            })}
          </div>
        </div>

        {/* PANNEAU ACTIF — re-déclenche le fondu via la clé (crossfade) */}
        <div key={activeKey} id={`panel-${activeKey}`} role="tabpanel" aria-labelledby={`tab-${activeKey}`} className="animate-fade-in">

          {/* PARCOURS INTERACTIF — deux colonnes : stepper (gauche) + image (droite) */}
          <div className="mb-6 grid grid-cols-1 items-stretch gap-12 lg:grid-cols-12 lg:gap-16">

            {/* COLONNE GAUCHE — stepper vertical (accordéon, une étape ouverte) */}
            <div className="relative lg:col-span-7">
              {/* Rail vertical (fond) — la portion au-dessus de l'étape active passe en orange */}
              <div className="absolute left-9 top-6 bottom-6 w-px bg-gray-100 md:left-10" aria-hidden="true">
                <div
                  className="absolute top-0 w-full bg-[#FF6600] transition-all duration-700 ease-in-out motion-reduce:transition-none"
                  style={{ height: `${(activeStep / (current.steps.length - 1)) * 100}%` }}
                />
              </div>

              <div className="flex flex-col gap-2 md:gap-4">
                {current.steps.map((step, idx) => {
                  const isActive = activeStep === idx;
                  return (
                    <button
                      key={step.id}
                      type="button"
                      onClick={() => setActiveStep(idx)}
                      aria-expanded={isActive}
                      className="group relative flex w-full items-start gap-6 rounded-2xl p-4 text-left transition-colors duration-300 hover:bg-[#fdfaf6]"
                    >
                      {/* Badge numéroté (motif bento) — plein orange quand actif */}
                      <span className={`relative z-10 flex h-10 w-10 shrink-0 items-center justify-center rounded-2xl border font-heading text-[13px] font-bold tracking-wide transition-all duration-300 md:h-12 md:w-12 ${
                        isActive
                          ? "border-[#FF6600] bg-[#FF6600] text-white shadow-lg shadow-orange-900/20"
                          : "border-[#FF6600]/45 bg-white text-[#FF6600] group-hover:border-[#FF6600]"
                      }`}>
                        {step.id}
                      </span>

                      <span className="flex-1 pt-1.5 md:pt-2.5">
                        <span className={`block font-heading text-xl tracking-tight transition-colors duration-300 md:text-2xl ${
                          isActive ? "font-bold text-[#0a0a0a]" : "text-gray-400 group-hover:text-gray-600"
                        }`}>
                          {step.title}
                        </span>

                        {/* Accordéon — description visible seulement pour l'étape active */}
                        <span className={`grid transition-all duration-500 ease-in-out motion-reduce:transition-none ${
                          isActive ? "mt-4 grid-rows-[1fr] opacity-100" : "grid-rows-[0fr] opacity-0"
                        }`}>
                          <span className="overflow-hidden">
                            <span className="block max-w-xl leading-relaxed text-gray-600">{step.description}</span>
                          </span>
                        </span>
                      </span>
                    </button>
                  );
                })}
              </div>
            </div>

            {/* COLONNE DROITE — tuile image dynamique (suit l'étape active) */}
            <div className="lg:col-span-5">
              <div className="lg:sticky lg:top-28">
                <div className={`group relative aspect-[4/5] min-h-[480px] overflow-hidden rounded-3xl bg-zinc-100 transition-shadow duration-300 lg:min-h-[560px] ${TILE_SHADOW}`}>
                  {/* Image — crossfade au changement d'étape (re-déclenché par la clé) */}
                  <img
                    key={activeStep}
                    src={current.steps[activeStep].image}
                    alt={current.steps[activeStep].title}
                    className="h-full w-full animate-fade-in object-cover transition-transform duration-700 ease-in-out motion-safe:group-hover:scale-105"
                  />

                  {/* Voile dégradé */}
                  <div className="absolute inset-0 bg-gradient-to-t from-black via-black/45 to-transparent" aria-hidden="true" />

                  {/* Surimpression bas — chip numérotée + titre de l'étape */}
                  <div className="absolute inset-x-0 bottom-0 p-8 text-white md:p-10">
                    <span className="mb-4 inline-flex items-center gap-2.5 rounded-full border border-white/30 bg-black/10 py-1.5 pl-2.5 pr-3.5 text-[10px] font-bold uppercase tracking-[0.18em] backdrop-blur-md">
                      <span className="text-[#FF6600]">{current.steps[activeStep].id}</span>
                      <span className="h-3 w-px bg-white/30" aria-hidden="true" />
                      <span className="text-white/90">Étape</span>
                    </span>
                    <h3 className="font-heading text-2xl font-bold leading-tight text-white md:text-3xl">
                      {current.steps[activeStep].title}
                    </h3>
                  </div>
                </div>
              </div>
            </div>
          </div>

          {/* TUILE ORANGE — bénéfice clé + CTA */}
          <div className="group relative overflow-hidden rounded-3xl bg-[#FF6600] p-10 text-white transition-transform duration-300 hover:-translate-y-1 motion-reduce:transform-none md:p-14" style={{ backgroundImage: "linear-gradient(40deg, #e85c00 0%, #FF6600 52%, #ff8a3d 100%)" }}>
            {/* Décor clippé au rayon */}
            <div className="pointer-events-none absolute inset-0 overflow-hidden rounded-3xl" aria-hidden="true">
              <div className="absolute -right-24 top-1/2 h-[380px] w-[380px] -translate-y-1/2 rounded-full border border-white/20" />
              <div className="absolute -right-12 top-1/2 h-[290px] w-[290px] -translate-y-1/2 rounded-full border border-white/20" />
              <div className="absolute right-4 top-1/2 h-[210px] w-[210px] -translate-y-1/2 rounded-full border border-white/20" />
              <div className="absolute right-16 top-1/2 h-[140px] w-[140px] -translate-y-1/2 rounded-full border border-white/20" />
              <div className="absolute right-1/4 top-1/4 h-40 w-40 rounded-full bg-white/10 blur-3xl" />
              <svg viewBox="0 0 24 24" fill="currentColor" className="absolute right-10 top-8 h-6 w-6 text-white/40" aria-hidden="true">
                <path d="M12 2 14 10 22 12 14 14 12 22 10 14 2 12 10 10Z" />
              </svg>
            </div>

            <div className="relative z-10 flex flex-col items-start justify-between gap-8 md:flex-row md:items-center">
              <div className="max-w-xl">
                <span className="inline-flex items-center gap-2 text-[11px] font-bold uppercase tracking-[0.18em] text-white/80">
                  <svg viewBox="0 0 24 24" fill="currentColor" className="h-3.5 w-3.5" aria-hidden="true">
                    <path d="M12 2 14 10 22 12 14 14 12 22 10 14 2 12 10 10Z" />
                  </svg>
                  Bénéfice clé
                </span>
                <h3 className="mt-4 font-heading text-3xl font-bold leading-tight md:text-4xl">{current.benefitTitle}</h3>
                <p className="mt-4 text-lg text-white/85">{current.benefitText}</p>
              </div>

              <a
                href={current.ctaHref}
                className="group inline-flex shrink-0 items-center gap-3 rounded-full bg-white px-8 py-4 font-semibold text-[#FF6600] shadow-xl shadow-orange-900/20 transition-all duration-300 hover:scale-105 active:scale-95 motion-reduce:transform-none"
              >
                {current.ctaLabel}
                <ArrowIcon className="h-5 w-5" />
              </a>
            </div>
          </div>
        </div>

        {/* PIED — CTA communs */}
        <div className="mt-16 flex flex-col items-center justify-center gap-8 sm:flex-row">
          <a
            href={finalPrimaryHref}
            className="group inline-flex items-center gap-3 rounded-full bg-[#FF6600] px-10 py-5 font-semibold text-white shadow-xl shadow-orange-900/10 transition-all duration-300 hover:bg-[#e85c00] active:scale-95 motion-reduce:transition-none"
          >
            {finalPrimaryLabel}
            <ArrowIcon className="h-5 w-5" />
          </a>

          <a
            href={finalSecondaryHref}
            className="group inline-flex items-center gap-2 font-semibold text-[#FF6600] underline decoration-[#FF6600]/40 underline-offset-4 transition-all hover:decoration-[#FF6600]"
          >
            {finalSecondaryLabel}
            <ArrowIcon className="h-[18px] w-[18px]" />
          </a>
        </div>

      </div>
    </section>
  );
}
