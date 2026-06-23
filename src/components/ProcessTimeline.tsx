import { useEffect, useRef, useState, type ReactNode } from "react";
import Eyebrow from "./Eyebrow";
import ContactBear from "./ContactBear";

/* ------------------------------------------------------------------ *
 * Section « Comment ça se passe » — expérience SCROLL-SNAP plein écran.
 *
 * Scène épinglée (sticky) sur fond orange, qui « remonte par-dessus » la
 * section précédente (coins arrondis + ombre haute) :
 *  - EN-TÊTE (toujours visible) : H2 + sélecteur des 2 cas d'usage + une
 *    BARRE D'ÉTAPES cliquable (unique fil de progression).
 *  - SLIDES : chaque étape est une CARTE autonome (photo + texte groupés)
 *    qui glisse horizontalement au scroll ; une carte de CLÔTURE (bénéfice
 *    + CTA) termine le parcours.
 *
 * Le scroll vertical pilote `progress` (0→1) ; snap mandatory sur chaque
 * panneau. Respecte prefers-reduced-motion (pile verticale, sans pin).
 *
 * Séparation : <SlideStage> = PRÉSENTATIONNEL (markup/design) ;
 * <ProcessTimeline> = ÎLOT (scroll, snap, état d'onglet, saut d'étape).
 * ------------------------------------------------------------------ */

/* CTA d'étape (ex. « prise de contact » : formulaire + appel). `primary` =
   bouton blanc plein sur l'orange ; `secondary` = contour blanc. */
export type StepAction = {
  label: string;
  href: string;
  kind: "primary" | "secondary";
  icon: ReactNode;
};

export type StepView = {
  id: string; // "01".."05"
  title: string;
  description: string;
  note?: string; // note bas de carte (astérisque) affichée sous la description
  image: string; // photo (placeholder ; branchable Sanity plus tard)
  icon: ReactNode;
  actions?: StepAction[]; // CTA optionnels affichés sous la description
  logos?: { name: string; node: ReactNode }[]; // logos « visio » (Teams, Meet…) sous la description
  gallery?: string[]; // si présent : remplace l'ours par un marquee de portraits (franchisés)
};

export type ProcessPath = {
  key: "single" | "multi";
  tabLabel: string;
  tabSublabel: string;
  tabIcon: ReactNode;
  steps: StepView[];
};

/* ----- Icônes SVG inline (aucune dépendance externe) ----- */
const ICONS = {
  home: (
    <svg width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" aria-hidden="true">
      <path d="M3 9l9-7 9 7v11a2 2 0 0 1-2 2H5a2 2 0 0 1-2-2z" /><polyline points="9 22 9 12 15 12 15 22" />
    </svg>
  ),
  map: (
    <svg width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" aria-hidden="true">
      <polygon points="1 6 1 22 8 18 16 22 23 18 23 2 16 6 8 2 1 6" /><line x1="8" y1="2" x2="8" y2="18" /><line x1="16" y1="6" x2="16" y2="22" />
    </svg>
  ),
  phone: (
    <svg width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" aria-hidden="true">
      <path d="M22 16.92v3a2 2 0 0 1-2.18 2 19.79 19.79 0 0 1-8.63-3.07 19.5 19.5 0 0 1-6-6 19.79 19.79 0 0 1-3.07-8.67A2 2 0 0 1 4.11 2h3a2 2 0 0 1 2 1.72 12.84 12.84 0 0 0 .7 2.81 2 2 0 0 1-.45 2.11L8.09 9.91a16 16 0 0 0 6 6l1.27-1.27a2 2 0 0 1 2.11-.45 12.84 12.84 0 0 0 2.81.7A2 2 0 0 1 22 16.92z" />
    </svg>
  ),
  form: (
    <svg width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" aria-hidden="true">
      <path d="M14 2H6a2 2 0 0 0-2 2v16a2 2 0 0 0 2 2h12a2 2 0 0 0 2-2V8z" /><polyline points="14 2 14 8 20 8" /><line x1="16" y1="13" x2="8" y2="13" /><line x1="16" y1="17" x2="8" y2="17" /><polyline points="10 9 9 9 8 9" />
    </svg>
  ),
  camera: (
    <svg width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" aria-hidden="true">
      <path d="M23 19a2 2 0 0 1-2 2H3a2 2 0 0 1-2-2V8a2 2 0 0 1 2-2h4l2-3h6l2 3h4a2 2 0 0 1 2 2z" /><circle cx="12" cy="13" r="4" />
    </svg>
  ),
  pencil: (
    <svg width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" aria-hidden="true">
      <path d="M17 3a2.828 2.828 0 1 1 4 4L7.5 20.5 2 22l1.5-5.5L17 3z" />
    </svg>
  ),
  upload: (
    <svg width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" aria-hidden="true">
      <path d="M21 15v4a2 2 0 0 1-2 2H5a2 2 0 0 1-2-2v-4" /><polyline points="17 8 12 3 7 8" /><line x1="12" y1="3" x2="12" y2="15" />
    </svg>
  ),
  list: (
    <svg width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" aria-hidden="true">
      <line x1="8" y1="6" x2="21" y2="6" /><line x1="8" y1="12" x2="21" y2="12" /><line x1="8" y1="18" x2="21" y2="18" /><line x1="3" y1="6" x2="3.01" y2="6" /><line x1="3" y1="12" x2="3.01" y2="12" /><line x1="3" y1="18" x2="3.01" y2="18" />
    </svg>
  ),
  users: (
    <svg width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" aria-hidden="true">
      <path d="M17 21v-2a4 4 0 0 0-4-4H5a4 4 0 0 0-4 4v2" /><circle cx="9" cy="7" r="4" /><path d="M23 21v-2a4 4 0 0 0-3-3.87" /><path d="M16 3.13a4 4 0 0 1 0 7.75" />
    </svg>
  ),
  calendar: (
    <svg width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" aria-hidden="true">
      <rect x="3" y="4" width="18" height="18" rx="2" ry="2" /><line x1="16" y1="2" x2="16" y2="6" /><line x1="8" y1="2" x2="8" y2="6" /><line x1="3" y1="10" x2="21" y2="10" />
    </svg>
  ),
  monitor: (
    <svg width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" aria-hidden="true">
      <rect x="2" y="3" width="20" height="14" rx="2" ry="2" /><line x1="8" y1="21" x2="16" y2="21" /><line x1="12" y1="17" x2="12" y2="21" />
    </svg>
  ),
};

/* ----- Logos visio (SVG inline, aucune dépendance ; même esprit que GoogleG) ----- */
function TeamsLogo({ className = "h-full w-full" }: { className?: string }) {
  return (
    <svg viewBox="0 0 32 32" className={className} role="img" aria-label="Microsoft Teams">
      <circle cx="22.5" cy="8" r="4" fill="#7B83EB" />
      <path d="M21.5 12h6.2A1.3 1.3 0 0 1 29 13.3v5.5a4.4 4.4 0 0 1-7.5 3z" fill="#5B5FC7" />
      <rect x="3.5" y="8.5" width="18" height="18" rx="3.2" fill="#5059C9" />
      <path d="M7.8 12.8h9v2.5h-3.1v6h-2.8v-6H7.8z" fill="#fff" />
    </svg>
  );
}
function MeetLogo({ className = "h-full w-full" }: { className?: string }) {
  return (
    <svg viewBox="0 0 32 32" className={className} role="img" aria-label="Google Meet">
      <path d="M5 10.5A2.5 2.5 0 0 1 7.5 8H18v16H7.5A2.5 2.5 0 0 1 5 21.5z" fill="#2684FC" />
      <path d="M18 8h-6v16h6z" fill="#00AC47" />
      <path d="M18 8l5 4.2V8z" fill="#EA4335" />
      <path d="M18 24v-4.2l5 4.2z" fill="#FFBA00" />
      <path d="M18 12.2 27 8.5v15L18 19.8z" fill="#00832D" />
    </svg>
  );
}

/* Parcours A — prestation ponctuelle (one-shot) pour un seul lieu. */
const SINGLE_PATH: ProcessPath = {
  key: "single",
  tabLabel: "Une visite virtuelle",
  tabSublabel: "Pour votre bien, votre école, votre ERP…",
  tabIcon: ICONS.home,
  steps: [
    {
      id: "01",
      title: "Vous nous contactez",
      description: "Un formulaire ou un appel, comme vous préférez. On vous recontacte sous 24 h pour comprendre votre projet.",
      image: "/01easy.png",
      icon: ICONS.phone,
      actions: [
        { label: "Remplir le formulaire", href: "#contact", kind: "primary", icon: ICONS.form },
        { label: "Nous appeler", href: "tel:+33000000000", kind: "secondary", icon: ICONS.phone },
      ],
    },
    {
      id: "02",
      title: "On se rencontre",
      description: "En visio ou en physique, on échange pour établir votre cahier des charges et vous remettre un devis clair. Un second rendez-vous si le projet le demande.",
      image: "/02easy.png",
      icon: ICONS.calendar,
      logos: [
        { name: "Microsoft Teams", node: <TeamsLogo /> },
        { name: "Google Meet", node: <MeetLogo /> },
      ],
    },
    {
      id: "03",
      title: "On se déplace chez vous",
      description: "Votre représentant local vient sur place et numérise votre lieu en 3D. Vous n'avez rien à préparer : on s'occupe de tout.",
      image: "/03easy.png",
      icon: ICONS.camera,
      // TODO: remplacer par les vraies photos de franchisés (déposer dans public/franchises/).
      gallery: ["/didier.png", "/didier.png", "/didier.png", "/didier.png", "/didier.png", "/didier.png"],
    },
    {
      id: "04",
      title: "On vous livre votre visite virtuelle en 48 h",
      description: "Elle est en ligne sous 48 h : un lien à partager, un embed pour votre site, l'hébergement inclus. On reste ensuite à vos côtés, avec conseils et accompagnement, pour en faire un véritable outil de performance.",
      image: "/04easy.png",
      icon: ICONS.upload,
    },
  ],
};

/* Parcours B — déploiement multi-sites national pour grands comptes. */
const MULTI_PATH: ProcessPath = {
  key: "multi",
  tabLabel: "Plusieurs visites partout en France",
  tabSublabel: "Réseau, multi-sites, grands comptes",
  tabIcon: ICONS.map,
  steps: [
    { id: "01", title: "Cadrage multi-sites", description: "On audite votre parc (agences, magasins, campus…) et on construit un plan de déploiement national.", image: "/easybear.png", icon: ICONS.list },
    { id: "02", title: "Réseau de franchisés", description: "Nos franchisés certifiés couvrent toute la France : un interlocuteur local par zone, des standards identiques partout.", image: "/easybear.png", icon: ICONS.users },
    { id: "03", title: "Captations coordonnées", description: "On planifie et réalise les captations en parallèle sur tous vos sites, avec un suivi centralisé.", image: "/easybear.png", icon: ICONS.calendar },
    { id: "04", title: "Plateforme centralisée", description: "Toutes vos visites réunies dans un espace de marque unique, avec statistiques et gestion des accès.", image: "/easybear.png", icon: ICONS.monitor },
  ],
};

/* Course de scroll allouée à CHAQUE transition de panneau, en vh. Hauteur
   totale = (totalPanels-1)*STEP_VH + 100vh ; ancres de snap tous les STEP_VH. */
const STEP_VH = 120;
/* Après l'étape 4, la scène reste épinglée : l'ours TIRE la carte CTA vers le
   haut (phase « pull »), puis elle reste affichée le temps du clin d'œil (phase
   « rest »). Course de scroll de chaque phase, en vh. */
const PULL_VH = 80;
const REST_VH = 80;

/* Dégradé diagonal orange de marque — fond de la section. */
const BRAND_DIAGONAL = { backgroundImage: "linear-gradient(40deg, #e85c00 0%, #FF6600 52%, #ff8a3d 100%)" };

/* La section « remonte par-dessus » la précédente (coins arrondis + ombre haute). */
const RISE_OVER = "relative z-10 -mt-8 overflow-clip rounded-t-[2rem] shadow-[0_-24px_70px_-24px_rgba(10,10,10,0.28)] lg:-mt-12 lg:rounded-t-[2.5rem]";

const ArrowIcon = ({ className = "" }: { className?: string }) => (
  <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.5" strokeLinecap="round" strokeLinejoin="round" className={className} aria-hidden="true">
    <line x1="5" y1="12" x2="19" y2="12" /><polyline points="12 5 19 12 12 19" />
  </svg>
);

/* CTA d'une étape (présentationnel) — sur fond orange : bouton blanc plein
   (`primary`, flèche qui glisse) + contour blanc (`secondary`). */
function StepActions({ actions, className = "" }: { actions: StepAction[]; className?: string }) {
  return (
    <div className={`flex flex-wrap items-center gap-4 ${className}`}>
      {actions.map((action) =>
        action.kind === "primary" ? (
          <a
            key={action.label}
            href={action.href}
            className="group inline-flex items-center gap-2.5 rounded-full bg-white px-7 py-3.5 text-base font-semibold text-[#FF6600] shadow-xl shadow-orange-900/20 transition-all duration-300 hover:-translate-y-0.5 active:scale-95 motion-reduce:transition-none motion-reduce:transform-none"
          >
            <span className="h-5 w-5">{action.icon}</span>
            <span>{action.label}</span>
            <ArrowIcon className="h-4 w-4 transition-transform duration-300 group-hover:translate-x-1 motion-reduce:transform-none" />
          </a>
        ) : (
          <a
            key={action.label}
            href={action.href}
            className="inline-flex items-center gap-2.5 rounded-full border border-white/40 px-7 py-3.5 text-base font-semibold text-white transition-all duration-300 hover:bg-white/10 active:scale-95 motion-reduce:transition-none"
          >
            <span className="h-5 w-5">{action.icon}</span>
            <span>{action.label}</span>
          </a>
        )
      )}
    </div>
  );
}

/* Sélecteur des 2 parcours (segmented control — motif bento). */
function PathTabs({ paths, activeKey, onChange }: { paths: ProcessPath[]; activeKey: "single" | "multi"; onChange: (k: "single" | "multi") => void }) {
  return (
    <div role="tablist" aria-label="Choisissez votre parcours" className="inline-flex w-full flex-col gap-1.5 rounded-[2rem] border border-gray-100 bg-[#fdfaf6] p-1.5 sm:w-auto sm:flex-row">
      {paths.map((p) => {
        const isActive = activeKey === p.key;
        return (
          <button
            key={p.key}
            role="tab"
            type="button"
            aria-selected={isActive}
            onClick={() => onChange(p.key)}
            className={`group relative flex items-center gap-3 rounded-[1.75rem] px-5 py-3 text-left outline-none transition-all duration-300 active:scale-[0.98] motion-reduce:transition-none ${
              isActive ? "bg-white shadow-[0_4px_20px_-4px_rgba(10,10,10,0.10)] ring-1 ring-black/5" : "hover:bg-white/60"
            }`}
          >
            <span className={`flex h-10 w-10 shrink-0 items-center justify-center rounded-xl transition-colors duration-300 ${isActive ? "bg-[#fff4ec] text-[#FF6600]" : "bg-gray-100 text-gray-400 group-hover:text-gray-600"}`}>
              <span className="h-5 w-5">{p.tabIcon}</span>
            </span>
            <span className="min-w-0">
              <span className={`block text-sm font-bold leading-tight transition-colors duration-300 ${isActive ? "text-[#0a0a0a]" : "text-gray-500"}`}>{p.tabLabel}</span>
              <span className="mt-0.5 block text-[11px] font-medium text-gray-400">{p.tabSublabel}</span>
            </span>
            {isActive && <span className="absolute right-2.5 top-2.5 h-1.5 w-1.5 rounded-full bg-[#FF6600]" aria-hidden="true" />}
          </button>
        );
      })}
    </div>
  );
}

/* Ligne de logos « visio » (Teams, Meet…) — chips blanches lisibles sur l'orange. */
function LogosRow({ logos, className = "" }: { logos: { name: string; node: ReactNode }[]; className?: string }) {
  return (
    <div className={`flex flex-wrap items-center gap-2.5 ${className}`}>
      <span className="text-xs font-semibold uppercase tracking-[0.16em] text-white/70">En visio via</span>
      {logos.map((logo) => (
        <span key={logo.name} className="inline-flex items-center gap-2 rounded-full bg-white py-1.5 pl-2 pr-3.5 shadow-lg shadow-orange-950/10">
          <span className="flex h-6 w-6 items-center justify-center">{logo.node}</span>
          <span className="text-sm font-semibold text-[#0a0a0a]">{logo.name}</span>
        </span>
      ))}
    </div>
  );
}

/* Marquee de portraits de franchisés — réutilise le keyframe `bento-marquee`.
   1 rangée sur mobile, 2 rangées (sens opposés) sur desktop ; remplace l'ours à l'étape « On se déplace ». */
function FranchiseeMarquee({ images }: { images: string[] }) {
  const MIN = 5;
  const base = images.length >= MIN ? images : Array.from({ length: Math.ceil(MIN / Math.max(images.length, 1)) }, () => images).flat();
  const rev = [...base].reverse();
  const rowA = [...base, ...base];
  const rowB = [...rev, ...rev];
  const photo = "h-32 w-32 overflow-hidden rounded-[1.75rem] bg-white/10 shadow-[0_18px_40px_-12px_rgba(10,10,10,0.45)] ring-4 ring-white/25 sm:h-40 sm:w-40 lg:h-52 lg:w-52";
  return (
    <div className="absolute inset-x-0 bottom-6 z-[1] flex flex-col gap-4 overflow-hidden lg:inset-y-0 lg:bottom-auto lg:left-auto lg:right-0 lg:w-[60%] lg:justify-center lg:gap-6" aria-hidden="true">
      <ul className="flex w-max gap-4 animate-[bento-marquee_40s_linear_infinite] hover:[animation-play-state:paused] motion-reduce:animate-none lg:gap-6">
        {rowA.map((src, i) => (
          <li key={`a-${i}`} className="list-none"><div className={photo}><img src={src} alt="" loading="lazy" className="h-full w-full object-cover" /></div></li>
        ))}
      </ul>
      <ul className="hidden w-max gap-4 animate-[bento-marquee_52s_linear_infinite] hover:[animation-play-state:paused] motion-reduce:animate-none lg:flex lg:gap-6" style={{ animationDirection: "reverse" }}>
        {rowB.map((src, i) => (
          <li key={`b-${i}`} className="list-none"><div className={photo}><img src={src} alt="" loading="lazy" className="h-full w-full object-cover" /></div></li>
        ))}
      </ul>
    </div>
  );
}

type SlideStageProps = {
  paths: ProcessPath[];
  activeKey: "single" | "multi";
  onTabChange: (k: "single" | "multi") => void;
  path: ProcessPath;
  progress: number; // 0 → 1
  holdProgress: number; // 0 → 1 (fond du contenu vers l'orange pendant le hold)
  eyebrow: string;
  titlePart1: string;
  titleHighlight: string;
  titlePart2: string;
};

/* Composant PRÉSENTATIONNEL — markup/design (motifs canoniques bento). */
function SlideStage({ paths, activeKey, onTabChange, path, progress, holdProgress, eyebrow, titlePart1, titleHighlight, titlePart2 }: SlideStageProps) {
  const steps = path.steps;
  const n = steps.length;
  const totalPanels = n; // 4 étapes (la clôture est désormais une section à part)
  const panelProgress = progress * (totalPanels - 1); // 0..n-1
  const trackTransform = -progress * (totalPanels - 1) * 100;

  return (
    <div className="absolute inset-0 flex flex-col" style={{ opacity: 1 - holdProgress }}>

      {/* ===== EN-TÊTE (centré, toujours visible) ===== */}
      <div className="relative z-30 shrink-0 pt-12 md:pt-14">
        <div className="mx-auto w-full max-w-[var(--container)] px-6 sm:px-8">
          <div className="flex flex-col items-center gap-6 text-center">
            <div className="mx-auto max-w-3xl text-center">
              <Eyebrow className="text-white">{eyebrow}</Eyebrow>
              <h2 className="mt-3 font-heading text-3xl font-bold leading-[1.05] tracking-tight text-white md:text-4xl lg:text-5xl">
                {titlePart1}
                <span className="font-cooper text-[#fff4ec]">{titleHighlight}</span>
                {titlePart2}
              </h2>
            </div>
            <PathTabs paths={paths} activeKey={activeKey} onChange={onTabChange} />
          </div>
        </div>
      </div>

      {/* ===== ZONE DES SLIDES ===== */}
      <div className="relative flex-1 overflow-hidden">

        {/* Halos d'ambiance (comme la section VV) */}
        <div className="pointer-events-none absolute inset-0 z-0 overflow-hidden" aria-hidden="true">
          <div className="halo-drift absolute -right-[6%] top-[6%] h-[460px] w-[460px] rounded-full bg-white/10 blur-[120px]" />
          <div className="halo-drift-2 absolute -bottom-[14%] -left-[6%] h-[380px] w-[380px] rounded-full bg-white/10 blur-[100px]" />
        </div>

        {/* Piste : 4 étapes (style mascotte VV) + 1 carte de clôture */}
        <div className="relative z-10 flex h-full" style={{ width: `${totalPanels * 100}vw`, transform: `translateX(${trackTransform}vw)` }}>
          {steps.map((step) => (
            <div key={step.id} className="flex h-full w-screen shrink-0 items-center">
              <div className="relative mx-auto h-full w-full max-w-5xl px-6 sm:px-8">

                {step.gallery && step.gallery.length > 0 ? (
                  <FranchiseeMarquee images={step.gallery} />
                ) : (
                  /* OURS — agrandi, collé tout en bas (touche le bord bas), à droite sur desktop */
                  <div className="absolute inset-x-6 bottom-0 z-[1] flex items-end justify-center sm:inset-x-8 lg:inset-y-0 lg:left-auto lg:right-6 lg:w-[58%] lg:justify-end">
                    {/* Cercles concentriques + sparkle (centrés sur l'ours) */}
                    <div className="pointer-events-none absolute bottom-[4%] left-1/2 aspect-square w-[min(560px,70vh)] -translate-x-1/2" aria-hidden="true">
                      <div className="absolute inset-0 scale-[0.6] rounded-full border border-white/10" />
                      <div className="absolute inset-0 scale-[0.8] rounded-full border border-white/15" />
                      <div className="absolute inset-0 scale-100 rounded-full border border-white/20" />
                      <svg className="absolute right-[12%] top-[16%] h-8 w-8 text-white/30" viewBox="0 0 24 24" fill="currentColor"><path d="M12 2 14 10 22 12 14 14 12 22 10 14 2 12 10 10Z" /></svg>
                    </div>
                    <img src={step.image} alt={step.title} className="relative z-10 max-h-[54vh] w-auto max-w-full object-contain object-bottom drop-shadow-[0_24px_48px_rgba(10,10,10,0.30)] lg:h-full lg:max-h-none" loading="lazy" />
                  </div>
                )}

                {/* Gros chiffre fantôme en fond (hauteur max), derrière le texte */}
                <span className="pointer-events-none absolute left-[56%] top-1/2 z-0 -translate-x-1/2 -translate-y-1/2 select-none font-heading font-bold leading-none text-white/10 text-[46vh] sm:text-[62vh] lg:text-[82vh]" aria-hidden="true">
                  {parseInt(step.id, 10)}
                </span>

                {/* TEXTE — centré verticalement, à gauche, resserré, au-dessus de l'ours */}
                <div className="relative z-20 flex h-full max-w-xl flex-col items-start justify-center gap-5 lg:max-w-[42%]">
                  <span className="inline-flex items-center gap-2.5 rounded-full border border-white/20 bg-white/10 py-1.5 pl-2.5 pr-4 backdrop-blur-md">
                    <span className="flex h-7 w-7 items-center justify-center rounded-full bg-white text-[#FF6600]">
                      <span className="h-4 w-4">{step.icon}</span>
                    </span>
                    <span className="text-[11px] font-bold uppercase tracking-[0.18em] text-white">Étape {step.id}</span>
                  </span>
                  <h3 className="font-heading text-4xl font-bold leading-[1.03] tracking-tight text-white md:text-5xl lg:text-6xl">{step.title}</h3>
                  <p className="max-w-md text-lg leading-relaxed text-white/85 lg:text-xl">{step.description}</p>
                  {step.logos && step.logos.length > 0 && <LogosRow logos={step.logos} className="mt-1" />}
                  {step.actions && step.actions.length > 0 && <StepActions actions={step.actions} className="mt-1" />}
                </div>

              </div>
            </div>
          ))}

        </div>

        {/* Voiles de bord — les cartes entrent/sortent en douceur dans l'orange */}
        <div className="pointer-events-none absolute inset-y-0 left-0 z-20 w-[10vw] bg-gradient-to-r from-[#e85c00] to-transparent" aria-hidden="true" />
        <div className="pointer-events-none absolute inset-y-0 right-0 z-20 w-[10vw] bg-gradient-to-l from-[#ff8a3d] to-transparent" aria-hidden="true" />

        {/* Hint de scroll (disparaît dès qu'on avance) */}
        <div className="pointer-events-none absolute bottom-6 left-1/2 z-30 -translate-x-1/2 transition-opacity duration-300" style={{ opacity: panelProgress < 0.12 ? 1 : 0 }} aria-hidden="true">
          <div className="flex flex-col items-center gap-1 text-white/85 motion-safe:animate-bounce">
            <span className="text-[10px] font-bold uppercase tracking-[0.2em]">Scroll</span>
            <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.5" strokeLinecap="round" strokeLinejoin="round" className="h-4 w-4"><polyline points="6 9 12 15 18 9" /></svg>
          </div>
        </div>
      </div>
    </div>
  );
}

type Props = {
  eyebrow?: string;
  titlePart1?: string;
  titleHighlight?: string;
  titlePart2?: string;
  intro?: string;
  single?: ProcessPath;
  multi?: ProcessPath;
};

/* ÎLOT — section épinglée, calcul de `progress` depuis le scroll, snap mandatory,
   état d'onglet (2 parcours), saut d'étape, respect de prefers-reduced-motion. */
export default function ProcessTimeline({
  eyebrow = "Comment ça se passe",
  titlePart1 = "En quelques ",
  titleHighlight = "étapes",
  titlePart2 = " simples",
  intro = "Que vous ayez un seul établissement ou un réseau national, notre processus est conçu pour être fluide, rapide et sans friction technique.",
  single = SINGLE_PATH,
  multi = MULTI_PATH,
}: Props) {
  const paths = [single, multi];
  const sectionRef = useRef<HTMLElement>(null);
  const rafRef = useRef(0);
  const [activeKey, setActiveKey] = useState<"single" | "multi">("single");
  const [progress, setProgress] = useState(0); // 0→1 défilé des étapes (phase A)
  const [pullProgress, setPullProgress] = useState(0); // 0→1 tirage de la carte CTA (phase B)
  const [reduce, setReduce] = useState(false);

  const path = activeKey === "single" ? single : multi;
  const totalPanels = path.steps.length;

  // Détection prefers-reduced-motion.
  useEffect(() => {
    const mq = window.matchMedia("(prefers-reduced-motion: reduce)");
    const apply = () => setReduce(mq.matches);
    apply();
    mq.addEventListener("change", apply);
    return () => mq.removeEventListener("change", apply);
  }, []);

  // Progress dérivé de la position de la section épinglée.
  useEffect(() => {
    if (reduce) return;
    const root = document.documentElement;
    const compute = () => {
      rafRef.current = 0;
      const el = sectionRef.current;
      if (!el) return;
      const rect = el.getBoundingClientRect();
      const vh = window.innerHeight;
      const s = -rect.top; // distance scrollée dans la section
      // Phase A — défilé des étapes.
      const aPx = ((totalPanels - 1) * STEP_VH * vh) / 100;
      setProgress(Math.min(1, Math.max(0, aPx > 0 ? s / aPx : 0)));
      // Phase B — tirage de la carte CTA (après les étapes).
      const bPx = (PULL_VH * vh) / 100;
      setPullProgress(Math.min(1, Math.max(0, bPx > 0 ? (s - aPx) / bPx : 0)));
      // Snap : proximity pendant les étapes uniquement ; libre pendant tirage/repos.
      const inView = rect.top < vh && rect.bottom > 0;
      root.style.scrollSnapType = inView && s < aPx - 1 ? "y proximity" : "";
    };
    const onScroll = () => {
      if (rafRef.current) return;
      rafRef.current = requestAnimationFrame(compute);
    };
    compute();
    window.addEventListener("scroll", onScroll, { passive: true });
    window.addEventListener("resize", onScroll);
    return () => {
      window.removeEventListener("scroll", onScroll);
      window.removeEventListener("resize", onScroll);
      if (rafRef.current) cancelAnimationFrame(rafRef.current);
      root.style.scrollSnapType = "";
    };
  }, [reduce]);

  /* Fallback reduced-motion : en-tête + onglets + pile verticale + clôture, sans pin/snap. */
  if (reduce) {
    return (
      <section id="comment-ca-se-passe-timeline" className={`${RISE_OVER} bg-[#FF6600] py-24 md:py-32 lg:py-40`} style={BRAND_DIAGONAL}>
        <div className="mx-auto w-full max-w-[var(--container)] px-6 sm:px-8">
          <div className="mb-12 flex flex-col gap-6 text-left lg:flex-row lg:items-end lg:justify-between">
            <div className="max-w-2xl">
              <Eyebrow className="text-white">{eyebrow}</Eyebrow>
              <h2 className="mt-4 font-heading text-4xl font-bold leading-[1.05] tracking-tight text-white md:text-5xl lg:text-6xl">
                {titlePart1}
                <span className="font-cooper text-[#fff4ec]">{titleHighlight}</span>
                {titlePart2}
              </h2>
              {intro && <p className="mt-6 max-w-2xl text-lg leading-relaxed text-white/85">{intro}</p>}
            </div>
            <PathTabs paths={paths} activeKey={activeKey} onChange={setActiveKey} />
          </div>
          <div className="space-y-12 md:space-y-16">
            {path.steps.map((step, idx) => (
              <div key={step.id} className="grid items-center gap-10 rounded-3xl border border-white/15 bg-white/5 p-6 backdrop-blur-sm md:grid-cols-2 md:gap-16 md:p-10">
                <div className={`flex flex-col items-start ${idx % 2 === 1 ? "md:order-2" : ""}`}>
                  <span className="flex h-11 w-11 items-center justify-center rounded-xl bg-white/15 text-white"><span className="h-5 w-5">{step.icon}</span></span>
                  <h3 className="mt-5 font-heading text-2xl font-bold leading-tight tracking-tight text-white md:text-3xl">{step.id} · {step.title}</h3>
                  <p className="mt-4 max-w-md text-lg leading-relaxed text-white/85">{step.description}</p>
                  {step.logos && step.logos.length > 0 && <LogosRow logos={step.logos} className="mt-6" />}
                  {step.actions && step.actions.length > 0 && <StepActions actions={step.actions} className="mt-6" />}
                </div>
                <div className={`flex justify-center ${idx % 2 === 1 ? "md:order-1" : ""}`}>
                  {step.gallery && step.gallery.length > 0 ? (
                    <div className="grid w-full max-w-[360px] grid-cols-3 gap-3">
                      {step.gallery.slice(0, 6).map((src, i) => (
                        <div key={i} className="aspect-square overflow-hidden rounded-2xl ring-2 ring-white/25">
                          <img src={src} alt="" className="h-full w-full object-cover" loading="lazy" />
                        </div>
                      ))}
                    </div>
                  ) : (
                    <div className="relative aspect-[4/5] w-full max-w-[320px] overflow-hidden rounded-2xl bg-zinc-100 shadow-[0_2px_8px_-3px_rgba(10,10,10,0.20),0_22px_48px_-18px_rgba(10,10,10,0.28)]">
                      <img src={step.image} alt={step.title} className="h-full w-full object-cover" loading="lazy" />
                    </div>
                  )}
                </div>
              </div>
            ))}
          </div>
        </div>
        {/* CTA contact (statique en reduced-motion) */}
        <div className="relative mt-16 h-[88vh] md:mt-24">
          <ContactBear pull={1} active={false} />
        </div>
      </section>
    );
  }

  return (
    <section ref={sectionRef} id="comment-ca-se-passe-timeline" className={`${RISE_OVER} bg-[#FF6600]`} style={{ height: `${(totalPanels - 1) * STEP_VH + PULL_VH + REST_VH + 100}vh`, ...BRAND_DIAGONAL }}>
      {/* Ancres de scroll-snap — une par étape (start), espacées de STEP_VH. */}
      <div className="pointer-events-none absolute inset-x-0 top-0 z-0" aria-hidden="true">
        {Array.from({ length: totalPanels }).map((_, idx) => (
          <div key={`snap-${idx}`} style={{ position: "absolute", top: `${idx * STEP_VH}vh`, height: "100vh", left: 0, right: 0, scrollSnapAlign: "start" }} />
        ))}
      </div>

      {/* Scène épinglée plein écran. */}
      <div className="sticky top-0 h-screen w-full overflow-hidden">
        {/* Étapes (se fondent en orange uni pendant le tirage de la carte). */}
        <SlideStage
          paths={paths}
          activeKey={activeKey}
          onTabChange={setActiveKey}
          path={path}
          progress={progress}
          holdProgress={pullProgress}
          eyebrow={eyebrow}
          titlePart1={titlePart1}
          titleHighlight={titleHighlight}
          titlePart2={titlePart2}
        />
        {/* Calque CTA — l'ours tire la carte vers le haut, puis cligne de l'œil. */}
        <ContactBear pull={pullProgress} active={pullProgress >= 0.98} />
      </div>
    </section>
  );
}
