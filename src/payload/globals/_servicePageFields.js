/**
 * Shared field schema for every service page (Media · Brand · Tech · Ecommerce).
 * Each page global imports this and adds its variant-specific extras.
 */
export const buildServicePageFields = ({ defaultPillarKey, defaultPillarLabel, defaultPillarNum, defaultAccent, defaultPrefix, defaultEnd }) => [
  {
    type: "tabs",
    tabs: [
      {
        name: "hero",
        label: "Hero",
        fields: [
          { name: "pillarLabel", type: "text", defaultValue: defaultPillarLabel, admin: { description: "Eyebrow label, e.g. \"Media Solutions\"." } },
          { name: "pillarNum", type: "text", defaultValue: defaultPillarNum, admin: { description: "Eyebrow number, e.g. \"04\"." } },
          { name: "status", type: "text", defaultValue: "Now accepting Q3 · Q4 2026 engagements" },
          {
            type: "row",
            fields: [
              { name: "headingStart", type: "text", defaultValue: defaultPrefix, admin: { width: "33%" } },
              { name: "headingAccent", type: "text", defaultValue: defaultAccent, admin: { width: "33%", description: "Italic accent word(s)." } },
              { name: "headingEnd", type: "text", defaultValue: defaultEnd, admin: { width: "34%" } },
            ],
          },
          { name: "lede", type: "textarea" },
          {
            name: "stats",
            type: "array",
            labels: { singular: "Stat", plural: "Hero stats" },
            maxRows: 4,
            fields: [
              { name: "num", type: "text", required: true },
              { name: "label", type: "text", required: true },
            ],
          },
          {
            name: "variant",
            type: "select",
            defaultValue: defaultPillarKey,
            options: [
              { label: "Media", value: "media" },
              { label: "Brand", value: "brand" },
              { label: "Tech", value: "tech" },
              { label: "Ecommerce", value: "ecommerce" },
            ],
            admin: { description: "Visual variant — drives which SVG icon renders in the hero." },
          },
        ],
      },
      {
        name: "caps",
        label: "Capabilities",
        fields: [
          {
            type: "row",
            fields: [
              { name: "capsTitle", type: "text", admin: { width: "70%", description: "Heading text, e.g. \"Six channels.\"." } },
              { name: "capsAccent", type: "text", admin: { width: "30%", description: "Italic accent, e.g. \"One scoreboard.\"." } },
            ],
          },
          { name: "capsIntro", type: "textarea" },
          {
            name: "capabilities",
            type: "array",
            labels: { singular: "Capability", plural: "Capabilities" },
            admin: { description: "Each renders as a card on the page." },
            fields: [
              { name: "icon", type: "text", admin: { description: "Short icon glyph, e.g. \"◐\" \"▲\" \"◆\"." } },
              { name: "title", type: "text", required: true },
              { name: "body", type: "textarea" },
              {
                name: "chips",
                type: "array",
                labels: { singular: "Chip", plural: "Chips" },
                fields: [{ name: "label", type: "text", required: true }],
              },
            ],
          },
        ],
      },
      {
        name: "approach",
        label: "Approach",
        fields: [
          { name: "approachSubtitle", type: "text", defaultValue: "The operating system" },
          { name: "approachTitle", type: "text" },
          {
            name: "approachSteps",
            type: "array",
            labels: { singular: "Step", plural: "Approach steps" },
            fields: [
              { name: "title", type: "text", required: true },
              { name: "body", type: "textarea" },
              { name: "icon", type: "text", admin: { description: "Glyph or short icon." } },
            ],
          },
        ],
      },
      {
        name: "footer",
        label: "Voices · CTA",
        fields: [
          { name: "voicesTitle", type: "text", defaultValue: "What clients say." },
          {
            name: "voiceRefs",
            type: "relationship",
            relationTo: "voices",
            hasMany: true,
            admin: { description: "Pick which testimonials show on this page." },
          },
          { name: "ctaEyebrow", type: "text" },
          { name: "ctaHeading", type: "text" },
          { name: "ctaAccent", type: "text" },
        ],
      },
      {
        name: "seo",
        label: "SEO",
        fields: [
          { name: "seoTitle", type: "text" },
          { name: "seoDescription", type: "textarea" },
          { name: "seoOgImage", type: "upload", relationTo: "media" },
        ],
      },
    ],
  },
];
