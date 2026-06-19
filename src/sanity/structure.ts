import type { StructureResolver } from "sanity/structure";

// Custom desk structure : siteSettings en singleton, le reste en listes.
export const structure: StructureResolver = (S) =>
  S.list()
    .title("Contenu")
    .items([
      S.listItem()
        .title("Paramètres du site")
        .id("siteSettings")
        .child(
          S.document().schemaType("siteSettings").documentId("siteSettings"),
        ),
      S.listItem()
        .title("Qui sommes nous")
        .id("aPropos")
        .child(S.document().schemaType("aPropos").documentId("aPropos")),
      S.divider(),
      S.documentTypeListItem("tour").title("Visites virtuelles"),
      S.documentTypeListItem("secteur").title("Secteurs d'activité"),
      S.documentTypeListItem("casUsage").title("Cas d'usage"),
      S.documentTypeListItem("testimonial").title("Témoignages"),
      S.documentTypeListItem("pricingPlan").title("Tarifs"),
      S.documentTypeListItem("feature").title("Fonctionnalités"),
      S.documentTypeListItem("faq").title("FAQ"),
      S.documentTypeListItem("franchisee").title("Franchisés"),
    ]);
