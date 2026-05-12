/**
 * Client testimonials. Used on Home (Voices carousel) and each service page.
 */
import { revalidate } from "../hooks/revalidate.js";

export const Voices = {
  slug: "voices",
  access: { read: () => true },
  hooks: {
    afterChange: [
      revalidate(["/", "/media-solutions", "/brand-solutions", "/tech-solutions", "/ecommerce-solutions"]),
    ],
  },
  admin: {
    useAsTitle: "name",
    group: "Content · Shared",
    description: "Client testimonials. Pick which testimonial appears on which page via the visibility flags.",
    defaultColumns: ["name", "role", "tag", "showOnHome"],
  },
  fields: [
    { name: "quote", type: "textarea", required: true, admin: { description: "The testimonial quote." } },
    { name: "name", type: "text", required: true, admin: { description: "Speaker name." } },
    { name: "role", type: "text", admin: { description: "Speaker role + company, e.g. \"CEO · JK Lifestyle\"." } },
    { name: "tag", type: "text", admin: { description: "Short context label, e.g. \"Brand + Media partner\" or \"D2C · Beauty\"." } },
    {
      name: "image",
      type: "upload",
      relationTo: "media",
      admin: { description: "Optional headshot." },
    },
    {
      type: "row",
      fields: [
        { name: "showOnHome", type: "checkbox", defaultValue: false, admin: { width: "20%", description: "Home Voices" } },
        { name: "showOnMedia", type: "checkbox", defaultValue: false, admin: { width: "20%", description: "Media page" } },
        { name: "showOnBrand", type: "checkbox", defaultValue: false, admin: { width: "20%", description: "Brand page" } },
        { name: "showOnTech", type: "checkbox", defaultValue: false, admin: { width: "20%", description: "Tech page" } },
        { name: "showOnEcommerce", type: "checkbox", defaultValue: false, admin: { width: "20%", description: "Ecommerce page" } },
      ],
    },
    { name: "order", type: "number", defaultValue: 0, admin: { description: "Lower numbers appear first within each page." } },
  ],
};
