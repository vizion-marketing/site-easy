// Requêtes GROQ réutilisables (chaînes simples, utilisables avec sanityClient.fetch).

export const SITE_SETTINGS_QUERY = `*[_type == "siteSettings"][0]`;

// Singleton « Qui sommes nous » (section À propos).
export const A_PROPOS_QUERY = `*[_type == "aPropos"][0]{
  eyebrow, heading, name, verified, role, bio, portrait, ctaLabel, ctaHref,
  facts[]{icon, label, value}
}`;

export const FEATURED_TOURS_QUERY = `*[_type == "tour" && featured == true]|order(publishedAt desc){
  _id, title, slug, client, clientLogo, location, coverImage,
  "secteur": secteurs[0]->title,
  "secteurs": secteurs[]->title,
  "casUsages": casUsages[]->title,
  "description": pt::text(description)
}`;

export const ALL_TOURS_QUERY = `*[_type == "tour"]|order(publishedAt desc){
  _id, title, slug, client, clientLogo, location, coverImage,
  "secteur": secteurs[0]->title,
  "secteurs": secteurs[]->title,
  "casUsages": casUsages[]->title,
  "description": pt::text(description)
}`;

export const TOUR_BY_SLUG_QUERY = `*[_type == "tour" && slug.current == $slug][0]{
  ...,
  "secteurs": secteurs[]->{title, "slug": slug.current},
  "casUsages": casUsages[]->{title, "slug": slug.current}
}`;

export const FEATURES_QUERY = `*[_type == "feature"]|order(order asc)`;

export const PRICING_QUERY = `*[_type == "pricingPlan"]|order(order asc)`;

export const TESTIMONIALS_QUERY = `*[_type == "testimonial"]`;

export const FAQ_QUERY = `*[_type == "faq"]|order(order asc)`;

// Taxonomies du méga-menu (tags des visites virtuelles).
export const SECTEURS_QUERY = `*[_type == "secteur"]|order(order asc, title asc){
  _id, title, "slug": slug.current, description, icon
}`;

export const CAS_USAGES_QUERY = `*[_type == "casUsage"]|order(order asc, title asc){
  _id, title, "slug": slug.current, description, icon
}`;

export const FRANCHISEES_QUERY = `*[_type == "franchisee"]|order(nom asc){
  _id, prenom, nom, zone, photo, pageLink, ville, codePostal, adresse,
  description, noteGoogle, avisGoogle, ficheGoogle, reseaux[]{plateforme, url}
}`;
