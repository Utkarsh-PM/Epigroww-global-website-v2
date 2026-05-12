/**
 * Page-level data fetchers.
 * Each function returns *only* the data the matching page needs — keeps
 * server components terse and centralizes the Payload query shapes here.
 *
 * Every page that imports these should also `export const revalidate = 60`
 * so CMS edits propagate to the live site within a minute.
 */
import "server-only";
import { getCms } from "./cms.js";

/* ────────────────────────────────────────────────────────────────
 * Home
 * ──────────────────────────────────────────────────────────────── */
export async function getHomeData() {
  const payload = await getCms();
  const [home, voices, featured, siteSettings] = await Promise.all([
    payload.findGlobal({ slug: "home-page", depth: 2 }),
    payload.find({
      collection: "voices",
      where: { showOnHome: { equals: true } },
      sort: "order",
      limit: 50,
      depth: 0,
    }),
    payload.find({
      collection: "work-cases",
      where: { featuredOnHome: { equals: true } },
      sort: "order",
      limit: 20,
      depth: 1,
    }),
    payload.findGlobal({ slug: "site-settings", depth: 0 }),
  ]);
  return { home, voices: voices.docs, featured: featured.docs, siteSettings };
}

/* ────────────────────────────────────────────────────────────────
 * About
 * ──────────────────────────────────────────────────────────────── */
export async function getAboutData() {
  const payload = await getCms();
  const about = await payload.findGlobal({ slug: "about-page", depth: 2 });
  return { about };
}

/* ────────────────────────────────────────────────────────────────
 * Work
 * ──────────────────────────────────────────────────────────────── */
export async function getWorkData() {
  const payload = await getCms();
  const [work, allCases, industries, kpis] = await Promise.all([
    payload.findGlobal({ slug: "work-page", depth: 2 }),
    payload.find({
      collection: "work-cases",
      sort: "order",
      limit: 100,
      depth: 1,
    }),
    payload.find({
      collection: "industries",
      sort: "order",
      limit: 200,
      depth: 0,
    }),
    // KPI-only entries for the Results band — anything with a resultsBandKpi set
    payload.find({
      collection: "work-cases",
      where: { resultsBandKpi: { exists: true, not_equals: "" } },
      sort: "order",
      limit: 50,
      depth: 0,
    }),
  ]);
  return {
    work,
    cases: allCases.docs.filter((c) => !c.resultsBandKpi || c.order <= 9),
    industries: industries.docs,
    kpis: kpis.docs,
  };
}

/* ────────────────────────────────────────────────────────────────
 * Careers
 * ──────────────────────────────────────────────────────────────── */
export async function getCareersData() {
  const payload = await getCms();
  const [careers, roles] = await Promise.all([
    payload.findGlobal({ slug: "careers-page", depth: 2 }),
    payload.find({
      collection: "open-roles",
      where: { active: { equals: true } },
      sort: "order",
      limit: 100,
      depth: 0,
    }),
  ]);
  return { careers, roles: roles.docs };
}

/* ────────────────────────────────────────────────────────────────
 * Contact
 * ──────────────────────────────────────────────────────────────── */
export async function getContactData() {
  const payload = await getCms();
  const [contact, offices, faqs, siteSettings] = await Promise.all([
    payload.findGlobal({ slug: "contact-page", depth: 2 }),
    payload.find({ collection: "offices", sort: "order", limit: 50, depth: 1 }),
    payload.find({
      collection: "faqs",
      where: { page: { equals: "contact" } },
      sort: "order",
      limit: 50,
      depth: 0,
    }),
    payload.findGlobal({ slug: "site-settings", depth: 0 }),
  ]);
  return {
    contact,
    offices: offices.docs,
    faqs: faqs.docs,
    siteSettings,
  };
}

/* ────────────────────────────────────────────────────────────────
 * Service pages (one helper, swap the slug + voice flag)
 * ──────────────────────────────────────────────────────────────── */
async function getServiceData(globalSlug, voiceFlag) {
  const payload = await getCms();
  const [page, voices] = await Promise.all([
    payload.findGlobal({ slug: globalSlug, depth: 2 }),
    payload.find({
      collection: "voices",
      where: { [voiceFlag]: { equals: true } },
      sort: "order",
      limit: 20,
      depth: 0,
    }),
  ]);
  return { page, voices: voices.docs };
}

export const getMediaData = () => getServiceData("media-solutions-page", "showOnMedia");
export const getBrandData = () => getServiceData("brand-solutions-page", "showOnBrand");
export const getTechData = () => getServiceData("tech-solutions-page", "showOnTech");
export const getEcomData = () => getServiceData("ecommerce-solutions-page", "showOnEcommerce");

/* ────────────────────────────────────────────────────────────────
 * Layout (Nav + Footer) — site-settings + offices for time-zone strip
 * ──────────────────────────────────────────────────────────────── */
export async function getLayoutData() {
  const payload = await getCms();
  const [siteSettings, offices] = await Promise.all([
    payload.findGlobal({ slug: "site-settings", depth: 1 }),
    payload.find({ collection: "offices", sort: "order", limit: 10, depth: 0 }),
  ]);
  return { siteSettings, offices: offices.docs };
}
