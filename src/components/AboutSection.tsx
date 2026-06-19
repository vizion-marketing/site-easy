import Eyebrow from "./Eyebrow";

type Fact = {
  icon?: "document" | "location" | "calendar" | "star" | "camera" | "users";
  label?: string;
  value?: string;
};

type Props = {
  eyebrow?: string;
  heading?: string;
  name?: string;
  verified?: boolean;
  role?: string;
  bio?: string;
  imageUrl?: string | null;
  ctaLabel?: string;
  ctaHref?: string;
  facts?: Fact[];
};

/* Icône inline (SVG, stroke currentColor) pour les cartes d'infos (facts). */
function FactIcon({ name, className = "h-6 w-6" }: { name?: Fact["icon"]; className?: string }) {
  const icons = {
    document: (
      <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round" className={className} aria-hidden="true">
        <path d="M14.5 2H6a2 2 0 0 0-2 2v16a2 2 0 0 0 2 2h12a2 2 0 0 0 2-2V7.5L14.5 2z" />
        <polyline points="14 2 14 8 20 8" />
        <line x1="16" y1="13" x2="8" y2="13" />
        <line x1="16" y1="17" x2="8" y2="17" />
        <line x1="10" y1="9" x2="8" y2="9" />
      </svg>
    ),
    location: (
      <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round" className={className} aria-hidden="true">
        <path d="M21 10c0 7-9 13-9 13s-9-6-9-13a9 9 0 0 1 18 0z" />
        <circle cx="12" cy="10" r="3" />
      </svg>
    ),
    calendar: (
      <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round" className={className} aria-hidden="true">
        <rect x="3" y="4" width="18" height="18" rx="2" ry="2" />
        <line x1="16" y1="2" x2="16" y2="6" />
        <line x1="8" y1="2" x2="8" y2="6" />
        <line x1="3" y1="10" x2="21" y2="10" />
      </svg>
    ),
    star: (
      <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round" className={className} aria-hidden="true">
        <polygon points="12 2 15.09 8.26 22 9.27 17 14.14 18.18 21.02 12 17.77 5.82 21.02 7 14.14 2 9.27 8.91 8.26 12 2" />
      </svg>
    ),
    camera: (
      <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round" className={className} aria-hidden="true">
        <path d="M19 4h-3.17L14.41 2H9.59L8.17 4H5c-1.1 0-2 .9-2 2v12c0 1.1.9 2 2 2h14c1.1 0 2-.9 2-2V6c0-1.1-.9-2-2-2z" />
        <circle cx="12" cy="13" r="4" />
      </svg>
    ),
    users: (
      <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round" className={className} aria-hidden="true">
        <path d="M17 21v-2a4 4 0 0 0-4-4H5a4 4 0 0 0-4 4v2" />
        <circle cx="9" cy="7" r="4" />
        <path d="M23 21v-2a4 4 0 0 0-3-3.87" />
        <path d="M16 3.13a4 4 0 0 1 0 7.75" />
      </svg>
    ),
  } as const;

  return icons[name ?? "document"];
}

/* Met en valeur les fragments entourés d'astérisques (*texte*) en orange italique. */
function renderHeading(text?: string) {
  if (!text) return null;
  return text.split(/\*(.*?)\*/g).map((part, i) =>
    i % 2 === 1 ? (
      <span key={i} className="font-cooper highlight-shine">
        {part}
      </span>
    ) : (
      part
    ),
  );
}

/* Section « Qui sommes nous » — fond blanc, conteneurisée (1440px).
   Portrait (gauche) + eyebrow/titre/bio/CTA (droite) + cartes d'infos (facts) en bas. */
export default function AboutSection({
  eyebrow,
  heading,
  name,
  verified,
  role,
  bio,
  imageUrl,
  ctaLabel,
  ctaHref,
  facts = [],
}: Props) {
  return (
    <section id="a-propos" className="relative overflow-hidden bg-white py-24 text-[#0a0a0a] md:py-32 lg:py-40">
      <div className="mx-auto w-full max-w-[var(--container)] px-6 sm:px-8">

        {/* GRILLE PRINCIPALE — portrait (gauche) + contenu (droite) */}
        <div className="grid grid-cols-1 items-center gap-16 lg:grid-cols-12 lg:gap-24">

          {/* COLONNE GAUCHE — carte portrait */}
          <div className="relative lg:col-span-5">
            {/* Halos décoratifs */}
            <div className="absolute -left-12 -top-12 h-64 w-64 rounded-full bg-[#FF6600]/10 blur-3xl" aria-hidden="true" />
            <div className="absolute -bottom-12 -right-12 h-64 w-64 rounded-full bg-[#FF6600]/5 blur-3xl" aria-hidden="true" />

            <div className="group relative z-10 aspect-[4/5] overflow-hidden rounded-2xl border border-gray-100 bg-[#fff4ec] shadow-2xl">
              {imageUrl ? (
                <img
                  src={imageUrl}
                  alt={name ?? "Portrait"}
                  className="h-full w-full object-cover transition-transform duration-700 group-hover:scale-105 motion-reduce:transition-none motion-reduce:group-hover:scale-100"
                />
              ) : (
                <div className="flex h-full w-full items-center justify-center text-[#FF6600]/20">
                  <FactIcon name="camera" className="h-20 w-20" />
                </div>
              )}

              {/* Surimpression identité (nom + badge vérifié + rôle) */}
              <div className="absolute inset-x-0 bottom-0 bg-gradient-to-t from-black/80 via-black/25 to-transparent p-8 md:p-10">
                <div className="flex flex-col gap-1">
                  <div className="flex items-center gap-2">
                    <span className="font-heading text-2xl tracking-tight text-white md:text-3xl">
                      {name ?? "easyvirtual.tours"}
                    </span>
                    {verified && (
                      <span className="flex h-6 w-6 items-center justify-center rounded-full bg-[#FF6600] text-white shadow-lg" title="Vérifié">
                        <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="3" strokeLinecap="round" strokeLinejoin="round" className="h-3.5 w-3.5" aria-hidden="true">
                          <polyline points="20 6 9 17 4 12" />
                        </svg>
                      </span>
                    )}
                  </div>
                  {role && (
                    <span className="text-sm font-medium uppercase tracking-wide text-white/80">
                      {role}
                    </span>
                  )}
                </div>
              </div>
            </div>

            {/* Cadre décalé décoratif */}
            <div className="absolute -bottom-4 -left-4 -z-10 h-full w-full rounded-2xl border-2 border-dashed border-[#FF6600]/20" aria-hidden="true" />
          </div>

          {/* COLONNE DROITE — eyebrow + titre + bio + CTA */}
          <div className="flex flex-col items-start lg:col-span-7">
            {eyebrow && <Eyebrow>{eyebrow}</Eyebrow>}

            <h2 className="mt-6 font-heading text-4xl font-extralight leading-[1.05] tracking-tight md:text-5xl lg:text-6xl">
              {renderHeading(heading) ?? "Qui sommes nous"}
            </h2>

            {bio && (
              <p className="mt-8 max-w-2xl text-lg leading-relaxed text-gray-600">
                {bio}
              </p>
            )}

            {ctaLabel && ctaHref && (
              <a
                href={ctaHref}
                className="group mt-10 inline-flex items-center gap-3 rounded-full bg-[#FF6600] px-10 py-5 font-semibold text-white shadow-xl shadow-orange-900/10 transition-all duration-300 hover:-translate-y-0.5 hover:bg-[#e85c00] active:scale-95 motion-reduce:transition-none"
              >
                {ctaLabel}
                <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.5" strokeLinecap="round" strokeLinejoin="round" className="h-5 w-5 transition-transform duration-300 group-hover:translate-x-1.5 motion-reduce:transition-none" aria-hidden="true">
                  <line x1="5" y1="12" x2="19" y2="12" />
                  <polyline points="12 5 19 12 12 19" />
                </svg>
              </a>
            )}
          </div>
        </div>

        {/* CARTES D'INFOS (facts) */}
        {facts.length > 0 && (
          <div className="mt-24 grid grid-cols-1 gap-6 sm:grid-cols-2 lg:mt-32 lg:grid-cols-4 lg:gap-8">
            {facts.map((fact, index) => (
              <div
                key={`${fact.label ?? fact.value ?? "fact"}-${index}`}
                className="group rounded-2xl border border-gray-100 bg-white p-6 shadow-[0_12px_32px_-16px_rgba(255,102,0,0.18)] transition-all duration-300 hover:-translate-y-1 hover:border-[#ff8533]/60 hover:shadow-[0_22px_50px_-16px_rgba(255,102,0,0.35)] motion-reduce:transition-none"
              >
                <div className="flex h-12 w-12 items-center justify-center rounded-xl bg-[#fff4ec] text-[#FF6600] transition-colors duration-300 group-hover:bg-[#FF6600] group-hover:text-white">
                  <FactIcon name={fact.icon} className="h-6 w-6" />
                </div>

                <div className="mt-6 flex flex-col gap-1">
                  {fact.value && (
                    <span className="font-heading text-2xl font-light tracking-tight text-[#0a0a0a] md:text-3xl">
                      {fact.value}
                    </span>
                  )}
                  {fact.label && (
                    <span className="text-[10px] font-bold uppercase tracking-widest text-gray-500">
                      {fact.label}
                    </span>
                  )}
                </div>
              </div>
            ))}
          </div>
        )}
      </div>
    </section>
  );
}
