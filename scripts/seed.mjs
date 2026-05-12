/**
 * scripts/seed.mjs
 * Day 3 — seed the Payload CMS with all the content currently hardcoded
 * inside the React components on /, /about, /work, /careers, /contact,
 * and each /service-* page.
 *
 * Idempotent by default: each collection block checks whether it already has
 * docs and skips creation if so. Globals are always re-written (they're
 * singletons — the latest write wins). Pass --force to wipe every collection
 * first.
 *
 *   node scripts/seed.mjs            # safe — skip already-seeded collections
 *   node scripts/seed.mjs --force    # wipe collections, then seed fresh
 *
 * Media uploads are intentionally NOT seeded here — every upload-typed field
 * has a sibling `imageUrl` text fallback (or already has a videoUrl/posterUrl
 * sibling). Day 4 wires the components to read either source; Day 5 swaps in
 * curated uploads as time permits.
 */

import path from "node:path";
import { fileURLToPath } from "node:url";
import { config as loadDotenv } from "dotenv";
import { getPayload } from "payload";

const __filename = fileURLToPath(import.meta.url);
const __dirname = path.dirname(__filename);
const ROOT = path.resolve(__dirname, "..");

loadDotenv({ path: path.join(ROOT, ".env.local") });
loadDotenv({ path: path.join(ROOT, ".env") });

const FORCE = process.argv.includes("--force");

const config = (await import(path.join(ROOT, "payload.config.js"))).default;
const payload = await getPayload({ config });

/* ──────────────────────────────────────────────────────────────────────
 * Ensure an admin user exists.
 * Re-running this is a no-op if the user is already there.
 * ────────────────────────────────────────────────────────────────────── */

const ADMIN_EMAIL = process.env.SEED_ADMIN_EMAIL || "utkarsh@epigrowwglobal.com";
const ADMIN_PASSWORD = process.env.SEED_ADMIN_PASSWORD || "ChangeMe!2026";

{
  const { docs } = await payload.find({
    collection: "users",
    where: { email: { equals: ADMIN_EMAIL } },
    limit: 1,
    depth: 0,
  });
  if (docs.length === 0) {
    await payload.create({
      collection: "users",
      data: {
        email: ADMIN_EMAIL,
        password: ADMIN_PASSWORD,
        name: "Utkarsh Chandna",
        role: "admin",
      },
    });
    console.log(`  ✓ Created admin user ${ADMIN_EMAIL}  (password: ${ADMIN_PASSWORD})`);
  } else {
    console.log(`  — Admin user ${ADMIN_EMAIL} already exists`);
  }
}

const banner = (title) => {
  console.log("\n" + "═".repeat(64));
  console.log(`  ${title}`);
  console.log("═".repeat(64));
};
const tick = (msg) => console.log(`  ✓ ${msg}`);
const dash = (msg) => console.log(`  — ${msg}`);

/* ──────────────────────────────────────────────────────────────────────
 * Helpers
 * ────────────────────────────────────────────────────────────────────── */

async function seedCollection(slug, docs, titleField = "id") {
  banner(`Collection: ${slug}  (${docs.length} docs)`);
  if (FORCE) {
    const { docs: existing } = await payload.find({ collection: slug, limit: 1000, depth: 0 });
    for (const d of existing) await payload.delete({ collection: slug, id: d.id });
    if (existing.length) dash(`wiped ${existing.length} existing doc(s)`);
  }
  const { totalDocs } = await payload.count({ collection: slug });
  if (totalDocs > 0) {
    dash(`already has ${totalDocs} doc(s) — skipping (re-run with --force to overwrite)`);
    const { docs: existing } = await payload.find({ collection: slug, limit: 1000, depth: 0 });
    return existing;
  }
  const created = [];
  for (const data of docs) {
    const doc = await payload.create({ collection: slug, data });
    created.push(doc);
    tick(`${doc[titleField] ?? doc.id}`);
  }
  return created;
}

async function setGlobal(slug, data) {
  banner(`Global: ${slug}`);
  await payload.updateGlobal({ slug, data });
  tick(`${slug} updated`);
}

/* ──────────────────────────────────────────────────────────────────────
 * Data — extracted from current React components
 * ────────────────────────────────────────────────────────────────────── */

const PILLARS = [
  {
    num: "01",
    key: "media",
    title: "Media",
    tagline: "Precision in every impression.",
    shortSub: "The spend",
    description: "Performance buying across Google, Meta, Amazon, DV360, CTV and OTT — engineered around incrementality, not last-click vanity.",
    capabilities: [{ label: "Paid Social & Search" }, { label: "Programmatic & CTV" }, { label: "Marketplace Management" }, { label: "Retention & CRM" }],
    imageUrl: "https://images.unsplash.com/photo-1551288049-bebda4e38f71?auto=format&fit=crop&w=1200&q=80",
    accentHex: "#E3E65D",
    href: "/media-solutions",
    order: 1,
  },
  {
    num: "02",
    key: "brand",
    title: "Brand",
    tagline: "Creative sits at the top.",
    shortSub: "The creative",
    description: "From 30-second spots to 30-frame performance assets — a studio that produces 100+ pieces a week without sacrificing craft.",
    capabilities: [{ label: "Creative Suite — Ads" }, { label: "Influencer & UGC" }, { label: "Films, CGI & VFX" }, { label: "Identity & Packaging" }],
    imageUrl: "https://images.unsplash.com/photo-1586717799252-bd134ad00e26?auto=format&fit=crop&w=1200&q=80",
    accentHex: "#F4F0A0",
    href: "/brand-solutions",
    order: 2,
  },
  {
    num: "03",
    key: "tech",
    title: "Tech",
    tagline: "Compounds quietly in the background.",
    shortSub: "The plumbing",
    description: "Websites, stacks and automations that stay out of the way — Core Web Vitals greens, CRMs your team actually uses, AI assistants that ship.",
    capabilities: [{ label: "Web & E-commerce Build" }, { label: "CRM / ERP Systems" }, { label: "Marketing Automation" }, { label: "AI Assistants & Chatbots" }],
    imageUrl: "https://images.unsplash.com/photo-1518770660439-4636190af475?auto=format&fit=crop&w=1200&q=80",
    accentHex: "#CFDE54",
    href: "/tech-solutions",
    order: 3,
  },
  {
    num: "04",
    key: "ai",
    title: "AI",
    tagline: "The force-multiplier.",
    shortSub: "The force-multiplier",
    description: "LLM-native pods shipping assistants, agents, copy engines, and audience models — guard-railed, evaluated, owned by you.",
    capabilities: [{ label: "Assistants" }, { label: "Agents" }, { label: "Copy engines" }, { label: "Audience models" }],
    imageUrl: "https://images.unsplash.com/photo-1620712943543-bcc4688e7485?auto=format&fit=crop&w=1200&q=80",
    accentHex: "#B5B847",
    href: "/tech-solutions",
    order: 4,
  },
];

const WORK_CASES = [
  {
    client: "JK Lifestyle — Infinity",
    project: "Infinity — Fragrance launch",
    category: "brand",
    tag: "Launch",
    services: [{ label: "Brand identity" }, { label: "Launch film" }, { label: "Performance creatives" }],
    outcome: "3.4× ROAS · 1.2M first-week views",
    year: "2025",
    imageUrl: "https://images.unsplash.com/photo-1541643600914-78b084683601?auto=format&fit=crop&w=1400&q=80",
    size: "lg",
    color: "#1e3a2f",
    featuredOnHome: true,
    resultsBandKpi: "3.4×",
    resultsBandLabel: "Launch ROAS · JK Lifestyle Infinity",
    order: 1,
  },
  {
    client: "Cinegold — OTT",
    project: "OTT campaign & retention",
    category: "media",
    tag: "Retention",
    services: [{ label: "OTT campaigns" }, { label: "Lifecycle CRM" }],
    outcome: "+58% 30-day retention",
    year: "2025",
    imageUrl: "https://images.unsplash.com/photo-1598899134739-24c46f58b8c0?auto=format&fit=crop&w=1400&q=80",
    size: "md",
    color: "#4a1c0f",
    featuredOnHome: true,
    resultsBandKpi: "+58%",
    resultsBandLabel: "30-day retention · Cinegold OTT",
    order: 2,
  },
  {
    client: "JCBL Group",
    project: "B2B stack modernization",
    category: "tech",
    tag: "Stack rebuild",
    services: [{ label: "ERP migration" }, { label: "Sales automation" }],
    outcome: "42% faster lead-to-quote",
    year: "2024",
    imageUrl: "https://images.unsplash.com/photo-1518770660439-4636190af475?auto=format&fit=crop&w=1400&q=80",
    size: "md",
    color: "#0a0a0a",
    featuredOnHome: true,
    resultsBandKpi: "42%",
    resultsBandLabel: "Lead-to-quote cycle · JCBL",
    order: 3,
  },
  {
    client: "Private brand · Dubai",
    project: "Full-stack D2C launch",
    category: "media",
    tag: "D2C launch",
    services: [{ label: "Shopify Plus" }, { label: "Full-stack media" }],
    outcome: "$2.1M revenue · 90 days",
    year: "2025",
    imageUrl: "https://images.unsplash.com/photo-1492691527719-9d1e07e534b4?auto=format&fit=crop&w=1400&q=80",
    size: "md",
    color: "#2b1b3a",
    featuredOnHome: true,
    resultsBandKpi: "$2.1M",
    resultsBandLabel: "90-day revenue · D2C Dubai",
    order: 4,
  },
  {
    client: "FMCG · North America",
    project: "Performance creative engine",
    category: "brand",
    tag: "Creative engine",
    services: [{ label: "Performance creative" }, { label: "UGC" }],
    outcome: "CAC down 37% · 90 days",
    year: "2024",
    imageUrl: "https://images.unsplash.com/photo-1542744173-8e7e53415bb0?auto=format&fit=crop&w=1400&q=80",
    size: "lg",
    color: "#102a43",
    featuredOnHome: true,
    resultsBandKpi: "−37%",
    resultsBandLabel: "Blended CAC · FMCG · NA",
    order: 5,
  },
  {
    client: "BFSI — India",
    project: "Paid performance growth",
    category: "media",
    tag: "Paid performance",
    services: [{ label: "Google PMax" }, { label: "Meta retargeting" }],
    outcome: "2× leads · 35% lower CPL",
    year: "2025",
    imageUrl: "https://images.unsplash.com/photo-1556761175-4b46a572b786?auto=format&fit=crop&w=1400&q=80",
    size: "md",
    color: "#1b2a4a",
    featuredOnHome: false,
    order: 6,
  },
  {
    client: "F&B chain — MENA",
    project: "Loyalty stack",
    category: "tech",
    tag: "Loyalty",
    services: [{ label: "WhatsApp API" }, { label: "Klaviyo flows" }],
    outcome: "+28% repeat orders",
    year: "2024",
    imageUrl: "https://images.unsplash.com/photo-1414235077428-338989a2e8c0?auto=format&fit=crop&w=1400&q=80",
    size: "md",
    color: "#3a1c1c",
    featuredOnHome: false,
    resultsBandKpi: "+28%",
    resultsBandLabel: "Repeat orders · MENA F&B",
    order: 7,
  },
  {
    client: "EdTech — Global",
    project: "Rebrand + platform rebuild",
    category: "brand",
    tag: "Rebrand + platform",
    services: [{ label: "Identity" }, { label: "Web rebuild" }],
    outcome: "4× organic traffic in 6 mo",
    year: "2024",
    imageUrl: "https://images.unsplash.com/photo-1522202176988-66273c2fd55f?auto=format&fit=crop&w=1400&q=80",
    size: "md",
    color: "#2a2a4a",
    featuredOnHome: false,
    order: 8,
  },
  {
    client: "Fintech — SaaS",
    project: "AI support assistant",
    category: "tech",
    tag: "AI assistant",
    services: [{ label: "LLM support bot" }, { label: "Evals framework" }],
    outcome: "65% deflection rate",
    year: "2025",
    imageUrl: "https://images.unsplash.com/photo-1551288049-bebda4e38f71?auto=format&fit=crop&w=1400&q=80",
    size: "lg",
    color: "#0a2a3a",
    featuredOnHome: false,
    resultsBandKpi: "65%",
    resultsBandLabel: "Support deflection · AI assistant",
    order: 9,
  },
];

// Extra results-band-only KPIs (not first-class case studies)
const EXTRA_RESULTS_AS_CASES = [
  { client: "Lighthouse build avg.", project: "Web Vitals · all builds", category: "tech", tag: "Speed", outcome: "98 Lighthouse avg.", year: "2025", resultsBandKpi: "98", resultsBandLabel: "Lighthouse score · avg. build", order: 10 },
  { client: "JK Lifestyle — TVC", project: "Infinity launch TVC", category: "brand", tag: "Film", outcome: "1.2M first-week views", year: "2025", resultsBandKpi: "1.2M", resultsBandLabel: "First-week views · Infinity TVC", order: 11 },
];

const VOICES = [
  // Home (3)
  { quote: "Epigroww is the rare partner who treats our P&L like theirs. Campaigns launch faster, creative comes sharper, and the revenue shows up in the sheet.", name: "Sandeep Arora — Home", role: "CEO · JK Lifestyle", tag: "Brand + Media partner", showOnHome: true, order: 1 },
  { quote: "They rebuilt our tech stack in a quarter and stayed on through two product launches. It's the first agency that actually stuck around past the handoff.", name: "Jatinder Chaudhary — Home", role: "Director · JCBL Group", tag: "Tech transformation", showOnHome: true, order: 2 },
  { quote: "The OTT launch plan they shipped moved retention almost 60%. What surprised us was how tight the creative was — and how cheaply it scaled.", name: "Mohit Bubber — Home", role: "Founder · Cinegold", tag: "OTT growth", showOnHome: true, order: 3 },
  // Media (3)
  { quote: "Epigroww's media team pulled our blended CAC down 37% in 90 days — without touching creative quality.", name: "Sandeep Arora — Media", role: "CEO · JK Lifestyle", tag: "D2C · Beauty", showOnMedia: true, order: 1 },
  { quote: "They run our Amazon + Flipkart P&Ls like owners. Our rank is better than it's ever been.", name: "Jatinder Chaudhary — Media", role: "Director · JCBL Group", tag: "Marketplace", showOnMedia: true, order: 2 },
  { quote: "The OTT retention playbook alone was worth the engagement.", name: "Mohit Bubber — Media", role: "Founder · Cinegold", tag: "OTT · Media", showOnMedia: true, order: 3 },
  // Brand (3)
  { quote: "The Infinity launch films landed in the top 3 in our category. The team stayed on for the retention creatives — rare energy.", name: "Sandeep Arora — Brand", role: "CEO · JK Lifestyle", tag: "FMCG · Launch", showOnBrand: true, order: 1 },
  { quote: "We came for the brand film and stayed for the always-on creative engine. 100+ pieces a week and still crisp.", name: "Mohit Bubber — Brand", role: "Founder · Cinegold", tag: "OTT · Launch", showOnBrand: true, order: 2 },
  { quote: "They delivered the CGI product spots in half the time of our usual production house.", name: "Jatinder Chaudhary — Brand", role: "Director · JCBL Group", tag: "Brand · CGI", showOnBrand: true, order: 3 },
  // Tech (3)
  { quote: "They replatformed our three Shopify stores to a single Plus instance in six weeks. Zero downtime, zero data loss.", name: "Sandeep Arora — Tech", role: "CEO · JK Lifestyle", tag: "Replatform · D2C", showOnTech: true, order: 1 },
  { quote: "The WhatsApp automation alone recovered 18% more abandoned carts. The retention stack paid back in week two.", name: "Mohit Bubber — Tech", role: "Founder · Cinegold", tag: "Automation · CRM", showOnTech: true, order: 2 },
  { quote: "Our internal tooling finally feels like it was built by people who use it. Our ops team halved their manual hours.", name: "Jatinder Chaudhary — Tech", role: "Director · JCBL Group", tag: "ERP · Ops", showOnTech: true, order: 3 },
  // Ecommerce (3)
  { quote: "Replatform to Shopify Plus + retention rebuild — repeat purchase rate doubled inside two quarters.", name: "Sandeep Arora — Ecom", role: "CEO · JK Lifestyle", tag: "D2C · Beauty", showOnEcommerce: true, order: 1 },
  { quote: "Our Amazon P&L finally looks like a real business. The PPC, A+ and retention loops all run from the same pod.", name: "Jatinder Chaudhary — Ecom", role: "Director · JCBL Group", tag: "Marketplace", showOnEcommerce: true, order: 2 },
  { quote: "Sub-second LCP on a catalog of 4,000 SKUs — and a CMS our merchandiser actually opens every morning.", name: "Mohit Bubber — Ecom", role: "Founder · Cinegold", tag: "Commerce · Tech", showOnEcommerce: true, order: 3 },
];

const OFFICES = [
  {
    city: "New Delhi", country: "India", role: "Global HQ · Media & Tech",
    address: "Saket District Centre\nNew Delhi 110 017",
    tz: "IST +05:30", mapX: 68.5, mapY: 40.5, time: "09:00",
    blurb: "Our growth engine room — performance, analytics, and the research lab.",
    imageUrl: "https://images.unsplash.com/photo-1587474260584-136574528ed5?auto=format&fit=crop&w=1000&q=80",
    order: 1,
  },
  {
    city: "Mumbai", country: "India", role: "Brand & Film Studio",
    address: "Andheri West\nMumbai 400 053",
    tz: "IST +05:30", mapX: 67, mapY: 45, time: "09:00",
    blurb: "Where the creative happens — writers, art directors, and our in-house film team.",
    imageUrl: "https://images.unsplash.com/photo-1570168007204-dfb528c6958f?auto=format&fit=crop&w=1000&q=80",
    order: 2,
  },
  {
    city: "Dubai", country: "United Arab Emirates", role: "MENA Growth Hub",
    address: "Business Bay\nDubai, U.A.E.",
    tz: "GST +04:00", mapX: 62, mapY: 44, time: "07:30",
    blurb: "Servicing brands across the Gulf — Arabic-native production and MENA media buys.",
    imageUrl: "https://images.unsplash.com/photo-1518684079-3c830dcef090?auto=format&fit=crop&w=1000&q=80",
    order: 3,
  },
  {
    city: "Toronto", country: "Canada", role: "North America Studio",
    address: "King Street West\nToronto M5V",
    tz: "EDT −04:00", mapX: 25, mapY: 34, time: "23:30",
    blurb: "Our bridge to NA brands — account leads, performance creative, and new-market launches.",
    imageUrl: "https://images.unsplash.com/photo-1517090504586-fde19ea6066f?auto=format&fit=crop&w=1000&q=80",
    order: 4,
  },
];

const OPEN_ROLES = [
  { title: "Senior Performance Marketing Specialist", dept: "Media", loc: "Delhi · Remote OK", type: "Full-time", active: true, order: 1 },
  { title: "Performance Marketing Specialist", dept: "Media", loc: "Remote · India", type: "Full-time", active: true, order: 2 },
  { title: "Senior Account Manager", dept: "Media", loc: "Mumbai", type: "Full-time", active: true, order: 3 },
  { title: "E-commerce Specialist", dept: "Media", loc: "Delhi", type: "Full-time", active: true, order: 4 },
  { title: "Senior Graphic Designer", dept: "Brand", loc: "Delhi", type: "Full-time", active: true, order: 5 },
  { title: "Video Editor — Mumbai", dept: "Brand", loc: "Mumbai", type: "Full-time", active: true, order: 6 },
  { title: "Video Editor — Delhi", dept: "Brand", loc: "Delhi", type: "Full-time", active: true, order: 7 },
  { title: "Brand Solutions Lead", dept: "Brand", loc: "Mumbai", type: "Full-time", active: true, order: 8 },
  { title: "Full-stack Engineer (Next.js)", dept: "Tech", loc: "Remote · Global", type: "Full-time", active: true, order: 9 },
  { title: "Shopify Developer", dept: "Tech", loc: "Remote · India", type: "Full-time", active: true, order: 10 },
  { title: "Marketing Executive", dept: "Operations", loc: "Delhi", type: "Full-time", active: true, order: 11 },
  { title: "People & Talent Partner", dept: "Operations", loc: "Remote · India", type: "Full-time", active: true, order: 12 },
];

const INDUSTRIES = [
  // Band A (top, scrolls left)
  ["D2C Beauty", "FMCG", "BFSI", "EdTech", "Fintech", "SaaS", "Consumer Electronics", "Fashion & Apparel", "OTT & Media", "Automotive", "F&B", "Hospitality", "Travel", "Wellness"]
    .map((name, i) => ({ name, band: "a", order: i + 1 })),
  // Band B (bottom, scrolls right)
  ["Real Estate", "Healthcare", "Pharma", "B2B Manufacturing", "Agritech", "Gaming", "Crypto & Web3", "Publishing", "Marketplace", "Luxury", "Quick Commerce", "Logistics", "HR Tech", "Legal Tech"]
    .map((name, i) => ({ name, band: "b", order: i + 1 })),
].flat();

const FAQS = [
  { question: "How long until I hear back?", answer: "Serious briefs get a human reply within 24 hours, usually within 4 working hours. We don't use auto-responders — every inbound is read by a partner.", page: "contact", order: 1 },
  { question: "Do you work with smaller brands?", answer: "Yes, as long as the ambition is real. Our minimum retainer is $10K/month — below that, we refer you to specialists we trust.", page: "contact", order: 2 },
  { question: "Can we hire you for just one thing — media, or creative, or tech?", answer: "Absolutely. Most new clients start with one pillar. The integration benefit shows up in months 3–6 when pods start collaborating.", page: "contact", order: 3 },
  { question: "Do you work internationally?", answer: "Delhi, Mumbai, Dubai, Toronto — plus 22 nationalities across the team. We run campaigns in English, Arabic, Hindi, French, and Spanish.", page: "contact", order: 4 },
  { question: "What's your pricing model?", answer: "Monthly retainers for ongoing work, scoped engagements for projects. We publish our rate card after the first discovery call — no mystery.", page: "contact", order: 5 },
  { question: "Do you share case studies?", answer: "Named ones after a mutual NDA. You can see client logos, outcomes, and redacted case studies on /work — the juicy ones live in the deck.", page: "contact", order: 6 },
];

/* ──────────────────────────────────────────────────────────────────────
 * Seed collections (gather IDs for relationships)
 * ────────────────────────────────────────────────────────────────────── */

const pillarDocs = await seedCollection("pillars", PILLARS, "title");
const caseDocs = await seedCollection(
  "work-cases",
  [...WORK_CASES, ...EXTRA_RESULTS_AS_CASES],
  "client"
);
const voiceDocs = await seedCollection("voices", VOICES, "name");
const officeDocs = await seedCollection("offices", OFFICES, "city");
const roleDocs = await seedCollection("open-roles", OPEN_ROLES, "title");
const industryDocs = await seedCollection("industries", INDUSTRIES, "name");
const faqDocs = await seedCollection("faqs", FAQS, "question");

// Quick lookup maps for relationships
const pillarIds = pillarDocs.sort((a, b) => (a.order ?? 0) - (b.order ?? 0)).map((p) => p.id);
const caseIds = caseDocs.filter((c) => c.order && c.order <= 9).sort((a, b) => a.order - b.order).map((c) => c.id);
const homeVoiceIds = voiceDocs.filter((v) => v.showOnHome).map((v) => v.id);
const mediaVoiceIds = voiceDocs.filter((v) => v.showOnMedia).map((v) => v.id);
const brandVoiceIds = voiceDocs.filter((v) => v.showOnBrand).map((v) => v.id);
const techVoiceIds = voiceDocs.filter((v) => v.showOnTech).map((v) => v.id);
const ecomVoiceIds = voiceDocs.filter((v) => v.showOnEcommerce).map((v) => v.id);

/* ──────────────────────────────────────────────────────────────────────
 * Globals
 * ────────────────────────────────────────────────────────────────────── */

await setGlobal("site-settings", {
  colors: {
    accent: "#E3E65D",
    accent2: "#CFDE54",
    ink: "#F0F0F0",
    bg: "#141730",
  },
  fontDisplay: "Inter",
  motion: "standard",
  email: "hello@epigrowwglobal.com",
  phone: "+91 98765 43210",
  partnershipsEmail: "partners@epigrowwglobal.com",
  pressEmail: "press@epigrowwglobal.com",
  linkedin: "https://linkedin.com/company/epigroww-global",
  instagram: "https://instagram.com/epigrowwglobal",
  facebook: "https://facebook.com/epigrowwglobal",
  twitter: "",
  defaultTitle: "Epigroww Global — Growth. Engineered Globally.",
  defaultDescription:
    "Epigroww Global is an integrated growth partner operating at the intersection of brand, media, and technology. 500+ clients across 40+ industries, delivered from Delhi, Mumbai, Dubai & Toronto.",
});

await setGlobal("home-page", {
  hero: {
    heroTopline: "Integrated growth since 2021",
    heroEyebrowNum: "(01)",
    heroEyebrowText: "Media · Brand · Tech — unified",
    headlinePrefix: "We engineer",
    headlineAccent: "growth",
    headlineSuffix: "that compounds across four continents.",
    heroBlurb:
      "An integrated growth partner sitting at the intersection of brand, media, and technology. 500+ clients, 40+ industries — delivered from Delhi, Mumbai, Dubai & Toronto.",
    heroStats: [
      { num: "300+", label: "Campaigns in 12 months" },
      { num: "500+", label: "Brands trust us" },
      { num: "4", label: "Studios worldwide" },
    ],
    heroFilm: {
      videoUrl: "https://videos.pexels.com/video-files/853889/853889-hd_1920_1080_25fps.mp4",
      badge: "LIVE · Mumbai studio",
    },
    ctaPrimary: { label: "Learn more", href: "/work" },
    ctaGhost: { label: "Hire us", href: "/contact" },
  },
  showreel: {
    showreelLabel: "— 01.5 / Showreel · Spring 2026",
    showreelPrefix: "A week's",
    showreelAccent: "output",
    showreelSuffix: ", cut into ninety seconds.",
    showreelVideoUrl: "https://videos.pexels.com/video-files/3195394/3195394-hd_1920_1080_25fps.mp4",
    showreelDuration: "01:28",
    showreelMarquee: [
      { weekTag: "WK 17", title: "Launch film · Beauty", imageUrl: "https://images.unsplash.com/photo-1596462502278-27bfdc403348?auto=format&fit=crop&w=800&q=80" },
      { weekTag: "WK 16", title: "TVC · Automotive", imageUrl: "https://images.unsplash.com/photo-1492144534655-ae79c964c9d7?auto=format&fit=crop&w=800&q=80" },
      { weekTag: "WK 16", title: "UGC reel · F&B", imageUrl: "https://images.unsplash.com/photo-1556909114-f6e7ad7d3136?auto=format&fit=crop&w=800&q=80" },
      { weekTag: "WK 15", title: "CGI · Perfume", imageUrl: "https://images.unsplash.com/photo-1541643600914-78b084683601?auto=format&fit=crop&w=800&q=80" },
      { weekTag: "WK 15", title: "Shopify launch", imageUrl: "https://images.unsplash.com/photo-1556742049-0cfed4f6a45d?auto=format&fit=crop&w=800&q=80" },
      { weekTag: "WK 14", title: "Performance reel", imageUrl: "https://images.unsplash.com/photo-1611162617213-7d7a39e9b1d7?auto=format&fit=crop&w=800&q=80" },
      { weekTag: "WK 14", title: "Identity · Fashion", imageUrl: "https://images.unsplash.com/photo-1490481651871-ab68de25d43d?auto=format&fit=crop&w=800&q=80" },
      { weekTag: "WK 13", title: "Influencer · D2C", imageUrl: "https://images.unsplash.com/photo-1483985988355-763728e1935b?auto=format&fit=crop&w=800&q=80" },
    ],
  },
  manifesto: {
    manifestoLabel: "— 02 / Philosophy · Read · 18 sec",
    manifestoBody:
      "We don't sell services. We engineer outcomes — pairing award-winning creative with performance data and tech that compounds. One team, four cities, endless specificity.",
    manifestoAuthor: "— Danish Abbasi",
    manifestoAuthorRole: "Founder, Epigroww Global",
  },
  growthEngine: {
    geLabel: "— 03 / The growth engine",
    geHeadingPrefix: "Four disciplines,",
    geHeadingAccent: "one compounding",
    geHeadingSuffix: "system.",
    geLede:
      "Media, Brand, Tech and AI — run as a single pod, priced as a single retainer, measured against a single revenue line. One system your CFO can read.",
    pillarRefs: pillarIds,
  },
  livePulse: {
    lpLabel: "— 04 / What's happening right now",
    lpLiveBadge: "LIVE · Q2 2026",
    lpHeadingPrefix: "Numbers that",
    lpHeadingAccent: "tick",
    lpHeadingSuffix: "while you're reading.",
    lpMetrics: [
      { key: "imp", label: "Impressions served · today", seed: 14820430, perSec: 182, unit: "", format: "number" },
      { key: "rev", label: "Revenue tracked · today", seed: 2412800, perSec: 36.5, unit: "", format: "usd" },
      { key: "creatives", label: "Creatives in production · now", seed: 47, perSec: 0.015, unit: "", format: "number" },
      { key: "clicks", label: "Clicks routed · last hour", seed: 128340, perSec: 9.4, unit: "", format: "number" },
      { key: "cac", label: "Avg. CAC reduction · YTD", seed: 37, perSec: 0, unit: "%", format: "number" },
    ],
    lpFeed: [
      { timeTag: "IST 14:32", text: "JK Lifestyle · Infinity — ad set scaled 40% ↑" },
      { timeTag: "GST 12:58", text: "MENA retainer — new creative batch shipped (12)" },
      { timeTag: "IST 14:29", text: "Cinegold OTT — retention flow A+ winner locked" },
      { timeTag: "EDT 04:58", text: "Toronto pod — Shopify Plus deploy, zero downtime" },
      { timeTag: "IST 14:24", text: "D2C beauty — ROAS threshold crossed (3.8×)" },
      { timeTag: "IST 14:19", text: "FMCG NA — 8 performance cut-downs queued" },
    ],
  },
  approach: {
    apLabel: "— 06 / The approach",
    apHeadingPrefix: "Omni-channel, data-backed,",
    apHeadingAccent: "creative-fueled.",
    apLede:
      "Our four-step operating system — refined across 300+ campaigns and 40+ industries — makes growth measurable, repeatable, and quietly obsessive.",
    apSteps: [
      { num: "01", kind: "Discover", title: "Diagnosis before prescription.", desc: "We audit your funnel end-to-end — brand perception, media efficiency, tech plumbing, analytics truth. The brief only writes itself after the audit.", chips: [{label:"Brand audit"},{label:"Media efficiency"},{label:"CRO teardown"},{label:"Analytics integrity"}] },
      { num: "02", kind: "Design", title: "Strategy that a CFO would sign.", desc: "A 90-day growth plan with KPIs, channel math, creative testing matrix, and the tech prerequisites — all tied to revenue, not impressions.", chips: [{label:"Channel mix model"},{label:"Creative matrix"},{label:"Tech backlog"},{label:"Success KPIs"}] },
      { num: "03", kind: "Deploy", title: "Ship weekly, learn weekly.", desc: "A four-studio delivery engine producing 100+ creatives a week, launching campaigns across Meta, Google, Amazon, DV360, CTV & owned channels — always live-tuned.", chips: [{label:"100+ creatives/week"},{label:"Always-on campaigns"},{label:"Agile sprints"},{label:"Daily pacing"}] },
      { num: "04", kind: "Decompound", title: "Compound the wins. Cut the waste.", desc: "Weekly scorecards, incrementality testing, creative winners rolling to evergreen, losers retired fast. We optimize for compounding ROAS — not flashes.", chips: [{label:"Incrementality tests"},{label:"Scorecard rituals"},{label:"Win/kill cadence"},{label:"Evergreen engine"}] },
    ],
  },
  logoBand: {
    lbCaption: "— 09 / Trusted · Meta · Google · Amazon · Shopify certified",
    lbBrandsA: [
      "JK Lifestyle", "JCBL Group", "Cinegold", "Infinity Perfumes",
      "Shopify Partner", "Meta Business", "Google Ads", "Amazon Seller", "DV360",
    ].map((n) => ({ name: n })),
    lbBrandsB: [
      "500+ Brands", "40+ Industries", "300+ Campaigns", "1000+ Creators",
      "4 Continents", "100+ Specialists", "Minority-owned", "Since 2021",
    ].map((n) => ({ name: n })),
  },
  voicesFooterCta: {
    voicesHeadingPrefix: "What the",
    voicesHeadingAccent: "people paying us",
    voicesHeadingSuffix: "say.",
    ctaEyebrow: "— Your next chapter",
    ctaHeading: "Engineer your next growth chapter with us.",
    ctaAccent: "next growth chapter",
  },
  seo: {
    seoTitle: "Epigroww Global — Growth. Engineered Globally.",
    seoDescription:
      "Integrated growth partner sitting at the intersection of brand, media, and technology. 500+ clients, 40+ industries — Delhi, Mumbai, Dubai & Toronto.",
  },
});

await setGlobal("about-page", {
  hero: {
    kicker: "— About · Epigroww Global",
    kickerRight: "Est. 2021 · Minority-owned",
    headlinePrefix: "We became the agency we wanted to find when we were",
    headlineAccent: "clients.",
    stats: [
      { num: "100+", label: "Specialists" },
      { num: "04", label: "Global studios" },
      { num: "40+", label: "Industries served" },
    ],
    imageMeta: "001 / Studio — Mumbai · 2026",
  },
  manifesto: {
    label: "The mission",
    principles: [
      { num: "01", text: "Think big, then ship." },
      { num: "02", text: "Own every outcome." },
      { num: "03", text: "Stay curious." },
    ],
    body: "To become the world's largest — and most trusted — growth partner, by making the boring parts of marketing radically specific, and the creative parts impossibly good.",
  },
  visionBlock: {
    founderLabel: "— Founder · Danish Abbasi",
    founderQuote: "I wanted an agency that treated the client's P&L like their own — and shipped the creative the brand deserved. Epigroww is that agency. We built it.",
    founderName: "Danish Abbasi",
    founderRole: "Founder & CEO · Since 2021",
    statCards: [
      { num: "05", label: "Years · since a laptop in Lucknow", accent: false },
      { num: "100+", label: "Specialists in the room", accent: true },
      { num: "22", label: "Nationalities · 4 studios", accent: false },
    ],
    tiles: [
      { eyebrow: "The problem", title: "Agencies hid behind retainers.", body: "Hours billed, not outcomes shipped. Client P&Ls treated as someone else's math." },
      { eyebrow: "The thesis", title: "Outcomes over outputs.", body: "Every pod co-signs the scorecard. Wins scale. Losers get retired — weekly." },
      { eyebrow: "The build", title: "One team, one retainer.", body: "Media, Brand, Tech and AI in the same Slack. No handoff theatre. No separate P&Ls." },
    ],
  },
  values: {
    label: "— Values · five of them",
    headingPrefix: "What we won't",
    headingAccent: "compromise on.",
    items: [
      { num: "01", name: "Think Big", tag: "Ambition", body: "If the plan doesn't scare the CFO a little, it isn't the plan. We choose uncomfortable growth goals and then make them inevitable." },
      { num: "02", name: "Own It", tag: "Accountability", body: "There are no 'agency wins.' Every campaign is co-signed by the team that built it — and un-signed by no one when it breaks." },
      { num: "03", name: "Pursue with Curiosity", tag: "Craft", body: "We keep a standing 10% time budget for R&D — new channels, new AI tools, new creative formats. Last year's playbook is this year's floor." },
      { num: "04", name: "Diversity & Inclusion", tag: "People", body: "Minority-founded and deliberately mixed — by nationality, craft, and perspective. We ship better work because our rooms disagree well." },
      { num: "05", name: "Unity is Strength", tag: "Team", body: "Brand, media, and tech don't live on different floors here. The pod that launches your campaign is the same one that built the landing page." },
    ],
  },
  timeline: {
    label: "— Story · 2021 → now",
    headingPrefix: "Five years of compounding.",
    headingAccent: "One plan.",
    milestones: [
      { year: "2021", quarter: "Q1", heading: "The Lucknow beginning", body: "Founded in Lucknow, India, by Danish Abbasi. A single brief. One laptop. A stubborn belief that the agency model needed breaking." },
      { year: "2022", quarter: "Q4", heading: "Delhi HQ opens", body: "First 25 hires. Launched the performance-creative pod that still powers our retainer clients today." },
      { year: "2023", quarter: "Q2", heading: "Mumbai studio", body: "Opened a brand-and-film studio — CGI, TVC commercials, celebrity endorsements. Creative finally got the stage it deserved." },
      { year: "2024", quarter: "Q1", heading: "Global footprint", body: "Toronto + Dubai offices launched in the same quarter. We crossed $1B+ in managed media spend." },
      { year: "2025", quarter: "Q3", heading: "100+ team", body: "300+ campaigns in 12 months. 500+ brands on the books. 40+ industries served. Quiet compounding, on schedule." },
      { year: "2026", quarter: "next", heading: "To be written", body: "AI-native pods, owned-media tooling, and the next 500 brands. The plan hasn't changed: ship weekly, compound forever." },
    ],
  },
  team: {
    label: "— The people",
    intro: "100+ specialists across four cities. Designers, performance marketers, film-makers, engineers, analysts — who sit on the same Slack channel and care about the same spreadsheet.",
    members: [
      { name: "Danish Abbasi", role: "Founder & CEO", city: "New Delhi" },
      { name: "Priyam Mehra", role: "Co-Director", city: "Mumbai" },
      { name: "Aanya Kapoor", role: "VP · Creative", city: "Mumbai" },
      { name: "Rahul Verma", role: "VP · Media", city: "New Delhi" },
      { name: "Mariam Al-Noori", role: "Head · MENA", city: "Dubai" },
      { name: "Ethan O'Connell", role: "Head · NA", city: "Toronto" },
    ],
    endCardNumber: "+ 94",
    endCardBody: "Growing carefully, one hire at a time.",
  },
  diversity: {
    label: "— Diversity & Inclusion",
    heading: "A minority-founded, deliberately mixed house.",
    body: "We built Epigroww on the belief that the best work comes out of rooms that disagree well. Our team composition isn't a dashboard metric — it's the reason the work lands in markets that global holding companies can't read.",
    metaStats: [
      { num: "100+", label: "team members" },
      { num: "22", label: "nationalities" },
      { num: "1st", label: "generation founded" },
    ],
    bars: [
      { label: "White", pct: 40, colorHex: "#E3E65D" },
      { label: "Asian", pct: 30, colorHex: "#CFDE54" },
      { label: "Hispanic · Latinx", pct: 19, colorHex: "#F4F0A0" },
      { label: "Black", pct: 8, colorHex: "#B5B847" },
      { label: "Two or more races", pct: 3, colorHex: "#F0F0F0" },
    ],
  },
  footerCtaSeo: {
    ctaEyebrow: "— Join the story",
    ctaHeading: "Partner with the team quietly building the next global agency.",
    ctaAccent: "next global agency",
    seoTitle: "About — Epigroww Global",
    seoDescription: "Five years, four studios, 100+ specialists. A minority-founded growth partner engineered around outcomes.",
  },
});

await setGlobal("work-page", {
  hero: {
    kickerLeft: "03 · Work",
    kickerRight: "2021 → 2026 · Selected",
    headingPrefix: "Five years.",
    headingAccent: "Five hundred",
    headingSuffix: "brands.",
    lede: "What follows is a small, named subset of the work. The full case book — with P&L figures, incrementality curves, and the stuff we can't publish online — is a private share.",
    heroStats: [
      { num: "500+", label: "Brands shipped" },
      { num: "40+", label: "Industries" },
      { num: "1000+", label: "Creators" },
      { num: "$1B+", label: "Media spend" },
    ],
  },
  resultsBand: {
    label: "— Proof · selected wins",
    headingPrefix: "Nine results",
    headingAccent: "the clients let",
    headingSuffix: "us print.",
    footerNote: "Live scorecards · updated weekly with every client",
    endCard: { label: "+ 491 more", sub: "under NDA — ask for the deck" },
  },
  caseGrid: {
    label: "— Selected work",
    caseRefs: caseIds,
  },
  industryBand: {
    topLabel: "— 40+ industries served",
    topRight: "Brand + Media + Tech",
    footerLine: "And counting. If your category isn't here, we've probably built adjacent muscle — ask.",
  },
  footerCtaSeo: {
    ctaEyebrow: "— More in the vault",
    ctaHeading: "The juicy stuff lives in the deck. Ask for it.",
    ctaAccent: "the juicy stuff",
    ctaText: "Request the case book",
    ctaHref: "/contact",
    seoTitle: "Work — Epigroww Global",
    seoDescription: "Selected case studies from 500+ brands across 40+ industries.",
  },
});

await setGlobal("careers-page", {
  hero: {
    kickerLeft: "07 · Careers at Epigroww",
    kickerRight: "12 open roles",
    headingPrefix: "Build an",
    headingAccent: "empire",
    headingSuffix: ". Not just a ladder.",
    lede: "We're a remote-first, globally distributed team of 100+ specialists — the kind that treats great ideas seriously and bureaucracy as a bug. Bring craft, obsess over outcomes, and we'll give you a room to build in.",
    heroStats: [
      { num: "100+", label: "Specialists" },
      { num: "04", label: "Studios" },
      { num: "22", label: "Nationalities" },
      { num: "5y", label: "Since founding" },
    ],
    tags: [
      "Remote-first", "Async-biased", "Creative-led", "Results over location",
      "100% paid health", "Annual team trip", "Flexible time off", "Wellness budget",
    ].map((label) => ({ label })),
  },
  culture: {
    label: "— The culture",
    statement: "We believe great ideas don't need an office. They need curious people, clear outcomes, and the trust to build.",
    pillars: [
      { k: "01", title: "Big ideas over bureaucracy", body: "The biggest plan in the room wins, regardless of who brought it. We don't promote titles — we promote ideas that shipped." },
      { k: "02", title: "Results over location", body: "Remote-first, deeply. Delhi, Mumbai, Dubai, Toronto — and sometimes a café in Goa. The output is the meeting." },
      { k: "03", title: "Craft over speed", body: "We ship weekly, but we don't ship sloppy. Every deliverable ends with a review round that's honest about what's not yet good enough." },
      { k: "04", title: "Balance over burnout", body: "Empires are built on rested people. Flexible time off, no meeting Fridays, and a founder who reads \"rest\" as \"investment.\"" },
    ],
  },
  lifeAtEpigroww: {
    label: "— Life at Epigroww",
    headingPrefix: "Four cities. One",
    headingAccent: "operating tempo.",
    intro: "We're remote-first but not remote-only. Each studio holds a heartbeat — Delhi for media, Mumbai for creative, Dubai for MENA accounts, Toronto for North America.",
    // gallery left empty — admin can upload photos via the Media collection
  },
  benefits: {
    label: "— Perks & benefits",
    headingPrefix: "The real list.",
    headingAccent: "No fine print.",
    items: [
      { k: "01", icon: "✚", title: "Fully paid health", body: "Medical, dental, vision — covered 100% for employees. Family cover at a deeply discounted rate." },
      { k: "02", icon: "◉", title: "Mental health & wellness", body: "Annual wellness budget, therapy reimbursement, and a no-questions mental-health day policy." },
      { k: "03", icon: "∞", title: "Flexible time off", body: "Take the time you need, when you need it — no minimums, no maximums, no awkward approvals." },
      { k: "04", icon: "✦", title: "Paid company holidays", body: "National holidays off by default — plus four additional paid 'rest weeks' throughout the year." },
      { k: "05", icon: "◇", title: "Annual team trip", body: "An all-expenses-paid retreat somewhere interesting. Past years: Udaipur, Da Nang, Tulum." },
      { k: "06", icon: "⌂", title: "Remote-first, always", body: "Work from anywhere in your time zone. Home-office setup stipend on day one." },
      { k: "07", icon: "✎", title: "Learning & growth", body: "Annual learning budget for courses, conferences, books — plus internal mobility across pods." },
      { k: "08", icon: "◆", title: "Top-of-market equity", body: "Every full-time hire gets meaningful equity on a four-year vest with a one-year cliff." },
    ],
  },
  openRolesSection: {
    label: "— Open roles",
    headingPrefix: "12 current openings.",
    headingAccent: "Find yours.",
  },
  applyBar: {
    label: "— Don't see your role?",
    headingPrefix: "Share your profile.",
    headingAccent: "We keep it on file",
    headingSuffix: "for the next wave.",
    body: "We open roles in waves — every quarter. If you're the kind of person who'd be a hire before there's a job title for you, drop us a note.",
  },
  seo: {
    seoTitle: "Careers — Epigroww Global",
    seoDescription: "12 open roles across Media, Brand, Tech and Operations. Remote-first, four studios, 22 nationalities.",
  },
});

await setGlobal("contact-page", {
  hero: {
    kickerLeft: "08 · Contact",
    kickerRight: "Reply in under 24 hours",
    headingPrefix: "You made it",
    headingAccent: "all the way",
    headingSuffix: "here.",
    sub: "Four studios, one inbox. If you've got a brief — a vague one, a specific one, a three-hundred-million one — we'd love to read it.",
  },
  directLines: {
    label: "— Direct lines",
    noteText: "Most briefs get a human reply within 24 hours. Serious ones, within 4 hours of Delhi / Dubai business hours.",
  },
  briefForm: {
    topics: [
      { value: "media", label: "Media / Performance", blurb: "$10K+/mo ad spend brief" },
      { value: "brand", label: "Brand / Creative", blurb: "Launches, films, identity" },
      { value: "tech", label: "Tech / Engineering", blurb: "Build, migrate, or automate" },
      { value: "partnership", label: "Partnership", blurb: "Press, collabs, co-sell" },
      { value: "careers", label: "Careers", blurb: "Hiring is on /careers — still welcome" },
      { value: "other", label: "Something else", blurb: "Say hi" },
    ],
    budgets: ["< $10K", "$10K – $50K", "$50K – $250K", "$250K+", "Not sure yet"].map((label) => ({ label })),
    thanksHeading: "Brief received.",
    thanksBody: "A human — not an auto-responder — will read this and reply within 24 hours.",
  },
  officesSection: {
    label: "— Four studios",
    headingPrefix: "Where to find us",
    headingAccent: "in the flesh.",
  },
  faqSection: {
    label: "— Quick answers",
    heading: "Before you send the brief.",
  },
  seo: {
    seoTitle: "Contact — Epigroww Global",
    seoDescription: "Four studios, one inbox. Send the brief — a human replies in under 24 hours.",
  },
});

/* ─── Service pages ──────────────────────────────────────────────────── */

await setGlobal("media-solutions-page", {
  hero: {
    pillarLabel: "Media Solutions",
    pillarNum: "04",
    status: "Now accepting Q3 · Q4 2026 engagements",
    headingStart: "Paid media that",
    headingAccent: "compounds",
    headingEnd: "— not just converts.",
    lede: "A full-funnel paid media engine — Meta, Google, Amazon, DV360, CTV and owned — engineered around incrementality and tuned daily. No last-click theatre, no vanity dashboards.",
    stats: [
      { num: "$1B+", label: "Managed media spend" },
      { num: "300+", label: "Campaigns last 12 mo" },
      { num: "37%", label: "Avg. CAC reduction" },
    ],
    variant: "media",
  },
  caps: {
    capsTitle: "Six channels.",
    capsAccent: "One scoreboard.",
    capsIntro: "Every pod has a direct line from media spend to revenue in your P&L. No separate teams for Meta vs. Amazon vs. CRM — just one scorecard, updated weekly.",
    capabilities: [
      { icon: "◐", title: "Paid Social & Search", body: "Meta, Google, LinkedIn, TikTok, Snap — one pod, one scorecard, one source of truth for CAC.", chips: [{label:"Meta"},{label:"Google"},{label:"TikTok"},{label:"LinkedIn"}] },
      { icon: "▲", title: "Marketplace Management", body: "Amazon, Flipkart, Noon, Myntra — listing, PPC, store creatives, and full P&L visibility.", chips: [{label:"Amazon"},{label:"Flipkart"},{label:"Noon"},{label:"Myntra"}] },
      { icon: "◆", title: "Programmatic & Display", body: "DV360, TTD, native, rich-media — precision in every impression, priced to beat walled gardens.", chips: [{label:"DV360"},{label:"TTD"},{label:"Native"},{label:"DOOH"}] },
      { icon: "●", title: "OTT & CTV Distribution", body: "Hotstar, Prime, Netflix Ads, YouTube Prime Time — streaming success, redefined.", chips: [{label:"Hotstar"},{label:"Netflix Ads"},{label:"Prime"},{label:"YT CTV"}] },
      { icon: "▣", title: "Retention & CRM", body: "Email, SMS, WhatsApp, push — second-purchase engines that out-earn your acquisition spend.", chips: [{label:"Klaviyo"},{label:"MoEngage"},{label:"WebEngage"},{label:"Braze"}] },
      { icon: "✦", title: "Measurement & Incrementality", body: "Geo-holdouts, MMM, MTA, conversion APIs — so the scorecard you read is the truth, not the story.", chips: [{label:"MMM"},{label:"MTA"},{label:"Incrementality"},{label:"CAPI"}] },
    ],
  },
  approach: {
    approachSubtitle: "The operating system",
    approachTitle: "Omni-channel. Data-backed. Creative-fueled.",
    approachSteps: [
      { title: "Omni-channel from day one", body: "Customers consult an average of 10 sources and 90% switch between devices. We plan across the entire journey, not just the last-click touchpoint.", icon: "↗" },
      { title: "Data-backed, not opinion-backed", body: "Every channel mix ships with a scorecard, incrementality plan, and a kill-switch. Opinions are the starting point; data is the referee.", icon: "※" },
      { title: "Creative-fueled, always", body: "Winning performance is 70% creative. Our in-house studio produces 100+ creatives a week — and kills losers within 48 hours.", icon: "◉" },
      { title: "Engineered for compounding", body: "Winners move to evergreen, retention flows catch second-purchase, referral loops pay back CAC. Compounding, not spiking.", icon: "∞" },
    ],
  },
  footer: {
    voicesTitle: "Clients who let the numbers speak.",
    voiceRefs: mediaVoiceIds,
    ctaEyebrow: "— Media starts here",
    ctaHeading: "Ready to turn paid media into your most reliable growth compounder?",
    ctaAccent: "most reliable growth compounder",
  },
  seo: {
    seoTitle: "Media Solutions — Epigroww Global",
    seoDescription: "Omni-channel paid media that earns its CAC. Paid social, search, programmatic, OTT, marketplaces, and retention — always-on and live-tuned.",
  },
  // Channel matrix (Media-only block) — collapsible, leaving empty for now
});

await setGlobal("brand-solutions-page", {
  hero: {
    pillarLabel: "Brand Solutions",
    pillarNum: "05",
    status: "Now accepting Q3 · Q4 2026 engagements",
    headingStart: "From copies to",
    headingAccent: "blockbuster",
    headingEnd: "TVC commercials.",
    lede: "An award-winning creative house that sits at the brand × performance intersection — producing 100+ pieces of work a week, across static, motion, film, CGI and UGC, without once blinking on craft.",
    stats: [
      { num: "100+", label: "Creatives weekly" },
      { num: "250+", label: "Brand collaborations" },
      { num: "1000+", label: "Creators on tap" },
    ],
    variant: "brand",
  },
  caps: {
    capsTitle: "Nine studios,",
    capsAccent: "one creative engine.",
    capsIntro: "Whether it's a 6-second hook or a 90-second TVC, it ships from the same team — writers, art directors, film-makers, CGI artists, editors — all in the same Slack channel.",
    capabilities: [
      { icon: "◆", title: "Creative Suite — Performance Ads", body: "The weekly 100-creative engine that powers our paid media. Iteration speed, locked craft.", chips: [{label:"Static"},{label:"Motion"},{label:"UGC-style"}] },
      { icon: "▣", title: "Creative Suite — Marketplaces", body: "A+ pages, brand stores, catalog imagery, video modules — tuned to convert on page, not dashboards.", chips: [{label:"Amazon"},{label:"Flipkart"},{label:"Shopify"}] },
      { icon: "◉", title: "Influencer Marketing", body: "1,000+ creator network. Macro, mid, nano — curated, contracted, and measured by incrementality.", chips: [{label:"Macro"},{label:"Mid"},{label:"Nano"}] },
      { icon: "●", title: "User Generated Ads", body: "Scripted, produced, and edited UGC — the format that beats your best static ad, every quarter.", chips: [{label:"Scripted UGC"},{label:"Reviews"},{label:"Unboxing"}] },
      { icon: "▲", title: "Social Media Marketing", body: "Always-on content, community, reactive creative — built for the feed, not the deck.", chips: [{label:"Always-on"},{label:"Community"},{label:"Reactive"}] },
      { icon: "✦", title: "CGI, Animation & VFX", body: "In-house CGI team — product renders, 3D packs, VFX shorts. When the shot can't be shot, we build it.", chips: [{label:"CGI"},{label:"3D"},{label:"VFX"}] },
      { icon: "❖", title: "Ad Commercials (TVC)", body: "Full-service film production — from scripting to post. The same team across story and edit.", chips: [{label:"TVC"},{label:"Digital films"},{label:"Brand docs"}] },
      { icon: "✧", title: "Celebrity Endorsements", body: "Curation, contracting, creative direction — celebrity partnerships that earn their fee.", chips: [{label:"Celebrity"},{label:"Athletes"},{label:"Regional"}] },
      { icon: "◎", title: "Branding & Packaging", body: "Identity systems, packaging, and the tiny things nobody ships but we do — sonic logos, motion brand kits.", chips: [{label:"Identity"},{label:"Packaging"},{label:"Motion brand"}] },
    ],
  },
  approach: {
    approachSubtitle: "The operating philosophy",
    approachTitle: "Creative sits at the top.",
    approachSteps: [
      { title: "Creative sits at the top", body: "Every engagement starts with a brief that creative owns. Media, tech, and ops orbit the idea — not the other way around.", icon: "◉" },
      { title: "Tested, unified messaging", body: "We build one message architecture and then tune it for channel. One story, nine executions — never nine stories.", icon: "※" },
      { title: "Full-funnel across platforms", body: "Hero film + 24 cut-downs + 120 performance creatives — all planned from day one, none stitched in reverse.", icon: "∞" },
      { title: "Digital × traditional", body: "We bridge TVC, OOH, and digital rather than treating them as separate line items. Your TVC ships 30-sec, 15-sec, 6-sec and performance cut-downs in one production cycle.", icon: "↯" },
    ],
  },
  footer: {
    voicesTitle: "What the brands who trusted us say.",
    voiceRefs: brandVoiceIds,
    ctaEyebrow: "— Brand starts here",
    ctaHeading: "Ready to ship the creative that actually earns its media spend?",
    ctaAccent: "actually earns its media spend",
  },
  seo: {
    seoTitle: "Brand Solutions — Epigroww Global",
    seoDescription: "Creative sits at the top. From copy to TVC commercials, from influencer UGC to CGI — a creative house producing 100+ pieces of work every week.",
  },
});

await setGlobal("tech-solutions-page", {
  hero: {
    pillarLabel: "Tech Solutions",
    pillarNum: "06",
    status: "Now accepting Q3 · Q4 2026 engagements",
    headingStart: "Tech that compounds",
    headingAccent: "quietly",
    headingEnd: "in the background.",
    lede: "Websites that score green. CRMs your team actually uses. Automations that save hours a week. AI assistants that ship. We build the boring things well — so your team can focus on the loud things.",
    stats: [
      { num: "98", label: "Avg. Lighthouse score" },
      { num: "42%", label: "Avg. ops time saved" },
      { num: "0", label: "Downtime migrations" },
    ],
    variant: "tech",
  },
  caps: {
    capsTitle: "Seven",
    capsAccent: "systems that actually ship.",
    capsIntro: "From the website your customer sees to the CRM your team clicks into 200 times a day — we build the whole stack, and we stay on to make sure it keeps earning its keep.",
    capabilities: [
      { icon: "◆", title: "Web Development & Engineering", body: "Next.js, React, WordPress, Shopify, full-stack MERN — shipped with clean code, green scores, and hand-off docs your team can read.", chips: [{label:"Next.js"},{label:"Shopify"},{label:"MERN"}] },
      { icon: "●", title: "Core Web Vitals & Speed", body: "LCP, CLS, INP green. Image pipelines, edge caching, server components — a performance audit that ends in a 98 Lighthouse.", chips: [{label:"LCP"},{label:"INP"},{label:"CLS"}] },
      { icon: "▲", title: "CRM · ERP · Business Systems", body: "Salesforce, HubSpot, Zoho, custom — workflows your sales and ops teams actually use. We ship the change management, not just the config.", chips: [{label:"HubSpot"},{label:"Salesforce"},{label:"Zoho"}] },
      { icon: "◉", title: "Marketing & WhatsApp Automation", body: "Klaviyo, MoEngage, WebEngage, WhatsApp Business API — lifecycle flows that recover carts, upsell, and re-engage on autopilot.", chips: [{label:"Klaviyo"},{label:"WhatsApp API"},{label:"MoEngage"}] },
      { icon: "▣", title: "E-commerce & Marketplace Tech", body: "Shopify Plus, WooCommerce, Amazon/Flipkart integrations — the plumbing that makes D2C and marketplace math work in the same dashboard.", chips: [{label:"Shopify Plus"},{label:"Woo"},{label:"Headless"}] },
      { icon: "✦", title: "Data, Analytics & Reporting", body: "GA4, Looker Studio, BigQuery pipelines — one source of truth dashboards for boards, ops, and media pods alike.", chips: [{label:"GA4"},{label:"Looker"},{label:"BigQuery"}] },
      { icon: "❖", title: "AI Chatbots & Assistants", body: "LLM-powered assistants — customer support, internal ops, knowledge base — shipped with guardrails, evals, and a human-in-loop for edge cases.", chips: [{label:"LLM"},{label:"RAG"},{label:"Guardrails"}] },
    ],
  },
  approach: {
    approachSubtitle: "The engineering principles",
    approachTitle: "Three rules we won't break.",
    approachSteps: [
      { title: "Built for real teams", body: "Systems your team adopts, not systems your team fights. Every build includes training, docs, and 30-60-90 success criteria.", icon: "◉" },
      { title: "Performance first, always", body: "Green Core Web Vitals are the floor, not a stretch goal. Your users, your SEO, and your paid ads all benefit from the same milliseconds.", icon: "⚡" },
      { title: "Automation with control", body: "Automation that your ops team can inspect, override, and extend — not black boxes. Every flow comes with an admin console.", icon: "∞" },
    ],
  },
  footer: {
    voicesTitle: "Teams who now spend less time fighting their tools.",
    voiceRefs: techVoiceIds,
    ctaEyebrow: "— Tech starts here",
    ctaHeading: "Ready to replace the stack that's quietly slowing your growth?",
    ctaAccent: "quietly slowing your growth",
  },
  seo: {
    seoTitle: "Tech Solutions — Epigroww Global",
    seoDescription: "Websites, systems, and automations that stay out of the way. Core Web Vitals greens, CRMs your team actually uses, AI assistants that ship.",
  },
});

await setGlobal("ecommerce-solutions-page", {
  hero: {
    pillarLabel: "Ecommerce Solutions",
    pillarNum: "05",
    status: "Now accepting Q3 · Q4 2026 engagements",
    headingStart: "Commerce that",
    headingAccent: "compounds",
    headingEnd: "from first click to second purchase.",
    lede: "D2C storefronts, marketplace P&Ls, CRO, fulfilment and retention — engineered as one revenue product, not five stitched vendors. Sub-second pages, weekly releases, second-purchase rates that actually move.",
    stats: [
      { num: "120+", label: "Stores shipped" },
      { num: "0.9s", label: "Median LCP" },
      { num: "2.4×", label: "Avg. repeat-purchase lift" },
    ],
    variant: "ecommerce",
  },
  caps: {
    capsTitle: "Six surfaces.",
    capsAccent: "One commerce engine.",
    capsIntro: "Storefront, marketplace, CRO, catalog, retention, payments — one team, one scorecard, one revenue line. The bits your CFO reads agree with the bits your merchandiser ships.",
    capabilities: [
      { icon: "◆", title: "Shopify & D2C Storefronts", body: "Shopify Plus, Headless, and custom Next.js builds. CRO-led, sub-second LCP, theme-as-code so the next campaign ships in days.", chips: [{label:"Shopify Plus"},{label:"Headless"},{label:"Next.js"},{label:"Sanity"}] },
      { icon: "▣", title: "Marketplace Storefronts", body: "Amazon Brand Stores, Flipkart, Myntra, Noon — A+ content, video modules, and creative tuned to convert in-feed.", chips: [{label:"Amazon A+"},{label:"Flipkart"},{label:"Myntra"},{label:"Noon"}] },
      { icon: "◉", title: "Conversion Rate Optimization", body: "PDP audits, funnel teardowns, on-site search, exit-intent flows — every percentage point of lift compounds into the LTV line.", chips: [{label:"A/B testing"},{label:"Heatmaps"},{label:"PDP CRO"},{label:"Funnel"}] },
      { icon: "●", title: "Catalog, OMS & Fulfilment", body: "PIM, OMS, WMS, and 3PL integrations. Stock, pricing, and SKU sanity stitched into one source of truth.", chips: [{label:"PIM"},{label:"OMS"},{label:"WMS"},{label:"3PL"}] },
      { icon: "▲", title: "Retention & Lifecycle", body: "Email, SMS, WhatsApp, loyalty — second-purchase engines that out-earn your acquisition spend by month four.", chips: [{label:"Klaviyo"},{label:"MoEngage"},{label:"WhatsApp"},{label:"Loyalty"}] },
      { icon: "✦", title: "Payments, Cart & Checkout", body: "Local payment rails, one-page checkout, BNPL, COD recovery, address intelligence — engineered against drop-off, not for it.", chips: [{label:"Razorpay"},{label:"Stripe"},{label:"BNPL"},{label:"COD"}] },
    ],
  },
  approach: {
    approachSubtitle: "The operating philosophy",
    approachTitle: "Storefront-as-product. Funnel-first.",
    approachSteps: [
      { title: "Storefront as a revenue product", body: "We treat your storefront like a software product — releases, instrumentation, weekly metric reviews. Not a one-off 'project'.", icon: "↗" },
      { title: "Funnel-first, not feature-first", body: "Every roadmap item earns its slot against a funnel KPI. Vanity features get killed before the sprint starts.", icon: "※" },
      { title: "Creative + commerce, same pod", body: "PDP copy, hero films, lifecycle creatives — produced by the same studio shipping your media. Brand voice never leaks.", icon: "◉" },
      { title: "Compounds via retention", body: "Acquisition pays the first order. Retention pays the brand. We engineer for second-purchase from day one.", icon: "∞" },
    ],
  },
  footer: {
    voicesTitle: "Operators who compounded with us.",
    voiceRefs: ecomVoiceIds,
    ctaEyebrow: "— Commerce starts here",
    ctaHeading: "Ready to make your storefront the most reliable line on your P&L?",
    ctaAccent: "most reliable line on your P&L",
  },
  seo: {
    seoTitle: "Ecommerce Solutions — Epigroww Global",
    seoDescription: "End-to-end D2C and marketplace commerce — Shopify, custom storefronts, marketplace P&Ls, CRO, fulfilment integrations and retention engines.",
  },
});

console.log("\n" + "═".repeat(64));
console.log("  ✓ Day 3 seed complete");
console.log("═".repeat(64) + "\n");
process.exit(0);
