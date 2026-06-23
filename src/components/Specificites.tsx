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

/* Dégradé mesh orange de marque — pastille d'icône identique aux cartes de cas d'usages /
   fonctionnalités (cf. MESH_BRAND dans UseCases / VirtualTourPilot / Navbar). */
const MESH_BRAND = {
  backgroundColor: "#ff6600",
  backgroundImage:
    "radial-gradient(at 15% 18%, #ff8040 0px, transparent 50%)," +
    "radial-gradient(at 85% 12%, #ffc7a0 0px, transparent 42%)," +
    "radial-gradient(at 92% 60%, #ff7c2a 0px, transparent 46%)," +
    "radial-gradient(at 12% 92%, #ee6000 0px, transparent 52%)," +
    "radial-gradient(at 50% 50%, #ff741c 0px, transparent 55%)",
};

/* Icônes blanches des 4 cartes (SVG inline, même design que les pastilles de cas d'usages) :
   qualité des livrables · livraison 48h · présence France · technologie. Même ordre que `cards`. */
const CARD_ICONS = [
  // Qualité des livrables — médaille / sceau d'excellence
  <svg className="h-5 w-5" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" aria-hidden="true"><circle cx="12" cy="8" r="6" /><path d="M15.477 12.89 17 22l-5-3-5 3 1.523-9.11" /></svg>,
  // Livraison 48h — horloge
  <svg className="h-5 w-5" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" aria-hidden="true"><circle cx="12" cy="12" r="9" /><polyline points="12 7 12 12 15 14" /></svg>,
  // Présence France — repère carte
  <svg className="h-5 w-5" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" aria-hidden="true"><path d="M20 10c0 6-8 12-8 12s-8-6-8-12a8 8 0 0 1 16 0Z" /><circle cx="12" cy="10" r="3" /></svg>,
  // Technologie — jumeau numérique 3D (cube)
  <svg className="h-5 w-5" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" aria-hidden="true"><path d="m21 16-9 5-9-5V8l9-5 9 5v8Z" /><path d="m3 8 9 5 9-5" /><path d="M12 13v8" /></svg>,
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
    { title: "Une attention particulière à la qualité des livrables", description: "Notre système de franchise garantit cette exigence : des franchisés formés aux mêmes méthodes, pour un livrable premium et homogène partout." },
    { title: "Livraison en 48h", description: "De la captation à la mise en ligne en deux jours. Et une vraie proximité humaine : votre interlocuteur n'est pas un simple exécutant, mais un conseiller investi dans la réussite de votre projet." },
    { title: "Une présence partout en France", description: "Un réseau local proche de vous, en France comme à l'international, pour un accompagnement humain où que soit votre projet." },
    { title: "Des visites virtuelles en avance sur le marché", description: "Au-delà du standard Matterport, notre partenariat avec Treedis enrichit vos visites de fonctionnalités interactives inédites." },
  ],
}: Props) {
  return (
    <section id="specificites" className="overflow-hidden bg-white py-16 md:py-24 lg:py-32">
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
                  className="group rounded-2xl border border-transparent bg-white p-6 shadow-[0_2px_8px_-3px_rgba(10,10,10,0.10),0_22px_48px_-18px_rgba(10,10,10,0.14)] transition-all duration-300 hover:-translate-y-0.5 hover:border-[#ff8533]/60 hover:shadow-[0_22px_50px_-16px_rgba(255,102,0,0.35)] motion-reduce:transition-none motion-reduce:hover:transform-none md:p-7"
                >
                  <span
                    className="flex h-11 w-11 shrink-0 items-center justify-center rounded-xl text-white transition-transform duration-300 group-hover:scale-105 motion-reduce:transition-none motion-reduce:group-hover:transform-none"
                    style={MESH_BRAND}
                  >
                    {CARD_ICONS[idx] ?? CARD_ICONS[0]}
                  </span>
                  <h3 className="mt-5 font-heading text-[15px] font-bold leading-tight text-[#0a0a0a] transition-colors duration-300 group-hover:text-[#FF6600]">{card.title}</h3>
                  <p className="mt-2 text-sm leading-relaxed text-gray-600">{card.description}</p>
                </div>
              ))}
            </div>

            {/* Bandeau technologies partenaires — Matterport + Treedis (wordmarks SVG inline,
                placeholders à remplacer par les assets officiels). */}
            <div className="mt-12 flex flex-col gap-y-5 border-t border-[#e5e7eb] pt-8 sm:flex-row sm:items-center sm:gap-x-10">
              <span className="whitespace-nowrap text-[10px] font-semibold uppercase tracking-[0.15em] text-gray-400">
                Nos technologies partenaires
              </span>

              <div className="flex items-center gap-x-8">
                {/* Matterport */}
                <div className="group flex cursor-default items-center gap-2.5 opacity-60 grayscale transition-all duration-300 hover:opacity-100 hover:grayscale-0">
                  <svg viewBox="0 0 24 24" className="h-6 w-6 text-[#0a0a0a]" fill="none" stroke="currentColor" strokeWidth="1.5" aria-hidden="true">
                    <path d="M5 5h3v3H5zM10.5 5h3v3h-3zM16 5h3v3h-3zM5 10.5h3v3H5zM10.5 10.5h3v3h-3zM16 10.5h3v3h-3zM5 16h3v3H5zM10.5 16h3v3h-3zM16 16h3v3h-3z" fill="currentColor" stroke="none" />
                  </svg>
                  <span className="font-heading text-lg font-bold tracking-tight text-[#0a0a0a]">Matterport</span>
                </div>

                {/* Séparateur fin */}
                <div className="h-4 w-px bg-gray-200" aria-hidden="true" />

                {/* Treedis */}
                <div className="group flex cursor-default items-center gap-2 opacity-60 grayscale transition-all duration-300 hover:opacity-100 hover:grayscale-0">
                  <svg viewBox="0 0 24 24" className="h-6 w-6 text-[#0a0a0a]" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" aria-hidden="true">
                    <circle cx="12" cy="6" r="2" />
                    <circle cx="6" cy="18" r="2" />
                    <circle cx="18" cy="18" r="2" />
                    <path d="M12 8v4M12 12H6v4M12 12h6v4" opacity="0.5" />
                  </svg>
                  <span className="font-heading text-lg font-bold tracking-tight text-[#0a0a0a]">treedis</span>
                </div>
              </div>
            </div>
          </div>

        </div>
      </div>
    </section>
  );
}
