import { useState, useRef, useEffect, type ReactNode } from "react";
import Eyebrow from "./Eyebrow";

/* Ombre canonique des tuiles — deux couches grises neutres (contact net +
   diffusion large), renforcées au survol. */
const TILE_SHADOW =
  "shadow-[0_2px_8px_-3px_rgba(10,10,10,0.10),0_22px_48px_-18px_rgba(10,10,10,0.14)] hover:shadow-[0_4px_12px_-3px_rgba(10,10,10,0.14),0_32px_64px_-20px_rgba(10,10,10,0.20)]";

/* Dégradé diagonal orange de marque — pastille d'icône de l'onglet actif. */
const BRAND_DIAGONAL = {
  backgroundImage: "linear-gradient(40deg, #e85c00 0%, #FF6600 52%, #ff8a3d 100%)",
};

/* Mesh gradient orange de marque — pastille d'icône identique à celles des méga-menus
   (Navbar : SectorLink / UsageLink). Réutilisée ici pour les pastilles des bénéfices. */
const MESH_BRAND = {
  backgroundColor: "#ff6600",
  backgroundImage:
    "radial-gradient(at 15% 18%, #ff8040 0px, transparent 50%)," +
    "radial-gradient(at 85% 12%, #ffc7a0 0px, transparent 42%)," +
    "radial-gradient(at 92% 60%, #ff7c2a 0px, transparent 46%)," +
    "radial-gradient(at 12% 92%, #ee6000 0px, transparent 52%)," +
    "radial-gradient(at 50% 50%, #ff741c 0px, transparent 55%)",
};

/* Fond de section — gris clair neutre, léger, pour détacher la section du blanc
   dominant des sections voisines sans bruit coloré. */
const SECTION_BG = {
  backgroundColor: "#f4f4f5",
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
  /** Meilleurs secteurs concernés par ce cas d'usage (étiquettes). */
  sectors: string[];
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
      { title: "Plus de contacts qualifiés", description: "Une annonce enrichie d'une visite 360° est consultée bien plus longtemps qu'une simple galerie photo. Vos prospects explorent chaque espace à leur rythme, prennent confiance et vous laissent des coordonnées déjà engagées : vous récoltez davantage de demandes, et de meilleure qualité." },
      { title: "Visites mieux ciblées", description: "En découvrant le bien en ligne dans ses moindres détails, les curieux se filtrent d'eux-mêmes. Résultat : seuls les acheteurs réellement convaincus demandent une visite physique, ce qui réduit drastiquement les rendez-vous sans suite et vous fait gagner un temps précieux." },
      { title: "Image de marque premium", description: "La visite immersive positionne immédiatement votre offre dans le haut de gamme. Vous projetez une image moderne, soignée et innovante qui vous démarque de la concurrence et valorise chaque espace présenté, du studio au bien d'exception." },
    ],
    sectors: ["Immobilier", "Hôtellerie & restauration", "Tourisme", "Commerces et services"],
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
      { title: "Des prospects pré-qualifiés", description: "Acheteurs et locataires se projettent à distance, 24h/24, sans rendez-vous. Quand ils vous contactent, ils connaissent déjà le bien et ont une intention claire : vous échangez avec des prospects mûrs et motivés, plutôt qu'avec de simples curieux." },
      { title: "Moins de visites inutiles", description: "Les visiteurs hésitants lèvent leurs doutes en ligne avant de se déplacer. Vous évitez les visites « pour voir » et concentrez votre agenda sur des rendez-vous à fort potentiel de signature, sans déplacement superflu." },
      { title: "Du temps gagné", description: "Fini les déplacements en série et les visites répétées. Vous guidez vos prospects en visio directement depuis la visite virtuelle et réservez votre temps aux dossiers les plus sérieux : un cycle de vente nettement plus court." },
    ],
    sectors: ["Immobilier", "Rénovation", "Commerces et services"],
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
      { title: "Cotes fidèles au réel", description: "Chaque scan 360° embarque les mesures de l'espace. Vous obtenez des plans cotés directement exploitables pour un devis, un projet d'aménagement ou une étude technique, sans approximation ni allers-retours sur site." },
      { title: "Aucun relevé manuel", description: "Plus besoin de repasser mètre en main : le plan 2D est généré automatiquement à partir de la captation, en quelques clics. Vous économisez des heures de relevé et supprimez le risque d'erreur de saisie." },
      { title: "Export & partage", description: "Diffusez vos plans aux artisans, architectes, assureurs ou clients dans les formats courants. Tout le monde travaille sur la même base fiable, à jour et partageable en un simple lien." },
    ],
    sectors: ["Rénovation", "Immobilier", "Industrie"],
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
      { title: "Apprendre par la pratique", description: "Vos collaborateurs explorent les lieux et les postes de travail avant même d'y mettre les pieds. L'apprentissage est plus rapide, plus concret et moins stressant le jour de la prise de poste réelle." },
      { title: "Procédures de sécurité", description: "Repérez en immersion les zones sensibles, les issues de secours et les consignes à respecter. Idéal pour former aux risques et aux gestes de sécurité sans immobiliser ni exposer le site réel." },
      { title: "Reproductible à l'infini", description: "Une fois la visite créée, elle forme un nombre illimité de personnes, partout, avec exactement le même niveau d'information. Vous garantissez une montée en compétence homogène sur l'ensemble de vos sites et de vos équipes." },
    ],
    sectors: ["Industrie", "Santé & bien-être", "Éducation"],
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
      { title: "Des candidats qui se projettent", description: "Vos futurs talents découvrent leur environnement de travail, l'ambiance et les espaces communs avant même l'entretien. Ils arrivent plus motivés, déjà rassurés sur le cadre, et votre processus de recrutement gagne en fluidité." },
      { title: "Recrutement à distance facilité", description: "Présentez vos locaux à des candidats éloignés sans organiser de déplacement. Vous élargissez votre vivier de talents au-delà de votre bassin local tout en accélérant chaque étape, du premier contact à l'embauche." },
      { title: "Une image authentique", description: "Montrez vos vrais espaces, sans mise en scène ni artifice. Cette transparence renforce la confiance, valorise votre culture d'entreprise et attire des profils réellement en phase avec votre quotidien." },
    ],
    sectors: ["Industrie", "Hôtellerie & restauration", "Santé & bien-être"],
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
      { title: "Navigation libre et intuitive", description: "Vos visiteurs explorent vos espaces quand ils le souhaitent, depuis un ordinateur, une tablette ou un smartphone. Une expérience fluide et sans barrière, accessible 24h/24 partout dans le monde, sans installation." },
      { title: "Contenus enrichis intégrés", description: "Ajoutez directement dans la visite des points d'intérêt, des fiches produits, des vidéos et des liens. Chaque détail devient interactif et transforme une simple visite en véritable parcours de découverte guidé." },
      { title: "Une image résolument moderne", description: "Adopter la visite 360° enrichie, c'est afficher une longueur d'avance technologique. Vous marquez les esprits, créez un effet « waouh » mémorable et ancrez votre marque comme innovante et tournée vers l'avenir." },
    ],
    sectors: ["Culture", "Tourisme", "Commerces et services", "Hôtellerie & restauration"],
    image: "https://picsum.photos/seed/ev-experience/800/1000",
  },
];

/* Accordéon des bénéfices — sous-cartes crème dépliables (une seule ouverte à la fois,
   la première par défaut ; cliquer une carte ouverte la referme). Rendu À L'INTÉRIEUR du
   panneau actif : comme ce panneau se remonte à chaque changement d'onglet (key={current.id}),
   l'état `openIndex` se réinitialise tout seul sur le 1er point. */
function Benefits({ points }: { points: Point[] }) {
  const [openIndex, setOpenIndex] = useState(0);

  return (
    <div className="mt-8 space-y-4">
      {points.map((point, i) => {
        const isOpen = openIndex === i;
        return (
          <div
            key={point.title}
            className="group rounded-2xl border border-transparent bg-white shadow-[0_2px_8px_-3px_rgba(10,10,10,0.10),0_22px_48px_-18px_rgba(10,10,10,0.14)] transition-all duration-300 hover:-translate-y-0.5 hover:border-[#ff8533]/60 hover:shadow-[0_22px_50px_-16px_rgba(255,102,0,0.35)] motion-reduce:transition-none motion-reduce:hover:transform-none"
          >
            {/* En-tête cliquable — pastille mesh + coche, titre, chevron pivotant.
               Surface calquée sur FeatureCard ; effet de survol calqué sur les items des
               méga-menus (SectorLink/UsageLink) : lift + bordure + ombre orange portés par
               la carte (group), pastille qui scale, titre qui passe en orange. */}
            <button
              type="button"
              onClick={() => setOpenIndex(isOpen ? -1 : i)}
              className="flex w-full items-center gap-4 rounded-2xl p-4 text-left focus:outline-none focus-visible:ring-2 focus-visible:ring-[#FF6600]/40 focus-visible:ring-offset-2 focus-visible:ring-offset-white"
              aria-expanded={isOpen}
              aria-controls={`benefit-content-${i}`}
              id={`benefit-header-${i}`}
            >
              <span
                className="flex h-11 w-11 shrink-0 items-center justify-center rounded-xl text-white transition-transform duration-300 group-hover:scale-105 motion-reduce:transition-none motion-reduce:group-hover:transform-none"
                style={MESH_BRAND}
              >
                <svg className="h-5 w-5" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="3" strokeLinecap="round" strokeLinejoin="round" aria-hidden="true">
                  <polyline points="20 6 9 17 4 12" />
                </svg>
              </span>
              <span className="flex-1 font-heading text-[15px] font-bold leading-tight text-[#0a0a0a] transition-colors duration-300 group-hover:text-[#FF6600]">
                {point.title}
              </span>
              <svg
                className={`h-5 w-5 shrink-0 text-[#FF6600] transition-transform duration-300 motion-reduce:transition-none ${isOpen ? "rotate-180" : ""}`}
                viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.5" strokeLinecap="round" strokeLinejoin="round" aria-hidden="true"
              >
                <polyline points="6 9 12 15 18 9" />
              </svg>
            </button>

            {/* Corps repliable — transition de hauteur fluide via grid-rows 0fr↔1fr */}
            <div
              id={`benefit-content-${i}`}
              role="region"
              aria-labelledby={`benefit-header-${i}`}
              className={`grid transition-all duration-300 ease-in-out motion-reduce:transition-none ${isOpen ? "grid-rows-[1fr] opacity-100" : "grid-rows-[0fr] opacity-0"}`}
            >
              <div className="overflow-hidden">
                <div className="px-4 pb-4">
                  <p className="-mt-1 ml-[3.75rem] text-[13px] leading-relaxed text-gray-600">{point.description}</p>
                </div>
              </div>
            </div>
          </div>
        );
      })}
    </div>
  );
}

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

  /* Sélecteur mobile (menu déroulant) — état d'ouverture + fermeture au clic
     extérieur / touche Échap. Inactif sur desktop (le dropdown est `md:hidden`). */
  const [isMenuOpen, setMenuOpen] = useState(false);
  const menuRef = useRef<HTMLDivElement>(null);
  useEffect(() => {
    if (!isMenuOpen) return;
    function onPointerDown(event: PointerEvent) {
      if (menuRef.current && !menuRef.current.contains(event.target as Node)) {
        setMenuOpen(false);
      }
    }
    function onKeyDown(event: KeyboardEvent) {
      if (event.key === "Escape") setMenuOpen(false);
    }
    document.addEventListener("pointerdown", onPointerDown);
    document.addEventListener("keydown", onKeyDown);
    return () => {
      document.removeEventListener("pointerdown", onPointerDown);
      document.removeEventListener("keydown", onKeyDown);
    };
  }, [isMenuOpen]);

  return (
    <section id="cas-dusages" className="overflow-hidden py-16 md:py-24 lg:py-32" style={SECTION_BG}>
      <div className="mx-auto w-full max-w-[var(--container)] px-6 sm:px-8">

        {/* EN-TÊTE DE SECTION (aligné à gauche — motif bento canonique) */}
        <div className="mb-8 max-w-4xl text-left md:mb-10">
          <Eyebrow>{eyebrow}</Eyebrow>
          <h2 className="mt-4 font-heading text-4xl font-bold leading-[1.05] tracking-tight text-[#0a0a0a] md:text-5xl lg:text-6xl">
            {titlePart1}
            <span className="font-cooper text-[#FF6600]">{titleHighlight}</span>
            {titlePart2}
          </h2>
          <p className="mt-8 max-w-2xl text-lg leading-relaxed text-gray-600">{intro}</p>
        </div>

        {/* SÉLECTEUR — mobile : menu déroulant (choix manuel) · desktop : pills */}
        <div className="mb-8 flex justify-center md:mb-10">

          {/* SÉLECTEUR MOBILE — menu déroulant (dropdown). Pilote le même état
              `activeId` que les pills desktop ; visible uniquement sous `md`. */}
          <div className="relative w-full md:hidden" ref={menuRef}>
            {/* Bouton déclencheur — affiche le cas d'usage actif */}
            <button
              type="button"
              onClick={() => setMenuOpen(!isMenuOpen)}
              aria-haspopup="listbox"
              aria-expanded={isMenuOpen}
              className="flex w-full items-center justify-between gap-4 rounded-2xl border border-[#e5e7eb] bg-white p-4 text-left shadow-[0_2px_8px_-3px_rgba(10,10,10,0.10),0_22px_48px_-18px_rgba(10,10,10,0.14)] transition-all duration-300 active:scale-[0.98] motion-reduce:transition-none"
            >
              <span className="flex items-center gap-4">
                <span className="flex h-10 w-10 shrink-0 items-center justify-center rounded-xl bg-[#fff4ec] text-[#FF6600] [&>svg]:h-5 [&>svg]:w-5">
                  {current.icon}
                </span>
                <span className="font-heading text-base font-bold text-[#0a0a0a]">{current.tabLabel}</span>
              </span>
              <svg
                viewBox="0 0 24 24"
                fill="none"
                stroke="currentColor"
                strokeWidth="2.5"
                strokeLinecap="round"
                strokeLinejoin="round"
                className={`h-5 w-5 shrink-0 text-[#FF6600] transition-transform duration-300 motion-reduce:transition-none ${isMenuOpen ? "rotate-180" : "rotate-0"}`}
                aria-hidden="true"
              >
                <polyline points="6 9 12 15 18 9" />
              </svg>
            </button>

            {/* Panneau déroulant — liste de tous les cas d'usage */}
            {isMenuOpen && (
              <div
                role="listbox"
                aria-label="Choisissez un cas d'usage"
                className="absolute left-0 top-full z-50 mt-3 w-full overflow-hidden rounded-2xl border border-[#e5e7eb] bg-white shadow-[0_4px_12px_-3px_rgba(10,10,10,0.14),0_32px_64px_-20px_rgba(10,10,10,0.20)] motion-safe:animate-dropdown-in"
              >
                <div className="max-h-[60vh] overflow-y-auto py-2">
                  {useCases.map((uc) => {
                    const isActive = activeId === uc.id;
                    return (
                      <button
                        key={uc.id}
                        role="option"
                        type="button"
                        aria-selected={isActive}
                        onClick={() => {
                          setActiveId(uc.id);
                          setMenuOpen(false);
                        }}
                        className={`flex w-full items-center justify-between gap-4 px-4 py-3 text-left transition-colors duration-200 motion-reduce:transition-none ${
                          isActive ? "bg-[#fff4ec]" : "hover:bg-gray-50 active:bg-gray-100"
                        }`}
                      >
                        <span className="flex items-center gap-4">
                          <span
                            className={`flex h-9 w-9 shrink-0 items-center justify-center rounded-lg transition-colors duration-200 [&>svg]:h-5 [&>svg]:w-5 ${
                              isActive ? "bg-[#FF6600] text-white" : "bg-[#fff4ec] text-[#FF6600]"
                            }`}
                          >
                            {uc.icon}
                          </span>
                          <span className={`text-sm font-semibold ${isActive ? "text-[#0a0a0a]" : "text-gray-700"}`}>
                            {uc.tabLabel}
                          </span>
                        </span>
                        {isActive && (
                          <svg
                            viewBox="0 0 24 24"
                            fill="none"
                            stroke="currentColor"
                            strokeWidth="3"
                            strokeLinecap="round"
                            strokeLinejoin="round"
                            className="h-4 w-4 shrink-0 text-[#FF6600]"
                            aria-hidden="true"
                          >
                            <polyline points="20 6 9 17 4 12" />
                          </svg>
                        )}
                      </button>
                    );
                  })}
                </div>
              </div>
            )}
          </div>

          {/* SÉLECTEUR DESKTOP — pills d'onglets (masquées sous `md`) */}
          <div
            role="tablist"
            aria-label="Choisissez un cas d'usage"
            className="hidden flex-wrap justify-center gap-1.5 rounded-[2rem] border border-gray-100 bg-[#fdfaf6] p-1.5 md:flex"
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
                  onMouseEnter={() => setActiveId(uc.id)}
                  onFocus={() => setActiveId(uc.id)}
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
          className="grid animate-fade-in grid-cols-1 items-stretch gap-8 lg:grid-cols-12 lg:gap-10"
        >
          {/* COLONNE GAUCHE — texte + bénéfices + CTA, posée sur une carte blanche
             (motif canonique « +30 agences » : bg blanc + ombre des tuiles qui se
             renforce au survol, cf. AboutBento TUILE 3). */}
          <div className={`flex h-full flex-col justify-center rounded-2xl bg-white p-6 transition-shadow duration-300 md:p-8 lg:col-span-7 lg:p-10 xl:col-span-6 ${TILE_SHADOW}`}>
            {/* Icône du cas d'usage actif — chip d'icônes canonique, répétée au-dessus
               du titre de la carte (même icône que la pill d'onglet / le chip image). */}
            <span className="mb-5 flex h-14 w-14 items-center justify-center rounded-2xl bg-[#fff4ec] text-[#FF6600] [&>svg]:h-7 [&>svg]:w-7">
              {current.icon}
            </span>
            <h3 className="font-heading text-3xl font-bold leading-tight tracking-tight text-[#0a0a0a] md:text-4xl">
              {current.headline}
            </h3>
            <p className="mt-4 text-lg leading-relaxed text-gray-600">{current.description}</p>

            {/* BÉNÉFICES — accordéon de sous-cartes dépliables (cf. composant Benefits) */}
            <Benefits points={current.points} />

            {/* ÉTIQUETTES — meilleurs secteurs concernés par le cas d'usage actif
               (déplacées sous les bénéfices). */}
            <div className="mt-7">
              <p className="mb-3 text-[10px] font-bold uppercase tracking-[0.18em] text-gray-500">
                Secteurs concernés
              </p>
              <div className="flex flex-wrap gap-2">
                {current.sectors.map((sector) => (
                  <div
                    key={sector}
                    className="group inline-flex items-center gap-2 rounded-full border border-gray-200 bg-[#fdfaf6] px-3.5 py-1.5 transition-all duration-300 hover:-translate-y-0.5 hover:border-[#FF6600]/30 hover:bg-[#fff4ec] motion-reduce:transition-none motion-reduce:hover:translate-y-0"
                  >
                    <span className="h-1.5 w-1.5 shrink-0 rounded-full bg-[#FF6600] transition-transform duration-300 group-hover:scale-125 motion-reduce:transition-none" />
                    <span className="text-[13px] font-semibold text-gray-700 transition-colors duration-300 group-hover:text-[#FF6600]">
                      {sector}
                    </span>
                  </div>
                ))}
              </div>
            </div>

            <div className="mt-8 flex flex-wrap items-center gap-6">
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
            <div className={`group relative h-full min-h-[340px] overflow-hidden rounded-3xl bg-zinc-100 transition-shadow duration-300 md:min-h-[480px] lg:min-h-[560px] ${TILE_SHADOW}`}>
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
