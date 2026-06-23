// Géocodage au BUILD (Node uniquement) via la Base Adresse Nationale (BAN).
// Gratuit, sans clé d'API, optimisé pour les adresses françaises.
// Doc : https://adresse.data.gouv.fr/api-doc/adresse
//
// ⚠️ Ce module utilise `node:fs` : il ne doit être importé que côté serveur
// (frontmatter Astro / build), jamais dans un îlot React client.

import { readFileSync, writeFileSync } from "node:fs";
import { resolve } from "node:path";

export type GeoInput = {
  adresse?: string | null;
  codePostal?: string | null;
  ville?: string | null;
};

type GeoCoords = { lat: number; lng: number } | null;
type Cache = Record<string, GeoCoords>;

// Cache disque pour éviter de ré-appeler la BAN à chaque build (clé = requête).
const CACHE_PATH = resolve(process.cwd(), ".geocode-cache.json");
// En-deçà de ce score de pertinence BAN, on considère l'adresse non localisée.
const MIN_SCORE = 0.4;

function loadCache(): Cache {
  try {
    return JSON.parse(readFileSync(CACHE_PATH, "utf8")) as Cache;
  } catch {
    return {};
  }
}

function saveCache(cache: Cache): void {
  try {
    writeFileSync(CACHE_PATH, JSON.stringify(cache, null, 2), "utf8");
  } catch {
    // Système de fichiers en lecture seule (certains CI) → on ré-géocodera au prochain build.
  }
}

/** Construit la requête texte transmise à la BAN à partir des champs d'adresse. */
function buildQuery({ adresse, codePostal, ville }: GeoInput): string {
  return [adresse, codePostal, ville]
    .map((part) => part?.trim())
    .filter(Boolean)
    .join(" ");
}

async function geocodeOne(input: GeoInput): Promise<GeoCoords> {
  const q = buildQuery(input);
  if (!q) return null;

  const url = new URL("https://api-adresse.data.gouv.fr/search/");
  url.searchParams.set("q", q);
  url.searchParams.set("limit", "1");
  if (input.codePostal?.trim()) {
    url.searchParams.set("postcode", input.codePostal.trim());
  }

  try {
    const res = await fetch(url, {
      headers: { "User-Agent": "easyvirtual.tours build geocoder" },
    });
    if (!res.ok) return null;
    const data = (await res.json()) as {
      features?: Array<{
        geometry?: { coordinates?: [number, number] };
        properties?: { score?: number };
      }>;
    };
    const feature = data.features?.[0];
    const coords = feature?.geometry?.coordinates;
    const score = feature?.properties?.score ?? 0;
    // La BAN renvoie [lng, lat] (ordre GeoJSON). On rejette les correspondances faibles.
    if (!coords || score < MIN_SCORE) return null;
    return { lng: coords[0], lat: coords[1] };
  } catch {
    // Réseau indisponible au build → dégradation propre (pas de coordonnées).
    return null;
  }
}

/**
 * Géocode une liste d'éléments (franchisés) au build et renvoie chacun enrichi
 * de `{ lat, lng }` (ou `null` si non géocodable). Met en cache par requête.
 * Séquentiel et tolérant : une adresse manquante ou en échec n'impacte pas les autres.
 */
export async function geocodeAll<T extends GeoInput>(
  items: T[],
): Promise<Array<T & { lat: number | null; lng: number | null }>> {
  const cache = loadCache();
  let cacheDirty = false;
  const out: Array<T & { lat: number | null; lng: number | null }> = [];

  for (const item of items) {
    const key = buildQuery(item).toLowerCase();
    let coords: GeoCoords = null;

    if (key) {
      if (key in cache) {
        coords = cache[key];
      } else {
        coords = await geocodeOne(item);
        cache[key] = coords;
        cacheDirty = true;
      }
    }

    out.push({ ...item, lat: coords?.lat ?? null, lng: coords?.lng ?? null });
  }

  if (cacheDirty) saveCache(cache);
  return out;
}
