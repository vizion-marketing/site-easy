import Eyebrow from "./Eyebrow";

/* Témoignage client affiché en surimpression sur la grande visite mise en avant. */
type Testimonial = {
  quote: string;
  author: string;
  role?: string;
  avatar?: string | null;
};

type Tour = {
  title: string;
  client?: string;
  clientLogo?: string | null;
  location?: string;
  category?: string;
  imageUrl: string | null;
  href: string;
  /** Preuve sociale en surimpression (uniquement rendue sur la carte `featured`). */
  testimonial?: Testimonial;
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
      className={`group relative block overflow-hidden rounded-3xl bg-gray-100 transition-transform duration-300 active:scale-[0.99] motion-reduce:transition-none ${className}`}
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
            <h3 className={`line-clamp-2 font-heading font-semibold leading-tight text-white ${featured ? "text-2xl md:text-3xl lg:text-4xl" : "text-lg"}`}>{tour.title}</h3>
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

      {/* Témoignage client en surimpression — uniquement sur la grande carte mise en avant */}
      {featured && tour.testimonial && (
        <div className="pointer-events-none absolute right-4 top-4 z-20 hidden max-w-[15rem] select-none sm:right-6 sm:top-6 sm:block sm:max-w-[17rem]">
          <figure className="relative flex flex-col gap-3 rounded-2xl border border-white/20 bg-black/30 p-4 shadow-[0_8px_32px_rgba(0,0,0,0.3)] backdrop-blur-md sm:p-5">
            {/* Guillemet décoratif */}
            <svg
              width="24"
              height="18"
              viewBox="0 0 24 18"
              fill="none"
              xmlns="http://www.w3.org/2000/svg"
              className="text-[#FF6600]"
              aria-hidden="true"
            >
              <path
                d="M0 10.1538V18H7.84615V10.1538H3.92308C3.92308 7.33846 5.86154 5.30769 8.26154 4.56923L6.87692 0.507692C2.72308 1.89231 0 5.4 0 10.1538ZM15.6923 10.1538V18H23.5385V10.1538H19.6154C19.6154 7.33846 21.5538 5.30769 23.9538 4.56923L22.5692 0.507692C18.4154 1.89231 15.6923 5.4 15.6923 10.1538Z"
                fill="currentColor"
              />
            </svg>

            {/* Citation courte */}
            <blockquote className="font-heading text-sm leading-snug tracking-tight text-white sm:text-base">
              {tour.testimonial.quote}
            </blockquote>

            {/* Signature */}
            <figcaption className="mt-1 flex items-center gap-3">
              {tour.testimonial.avatar && (
                <img
                  src={tour.testimonial.avatar}
                  alt={tour.testimonial.author}
                  className="h-9 w-9 flex-shrink-0 rounded-full object-cover ring-2 ring-white/80"
                />
              )}
              <div className="flex min-w-0 flex-col">
                <cite className="truncate text-xs font-semibold not-italic text-white sm:text-sm">
                  {tour.testimonial.author}
                </cite>
                {tour.testimonial.role && (
                  <span className="truncate text-[11px] text-white/70">{tour.testimonial.role}</span>
                )}
              </div>
            </figcaption>
          </figure>
        </div>
      )}
    </a>
  );
}

/* Section « Nos visites virtuelles coup de cœur » — fond blanc, conteneurisée (1440px).
   Bento statique (sans onglets) : 1 visite mise en avant à gauche + 2 visites empilées
   à droite. La sélection = les 3 premières visites reçues en props. */
export default function LatestTours({ tours, allHref = "#toutes-visites" }: Props) {
  const selection = tours.slice(0, 5);

  // Ombre canonique des tuiles (deux couches grises neutres) qui se renforce au survol.
  const cardShadow =
    "transition-shadow duration-300 shadow-[0_2px_8px_-3px_rgba(10,10,10,0.10),0_22px_48px_-18px_rgba(10,10,10,0.14)] hover:shadow-[0_4px_12px_-3px_rgba(10,10,10,0.14),0_32px_64px_-20px_rgba(10,10,10,0.20)]";

  return (
    <section id="visites" className="relative w-full overflow-hidden bg-white py-16 text-[#0a0a0a] md:py-24 lg:py-32">
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

        {/* HEADER — sur-titre + titre (aligné à gauche, sans onglets) */}
        <div className="max-w-7xl text-left">
          <Eyebrow className="mb-6">Nos réalisations</Eyebrow>
          <h2 className="font-heading text-3xl font-bold leading-[1.05] tracking-tight text-[#0a0a0a] md:text-4xl lg:text-5xl">
            Nos visites virtuelles <span className="font-cooper text-[#FF6600]">coup de cœur</span>
          </h2>
          <p className="mt-8 max-w-2xl text-lg leading-relaxed text-gray-600">
            Une sélection de nos plus belles expériences immersives — explorez des lieux
            uniques en 360°, comme si vous y étiez.
          </p>
        </div>

        {/* BENTO — 1 grande visite mise en avant (gauche, col-6 / row-2) + 4 visites (droite, 2×2) */}
        <div className="mt-16 grid grid-cols-1 gap-6 lg:h-[720px] lg:grid-cols-12 lg:grid-rows-2">
          {selection[0] && (
            <TourCard
              tour={selection[0]}
              featured
              className={`min-h-[440px] lg:col-span-6 lg:row-span-2 lg:h-full lg:min-h-0 ${cardShadow}`}
            />
          )}

          {selection.slice(1, 5).map((tour) => (
            <TourCard
              key={`${tour.title}-${tour.href}`}
              tour={tour}
              className={`min-h-[300px] lg:col-span-3 lg:h-full lg:min-h-0 ${cardShadow}`}
            />
          ))}
        </div>

        {/* FOOTER — CTA (contour plein qui se remplit au survol) */}
        <div className="mt-16 flex justify-center">
          <a
            href={allHref}
            className="group inline-flex items-center gap-2 rounded-full border border-[#FF6600] px-8 py-4 text-sm font-semibold text-[#FF6600] transition-all duration-300 hover:bg-[#FF6600] hover:text-white active:scale-95"
          >
            Voir toutes les visites
            <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.5" strokeLinecap="round" strokeLinejoin="round" className="h-4 w-4 transition-transform duration-300 group-hover:translate-x-1" aria-hidden="true">
              <path d="M5 12h14m-7-7 7 7-7 7" />
            </svg>
          </a>
        </div>
      </div>
    </section>
  );
}
