import { defineField, defineType } from "sanity";

export const franchisee = defineType({
  name: "franchisee",
  title: "Franchisé",
  type: "document",
  fields: [
    defineField({
      name: "prenom",
      title: "Prénom",
      type: "string",
      validation: (rule) => rule.required(),
    }),
    defineField({
      name: "nom",
      title: "Nom",
      type: "string",
      validation: (rule) => rule.required(),
    }),
    defineField({
      name: "zone",
      title: "Zone",
      type: "string",
      description: "Zone géographique couverte (ex. Île-de-France, Lyon, PACA…)",
      validation: (rule) => rule.required(),
    }),
    defineField({
      name: "photo",
      title: "Photo",
      type: "image",
      options: { hotspot: true },
    }),
    defineField({
      name: "pageLink",
      title: "Lien de la page",
      type: "url",
      description: "Lien vers la page du franchisé",
    }),
  ],
  preview: {
    select: { prenom: "prenom", nom: "nom", zone: "zone", media: "photo" },
    prepare({ prenom, nom, zone, media }) {
      return {
        title: [prenom, nom].filter(Boolean).join(" "),
        subtitle: zone,
        media,
      };
    },
  },
});
