import { defineField, defineType } from "sanity";

export const siteSettings = defineType({
  name: "siteSettings",
  title: "Paramètres du site",
  type: "document",
  fields: [
    defineField({
      name: "title",
      title: "Nom du site",
      type: "string",
      initialValue: "easyvirtual.tours",
    }),
    defineField({
      name: "description",
      title: "Description (SEO par défaut)",
      type: "text",
      rows: 3,
    }),
    defineField({
      name: "logo",
      title: "Logo",
      type: "image",
      options: { hotspot: true },
    }),
    defineField({ name: "email", title: "Email de contact", type: "string" }),
    defineField({ name: "phone", title: "Téléphone", type: "string" }),
    defineField({ name: "address", title: "Adresse", type: "text", rows: 2 }),
    defineField({
      name: "ctaLabel",
      title: "Libellé CTA (header)",
      type: "string",
      initialValue: "Demander une démo",
    }),
    defineField({ name: "ctaHref", title: "Lien CTA (header)", type: "string" }),
    defineField({
      name: "social",
      title: "Réseaux sociaux",
      type: "object",
      options: { collapsible: true, collapsed: true },
      fields: [
        { name: "linkedin", title: "LinkedIn", type: "url" },
        { name: "instagram", title: "Instagram", type: "url" },
        { name: "facebook", title: "Facebook", type: "url" },
        { name: "youtube", title: "YouTube", type: "url" },
        { name: "twitter", title: "X / Twitter", type: "url" },
      ],
    }),
  ],
  preview: {
    prepare: () => ({ title: "Paramètres du site" }),
  },
});
