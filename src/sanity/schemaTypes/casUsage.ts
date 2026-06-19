import { defineField, defineType } from "sanity";

import { MENU_ICON_OPTIONS } from "./menuIconOptions";

// Taxonomie « Cas d'usage » : tag des visites virtuelles, affiché dans le
// méga-menu « Cas d'usages ».
export const casUsage = defineType({
  name: "casUsage",
  title: "Cas d'usage",
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
    defineField({
      name: "description",
      title: "Description",
      type: "text",
      rows: 2,
      description: "Phrase courte affichée sous le titre dans le méga-menu.",
    }),
    defineField({
      name: "icon",
      title: "Icône",
      type: "string",
      options: { list: MENU_ICON_OPTIONS },
      description: "Icône affichée dans le méga-menu.",
    }),
    defineField({
      name: "order",
      title: "Ordre d'affichage",
      type: "number",
      description: "Trie les cas d'usage dans le méga-menu (croissant).",
    }),
  ],
  orderings: [
    {
      title: "Ordre d'affichage",
      name: "orderAsc",
      by: [{ field: "order", direction: "asc" }],
    },
  ],
  preview: { select: { title: "title", subtitle: "description" } },
});
