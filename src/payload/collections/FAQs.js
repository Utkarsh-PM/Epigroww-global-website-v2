/**
 * FAQs. Currently shown on the Contact page; can be tagged for other pages.
 */
export const FAQs = {
  slug: "faqs",
  access: { read: () => true },
  admin: {
    useAsTitle: "question",
    group: "Content · Shared",
    description: "Frequently asked questions. Use the page tag to choose which page surfaces this entry.",
    defaultColumns: ["question", "page", "order"],
  },
  fields: [
    { name: "question", type: "text", required: true },
    { name: "answer", type: "textarea", required: true },
    {
      name: "page",
      type: "select",
      defaultValue: "contact",
      options: [
        { label: "Contact", value: "contact" },
        { label: "Careers", value: "careers" },
        { label: "Home", value: "home" },
      ],
    },
    { name: "order", type: "number", defaultValue: 0 },
  ],
};
