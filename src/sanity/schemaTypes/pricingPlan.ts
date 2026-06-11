import { defineField, defineType } from "sanity";

export const pricingPlan = defineType({
  name: "pricingPlan",
  title: "Tarif",
  type: "document",
  fields: [
    defineField({
      name: "name",
      title: "Nom de l'offre",
      type: "string",
      validation: (rule) => rule.required(),
    }),
    defineField({
      name: "price",
      title: "Prix",
      type: "string",
      description: 'Ex. "29€", "Sur devis"',
    }),
    defineField({
      name: "period",
      title: "Période",
      type: "string",
      description: 'Ex. "/mois", "/visite"',
    }),
    defineField({
      name: "description",
      title: "Description",
      type: "text",
      rows: 2,
    }),
    defineField({
      name: "features",
      title: "Inclus",
      type: "array",
      of: [{ type: "string" }],
    }),
    defineField({
      name: "highlighted",
      title: "Offre mise en avant",
      type: "boolean",
      initialValue: false,
    }),
    defineField({
      name: "ctaLabel",
      title: "Libellé du bouton",
      type: "string",
    }),
    defineField({ name: "ctaHref", title: "Lien du bouton", type: "string" }),
    defineField({
      name: "order",
      title: "Ordre d'affichage",
      type: "number",
      initialValue: 0,
    }),
  ],
  orderings: [
    {
      title: "Ordre d'affichage",
      name: "orderAsc",
      by: [{ field: "order", direction: "asc" }],
    },
  ],
  preview: { select: { title: "name", subtitle: "price" } },
});
