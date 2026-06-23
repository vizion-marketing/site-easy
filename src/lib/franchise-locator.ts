// Adaptateur : réseau de franchisés (donnée auto-générée) → graine du store locator
// (composant Franchises.tsx). Pur / sans dépendance Node : importable côté serveur
// (frontmatter Astro, pour le géocodage au build) comme côté client.

import { FRANCHISES, type Franchise } from "./franchises";

/** Numéro FR « 06 77 00 56 23 » → lien `tel:+33677005623`. Vide si pas de numéro exploitable. */
function telHref(phone: string): string | undefined {
  const digits = phone.replace(/\D/g, "");
  if (digits.length < 9) return undefined;
  return `tel:+33${digits.replace(/^0/, "")}`;
}

/** Slug stable d'un franchisé (= nom de fichier de sa photo, sans extension). */
export const franchiseSlug = (f: Franchise): string =>
  f.photo.replace(/^.*\/(.+)\.png$/, "$1");

/** Secteur affichable : villes jointes (« Strasbourg · Colmar »), repli sur le brut puis « France ». */
const displayZone = (f: Franchise): string =>
  f.zones.length ? f.zones.join(" · ") : f.zone || "France";

/** Ville pour le géocodage BAN : 1re ville du secteur, débarrassée des qualificatifs
 *  cardinaux (« Bordeaux Sud » → « Bordeaux ») qui font échouer la recherche d'adresse. */
const geocodeVille = (f: Franchise): string =>
  (f.zones[0] ?? "").replace(/\s+(Sud|Nord|Est|Ouest)\b/gi, "").trim();

export type FranchiseLocatorSeed = {
  id: string;
  name: string;
  zone: string;
  ville: string; // 1re ville du secteur — sert au géocodage BAN au build
  imageUrl: string;
  pageLink?: string;
  adresse: null; // champs d'adresse (entrée de géocodage) — non renseignés ici
  codePostal: null;
};

/** Convertit tout le réseau en graine pour le store locator. La géolocalisation
 *  est ensuite ajoutée au build par `geocodeAll` (à partir de `ville`). */
export const franchiseLocatorSeed = (): FranchiseLocatorSeed[] =>
  FRANCHISES.map((f) => ({
    id: franchiseSlug(f),
    name: f.name,
    zone: displayZone(f),
    ville: geocodeVille(f),
    imageUrl: f.photo,
    pageLink: telHref(f.phone),
    adresse: null,
    codePostal: null,
  }));
