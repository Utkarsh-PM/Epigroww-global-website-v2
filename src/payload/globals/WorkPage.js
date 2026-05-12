/**
 * WORK PAGE content. Most data lives in the WorkCases + Industries collections —
 * this global only holds copy and the order of sections.
 */
export const WorkPage = {
  slug: "work-page",
  access: { read: () => true },
  label: "Work page",
  admin: {
    group: "Pages",
    description: "The Work / Portfolio page. Add or edit individual case studies in the Work cases collection; tweak headlines here.",
  },
  fields: [
    {
      type: "tabs",
      tabs: [
        {
          name: "hero",
        label: "Hero",
          fields: [
            { name: "kickerLeft", type: "text", defaultValue: "03 · Work" },
            { name: "kickerRight", type: "text", defaultValue: "2021 → 2026 · Selected" },
            {
              type: "row",
              fields: [
                { name: "headingPrefix", type: "text", defaultValue: "Five years.", admin: { width: "33%" } },
                { name: "headingAccent", type: "text", defaultValue: "Five hundred", admin: { width: "33%" } },
                { name: "headingSuffix", type: "text", defaultValue: "brands.", admin: { width: "34%" } },
              ],
            },
            { name: "lede", type: "textarea" },
            {
              name: "heroStats",
              type: "array",
              labels: { singular: "Stat", plural: "Hero stats" },
              maxRows: 4,
              fields: [
                { name: "num", type: "text", required: true },
                { name: "label", type: "text", required: true },
              ],
            },
          ],
        },
        {
          name: "resultsBand",
        label: "Results band",
          fields: [
            { name: "label", type: "text", defaultValue: "— Proof · selected wins" },
            {
              type: "row",
              fields: [
                { name: "headingPrefix", type: "text", admin: { width: "33%", description: "e.g. \"Nine results\"." } },
                { name: "headingAccent", type: "text", admin: { width: "33%", description: "italic accent" } },
                { name: "headingSuffix", type: "text", admin: { width: "34%" } },
              ],
            },
            { name: "footerNote", type: "text", defaultValue: "Live scorecards · updated weekly with every client" },
            {
              type: "group",
              name: "endCard",
              fields: [
                { name: "label", type: "text", defaultValue: "+ 491 more" },
                { name: "sub", type: "text", defaultValue: "under NDA — ask for the deck" },
              ],
            },
          ],
        },
        {
          name: "caseGrid",
        label: "Case grid",
          fields: [
            { name: "label", type: "text", defaultValue: "— Selected work" },
            {
              name: "caseRefs",
              type: "relationship",
              relationTo: "work-cases",
              hasMany: true,
              admin: { description: "Pick which case studies appear on /work. Order honors the WorkCases collection's `order` field." },
            },
          ],
        },
        {
          name: "industryBand",
        label: "Industry band",
          fields: [
            { name: "topLabel", type: "text", defaultValue: "— 40+ industries served" },
            { name: "topRight", type: "text", defaultValue: "Brand + Media + Tech" },
            { name: "footerLine", type: "text", defaultValue: "And counting. If your category isn't here, we've probably built adjacent muscle — ask." },
          ],
        },
        {
          name: "footerCtaSeo",
        label: "Footer CTA · SEO",
          fields: [
            { name: "ctaEyebrow", type: "text", defaultValue: "— More in the vault" },
            { name: "ctaHeading", type: "text", defaultValue: "The juicy stuff lives in the deck. Ask for it." },
            { name: "ctaAccent", type: "text", defaultValue: "the juicy stuff" },
            { name: "ctaText", type: "text", defaultValue: "Request the case book" },
            { name: "ctaHref", type: "text", defaultValue: "/contact" },
            { name: "seoTitle", type: "text" },
            { name: "seoDescription", type: "textarea" },
            { name: "seoOgImage", type: "upload", relationTo: "media" },
          ],
        },
      ],
    },
  ],
};
