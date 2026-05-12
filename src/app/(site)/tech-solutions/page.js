import ServiceHero from "../../../../components/service/ServiceHero";
import CapabilityGrid from "../../../../components/service/CapabilityGrid";
import TerminalLive from "../../../../components/service/TerminalLive";
import StackShowcase from "../../../../components/service/StackShowcase";
import ServiceApproach from "../../../../components/service/ServiceApproach";
import ServiceVoices from "../../../../components/service/ServiceVoices";
import CTA from "../../../../components/shared/CTA";
import { getTechData } from "../../../../lib/fetchers";

export const revalidate = 60;

export async function generateMetadata() {
  const { page } = await getTechData();
  return {
    title: page?.seo?.seoTitle || "Tech Solutions — Epigroww Global",
    description: page?.seo?.seoDescription || "Tech that stays out of the way.",
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

export default async function TechSolutionsPage() {
  const { page, voices } = await getTechData();
  const hero = page?.hero || {};
  const caps = page?.caps || {};
  const approach = page?.approach || {};
  const footer = page?.footer || {};
  return (
    <>
      <ServiceHero
        pillarLabel={hero.pillarLabel || "Tech Solutions"}
        pillarNum={hero.pillarNum || "06"}
        headingStart={hero.headingStart || "Tech that compounds"}
        headingAccent={hero.headingAccent || "quietly"}
        headingEnd={hero.headingEnd || "in the background."}
        lede={hero.lede || ""}
        stats={hero.stats || []}
        variant={hero.variant || "tech"}
      />
      <CapabilityGrid
        title={caps.capsTitle || "Seven"}
        accent={caps.capsAccent || "systems that actually ship."}
        intro={caps.capsIntro || ""}
        items={mapCaps(caps.capabilities)}
        variant="tech"
      />
      <TerminalLive />
      <StackShowcase />
      <ServiceApproach
        title={approach.approachTitle || "Three rules we won't break."}
        subtitle={approach.approachSubtitle || "The engineering principles"}
        steps={mapSteps(approach.approachSteps)}
      />
      <ServiceVoices
        title={footer.voicesTitle || "Teams who now spend less time fighting their tools."}
        voices={mapVoices(voices)}
      />
      <CTA
        eyebrow={footer.ctaEyebrow || "— Tech starts here"}
        heading={footer.ctaHeading || "Ready to replace the stack that's quietly slowing your growth?"}
        accent={footer.ctaAccent || "quietly slowing your growth"}
      />
    </>
  );
}
