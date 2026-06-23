import { useState, useEffect, useRef, type ComponentType } from "react";
import { LiquidGlass } from "./LiquidGlass";
import {
  HomeMotion,
  StarMotion,
  TagMotion,
  BinocularsMotion,
  LayersMotion,
  GlobeMotion,
  ConnectionSignalMotion,
  SelectWindowMotion,
  LaunchMotion,
  EventsMotion,
  ScanAltMotion,
  RecommendMotion,
  PinMotion,
  ExploreMotion,
  FitToScreenMotion,
  GridMotion,
  NewTabMotion,
  MaximizeMotion,
  DashboardMotion,
  ConnectMotion,
  ScanMotion,
  RotateMotion,
  ChatMotion,
  ReviewMotion,
  BookmarkMotion,
  EditMotion,
} from "@carbon/icons-motion";

type MotionIconProps = { isAnimating?: boolean; size?: number };

type NavLink = {
  name: string;
  href?: string;
  type?: "mega";
  id?: string;
};

type MenuItem = { title: string; desc: string; icon: ComponentType<MotionIconProps>; href?: string };

/* Taxonomie de menu reçue de Sanity (secteur d'activité / cas d'usage).
   `icon` est une clé string mappée vers un composant Carbon Motion (ICON_MAP). */
type TaxItem = { title: string; desc: string; icon: string; href: string };

/* Mappe les clés d'icône des taxonomies Sanity (cf. menuIconOptions.ts) vers
   les composants Carbon Motion. Garder synchronisé avec MENU_ICON_OPTIONS. */
const ICON_MAP: Record<string, ComponentType<MotionIconProps>> = {
  home: HomeMotion,
  star: StarMotion,
  tag: TagMotion,
  binoculars: BinocularsMotion,
  layers: LayersMotion,
  globe: GlobeMotion,
  signal: ConnectionSignalMotion,
  window: SelectWindowMotion,
  launch: LaunchMotion,
  events: EventsMotion,
  scan: ScanAltMotion,
  recommend: RecommendMotion,
};

/* Convertit une taxonomie Sanity en item de menu (icône string → composant). */
function toMenuItem(item: TaxItem): MenuItem {
  return {
    title: item.title,
    desc: item.desc,
    icon: ICON_MAP[item.icon] ?? BinocularsMotion,
    href: item.href,
  };
}

/* Visite virtuelle référencée dans le méga-menu "Dernières visites". */
type TourItem = {
  title: string;
  client?: string;
  location?: string;
  category?: string;
  /** Cas d'usage principal de la visite (1er tag `casUsages`). */
  useCase?: string;
  /** Mini description (texte brut extrait du blockContent `description`). */
  description?: string;
  imageUrl: string | null;
  href: string;
};

/* Mesh gradient orange de marque — fond premium réutilisé sur les pastilles d'icônes
   des méga-menus et la carte promo "Visite pilote". */
const MESH_BRAND = {
  backgroundColor: "#ff6600",
  backgroundImage:
    "radial-gradient(at 15% 18%, #ff8040 0px, transparent 50%)," +
    "radial-gradient(at 85% 12%, #ffc7a0 0px, transparent 42%)," +
    "radial-gradient(at 92% 60%, #ff7c2a 0px, transparent 46%)," +
    "radial-gradient(at 12% 92%, #ee6000 0px, transparent 52%)," +
    "radial-gradient(at 50% 50%, #ff741c 0px, transparent 55%)",
};

/* Dégradé diagonal orange de marque — fond du bouton « play » des cartes de visite,
   identique au gros bouton de lecture de la section « visite virtuelle » (VirtualTourPilot.tsx). */
const BRAND_DIAGONAL = {
  backgroundImage: "linear-gradient(40deg, #e85c00 0%, #FF6600 52%, #ff8a3d 100%)",
};

/* Lien de méga-menu : pastille carrée à dégradé mesh orange, icône blanche, animée au survol. */
function SectorLink({ item }: { item: MenuItem }) {
  const [hover, setHover] = useState(false);
  const Icon = item.icon;
  return (
    <a
      href={item.href ?? "#"}
      className="group flex items-center gap-4 rounded-xl border border-transparent bg-white p-3 transition-all duration-300 hover:-translate-y-0.5 hover:border-[#ff8533]/60 hover:shadow-[0_22px_50px_-16px_rgba(255,102,0,0.35)] motion-reduce:transition-none motion-reduce:hover:transform-none"
      onMouseEnter={() => setHover(true)}
      onMouseLeave={() => setHover(false)}
    >
      <div
        className="flex h-11 w-11 shrink-0 items-center justify-center rounded-xl transition-transform duration-300 group-hover:scale-105"
        style={MESH_BRAND}
      >
        <span className="cds-motion-icon cds-motion-icon--white">
          <Icon isAnimating={hover} size={22} />
        </span>
      </div>
      <div className="min-w-0">
        <h4 className="font-heading font-semibold leading-tight text-[#0a0a0a] transition-colors duration-300 group-hover:text-[#FF6600]">
          {item.title}
        </h4>
        <p className="mt-0.5 truncate text-sm leading-relaxed text-gray-500">
          {item.desc}
        </p>
      </div>
    </a>
  );
}

/* Lien "Cas d'usages" : pastille carrée à dégradé mesh orange, icône blanche, animée au survol. */
function UsageLink({ item }: { item: MenuItem }) {
  const [hover, setHover] = useState(false);
  const Icon = item.icon;
  return (
    <a
      href={item.href ?? "#"}
      className="group flex items-center gap-4 rounded-xl border border-transparent bg-white p-3 transition-all duration-300 hover:-translate-y-0.5 hover:border-[#ff8533]/60 hover:shadow-[0_22px_50px_-16px_rgba(255,102,0,0.35)] motion-reduce:transition-none motion-reduce:hover:transform-none"
      onMouseEnter={() => setHover(true)}
      onMouseLeave={() => setHover(false)}
    >
      <div
        className="flex h-11 w-11 shrink-0 items-center justify-center rounded-xl transition-transform duration-300 group-hover:scale-105"
        style={MESH_BRAND}
      >
        <span className="cds-motion-icon cds-motion-icon--white">
          <Icon isAnimating={hover} size={22} />
        </span>
      </div>
      <div className="min-w-0">
        <h4 className="font-heading font-semibold leading-tight text-lg text-[#0a0a0a] transition-colors duration-300 group-hover:text-[#FF6600]">
          {item.title}
        </h4>
        <p className="mt-0.5 truncate text-sm leading-relaxed text-gray-500">
          {item.desc}
        </p>
      </div>
    </a>
  );
}

/* Lien "Fonctionnalités" : petite icône Carbon gris → orange au survol. */
function FeatureLink({ item }: { item: MenuItem }) {
  const [hover, setHover] = useState(false);
  const Icon = item.icon;
  return (
    <a
      href="#"
      className="group flex items-center gap-3 py-2 transition-colors"
      onMouseEnter={() => setHover(true)}
      onMouseLeave={() => setHover(false)}
    >
      <span className={`cds-motion-icon ${hover ? "cds-motion-icon--brand" : "cds-motion-icon--muted"}`}>
        <Icon isAnimating={hover} size={16} />
      </span>
      <span className="text-sm font-medium text-[#0a0a0a] group-hover:text-[#FF6600] transition-colors">{item.title}</span>
    </a>
  );
}

/* Carte de visite virtuelle (méga-menu "Dernières visites") : reprend le motif des cartes
   « coup de cœur » de la section Secteurs (SecteursBenefices) — tuile image verticale,
   voile dégradé orange en bas, badge d'angle catégorie, contenu blanc en surimpression,
   bouton play centré. */
function TourCard({ tour }: { tour: TourItem }) {
  const meta = [tour.client, tour.location].filter(Boolean).join(" · ");
  return (
    <a
      href={tour.href}
      className="group relative aspect-[4/5] w-full overflow-hidden rounded-3xl bg-zinc-100 transition-shadow duration-300 shadow-[0_2px_8px_-3px_rgba(10,10,10,0.10),0_22px_48px_-18px_rgba(10,10,10,0.14)] hover:shadow-[0_4px_12px_-3px_rgba(10,10,10,0.14),0_32px_64px_-20px_rgba(10,10,10,0.20)]"
    >
      {tour.imageUrl && (
        <img
          src={tour.imageUrl}
          alt={tour.title}
          className="h-full w-full object-cover transition-transform duration-700 ease-in-out motion-safe:group-hover:scale-105"
          loading="lazy"
        />
      )}

      {/* Voile dégradé orange easyJet limité au bas de la carte */}
      <div className="absolute inset-x-0 bottom-0 h-2/3 bg-gradient-to-t from-[#FF6600] via-[#FF6600]/60 to-transparent" aria-hidden="true" />

      {/* Badge d'angle catégorie (haut-gauche) */}
      {tour.category && (
        <div className="absolute left-0 top-0 z-10 inline-flex items-center rounded-tl-3xl rounded-br-[1.75rem] bg-[#FF6600] py-2.5 pl-4 pr-5 text-white shadow-lg shadow-orange-900/20">
          <span className="text-[10px] font-bold uppercase tracking-widest leading-none">{tour.category}</span>
        </div>
      )}

      {/* Bouton play centré */}
      <div className="absolute inset-0 flex items-center justify-center pb-20">
        <div
          className="relative flex h-14 w-14 items-center justify-center rounded-full text-white shadow-2xl transition-all duration-300 group-hover:scale-110 group-hover:shadow-[0_0_30px_-4px_rgba(255,102,0,0.55)] motion-reduce:transition-none"
          style={BRAND_DIAGONAL}
        >
          <svg className="ml-1 h-7 w-7 fill-current" viewBox="0 0 24 24" aria-hidden="true">
            <path d="M8 5v14l11-7z" />
          </svg>
          <div className="pointer-events-none absolute inset-0 rounded-full bg-white/0 transition-colors duration-300 group-hover:bg-white/10" />
        </div>
      </div>

      {/* Contenu blanc en surimpression (bas) */}
      <div className="absolute inset-x-0 bottom-0 p-6 md:p-8">
        <div className="flex flex-col gap-2">
          {tour.useCase && (
            <div>
              <span className="inline-flex items-center rounded-md bg-white/20 px-2 py-0.5 text-[10px] font-bold uppercase tracking-wider text-white backdrop-blur-md">
                {tour.useCase}
              </span>
            </div>
          )}

          <h4 className="font-heading text-xl font-bold leading-tight text-white">
            {tour.title}
          </h4>

          {tour.description && (
            <p className="line-clamp-2 text-xs leading-relaxed text-white/80">
              {tour.description}
            </p>
          )}

          {meta && (
            <p className="flex items-center gap-1.5 text-[11px] font-medium text-white/70">
              {tour.location && (
                <svg className="h-3 w-3 shrink-0 opacity-70" fill="currentColor" viewBox="0 0 24 24" aria-hidden="true">
                  <path d="M12 2C8.13 2 5 5.13 5 9c0 5.25 7 13 7 13s7-7.75 7-13c0-3.87-3.13-7-7-7zm0 9.5a2.5 2.5 0 110-5 2.5 2.5 0 010 5z" />
                </svg>
              )}
              <span className="truncate">{meta}</span>
            </p>
          )}

          <div className="mt-2 flex items-center gap-2 text-xs font-bold uppercase tracking-wide text-white">
            <span className="underline decoration-white/40 underline-offset-4 transition-colors group-hover:decoration-white">Lancer la visite</span>
            <svg className="h-4 w-4 transition-transform duration-300 group-hover:translate-x-1 motion-reduce:transform-none" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth="3" aria-hidden="true">
              <path strokeLinecap="round" strokeLinejoin="round" d="M9 5l7 7-7 7" />
            </svg>
          </div>
        </div>
      </div>
    </a>
  );
}

export default function Navbar({
  tours = [],
  secteurs = [],
  casUsages = [],
}: {
  tours?: TourItem[];
  secteurs?: TaxItem[];
  casUsages?: TaxItem[];
}) {
  const [activeMenu, setActiveMenu] = useState<string | null>(null);
  const [isMobileMenuOpen, setIsMobileMenuOpen] = useState(false);
  const [mobileExpanded, setMobileExpanded] = useState<string | null>(null);
  const [isTourOpen, setIsTourOpen] = useState(false);

  // Triangle connecteur méga-menu → item de nav : on mémorise le centre horizontal
  // (relatif au <header>) de l'item survolé pour y aligner le caret.
  const headerRef = useRef<HTMLElement>(null);
  const [caretLeft, setCaretLeft] = useState<number | null>(null);

  const openMega = (id: string, el: HTMLElement) => {
    setActiveMenu(id);
    const header = headerRef.current;
    if (!header) return;
    const hRect = header.getBoundingClientRect();
    const iRect = el.getBoundingClientRect();
    setCaretLeft(iRect.left - hRect.left + iRect.width / 2);
  };

  // Modale visite pilote : fermeture à l'Échap + blocage du scroll de fond.
  useEffect(() => {
    if (!isTourOpen) return;
    const onKey = (e: KeyboardEvent) => {
      if (e.key === "Escape") setIsTourOpen(false);
    };
    document.addEventListener("keydown", onKey);
    const prevOverflow = document.body.style.overflow;
    document.body.style.overflow = "hidden";
    return () => {
      document.removeEventListener("keydown", onKey);
      document.body.style.overflow = prevOverflow;
    };
  }, [isTourOpen]);

  const navLinks: NavLink[] = [
    { name: "Accueil", href: "/" },
    { name: "Secteurs d'activités", type: "mega", id: "secteurs" },
    { name: "Cas d'usages", type: "mega", id: "usages" },
    { name: "Dernières visites", type: "mega", id: "visites" },
    { name: "Ressources", type: "mega", id: "ressources" },
  ];

  // Valeurs de repli (méga-menu) tant qu'aucune taxonomie n'est saisie dans Sanity.
  const DEFAULT_SECTEURS: MenuItem[] = [
    { title: "Tourisme", desc: "Sites, campings, offices de tourisme et parcs", icon: GlobeMotion },
    { title: "Immobilier", desc: "Valorisez biens et programmes neufs", icon: HomeMotion },
    { title: "Culture", desc: "Musées, monuments et expositions", icon: BinocularsMotion },
    { title: "Hôtellerie & restauration", desc: "Chambres, salles et terrasses en 360°", icon: StarMotion },
    { title: "Éducation", desc: "Campus, écoles et formations immersives", icon: BookmarkMotion },
    { title: "Commerces et services", desc: "Boutiques, showrooms et agences", icon: TagMotion },
    { title: "Santé & bien-être", desc: "Cliniques, cabinets, spas et salles de sport", icon: RecommendMotion },
  ];

  const DEFAULT_USAGES: MenuItem[] = [
    { title: "Visite à distance", desc: "Faites visiter vos biens en temps réel", icon: ConnectionSignalMotion },
    { title: "Showroom virtuel", desc: "Une boutique ouverte 24h/24", icon: SelectWindowMotion },
    { title: "Formation immersive", desc: "Onboarding et sécurité en VR", icon: LaunchMotion },
    { title: "Salons & Événements", desc: "Digitaux, hybrides et persistants", icon: EventsMotion },
    { title: "Documentation Tech", desc: "Inventaires et relevés 360°", icon: ScanAltMotion },
    { title: "Marketing Immo", desc: "Boostez vos annonces immobilières", icon: RecommendMotion },
  ];

  // Taxonomies pilotées par Sanity (tags des visites) ; repli sur les défauts si vide.
  const secteursData: MenuItem[] = secteurs.length ? secteurs.map(toMenuItem) : DEFAULT_SECTEURS;
  const usagesData: MenuItem[] = casUsages.length ? casUsages.map(toMenuItem) : DEFAULT_USAGES;

  // Méga-menu "Dernières visites" : 1 visite "coup de cœur" mise en avant
  // (1re visite — branchable plus tard sur un flag Sanity dédié) + 4 dernières visites.
  const coupDeCoeur: TourItem | undefined = tours[0];
  const latestTours: TourItem[] = tours.slice(1, 5);

  // Méga-menu "Secteurs" — zone gauche : 3 secteurs phares mis en avant en cartes promo
  // (même traitement visuel que la carte "Visite pilote"). Synchronisé avec les secteurs
  // « coup de cœur » de la section SecteursBenefices (featured) : mêmes intitulés et mêmes
  // photos locales (/public). À brancher plus tard sur Sanity si besoin.
  const featuredSecteurs = [
    {
      title: "Immobilier",
      desc: "Vendez et louez sans déplacement inutile : la visite 360° qualifie vos acheteurs à distance, 24h/24.",
      imageUrl: "/appartement.webp",
      href: "#secteur-immobilier",
    },
    {
      title: "Rénovation",
      desc: "Avant / après et relevés précis : capturez l'état des lieux et générez des plans cotés.",
      imageUrl: "/chantier.webp",
      href: "#secteur-renovation",
    },
    {
      title: "Industrie",
      desc: "Formez vos équipes en immersion sur un site reproduit à l'identique, sans immobiliser la production.",
      imageUrl: "/usine.webp",
      href: "#secteur-industrie",
    },
  ];

  // Liste "Autres secteurs" (sous les cartes) : tous les secteurs hors ceux déjà mis en avant.
  const featuredTitles = new Set(featuredSecteurs.map((s) => s.title));
  const otherSecteurs = secteursData.filter((item) => !featuredTitles.has(item.title));

  // Colonne centrale du méga-menu "Cas d'usages" : fonctionnalités produit.
  const featuresData: MenuItem[] = [
    { title: "Tags & points d'intérêt", desc: "Annotez murs, produits et infos", icon: PinMotion },
    { title: "Visite guidée", desc: "Parcours automatique commenté", icon: ExploreMotion },
    { title: "Mesures précises", desc: "Cotes et distances en un clic", icon: FitToScreenMotion },
    { title: "Vue plan & dollhouse", desc: "Maquette 3D et plan d'étage", icon: GridMotion },
    { title: "Intégration web", desc: "Embed sur votre site en 1 ligne", icon: NewTabMotion },
    { title: "Compatible VR", desc: "Immersion totale au casque", icon: MaximizeMotion },
    { title: "Statistiques", desc: "Suivez l'audience de vos visites", icon: DashboardMotion },
    { title: "Partage sécurisé", desc: "Liens privés & marque blanche", icon: ConnectMotion },
  ];

  // Carte promo (colonne droite) : la visite virtuelle de démonstration.
  // image = PLACEHOLDER → remplacer par une vraie vignette de visite 360°.
  const pilotTour = {
    title: "Visite virtuelle pilote",
    desc: "Explorez une visite 360° complète, exactement comme vos clients la vivront.",
    href: "#visite-pilote",
    image: "/easy.webp",
  };

  // --- MÉGA-MENU "RESSOURCES" ---
  // Zone 1 (dominante) : pages pédagogiques sur la visite virtuelle.
  const ressourcesData: MenuItem[] = [
    { title: "Qu'est-ce qu'une visite virtuelle ?", desc: "Le 360° immersif expliqué simplement", icon: BinocularsMotion },
    { title: "La technologie Matterport", desc: "Capture 3D et jumeau numérique", icon: ScanMotion },
    { title: "Pourquoi le 360° ?", desc: "Les bénéfices concrets pour votre activité", icon: RotateMotion },
    { title: "Questions fréquentes", desc: "Tout ce qu'il faut savoir avant de se lancer", icon: ChatMotion },
    { title: "Nos réalisations", desc: "Des exemples de visites déjà livrées", icon: ReviewMotion },
    { title: "Guides & tutoriels", desc: "Bien préparer et exploiter votre visite", icon: BookmarkMotion },
  ];

  // Zone 2 (secondaire) : pages entreprise / à propos.
  const entrepriseData: MenuItem[] = [
    { title: "Qui sommes-nous", desc: "Notre histoire et notre équipe", icon: EventsMotion },
    { title: "Nos engagements", desc: "Qualité, délais, accompagnement", icon: StarMotion },
    { title: "Notre méthode", desc: "De la captation à la livraison", icon: EditMotion },
    { title: "Témoignages", desc: "Ils nous font confiance", icon: RecommendMotion },
    { title: "Carrières", desc: "Rejoindre l'aventure", icon: LaunchMotion },
    { title: "Nous contacter", desc: "Parler à un expert", icon: ConnectMotion },
  ];

  // Zone 3 (promo) : article de blog mis en avant.
  // image = PLACEHOLDER → remplacer par la vignette réelle de l'article.
  const featuredArticle = {
    category: "Blog",
    title: "5 raisons d'adopter la visite virtuelle en 2026",
    excerpt: "Comment le 360° transforme la prospection et l'expérience client.",
    href: "#blog",
    allHref: "#blog",
    image: "/easy.webp",
  };

  // Navbar : pill en verre liquide (réfraction Chromium via <LiquidGlass>),
  // frost blanc translucide + ombre douce pour flotter sur fond clair.
  const navItemClass = `group flex items-center gap-1.5 py-2 text-sm font-medium transition-all text-[#0a0a0a] hover:text-[#FF6600]`;

  return (
    <>
    <header
      ref={headerRef}
      className="sticky top-0 z-50"
      onMouseLeave={() => setActiveMenu(null)}
    >
      <div className="mx-auto w-full max-w-[var(--container)] px-6 sm:px-8 pt-5 sm:pt-6">
        <LiquidGlass
          radius={999}
          displacementScale={2.3}
          elasticity={0.6}
          blur={6}
          saturate={1.6}
          brightness={1.04}
          contrast={1}
          shadowIntensity={0.12}
          className="flex h-16 items-center justify-between border border-black/[0.06] bg-white px-4 sm:px-6"
        >

        {/* Gauche : logo + nav */}
        <div className="flex items-center gap-12">
          <a href="/" className="shrink-0 flex items-center h-full">
            <img
              src="/logo-easyvirtual-tours-3-300x95.webp"
              alt="easyVirtual.tours"
              width={300}
              height={95}
              className="block h-9 sm:h-10 w-auto rounded-[500px]"
            />
          </a>

          {/* Navigation desktop */}
          <nav className="hidden md:flex items-center gap-8">
            {navLinks.map((link) => (
              <div
                key={link.name}
                className="relative"
                onMouseEnter={(e) => link.type === "mega" && openMega(link.id || "", e.currentTarget)}
              >
                <a
                  href={link.href || "#"}
                  className={navItemClass}
                  aria-expanded={activeMenu === link.id}
                  aria-haspopup={link.type === "mega"}
                >
                  <span className="relative">
                    {link.name}
                    <span className="absolute -bottom-1 left-0 w-0 h-px bg-[#FF6600] transition-all duration-300 group-hover:w-full" />
                  </span>
                  {link.type === "mega" && (
                    <svg
                      className={`w-3.5 h-3.5 transition-transform duration-200 ${activeMenu === link.id ? "rotate-180" : ""}`}
                      fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth="2.5" aria-hidden="true"
                    >
                      <path d="M19 9l-7 7-7-7" />
                    </svg>
                  )}
                </a>
              </div>
            ))}
          </nav>
        </div>

        {/* Droite : actions */}
        <div className="flex items-center gap-4 sm:gap-6">
          <a
            href="#login"
            className="hidden sm:block text-sm font-medium transition-colors text-[#0a0a0a] hover:text-[#FF6600]"
          >
            Se connecter
          </a>
          <a
            href="#devis"
            className="whitespace-nowrap bg-[#FF6600] text-white hover:bg-[#e85c00] px-4 py-2.5 sm:px-6 sm:py-3 rounded-full text-sm font-semibold transition-all hover:-translate-y-0.5 active:translate-y-0 active:scale-95"
          >
            Demander un devis
          </a>

          {/* Toggle mobile */}
          <button
            onClick={() => setIsMobileMenuOpen(!isMobileMenuOpen)}
            className="md:hidden p-2 rounded-full transition-colors text-[#0a0a0a] hover:bg-black/5"
            aria-label="Ouvrir le menu"
            aria-expanded={isMobileMenuOpen}
          >
            <svg className="w-6 h-6" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth="2" aria-hidden="true">
              {isMobileMenuOpen ? <path d="M6 18L18 6M6 6l12 12" /> : <path d="M4 6h16M4 12h16M4 18h16" />}
            </svg>
          </button>
        </div>
        </LiquidGlass>
      </div>

      {/* Triangle connecteur : losange blanc bordé posé à cheval sur le bord
         supérieur du panneau, aligné sous l'item de nav actif. Sa moitié basse
         est recouverte par le panneau (rendu après dans le DOM) → ne reste visible
         que la pointe orientée vers l'item. */}
      <div
        className={`pointer-events-none absolute top-full left-0 z-0 hidden w-full md:block transition-opacity duration-200 ${
          activeMenu ? "opacity-100" : "opacity-0"
        }`}
        aria-hidden="true"
      >
        <div
          className="absolute h-3 w-3 -translate-x-1/2 translate-y-[2px] rotate-45 border-l border-t border-gray-100 bg-white"
          style={{ left: caretLeft ?? 0 }}
        />
      </div>

      {/* --- MÉGA-MENUS (DESKTOP) --- */}

      {/* Secteurs d'activités */}
      <div
        className={`hidden md:block pointer-events-none absolute top-full left-0 w-full transition-all duration-300 origin-top ${
          activeMenu === "secteurs" ? "opacity-100 scale-y-100 translate-y-0" : "opacity-0 scale-y-95 -translate-y-2"
        }`}
      >
        <div className="mx-auto w-full max-w-[var(--container)] px-6 sm:px-8">
          <div
            className={`w-fit max-w-full pt-2 ${activeMenu === "secteurs" ? "pointer-events-auto" : ""}`}
            onMouseEnter={() => setActiveMenu("secteurs")}
          >
          <div className="w-fit max-w-full rounded-2xl border border-gray-100 bg-white shadow-2xl">
            <div className="w-[880px] max-w-[calc(100vw-4rem)] px-8 py-10">
              {/* ZONE 1 — Secteurs mis en avant (cartes promo) */}
              <span className="mb-6 block text-[11px] font-semibold uppercase tracking-[0.2em] text-gray-500">
                Secteurs mis en avant
              </span>
              <div className="grid grid-cols-3 gap-5">
                {featuredSecteurs.map((s) => (
                  <a
                    key={s.title}
                    href={s.href}
                    className="group/promo relative overflow-hidden rounded-2xl p-5 text-white transition-all duration-300 hover:-translate-y-1 motion-reduce:transition-none motion-reduce:hover:transform-none"
                    style={MESH_BRAND}
                  >
                    <div className="relative block h-32 w-full overflow-hidden rounded-xl bg-black/10">
                      <img
                        src={s.imageUrl}
                        alt=""
                        className="h-full w-full object-cover transition-transform duration-700 group-hover/promo:scale-105"
                      />
                      <div className="absolute inset-0 bg-black/15" />
                    </div>
                    <div className="relative mt-4">
                      <h3 className="font-heading text-lg font-bold leading-tight text-white">{s.title}</h3>
                      <p className="mt-2 line-clamp-2 text-sm leading-relaxed text-white/85">{s.desc}</p>
                      <div className="mt-5 inline-flex items-center gap-1.5 text-sm font-semibold text-white">
                        Découvrir
                        <svg
                          className="h-3.5 w-3.5 transition-transform duration-300 group-hover/promo:translate-x-1"
                          fill="none"
                          viewBox="0 0 24 24"
                          stroke="currentColor"
                        >
                          <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2.5} d="M13.5 4.5L21 12m0 0l-7.5 7.5M21 12H3" />
                        </svg>
                      </div>
                    </div>
                  </a>
                ))}
              </div>

              {/* ZONE 2 — Autres secteurs (sous les cartes) */}
              <div className="mt-8 border-t border-gray-100 pt-8">
                <span className="mb-6 block text-[11px] font-semibold uppercase tracking-[0.2em] text-gray-400">
                  Autres secteurs
                </span>
                <div className="grid grid-cols-3 gap-x-4 gap-y-1">
                  {otherSecteurs.map((item) => (
                    <SectorLink key={item.title} item={item} />
                  ))}
                </div>
              </div>
            </div>
          </div>
          </div>
        </div>
      </div>

      {/* Cas d'usages */}
      <div
        className={`hidden md:block pointer-events-none absolute top-full left-0 w-full transition-all duration-300 origin-top ${
          activeMenu === "usages" ? "opacity-100 scale-y-100 translate-y-0" : "opacity-0 scale-y-95 -translate-y-2"
        }`}
      >
        <div className="mx-auto w-full max-w-[var(--container)] px-6 sm:px-8">
          <div
            className={`w-fit max-w-full pt-2 ${activeMenu === "usages" ? "pointer-events-auto" : ""}`}
            onMouseEnter={() => setActiveMenu("usages")}
          >
          <div className="w-fit max-w-full rounded-2xl border border-gray-100 bg-white shadow-2xl">
            <div className="px-8 py-10 flex">
          {/* ZONE 1 — Cas d'usages (zone dominante) */}
          <div className="flex-1 pr-10 flex flex-col">
            <span className="text-[11px] tracking-[0.2em] font-semibold text-gray-500 uppercase block mb-6">Cas d'usages</span>
            <div className="grid grid-cols-2 gap-x-4 gap-y-1">
              {usagesData.map((item) => (
                <UsageLink key={item.title} item={item} />
              ))}
            </div>

            {/* Pied de zone : autre besoin → expert */}
            <div className="mt-auto pt-6 border-t border-gray-50 flex items-center justify-between">
              <span className="text-sm text-gray-500">Un autre besoin ?</span>
              <a href="#contact" className="text-sm font-bold text-[#FF6600] hover:underline">
                Parler à un expert →
              </a>
            </div>
          </div>

          {/* ZONE 2 — Fonctionnalités (liste secondaire compacte) */}
          <div className="w-60 shrink-0 border-l border-gray-100 pl-8">
            <span className="text-[11px] tracking-[0.2em] font-semibold text-gray-400 uppercase block mb-6">Fonctionnalités</span>
            <div className="flex flex-col gap-1">
              {featuresData.map((item) => (
                <FeatureLink key={item.title} item={item} />
              ))}
            </div>
          </div>

          {/* ZONE 3 — Visite virtuelle pilote (promo droite) */}
          <div className="w-85 shrink-0 border-l border-gray-100 pl-10">
            <span className="text-[11px] tracking-[0.2em] font-semibold text-gray-400 uppercase block mb-6">Découvrir l'expérience</span>
            <div
              className="group/promo relative overflow-hidden rounded-2xl p-5 text-white"
              style={MESH_BRAND}
            >
              <button
                type="button"
                onClick={() => setIsTourOpen(true)}
                aria-label="Ouvrir la visite virtuelle pilote"
                className="group/thumb relative block h-36 w-full overflow-hidden rounded-xl bg-black/10"
              >
                <img src={pilotTour.image} alt="" className="h-full w-full object-cover transition-transform duration-700 group-hover/thumb:scale-105" />
                <div className="absolute inset-0 bg-black/15" />
                <div className="absolute inset-0 flex items-center justify-center">
                  <div className="flex h-12 w-12 items-center justify-center rounded-full bg-white text-[#FF6600] shadow-lg transition-transform group-hover/thumb:scale-110">
                    <svg className="h-6 w-6 fill-current" viewBox="0 0 24 24" aria-hidden="true">
                      <path d="M8 5v14l11-7z" />
                    </svg>
                  </div>
                </div>
              </button>
              <div className="relative mt-5">
                <h3 className="font-heading font-bold text-white text-lg leading-tight">{pilotTour.title}</h3>
                <p className="mt-2 text-sm text-white/85 leading-relaxed">{pilotTour.desc}</p>
                <button
                  type="button"
                  onClick={() => setIsTourOpen(true)}
                  className="mt-6 inline-flex w-full items-center justify-center gap-2 bg-white px-6 py-3.5 text-sm font-semibold text-[#FF6600] transition-colors hover:bg-gray-100 rounded-full"
                >
                  Lancer la visite
                  <svg className="h-4 w-4 fill-current" viewBox="0 0 24 24">
                    <path d="M8 5v14l11-7z" />
                  </svg>
                </button>
              </div>
            </div>
          </div>
            </div>
          </div>
          </div>
        </div>
      </div>

      {/* Ressources */}
      <div
        className={`hidden md:block pointer-events-none absolute top-full left-0 w-full transition-all duration-300 origin-top ${activeMenu === "ressources" ? "opacity-100 scale-y-100 translate-y-0" : "opacity-0 scale-y-95 -translate-y-2"}`}
      >
        <div className="mx-auto w-full max-w-[var(--container)] px-6 sm:px-8">
          <div
            className={`w-fit max-w-full pt-2 ${activeMenu === "ressources" ? "pointer-events-auto" : ""}`}
            onMouseEnter={() => setActiveMenu("ressources")}
          >
          <div className="w-fit max-w-full rounded-2xl border border-gray-100 bg-white shadow-2xl">
            <div className="px-8 py-10 flex">
          {/* ZONE 1 dominante : Découvrir la visite virtuelle */}
          <div className="flex-1 pr-10 flex flex-col">
            <span className="text-[11px] tracking-[0.2em] font-semibold text-gray-500 uppercase block mb-6">
              Découvrir la visite virtuelle
            </span>
            <div className="grid grid-cols-2 gap-x-4 gap-y-1">
              {ressourcesData.map((item) => (
                <UsageLink key={item.title} item={item} />
              ))}
            </div>

            <div className="mt-auto pt-6 border-t border-gray-50 flex items-center justify-between">
              <span className="text-sm text-gray-500">Une question ?</span>
              <a href="#faq" className="text-sm font-bold text-[#FF6600] hover:underline">
                Voir la FAQ →
              </a>
            </div>
          </div>

          {/* ZONE 2 secondaire : L'entreprise */}
          <div className="w-60 shrink-0 border-l border-gray-100 pl-8">
            <span className="text-[11px] tracking-[0.2em] font-semibold text-gray-400 uppercase block mb-6">
              L'entreprise
            </span>
            <div className="flex flex-col gap-1">
              {entrepriseData.map((item) => (
                <FeatureLink key={item.title} item={item} />
              ))}
            </div>
          </div>

          {/* ZONE 3 promo : Le blog */}
          <div className="w-85 shrink-0 border-l border-gray-100 pl-10">
            <span className="text-[11px] tracking-[0.2em] font-semibold text-gray-400 uppercase block mb-6">
              Le blog
            </span>

            <a href={featuredArticle.href} className="group/article block">
              <div className="relative h-40 w-full overflow-hidden rounded-xl mb-4 bg-gray-100">
                <img
                  src={featuredArticle.image}
                  alt=""
                  className="h-full w-full object-cover transition-transform duration-500 group-hover/article:scale-105"
                />
                <div className="absolute top-3 left-3 bg-[#FF6600] text-white text-[10px] font-bold px-2 py-1 uppercase tracking-wider rounded-sm">
                  {featuredArticle.category}
                </div>
              </div>

              <h4 className="font-heading font-bold text-[#0a0a0a] text-lg leading-tight mb-2 group-hover/article:text-[#FF6600] transition-colors">
                {featuredArticle.title}
              </h4>

              <p className="text-sm text-gray-600 line-clamp-2 mb-3">
                {featuredArticle.excerpt}
              </p>

              <div className="flex items-center text-sm font-bold text-[#FF6600]">
                <span>Lire l'article</span>
                <span className="ml-1 transition-transform duration-300 group-hover/article:translate-x-1">→</span>
              </div>
            </a>

            <div className="mt-6 pt-6 border-t border-gray-50 flex items-center justify-between">
              <span className="text-xs text-gray-500">Découvrir tout le contenu</span>
              <a href={featuredArticle.allHref} className="text-xs font-bold text-[#FF6600] hover:underline">
                Tous les articles →
              </a>
            </div>
          </div>
            </div>
          </div>
          </div>
        </div>
      </div>

      {/* Dernières visites */}
      <div
        className={`hidden md:block pointer-events-none absolute top-full left-0 w-full transition-all duration-300 origin-top ${activeMenu === "visites" ? "opacity-100 scale-y-100 translate-y-0" : "opacity-0 scale-y-95 -translate-y-2"}`}
      >
        <div className="mx-auto w-full max-w-[var(--container)] px-6 sm:px-8">
          <div
            className={`w-full pt-2 ${activeMenu === "visites" ? "pointer-events-auto" : ""}`}
            onMouseEnter={() => setActiveMenu("visites")}
          >
          <div className="w-full rounded-2xl border border-gray-100 bg-white shadow-2xl">
            <div className="px-8 py-10">
          <div className="grid grid-cols-3 items-stretch gap-8">
            {/* Colonne gauche : visite coup de cœur — UNE seule visite « mise en avant »,
               grande tuile verticale qui remplit toute la hauteur de sa colonne
               (même largeur qu'une carte de droite). Titre en surimpression en bas. */}
            {coupDeCoeur && (
              <div className="col-span-1 flex flex-col">
                <span className="mb-6 block text-[11px] font-bold uppercase tracking-[0.2em] text-[#FF6600]">
                  Sélection premium
                </span>
                <a
                  href={coupDeCoeur.href}
                  className="group relative flex min-h-[320px] flex-1 overflow-hidden rounded-2xl bg-zinc-100 shadow-[0_2px_8px_-3px_rgba(10,10,10,0.10),0_22px_48px_-18px_rgba(10,10,10,0.14)] transition-all duration-500 hover:shadow-[0_4px_12px_-3px_rgba(10,10,10,0.14),0_32px_64px_-20px_rgba(10,10,10,0.20)]"
                >
                  {coupDeCoeur.imageUrl && (
                    <img
                      src={coupDeCoeur.imageUrl}
                      alt={coupDeCoeur.title}
                      className="absolute inset-0 h-full w-full object-cover transition-transform duration-700 ease-in-out group-hover:scale-105"
                    />
                  )}
                  {/* Voile dégradé pour la lisibilité du titre */}
                  <div className="absolute inset-0 bg-gradient-to-t from-black/80 via-black/25 to-transparent" />

                  {/* Badge coup de cœur */}
                  <div className="absolute left-4 top-4 flex items-center gap-1.5 rounded-full bg-white/95 px-3 py-1.5 text-[10px] font-bold uppercase tracking-wider text-[#FF6600] shadow-sm backdrop-blur-sm">
                    <svg className="h-3 w-3 fill-current" viewBox="0 0 24 24" aria-hidden="true">
                      <path d="M12 21.35l-1.45-1.32C5.4 15.36 2 12.28 2 8.5 2 5.42 4.42 3 7.5 3c1.74 0 3.41.81 4.5 2.09C13.09 3.81 14.76 3 16.5 3 19.58 3 22 5.42 22 8.5c0 3.78-3.4 6.86-8.55 11.54L12 21.35z" />
                    </svg>
                    Coup de cœur
                  </div>

                  {/* Bouton play centré */}
                  <div className="absolute inset-0 flex items-center justify-center">
                    <div
                      className="relative flex h-14 w-14 items-center justify-center rounded-full text-white shadow-[0_2px_8px_-3px_rgba(10,10,10,0.10),0_22px_48px_-18px_rgba(10,10,10,0.14)] transition-all duration-300 group-hover:scale-110 group-hover:shadow-[0_0_36px_-4px_rgba(255,102,0,0.55)] motion-reduce:transition-none"
                      style={BRAND_DIAGONAL}
                    >
                      <svg className="ml-0.5 h-7 w-7 fill-current" viewBox="0 0 24 24" aria-hidden="true">
                        <path d="M8 5v14l11-7z" />
                      </svg>
                      <div className="pointer-events-none absolute inset-0 rounded-full bg-white/0 transition-colors duration-300 group-hover:bg-white/10" />
                    </div>
                  </div>

                  {/* Titre + méta en surimpression (bas) */}
                  <div className="absolute inset-x-0 bottom-0 p-5">
                    <h4 className="font-heading text-lg font-bold leading-tight text-white">
                      {coupDeCoeur.title}
                    </h4>
                    {coupDeCoeur.description && (
                      <p className="mt-1.5 line-clamp-2 text-sm leading-relaxed text-white/85">
                        {coupDeCoeur.description}
                      </p>
                    )}
                    {[coupDeCoeur.client, coupDeCoeur.location].filter(Boolean).length > 0 && (
                      <p className="mt-1.5 text-sm text-white/70">
                        {[coupDeCoeur.client, coupDeCoeur.location].filter(Boolean).join(" · ")}
                      </p>
                    )}
                  </div>
                </a>
              </div>
            )}

            {/* Colonne droite : grille des 4 dernières visites (2 colonnes de même
               largeur que la coup de cœur). */}
            <div className={coupDeCoeur ? "col-span-2" : "col-span-3"}>
              <span className="mb-6 block text-[11px] font-semibold uppercase tracking-[0.2em] text-gray-500">
                Dernières visites
              </span>
              <div className="grid grid-cols-2 gap-x-8 gap-y-10">
                {latestTours.slice(0, 4).map((tour) => (
                  <TourCard key={tour.title} tour={tour} />
                ))}
              </div>
            </div>
          </div>

          <div className="mt-12 flex items-center justify-between border-t border-gray-100 pt-8">
            <span className="text-sm text-gray-500">Découvrez toutes nos réalisations 360°</span>
            <a href="#visites" className="group inline-flex items-center gap-2 text-sm font-bold text-[#FF6600] hover:underline">
              Voir toutes les visites
              <svg className="h-4 w-4 transition-transform group-hover:translate-x-1" fill="none" viewBox="0 0 24 24" stroke="currentColor" aria-hidden="true">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M17 8l4 4m0 0l-4 4m4-4H3" />
              </svg>
            </a>
          </div>
            </div>
          </div>
          </div>
        </div>
      </div>

      {/* --- MENU MOBILE --- */}
      <div
        className={`md:hidden fixed inset-x-0 top-24 bg-white border-t border-gray-100 shadow-xl overflow-y-auto transition-all duration-300 origin-top ${
          isMobileMenuOpen ? "opacity-100 scale-y-100" : "opacity-0 scale-y-0 pointer-events-none"
        }`}
        style={{ maxHeight: "calc(100vh - 80px)" }}
      >
        <div className="px-6 py-8 flex flex-col gap-2">
          {navLinks.map((link) => (
            <div key={link.name} className="border-b border-gray-50 last:border-0">
              {link.type === "mega" ? (
                <div>
                  <button
                    onClick={() => setMobileExpanded(mobileExpanded === link.id ? null : link.id || null)}
                    className="flex items-center justify-between w-full py-4 text-lg font-semibold text-[#0a0a0a]"
                    aria-expanded={mobileExpanded === link.id}
                  >
                    {link.name}
                    <svg className={`w-5 h-5 transition-transform ${mobileExpanded === link.id ? "rotate-180" : ""}`} fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth="2" aria-hidden="true">
                      <path d="M19 9l-7 7-7-7" />
                    </svg>
                  </button>
                  <div className={`overflow-hidden transition-all duration-300 ${mobileExpanded === link.id ? "max-h-[800px] pb-6" : "max-h-0"}`}>
                    <div className="grid gap-4 pl-4">
                      {link.id === "visites"
                        ? [coupDeCoeur, ...latestTours].filter(Boolean).map((tour, i) => (
                            <a key={tour!.title} href={tour!.href} className="flex flex-col py-1">
                              <span className="flex items-center gap-1.5 text-sm font-bold text-[#0a0a0a]">
                                {i === 0 && coupDeCoeur && (
                                  <svg className="h-3.5 w-3.5 shrink-0 fill-[#FF6600]" viewBox="0 0 24 24" aria-hidden="true">
                                    <path d="M12 21.35l-1.45-1.32C5.4 15.36 2 12.28 2 8.5 2 5.42 4.42 3 7.5 3c1.74 0 3.41.81 4.5 2.09C13.09 3.81 14.76 3 16.5 3 19.58 3 22 5.42 22 8.5c0 3.78-3.4 6.86-8.55 11.54L12 21.35z" />
                                  </svg>
                                )}
                                {tour!.title}
                              </span>
                              <span className="text-xs text-gray-500">
                                {[tour!.client, tour!.location].filter(Boolean).join(" · ")}
                              </span>
                            </a>
                          ))
                        : (link.id === "secteurs"
                            ? secteursData
                            : link.id === "ressources"
                              ? [...ressourcesData, ...entrepriseData]
                              : usagesData
                          ).map((sub) => (
                            <a key={sub.title} href={sub.href ?? "#"} className="flex flex-col py-1">
                              <span className="text-sm font-bold text-[#0a0a0a]">{sub.title}</span>
                              <span className="text-xs text-gray-500">{sub.desc}</span>
                            </a>
                          ))}
                    </div>
                  </div>
                </div>
              ) : (
                <a href={link.href} className="block py-4 text-lg font-semibold text-[#0a0a0a]">
                  {link.name}
                </a>
              )}
            </div>
          ))}

          <div className="mt-6 flex flex-col gap-4">
            <a href="#login" className="flex items-center justify-center py-4 border border-gray-200 rounded-full font-medium text-[#0a0a0a]">
              Se connecter
            </a>
            <a href="#devis" className="flex items-center justify-center py-4 bg-[#FF6600] text-white rounded-full font-bold shadow-md">
              Demander un devis
            </a>
          </div>
        </div>
      </div>
    </header>

      {/* MODALE — Visite virtuelle pilote (embed) */}
      {isTourOpen && (
        <div
          className="fixed inset-0 z-[100] flex items-center justify-center p-4 sm:p-8"
          role="dialog"
          aria-modal="true"
          aria-label="Visite virtuelle pilote"
        >
          {/* Fond cliquable */}
          <div
            className="absolute inset-0 bg-black/80 backdrop-blur-sm"
            onClick={() => setIsTourOpen(false)}
          />
          <div className="relative z-10 w-full max-w-[1440px]">
            <button
              type="button"
              onClick={() => setIsTourOpen(false)}
              aria-label="Fermer la visite"
              className="absolute right-3 top-3 z-20 inline-flex h-10 w-10 items-center justify-center rounded-full bg-black/50 text-white backdrop-blur-sm transition hover:bg-black/70"
            >
              <svg className="h-5 w-5" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth="2" strokeLinecap="round" aria-hidden="true">
                <path d="M6 18L18 6M6 6l12 12" />
              </svg>
            </button>
            <div className="relative aspect-video max-h-[85vh] w-full overflow-hidden rounded-2xl bg-black shadow-2xl">
              <iframe
                src="https://my.easyvirtual.tours/tour/visite-virtuelle"
                title="Visite virtuelle pilote"
                allowFullScreen
                className="absolute inset-0 h-full w-full border-0"
              />
            </div>
          </div>
        </div>
      )}
    </>
  );
}
