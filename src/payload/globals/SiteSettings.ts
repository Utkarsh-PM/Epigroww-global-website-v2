import type { GlobalConfig } from "payload";

/**
 * Site-wide settings: brand, contact, social.
 * Edited at /admin/globals/site-settings. Read by every page.
 */
export const SiteSettings: GlobalConfig = {
  slug: "site-settings",
  label: "Site settings",
  admin: {
    group: "Brand & Site",
    description: "Brand colors, fonts, motion, contact details — applies site-wide.",
  },
  fields: [
    {
      type: "tabs",
      tabs: [
        {
          label: "Brand",
          fields: [
            {
              name: "logo",
              type: "upload",
              relationTo: "media",
              admin: { description: "Logo PNG/SVG — shown in nav and footer." },
            },
            {
              name: "favicon",
              type: "upload",
              relationTo: "media",
              admin: { description: "Favicon for browser tabs." },
            },
            {
              type: "group",
              name: "colors",
              label: "Colors",
              fields: [
                {
                  name: "accent",
                  type: "text",
                  defaultValue: "#E3E65D",
                  admin: { description: "Primary brand accent (hex). Used on CTAs, highlights." },
                },
                {
                  name: "accent2",
                  type: "text",
                  defaultValue: "#CFDE54",
                  admin: { description: "Secondary accent (hex). Used on Get Quote button." },
                },
                {
                  name: "ink",
                  type: "text",
                  defaultValue: "#F0F0F0",
                  admin: { description: "Primary text color (dark theme)." },
                },
                {
                  name: "bg",
                  type: "text",
                  defaultValue: "#141730",
                  admin: { description: "Primary background (dark theme)." },
                },
              ],
            },
            {
              name: "fontDisplay",
              type: "select",
              defaultValue: "Inter",
              options: [
                "Inter",
                "Cabinet Grotesk",
                "Clash Display",
                "Satoshi",
                "Geist",
                "Plus Jakarta Sans",
              ].map((f) => ({ label: f, value: f })),
              admin: { description: "Display font (headings, hero). Pick from the curated list." },
            },
            {
              name: "motion",
              type: "select",
              defaultValue: "standard",
              options: [
                { label: "Standard (default)", value: "standard" },
                { label: "Subtle (smaller motion)", value: "subtle" },
                { label: "Off (no animation, for accessibility)", value: "off" },
              ],
              admin: { description: "Site-wide motion intensity." },
            },
          ],
        },
        {
          label: "Contact",
          fields: [
            { name: "email", type: "email", defaultValue: "hello@epigrowwglobal.com" },
            { name: "phone", type: "text", defaultValue: "+91 98765 43210" },
            { name: "partnershipsEmail", type: "email" },
            { name: "pressEmail", type: "email" },
          ],
        },
        {
          label: "Social",
          fields: [
            { name: "linkedin", type: "text" },
            { name: "instagram", type: "text" },
            { name: "facebook", type: "text" },
            { name: "twitter", type: "text" },
          ],
        },
        {
          label: "SEO",
          fields: [
            {
              name: "defaultTitle",
              type: "text",
              defaultValue: "Epigroww Global — Growth. Engineered Globally.",
            },
            {
              name: "defaultDescription",
              type: "textarea",
              defaultValue:
                "Epigroww Global is an integrated growth partner operating at the intersection of brand, media, and technology. 500+ clients across 40+ industries, delivered from Delhi, Mumbai, Dubai & Toronto.",
            },
            {
              name: "ogImage",
              type: "upload",
              relationTo: "media",
              admin: { description: "Default Open Graph image (1200×630)." },
            },
          ],
        },
      ],
    },
  ],
};
