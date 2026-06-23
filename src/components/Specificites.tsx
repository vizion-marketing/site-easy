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

/* Pastille numérotée (01–04) — même badge « outline » que le bento « Qui sommes-nous »
   (AboutBento, variante orange sur fond clair) : contour fin orange + chiffre zéro-paddé
   en `font-heading`. Posée en tête de carte à la place des icônes. */
function StepBadge({ n, className = "" }: { n: number; className?: string }) {
  return (
    <span
      aria-hidden="true"
      className={`inline-flex h-10 w-10 items-center justify-center rounded-2xl border border-[#FF6600]/45 font-heading text-[13px] font-bold tracking-wide text-[#FF6600] ${className}`}
    >
      {String(n).padStart(2, "0")}
    </span>
  );
}

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
                  className="group/card rounded-2xl bg-white p-6 shadow-[0_2px_8px_-3px_rgba(10,10,10,0.10),0_22px_48px_-18px_rgba(10,10,10,0.14)] transition-all duration-300 hover:-translate-y-1 hover:shadow-[0_4px_12px_-3px_rgba(10,10,10,0.14),0_32px_64px_-20px_rgba(10,10,10,0.20)] motion-reduce:transition-none md:p-7"
                >
                  <StepBadge
                    n={idx + 1}
                    className="transition-transform duration-300 group-hover/card:scale-110 motion-reduce:transition-none"
                  />
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
