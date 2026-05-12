import { buildServicePageFields } from "./_servicePageFields.js";

export const BrandSolutionsPage = {
  slug: "brand-solutions-page",
  access: { read: () => true },
  label: "Brand Solutions page",
  admin: {
    group: "Pages",
    description: "Brand Solutions page (/brand-solutions) — creative suite, films, identity, before/after.",
  },
  fields: [
    ...buildServicePageFields({
      defaultPillarKey: "brand",
      defaultPillarLabel: "Brand Solutions",
      defaultPillarNum: "05",
      defaultPrefix: "From copies to",
      defaultAccent: "blockbuster",
      defaultEnd: "TVC commercials.",
    }),
    // Variant-specific: Creative reel + Before/After
    {
      type: "collapsible",
      label: "Creative reel (Brand-only)",
      admin: { initCollapsed: true },
      fields: [
        { name: "creativeReelLabel", type: "text", defaultValue: "— Recent reel · 002" },
        {
          type: "row",
          fields: [
            { name: "creativeReelHeading", type: "text", admin: { width: "60%", description: "e.g. \"A week's output.\"." } },
            { name: "creativeReelAccent", type: "text", admin: { width: "40%", description: "Italic, e.g. \"Any given Monday.\"." } },
          ],
        },
        { name: "creativeReelIntro", type: "textarea" },
        {
          name: "creativeReelTiles",
          type: "array",
          labels: { singular: "Tile", plural: "Tiles" },
          fields: [
            { name: "type", type: "text", admin: { description: "e.g. \"PERFORMANCE\", \"TVC FILM\"." } },
            { name: "image", type: "upload", relationTo: "media", required: true },
            {
              name: "wide",
              type: "checkbox",
              defaultValue: false,
              admin: { description: "Take 2 columns instead of 1?" },
            },
            {
              name: "tall",
              type: "checkbox",
              defaultValue: false,
              admin: { description: "Take 2 rows?" },
            },
          ],
        },
      ],
    },
    {
      type: "collapsible",
      label: "Before / After slider (Brand-only)",
      admin: { initCollapsed: true },
      fields: [
        { name: "beforeAfterLabel", type: "text", defaultValue: "— Before / After" },
        {
          type: "row",
          fields: [
            { name: "beforeAfterHeadingStart", type: "text", admin: { width: "33%" } },
            { name: "beforeAfterHeadingAccent", type: "text", admin: { width: "33%" } },
            { name: "beforeAfterHeadingEnd", type: "text", admin: { width: "34%" } },
          ],
        },
        { name: "beforeAfterLede", type: "textarea" },
        {
          name: "beforeAfterCases",
          type: "array",
          labels: { singular: "Comparison", plural: "Before/After cases" },
          fields: [
            { name: "client", type: "text", required: true },
            { name: "discipline", type: "text" },
            { name: "beforeImage", type: "upload", relationTo: "media", required: true },
            { name: "afterImage", type: "upload", relationTo: "media", required: true },
            {
              name: "metrics",
              type: "array",
              labels: { singular: "Metric", plural: "Metrics" },
              maxRows: 3,
              fields: [
                { name: "k", type: "text", required: true },
                { name: "label", type: "text", required: true },
              ],
            },
          ],
        },
      ],
    },
  ],
};
