import type { ReactNode } from "react";
import Eyebrow from "./Eyebrow";

type SpecCard = { title: string; description: string };

type Props = {
  eyebrow?: string;
  /** Titre éditorial : `titlePart1` + highlight Cooper Black orange + `titlePart2`. */
  titlePart1?: string;
  titleHighlight?: string;
  titlePart2?: string;
  intro?: string;
  /** Photo de la moitié orange (gauche). Branchable Sanity plus tard. */
  imagePath?: string;
  imageAlt?: string;
  /** Légende de la carte orange (surimpression bas). */
  panelEyebrow?: string;
  panelCaption?: string;
  /** Exactement 4 cartes ; les icônes sont choisies par index dans le composant. */
  cards?: SpecCard[];
};

/* Sparkle de marque (déco panneau orange + eyebrow). */
function Sparkle({ className }: { className?: string }) {
  return (
    <svg viewBox="0 0 24 24" fill="currentColor" className={className} aria-hidden="true">
      <path d="M12 0 14.59 9.41 24 12 14.59 14.59 12 24 9.41 14.59 0 12 9.41 9.41 12 0Z" />
    </svg>
  );
}

/* Icônes des 4 cartes (SVG inline, stroke currentColor) — mappées par index.
   Hors data : la prop `cards` reste de la donnée pure. */
const CARD_ICONS: ReactNode[] = [
  // 1. Une véritable notion de conseil — bulle de dialogue / accompagnement
  <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round" className="h-6 w-6" aria-hidden="true">
    <path d="M21 11.5a8.38 8.38 0 0 1-.9 3.8 8.5 8.5 0 0 1-7.6 4.7 8.38 8.38 0 0 1-3.8-.9L3 21l1.9-5.7a8.38 8.38 0 0 1-.9-3.8 8.5 8.5 0 0 1 4.7-7.6 8.38 8.38 0 0 1 3.8-.9h.5a8.48 8.48 0 0 1 8 8v.5Z" />
    <path d="M8.5 11h.01" />
    <path d="M12 11h.01" />
    <path d="M15.5 11h.01" />
  </svg>,
  // 2. Livraison en 48h — horloge
  <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round" className="h-6 w-6" aria-hidden="true">
    <circle cx="12" cy="12" r="9" />
    <polyline points="12 7 12 12 15.5 14" />
    <path d="M12 2v1.5" />
    <path d="M21.5 9 20 9.4" />
  </svg>,
  // 3. Présence partout en France — point de carte
  <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round" className="h-6 w-6" aria-hidden="true">
    <path d="M20 10c0 6-8 12-8 12s-8-6-8-12a8 8 0 0 1 16 0Z" />
    <circle cx="12" cy="10" r="3" />
    <path d="m16 2-1.5 1.6" />
    <path d="m8 2 1.5 1.6" />
  </svg>,
  // 4. La technologie la plus avancée du marché (Matterport) — caméra / capture 3D
  <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round" className="h-6 w-6" aria-hidden="true">
    <path d="M14.5 4h-5L7 7H4a2 2 0 0 0-2 2v9a2 2 0 0 0 2 2h16a2 2 0 0 0 2-2V9a2 2 0 0 0-2-2h-3l-2.5-3z" />
    <circle cx="12" cy="13" r="3" />
    <path d="M12 10a4 4 0 0 0-4 4" />
    <path d="M16 10a4 4 0 0 1-4 4" />
  </svg>,
];

/* Section « Les spécificités de la visite virtuelle easyvirtual.tours » — fond blanc,
   conteneurisée (1440px). Coupée en deux : moitié orange + photo (gauche) ; titre + 4
   cartes (droite). Statique : props optionnelles (défauts FR). */
export default function Specificites({
  eyebrow = "Nos spécificités",
  titlePart1 = "Pourquoi confier votre visite virtuelle à ",
  titleHighlight = "easyvirtual.tours",
  titlePart2 = " ?",
  intro = "Bien plus qu'une simple captation : un véritable partenaire qui fait de votre visite virtuelle un outil commercial réellement performant.",
  imagePath = "/didier.png",
  imageAlt = "Captation 3D professionnelle d'un espace avec la caméra 360° Matterport",
  panelEyebrow = "Standard premium",
  panelCaption = "Le jumeau numérique ultra-réaliste",
  cards = [
    { title: "Une véritable notion de conseil", description: "Un accompagnement de bout en bout pour faire de votre visite virtuelle un outil performant, pas une simple captation." },
    { title: "Livraison en 48h", description: "De la captation à la mise en ligne, votre visite virtuelle est prête en deux jours." },
    { title: "Présence partout en France", description: "Un réseau local proche de vous, pour un accompagnement humain où que vous soyez." },
    { title: "La technologie la plus avancée du marché", description: "Matterport : un jumeau numérique ultra-réaliste, référence mondiale de la visite virtuelle." },
  ],
}: Props) {
  return (
    <section id="specificites" className="overflow-hidden bg-white py-24 md:py-32 lg:py-40">
      <div className="mx-auto w-full max-w-[var(--container)] px-6 sm:px-8">
        <div className="grid grid-cols-1 items-stretch gap-10 lg:grid-cols-2 lg:gap-16">

          {/* MOITIÉ GAUCHE — panneau orange + photo */}
          <div className="order-2 lg:order-1">
            <div
              className="group relative h-full min-h-[460px] overflow-hidden rounded-3xl"
              style={{ backgroundImage: "linear-gradient(40deg, #e85c00 0%, #FF6600 52%, #ff8a3d 100%)" }}
            >
              {/* Photo + voiles orange (lecture « orange + photo ») */}
              <div className="absolute inset-0">
                <img
                  src={imagePath}
                  alt={imageAlt}
                  className="h-full w-full object-cover transition-transform duration-700 ease-in-out motion-safe:group-hover:scale-105"
                />
                <div className="absolute inset-0 bg-[#FF6600]/25 mix-blend-multiply" aria-hidden="true" />
                <div className="absolute inset-0 bg-gradient-to-t from-[#FF6600]/85 via-[#FF6600]/30 to-transparent" aria-hidden="true" />
              </div>

              {/* Décors clippés au rayon */}
              <div className="pointer-events-none absolute inset-0 overflow-hidden">
                <div className="absolute -left-20 top-1/4 h-64 w-64 rounded-full bg-white/10 blur-3xl" />
                <div className="absolute -right-12 -top-12 h-40 w-40 rounded-full border border-white/20" />
                <div className="absolute -right-24 -top-24 h-64 w-64 rounded-full border border-white/15" />
                <div className="absolute -right-36 -top-36 h-96 w-96 rounded-full border border-white/10" />
                <Sparkle className="absolute right-10 top-10 h-6 w-6 text-white/40" />
              </div>

              {/* Légende */}
              <div className="absolute inset-x-0 bottom-0 p-8 md:p-10">
                <p className="text-[10px] font-bold uppercase tracking-widest text-white/80">
                  {panelEyebrow}
                </p>
                <h3 className="mt-2 font-heading text-xl font-light tracking-tight text-white md:text-2xl lg:text-3xl">
                  {panelCaption}
                </h3>
              </div>
            </div>
          </div>

          {/* MOITIÉ DROITE — titre + 4 cartes */}
          <div className="order-1 flex flex-col justify-center lg:order-2">
            <Eyebrow>{eyebrow}</Eyebrow>

            <h2 className="mt-4 font-heading text-3xl font-bold leading-[1.05] tracking-tight text-[#0a0a0a] md:text-4xl lg:text-5xl">
              {titlePart1}
              <span className="font-cooper text-[#FF6600]">{titleHighlight}</span>
              {titlePart2}
            </h2>

            <p className="mt-6 max-w-xl text-lg leading-relaxed text-gray-600">{intro}</p>

            <div className="mt-10 grid grid-cols-1 gap-4 sm:grid-cols-2 md:gap-6">
              {cards.map((card, idx) => (
                <div
                  key={card.title}
                  className="group/card rounded-2xl bg-[#fdfaf6] p-6 shadow-[0_2px_8px_-3px_rgba(10,10,10,0.10),0_22px_48px_-18px_rgba(10,10,10,0.14)] transition-all duration-300 hover:-translate-y-1 hover:shadow-[0_4px_12px_-3px_rgba(10,10,10,0.14),0_32px_64px_-20px_rgba(10,10,10,0.20)] motion-reduce:transition-none md:p-7"
                >
                  <div className="flex h-12 w-12 items-center justify-center rounded-xl bg-[#fff4ec] text-[#FF6600] transition-transform duration-300 group-hover/card:scale-110 motion-reduce:transition-none">
                    {CARD_ICONS[idx] ?? CARD_ICONS[0]}
                  </div>
                  <h3 className="mt-5 font-heading text-lg text-[#0a0a0a] md:text-xl">{card.title}</h3>
                  <p className="mt-2 text-sm leading-relaxed text-gray-600">{card.description}</p>
                </div>
              ))}
            </div>
          </div>

        </div>
      </div>
    </section>
  );
}
