import { type SchemaTypeDefinition } from "sanity";

import { blockContent } from "./blockContent";
import { category } from "./category";
import { faq } from "./faq";
import { feature } from "./feature";
import { franchisee } from "./franchisee";
import { pricingPlan } from "./pricingPlan";
import { siteSettings } from "./siteSettings";
import { testimonial } from "./testimonial";
import { tour } from "./tour";

export const schema: { types: SchemaTypeDefinition[] } = {
  types: [
    siteSettings,
    tour,
    category,
    testimonial,
    pricingPlan,
    feature,
    faq,
    franchisee,
    blockContent,
  ],
};
