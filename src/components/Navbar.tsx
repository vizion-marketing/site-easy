import { useState, useEffect, type ComponentType } from "react";
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

/* Carte de visite virtuelle (méga-menu "Dernières visites") : vignette 16/10 avec
   overlay + bouton play orange, badge catégorie en surimpression, titre → orange au survol.
   Réplique le traitement visuel des cartes promo des méga-menus "Cas d'usages"/"Ressources". */
function TourCard({ tour }: { tour: TourItem }) {
  const meta = [tour.client, tour.location].filter(Boolean).join(" · ");
  return (
    <a href={tour.href} className="group block">
      <div className="relative h-40 w-full overflow-hidden rounded-xl bg-gray-100">
        {tour.imageUrl && (
          <img
            src={tour.imageUrl}
            alt=""
            className="h-full w-full object-cover transition-transform duration-700 group-hover:scale-105"
          />
        )}
        <div className="absolute inset-0 bg-black/20" />
        {tour.category && (
          <div className="absolute top-3 left-3 bg-[#FF6600] text-white text-[10px] font-bold px-2 py-1 uppercase tracking-wider rounded-sm">
            {tour.category}
          </div>
        )}
        <div className="absolute inset-0 flex items-center justify-center">
          <div className="flex h-12 w-12 items-center justify-center rounded-full bg-white/90 text-[#FF6600] shadow-lg transition-transform group-hover:scale-110">
            <svg className="h-6 w-6 fill-current" viewBox="0 0 24 24" aria-hidden="true">
              <path d="M8 5v14l11-7z" />
            </svg>
          </div>
        </div>
      </div>
      <div className="mt-4">
        <h4 className="font-heading font-semibold text-base text-[#0a0a0a] leading-tight group-hover:text-[#FF6600] transition-colors">
          {tour.title}
        </h4>
        {meta && (
          <p className="mt-1 flex items-center gap-1 text-sm text-gray-500">
            {tour.location && (
              <svg className="h-3.5 w-3.5 shrink-0 text-gray-400" fill="currentColor" viewBox="0 0 24 24" aria-hidden="true">
                <path d="M12 2C8.13 2 5 5.13 5 9c0 5.25 7 13 7 13s7-7.75 7-13c0-3.87-3.13-7-7-7zm0 9.5a2.5 2.5 0 110-5 2.5 2.5 0 010 5z" />
              </svg>
            )}
            <span>{meta}</span>
          </p>
        )}
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

  // Méga-menu "Secteurs" — zone gauche : 3 secteurs phares mis en avant en cartes promo
  // (même traitement visuel que la carte "Visite pilote"). image = PLACEHOLDER → remplacer
  // par de vraies vignettes 360°. À brancher plus tard sur Sanity si besoin.
  const featuredSecteurs = [
    {
      title: "Immobilier",
      desc: "Valorisez vos biens avec des visites virtuelles haute fidélité.",
      imageUrl: "https://images.unsplash.com/photo-1560518883-ce09059eeffa?auto=format&fit=crop&q=80&w=800",
      href: "#secteur-immobilier",
    },
    {
      title: "Tourisme",
      desc: "Faites rêver vos visiteurs : sites, campings et parcs en immersion 360°.",
      imageUrl: "https://images.unsplash.com/photo-1507525428034-b723cf961d3e?auto=format&fit=crop&q=80&w=800",
      href: "#secteur-tourisme",
    },
    {
      title: "Éducation",
      desc: "Ouvrez les portes de votre établissement aux futurs étudiants.",
      imageUrl: "https://images.unsplash.com/photo-1523050854058-8df90110c9f1?auto=format&fit=crop&q=80&w=800",
      href: "#secteur-education",
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
    image: "/easy.png",
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
    image: "/easy.png",
  };

  // Navbar : pill en verre liquide (réfraction Chromium via <LiquidGlass>),
  // frost blanc translucide + ombre douce pour flotter sur fond clair.
  const navItemClass = `group flex items-center gap-1.5 py-2 text-sm font-medium transition-all text-[#0a0a0a] hover:text-[#FF6600]`;

  return (
    <>
    <header
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
                onMouseEnter={() => link.type === "mega" && setActiveMenu(link.id || null)}
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
            className="bg-[#FF6600] text-white hover:bg-[#e85c00] px-6 py-3 rounded-full text-sm font-semibold transition-all hover:-translate-y-0.5 active:translate-y-0 active:scale-95"
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

      {/* --- MÉGA-MENUS (DESKTOP) --- */}

      {/* Secteurs d'activités */}
      <div
        className={`absolute top-full left-0 w-full transition-all duration-300 origin-top ${
          activeMenu === "secteurs" ? "opacity-100 scale-y-100 translate-y-0" : "opacity-0 scale-y-95 -translate-y-2 pointer-events-none"
        }`}
        onMouseEnter={() => setActiveMenu("secteurs")}
      >
        <div className="mx-auto w-full max-w-[var(--container)] px-6 pt-2 sm:px-8">
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

      {/* Cas d'usages */}
      <div
        className={`absolute top-full left-0 w-full transition-all duration-300 origin-top ${
          activeMenu === "usages" ? "opacity-100 scale-y-100 translate-y-0" : "opacity-0 scale-y-95 -translate-y-2 pointer-events-none"
        }`}
        onMouseEnter={() => setActiveMenu("usages")}
      >
        <div className="mx-auto w-full max-w-[var(--container)] px-6 pt-2 sm:px-8">
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

      {/* Ressources */}
      <div
        className={`absolute top-full left-0 w-full transition-all duration-300 origin-top ${activeMenu === "ressources" ? "opacity-100 scale-y-100 translate-y-0" : "opacity-0 scale-y-95 -translate-y-2 pointer-events-none"}`}
        onMouseEnter={() => setActiveMenu("ressources")}
      >
        <div className="mx-auto w-full max-w-[var(--container)] px-6 pt-2 sm:px-8">
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

      {/* Dernières visites */}
      <div
        className={`absolute top-full left-0 w-full transition-all duration-300 origin-top ${activeMenu === "visites" ? "opacity-100 scale-y-100 translate-y-0" : "opacity-0 scale-y-95 -translate-y-2 pointer-events-none"}`}
        onMouseEnter={() => setActiveMenu("visites")}
      >
        <div className="mx-auto w-full max-w-[var(--container)] px-6 pt-2 sm:px-8">
          <div className="w-fit max-w-full rounded-2xl border border-gray-100 bg-white shadow-2xl">
            <div className="px-8 py-10">
          <span className="text-[11px] tracking-[0.2em] font-semibold text-gray-500 uppercase block mb-6">
            Dernières visites
          </span>
          <div className="grid grid-cols-4 gap-6">
            {tours.map((tour) => (
              <TourCard key={tour.title} tour={tour} />
            ))}
          </div>
          <div className="mt-8 pt-6 border-t border-gray-50 flex items-center justify-between">
            <span className="text-sm text-gray-500">Découvrez toutes nos réalisations 360°</span>
            <a href="#visites" className="text-sm font-bold text-[#FF6600] hover:underline">
              Voir toutes les visites →
            </a>
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
                        ? tours.map((tour) => (
                            <a key={tour.title} href={tour.href} className="flex flex-col py-1">
                              <span className="text-sm font-bold text-[#0a0a0a]">{tour.title}</span>
                              <span className="text-xs text-gray-500">
                                {[tour.client, tour.location].filter(Boolean).join(" · ")}
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
