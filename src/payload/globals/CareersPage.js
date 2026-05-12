/**
 * CAREERS PAGE content. Open roles live in the OpenRoles collection.
 */
export const CareersPage = {
  slug: "careers-page",
  access: { read: () => true },
  label: "Careers page",
  admin: {
    group: "Pages",
    description: "Careers page (/careers). Open roles live in their own collection — edit those separately.",
  },
  fields: [
    {
      type: "tabs",
      tabs: [
        {
          name: "hero",
        label: "Hero",
          fields: [
            { name: "kickerLeft", type: "text", defaultValue: "07 · Careers at Epigroww" },
            { name: "kickerRight", type: "text", defaultValue: "12 open roles", admin: { description: "Auto-calculated from active OpenRoles count. This is a fallback if empty." } },
            {
              type: "row",
              fields: [
                { name: "headingPrefix", type: "text", defaultValue: "Build an", admin: { width: "33%" } },
                { name: "headingAccent", type: "text", defaultValue: "empire", admin: { width: "33%" } },
                { name: "headingSuffix", type: "text", defaultValue: ". Not just a ladder.", admin: { width: "34%" } },
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
            {
              name: "tags",
              type: "array",
              labels: { singular: "Tag", plural: "Hero tags" },
              admin: { description: "Pill-shaped culture tags below the stats." },
              fields: [{ name: "label", type: "text", required: true }],
            },
          ],
        },
        {
          name: "culture",
        label: "Culture",
          fields: [
            { name: "label", type: "text", defaultValue: "— The culture" },
            { name: "statement", type: "textarea", admin: { description: "Scroll-revealed mission statement." } },
            {
              name: "pillars",
              type: "array",
              labels: { singular: "Pillar", plural: "Culture pillars" },
              fields: [
                { name: "k", type: "text", required: true, admin: { description: "Number, e.g. \"01\"." } },
                { name: "title", type: "text", required: true },
                { name: "body", type: "textarea" },
              ],
            },
          ],
        },
        {
          name: "lifeAtEpigroww",
        label: "Life at Epigroww",
          fields: [
            { name: "label", type: "text", defaultValue: "— Life at Epigroww" },
            {
              type: "row",
              fields: [
                { name: "headingPrefix", type: "text", admin: { width: "60%" } },
                { name: "headingAccent", type: "text", admin: { width: "40%" } },
              ],
            },
            { name: "intro", type: "textarea" },
            {
              name: "gallery",
              type: "array",
              labels: { singular: "Photo", plural: "Photos" },
              fields: [
                { name: "image", type: "upload", relationTo: "media", required: true },
                { name: "caption", type: "text" },
                { name: "wide", type: "checkbox", defaultValue: false, admin: { description: "Span 2 columns?" } },
              ],
            },
          ],
        },
        {
          name: "benefits",
        label: "Benefits",
          fields: [
            { name: "label", type: "text", defaultValue: "— Perks & benefits" },
            {
              type: "row",
              fields: [
                { name: "headingPrefix", type: "text", admin: { width: "50%" } },
                { name: "headingAccent", type: "text", admin: { width: "50%" } },
              ],
            },
            {
              name: "items",
              type: "array",
              labels: { singular: "Benefit", plural: "Benefits" },
              fields: [
                { name: "k", type: "text", required: true, admin: { description: "Number, e.g. \"01\"." } },
                { name: "icon", type: "text", admin: { description: "Short glyph, e.g. \"✚\"." } },
                { name: "title", type: "text", required: true },
                { name: "body", type: "textarea" },
              ],
            },
          ],
        },
        {
          name: "openRolesSection",
        label: "Open roles section",
          fields: [
            { name: "label", type: "text", defaultValue: "— Open roles" },
            {
              type: "row",
              fields: [
                { name: "headingPrefix", type: "text", admin: { width: "50%", description: "e.g. \"12 current openings.\"." } },
                { name: "headingAccent", type: "text", admin: { width: "50%", description: "italic, e.g. \"Find yours.\"." } },
              ],
            },
          ],
        },
        {
          name: "applyBar",
        label: "Apply bar",
          fields: [
            { name: "label", type: "text", defaultValue: "— Don't see your role?" },
            {
              type: "row",
              fields: [
                { name: "headingPrefix", type: "text", admin: { width: "33%" } },
                { name: "headingAccent", type: "text", admin: { width: "33%" } },
                { name: "headingSuffix", type: "text", admin: { width: "34%" } },
              ],
            },
            { name: "body", type: "textarea" },
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
  ],
};
