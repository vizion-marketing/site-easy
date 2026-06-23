import Eyebrow from "./Eyebrow";
import { TestimonialCard, type Testimonial } from "./TestimonialsMarquee";

type Props = {
  /** Avis Google (données Sanity, repli placeholder dans index.astro). */
  testimonials?: Testimonial[];
  eyebrow?: string;
  titlePart1?: string;
  titleHighlight?: string;
  titlePart2?: string;
  intro?: string;
};

/* Classes d'animation par colonne — DOIVENT être des littéraux complets pour que le
   JIT Tailwind v4 les génère (une classe construite par interpolation n'est pas scannée).
   Sens alternés : la colonne du milieu défile à l'envers (`animation-direction: reverse`)
   et chaque colonne a une durée différente → le mur ne paraît jamais synchronisé. */
const COLUMN_ANIM = [
  "animate-[wall-scroll_42s_linear_infinite]",
  "animate-[wall-scroll_34s_linear_infinite] [animation-direction:reverse]",
  "animate-[wall-scroll_50s_linear_infinite]",
];

/* Masquage responsive : 1 colonne sur mobile, 2 sur md, 3 sur lg. */
const COLUMN_VISIBILITY = ["", "hidden md:block", "hidden lg:block"];

/* Répartit les témoignages en 3 colonnes. Chaque colonne reçoit TOUS les avis, mais
   décalés d'un tiers (rotation) pour que les colonnes ne s'alignent pas — puis la liste
   est dupliquée ×2 (la keyframe `wall-scroll` translate de -50% = une copie → boucle
   sans couture). Donner tous les avis à chaque colonne remplit la hauteur et garantit
   que la vue mobile (1 seule colonne) montre l'intégralité des témoignages. */
function buildColumns(testimonials: Testimonial[]): Testimonial[][] {
  const len = testimonials.length;
  const offsets = [0, Math.floor(len / 3), Math.floor((2 * len) / 3)];
  return offsets.map((offset) => {
    const rotated = [...testimonials.slice(offset), ...testimonials.slice(0, offset)];
    return [...rotated, ...rotated]; // ×2 pour la boucle sans couture
  });
}

/* Section « Mur de témoignages » — full-width, 3 colonnes verticales défilant en
   continu et en SENS ALTERNÉS (montée / descente / montée) pour un vrai mur vivant
   d'avis Google. Îlot React : les avis arrivent par props, la carte (`TestimonialCard`,
   variante `fullWidth`) et l'en-tête sont réutilisés. Conteneurisée à 1440px ; fond
   neutre `#f6f6f7` pour détacher les cartes blanches, avec fondus haut/bas. */
export default function TestimonialsWall({
  testimonials = [],
  eyebrow = "Témoignages",
  titlePart1 = "Ils en parlent ",
  titleHighlight = "mieux que nous",
  titlePart2 = ".",
  intro = "Les retours de nos clients et de nos franchisés partout en France. Une confiance bâtie sur la qualité de nos visites virtuelles 360° et l'accompagnement local.",
}: Props) {
  if (testimonials.length === 0) return null;

  const columns = buildColumns(testimonials);

  return (
    <section
      id="temoignages"
      className="relative w-full overflow-hidden bg-[#f6f6f7] py-16 md:py-24 lg:py-32"
    >
      {/* LE MUR — 3 colonnes verticales défilant en continu (fond de la section) */}
      <div className="mx-auto w-full max-w-[var(--container)] px-6 sm:px-8">
        <div className="relative">
          {/* Fondus haut & bas (raccord avec le fond de section) */}
          <div
            aria-hidden="true"
            className="pointer-events-none absolute inset-x-0 top-0 z-10 h-24 bg-gradient-to-b from-[#f6f6f7] to-transparent lg:h-32"
          />
          <div
            aria-hidden="true"
            className="pointer-events-none absolute inset-x-0 bottom-0 z-10 h-24 bg-gradient-to-t from-[#f6f6f7] to-transparent lg:h-32"
          />

          {/* Grille des colonnes */}
          <div className="grid grid-cols-1 gap-5 md:grid-cols-2 md:gap-6 lg:grid-cols-3">
            {columns.map((items, i) => (
              <div
                key={`testimonial-col-${i}`}
                className={`relative h-[620px] overflow-hidden lg:h-[760px] ${COLUMN_VISIBILITY[i]}`}
              >
                <div
                  className={`flex flex-col gap-5 md:gap-6 hover:[animation-play-state:paused] motion-reduce:animate-none ${COLUMN_ANIM[i]}`}
                >
                  {items.map((testimonial, idx) => (
                    <TestimonialCard
                      key={`${testimonial.author}-${idx}`}
                      testimonial={testimonial}
                      fullWidth
                    />
                  ))}
                </div>
              </div>
            ))}
          </div>
        </div>
      </div>

      {/* EN-TÊTE — centré verticalement ET horizontalement, superposé au mur.
         Voile radial (couleur du fond) pour garder le titre parfaitement lisible
         au-dessus des cartes qui défilent. */}
      <div className="pointer-events-none absolute inset-0 z-20 flex items-center justify-center px-6">
        <div
          aria-hidden="true"
          className="absolute inset-0 [background:radial-gradient(ellipse_58%_50%_at_center,rgba(246,246,247,0.85)_0%,rgba(246,246,247,0.45)_40%,rgba(246,246,247,0)_66%)]"
        />
        <div className="relative max-w-2xl rounded-[2rem] bg-[#f6f6f7]/95 px-6 py-10 text-center shadow-[0_8px_40px_-12px_rgba(10,10,10,0.12)] backdrop-blur-md lg:rounded-none lg:bg-transparent lg:px-0 lg:py-0 lg:shadow-none lg:backdrop-blur-none">
          <div className="flex justify-center">
            <Eyebrow>{eyebrow}</Eyebrow>
          </div>
          <h2 className="mt-6 font-heading text-4xl font-bold tracking-tight text-[#0a0a0a] md:text-5xl lg:text-6xl lg:leading-[1.05]">
            {titlePart1}
            <span className="font-cooper text-[#FF6600]">{titleHighlight}</span>
            {titlePart2}
          </h2>
          <p className="mx-auto mt-8 max-w-2xl text-lg leading-relaxed text-gray-600">{intro}</p>
        </div>
      </div>
    </section>
  );
}
