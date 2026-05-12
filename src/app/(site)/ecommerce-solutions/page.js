import ServiceHero from "../../../../components/service/ServiceHero";
import CapabilityGrid from "../../../../components/service/CapabilityGrid";
import ServiceApproach from "../../../../components/service/ServiceApproach";
import ServiceVoices from "../../../../components/service/ServiceVoices";
import CTA from "../../../../components/shared/CTA";
import { getEcomData } from "../../../../lib/fetchers";

export const revalidate = 60;

export async function generateMetadata() {
  const { page } = await getEcomData();
  return {
    title: page?.seo?.seoTitle || "Ecommerce Solutions — Epigroww Global",
    description: page?.seo?.seoDescription || "End-to-end D2C and marketplace commerce.",
  };
}

const mapVoices = (rows) => (rows || []).map((v) => ({
  quote: v.quote || "", name: (v.name || "").split(" — ")[0], role: v.role || "", tag: v.tag || "",
}));
const mapCaps = (rows) => (rows || []).map((c) => ({
  icon: c.icon || "", title: c.title || "", body: c.body || "",
  chips: (c.chips || []).map((x) => x.label),
}));
const mapSteps = (rows) => (rows || []).map((s) => ({
  title: s.title || "", body: s.body || "", icon: s.icon || "",
}));

export default async function EcommerceSolutionsPage() {
  const { page, voices } = await getEcomData();
  const hero = page?.hero || {};
  const caps = page?.caps || {};
  const approach = page?.approach || {};
  const footer = page?.footer || {};
  return (
    <>
      <ServiceHero
        pillarLabel={hero.pillarLabel || "Ecommerce Solutions"}
        pillarNum={hero.pillarNum || "05"}
        headingStart={hero.headingStart || "Commerce that"}
        headingAccent={hero.headingAccent || "compounds"}
        headingEnd={hero.headingEnd || "from first click to second purchase."}
        lede={hero.lede || ""}
        stats={hero.stats || []}
        variant={hero.variant || "ecommerce"}
      />
      <CapabilityGrid
        title={caps.capsTitle || "Six surfaces."}
        accent={caps.capsAccent || "One commerce engine."}
        intro={caps.capsIntro || ""}
        items={mapCaps(caps.capabilities)}
      />
      <ServiceApproach
        title={approach.approachTitle || "Storefront-as-product. Funnel-first."}
        subtitle={approach.approachSubtitle || "The operating philosophy"}
        steps={mapSteps(approach.approachSteps)}
      />
      <ServiceVoices
        title={footer.voicesTitle || "Operators who compounded with us."}
        voices={mapVoices(voices)}
      />
      <CTA
        eyebrow={footer.ctaEyebrow || "— Commerce starts here"}
        heading={footer.ctaHeading || "Ready to make your storefront the most reliable line on your P&L?"}
        accent={footer.ctaAccent || "most reliable line on your P&L"}
      />
    </>
  );
}
