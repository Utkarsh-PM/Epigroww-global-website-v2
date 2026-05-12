import { buildServicePageFields } from "./_servicePageFields.js";
import { revalidate } from "../hooks/revalidate.js";

/**
 * Ecommerce Solutions — the page your senior added in commit 1cc4d79.
 * Mirrors the shared service-page shape; add ecom-specific blocks later
 * if any unique sections show up on the current /ecommerce-solutions.
 */
export const EcommerceSolutionsPage = {
  slug: "ecommerce-solutions-page",
  access: { read: () => true },
  label: "Ecommerce Solutions page",
  admin: {
    group: "Pages",
    description: "Ecommerce Solutions page (/ecommerce-solutions) — D2C launches, Shopify, marketplaces.",
    preview: () => "/ecommerce-solutions",
  },
  hooks: { afterChange: [revalidate(["/ecommerce-solutions"])] },
  fields: buildServicePageFields({
    defaultPillarKey: "ecommerce",
    defaultPillarLabel: "Ecommerce Solutions",
    defaultPillarNum: "07",
    defaultPrefix: "Commerce that",
    defaultAccent: "scales",
    defaultEnd: "— from one store to twenty.",
  }),
};
