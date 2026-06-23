import { useEffect, useMemo, useState } from "react";
import {
  haversineKm,
  formatDistance,
  fetchIpLocation,
  type LatLng,
} from "../lib/geo";

type Social = { platform: string; url: string };

type Franchisee = {
  id: string;
  name: string; // "Prénom Nom"
  zone: string; // zone géographique, ex. "Île-de-France", "Lyon", "PACA"
  imageUrl: string | null;
  pageLink?: string;
  ville?: string; // ville de rattachement (affichée dans le statut « Autour de … »)
  lat?: number | null; // coordonnées géocodées au build (null si non localisable)
  lng?: number | null;
  // Vitrine du store locator (encart sur la photo) — tous optionnels (repli démo).
  description?: string;
  googleRating?: number; // note Google sur 5
  googleReviews?: number; // nombre d'avis Google
  gmbUrl?: string; // fiche Google My Business
  socials?: Social[]; // réseaux sociaux
};

type Props = {
  franchisees: Franchisee[];
  eyebrow?: string;
  /** Le fragment entouré d'astérisques (*texte*) est mis en valeur (orange italique). */
  heading?: string;
  intro?: string;
  ctaLabel?: string;
  ctaHref?: string;
  /** Petite phrase d'invitation affichée au-dessus du CTA « Devenir franchisé ». */
  joinHint?: string;
  /** Image affichée à droite par défaut, tant qu'aucun franchisé n'est mis en avant. */
  defaultImageUrl?: string;
  /** Libellés optionnels de la carte par défaut (surimpression affichée seulement si fournis). */
  defaultName?: string;
  defaultRole?: string;
};

/* État de la géolocalisation du visiteur. */
type GeoStatus = "idle" | "locating" | "located" | "error";
type GeoSource = "ip" | "gps" | null;

/* Normalise pour comparer sans accents ni casse. */
const normalize = (str: string) =>
  str.normalize("NFD").replace(/\p{Diacritic}/gu, "").toLowerCase();

/* Met en valeur les fragments entourés d'astérisques (*texte*) en orange italique. */
function renderHeading(text: string) {
  return text.split(/\*(.*?)\*/g).map((part, i) =>
    i % 2 === 1 ? (
      <span key={i} className="font-cooper highlight-shine">
        {part}
      </span>
    ) : (
      part
    ),
  );
}

/* ---------------------------------------------------------------------------- *
 * Encart blanc « fiche franchisé » superposé à la photo (store locator).
 * Présente : nom, zone, note Google, description, lien landing page, réseaux
 * sociaux et fiche Google My Business. Champs optionnels → repli sur des données
 * de DÉMO tant qu'ils ne sont pas saisis dans Sanity (Studio /admin).
 * ---------------------------------------------------------------------------- */

// Données de démo (à remplacer par les vraies valeurs Sanity : noteGoogle, avisGoogle,
// description, reseaux). Uniformes volontairement → clairement des placeholders.
const DEMO_DESCRIPTION =
  "Votre expert local easyvirtual.tours : je capture vos espaces en 360° et vous accompagne de la prise de vue à la mise en ligne.";
const DEMO_RATING = 4.9;
const DEMO_REVIEWS = 87;
const DEMO_SOCIALS: Social[] = [
  { platform: "instagram", url: "#" },
  { platform: "linkedin", url: "#" },
  { platform: "facebook", url: "#" },
];

/* Lien Google Maps de repli (recherche) quand aucune fiche GMB n'est renseignée. */
const gmapsSearch = (query: string) =>
  `https://www.google.com/maps/search/?api=1&query=${encodeURIComponent(query)}`;

/* Icône d'un réseau social (SVG inline, aucune lib). Repli : icône « lien ». */
function SocialIcon({ platform }: { platform: string }) {
  switch (platform.toLowerCase()) {
    case "instagram":
      return (
        <svg className="h-4 w-4" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" aria-hidden="true">
          <rect width="20" height="20" x="2" y="2" rx="5" ry="5" />
          <path d="M16 11.37A4 4 0 1 1 12.63 8 4 4 0 0 1 16 11.37z" />
          <line x1="17.5" x2="17.51" y1="6.5" y2="6.5" />
        </svg>
      );
    case "linkedin":
      return (
        <svg className="h-4 w-4" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" aria-hidden="true">
          <path d="M16 8a6 6 0 0 1 6 6v7h-4v-7a2 2 0 0 0-2-2 2 2 0 0 0-2 2v7h-4v-7a6 6 0 0 1 6-6z" />
          <rect width="4" height="12" x="2" y="9" />
          <circle cx="4" cy="4" r="2" />
        </svg>
      );
    case "facebook":
      return (
        <svg className="h-4 w-4" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" aria-hidden="true">
          <path d="M18 2h-3a5 5 0 0 0-5 5v3H7v4h3v8h4v-8h3l1-4h-4V7a1 1 0 0 1 1-1h3z" />
        </svg>
      );
    default:
      return (
        <svg className="h-4 w-4" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" aria-hidden="true">
          <path d="M10 13a5 5 0 0 0 7.54.54l3-3a5 5 0 0 0-7.07-7.07l-1.72 1.71" />
          <path d="M14 11a5 5 0 0 0-7.54-.54l-3 3a5 5 0 0 0 7.07 7.07l1.71-1.71" />
        </svg>
      );
  }
}

/* Encart blanc présentant le franchisé actif, posé en bas de la photo. */
function FranchiseeInfoCard({ franchisee }: { franchisee: Franchisee }) {
  const rating = franchisee.googleRating ?? DEMO_RATING;
  const reviews = franchisee.googleReviews ?? DEMO_REVIEWS;
  const description = franchisee.description ?? DEMO_DESCRIPTION;
  const socials =
    franchisee.socials && franchisee.socials.length ? franchisee.socials : DEMO_SOCIALS;
  const gmbUrl =
    franchisee.gmbUrl ?? gmapsSearch(`${franchisee.name} easyvirtual.tours ${franchisee.zone}`);
  const filledStars = Math.round(rating);

  return (
    <>
      {/* Voile dégradé pour ancrer l'encart sur les photos claires */}
      <div className="pointer-events-none absolute inset-x-0 bottom-0 h-1/2 bg-gradient-to-t from-black/40 to-transparent" aria-hidden="true" />

      <div className="absolute inset-x-4 bottom-4 z-10">
        <div className="rounded-2xl bg-white p-5 shadow-[0_2px_8px_-3px_rgba(10,10,10,0.10),0_22px_48px_-18px_rgba(10,10,10,0.14)] transition-shadow duration-300 hover:shadow-[0_4px_12px_-3px_rgba(10,10,10,0.14),0_32px_64px_-20px_rgba(10,10,10,0.20)]">

          {/* Zone + nom */}
          <div className="mb-3">
            {franchisee.zone && (
              <span className="mb-1 block text-[10px] font-bold uppercase tracking-widest text-[#FF6600]">
                {franchisee.zone}
              </span>
            )}
            <h3 className="font-heading text-xl font-bold leading-tight text-[#0a0a0a] md:text-2xl">
              {franchisee.name}
            </h3>
          </div>

          {/* Note Google */}
          <div className="mb-3 flex items-center gap-2">
            <div className="flex items-center gap-0.5" aria-hidden="true">
              {[0, 1, 2, 3, 4].map((i) => (
                <svg key={i} className={`h-4 w-4 ${i < filledStars ? "text-[#FF6600]" : "text-gray-300"}`} viewBox="0 0 24 24" fill="currentColor">
                  <path d="M12 2l3.09 6.26L22 9.27l-5 4.87 1.18 6.88L12 17.77l-6.18 3.25L7 14.14 2 9.27l6.91-1.01L12 2z" />
                </svg>
              ))}
            </div>
            <span className="text-sm font-bold text-[#0a0a0a]">{rating.toFixed(1).replace(".", ",")}</span>
            <span className="text-xs text-gray-500">{reviews > 0 ? `· ${reviews} avis Google` : "· Avis Google"}</span>
          </div>

          {/* Description */}
          {description && (
            <p className="mb-4 line-clamp-2 text-sm leading-relaxed text-gray-600">{description}</p>
          )}

          <hr className="mb-4 border-gray-100" />

          {/* Actions */}
          <div className="space-y-3">
            {/* Landing page */}
            <a
              href={franchisee.pageLink ?? "#"}
              className="group/cta inline-flex w-full items-center justify-center gap-2 rounded-full bg-[#FF6600] px-6 py-3 font-semibold text-white transition-colors duration-300 hover:bg-[#e85c00] active:scale-[0.98] motion-reduce:transition-none"
            >
              Voir sa page
              <svg className="h-4 w-4 transition-transform duration-300 group-hover/cta:translate-x-1 motion-reduce:transform-none" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.5" strokeLinecap="round" strokeLinejoin="round" aria-hidden="true">
                <path d="M5 12h14m-7-7 7 7-7 7" />
              </svg>
            </a>

            {/* Fiche Google + réseaux sociaux */}
            <div className="flex items-center justify-between gap-4">
              <a
                href={gmbUrl}
                target="_blank"
                rel="noopener noreferrer"
                className="inline-flex items-center gap-1.5 text-sm font-semibold text-[#FF6600] underline decoration-[#FF6600]/40 underline-offset-4 transition-all hover:decoration-[#FF6600]"
              >
                <svg className="h-4 w-4" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" aria-hidden="true">
                  <path d="M20 10c0 6-8 12-8 12s-8-6-8-12a8 8 0 0 1 16 0Z" />
                  <circle cx="12" cy="10" r="3" />
                </svg>
                Fiche Google
              </a>

              {socials.length > 0 && (
                <div className="flex items-center gap-2">
                  {socials.map((s) => (
                    <a
                      key={s.platform}
                      href={s.url}
                      target="_blank"
                      rel="noopener noreferrer"
                      aria-label={`Suivre sur ${s.platform}`}
                      className="flex h-8 w-8 items-center justify-center rounded-full border border-[#FF6600]/20 bg-white text-[#FF6600] transition-all duration-300 hover:scale-110 hover:bg-[#FF6600] hover:text-white active:scale-95 motion-reduce:transition-none"
                    >
                      <SocialIcon platform={s.platform} />
                    </a>
                  ))}
                </div>
              )}
            </div>
          </div>
        </div>
      </div>
    </>
  );
}

/* Section « réseau de franchisés » — drive-to-store : on géolocalise le visiteur
   (IP au chargement, puis GPS précis sur demande) et on affiche le TOP 3 des franchisés
   les plus proches (le n°1 mis en avant). Cliquer une carte change le portrait à droite.
   Îlot React interactif : l'état (géoloc, sélection) est géré ici, les données par props. */
export default function Franchises({
  franchisees = [],
  eyebrow = "Notre réseau",
  heading = "Trouvez votre *expert* le plus proche",
  intro = "Nos franchisés vous accompagnent partout en France pour capturer vos espaces sous leur meilleur angle.",
  ctaLabel = "Devenir franchisé",
  ctaHref = "#contact",
  joinHint = "Vous voulez vous aussi rejoindre l'aventure ? Des zones sont encore disponibles.",
  defaultImageUrl = "/didier.png",
  defaultName,
  defaultRole,
}: Props) {
  const [selectedId, setSelectedId] = useState<string | null>(null);
  const [searchTerm, setSearchTerm] = useState("");

  // --- Géolocalisation du visiteur ---
  const [userPos, setUserPos] = useState<LatLng | null>(null);
  const [geoStatus, setGeoStatus] = useState<GeoStatus>("idle");
  const [geoSource, setGeoSource] = useState<GeoSource>(null);
  const [geoCity, setGeoCity] = useState<string | null>(null);

  // Au chargement : estimation automatique par IP (sans autorisation, précision ≈ ville).
  useEffect(() => {
    const controller = new AbortController();
    fetchIpLocation(controller.signal).then((loc) => {
      if (!loc) return;
      setUserPos((prev) => prev ?? { lat: loc.lat, lng: loc.lng });
      setGeoSource((prev) => prev ?? "ip");
      setGeoCity((prev) => prev ?? (loc.city ?? null));
      // Ne pas écraser un statut déjà passé en GPS (« locating »/« located »).
      setGeoStatus((prev) => (prev === "idle" ? "located" : prev));
    });
    return () => controller.abort();
  }, []);

  // Bouton « Me localiser » : géoloc GPS précise via le navigateur (demande l'autorisation).
  const locateMe = () => {
    if (typeof navigator === "undefined" || !navigator.geolocation) {
      setGeoStatus((prev) => (userPos ? "located" : "error"));
      return;
    }
    setGeoStatus("locating");
    navigator.geolocation.getCurrentPosition(
      (position) => {
        setUserPos({
          lat: position.coords.latitude,
          lng: position.coords.longitude,
        });
        setGeoSource("gps");
        setGeoStatus("located");
        // Le GPS ne fournit pas de nom de ville : on garde celui de l'IP s'il existe.
      },
      () => {
        // Refus ou échec : on conserve la position IP si on en a une.
        setGeoStatus(userPos ? "located" : "error");
      },
      { enableHighAccuracy: true, timeout: 10000, maximumAge: 5 * 60 * 1000 },
    );
  };

  // Chaque franchisé enrichi de sa distance au visiteur (null si position inconnue).
  const decorated = useMemo(
    () =>
      franchisees.map((f) => ({
        ...f,
        distanceKm:
          userPos && typeof f.lat === "number" && typeof f.lng === "number"
            ? haversineKm(userPos, { lat: f.lat, lng: f.lng })
            : null,
      })),
    [franchisees, userPos],
  );

  // Tri par proximité quand on a une position (les non-localisés restent en fin de liste).
  const sortedFranchisees = useMemo(() => {
    if (!userPos) return decorated;
    return [...decorated].sort((a, b) => {
      if (a.distanceKm == null) return b.distanceKm == null ? 0 : 1;
      if (b.distanceKm == null) return -1;
      return a.distanceKm - b.distanceKm;
    });
  }, [decorated, userPos]);

  // Recherche manuelle (nom OU zone OU ville), insensible aux accents et à la casse.
  // Les résultats restent triés par proximité quand le visiteur est géolocalisé.
  const isSearching = searchTerm.trim().length > 0;
  const searchResults = useMemo(() => {
    const term = normalize(searchTerm.trim());
    if (!term) return [];
    return sortedFranchisees.filter(
      (f) =>
        normalize(f.name).includes(term) ||
        normalize(f.zone).includes(term) ||
        normalize(f.ville ?? "").includes(term),
    );
  }, [sortedFranchisees, searchTerm]);

  // Portrait affiché à droite = franchisé sélectionné par clic, sinon 1er résultat de
  // recherche. PAS de sélection automatique par géoloc : la photo par défaut (didier.png)
  // reste affichée « sans filtre » tant que le visiteur n'a pas choisi/recherché un franchisé.
  const activeFranchisee = useMemo(() => {
    if (selectedId) {
      const found = franchisees.find((f) => f.id === selectedId);
      if (found) return found;
    }
    if (isSearching) return searchResults[0] ?? null;
    return null;
  }, [selectedId, franchisees, isSearching, searchResults]);

  // Liste affichée : résultats de recherche si l'on cherche, sinon le TOP 3 des plus proches.
  const cards = useMemo(() => {
    const base = isSearching ? searchResults : sortedFranchisees.slice(0, 3);
    return base.map((f, i) => ({
      id: f.id,
      rank: i + 1,
      name: f.name,
      zone: f.zone,
      imageUrl: f.imageUrl,
      pageLink: f.pageLink,
      distanceLabel: f.distanceKm != null ? formatDistance(f.distanceKm) : null,
      // Le ruban « le plus proche » n'a de sens qu'en mode proximité (hors recherche).
      isNearest: !isSearching && i === 0 && f.distanceKm != null,
      isSelected: activeFranchisee?.id === f.id,
    }));
  }, [isSearching, searchResults, sortedFranchisees, activeFranchisee]);

  const onSelect = (id: string) => setSelectedId(id);

  // Portrait de droite : le franchisé actif (sélection/recherche) si présent, sinon `null`
  // → la photo par défaut (didier.png) s'affiche seule, « sans filtre » ni encart.
  const portrait = activeFranchisee;

  return (
    <section id="franchises" className="relative overflow-hidden bg-white py-16 text-[#0a0a0a] md:py-24 lg:py-32">
      <div className="mx-auto w-full max-w-[var(--container)] px-6 sm:px-8">
        <div className="grid grid-cols-1 items-start gap-16 lg:grid-cols-12 lg:gap-20">

          {/* COLONNE GAUCHE — eyebrow + titre + intro + géoloc + top 3 + CTA */}
          <div className="lg:col-span-6">
            <div className="rounded-2xl border border-gray-100 bg-white p-8 shadow-[0_12px_32px_-16px_rgba(255,102,0,0.18)] md:p-10">
              <span className="inline-flex items-center gap-1.5 text-xs font-bold tracking-tight text-[#FF6600]">
                <svg viewBox="0 0 24 24" fill="currentColor" className="h-3.5 w-3.5 shrink-0" aria-hidden="true">
                  <path d="M12 2 14 10 22 12 14 14 12 22 10 14 2 12 10 10Z" />
                </svg>
                {eyebrow}
              </span>

              <h2 className="mt-6 font-heading text-3xl font-bold leading-[1.05] tracking-tight md:text-4xl lg:text-5xl">
                {renderHeading(heading)}
              </h2>

              <p className="mt-6 max-w-xl text-lg leading-relaxed text-gray-600">{intro}</p>

              {/* CHAMP DE RECHERCHE MANUELLE (ville, région, nom) */}
              <div className="relative mt-10">
                <label htmlFor="franchise-search" className="sr-only">
                  Rechercher un franchisé
                </label>
                <span className="pointer-events-none absolute inset-y-0 left-5 flex items-center text-gray-400">
                  <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" className="h-5 w-5" aria-hidden="true">
                    <circle cx="11" cy="11" r="8" />
                    <line x1="21" y1="21" x2="16.65" y2="16.65" />
                  </svg>
                </span>
                <input
                  id="franchise-search"
                  type="text"
                  value={searchTerm}
                  onChange={(e) => setSearchTerm(e.target.value)}
                  placeholder="Rechercher une ville, une région, un nom…"
                  className="w-full rounded-full border border-gray-200 bg-white py-4 pl-12 pr-12 text-[#0a0a0a] outline-none transition-all duration-300 placeholder:text-gray-400 focus:border-[#FF6600] focus:ring-4 focus:ring-[#FF6600]/10"
                />
                {isSearching && (
                  <button
                    type="button"
                    onClick={() => setSearchTerm("")}
                    aria-label="Effacer la recherche"
                    className="absolute inset-y-0 right-4 flex items-center text-gray-400 transition-colors hover:text-[#FF6600]"
                  >
                    <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" className="h-5 w-5" aria-hidden="true">
                      <line x1="18" y1="6" x2="6" y2="18" />
                      <line x1="6" y1="6" x2="18" y2="18" />
                    </svg>
                  </button>
                )}
              </div>

              {/* BARRE DE GÉOLOCALISATION (bouton « Me localiser » + statut) */}
              <div className="mt-6 flex flex-wrap items-center gap-4 border-b border-gray-100 pb-6">
                <button
                  type="button"
                  onClick={locateMe}
                  disabled={geoStatus === "locating"}
                  aria-label="Utiliser ma position GPS"
                  className="group inline-flex items-center gap-2 rounded-full border border-[#FF6600] px-5 py-2.5 text-sm font-semibold text-[#FF6600] transition-all duration-300 hover:bg-[#FF6600] hover:text-white active:scale-95 disabled:cursor-not-allowed disabled:opacity-70"
                >
                  {geoStatus === "locating" ? (
                    <>
                      <svg className="h-4 w-4 animate-spin" viewBox="0 0 24 24" fill="none" xmlns="http://www.w3.org/2000/svg" aria-hidden="true">
                        <circle className="opacity-25" cx="12" cy="12" r="10" stroke="currentColor" strokeWidth="4"></circle>
                        <path className="opacity-75" fill="currentColor" d="M4 12a8 8 0 018-8V0C5.373 0 0 5.373 0 12h4zm2 5.291A7.962 7.962 0 014 12H0c0 3.042 1.135 5.824 3 7.938l3-2.647z"></path>
                      </svg>
                      <span>Localisation…</span>
                    </>
                  ) : (
                    <>
                      <svg className="h-4 w-4 transition-transform group-hover:scale-110 motion-reduce:transition-none" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" aria-hidden="true">
                        <path d="M20 10c0 6-8 12-8 12s-8-6-8-12a8 8 0 0 1 16 0Z" />
                        <circle cx="12" cy="10" r="3" />
                      </svg>
                      <span>Me localiser</span>
                    </>
                  )}
                </button>

                <div className="text-sm">
                  {geoStatus === "idle" && (
                    <p className="text-gray-500">Activez la localisation pour voir l'expert le plus proche</p>
                  )}
                  {geoStatus === "located" && (
                    <div className="flex flex-col">
                      <div className="flex items-center gap-1.5 font-medium text-[#0a0a0a]">
                        <svg className="h-3.5 w-3.5 text-[#FF6600]" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.5" strokeLinecap="round" strokeLinejoin="round" aria-hidden="true">
                          <path d="M20 10c0 6-8 12-8 12s-8-6-8-12a8 8 0 0 1 16 0Z" />
                          <circle cx="12" cy="10" r="3" />
                        </svg>
                        <span>Autour de {geoCity ?? "vous"}</span>
                      </div>
                      {geoSource === "ip" && (
                        <span className="ml-5 text-[11px] italic text-gray-400">Position approximative</span>
                      )}
                    </div>
                  )}
                  {geoStatus === "error" && (
                    <p className="text-gray-500">Localisation indisponible — voici nos experts</p>
                  )}
                </div>
              </div>

              {/* RÉSULTATS — recherche manuelle si l'on cherche, sinon TOP 3 des plus proches */}
              {cards.length > 0 ? (
                <div className="mt-8 space-y-6">
                  {/* En-tête (bascule recherche / proximité) */}
                  <div className="flex items-center gap-2 px-1">
                    {isSearching ? (
                      <>
                        <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.5" strokeLinecap="round" strokeLinejoin="round" className="h-3.5 w-3.5 text-[#FF6600]" aria-hidden="true">
                          <circle cx="11" cy="11" r="8" />
                          <line x1="21" y1="21" x2="16.65" y2="16.65" />
                        </svg>
                        <span className="text-xs font-bold uppercase tracking-widest text-[#FF6600]">
                          {cards.length} résultat{cards.length > 1 ? "s" : ""}
                        </span>
                      </>
                    ) : (
                      <>
                        <svg viewBox="0 0 24 24" fill="none" className="h-4 w-4 text-[#FF6600]" aria-hidden="true">
                          <path d="M12 2L14.4 9.6L22 12L14.4 14.4L12 22L9.6 14.4L2 12L9.6 9.6L12 2Z" fill="currentColor" />
                        </svg>
                        <span className="text-xs font-bold uppercase tracking-widest text-[#FF6600]">
                          Les plus proches de vous
                        </span>
                      </>
                    )}
                  </div>

                  {/* Pile de cartes franchisés (défilante en mode recherche) */}
                  <div className={`space-y-4 ${isSearching ? "-mr-2 max-h-[26rem] overflow-y-auto pr-2" : ""}`}>
                    {cards.map((p) => (
                      <div
                        key={p.id}
                        className={`group relative flex items-center gap-4 rounded-2xl bg-[#fdfaf6] p-4 transition-all duration-300 md:p-5 shadow-[0_2px_8px_-3px_rgba(10,10,10,0.10),0_22px_48px_-18px_rgba(10,10,10,0.14)] hover:shadow-[0_4px_12px_-3px_rgba(10,10,10,0.14),0_32px_64px_-20px_rgba(10,10,10,0.20)] motion-reduce:transition-none ${
                          p.isSelected ? "ring-2 ring-[#FF6600]" : "ring-1 ring-black/5"
                        } ${p.isNearest && !p.isSelected ? "border-l-4 border-[#FF6600]" : ""}`}
                      >
                        {/* Badge « Le plus proche » */}
                        {p.isNearest && (
                          <div className="absolute -top-2.5 right-6 flex items-center gap-1.5 rounded-full bg-[#FF6600] px-3 py-1 shadow-sm transition-transform duration-300 group-hover:-translate-y-0.5 motion-reduce:transition-none">
                            <span className="text-[10px] font-bold uppercase tracking-wider text-white">★ Le plus proche</span>
                          </div>
                        )}

                        {/* Zone de sélection principale (bouton) */}
                        <button
                          type="button"
                          onClick={() => onSelect(p.id)}
                          aria-pressed={p.isSelected}
                          className="flex flex-1 items-center gap-4 text-left focus:outline-none"
                        >
                          {/* Badge de rang */}
                          <div
                            className={`flex h-10 w-10 shrink-0 items-center justify-center rounded-2xl border font-heading text-[13px] font-bold tracking-wide transition-colors ${
                              p.isNearest
                                ? "border-[#FF6600] bg-[#FF6600] text-white"
                                : "border-[#FF6600]/45 text-[#FF6600] group-hover:bg-[#FF6600]/5"
                            }`}
                          >
                            {p.rank.toString().padStart(2, "0")}
                          </div>

                          {/* Vignette photo */}
                          <div className="h-14 w-14 shrink-0 overflow-hidden rounded-xl bg-[#fff4ec]">
                            {p.imageUrl ? (
                              <img
                                src={p.imageUrl}
                                alt={p.name}
                                className="h-full w-full object-cover transition-transform duration-500 group-hover:scale-110 motion-reduce:transition-none motion-reduce:group-hover:scale-100"
                              />
                            ) : (
                              <div className="flex h-full w-full items-center justify-center text-[#FF6600]">
                                <svg className="h-6 w-6" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth="1.5" aria-hidden="true">
                                  <path strokeLinecap="round" strokeLinejoin="round" d="M15.75 6a3.75 3.75 0 1 1-7.5 0 3.75 3.75 0 0 1 7.5 0ZM4.501 20.118a7.5 7.5 0 0 1 14.998 0A17.933 17.933 0 0 1 12 21.75c-2.676 0-5.216-.584-7.499-1.632Z" />
                                </svg>
                              </div>
                            )}
                          </div>

                          {/* Infos textuelles */}
                          <div className="min-w-0 flex-1 space-y-0.5">
                            <h3 className="truncate font-heading text-base font-bold text-[#0a0a0a] md:text-lg">
                              {p.name}
                            </h3>
                            <div className="flex items-center gap-2 text-sm text-gray-500">
                              <span className="truncate">{p.zone}</span>
                              {p.distanceLabel && (
                                <span className="inline-flex shrink-0 items-center gap-1 rounded-full bg-[#fff4ec] px-2.5 py-0.5 text-[11px] font-bold text-[#FF6600]">
                                  <svg className="h-3 w-3" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth="2" aria-hidden="true">
                                    <path strokeLinecap="round" strokeLinejoin="round" d="M15 10.5a3 3 0 1 1-6 0 3 3 0 0 1 6 0Z" />
                                    <path strokeLinecap="round" strokeLinejoin="round" d="M19.5 10.5c0 7.142-7.5 11.25-7.5 11.25S4.5 17.642 4.5 10.5a7.5 7.5 0 1 1 15 0Z" />
                                  </svg>
                                  {p.distanceLabel}
                                </span>
                              )}
                            </div>
                          </div>
                        </button>

                        {/* Lien contact (action séparée du bouton de sélection) */}
                        {p.pageLink && (
                          <a
                            href={p.pageLink}
                            aria-label={`Contacter ${p.name}`}
                            className="flex h-10 w-10 shrink-0 items-center justify-center rounded-full border border-[#FF6600]/20 bg-white text-[#FF6600] transition-all duration-300 hover:scale-110 hover:bg-[#FF6600] hover:text-white active:scale-95 motion-safe:hover:-translate-y-0.5 motion-reduce:transition-none"
                          >
                            <svg className="h-5 w-5" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth="2" aria-hidden="true">
                              <path strokeLinecap="round" strokeLinejoin="round" d="m8.25 4.5 7.5 7.5-7.5 7.5" />
                            </svg>
                          </a>
                        )}
                      </div>
                    ))}
                  </div>
                </div>
              ) : (
                <div className="mt-8 rounded-2xl border-2 border-dashed border-gray-100 bg-gray-50 py-12 text-center">
                  <p className="font-medium text-gray-500">
                    {isSearching
                      ? `Aucun franchisé trouvé pour « ${searchTerm.trim()} »`
                      : "Aucun franchisé disponible"}
                  </p>
                </div>
              )}

            </div>
          </div>

          {/* COLONNE DROITE — portrait du franchisé sélectionné (change en fondu) + CTA dessous */}
          <div className="lg:col-span-6">
            <div className="relative">
            {/* Décorations */}
            <div className="absolute -inset-4 -z-10 rounded-3xl border-2 border-dashed border-[#FF6600]/15" aria-hidden="true" />
            <div className="absolute left-1/2 top-1/2 -z-10 h-64 w-64 -translate-x-1/2 -translate-y-1/2 rounded-full bg-[#FF6600]/5 blur-3xl" aria-hidden="true" />

            <div className="relative aspect-[4/5] overflow-hidden rounded-2xl border border-gray-100 bg-[#fff4ec] shadow-[0_22px_50px_-16px_rgba(255,102,0,0.20)]">
              {portrait ? (
                <div key={portrait.id} className="group h-full w-full animate-fade-in">
                  {portrait.imageUrl || defaultImageUrl ? (
                    <img
                      src={portrait.imageUrl ?? defaultImageUrl}
                      alt={`Portrait de ${portrait.name}`}
                      className="h-full w-full object-cover transition-transform duration-700 ease-in-out group-hover:scale-105 motion-reduce:transition-none motion-reduce:group-hover:scale-100"
                    />
                  ) : (
                    <div className="flex h-full w-full flex-col items-center justify-center gap-4 text-[#FF6600]/20">
                      <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1" className="h-20 w-20" aria-hidden="true">
                        <path d="M19 4h-3.17L14.41 2H9.59L8.17 4H5c-1.1 0-2 .9-2 2v12c0 1.1.9 2 2 2h14c1.1 0 2-.9 2-2V6c0-1.1-.9-2-2-2z" />
                        <circle cx="12" cy="13" r="4" />
                      </svg>
                      <span className="text-[10px] font-bold uppercase tracking-widest text-gray-400">
                        Photo bientôt disponible
                      </span>
                    </div>
                  )}

                  {/* Encart blanc « fiche franchisé » par-dessus la photo */}
                  <FranchiseeInfoCard franchisee={portrait} />
                </div>
              ) : defaultImageUrl ? (
                /* Aucun franchisé géolocalisé/sélectionné → photo par défaut. */
                <div key="__default__" className="group h-full w-full animate-fade-in">
                  <img
                    src={defaultImageUrl}
                    alt={defaultName ? `Portrait de ${defaultName}` : "Notre réseau"}
                    className="h-full w-full object-cover transition-transform duration-700 ease-in-out group-hover:scale-105 motion-reduce:transition-none motion-reduce:group-hover:scale-100"
                  />
                </div>
              ) : (
                <div className="flex h-full w-full flex-col items-center justify-center gap-4 text-[#FF6600]/20">
                  <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.25" strokeLinecap="round" strokeLinejoin="round" className="h-16 w-16" aria-hidden="true">
                    <path d="M17 21v-2a4 4 0 0 0-4-4H5a4 4 0 0 0-4 4v2" />
                    <circle cx="9" cy="7" r="4" />
                    <path d="M23 21v-2a4 4 0 0 0-3-3.87" />
                    <path d="M16 3.13a4 4 0 0 1 0 7.75" />
                  </svg>
                  <span className="text-[10px] font-bold uppercase tracking-widest text-gray-400">
                    Aucun franchisé
                  </span>
                </div>
              )}
            </div>
            </div>

            {/* Invitation à rejoindre le réseau + CTA — sous la photo des franchisés */}
            {joinHint && (
              <p className="mt-8 max-w-md text-sm leading-relaxed text-gray-600">
                {joinHint}
              </p>
            )}
            <a
              href={ctaHref}
              className="group mt-4 inline-flex items-center gap-3 rounded-full bg-[#FF6600] px-8 py-4 font-semibold text-white shadow-xl shadow-orange-900/10 transition-all duration-300 hover:-translate-y-0.5 hover:bg-[#e85c00] active:scale-95 motion-reduce:transition-none"
            >
              {ctaLabel}
              <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.5" strokeLinecap="round" strokeLinejoin="round" className="h-5 w-5 transition-transform duration-300 group-hover:translate-x-1.5 motion-reduce:transition-none" aria-hidden="true">
                <line x1="5" y1="12" x2="19" y2="12" />
                <polyline points="12 5 19 12 12 19" />
              </svg>
            </a>
          </div>

        </div>
      </div>
    </section>
  );
}
