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
      S.divider(),
      S.documentTypeListItem("tour").title("Visites virtuelles"),
      S.documentTypeListItem("category").title("Catégories"),
      S.documentTypeListItem("testimonial").title("Témoignages"),
      S.documentTypeListItem("pricingPlan").title("Tarifs"),
      S.documentTypeListItem("feature").title("Fonctionnalités"),
      S.documentTypeListItem("faq").title("FAQ"),
      S.documentTypeListItem("franchisee").title("Franchisés"),
    ]);
