import Eyebrow from "./Eyebrow";

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
  /* Portrait affiché à droite, sur le motif de cercles concentriques. */
  imagePath?: string;
  imageAlt?: string;
  /* Petite preuve sociale flottante sur l'image (optionnelle). */
  badgeValue?: string;
  badgeLabel?: string;
};

/* Bande d'appel à l'action finale — carte sombre immersive sur fond blanc dominant.
   Reprend le motif « rings concentriques + portrait + CTA » de la référence, décliné
   à la marque (orange #FF6600, titre fin font-heading + highlight font-cooper).
   Section éditoriale statique : props optionnelles (défauts FR), branchables à Sanity. */
export default function ContactCTA({
  eyebrow = "Prêt à vous lancer ?",
  titlePart1 = "Passez à la ",
  titleHighlight = "visite virtuelle",
  titlePart2 = " dès aujourd'hui",
  description = "Décrivez-nous votre projet : nous vous rappelons sous 24h et planifions le tournage de votre visite 360°, livrée en 48h, partout en France.",
  primaryLabel = "Demander une démo",
  primaryHref = "#demo",
  secondaryLabel = "Parler à un expert",
  secondaryHref = "#contact",
  imagePath = "/didier.png",
  imageAlt = "Un expert easyvirtual.tours, prêt à démarrer votre projet",
  badgeValue = "+500",
  badgeLabel = "Visites réalisées",
}: Props) {
  return (
    <section id="contact" className="bg-white py-24 md:py-32 lg:py-40">
      <div className="mx-auto w-full max-w-[var(--container)] px-6 sm:px-8">
        <div className="relative isolate overflow-hidden rounded-3xl bg-zinc-950 px-6 py-14 sm:px-10 md:px-14 lg:px-20 lg:py-20 shadow-[0_24px_64px_-24px_rgba(255,102,0,0.25)]">

          {/* MOTIF DÉCORATIF — cercles concentriques (droite) + halo orange */}
          <div aria-hidden="true" className="pointer-events-none absolute inset-0 -z-10">
            <div className="absolute right-[-6rem] top-1/2 hidden -translate-y-1/2 lg:block">
              {[760, 600, 460, 320].map((size) => (
                <div
                  key={size}
                  className="absolute rounded-full border border-white/[0.06]"
                  style={{ width: size, height: size, left: -size / 2, top: -size / 2 }}
                />
              ))}
            </div>
            <div className="absolute right-0 top-0 h-80 w-80 rounded-full bg-[#FF6600]/25 blur-[110px]" />
            <div className="absolute bottom-[-4rem] left-[-2rem] h-72 w-72 rounded-full bg-[#FF6600]/10 blur-[120px]" />
          </div>

          <div className="grid grid-cols-1 items-center gap-12 lg:grid-cols-12 lg:gap-16">

            {/* BLOC GAUCHE — texte & CTA */}
            <div className="lg:col-span-7">
              <Eyebrow>{eyebrow}</Eyebrow>

              <h2 className="mt-5 max-w-2xl font-heading text-3xl font-light leading-[1.02] tracking-[-0.03em] text-white md:text-4xl lg:text-5xl">
                {titlePart1}
                <span className="font-cooper text-[#FF6600]">{titleHighlight}</span>
                {titlePart2}
              </h2>

              {description && (
                <p className="mt-6 max-w-xl text-lg leading-relaxed text-white/70">
                  {description}
                </p>
              )}

              <div className="mt-10 flex flex-col items-stretch gap-4 sm:flex-row sm:items-center">
                <a
                  href={primaryHref}
                  className="group inline-flex items-center justify-center gap-2 rounded-full bg-[#FF6600] px-8 py-4 font-semibold text-white shadow-xl shadow-orange-900/20 transition-all duration-300 hover:bg-[#e85c00]"
                >
                  {primaryLabel}
                  <svg viewBox="0 0 20 20" fill="none" stroke="currentColor" strokeWidth="2.5" strokeLinecap="round" strokeLinejoin="round" className="h-5 w-5 transition-transform duration-300 group-hover:translate-x-1 motion-reduce:transform-none">
                    <path d="M5 10h10m-4-4l4 4-4 4" />
                  </svg>
                </a>
                <a
                  href={secondaryHref}
                  className="inline-flex items-center justify-center gap-2 rounded-full border border-dashed border-white/40 bg-transparent px-8 py-4 font-semibold text-white transition-all duration-300 hover:border-white/70 hover:bg-white/5"
                >
                  {secondaryLabel}
                </a>
              </div>
            </div>

            {/* BLOC DROIT — portrait sur le motif de cercles */}
            <div className="relative lg:col-span-5">
              <div className="group relative mx-auto aspect-[4/5] w-full max-w-sm overflow-hidden rounded-3xl bg-zinc-900 ring-1 ring-white/10">
                <img
                  src={imagePath}
                  alt={imageAlt}
                  loading="lazy"
                  className="h-full w-full object-cover transition-transform duration-700 ease-in-out motion-safe:group-hover:scale-105"
                />
                <div className="absolute inset-0 bg-gradient-to-t from-black/70 via-black/10 to-transparent" />

                {/* Chip preuve sociale flottante */}
                {badgeValue && (
                  <div className="absolute bottom-5 left-5 inline-flex items-center gap-3 rounded-2xl border border-white/15 bg-white/10 px-4 py-3 backdrop-blur-md">
                    <span className="flex h-9 w-9 items-center justify-center rounded-xl bg-[#FF6600] text-white">
                      <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.8" strokeLinecap="round" strokeLinejoin="round" className="h-5 w-5" aria-hidden="true">
                        <path d="M19 4h-3.17L14.41 2H9.59L8.17 4H5c-1.1 0-2 .9-2 2v12c0 1.1.9 2 2 2h14c1.1 0 2-.9 2-2V6c0-1.1-.9-2-2-2z" />
                        <circle cx="12" cy="13" r="4" />
                      </svg>
                    </span>
                    <span className="flex flex-col leading-tight">
                      <span className="font-heading text-xl font-light tracking-tight text-white">{badgeValue}</span>
                      <span className="text-[10px] font-bold uppercase tracking-widest text-white/70">{badgeLabel}</span>
                    </span>
                  </div>
                )}
              </div>
            </div>

          </div>
        </div>
      </div>
    </section>
  );
}
