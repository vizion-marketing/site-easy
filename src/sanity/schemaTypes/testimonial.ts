import { defineField, defineType } from "sanity";

export const testimonial = defineType({
  name: "testimonial",
  title: "Témoignage",
  type: "document",
  fields: [
    defineField({
      name: "quote",
      title: "Citation",
      type: "text",
      rows: 4,
      validation: (rule) => rule.required(),
    }),
    defineField({
      name: "author",
      title: "Auteur",
      type: "string",
      validation: (rule) => rule.required(),
    }),
    defineField({ name: "role", title: "Fonction", type: "string" }),
    defineField({ name: "company", title: "Entreprise", type: "string" }),
    defineField({
      name: "agency",
      title: "Agence (franchise easyvirtual.tours)",
      description: "Agence du réseau à laquelle l'avis Google est rattaché.",
      type: "string",
    }),
    defineField({
      name: "avatar",
      title: "Photo",
      type: "image",
      options: { hotspot: true },
    }),
    defineField({
      name: "rating",
      title: "Note (1-5)",
      type: "number",
      validation: (rule) => rule.min(1).max(5),
      initialValue: 5,
    }),
  ],
  preview: {
    select: { title: "author", subtitle: "company", media: "avatar" },
  },
});
