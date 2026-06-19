import { useState } from "react";
import Eyebrow from "./Eyebrow";

type Tour = {
  title: string;
  client?: string;
  clientLogo?: string | null;
  location?: string;
  category?: string;
  imageUrl: string | null;
  href: string;
};

type Props = {
  tours: Tour[];
  /** Lien « Voir toutes les visites ». */
  allHref?: string;
};

/* Carte visite : image + description en surimpression sur un voile dégradé,
   badge secteur dans le contenu. `className` pilote la taille (aspect / hauteur). */
function TourCard({
  tour,
  className = "",
  featured = false,
}: {
  tour: Tour;
  className?: string;
  /** Carte mise en avant (grande visite de gauche) → typographie agrandie. */
  featured?: boolean;
}) {
  return (
    <a
      href={tour.href}
      className={`group relative block overflow-hidden rounded-xl bg-gray-100 ${className}`}
    >
      {tour.imageUrl ? (
        <img
          src={tour.imageUrl}
          alt={tour.title}
          className="absolute inset-0 h-full w-full object-cover transition-transform duration-700 group-hover:scale-105"
        />
      ) : (
        <div className="absolute inset-0 bg-gray-100" />
      )}

      {/* Léger filtre noir sur l'image */}
      <div className="absolute inset-0 bg-black/25" aria-hidden="true" />

      {/* Logo client en haut à gauche (filtré en blanc), repli sur le nom */}
      {tour.clientLogo ? (
        <img
          src={tour.clientLogo}
          alt={tour.client ?? ""}
          className={`absolute w-auto max-w-[45%] object-contain brightness-0 invert ${featured ? "left-6 top-6 h-10" : "left-4 top-4 h-7"}`}
        />
      ) : tour.client ? (
        <span className={`absolute font-heading font-bold text-white ${featured ? "left-6 top-6 text-lg" : "left-4 top-4 text-sm"}`}>{tour.client}</span>
      ) : null}

      {/* Voile dégradé noir → transparent (du bas vers le haut) pour la lisibilité du texte */}
      <div className="absolute inset-x-0 bottom-0 h-2/3 bg-gradient-to-t from-black/85 via-black/40 to-transparent" aria-hidden="true" />

      {/* Description par-dessus le visuel */}
      <div className={`absolute ${featured ? "inset-x-6 bottom-6" : "inset-x-4 bottom-4"}`}>
        <div className="flex items-end justify-between gap-3">
          <div className="min-w-0">
            {tour.category && (
              <span className={`mb-2 inline-flex rounded-full border border-dashed border-[#FF6600] bg-transparent font-bold uppercase tracking-widest text-[#FF6600] ${featured ? "px-3 py-1.5 text-xs" : "px-2.5 py-1 text-[10px]"}`}>
                {tour.category}
              </span>
            )}
            <h3 className={`truncate font-heading font-semibold leading-tight text-white ${featured ? "text-2xl md:text-3xl lg:text-4xl" : "text-lg"}`}>{tour.title}</h3>
            {tour.location && (
              <>
                <span className={`block h-px bg-[#FF6600]/70 ${featured ? "my-2.5 w-10" : "my-1.5 w-6"}`} aria-hidden="true" />
                <p className={`truncate text-white/85 ${featured ? "text-base md:text-lg" : "text-sm"}`}>{tour.location}</p>
              </>
            )}
          </div>
          {featured ? (
            /* Carte mise en avant : vrai bouton « Visiter » (span stylé — la carte
               entière est déjà un lien, on évite un élément interactif imbriqué). */
            <span className="inline-flex shrink-0 items-center gap-2 rounded-full bg-[#FF6600] px-6 py-3 text-sm font-semibold text-white transition-colors duration-300 group-hover:bg-[#e85c00]">
              Visiter
              <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.5" strokeLinecap="round" strokeLinejoin="round" className="h-4 w-4 transition-transform duration-300 group-hover:translate-x-1" aria-hidden="true">
                <path d="M5 12h14m-7-7 7 7-7 7" />
              </svg>
            </span>
          ) : (
            /* Petites cartes : flèche orange orientée vers le coin haut-droit. */
            <span className="inline-flex h-10 w-10 shrink-0 items-center justify-center text-[#FF6600] transition-transform duration-300 group-hover:scale-110">
              <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.5" strokeLinecap="round" strokeLinejoin="round" className="h-6 w-6" aria-hidden="true">
                <path d="M7 17 17 7M7 7h10v10" />
              </svg>
            </span>
          )}
        </div>
      </div>
    </a>
  );
}

/* Section « Dernières visites virtuelles » — fond blanc, conteneurisée (1440px).
   Layout 2 colonnes : 1 visite en grand à gauche ; à droite, 1 visite large
   en haut + 2 visites en bas. */
export default function LatestTours({ tours, allHref = "#toutes-visites" }: Props) {
  // Catégories dérivées des visites (+ « Tous »).
  const categories = [
    "Tous",
    ...Array.from(new Set(tours.map((t) => t.category).filter((c): c is string => Boolean(c)))),
  ];

  const [active, setActive] = useState("Tous");
  const visible = active === "Tous" ? tours : tours.filter((t) => t.category === active);

  const featured = visible[0];
  const grid = visible.slice(1, 4); // 3 visites : 1 large en haut + 2 en bas

  return (
    <section id="visites" className="relative w-full overflow-hidden bg-white py-24 text-[#0a0a0a] md:py-32">
      {/* Halo orange diffus (réchauffe le blanc) */}
      <div
        className="pointer-events-none absolute -top-40 right-0 h-[600px] w-[600px] rounded-full bg-[#FF6600]/10 blur-[130px]"
        aria-hidden="true"
      />
      {/* Grille de points estompée sur les bords (look SaaS) */}
      <div
        className="pointer-events-none absolute inset-0 [background-image:radial-gradient(#e5e7eb_1px,transparent_1px)] [background-size:22px_22px] [mask-image:radial-gradient(ellipse_at_center,black,transparent_70%)] [-webkit-mask-image:radial-gradient(ellipse_at_center,black,transparent_70%)]"
        aria-hidden="true"
      />

      <div className="relative mx-auto w-full max-w-[var(--container)] px-6 sm:px-8">

        {/* HEADER — sur-titre + titre + onglets de filtre */}
        <div className="flex flex-col gap-8 md:flex-row md:items-end md:justify-between">
          <div>
            <Eyebrow className="mb-4">nos réalisations</Eyebrow>
            <h2 className="font-heading text-5xl font-extralight leading-[1.02] tracking-tight md:text-6xl lg:text-7xl">
              Dernières visites
              <br />
              virtuelles
            </h2>
          </div>

          <div className="flex flex-wrap gap-2">
            {categories.map((cat) => (
              <button
                key={cat}
                type="button"
                onClick={() => setActive(cat)}
                aria-pressed={active === cat}
                className={`rounded-full border px-5 py-2.5 text-sm font-semibold transition-colors ${
                  active === cat
                    ? "border-[#FF6600] bg-[#FF6600] text-white"
                    : "border-gray-200 bg-[#f5f5f7] text-gray-600 hover:border-[#ff8533]/50 hover:bg-[#fff4ec] hover:text-[#FF6600]"
                }`}
              >
                {cat}
              </button>
            ))}
          </div>
        </div>

        {/* LAYOUT — 1 visite en grand (gauche) ; à droite : 1 large en haut + 2 en bas */}
        {featured ? (
          <div className="mt-14 grid gap-6 lg:grid-cols-2">
            {/* COLONNE GAUCHE — visite mise en avant */}
            <TourCard tour={featured} featured className="min-h-[420px] lg:min-h-0" />

            {/* COLONNE DROITE — 1 visite large en haut + 2 visites en bas */}
            <div className="grid grid-cols-1 gap-6 sm:grid-cols-2">
              {grid.map((tour, i) => (
                <TourCard
                  key={`${tour.title}-${tour.href}`}
                  tour={tour}
                  className={i === 0 ? "aspect-[2/1] sm:col-span-2" : "aspect-square"}
                />
              ))}
            </div>
          </div>
        ) : (
          <p className="mt-14 text-gray-500">Aucune visite dans cette catégorie pour le moment.</p>
        )}

        {/* FOOTER — CTA */}
        <div className="mt-12 flex justify-center">
          <a
            href={allHref}
            className="inline-flex items-center gap-2 rounded-full bg-[#FF6600] px-8 py-4 text-sm font-semibold text-white transition-colors hover:bg-[#e85c00]"
          >
            Voir toutes les visites
            <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.5" strokeLinecap="round" strokeLinejoin="round" className="h-4 w-4" aria-hidden="true">
              <path d="M5 12h14m-7-7 7 7-7 7" />
            </svg>
          </a>
        </div>
      </div>
    </section>
  );
}
