import { useEffect, useState } from "react";
import Eyebrow from "./Eyebrow";
import { LogoSet } from "./LogoMarquee";

/* ------------------------------------------------------------------ *
 * Calque CTA CONTACT (présentationnel) — rendu À L'INTÉRIEUR de la scène
 * épinglée de ProcessTimeline. La carte blanche occupe le bas, l'ours
 * détouré agrippe son bord haut (corps au-dessus, sur l'orange). Piloté
 * par `pull` (0→1) : translateY de tout le calque (l'ours « tire » la
 * carte vers le haut). `active` → boucle de clin d'œil (wink1 ↔ wink2).
 * ------------------------------------------------------------------ */

const ArrowIcon = ({ className = "" }: { className?: string }) => (
  <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.5" strokeLinecap="round" strokeLinejoin="round" className={className} aria-hidden="true">
    <line x1="5" y1="12" x2="19" y2="12" /><polyline points="12 5 19 12 12 19" />
  </svg>
);

const Star = () => (
  <svg viewBox="0 0 24 24" fill="currentColor" className="h-4 w-4" aria-hidden="true">
    <path d="M12 2l2.9 6.26L22 9.27l-5 4.87 1.18 6.88L12 17.77 5.82 21l1.18-6.88-5-4.87 7.1-1.01z" />
  </svg>
);

type Props = {
  /** Position de tirage 0→1 (0 = sous l'écran, 1 = en place). */
  pull: number;
  /** Déclenche la boucle de clin d'œil (phase de repos). */
  active: boolean;
  eyebrow?: string;
  titlePart1?: string;
  titleHighlight?: string;
  titlePart2?: string;
  intro?: string;
  ctaLabel?: string;
  ctaHref?: string;
  secondaryLabel?: string;
  secondaryHref?: string;
  proofText?: string;
  image?: string;
  winkImage?: string;
};

export default function ContactBear({
  pull,
  active,
  eyebrow = "On en parle ?",
  titlePart1 = "Plus de ",
  titleHighlight = "1 000 entreprises",
  titlePart2 = " nous ont confié la réalisation de visites virtuelles en France et en Europe",
  intro = "Serez-vous les prochains ?",
  ctaLabel = "Contactez-nous",
  ctaHref = "#contact",
  secondaryLabel = "Voir des réalisations",
  secondaryHref = "#visites",
  proofText = "+30 agences partout en France nous font confiance",
  image = "/wink1.png",
  winkImage = "/wink2.png",
}: Props) {
  const [winking, setWinking] = useState(false);

  useEffect(() => {
    if (!active || !winkImage) {
      setWinking(false);
      return;
    }
    let toWink: ReturnType<typeof setTimeout>;
    let toBack: ReturnType<typeof setTimeout>;
    const loop = () => {
      toWink = setTimeout(() => {
        setWinking(true);
        toBack = setTimeout(() => {
          setWinking(false);
          loop();
        }, 240);
      }, 2600);
    };
    loop();
    return () => {
      clearTimeout(toWink);
      clearTimeout(toBack);
    };
  }, [active, winkImage]);

  return (
    <div
      className="pointer-events-none absolute inset-0 z-30"
      style={{ transform: `translateY(${(1 - pull) * 100}%)` }}
      aria-hidden={pull < 0.5}
    >
      {/* Carte blanche (portion basse de l'écran) — sans ombre */}
      <div className="absolute inset-x-0 bottom-0 top-[34%] overflow-hidden rounded-t-[2rem] bg-white lg:rounded-t-[2.5rem]">
        <div className="pointer-events-auto mx-auto flex h-full w-full max-w-6xl flex-col items-center justify-center px-6 pb-10 pt-20 text-center sm:px-8">
          <Eyebrow>{eyebrow}</Eyebrow>
          <h2 className="mt-4 font-heading text-4xl font-bold leading-[1.03] tracking-tight text-[#0a0a0a] md:text-5xl">
            {titlePart1}
            <span className="font-cooper text-[#FF6600]">{titleHighlight}</span>
            {titlePart2}
          </h2>
          {intro && <p className="mx-auto mt-4 max-w-xl text-base leading-relaxed text-gray-600 md:text-lg">{intro}</p>}

          {/* Marquee de logos partenaires — au-dessus des boutons */}
          <div className="mt-8 w-full max-w-xl">
            <div className="marquee-mask relative w-full overflow-hidden text-gray-400">
              <div className="marquee flex w-max">
                <LogoSet />
                <LogoSet hidden />
              </div>
            </div>
          </div>

          <div className="mt-7 flex flex-wrap items-center justify-center gap-5">
            <a
              href={ctaHref}
              className="group inline-flex items-center gap-3 rounded-full bg-[#FF6600] px-9 py-4 font-semibold text-white shadow-xl shadow-orange-900/15 transition-all duration-300 hover:-translate-y-1 hover:bg-[#e85c00] active:scale-95 motion-reduce:transition-none motion-reduce:hover:translate-y-0"
            >
              {ctaLabel}
              <ArrowIcon className="h-5 w-5 transition-transform duration-300 group-hover:translate-x-1 motion-reduce:transform-none" />
            </a>
            {secondaryLabel && (
              <a href={secondaryHref} className="group inline-flex items-center gap-2 font-semibold text-[#FF6600] underline decoration-[#FF6600]/40 underline-offset-4 transition-all hover:decoration-[#FF6600]">
                {secondaryLabel}
                <ArrowIcon className="h-[18px] w-[18px] transition-transform duration-300 group-hover:translate-x-1 motion-reduce:transform-none" />
              </a>
            )}
          </div>

          {/* Note (étoiles + confiance) */}
          <div className="mt-7 flex flex-col items-center gap-1">
            <div className="flex items-center gap-0.5 text-[#FF6600]">
              <Star /><Star /><Star /><Star /><Star />
            </div>
            <span className="text-sm font-medium text-gray-600">{proofText}</span>
          </div>
        </div>
      </div>

      {/* Ours détouré qui PASSE PAR-DESSUS le bord haut de la carte (pattes
         recouvrant le blanc), sans ombre. Les deux poses (yeux ouverts / clin
         d'œil) sont empilées et préchargées : on bascule l'OPACITÉ (et non le
         `src`) pour que le clin d'œil soit instantané (sinon l'image du clin,
         jamais chargée, n'a pas le temps de s'afficher sur les ~240 ms). */}
      <div className="absolute inset-x-0 bottom-[61.5%] flex justify-center">
        <div className="relative w-[min(680px,92%)]">
          <img
            src={image}
            alt="La mascotte easy"
            className="block w-full select-none"
            loading="lazy"
          />
          {winkImage && (
            <img
              src={winkImage}
              alt="La mascotte easy vous fait un clin d'œil"
              aria-hidden="true"
              className={`absolute inset-0 block w-full select-none transition-opacity duration-100 ${winking ? "opacity-100" : "opacity-0"}`}
              loading="lazy"
            />
          )}
        </div>
      </div>
    </div>
  );
}
