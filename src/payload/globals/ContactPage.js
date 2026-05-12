/**
 * CONTACT PAGE content. Offices live in their own collection,
 * FAQs live in the FAQs collection scoped to page=contact.
 */
export const ContactPage = {
  slug: "contact-page",
  access: { read: () => true },
  label: "Contact page",
  admin: {
    group: "Pages",
    description: "Contact page (/contact). Offices and FAQs live in their own collections.",
  },
  fields: [
    {
      type: "tabs",
      tabs: [
        {
          name: "hero",
        label: "Hero",
          fields: [
            { name: "kickerLeft", type: "text", defaultValue: "08 · Contact" },
            { name: "kickerRight", type: "text", defaultValue: "Reply in under 24 hours" },
            {
              type: "row",
              fields: [
                { name: "headingPrefix", type: "text", defaultValue: "You made it", admin: { width: "40%" } },
                { name: "headingAccent", type: "text", defaultValue: "all the way", admin: { width: "30%" } },
                { name: "headingSuffix", type: "text", defaultValue: "here.", admin: { width: "30%" } },
              ],
            },
            { name: "sub", type: "textarea", defaultValue: "Four studios, one inbox. If you've got a brief — a vague one, a specific one, a three-hundred-million one — we'd love to read it." },
          ],
        },
        {
          name: "directLines",
        label: "Direct lines",
          fields: [
            { name: "label", type: "text", defaultValue: "— Direct lines" },
            { name: "noteText", type: "textarea", defaultValue: "Most briefs get a human reply within 24 hours. Serious ones, within 4 hours of Delhi / Dubai business hours." },
          ],
        },
        {
          name: "briefForm",
        label: "Brief form",
          fields: [
            {
              name: "topics",
              type: "array",
              labels: { singular: "Topic", plural: "Form topics" },
              admin: { description: "Topic chips in step 1 of the brief form." },
              fields: [
                { name: "value", type: "text", required: true },
                { name: "label", type: "text", required: true },
                { name: "blurb", type: "text" },
              ],
            },
            {
              name: "budgets",
              type: "array",
              labels: { singular: "Budget", plural: "Budget chips" },
              admin: { description: "Budget chips in step 3." },
              fields: [{ name: "label", type: "text", required: true }],
            },
            { name: "thanksHeading", type: "text", defaultValue: "Brief received." },
            { name: "thanksBody", type: "textarea", defaultValue: "A human — not an auto-responder — will read this and reply within 24 hours." },
          ],
        },
        {
          name: "officesSection",
        label: "Offices section",
          fields: [
            { name: "label", type: "text", defaultValue: "— Four studios" },
            {
              type: "row",
              fields: [
                { name: "headingPrefix", type: "text", admin: { width: "60%" } },
                { name: "headingAccent", type: "text", admin: { width: "40%" } },
              ],
            },
          ],
        },
        {
          name: "faqSection",
        label: "FAQ section",
          fields: [
            { name: "label", type: "text", defaultValue: "— Quick answers" },
            { name: "heading", type: "text", defaultValue: "Before you send the brief." },
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
