import type { ReactNode } from "react";

type Franchisee = {
  name: string;
  zone: string;
  imageUrl: string | null;
  pageLink?: string;
};

type Stat = { value: string; label: string };

type FranchisesProps = {
  franchisees: Franchisee[];
  stats: Stat[];
};

/* Images de secours (placeholders) — REMPLACER par les vraies photos
   (assets dans /public ou URL). Les portraits de franchisés Sanity, s'ils
   existent, prennent le pas sur ces placeholders. */
const FALLBACK_IMG_PRIMARY = "https://picsum.photos/seed/easyvirtual-main/900/1100";
const FALLBACK_IMG_SECONDARY = "https://picsum.photos/seed/easyvirtual-peek/500/1100";

/* Atouts du réseau (contenu statique + icône SVG inline). */
const FEATURES: { title: string; desc: string; icon: ReactNode }[] = [
  {
    title: "Services sur-mesure",
    desc: "Un accompagnement de proximité, de la capture 360° à la livraison Matterport en 48h.",
    icon: (
      <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.6" strokeLinecap="round" strokeLinejoin="round" className="h-5 w-5">
        <line x1="4" y1="21" x2="4" y2="14" />
        <line x1="4" y1="10" x2="4" y2="3" />
        <line x1="12" y1="21" x2="12" y2="12" />
        <line x1="12" y1="8" x2="12" y2="3" />
        <line x1="20" y1="21" x2="20" y2="16" />
        <line x1="20" y1="12" x2="20" y2="3" />
        <line x1="1" y1="14" x2="7" y2="14" />
        <line x1="9" y1="8" x2="15" y2="8" />
        <line x1="17" y1="16" x2="23" y2="16" />
      </svg>
    ),
  },
  {
    title: "Solutions innovantes",
    desc: "Des visites virtuelles immersives qui valorisent durablement chacun de vos espaces.",
    icon: (
      <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.6" strokeLinecap="round" strokeLinejoin="round" className="h-5 w-5">
        <path d="M9 18h6" />
        <path d="M10 22h4" />
        <path d="M12 2a7 7 0 0 0-4 12.7c.6.5 1 1.3 1 2.1V17h6v-.2c0-.8.4-1.6 1-2.1A7 7 0 0 0 12 2z" />
      </svg>
    ),
  },
  {
    title: "Présence nationale",
    desc: "Un réseau de franchisés partout en France, toujours au plus près de vos clients.",
    icon: (
      <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.6" strokeLinecap="round" strokeLinejoin="round" className="h-5 w-5">
        <path d="M21 10c0 7-9 13-9 13s-9-6-9-13a9 9 0 0 1 18 0z" />
        <circle cx="12" cy="10" r="3" />
      </svg>
    ),
  },
];

export default function Franchises({ franchisees, stats }: FranchisesProps) {
  const primary = franchisees[0];
  const secondary = franchisees[1];
  const primaryImg = primary?.imageUrl ?? FALLBACK_IMG_PRIMARY;
  const secondaryImg = secondary?.imageUrl ?? FALLBACK_IMG_SECONDARY;

  return (
    <section id="franchises" className="bg-white py-24 md:py-32 lg:py-40">
      <div className="mx-auto w-full max-w-[var(--container)] px-6 sm:px-8">

        {/* 1) EN-TÊTE CENTRÉ — pictogramme 360° + wordmark */}
        <div className="flex items-center justify-center gap-2.5 text-gray-500">
          <span className="text-[#FF6600]">
            <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.6" className="h-5 w-5" aria-hidden="true">
              <circle cx="12" cy="12" r="9" />
              <ellipse cx="12" cy="12" rx="4" ry="9" />
              <path d="M3 12h18" strokeLinecap="round" />
            </svg>
          </span>
          <span className="font-heading text-sm font-medium tracking-tight">easyvirtual.tours</span>
        </div>

        {/* 2) TITRE CENTRÉ — ligne 2 en accent italique */}
        <h2 className="mt-7 text-center font-heading font-extralight text-4xl md:text-5xl lg:text-6xl text-[#0a0a0a] tracking-[-0.02em] leading-[1.05]">
          Valorisez vos espaces,
          <br />
          <span className="font-heading italic">aujourd&apos;hui et demain.</span>
        </h2>

        {/* 3) CORPS — deux colonnes : infos (gauche) + images (droite) */}
        <div className="mt-16 grid grid-cols-1 items-stretch gap-12 md:mt-20 lg:grid-cols-12 lg:gap-16">

          {/* COLONNE GAUCHE — titre + 3 atouts répartis sur la hauteur de l'image */}
          <div className="flex h-full flex-col lg:col-span-5">
            <h3 className="font-heading text-2xl font-light leading-tight tracking-tight text-[#0a0a0a] md:text-3xl">
              Le réseau n°1
              <br />
              en France
            </h3>

            <ul className="mt-10 flex flex-1 flex-col justify-between gap-8">
              {FEATURES.map((f) => (
                <li key={f.title} className="flex gap-4">
                  <span className="flex h-11 w-11 shrink-0 items-center justify-center rounded-xl bg-[#fff4ec] text-[#FF6600]">
                    {f.icon}
                  </span>
                  <div>
                    <h4 className="font-heading text-lg font-medium text-[#0a0a0a]">{f.title}</h4>
                    <p className="mt-1 max-w-sm text-sm leading-relaxed text-gray-600">{f.desc}</p>
                  </div>
                </li>
              ))}
            </ul>
          </div>

          {/* COLONNE DROITE — grande image + liseré d'une seconde image */}
          <div className="lg:col-span-7">
            <div className="grid grid-cols-1 gap-4 md:grid-cols-[1fr_6rem] lg:grid-cols-[1fr_7rem]">
              {/* Image principale */}
              <div className="group relative aspect-[4/5] overflow-hidden rounded-2xl shadow-[0_24px_60px_-24px_rgba(255,102,0,0.30)]">
                {/* REMPLACER par la vraie photo (asset /public ou URL) */}
                <img
                  src={primaryImg}
                  alt={primary?.name ?? "Visite virtuelle immersive"}
                  className="absolute inset-0 h-full w-full object-cover transition-transform duration-700 group-hover:scale-105"
                />
                {primary?.name && (
                  <>
                    <div className="absolute inset-x-0 bottom-0 h-1/3 bg-gradient-to-t from-black/65 to-transparent" />
                    <div className="absolute bottom-5 left-5 text-white">
                      <p className="font-heading text-base font-medium leading-tight">{primary.name}</p>
                      <p className="text-xs text-white/80">{primary.zone}</p>
                    </div>
                  </>
                )}
              </div>

              {/* Liseré : seconde image qui « dépasse » sur le bord droit */}
              <div className="relative hidden overflow-hidden rounded-2xl md:block">
                {/* REMPLACER par la vraie photo (asset /public ou URL) */}
                <img
                  src={secondaryImg}
                  alt={secondary?.name ?? ""}
                  className="absolute inset-0 h-full w-full object-cover"
                />
              </div>
            </div>
          </div>
        </div>

        {/* 4) BANDEAU CHIFFRES-CLÉS — 3 stats */}
        <div className="mt-20 border-t border-gray-100 pt-12 md:mt-28">
          <dl className="grid grid-cols-1 gap-10 text-center sm:grid-cols-3">
            {stats.map((stat) => (
              <div key={stat.label}>
                <dt className="font-heading text-5xl font-light tracking-tight text-[#0a0a0a] md:text-6xl">
                  {stat.value}
                </dt>
                <dd className="mt-3 text-xs font-bold uppercase tracking-widest text-gray-500">
                  {stat.label}
                </dd>
              </div>
            ))}
          </dl>
        </div>

      </div>
    </section>
  );
}
