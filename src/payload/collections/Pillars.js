/**
 * The 4 growth pillars: Media, Brand, Tech, AI.
 * Referenced from Home (GrowthEngine orbital + Pillars stack) and
 * surfaced on each service page's hero.
 */
import { revalidate } from "../hooks/revalidate.js";

export const Pillars = {
  slug: "pillars",
  access: { read: () => true },
  hooks: { afterChange: [revalidate(["/"])] },
  admin: {
    useAsTitle: "title",
    group: "Content · Shared",
    description: "The 4 growth pillars (Media · Brand · Tech · AI). Edit titles, taglines, capabilities — they appear in the Growth Engine orbital and individual service pages.",
    defaultColumns: ["num", "title", "tagline"],
  },
  fields: [
    {
      name: "num",
      type: "text",
      required: true,
      admin: { description: "Display number, e.g. \"01\" \"02\" \"03\" \"04\"." },
    },
    {
      name: "key",
      type: "select",
      required: true,
      options: [
        { label: "Media", value: "media" },
        { label: "Brand", value: "brand" },
        { label: "Tech", value: "tech" },
        { label: "AI", value: "ai" },
      ],
      admin: { description: "Pillar key — controls which orbit-position and route this maps to." },
    },
    { name: "title", type: "text", required: true, admin: { description: "Short title shown in admin and large in orbital, e.g. \"Media\"." } },
    { name: "tagline", type: "text", admin: { description: "Short tagline, e.g. \"Precision in every impression.\"" } },
    {
      name: "shortSub",
      type: "text",
      admin: { description: "Hover-state subtitle in the Growth Engine center, e.g. \"The spend.\"" },
    },
    {
      name: "description",
      type: "textarea",
      admin: { description: "1–2 sentence pillar description for the orbital detail panel." },
    },
    {
      name: "capabilities",
      type: "array",
      labels: { singular: "Capability tag", plural: "Capability tags" },
      admin: { description: "Short bullet tags shown as chips, e.g. \"Performance\", \"Programmatic\"." },
      fields: [{ name: "label", type: "text", required: true }],
    },
    {
      name: "image",
      type: "upload",
      relationTo: "media",
      admin: { description: "Hero image for the pillar card on Home." },
    },
    {
      name: "accentHex",
      type: "text",
      admin: { description: "Optional accent override (hex) used for the pillar's hover bar. Leave empty to use the brand accent." },
    },
    {
      name: "href",
      type: "text",
      admin: { description: "Internal route this pillar links to, e.g. \"/media-solutions\"." },
    },
    {
      name: "order",
      type: "number",
      defaultValue: 0,
      admin: { description: "Lower numbers appear first. Use 1, 2, 3, 4." },
    },
  ],
};
