import Eyebrow from "./Eyebrow";

/* Témoignage client (données Sanity `testimonial`, repli placeholder dans index.astro). */
export type Testimonial = {
  quote: string;
  author: string;
  role?: string;
  company?: string;
  /** Agence (franchise easyvirtual.tours) à laquelle l'avis Google est rattaché. */
  agency?: string;
  avatar?: string | null;
  rating?: number;
};

/* Logo Google officiel (« G » quadrichromie) — SVG inline, aucune dépendance.
   Signale que les témoignages sont des avis Google vérifiés. */
function GoogleG({ className = "" }: { className?: string }) {
  return (
    <svg viewBox="0 0 48 48" className={className} aria-label="Google" role="img">
      <path fill="#FFC107" d="M43.611 20.083H42V20H24v8h11.303c-1.649 4.657-6.08 8-11.303 8-6.627 0-12-5.373-12-12s5.373-12 12-12c3.059 0 5.842 1.154 7.961 3.039l5.657-5.657C34.046 6.053 29.268 4 24 4 12.955 4 4 12.955 4 24s8.955 20 20 20 20-8.955 20-20c0-1.341-.138-2.65-.389-3.917z" />
      <path fill="#FF3D00" d="M6.306 14.691l6.571 4.819C14.655 15.108 18.961 12 24 12c3.059 0 5.842 1.154 7.961 3.039l5.657-5.657C34.046 6.053 29.268 4 24 4 16.318 4 9.656 8.337 6.306 14.691z" />
      <path fill="#4CAF50" d="M24 44c5.166 0 9.86-1.977 13.409-5.192l-6.19-5.238C29.211 35.091 26.715 36 24 36c-5.202 0-9.619-3.317-11.283-7.946l-6.522 5.025C9.505 39.556 16.227 44 24 44z" />
      <path fill="#1976D2" d="M43.611 20.083H42V20H24v8h11.303c-.792 2.237-2.231 4.166-4.087 5.571l6.19 5.238C36.971 39.205 44 34 44 24c0-1.341-.138-2.65-.389-3.917z" />
    </svg>
  );
}

/* Carte témoignage — fond BLANC, ombre grise neutre à deux couches (motif bento), avec
   logo Google en haut à droite. Largeur fixe pour le marquee horizontal ; `fullWidth`
   (mur de témoignages, colonnes verticales) la passe en pleine largeur de colonne. */
export function TestimonialCard({
  testimonial,
  fullWidth = false,
}: {
  testimonial: Testimonial;
  fullWidth?: boolean;
}) {
  const initials = testimonial.author
    .split(" ")
    .map((n) => n[0])
    .join("")
    .toUpperCase()
    .slice(0, 2);

  const widthClasses = fullWidth ? "w-full" : "w-[340px] shrink-0 sm:w-[380px]";

  return (
    <div className={`group relative flex ${widthClasses} flex-col rounded-2xl bg-white p-7 shadow-[0_2px_8px_-3px_rgba(10,10,10,0.10),0_22px_48px_-18px_rgba(10,10,10,0.14)] transition-shadow duration-300 hover:shadow-[0_4px_12px_-3px_rgba(10,10,10,0.14),0_32px_64px_-20px_rgba(10,10,10,0.20)] md:p-8`}>
      {/* Haut de carte — guillemet (gauche) + agence/avis Google (droite) */}
      <div className="mb-5 flex items-start justify-between gap-3">
        <svg width="28" height="28" viewBox="0 0 24 24" fill="currentColor" className="text-[#FF6600]" xmlns="http://www.w3.org/2000/svg" aria-hidden="true">
          <path d="M14.017 21L14.017 18C14.017 16.8954 14.9124 16 16.017 16H19.017C20.1216 16 21.017 15.1046 21.017 14V9C21.017 7.89543 20.1216 7 19.017 7H15.017C13.9124 7 13.017 7.89543 13.017 9V12C13.017 13.1046 12.1216 14 11.017 14V17C11.017 19.2091 12.3601 21 14.017 21Z" fillOpacity="0.4" />
          <path d="M4.017 21L4.017 18C4.017 16.8954 4.91243 16 6.017 16H9.017C10.1216 16 11.017 15.1046 11.017 14V9C11.017 7.89543 10.1216 7 9.017 7H5.017C3.91243 7 3.017 7.89543 3.017 9V12C3.017 13.1046 2.12157 14 1.017 14V17C1.017 19.2091 2.36014 21 4.017 21Z" />
        </svg>
        {/* Agence (franchise) à qui appartient l'avis Google */}
        <div className="flex items-center gap-2 pt-1">
          {testimonial.agency && (
            <span className="max-w-[11rem] text-right text-xs font-semibold leading-tight text-[#0a0a0a]">
              {testimonial.agency}
            </span>
          )}
          <GoogleG className="h-6 w-6 shrink-0" />
        </div>
      </div>

      {/* Note (étoiles) */}
      {testimonial.rating ? (
        <div className="mb-4 flex items-center gap-1" aria-label={`Note : ${testimonial.rating} sur 5`}>
          {[...Array(5)].map((_, i) => (
            <svg
              key={i}
              className={`h-4 w-4 ${i < (testimonial.rating || 0) ? "text-[#FF6600]" : "text-gray-300"}`}
              viewBox="0 0 20 20"
              fill="currentColor"
              aria-hidden="true"
            >
              <path d="M9.049 2.927c.3-.921 1.603-.921 1.902 0l1.07 3.292a1 1 0 00.95.69h3.462c.969 0 1.371 1.24.588 1.81l-2.8 2.034a1 1 0 00-.364 1.118l1.07 3.292c.3.921-.755 1.688-1.54 1.118l-2.8-2.034a1 1 0 00-1.175 0l-2.8 2.034c-.784.57-1.838-.197-1.539-1.118l1.07-3.292a1 1 0 00-.364-1.118L2.98 8.72c-.783-.57-.38-1.81.588-1.81h3.461a1 1 0 00.951-.69l1.07-3.292z" />
            </svg>
          ))}
        </div>
      ) : null}

      {/* Citation */}
      <blockquote className="mb-8 text-base leading-relaxed text-[#0a0a0a] line-clamp-4 md:text-lg">
        « {testimonial.quote} »
      </blockquote>

      {/* Signature */}
      <div className="mt-auto flex items-center gap-4 border-t border-gray-100 pt-6">
        {testimonial.avatar ? (
          <img
            src={testimonial.avatar}
            alt={testimonial.author}
            loading="lazy"
            className="h-11 w-11 rounded-full object-cover shadow-sm ring-2 ring-white"
          />
        ) : (
          <div className="flex h-11 w-11 items-center justify-center rounded-full bg-[#fff4ec] shadow-sm ring-2 ring-white">
            <span className="font-heading text-sm font-bold text-[#FF6600]">{initials}</span>
          </div>
        )}
        <div className="flex min-w-0 flex-col">
          <span className="truncate text-sm font-semibold text-[#0a0a0a]">{testimonial.author}</span>
          {(testimonial.role || testimonial.company) && (
            <span className="truncate text-xs text-gray-500">
              {[testimonial.role, testimonial.company].filter(Boolean).join(" · ")}
            </span>
          )}
        </div>
      </div>
    </div>
  );
}

/* Bandeau de témoignages — strip horizontal défilant (marquee), pensé pour s'intégrer
   comme DERNIÈRE LIGNE de la grille bento `AboutBento`. Pas de `<section>` ni d'en-tête
   lourd : un petit eyebrow optionnel + la piste qui défile en boucle. */
export default function TestimonialsMarquee({
  testimonials = [],
  label = "Ils nous font confiance",
}: {
  testimonials?: Testimonial[];
  label?: string;
}) {
  if (testimonials.length === 0) return null;

  // Piste assez longue pour remplir les grands écrans (≥ 6 cartes), dupliquée ×2 : la
  // keyframe `bento-marquee` translate de -50% = exactement une copie → boucle sans couture.
  const MIN = 6;
  const base =
    testimonials.length >= MIN
      ? testimonials
      : Array.from({ length: Math.ceil(MIN / testimonials.length) }, () => testimonials).flat();
  const marqueeItems = [...base, ...base];

  return (
    <div>
      {label && (
        <div className="mb-6 flex items-center gap-3">
          <Eyebrow>{label}</Eyebrow>
          <span className="inline-flex items-center gap-1.5 text-xs font-semibold text-gray-500">
            <GoogleG className="h-4 w-4" />
            Avis Google vérifiés
          </span>
        </div>
      )}

      {/* MARQUEE — défile en boucle, se met en pause au survol. Padding vertical
          généreux pour que l'`overflow-hidden` (nécessaire au défilement) ne rogne pas
          les ombres des cartes. */}
      <div className="relative overflow-hidden py-12 md:py-14">
        {/* Fondus latéraux */}
        <div className="pointer-events-none absolute inset-y-0 left-0 z-10 w-16 bg-gradient-to-r from-white to-transparent sm:w-24" aria-hidden="true" />
        <div className="pointer-events-none absolute inset-y-0 right-0 z-10 w-16 bg-gradient-to-l from-white to-transparent sm:w-24" aria-hidden="true" />

        <ul className="flex w-max gap-6 animate-[bento-marquee_50s_linear_infinite] hover:[animation-play-state:paused] motion-reduce:animate-none md:gap-8">
          {marqueeItems.map((testimonial, idx) => (
            <li key={`${testimonial.author}-${idx}`} className="list-none">
              <TestimonialCard testimonial={testimonial} />
            </li>
          ))}
        </ul>
      </div>
    </div>
  );
}
