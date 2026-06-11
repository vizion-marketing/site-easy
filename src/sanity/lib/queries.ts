// Requêtes GROQ réutilisables (chaînes simples, utilisables avec sanityClient.fetch).

export const SITE_SETTINGS_QUERY = `*[_type == "siteSettings"][0]`;

export const FEATURED_TOURS_QUERY = `*[_type == "tour" && featured == true]|order(publishedAt desc){
  _id, title, slug, client, location, coverImage,
  "category": category->title
}`;

export const ALL_TOURS_QUERY = `*[_type == "tour"]|order(publishedAt desc){
  _id, title, slug, client, location, coverImage,
  "category": category->title
}`;

export const TOUR_BY_SLUG_QUERY = `*[_type == "tour" && slug.current == $slug][0]{
  ..., "category": category->title
}`;

export const FEATURES_QUERY = `*[_type == "feature"]|order(order asc)`;

export const PRICING_QUERY = `*[_type == "pricingPlan"]|order(order asc)`;

export const TESTIMONIALS_QUERY = `*[_type == "testimonial"]`;

export const FAQ_QUERY = `*[_type == "faq"]|order(order asc)`;

export const CATEGORIES_QUERY = `*[_type == "category"]|order(title asc)`;

export const FRANCHISEES_QUERY = `*[_type == "franchisee"]|order(nom asc){
  _id, prenom, nom, zone, photo, pageLink
}`;
