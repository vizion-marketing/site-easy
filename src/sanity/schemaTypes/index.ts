import { type SchemaTypeDefinition } from "sanity";

import { aPropos } from "./aPropos";
import { blockContent } from "./blockContent";
import { casUsage } from "./casUsage";
import { faq } from "./faq";
import { feature } from "./feature";
import { franchisee } from "./franchisee";
import { pricingPlan } from "./pricingPlan";
import { secteur } from "./secteur";
import { siteSettings } from "./siteSettings";
import { testimonial } from "./testimonial";
import { tour } from "./tour";

export const schema: { types: SchemaTypeDefinition[] } = {
  types: [
    siteSettings,
    aPropos,
    tour,
    secteur,
    casUsage,
    testimonial,
    pricingPlan,
    feature,
    faq,
    franchisee,
    blockContent,
  ],
};
