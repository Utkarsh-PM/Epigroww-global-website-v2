/**
 * Open job listings. Shown on the Careers page.
 */
import { revalidate } from "../hooks/revalidate.js";

export const OpenRoles = {
  slug: "open-roles",
  access: { read: () => true },
  hooks: { afterChange: [revalidate(["/careers"])] },
  admin: {
    useAsTitle: "title",
    group: "Content · Careers",
    description: "Open job postings. Filter dropdowns on /careers populate from the `dept` field.",
    defaultColumns: ["title", "dept", "loc", "type", "active"],
  },
  fields: [
    { name: "title", type: "text", required: true, admin: { description: "Job title, e.g. \"Senior Performance Marketing Specialist\"." } },
    {
      name: "dept",
      type: "select",
      required: true,
      options: [
        { label: "Media", value: "Media" },
        { label: "Brand", value: "Brand" },
        { label: "Tech", value: "Tech" },
        { label: "AI", value: "AI" },
        { label: "Operations", value: "Operations" },
      ],
    },
    { name: "loc", type: "text", admin: { description: "Location, e.g. \"Delhi · Remote OK\"." } },
    {
      name: "type",
      type: "select",
      defaultValue: "Full-time",
      options: ["Full-time", "Part-time", "Contract", "Internship"].map((v) => ({ label: v, value: v })),
    },
    {
      name: "applyUrl",
      type: "text",
      admin: { description: "External application link or internal anchor. Defaults to \"#apply\" if empty." },
    },
    {
      name: "description",
      type: "richText",
      admin: { description: "Optional detailed JD — shown on the role's detail view (future)." },
    },
    {
      name: "active",
      type: "checkbox",
      defaultValue: true,
      admin: { description: "Uncheck to hide this role from the site without deleting it." },
    },
    { name: "order", type: "number", defaultValue: 0 },
  ],
};
