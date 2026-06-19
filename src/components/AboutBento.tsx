import Eyebrow from "./Eyebrow";

type Props = {
  eyebrow?: string;
  titlePart1?: string;
  titleHighlight?: string;
  titlePart2?: string;
  intro?: string;
  imagePath?: string;
  tallImagePath?: string;
  networkTitle?: string;
  networkDescription?: string;
  easyGroupTitle?: string;
  easyGroupDescription?: string;
};

/* Section « Qui sommes-nous » en bento — fond blanc, conteneurisée (1440px).
   Image dominante de la easy family (gauche) + tuile réseau franchise + tuile
   groupe easyJet + bande de chiffres-clés. Section éditoriale statique :
   props optionnelles (valeurs par défaut FR), branchables à Sanity plus tard. */
export default function AboutBento({
  eyebrow = "qui sommes-nous",
  titlePart1 = "Le premier ",
  titleHighlight = "réseau de franchise",
  titlePart2 = " dédié à la visite virtuelle en France",
  intro = "Nous combinons la force d'un grand groupe et l'agilité d'un réseau local pour offrir des visites virtuelles 360° d'une qualité homogène, partout en France.",
  imagePath = "/easyfamily.png",
  tallImagePath = "/didier.png",
  networkTitle = "1er réseau de franchise 360° en France",
  networkDescription = "easyvirtual.tours est le premier réseau de franchise français entièrement dédié à la visite virtuelle 360°. Des franchisés locaux partout en France, un savoir-faire commun, une qualité homogène.",
  easyGroupTitle = "Une marque du groupe easyJet",
  easyGroupDescription = "Nous faisons partie de la easy family, l'écosystème de marques fondé par easyJet (easyHotel, easyGym, easyCar…). La même promesse : rendre le premium simple et accessible à tous.",
}: Props) {
  return (
    <section id="a-propos" className="overflow-hidden bg-white pt-10 md:pt-14 lg:pt-16 pb-24 md:pb-32 lg:pb-40">
      <div className="mx-auto w-full max-w-[var(--container)] px-6 sm:px-8">

        {/* EN-TÊTE DE SECTION */}
        <div className="mb-12 md:mb-20 text-center">
          <Eyebrow>{eyebrow}</Eyebrow>

          <h2 className="mx-auto mt-4 max-w-5xl font-heading text-4xl font-extralight leading-[1.05] tracking-tight text-[#0a0a0a] md:text-5xl lg:text-6xl">
            {titlePart1}
            <span className="font-cooper text-[#FF6600]">{titleHighlight}</span>
            {titlePart2}
          </h2>

          {intro && (
            <p className="mx-auto mt-8 max-w-2xl text-lg leading-relaxed text-gray-600">{intro}</p>
          )}
        </div>

        {/* GRILLE BENTO */}
        <div className="grid grid-cols-1 gap-4 md:gap-6 lg:grid-cols-12">

          {/* TUILE 1 — IMAGE DOMINANTE (easy family) */}
          <div className="group relative min-h-[420px] overflow-hidden rounded-3xl bg-zinc-100 lg:col-start-1 lg:col-span-5 lg:row-start-1 lg:row-span-2">
            <img
              src={imagePath}
              alt="La easy family — l'écosystème de marques du groupe easyJet"
              className="h-full w-full object-cover transition-transform duration-700 ease-in-out motion-safe:group-hover:scale-105"
            />
            <div className="absolute inset-0 bg-gradient-to-t from-black/65 via-black/15 to-transparent" />
            <div className="absolute bottom-0 left-0 p-8 text-white md:p-10">
              <span className="mb-2 inline-block text-[10px] font-bold uppercase tracking-widest text-white/80">
                la easy family
              </span>
              <p className="font-heading text-xl font-light tracking-tight md:text-2xl">
                Toutes les marques du groupe easyJet réunies
              </p>
            </div>
          </div>

          {/* TUILE 2 — RÉSEAU FRANCHISE */}
          <div className="flex flex-col justify-between rounded-2xl border border-gray-100 bg-white p-8 shadow-[0_12px_32px_-16px_rgba(255,102,0,0.12)] transition-all duration-300 hover:-translate-y-1 hover:border-[#ff8533]/60 hover:shadow-[0_22px_50px_-16px_rgba(255,102,0,0.25)] motion-reduce:transition-none lg:col-start-6 lg:col-span-4 lg:row-start-1">
            <div>
              <div className="mb-6 flex h-12 w-12 items-center justify-center rounded-xl bg-[#fff4ec] text-[#FF6600]">
                <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round" className="h-6 w-6" aria-hidden="true">
                  <circle cx="18" cy="5" r="3" />
                  <circle cx="6" cy="12" r="3" />
                  <circle cx="18" cy="19" r="3" />
                  <line x1="8.59" y1="13.51" x2="15.42" y2="17.49" />
                  <line x1="15.41" y1="6.51" x2="8.59" y2="10.49" />
                </svg>
              </div>
              <h3 className="mb-4 font-heading text-2xl text-[#0a0a0a]">{networkTitle}</h3>
              <p className="leading-relaxed text-gray-600">{networkDescription}</p>
            </div>
          </div>

          {/* TUILE 3 — GROUPE EASYJET */}
          <div className="relative overflow-hidden rounded-2xl bg-[#FF6600] p-8 text-white transition-all duration-300 hover:-translate-y-1 motion-reduce:transition-none lg:col-start-6 lg:col-span-4 lg:row-start-2">
            <div className="absolute -right-12 -top-12 h-40 w-40 rounded-full bg-white/10 blur-3xl" aria-hidden="true" />
            <div className="relative z-10 flex h-full flex-col">
              <span className="mb-4 text-[10px] font-bold uppercase tracking-[0.15em] text-white/80">
                membre de la easy family
              </span>
              <h3 className="mb-4 font-heading text-2xl">{easyGroupTitle}</h3>
              <p className="mb-8 leading-relaxed text-white/85">{easyGroupDescription}</p>

              <div className="mt-auto flex items-center gap-4">
                <div className="flex h-10 w-10 items-center justify-center rounded-full bg-white text-[#FF6600]">
                  <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" className="h-[18px] w-[18px]" aria-hidden="true">
                    <path d="M12 22s8-4 8-10V5l-8-3-8 3v7c0 6 8 10 8 10z" />
                    <path d="m9 12 2 2 4-4" />
                  </svg>
                </div>
                <span className="text-sm font-semibold">Standard de qualité easyJet</span>
              </div>
            </div>
          </div>

          {/* TUILE 4 — IMAGE VERTICALE PLEINE HAUTEUR (colonne droite) */}
          <div className="group relative min-h-[420px] overflow-hidden rounded-3xl bg-zinc-100 lg:col-start-10 lg:col-span-3 lg:row-start-1 lg:row-span-2 lg:min-h-0">
            <img
              src={tallImagePath}
              alt="easyvirtual.tours — un expert près de chez vous"
              className="h-full w-full object-cover transition-transform duration-700 ease-in-out motion-safe:group-hover:scale-105"
            />
            <div className="absolute inset-0 bg-gradient-to-t from-black/65 via-black/15 to-transparent" />
            <div className="absolute bottom-0 left-0 p-6 text-white md:p-8">
              <span className="mb-2 inline-block text-[10px] font-bold uppercase tracking-widest text-white/80">
                sur le terrain
              </span>
              <p className="font-heading text-lg font-light tracking-tight">
                Un expert près de chez vous
              </p>
            </div>
          </div>

          {/* BANDE CHIFFRES-CLÉS */}
          <div className="mt-2 grid grid-cols-1 gap-4 md:grid-cols-3 md:gap-6 lg:col-start-1 lg:col-span-12 lg:row-start-3">
            <div className="flex items-center gap-6 rounded-2xl border border-gray-100 bg-white p-6">
              <div className="text-[#FF6600]">
                <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round" className="h-8 w-8" aria-hidden="true">
                  <path d="M19 4h-3.17L14.41 2H9.59L8.17 4H5c-1.1 0-2 .9-2 2v12c0 1.1.9 2 2 2h14c1.1 0 2-.9 2-2V6c0-1.1-.9-2-2-2z" />
                  <circle cx="12" cy="13" r="4" />
                </svg>
              </div>
              <div>
                <p className="font-heading text-3xl font-light tracking-tight text-[#0a0a0a]">+500</p>
                <p className="text-[10px] font-bold uppercase tracking-widest text-gray-500">visites réalisées</p>
              </div>
            </div>

            <div className="flex items-center gap-6 rounded-2xl border border-gray-100 bg-white p-6">
              <div className="text-[#FF6600]">
                <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round" className="h-8 w-8" aria-hidden="true">
                  <path d="M21 10c0 7-9 13-9 13s-9-6-9-13a9 9 0 0 1 18 0z" />
                  <circle cx="12" cy="10" r="3" />
                </svg>
              </div>
              <div>
                <p className="font-heading text-3xl font-light tracking-tight text-[#0a0a0a]">France</p>
                <p className="text-[10px] font-bold uppercase tracking-widest text-gray-500">partout en</p>
              </div>
            </div>

            <div className="flex items-center gap-6 rounded-2xl border border-gray-100 bg-white p-6">
              <div className="text-[#FF6600]">
                <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round" className="h-8 w-8" aria-hidden="true">
                  <polygon points="12 2 15.09 8.26 22 9.27 17 14.14 18.18 21.02 12 17.77 5.82 21.02 7 14.14 2 9.27 8.91 8.26 12 2" />
                </svg>
              </div>
              <div>
                <p className="font-heading text-3xl font-light tracking-tight text-[#0a0a0a]">4,9/5</p>
                <p className="text-[10px] font-bold uppercase tracking-widest text-gray-500">satisfaction client</p>
              </div>
            </div>
          </div>

        </div>
      </div>
    </section>
  );
}
