import { defineField, defineType } from "sanity";

// Singleton « Qui sommes nous » (section À propos de la home).
// Reprend le layout carte de la maquette : portrait + nom (badge vérifié) +
// rôle + description + CTA + petites cartes d'infos en bas.
export const aPropos = defineType({
  name: "aPropos",
  title: "Qui sommes nous",
  type: "document",
  fields: [
    defineField({
      name: "eyebrow",
      title: "Sur-titre (eyebrow)",
      type: "string",
      initialValue: "à propos",
    }),
    defineField({
      name: "heading",
      title: "Titre de section",
      type: "string",
      description:
        "Gros titre affiché à droite. Entourer un fragment d'astérisques pour le mettre en orange italique (ex. « Qui *sommes*-nous »).",
      initialValue: "Qui sommes nous",
    }),
    defineField({
      name: "name",
      title: "Nom affiché",
      type: "string",
      description: "Nom mis en avant (personne ou marque), à côté du badge vérifié.",
      validation: (rule) => rule.required(),
    }),
    defineField({
      name: "verified",
      title: "Badge vérifié",
      type: "boolean",
      description: "Affiche la pastille de vérification à côté du nom.",
      initialValue: true,
    }),
    defineField({
      name: "role",
      title: "Rôle / sous-titre",
      type: "string",
      description: "Affiché sous le nom (ex. « Fondateur », « L'équipe easyvirtual.tours »).",
    }),
    defineField({
      name: "bio",
      title: "Description",
      type: "text",
      rows: 5,
      validation: (rule) => rule.required(),
    }),
    defineField({
      name: "portrait",
      title: "Portrait / photo",
      type: "image",
      options: { hotspot: true },
    }),
    defineField({
      name: "ctaLabel",
      title: "Libellé du bouton",
      type: "string",
      initialValue: "Contactez-nous",
    }),
    defineField({
      name: "ctaHref",
      title: "Lien du bouton",
      type: "string",
    }),
    defineField({
      name: "facts",
      title: "Cartes d'infos",
      description: "Petites cartes en bas du bloc (ex. « Visites réalisées », « Localisation »).",
      type: "array",
      validation: (rule) => rule.max(4),
      of: [
        defineField({
          name: "fact",
          title: "Info",
          type: "object",
          fields: [
            defineField({
              name: "icon",
              title: "Icône",
              type: "string",
              options: {
                list: [
                  { title: "Document / Licence", value: "document" },
                  { title: "Localisation", value: "location" },
                  { title: "Calendrier / Ancienneté", value: "calendar" },
                  { title: "Étoile / Note", value: "star" },
                  { title: "Caméra 360°", value: "camera" },
                  { title: "Utilisateurs / Équipe", value: "users" },
                ],
              },
            }),
            defineField({ name: "label", title: "Libellé", type: "string" }),
            defineField({ name: "value", title: "Valeur", type: "string" }),
          ],
          preview: { select: { title: "value", subtitle: "label" } },
        }),
      ],
    }),
  ],
  preview: {
    prepare: () => ({ title: "Qui sommes nous" }),
  },
});
