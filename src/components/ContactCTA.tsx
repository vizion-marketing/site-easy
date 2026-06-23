import Eyebrow from "./Eyebrow";
import { LogoSet } from "./LogoMarquee";

type Stat = { value: string; label: string };

type Props = {
  eyebrow?: string;
  titlePart1?: string;
  titleHighlight?: string;
  titlePart2?: string;
  description?: string;
  primaryLabel?: string;
  primaryHref?: string;
  secondaryLabel?: string;
  secondaryHref?: string;
  /* Chiffres-clés rappelés (preuve sociale). Le 1er reprend badgeValue/badgeLabel. */
  badgeValue?: string;
  badgeLabel?: string;
  secondStatValue?: string;
  secondStatLabel?: string;
  thirdStatValue?: string;
  thirdStatLabel?: string;
};

/* Section d'appel à l'action finale — bandeau ORANGE pleine largeur, à part entière
   (juste avant le footer). Gros titre centré « prendre rendez-vous » + rappel de la
   preuve sociale (bandeau de logos partenaires repris du hero + chiffres-clés). Markup/
   design issus du MCP Gemini Design ; props (défauts FR) branchables à Sanity. Îlot Astro. */
export default function ContactCTA({
  eyebrow = "Prêt à vous lancer ?",
  titlePart1 = "Prenons rendez-vous pour votre ",
  titleHighlight = "visite virtuelle",
  titlePart2 = "",
  description = "Décrivez-nous votre projet : nous vous rappelons sous 24h et planifions le tournage de votre visite 360°, livrée en 48h, partout en France.",
  primaryLabel = "Prendre rendez-vous",
  primaryHref = "#demo",
  secondaryLabel = "Parler à un expert",
  secondaryHref = "#contact",
  badgeValue = "+500",
  badgeLabel = "Visites réalisées",
  secondStatValue = "+100",
  secondStatLabel = "Entreprises",
  thirdStatValue = "48h",
  thirdStatLabel = "Livraison",
}: Props) {
  const stats: Stat[] = [
    { value: badgeValue, label: badgeLabel },
    { value: secondStatValue, label: secondStatLabel },
    { value: thirdStatValue, label: thirdStatLabel },
  ].filter((s) => s.value && s.label);

  return (
    <section
      id="contact"
      className="relative isolate overflow-hidden py-24 md:py-32 lg:py-40"
      style={{ backgroundImage: "linear-gradient(135deg, #e85c00 0%, #FF6600 50%, #ff8a3d 100%)" }}
    >
      {/* DÉCOR — cercles concentriques en filigrane + halo blanc flou */}
      <div aria-hidden="true" className="pointer-events-none absolute inset-0 -z-10">
        <div className="absolute left-1/2 top-1/2 h-[600px] w-[600px] -translate-x-1/2 -translate-y-1/2 rounded-full border border-white/15" />
        <div className="absolute left-1/2 top-1/2 h-[400px] w-[400px] -translate-x-1/2 -translate-y-1/2 rounded-full border border-white/10" />
        <div className="absolute left-1/2 top-1/2 h-[240px] w-[240px] -translate-x-1/2 -translate-y-1/2 rounded-full border border-white/5" />
        <div className="absolute -top-24 left-1/2 h-96 w-96 -translate-x-1/2 bg-white/10 blur-3xl" />
      </div>

      <div className="mx-auto w-full max-w-[var(--container)] px-6 sm:px-8">
        <div className="mx-auto max-w-4xl text-center">
          <div className="flex justify-center">
            <Eyebrow className="text-white">{eyebrow}</Eyebrow>
          </div>

          <h2 className="mt-8 font-heading text-4xl font-light leading-[1.02] tracking-[-0.03em] text-white md:text-6xl lg:text-7xl">
            {titlePart1}
            <span className="font-cooper text-white">{titleHighlight}</span>
            {titlePart2}
          </h2>

          {description && (
            <p className="mx-auto mt-8 max-w-2xl text-lg leading-relaxed text-white/85">
              {description}
            </p>
          )}

          {/* PREUVE SOCIALE — bandeau logos partenaires (repris du hero) + chiffres-clés */}
          <div className="mt-14 border-y border-white/15 py-10">
            {/* Marquee de logos — logos blancs sur orange, fondu latéral via .marquee-mask */}
            <div className="marquee-mask relative w-full overflow-hidden text-white/85">
              <div className="marquee flex w-max">
                <LogoSet />
                <LogoSet hidden />
              </div>
            </div>

            {/* Chiffres-clés, centrés sous le marquee */}
            <div className="mt-10 flex items-center justify-center gap-10 md:gap-16">
              {stats.map((s, i) => (
                <div key={i} className={i === 2 ? "hidden text-center sm:block" : "text-center"}>
                  <div className="font-heading text-3xl font-light text-white md:text-4xl">{s.value}</div>
                  <div className="mt-1 text-[10px] font-bold uppercase tracking-widest text-white/70">{s.label}</div>
                </div>
              ))}
            </div>
          </div>

          {/* ACTIONS CENTRÉES */}
          <div className="mt-16 flex flex-col items-center justify-center gap-4 sm:flex-row">
            <a
              href={primaryHref}
              className="group inline-flex h-14 items-center justify-center gap-2 rounded-full bg-white px-10 text-base font-bold text-[#FF6600] transition-all duration-300 hover:bg-white/95 active:scale-[0.98]"
            >
              {primaryLabel}
              <svg viewBox="0 0 20 20" fill="none" stroke="currentColor" strokeWidth="2.5" strokeLinecap="round" strokeLinejoin="round" className="h-5 w-5 transition-transform duration-300 group-hover:translate-x-1 motion-reduce:transform-none">
                <path d="M5 10h10m-4-4l4 4-4 4" />
              </svg>
            </a>
            <a
              href={secondaryHref}
              className="inline-flex h-14 items-center justify-center gap-2 rounded-full border border-white/40 px-10 text-base font-bold text-white transition-all duration-300 hover:bg-white/10 active:scale-[0.98]"
            >
              {secondaryLabel}
            </a>
          </div>
        </div>
      </div>
    </section>
  );
}
