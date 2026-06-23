import { defineField, defineType } from "sanity";

export const franchisee = defineType({
  name: "franchisee",
  title: "Franchisé",
  type: "document",
  groups: [
    { name: "identite", title: "Identité", default: true },
    { name: "localisation", title: "Localisation" },
    { name: "vitrine", title: "Vitrine & avis" },
  ],
  fields: [
    defineField({
      name: "prenom",
      title: "Prénom",
      type: "string",
      group: "identite",
      validation: (rule) => rule.required(),
    }),
    defineField({
      name: "nom",
      title: "Nom",
      type: "string",
      group: "identite",
      validation: (rule) => rule.required(),
    }),
    defineField({
      name: "zone",
      title: "Zone",
      type: "string",
      group: "localisation",
      description: "Zone géographique couverte (ex. Île-de-France, Lyon, PACA…)",
      validation: (rule) => rule.required(),
    }),
    // --- Localisation (sert au calcul « franchisé le plus proche ») ---
    defineField({
      name: "ville",
      title: "Ville",
      type: "string",
      group: "localisation",
      description:
        "Ville de rattachement. Sert à placer le franchisé sur la carte et à le proposer aux visiteurs proches.",
    }),
    defineField({
      name: "codePostal",
      title: "Code postal",
      type: "string",
      group: "localisation",
      validation: (rule) =>
        rule
          .regex(/^\d{5}$/, { name: "code postal" })
          .warning("Code postal français à 5 chiffres attendu."),
    }),
    defineField({
      name: "adresse",
      title: "Adresse (optionnel)",
      type: "string",
      group: "localisation",
      description:
        "Numéro et rue, pour une localisation plus précise. Ville + code postal suffisent sinon.",
    }),
    defineField({
      name: "photo",
      title: "Photo",
      type: "image",
      group: "identite",
      options: { hotspot: true },
    }),
    defineField({
      name: "pageLink",
      title: "Lien de la page (landing page)",
      type: "url",
      group: "identite",
      description: "Lien vers la landing page du franchisé",
    }),
    // --- Vitrine du store locator (encart sur la photo) ---
    defineField({
      name: "description",
      title: "Description",
      type: "text",
      rows: 3,
      group: "vitrine",
      description: "Présentation courte affichée dans l'encart du store locator (2 lignes visibles).",
    }),
    defineField({
      name: "noteGoogle",
      title: "Note Google",
      type: "number",
      group: "vitrine",
      description: "Note moyenne Google sur 5 (ex. 4.9).",
      validation: (rule) => rule.min(0).max(5),
    }),
    defineField({
      name: "avisGoogle",
      title: "Nombre d'avis Google",
      type: "number",
      group: "vitrine",
      validation: (rule) => rule.min(0).integer(),
    }),
    defineField({
      name: "ficheGoogle",
      title: "Fiche Google My Business",
      type: "url",
      group: "vitrine",
      description: "Lien vers la fiche Google (Google My Business / Google Maps).",
    }),
    defineField({
      name: "reseaux",
      title: "Réseaux sociaux",
      type: "array",
      group: "vitrine",
      of: [
        {
          type: "object",
          name: "reseau",
          fields: [
            {
              name: "plateforme",
              title: "Plateforme",
              type: "string",
              options: {
                list: [
                  { title: "Instagram", value: "instagram" },
                  { title: "LinkedIn", value: "linkedin" },
                  { title: "Facebook", value: "facebook" },
                ],
              },
              validation: (rule: { required: () => unknown }) => rule.required(),
            },
            {
              name: "url",
              title: "Lien",
              type: "url",
              validation: (rule: { required: () => unknown }) => rule.required(),
            },
          ],
          preview: { select: { title: "plateforme", subtitle: "url" } },
        },
      ],
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
