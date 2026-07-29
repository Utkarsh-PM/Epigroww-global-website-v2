// Brand Discovery Questionnaire — India Market Launch.
//
// This schema is the single source of truth for the form UI, the client-side
// payload, and (by key order) the Google Sheet column order. If you add a field
// here you must add the matching key to:
//   1. src/app/api/forms/route.js  → QUESTIONNAIRE_FIELDS
//   2. docs/google-sheets-apps-script.gs → SHEETS.questionnaire
// Keeping the three in sync is what stops the sheet silently dropping answers.

export const STEPS = [
  {
    id: "you",
    num: "01",
    title: "Your details",
    blurb: "So we know whose brand we're reading about, and where to send the plan.",
    fields: [
      { key: "name", label: "Full name", type: "text", required: true, autoComplete: "name", half: true },
      { key: "email", label: "Work email", type: "email", required: true, autoComplete: "email", half: true },
      { key: "brand", label: "Brand / company", type: "text", half: true },
      { key: "role", label: "Your role", type: "text", half: true },
      { key: "websiteUrl", label: "Website or Instagram", type: "text", half: true, placeholder: "brand.com" },
      { key: "phone", label: "Phone / WhatsApp", type: "tel", half: true, placeholder: "Optional" },
    ],
  },
  {
    id: "brand-business",
    num: "02",
    title: "Brand & business",
    blurb: "Where this is going, and what Year 1 has to prove.",
    fields: [
      {
        key: "vision",
        label: "What is your vision for the brand in India over the next 3–5 years?",
        type: "textarea",
        rows: 4,
      },
      {
        key: "yearOneGoals",
        label: "What are your Year 1 business goals?",
        hint: "Revenue, market presence, distribution — whatever you're being measured on.",
        type: "textarea",
        rows: 4,
      },
    ],
  },
  {
    id: "product-consumer",
    num: "03",
    title: "Product & consumer",
    blurb: "What you're launching, and who it's for.",
    fields: [
      {
        key: "categories",
        label: "Which product categories and hero SKUs are planned for launch?",
        type: "textarea",
        rows: 3,
      },
      {
        key: "usp",
        label: "What is the brand's key USP or point of differentiation?",
        type: "textarea",
        rows: 3,
      },
      {
        key: "audience",
        label: "Who is your primary target audience?",
        hint: "Age, gender, geography, income.",
        type: "textarea",
        rows: 3,
      },
      {
        key: "consumerProblem",
        label: "What consumer problem are you solving?",
        type: "textarea",
        rows: 3,
      },
    ],
  },
  {
    id: "pricing-distribution",
    num: "04",
    title: "Pricing & distribution",
    blurb: "Where the brand sits on the shelf, and which shelves it's on.",
    fields: [
      {
        key: "positioning",
        label: "Desired market positioning",
        type: "choice",
        options: ["Mass", "Masstige", "Premium", "Luxury", "Not decided yet"],
      },
      {
        key: "priceRange",
        label: "Expected price range",
        hint: "MRP band across the launch range.",
        type: "text",
        placeholder: "e.g. ₹499 – ₹1,999",
      },
      {
        key: "channels",
        label: "Which sales channels will you prioritise at launch?",
        hint: "Select all that apply.",
        type: "multi",
        options: [
          "D2C website",
          "Amazon",
          "Flipkart",
          "Nykaa",
          "Quick commerce",
          "Modern trade / retail",
          "General trade",
          "Exports",
        ],
      },
      {
        key: "channelsNote",
        label: "Anything else about distribution?",
        type: "textarea",
        rows: 3,
        optional: true,
      },
    ],
  },
  {
    id: "marketing-assets",
    num: "05",
    title: "Marketing & assets",
    blurb: "The budget behind Year 1, and what already exists to build on.",
    fields: [
      {
        key: "budget",
        label: "Estimated Year 1 marketing budget",
        type: "choice",
        options: [
          "Under ₹25 lacs",
          "₹25 lacs – ₹1 Cr",
          "₹1 Cr – ₹5 Cr",
          "₹5 Cr – ₹15 Cr",
          "₹15 Cr+",
          "Not decided yet",
        ],
      },
      {
        key: "priorityChannels",
        label: "Priority channels or activities",
        hint: "Select all that apply.",
        type: "multi",
        options: [
          "Influencers",
          "Performance marketing",
          "PR",
          "Social media",
          "Content & creative",
          "Marketplace ads",
          "Offline / BTL",
        ],
      },
      {
        key: "brandAssets",
        label:
          "Do you already have brand guidelines, visual identity, product claims or creative assets we should build on?",
        type: "textarea",
        rows: 4,
      },
    ],
  },
  {
    id: "metrics-competition",
    num: "06",
    title: "Metrics & competition",
    blurb: "What success is measured against, and who you're measured beside.",
    fields: [
      {
        key: "kpis",
        label: "Which KPIs define a successful launch?",
        hint: "Select all that apply.",
        type: "multi",
        options: [
          "Sales",
          "Awareness",
          "Market share",
          "CAC",
          "ROAS",
          "Repeat purchase",
          "Marketplace rank",
          "Distribution reach",
        ],
      },
      {
        key: "kpisNote",
        label: "Any specific targets against those KPIs?",
        type: "textarea",
        rows: 3,
        optional: true,
      },
      {
        key: "competitors",
        label:
          "Which brands do you consider your closest competitors or benchmarks in India?",
        type: "textarea",
        rows: 3,
      },
    ],
  },
  {
    id: "operations",
    num: "07",
    title: "Timelines & operations",
    blurb: "The constraints that decide what's actually buildable, and by when.",
    fields: [
      {
        key: "timelines",
        label:
          "Any launch timelines, regulatory considerations or operational constraints we should know about?",
        type: "textarea",
        rows: 3,
      },
      {
        key: "manufacturing",
        label: "Is the product manufactured in India or imported?",
        type: "choice",
        options: ["Made in India", "Imported", "Both"],
      },
      {
        key: "importModel",
        label: "If imported — country of origin and current import model",
        type: "textarea",
        rows: 3,
        optional: true,
      },
      {
        key: "opsSetup",
        label: "India operations setup",
        hint: "Import, warehousing, fulfilment, customer support, compliance.",
        type: "choice",
        options: [
          "Fully set up",
          "Partially set up",
          "Need support end-to-end",
        ],
      },
      {
        key: "opsNote",
        label: "Anything to add on the operations ecosystem?",
        type: "textarea",
        rows: 3,
        optional: true,
      },
      {
        key: "partners",
        label:
          "Do you have existing logistics, distribution or marketplace partners in India?",
        type: "textarea",
        rows: 3,
      },
    ],
  },
];

// Flat ordered key list — mirrors the Sheet column order.
export const FIELD_KEYS = STEPS.flatMap((s) => s.fields.map((f) => f.key));
