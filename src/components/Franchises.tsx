import { useMemo, useState } from "react";

type Franchisee = {
  id: string;
  name: string; // "Prénom Nom"
  zone: string; // zone géographique, ex. "Île-de-France", "Lyon", "PACA"
  imageUrl: string | null;
  pageLink?: string;
};

type Props = {
  franchisees: Franchisee[];
  eyebrow?: string;
  /** Le fragment entouré d'astérisques (*texte*) est mis en valeur (orange italique). */
  heading?: string;
  intro?: string;
  ctaLabel?: string;
  ctaHref?: string;
  /** Image affichée à droite par défaut, tant qu'aucun franchisé n'est mis en avant. */
  defaultImageUrl?: string;
  /** Libellés optionnels de la carte par défaut (surimpression affichée seulement si fournis). */
  defaultName?: string;
  defaultRole?: string;
};

/* Normalise pour comparer sans accents ni casse. */
const normalize = (str: string) =>
  str.normalize("NFD").replace(/\p{Diacritic}/gu, "").toLowerCase();

/* Met en valeur les fragments entourés d'astérisques (*texte*) en orange italique. */
function renderHeading(text: string) {
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

/* Section « réseau de franchisés » — moteur de recherche (gauche) + portrait du
   franchisé sélectionné qui change en fondu (droite). Îlot React interactif :
   l'état (recherche, sélection) est géré ici, les données arrivent par props. */
export default function Franchises({
  franchisees = [],
  eyebrow = "Notre réseau",
  heading = "Trouvez votre *expert* le plus proche",
  intro = "Nos franchisés vous accompagnent partout en France pour capturer vos espaces sous leur meilleur angle.",
  ctaLabel = "Devenir franchisé",
  ctaHref = "#contact",
  defaultImageUrl = "/didier.png",
  defaultName,
  defaultRole,
}: Props) {
  const [searchTerm, setSearchTerm] = useState("");
  const [selectedId, setSelectedId] = useState<string | null>(null);

  // Filtre par nom OU zone, insensible aux accents et à la casse.
  const filteredFranchisees = useMemo(() => {
    const term = normalize(searchTerm.trim());
    if (!term) return franchisees;
    return franchisees.filter(
      (f) => normalize(f.name).includes(term) || normalize(f.zone).includes(term),
    );
  }, [franchisees, searchTerm]);

  // Portrait affiché = le franchisé sélectionné par clic, sinon le 1er résultat
  // pendant une recherche. À l'état initial (ni clic ni recherche), on retourne
  // null pour laisser place à la photo par défaut (Didier) à droite.
  const activeFranchisee = useMemo(() => {
    if (selectedId) {
      const found = franchisees.find((f) => f.id === selectedId);
      if (found) return found;
    }
    if (searchTerm.trim()) return filteredFranchisees[0] ?? null;
    return null;
  }, [selectedId, searchTerm, filteredFranchisees, franchisees]);

  return (
    <section id="franchises" className="relative overflow-hidden bg-white py-24 text-[#0a0a0a] md:py-32 lg:py-40">
      <div className="mx-auto w-full max-w-[var(--container)] px-6 sm:px-8">
        <div className="grid grid-cols-1 items-start gap-16 lg:grid-cols-12 lg:gap-20">

          {/* COLONNE GAUCHE — eyebrow + titre + intro + recherche + liste + CTA */}
          <div className="lg:col-span-6">
            <div className="rounded-2xl border border-gray-100 bg-white p-8 shadow-[0_12px_32px_-16px_rgba(255,102,0,0.18)] md:p-10">
              <span className="inline-flex items-center gap-1.5 text-xs font-bold tracking-tight text-[#FF6600]">
                <svg viewBox="0 0 24 24" fill="currentColor" className="h-3.5 w-3.5 shrink-0" aria-hidden="true">
                  <path d="M12 2 14 10 22 12 14 14 12 22 10 14 2 12 10 10Z" />
                </svg>
                {eyebrow}
              </span>

              <h2 className="mt-6 font-heading text-4xl font-extralight leading-[1.05] tracking-tight md:text-5xl lg:text-6xl">
                {renderHeading(heading)}
              </h2>

              <p className="mt-6 max-w-xl text-lg leading-relaxed text-gray-600">{intro}</p>

              {/* CHAMP DE RECHERCHE */}
              <div className="relative mt-10">
                <label htmlFor="franchise-search" className="sr-only">
                  Rechercher un franchisé
                </label>
                <span className="pointer-events-none absolute inset-y-0 left-5 flex items-center text-gray-400">
                  <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" className="h-5 w-5" aria-hidden="true">
                    <circle cx="11" cy="11" r="8" />
                    <line x1="21" y1="21" x2="16.65" y2="16.65" />
                  </svg>
                </span>
                <input
                  id="franchise-search"
                  type="text"
                  value={searchTerm}
                  onChange={(e) => setSearchTerm(e.target.value)}
                  placeholder="Rechercher une ville, une région, un nom…"
                  className="w-full rounded-full border border-gray-200 bg-white py-4 pl-12 pr-6 text-[#0a0a0a] outline-none transition-all duration-300 placeholder:text-gray-400 focus:border-[#FF6600] focus:ring-4 focus:ring-[#FF6600]/10"
                />
              </div>

              {/* LISTE FILTRABLE */}
              <div className="mt-6">
                {filteredFranchisees.length > 0 ? (
                  <ul className="max-h-[22rem] space-y-3 overflow-y-auto pr-2 -mr-2">
                    {filteredFranchisees.map((f) => {
                      const isSelected = activeFranchisee?.id === f.id;
                      return (
                        <li key={f.id} className="py-1">
                          <button
                            type="button"
                            onClick={() => setSelectedId(f.id)}
                            aria-pressed={isSelected}
                            className={`group/row flex w-full items-center justify-between rounded-xl border bg-gray-50 px-5 py-4 text-left transition-all duration-300 hover:-translate-y-0.5 motion-reduce:transition-none motion-reduce:hover:transform-none ${
                              isSelected
                                ? "border-[#FF6600] ring-1 ring-[#FF6600]/30"
                                : "border-gray-100 hover:border-[#ff8533]/60"
                            }`}
                          >
                            <span className="flex flex-col">
                              <span className={`font-heading text-lg transition-colors duration-300 ${isSelected ? "text-[#FF6600]" : "text-[#0a0a0a]"}`}>
                                {f.name}
                              </span>
                              <span className="text-sm font-medium text-gray-500">{f.zone}</span>
                            </span>
                            <svg
                              viewBox="0 0 24 24"
                              fill="none"
                              stroke="currentColor"
                              strokeWidth="2"
                              strokeLinecap="round"
                              strokeLinejoin="round"
                              className={`h-5 w-5 shrink-0 transition-all duration-300 motion-reduce:transition-none ${
                                isSelected
                                  ? "translate-x-1 text-[#FF6600]"
                                  : "text-gray-300 group-hover/row:translate-x-1 group-hover/row:text-gray-400"
                              }`}
                              aria-hidden="true"
                            >
                              <polyline points="9 18 15 12 9 6" />
                            </svg>
                          </button>
                        </li>
                      );
                    })}
                  </ul>
                ) : (
                  <div className="rounded-2xl border-2 border-dashed border-gray-100 bg-gray-50 py-12 text-center">
                    <p className="font-medium text-gray-500">Aucun franchisé trouvé</p>
                  </div>
                )}
              </div>

              {/* CTA */}
              <a
                href={ctaHref}
                className="group mt-12 inline-flex items-center gap-3 rounded-full bg-[#FF6600] px-8 py-4 font-semibold text-white shadow-xl shadow-orange-900/10 transition-all duration-300 hover:-translate-y-0.5 hover:bg-[#e85c00] active:scale-95 motion-reduce:transition-none"
              >
                {ctaLabel}
                <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.5" strokeLinecap="round" strokeLinejoin="round" className="h-5 w-5 transition-transform duration-300 group-hover:translate-x-1.5 motion-reduce:transition-none" aria-hidden="true">
                  <line x1="5" y1="12" x2="19" y2="12" />
                  <polyline points="12 5 19 12 12 19" />
                </svg>
              </a>
            </div>
          </div>

          {/* COLONNE DROITE — portrait du franchisé sélectionné (change en fondu) */}
          <div className="relative lg:col-span-6">
            {/* Décorations */}
            <div className="absolute -inset-4 -z-10 rounded-3xl border-2 border-dashed border-[#FF6600]/15" aria-hidden="true" />
            <div className="absolute left-1/2 top-1/2 -z-10 h-64 w-64 -translate-x-1/2 -translate-y-1/2 rounded-full bg-[#FF6600]/5 blur-3xl" aria-hidden="true" />

            <div className="relative aspect-[4/5] overflow-hidden rounded-2xl border border-gray-100 bg-[#fff4ec] shadow-[0_22px_50px_-16px_rgba(255,102,0,0.20)]">
              {activeFranchisee ? (
                <div key={activeFranchisee.id} className="group h-full w-full animate-fade-in">
                  {activeFranchisee.imageUrl || defaultImageUrl ? (
                    <img
                      src={activeFranchisee.imageUrl ?? defaultImageUrl}
                      alt={`Portrait de ${activeFranchisee.name}`}
                      className="h-full w-full object-cover transition-transform duration-700 ease-in-out group-hover:scale-105 motion-reduce:transition-none motion-reduce:group-hover:scale-100"
                    />
                  ) : (
                    <div className="flex h-full w-full flex-col items-center justify-center gap-4 text-[#FF6600]/20">
                      <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1" className="h-20 w-20" aria-hidden="true">
                        <path d="M19 4h-3.17L14.41 2H9.59L8.17 4H5c-1.1 0-2 .9-2 2v12c0 1.1.9 2 2 2h14c1.1 0 2-.9 2-2V6c0-1.1-.9-2-2-2z" />
                        <circle cx="12" cy="13" r="4" />
                      </svg>
                      <span className="text-[10px] font-bold uppercase tracking-widest text-gray-400">
                        Photo bientôt disponible
                      </span>
                    </div>
                  )}

                  {/* Surimpression identité */}
                  <div className="absolute inset-x-0 bottom-0 flex items-end justify-between gap-4 bg-gradient-to-t from-black/85 via-black/20 to-transparent p-8 md:p-10">
                    <div className="flex flex-col gap-1">
                      <span className="text-xs font-bold uppercase tracking-widest text-white/70">
                        {activeFranchisee.zone}
                      </span>
                      <span className="font-heading text-3xl leading-none tracking-tight text-white md:text-4xl">
                        {activeFranchisee.name}
                      </span>
                    </div>

                    {activeFranchisee.pageLink && (
                      <a
                        href={activeFranchisee.pageLink}
                        aria-label={`Voir la page de ${activeFranchisee.name}`}
                        className="flex h-12 w-12 shrink-0 items-center justify-center rounded-full border border-white/40 bg-white/10 text-white shadow-lg backdrop-blur-md transition-all duration-300 hover:scale-110 hover:bg-white/25 active:scale-95 motion-reduce:transition-none"
                      >
                        <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.5" strokeLinecap="round" strokeLinejoin="round" className="h-5 w-5" aria-hidden="true">
                          <line x1="5" y1="12" x2="19" y2="12" />
                          <polyline points="12 5 19 12 12 19" />
                        </svg>
                      </a>
                    )}
                  </div>
                </div>
              ) : defaultImageUrl ? (
                /* État initial (ni clic ni recherche) → photo par défaut (Didier). */
                <div key="__default__" className="group h-full w-full animate-fade-in">
                  <img
                    src={defaultImageUrl}
                    alt={defaultName ? `Portrait de ${defaultName}` : "Notre réseau"}
                    className="h-full w-full object-cover transition-transform duration-700 ease-in-out group-hover:scale-105 motion-reduce:transition-none motion-reduce:group-hover:scale-100"
                  />

                  {(defaultName || defaultRole) && (
                    <div className="absolute inset-x-0 bottom-0 flex flex-col gap-1 bg-gradient-to-t from-black/85 via-black/20 to-transparent p-8 md:p-10">
                      {defaultRole && (
                        <span className="text-xs font-bold uppercase tracking-widest text-white/70">
                          {defaultRole}
                        </span>
                      )}
                      {defaultName && (
                        <span className="font-heading text-3xl leading-none tracking-tight text-white md:text-4xl">
                          {defaultName}
                        </span>
                      )}
                    </div>
                  )}
                </div>
              ) : (
                <div className="flex h-full w-full flex-col items-center justify-center gap-4 text-[#FF6600]/20">
                  <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.25" strokeLinecap="round" strokeLinejoin="round" className="h-16 w-16" aria-hidden="true">
                    <path d="M17 21v-2a4 4 0 0 0-4-4H5a4 4 0 0 0-4 4v2" />
                    <circle cx="9" cy="7" r="4" />
                    <path d="M23 21v-2a4 4 0 0 0-3-3.87" />
                    <path d="M16 3.13a4 4 0 0 1 0 7.75" />
                  </svg>
                  <span className="text-[10px] font-bold uppercase tracking-widest text-gray-400">
                    Aucun franchisé
                  </span>
                </div>
              )}
            </div>
          </div>

        </div>
      </div>
    </section>
  );
}
