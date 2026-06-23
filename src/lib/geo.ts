// Helpers de géolocalisation CÔTÉ CLIENT (utilisés dans les îlots React).
// Logique pure : distance entre deux points + estimation de la position du
// visiteur par IP. Aucune dépendance externe.

export type LatLng = { lat: number; lng: number };

const EARTH_RADIUS_KM = 6371;
const toRad = (deg: number) => (deg * Math.PI) / 180;

/** Distance à vol d'oiseau entre deux points GPS, en kilomètres (formule de Haversine). */
export function haversineKm(a: LatLng, b: LatLng): number {
  const dLat = toRad(b.lat - a.lat);
  const dLng = toRad(b.lng - a.lng);
  const lat1 = toRad(a.lat);
  const lat2 = toRad(b.lat);

  const h =
    Math.sin(dLat / 2) ** 2 +
    Math.sin(dLng / 2) ** 2 * Math.cos(lat1) * Math.cos(lat2);

  return 2 * EARTH_RADIUS_KM * Math.asin(Math.sqrt(h));
}

/** Formate une distance en kilomètres pour l'affichage (« 850 m », « 12 km », « 1 240 km »). */
export function formatDistance(km: number): string {
  if (km < 1) return `${Math.round(km * 1000)} m`;
  if (km < 10) return `${km.toFixed(1).replace(".", ",")} km`;
  return `${Math.round(km).toLocaleString("fr-FR")} km`;
}

export type IpLocation = LatLng & { city?: string; region?: string; accuracyKm?: number };

// Au-delà de ce rayon (km), la géoloc IP n'est qu'au niveau région/pays : pour une IP
// française non résolue à la ville, geojs renvoie alors **Paris (48.86, 2.34) par défaut**,
// ce qui plaçait à tort « l'expert le plus proche » à Paris pour tout le monde. On rejette
// ces résultats grossiers (le visiteur peut affiner via le bouton GPS « Me localiser »).
const MAX_IP_ACCURACY_KM = 100;

// Fournisseurs de géoloc IP, gratuits / sans clé / HTTPS / CORS. Essayés dans l'ordre :
// le premier qui répond correctement gagne (résilience aux 403 / quotas / pannes).
type IpProvider = { url: string; parse: (data: any) => IpLocation | null };

const toNum = (v: unknown): number => (typeof v === "number" ? v : parseFloat(String(v)));

const IP_PROVIDERS: IpProvider[] = [
  {
    // geojs.io — CORS permissif, sans quota strict (latitude/longitude en chaînes).
    // `accuracy` est un rayon en km : sert à écarter les réponses niveau pays (= Paris).
    url: "https://get.geojs.io/v1/ip/geo.json",
    parse: (d) => {
      const lat = toNum(d?.latitude);
      const lng = toNum(d?.longitude);
      if (!Number.isFinite(lat) || !Number.isFinite(lng)) return null;
      const accuracyKm = toNum(d?.accuracy);
      return {
        lat,
        lng,
        city: d?.city,
        region: d?.region,
        accuracyKm: Number.isFinite(accuracyKm) ? accuracyKm : undefined,
      };
    },
  },
  {
    // ipapi.co — 30k req/mois gratuites, renvoie des nombres.
    url: "https://ipapi.co/json/",
    parse: (d) => {
      const lat = toNum(d?.latitude);
      const lng = toNum(d?.longitude);
      if (!Number.isFinite(lat) || !Number.isFinite(lng)) return null;
      return { lat, lng, city: d?.city, region: d?.region };
    },
  },
  {
    // ipwho.is — secours (peut renvoyer 403 selon l'origine).
    url: "https://ipwho.is/",
    parse: (d) => {
      if (d?.success === false) return null;
      const lat = toNum(d?.latitude);
      const lng = toNum(d?.longitude);
      if (!Number.isFinite(lat) || !Number.isFinite(lng)) return null;
      return { lat, lng, city: d?.city, region: d?.region };
    },
  },
];

/**
 * Estime la position du visiteur via son adresse IP (précision ≈ ville).
 * Aucune autorisation requise. Essaie plusieurs fournisseurs et renvoie le premier
 * résultat exploitable, ou `null` si tous échouent (réseau, quota, blocage).
 */
export async function fetchIpLocation(signal?: AbortSignal): Promise<IpLocation | null> {
  for (const provider of IP_PROVIDERS) {
    if (signal?.aborted) return null;
    try {
      const res = await fetch(provider.url, { signal });
      if (!res.ok) continue;
      const loc = provider.parse(await res.json());
      if (!loc) continue;
      // Résolution trop grossière (niveau région/pays → Paris par défaut en France) :
      // inexploitable pour un store locator, on tente le fournisseur suivant.
      if (loc.accuracyKm != null && loc.accuracyKm > MAX_IP_ACCURACY_KM) continue;
      return loc;
    } catch {
      // Réseau coupé / requête annulée → on tente le fournisseur suivant.
    }
  }
  return null;
}
