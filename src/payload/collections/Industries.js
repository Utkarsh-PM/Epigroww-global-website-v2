/**
 * Industries served. Used on the Work page's marquee bands.
 */
import { revalidate } from "../hooks/revalidate.js";

export const Industries = {
  slug: "industries",
  access: { read: () => true },
  hooks: { afterChange: [revalidate(["/work"])] },
  admin: {
    useAsTitle: "name",
    group: "Content · Shared",
    description: "Industries served — populates the Work page's scrolling industry marquees.",
    defaultColumns: ["name", "band", "order"],
  },
  fields: [
    { name: "name", type: "text", required: true, admin: { description: "Industry label, e.g. \"D2C Beauty\", \"BFSI\"." } },
    {
      name: "band",
      type: "select",
      defaultValue: "a",
      options: [
        { label: "Top band (scrolls left)", value: "a" },
        { label: "Bottom band (scrolls right)", value: "b" },
      ],
      admin: { description: "Which of the two industry marquees this appears in." },
    },
    { name: "order", type: "number", defaultValue: 0 },
  ],
};
