/**
 * ABOUT PAGE content.
 */
import { revalidate } from "../hooks/revalidate.js";

export const AboutPage = {
  slug: "about-page",
  access: { read: () => true },
  label: "About page",
  admin: {
    group: "Pages",
    description: "About page sections — Hero, Manifesto, Vision block, Values, Timeline, Team, Diversity.",
    preview: () => "/about",
  },
  hooks: { afterChange: [revalidate(["/about"])] },
  fields: [
    {
      type: "tabs",
      tabs: [
        {
          name: "hero",
        label: "Hero",
          fields: [
            { name: "kicker", type: "text", defaultValue: "— About · Epigroww Global" },
            { name: "kickerRight", type: "text", defaultValue: "Est. 2021 · Minority-owned" },
            {
              type: "row",
              fields: [
                { name: "headlinePrefix", type: "text", defaultValue: "We became the agency we wanted to find when we were", admin: { width: "70%" } },
                { name: "headlineAccent", type: "text", defaultValue: "clients.", admin: { width: "30%" } },
              ],
            },
            {
              name: "stats",
              type: "array",
              labels: { singular: "Stat", plural: "Stats" },
              minRows: 3,
              maxRows: 3,
              fields: [
                { name: "num", type: "text", required: true },
                { name: "label", type: "text", required: true },
              ],
            },
            { name: "image", type: "upload", relationTo: "media", admin: { description: "Right-side hero image." } },
            { name: "imageMeta", type: "text", defaultValue: "001 / Studio — Mumbai · 2026" },
          ],
        },
        {
          name: "manifesto",
        label: "Manifesto",
          fields: [
            { name: "label", type: "text", defaultValue: "The mission" },
            {
              name: "principles",
              type: "array",
              labels: { singular: "Principle", plural: "Principles" },
              admin: { description: "Short numbered principles at the top." },
              fields: [
                { name: "num", type: "text", required: true },
                { name: "text", type: "text", required: true },
              ],
            },
            {
              name: "body",
              type: "textarea",
              admin: { description: "The large mission statement — scroll-revealed word by word." },
            },
          ],
        },
        {
          name: "visionBlock",
        label: "Vision block",
          fields: [
            { name: "founderLabel", type: "text", defaultValue: "— Founder · Danish Abbasi" },
            { name: "founderQuote", type: "textarea", admin: { description: "Large quote scroll-revealed." } },
            { name: "founderImage", type: "upload", relationTo: "media" },
            { name: "founderName", type: "text", defaultValue: "Danish Abbasi" },
            { name: "founderRole", type: "text", defaultValue: "Founder & CEO · Since 2021" },
            {
              name: "statCards",
              type: "array",
              labels: { singular: "Stat card", plural: "Stat cards" },
              maxRows: 3,
              fields: [
                { name: "num", type: "text", required: true },
                { name: "label", type: "text", required: true },
                { name: "accent", type: "checkbox", defaultValue: false, admin: { description: "Highlighted (lime) card?" } },
              ],
            },
            {
              name: "tiles",
              type: "array",
              labels: { singular: "Tile", plural: "Tiles" },
              maxRows: 3,
              admin: { description: "Three tiles below the founder quote: The problem / The thesis / The build." },
              fields: [
                { name: "eyebrow", type: "text" },
                { name: "title", type: "text", required: true },
                { name: "body", type: "textarea" },
                { name: "image", type: "upload", relationTo: "media" },
              ],
            },
          ],
        },
        {
          name: "values",
        label: "Values",
          fields: [
            { name: "label", type: "text", defaultValue: "— Values · five of them" },
            {
              type: "row",
              fields: [
                { name: "headingPrefix", type: "text", defaultValue: "What we won't", admin: { width: "50%" } },
                { name: "headingAccent", type: "text", defaultValue: "compromise on.", admin: { width: "50%" } },
              ],
            },
            {
              name: "items",
              type: "array",
              labels: { singular: "Value", plural: "Values" },
              fields: [
                { name: "num", type: "text", required: true },
                { name: "name", type: "text", required: true },
                { name: "tag", type: "text" },
                { name: "body", type: "textarea" },
                { name: "image", type: "upload", relationTo: "media" },
              ],
            },
          ],
        },
        {
          name: "timeline",
        label: "Timeline",
          fields: [
            { name: "label", type: "text", defaultValue: "— Story · 2021 → now" },
            {
              type: "row",
              fields: [
                { name: "headingPrefix", type: "text", defaultValue: "Five years of compounding.", admin: { width: "60%" } },
                { name: "headingAccent", type: "text", defaultValue: "One plan.", admin: { width: "40%" } },
              ],
            },
            {
              name: "milestones",
              type: "array",
              labels: { singular: "Milestone", plural: "Milestones" },
              fields: [
                { name: "year", type: "text", required: true },
                { name: "quarter", type: "text" },
                { name: "heading", type: "text", required: true },
                { name: "body", type: "textarea" },
              ],
            },
          ],
        },
        {
          name: "team",
        label: "Team",
          fields: [
            { name: "label", type: "text", defaultValue: "— The people" },
            {
              name: "intro",
              type: "textarea",
              defaultValue:
                "100+ specialists across four cities. Designers, performance marketers, film-makers, engineers, analysts — who sit on the same Slack channel and care about the same spreadsheet.",
            },
            {
              name: "members",
              type: "array",
              labels: { singular: "Member", plural: "Members" },
              fields: [
                { name: "name", type: "text", required: true },
                { name: "role", type: "text", required: true },
                { name: "city", type: "text" },
                { name: "image", type: "upload", relationTo: "media" },
              ],
            },
            {
              name: "endCardNumber",
              type: "text",
              defaultValue: "+ 94",
              admin: { description: "Big number on the dark \"…and the rest of the team\" tile." },
            },
            {
              name: "endCardBody",
              type: "text",
              defaultValue: "Growing carefully, one hire at a time.",
            },
          ],
        },
        {
          name: "diversity",
        label: "Diversity",
          fields: [
            { name: "label", type: "text", defaultValue: "— Diversity & Inclusion" },
            {
              name: "heading",
              type: "text",
              defaultValue: "A minority-founded, deliberately mixed house.",
            },
            {
              name: "body",
              type: "textarea",
              defaultValue:
                "We built Epigroww on the belief that the best work comes out of rooms that disagree well.",
            },
            {
              name: "metaStats",
              type: "array",
              maxRows: 3,
              fields: [
                { name: "num", type: "text", required: true },
                { name: "label", type: "text", required: true },
              ],
            },
            {
              name: "bars",
              type: "array",
              labels: { singular: "Bar", plural: "Composition bars" },
              fields: [
                { name: "label", type: "text", required: true },
                { name: "pct", type: "number", required: true, admin: { description: "Percentage 0–100." } },
                { name: "colorHex", type: "text" },
              ],
            },
          ],
        },
        {
          name: "footerCtaSeo",
        label: "Footer CTA · SEO",
          fields: [
            { name: "ctaEyebrow", type: "text", defaultValue: "— Join the story" },
            { name: "ctaHeading", type: "text", defaultValue: "Partner with the team quietly building the next global agency." },
            { name: "ctaAccent", type: "text", defaultValue: "next global agency" },
            { name: "seoTitle", type: "text" },
            { name: "seoDescription", type: "textarea" },
            { name: "seoOgImage", type: "upload", relationTo: "media" },
          ],
        },
      ],
    },
  ],
};
