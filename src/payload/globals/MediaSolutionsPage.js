import { buildServicePageFields } from "./_servicePageFields.js";
import { revalidate } from "../hooks/revalidate.js";

export const MediaSolutionsPage = {
  slug: "media-solutions-page",
  access: { read: () => true },
  label: "Media Solutions page",
  admin: {
    group: "Pages",
    description: "Media Solutions page (/media-solutions) — paid media, programmatic, OTT, retention.",
    preview: () => "/media-solutions",
  },
  hooks: { afterChange: [revalidate(["/media-solutions"])] },
  fields: [
    ...buildServicePageFields({
      defaultPillarKey: "media",
      defaultPillarLabel: "Media Solutions",
      defaultPillarNum: "04",
      defaultPrefix: "Paid media that",
      defaultAccent: "compounds",
      defaultEnd: "— not just converts.",
    }),
    // Variant-specific extras
    {
      type: "collapsible",
      label: "Channel matrix (Media-only section)",
      admin: { initCollapsed: true },
      fields: [
        { name: "matrixLabel", type: "text", defaultValue: "— Channel matrix" },
        {
          type: "row",
          fields: [
            { name: "matrixHeadingStart", type: "text", admin: { width: "50%", description: "e.g. \"Which channels we plug into,\"." } },
            { name: "matrixHeadingAccent", type: "text", admin: { width: "50%", description: "Italic, e.g. \"and where they earn.\"." } },
          ],
        },
        {
          name: "channels",
          type: "array",
          labels: { singular: "Channel", plural: "Channels" },
          fields: [
            { name: "name", type: "text", required: true },
            {
              name: "funnel",
              type: "select",
              hasMany: true,
              options: ["Awareness", "Consideration", "Conversion", "Retention"].map((v) => ({ label: v, value: v })),
            },
            { name: "strength", type: "number", admin: { description: "0–100 strength score for the bar." } },
          ],
        },
      ],
    },
  ],
};
