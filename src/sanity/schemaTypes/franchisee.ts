import { defineField, defineType } from "sanity";

export const franchisee = defineType({
  name: "franchisee",
  title: "Franchisé",
  type: "document",
  groups: [
    { name: "identite", title: "Identité", default: true },
    { name: "localisation", title: "Localisation" },
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
      title: "Lien de la page",
      type: "url",
      group: "identite",
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
