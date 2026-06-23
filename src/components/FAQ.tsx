import { useState } from "react";
import Eyebrow from "./Eyebrow";

/* Une question / réponse de la FAQ (branchable au schéma Sanity `faq`). */
export type FAQItemData = { question: string; answer: string };

/* Item d'accordéon — motif maison : révélation par grille `grid-rows-[0fr]→[1fr]`
   + opacité, enfant en `overflow-hidden`. Le « + » se mue en « − » : la barre
   verticale du SVG passe en `scale-0` quand l'item est ouvert. */
function FAQItem({
  question,
  answer,
  isOpen,
  onClick,
  id,
}: {
  question: string;
  answer: string;
  isOpen: boolean;
  onClick: () => void;
  id: string;
}) {
  return (
    <div
      className={`group overflow-hidden rounded-2xl border bg-white transition-all duration-300 motion-reduce:transition-none motion-reduce:hover:transform-none ${
        isOpen
          ? "border-[#ff8533]/60 shadow-[0_22px_50px_-16px_rgba(255,102,0,0.35)]"
          : "border-transparent shadow-[0_2px_8px_-3px_rgba(10,10,10,0.10),0_22px_48px_-18px_rgba(10,10,10,0.14)] hover:-translate-y-0.5 hover:border-[#ff8533]/60 hover:shadow-[0_22px_50px_-16px_rgba(255,102,0,0.35)]"
      }`}
    >
      <button
        type="button"
        aria-expanded={isOpen}
        aria-controls={`faq-content-${id}`}
        onClick={onClick}
        className="flex w-full items-center justify-between gap-4 p-6 text-left"
      >
        <span className="font-heading text-lg font-medium tracking-tight text-[#0a0a0a] transition-colors group-hover:text-[#FF6600] md:text-xl">
          {question}
        </span>
        <span
          className={`grid h-9 w-9 shrink-0 place-items-center rounded-full transition-colors duration-300 ${
            isOpen ? "bg-[#FF6600] text-white" : "bg-[#fff4ec] text-[#FF6600]"
          }`}
          aria-hidden="true"
        >
          <svg
            width="20"
            height="20"
            viewBox="0 0 24 24"
            fill="none"
            stroke="currentColor"
            strokeWidth="2.5"
            strokeLinecap="round"
            strokeLinejoin="round"
          >
            <line x1="5" y1="12" x2="19" y2="12" />
            <line
              x1="12"
              y1="5"
              x2="12"
              y2="19"
              className={`origin-center transition-transform duration-300 motion-reduce:transition-none ${
                isOpen ? "scale-0" : "scale-100"
              }`}
            />
          </svg>
        </span>
      </button>

      <div
        id={`faq-content-${id}`}
        role="region"
        className={`grid transition-all duration-300 ease-in-out motion-reduce:transition-none ${
          isOpen ? "grid-rows-[1fr] opacity-100" : "grid-rows-[0fr] opacity-0"
        }`}
      >
        <div className="overflow-hidden">
          <p className="px-6 pb-6 leading-relaxed text-gray-600">{answer}</p>
        </div>
      </div>
    </div>
  );
}

type Props = {
  eyebrow?: string;
  titlePart1?: string;
  titleHighlight?: string;
  titlePart2?: string;
  intro?: string;
  contactPrompt?: string;
  contactEmail?: string;
  ctaLabel?: string;
  ctaHref?: string;
  items?: FAQItemData[];
};

/* Données de démonstration — utilisées tant qu'aucun document `faq` n'est saisi
   dans le Studio (/admin). Remplacées par les vraies questions via la prop `items`. */
const DEFAULT_ITEMS: FAQItemData[] = [
  {
    question: "Comment se passe le devis et la facturation ?",
    answer:
      "Chaque projet fait l'objet d'un devis gratuit et personnalisé. Le tarif dépend de la surface (m²), de la complexité des lieux et des options choisies (plans 2D, points d'intérêt, mesures). Vous recevez une proposition claire, sans frais cachés.",
  },
  {
    question: "Quel est le délai de livraison ?",
    answer:
      "Comptez moins de 48 h ouvrées après le passage de notre technicien sur place. Vous recevez un lien prêt à partager ainsi que le code d'intégration à coller sur votre site.",
  },
  {
    question: "Intervenez-vous partout en France ?",
    answer:
      "Oui. Grâce à notre réseau de franchisés et de techniciens certifiés easyvirtual.tours, nous couvrons l'intégralité du territoire — un interlocuteur local près de chez vous, des standards identiques partout.",
  },
  {
    question: "Quelle technologie de captation utilisez-vous ?",
    answer:
      "Nous travaillons avec la technologie Matterport, le standard de la capture 3D haute-fidélité : navigation fluide, vue « maison de poupée », plan d'étage et mesures précises de vos espaces.",
  },
  {
    question: "Est-ce simple d'intégrer la visite sur mon site web ?",
    answer:
      "Aussi simple qu'une vidéo YouTube : nous vous fournissons un code d'intégration (iframe) à copier-coller dans votre CMS (WordPress, Webflow, Wix, Shopify…). Les visites sont 100 % compatibles mobile et tablette.",
  },
  {
    question: "L'hébergement des visites est-il inclus ?",
    answer:
      "Oui, l'hébergement sécurisé est inclus. Vos visites restent accessibles 24h/24, 7j/7, avec une bande passante confortable pour une expérience fluide côté visiteurs.",
  },
];

/* Section FAQ — îlot React interactif (accordéon « single-open », 1er item ouvert
   par défaut). En-tête de section aligné à gauche (colonne sticky) + carte de
   contact crème ; liste d'accordéons à droite. Les questions/réponses sont
   présentes dans le DOM (SEO + accessibilité), simplement repliées visuellement.
   Fond blanc, conteneurisée (1440px). Contenu brandable via Sanity (`items`). */
export default function FAQ({
  eyebrow = "Questions fréquentes",
  titlePart1 = "Tout ce que vous devez ",
  titleHighlight = "savoir",
  titlePart2 = " avant de vous lancer",
  intro = "On répond aux interrogations les plus courantes pour vous accompagner sereinement dans la mise en valeur de vos espaces.",
  contactPrompt = "Vous avez une autre question ?",
  contactEmail = "contact@easyvirtual.tours",
  ctaLabel = "Parler à un expert",
  ctaHref = "#contact",
  items = DEFAULT_ITEMS,
}: Props) {
  const data = items.length ? items : DEFAULT_ITEMS;
  const [openIndex, setOpenIndex] = useState<number | null>(0);

  const toggleItem = (index: number) =>
    setOpenIndex((current) => (current === index ? null : index));

  return (
    <section id="faq" className="bg-white py-16 md:py-24 lg:py-32">
      <div className="mx-auto w-full max-w-[var(--container)] px-6 sm:px-8">
        <div className="grid grid-cols-1 gap-12 lg:grid-cols-12 lg:gap-16">

          {/* COLONNE GAUCHE — en-tête sticky + carte de contact */}
          <div className="lg:col-span-5">
            <div className="lg:sticky lg:top-28">
              <Eyebrow>{eyebrow}</Eyebrow>

              <h2 className="mt-4 font-heading text-3xl font-bold leading-[1.05] tracking-tight text-[#0a0a0a] md:text-4xl lg:text-5xl">
                {titlePart1}
                <span className="font-cooper text-[#FF6600]">{titleHighlight}</span>
                {titlePart2}
              </h2>

              <p className="mt-6 max-w-md text-lg leading-relaxed text-gray-600">{intro}</p>

              {/* Carte de contact (tuile crème — ombre grise neutre canonique) */}
              <div className="mt-10 rounded-2xl bg-[#fdfaf6] p-8 shadow-[0_2px_8px_-3px_rgba(10,10,10,0.10),0_22px_48px_-18px_rgba(10,10,10,0.14)]">
                <h3 className="font-heading text-xl font-bold tracking-tight text-[#0a0a0a]">
                  {contactPrompt}
                </h3>

                <a
                  href={`mailto:${contactEmail}`}
                  className="mt-4 inline-flex items-center gap-3 text-gray-600 transition-colors hover:text-[#FF6600]"
                >
                  <span className="flex h-9 w-9 shrink-0 items-center justify-center rounded-lg bg-[#fff4ec] text-[#FF6600]">
                    <svg width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" aria-hidden="true">
                      <rect width="20" height="16" x="2" y="4" rx="2" />
                      <path d="m22 7-8.97 5.7a1.94 1.94 0 0 1-2.06 0L2 7" />
                    </svg>
                  </span>
                  <span className="font-medium">{contactEmail}</span>
                </a>

                <div className="mt-8">
                  <a
                    href={ctaHref}
                    className="group inline-flex items-center gap-2 rounded-full border border-[#FF6600] px-6 py-3.5 text-sm font-semibold text-[#FF6600] transition-all duration-300 hover:bg-[#FF6600] hover:text-white active:scale-95 motion-reduce:transition-none"
                  >
                    {ctaLabel}
                    <svg width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" className="transition-transform duration-300 group-hover:translate-x-1 motion-reduce:transform-none" aria-hidden="true">
                      <path d="M5 12h14M12 5l7 7-7 7" />
                    </svg>
                  </a>
                </div>
              </div>
            </div>
          </div>

          {/* COLONNE DROITE — liste d'accordéons */}
          <div className="lg:col-span-7">
            <div className="flex flex-col gap-4">
              {data.map((item, index) => (
                <FAQItem
                  key={index}
                  id={String(index)}
                  question={item.question}
                  answer={item.answer}
                  isOpen={openIndex === index}
                  onClick={() => toggleItem(index)}
                />
              ))}
            </div>
          </div>

        </div>
      </div>
    </section>
  );
}
