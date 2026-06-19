import { defineField, defineType } from "sanity";

export const tour = defineType({
  name: "tour",
  title: "Visite virtuelle",
  type: "document",
  fields: [
    defineField({
      name: "title",
      title: "Titre",
      type: "string",
      validation: (rule) => rule.required(),
    }),
    defineField({
      name: "slug",
      title: "Slug",
      type: "slug",
      options: { source: "title", maxLength: 96 },
      validation: (rule) => rule.required(),
    }),
    defineField({ name: "client", title: "Client", type: "string" }),
    defineField({
      name: "clientLogo",
      title: "Logo du client",
      type: "image",
      options: { hotspot: true },
      description: "Affiché en haut à gauche de la carte de visite (filtré en blanc).",
    }),
    defineField({
      name: "secteurs",
      title: "Secteurs d'activité",
      type: "array",
      of: [{ type: "reference", to: [{ type: "secteur" }] }],
      description: "Tags secteur — le 1er sert de badge sur la carte de visite.",
    }),
    defineField({
      name: "casUsages",
      title: "Cas d'usage",
      type: "array",
      of: [{ type: "reference", to: [{ type: "casUsage" }] }],
      description: "Tags cas d'usage de la visite.",
    }),
    defineField({ name: "location", title: "Lieu", type: "string" }),
    defineField({
      name: "coverImage",
      title: "Image de couverture",
      type: "image",
      options: { hotspot: true },
      validation: (rule) => rule.required(),
    }),
    defineField({
      name: "gallery",
      title: "Galerie",
      type: "array",
      of: [{ type: "image", options: { hotspot: true } }],
    }),
    defineField({
      name: "tourUrl",
      title: "URL de la visite (embed)",
      type: "url",
      description: "Lien iframe de la visite 360° (Matterport, Kuula, etc.)",
    }),
    defineField({
      name: "description",
      title: "Description",
      type: "blockContent",
    }),
    defineField({
      name: "featured",
      title: "Mise en avant",
      type: "boolean",
      initialValue: false,
    }),
    defineField({
      name: "publishedAt",
      title: "Date de publication",
      type: "datetime",
    }),
  ],
  preview: {
    select: { title: "title", subtitle: "client", media: "coverImage" },
  },
});
