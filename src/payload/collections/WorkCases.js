/**
 * Case studies. Each one is a client outcome shown on the Work page,
 * featured cases on the Home page, and metric tiles on /work's ResultsBand.
 */
import { revalidate } from "../hooks/revalidate.js";

export const WorkCases = {
  slug: "work-cases",
  access: { read: () => true },
  hooks: { afterChange: [revalidate(["/", "/work"])] },
  admin: {
    useAsTitle: "client",
    group: "Content · Shared",
    description: "Case studies / portfolio entries. Used by Work page grid, Home page featured strip, and the Results band.",
    defaultColumns: ["client", "project", "category", "year", "featured"],
  },
  fields: [
    { name: "client", type: "text", required: true, admin: { description: "Client name, e.g. \"JK Lifestyle — Infinity\"." } },
    { name: "project", type: "text", required: true, admin: { description: "Project title, e.g. \"Launch film + creative suite\"." } },
    {
      name: "category",
      type: "select",
      required: true,
      options: [
        { label: "Brand", value: "brand" },
        { label: "Media", value: "media" },
        { label: "Tech", value: "tech" },
        { label: "AI", value: "ai" },
        { label: "Ecommerce", value: "ecommerce" },
      ],
      admin: { description: "Discipline category — controls filter buckets on the Work page." },
    },
    { name: "tag", type: "text", admin: { description: "One-word context tag, e.g. \"Launch\", \"Retention\", \"D2C\"." } },
    {
      name: "services",
      type: "array",
      labels: { singular: "Service", plural: "Services" },
      admin: { description: "Disciplines applied, shown as chips on the case card." },
      fields: [{ name: "label", type: "text", required: true }],
    },
    {
      name: "outcome",
      type: "text",
      admin: { description: "Headline result, e.g. \"3.4× ROAS · 1.2M first-week views\"." },
    },
    {
      name: "year",
      type: "text",
      admin: { description: "Year (or year/quarter) the engagement happened, e.g. \"2025\"." },
    },
    {
      name: "image",
      type: "upload",
      relationTo: "media",
      admin: { description: "Hero image for the case tile. Leave empty to fall back to imageUrl." },
    },
    {
      name: "imageUrl",
      type: "text",
      admin: { description: "External image URL (Unsplash, Pexels, etc.) — used when no Media upload is set." },
    },
    {
      name: "size",
      type: "select",
      defaultValue: "md",
      options: [
        { label: "Medium (default)", value: "md" },
        { label: "Large (hero feature)", value: "lg" },
      ],
      admin: { description: "Bento-grid sizing on the Work page." },
    },
    {
      name: "color",
      type: "text",
      admin: { description: "Background color for the case card on Home featured strip. Hex, e.g. \"#1e3a2f\"." },
    },
    {
      name: "featuredOnHome",
      type: "checkbox",
      defaultValue: false,
      admin: { description: "Show in the Home page horizontal-scroll Featured Work strip." },
    },
    {
      name: "resultsBandKpi",
      type: "text",
      admin: { description: "Big-number KPI shown on /work ResultsBand. Leave empty to skip. Example: \"3.4×\"." },
    },
    {
      name: "resultsBandLabel",
      type: "text",
      admin: { description: "Label under the big number, e.g. \"Launch ROAS · JK Lifestyle Infinity\"." },
    },
    {
      name: "order",
      type: "number",
      defaultValue: 0,
      admin: { description: "Lower numbers appear first." },
    },
  ],
};
