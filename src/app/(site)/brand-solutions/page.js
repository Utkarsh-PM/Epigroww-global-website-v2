import ServiceHero from "../../../../components/service/ServiceHero";
import CreativeReel from "../../../../components/service/CreativeReel";
import BeforeAfter from "../../../../components/service/BeforeAfter";
import CapabilityGrid from "../../../../components/service/CapabilityGrid";
import ServiceApproach from "../../../../components/service/ServiceApproach";
import ServiceVoices from "../../../../components/service/ServiceVoices";
import CTA from "../../../../components/shared/CTA";
import { getBrandData } from "../../../../lib/fetchers";

export const revalidate = 60;

export async function generateMetadata() {
  const { page } = await getBrandData();
  return {
    title: page?.seo?.seoTitle || "Brand Solutions — Epigroww Global",
    description: page?.seo?.seoDescription || "Creative sits at the top.",
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

export default async function BrandSolutionsPage() {
  const { page, voices } = await getBrandData();
  const hero = page?.hero || {};
  const caps = page?.caps || {};
  const approach = page?.approach || {};
  const footer = page?.footer || {};
  return (
    <>
      <ServiceHero
        pillarLabel={hero.pillarLabel || "Brand Solutions"}
        pillarNum={hero.pillarNum || "05"}
        headingStart={hero.headingStart || "From copies to"}
        headingAccent={hero.headingAccent || "blockbuster"}
        headingEnd={hero.headingEnd || "TVC commercials."}
        lede={hero.lede || ""}
        stats={hero.stats || []}
        variant={hero.variant || "brand"}
      />
      <CreativeReel />
      <BeforeAfter />
      <CapabilityGrid
        title={caps.capsTitle || "Nine studios,"}
        accent={caps.capsAccent || "one creative engine."}
        intro={caps.capsIntro || ""}
        items={mapCaps(caps.capabilities)}
        variant="brand"
      />
      <ServiceApproach
        title={approach.approachTitle || "Creative sits at the top."}
        subtitle={approach.approachSubtitle || "The operating philosophy"}
        steps={mapSteps(approach.approachSteps)}
      />
      <ServiceVoices
        title={footer.voicesTitle || "What the brands who trusted us say."}
        voices={mapVoices(voices)}
      />
      <CTA
        eyebrow={footer.ctaEyebrow || "— Brand starts here"}
        heading={footer.ctaHeading || "Ready to ship the creative that actually earns its media spend?"}
        accent={footer.ctaAccent || "actually earns its media spend"}
      />
    </>
  );
}
