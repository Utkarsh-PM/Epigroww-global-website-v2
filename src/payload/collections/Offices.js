/**
 * Global offices. Used on Home (Global Footprint interactive map),
 * Contact (offices list), Footer (studios), and FullscreenMenu.
 */
export const Offices = {
  slug: "offices",
  access: { read: () => true },
  admin: {
    useAsTitle: "city",
    group: "Content · Shared",
    description: "Office locations across studios. Shown on the Home global footprint, Contact page, footer, and overlay menu.",
    defaultColumns: ["city", "country", "tz", "role"],
  },
  fields: [
    { name: "city", type: "text", required: true },
    { name: "country", type: "text", required: true },
    {
      name: "role",
      type: "text",
      admin: { description: "Office role, e.g. \"Global HQ · Media & Tech\"." },
    },
    {
      name: "address",
      type: "textarea",
      admin: { description: "Street address. Line-breaks are preserved." },
    },
    {
      name: "tz",
      type: "text",
      admin: { description: "Time-zone tag for footer/menu, e.g. \"IST +05:30\"." },
    },
    {
      name: "image",
      type: "upload",
      relationTo: "media",
      admin: { description: "Photo of the studio for the Contact page tile." },
    },
    {
      type: "row",
      fields: [
        {
          name: "mapX",
          type: "number",
          admin: {
            width: "50%",
            description: "Map dot X position (0–100, percent across the world map).",
          },
        },
        {
          name: "mapY",
          type: "number",
          admin: {
            width: "50%",
            description: "Map dot Y position (0–100, percent down the world map).",
          },
        },
      ],
    },
    {
      name: "time",
      type: "text",
      admin: { description: "Display time shown on the map dot, e.g. \"09:00\"." },
    },
    {
      name: "blurb",
      type: "textarea",
      admin: { description: "1–2 lines describing what happens at this office." },
    },
    {
      name: "directionsUrl",
      type: "text",
      admin: { description: "Google Maps URL (or similar) for the \"Get directions\" link." },
    },
    { name: "order", type: "number", defaultValue: 0 },
  ],
};
