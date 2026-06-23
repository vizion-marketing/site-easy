import { useCallback, useEffect, useRef, useState } from "react";
import Eyebrow from "./Eyebrow";

/* Ombre canonique des tuiles — deux couches grises neutres (contact net +
   diffusion large), renforcées au survol. */
const TILE_SHADOW =
  "shadow-[0_2px_8px_-3px_rgba(10,10,10,0.10),0_22px_48px_-18px_rgba(10,10,10,0.14)] hover:shadow-[0_4px_12px_-3px_rgba(10,10,10,0.14),0_32px_64px_-20px_rgba(10,10,10,0.20)]";

/* Carte secteur — toutes les cartes du slider partagent ce format. */
type Sector = {
  id: string;
  /** Libellé du chip badge (haut-gauche), rendu en capitales. */
  badge: string;
  /** Titre du secteur. */
  title: string;
  /** Phrase de bénéfice. */
  description: string;
  /** Illustration (brandable Sanity plus tard). */
  image: string;
  /** Met la carte en avant : cadre orange + libellé « Coup de cœur ». */
  featured?: boolean;
};

type Props = {
  eyebrow?: string;
  titlePart1?: string;
  titleHighlight?: string;
  titlePart2?: string;
  intro?: string;
  sectors?: Sector[];
  ctaLabel?: string;
  ctaHref?: string;
  ctaTeaser?: string;
};

/* Flèche de lien — glisse vers la droite au survol du groupe parent. */
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

/* Tous les secteurs de la taxonomie easyvirtual.tours, en cartes image uniformes. */
const DEFAULT_SECTORS: Sector[] = [
  {
    id: "immobilier",
    featured: true,
    badge: "Qualification à distance",
    title: "Immobilier",
    description:
      "Vendez et louez sans déplacement inutile : la visite 360° qualifie vos acheteurs et locataires à distance, 24h/24.",
    image: "/appartement.png",
  },
  {
    id: "renovation",
    featured: true,
    badge: "Relevés & plans",
    title: "Rénovation",
    description:
      "Avant / après et relevés précis : capturez l'état des lieux, générez des plans cotés et suivez l'avancée du chantier.",
    image: "/chantier.png",
  },
  {
    id: "industrie",
    featured: true,
    badge: "Formation & sécurité",
    title: "Industrie",
    description:
      "Formez vos équipes en immersion et déroulez les parcours sécurité sur un site reproduit à l'identique, sans immobiliser la production.",
    image: "/usine.png",
  },
  {
    id: "tourisme",
    badge: "Plus de réservations",
    title: "Tourisme",
    description:
      "Offices de tourisme, sites et campings explorables en 360° pour booster les réservations.",
    image: "/parc-attraction.png",
  },
  {
    id: "culture",
    badge: "Patrimoine vivant",
    title: "Culture",
    description:
      "Démocratisez l'accès au patrimoine et aux expositions avec des parcours immersifs et enrichis.",
    image: "/musee.png",
  },
  {
    id: "hotellerie-restauration",
    badge: "Donner envie",
    title: "Hôtellerie & restauration",
    description:
      "Chambres, salles et terrasses mises en scène pour donner envie de réserver.",
    image: "/hotel.png",
  },
  {
    id: "education",
    badge: "Portes ouvertes virtuelles",
    title: "Éducation",
    description:
      "Faites visiter vos campus et vos écoles aux futurs étudiants, où qu'ils soient.",
    image: "/universite.png",
  },
  {
    id: "commerces-services",
    badge: "Ouvert 24h/24",
    title: "Commerces et services",
    description:
      "Transformez vos points de vente et agences en espaces explorables 24h/24.",
    image: "/commerce.png",
  },
  {
    id: "sante-bien-etre",
    badge: "Mise en confiance",
    title: "Santé & bien-être",
    description:
      "Rassurez patients et clients en leur faisant découvrir les lieux en amont.",
    image: "/hopital.png",
  },
];

/* Section « Secteurs » — quels métiers profitent le plus d'une visite virtuelle.
   SLIDER horizontal de cartes secteur uniformes (motif tuile image canonique),
   défilable au doigt / au trackpad, avec boutons précédent/suivant. En-tête aligné
   à gauche, fond blanc, conteneurisé (1440px). Îlot React — données par props
   (défauts FR, branchables à Sanity plus tard). */
export default function SecteursBenefices({
  eyebrow = "Secteurs d'activité",
  titlePart1 = "La visite virtuelle : ",
  titleHighlight = "un outil innovant",
  titlePart2 = " pour de nombreux secteurs d'activités",
  intro = "Accélérer une vente, fiabiliser un relevé technique ou former vos équipes : la visite virtuelle s'adapte à chaque métier pour créer de la valeur immédiate.",
  sectors = DEFAULT_SECTORS,
  ctaLabel = "Discutons de votre projet",
  ctaHref = "#contact",
  ctaTeaser = "Vous ne trouvez pas votre secteur ?",
}: Props) {
  const trackRef = useRef<HTMLDivElement>(null);
  const [canPrev, setCanPrev] = useState(false);
  const [canNext, setCanNext] = useState(true);

  /* Recalcule l'état des boutons selon la position de défilement. */
  const updateControls = useCallback(() => {
    const el = trackRef.current;
    if (!el) return;
    setCanPrev(el.scrollLeft > 8);
    setCanNext(el.scrollLeft + el.clientWidth < el.scrollWidth - 8);
  }, []);

  useEffect(() => {
    const el = trackRef.current;
    if (!el) return;
    updateControls();
    el.addEventListener("scroll", updateControls, { passive: true });
    window.addEventListener("resize", updateControls);
    return () => {
      el.removeEventListener("scroll", updateControls);
      window.removeEventListener("resize", updateControls);
    };
  }, [updateControls]);

  /* Défile d'environ une carte (largeur de la 1re carte + gap). */
  const scrollByCard = useCallback((dir: 1 | -1) => {
    const el = trackRef.current;
    if (!el) return;
    const card = el.firstElementChild as HTMLElement | null;
    const amount = card ? card.offsetWidth + 24 : el.clientWidth * 0.8;
    el.scrollBy({ left: dir * amount, behavior: "smooth" });
  }, []);

  return (
    <section id="secteurs" className="overflow-hidden bg-[#f6f6f7] py-24 md:py-32 lg:py-40">
      <div className="mx-auto w-full max-w-[var(--container)] px-6 sm:px-8">

        {/* EN-TÊTE DE SECTION (aligné à gauche) + contrôles du slider (haut-droite, md+) */}
        <div className="mb-14 flex flex-col gap-10 md:mb-16 md:flex-row md:items-end md:justify-between md:gap-12">
          <div className="max-w-4xl text-left">
            <Eyebrow>{eyebrow}</Eyebrow>
            <h2 className="mt-4 font-heading text-4xl font-bold leading-[1.05] tracking-tight text-[#0a0a0a] md:text-5xl lg:text-6xl">
              {titlePart1}
              <span className="font-cooper text-[#FF6600]">{titleHighlight}</span>
              {titlePart2}
            </h2>
            <p className="mt-8 max-w-2xl text-lg leading-relaxed text-gray-600">{intro}</p>
          </div>

          {/* Navigation prev/next — masquée sur mobile (défilement tactile natif) */}
          <div className="hidden shrink-0 gap-3 md:flex">
            <button
              type="button"
              onClick={() => scrollByCard(-1)}
              disabled={!canPrev}
              aria-label="Secteur précédent"
              className="flex h-12 w-12 items-center justify-center rounded-full border border-[#e5e7eb] bg-white text-[#0a0a0a] transition-all duration-300 hover:border-[#FF6600] hover:text-[#FF6600] active:scale-95 disabled:cursor-not-allowed disabled:opacity-40 disabled:hover:border-[#e5e7eb] disabled:hover:text-[#0a0a0a] motion-reduce:transition-none"
            >
              <ArrowIcon className="h-5 w-5 rotate-180" />
            </button>
            <button
              type="button"
              onClick={() => scrollByCard(1)}
              disabled={!canNext}
              aria-label="Secteur suivant"
              className="flex h-12 w-12 items-center justify-center rounded-full border border-[#e5e7eb] bg-white text-[#0a0a0a] transition-all duration-300 hover:border-[#FF6600] hover:text-[#FF6600] active:scale-95 disabled:cursor-not-allowed disabled:opacity-40 disabled:hover:border-[#e5e7eb] disabled:hover:text-[#0a0a0a] motion-reduce:transition-none"
            >
              <ArrowIcon className="h-5 w-5" />
            </button>
          </div>
        </div>

        {/* PISTE DU SLIDER — défilement horizontal + scroll-snap, bleed jusqu'aux
           bords du conteneur (marges négatives qui annulent le padding latéral).
           Enveloppe relative pour porter le dégradé de fondu sur le bord droit. */}
        <div className="relative -mx-6 sm:-mx-8">
          <div
            ref={trackRef}
            className="flex snap-x snap-mandatory scroll-pl-6 gap-5 overflow-x-auto px-6 pb-12 pt-2 sm:scroll-pl-8 sm:px-8 md:gap-6 [scrollbar-width:none] [&::-webkit-scrollbar]:hidden"
          >
            {sectors.map((s) => (
              <SectorCard key={s.id} sector={s} />
            ))}
          </div>

          {/* Dégradé de fondu (droite) — fait disparaître en douceur les cartes qui
             sortent du cadre, vers le fond de section. pointer-events-none pour ne
             pas bloquer le défilement tactile. */}
          <div
            className="pointer-events-none absolute inset-y-0 right-0 w-16 bg-gradient-to-l from-[#f6f6f7] to-transparent sm:w-24 md:w-32"
            aria-hidden="true"
          />
        </div>

        {/* PIED DE SECTION — relance vers le contact */}
        <div className="mt-12 flex flex-col items-center gap-6 text-center md:mt-16 md:flex-row md:justify-center">
          <p className="text-base font-semibold text-gray-500">{ctaTeaser}</p>
          <a
            href={ctaHref}
            className="group inline-flex items-center gap-2 rounded-full border border-[#FF6600] px-7 py-3.5 text-sm font-semibold text-[#FF6600] transition-all duration-300 hover:bg-[#FF6600] hover:text-white active:scale-95 motion-reduce:transition-none"
          >
            {ctaLabel}
            <ArrowIcon className="h-4 w-4" />
          </a>
        </div>
      </div>
    </section>
  );
}

/* Carte secteur uniforme — motif tuile image canonique, largeur fixe pour le slider. */
function SectorCard({ sector }: { sector: Sector }) {
  return (
    <article
      className={`group relative aspect-[3/4] w-[78vw] shrink-0 snap-start overflow-hidden rounded-3xl bg-zinc-100 transition-shadow duration-300 sm:w-[340px] lg:w-[380px] ${TILE_SHADOW} ${
        sector.featured ? "ring-2 ring-[#FF6600]" : ""
      }`}
    >
      <img
        src={sector.image}
        alt={sector.title}
        className="h-full w-full object-cover transition-transform duration-700 ease-in-out motion-safe:group-hover:scale-105"
        loading="lazy"
      />

      {/* Voile dégradé orange easyJet (#FF6600) — limité au bas de la carte (n'atteint
         pas le haut) */}
      <div className="absolute inset-x-0 bottom-0 h-2/3 bg-gradient-to-t from-[#FF6600] via-[#FF6600]/60 to-transparent" aria-hidden="true" />

      {/* Libellé « Coup de cœur » — bloc d'angle collé en haut à gauche : coin
         supérieur gauche arrondi (aligné sur la carte) et coin inférieur droit
         arrondi (creux intérieur), les deux autres coins droits sur les bords. */}
      {sector.featured && (
        <div className="absolute left-0 top-0 z-10 inline-flex items-center gap-2 rounded-tl-3xl rounded-br-[1.75rem] bg-[#FF6600] py-3 pl-5 pr-6 text-white shadow-lg shadow-orange-900/20">
          <svg className="h-[18px] w-[18px] shrink-0" viewBox="0 0 24 24" fill="currentColor" aria-hidden="true">
            <path d="M12 21.35l-1.45-1.32C5.4 15.36 2 12.28 2 8.5 2 5.42 4.42 3 7.5 3c1.74 0 3.41.81 4.5 2.09C13.09 3.81 14.76 3 16.5 3 19.58 3 22 5.42 22 8.5c0 3.78-3.4 6.86-8.55 11.54L12 21.35z" />
          </svg>
          <span className="text-sm font-bold tracking-tight">Coup de cœur</span>
        </div>
      )}

      {/* Contenu blanc en bas */}
      <div className="absolute inset-x-0 bottom-0 p-8 md:p-10">
        <h3 className="font-heading text-2xl font-bold leading-tight text-white md:text-3xl">{sector.title}</h3>
        <p className="mt-3 text-sm leading-relaxed text-white/80">{sector.description}</p>
        <span className="group/cta mt-6 inline-flex items-center gap-2 text-sm font-semibold text-white">
          <span className="underline decoration-white/40 underline-offset-4 transition-colors group-hover/cta:decoration-white">
            Découvrir l'usage
          </span>
          <ArrowIcon className="h-4 w-4" />
        </span>
      </div>
    </article>
  );
}
