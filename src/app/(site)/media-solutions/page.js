import ServiceHero from "../../../../components/service/ServiceHero";
import CapabilityGrid from "../../../../components/service/CapabilityGrid";
import ServiceApproach from "../../../../components/service/ServiceApproach";
import ServiceVoices from "../../../../components/service/ServiceVoices";
import ChannelMatrix from "../../../../components/service/ChannelMatrix";
import CTA from "../../../../components/shared/CTA";
import { getMediaData } from "../../../../lib/fetchers";

export const revalidate = 60;

export async function generateMetadata() {
  const { page } = await getMediaData();
  return {
    title: page?.seo?.seoTitle || "Media Solutions — Epigroww Global",
    description: page?.seo?.seoDescription || "Omni-channel paid media that earns its CAC.",
  };
}

// Map CMS voice docs → the shape ServiceVoices expects ({quote,name,role,tag})
function mapVoices(rows) {
  return (rows || []).map((v) => ({
    quote: v.quote || "",
    name: (v.name || "").split(" — ")[0],
    role: v.role || "",
    tag: v.tag || "",
  }));
}

// Map CMS capabilities → CapabilityGrid items ({icon,title,body,chips:[]})
function mapCaps(rows) {
  return (rows || []).map((c) => ({
    icon: c.icon || "",
    title: c.title || "",
    body: c.body || "",
    chips: (c.chips || []).map((x) => x.label),
  }));
}

// Map approach steps → ServiceApproach steps ({title,body,icon})
function mapSteps(rows) {
  return (rows || []).map((s) => ({
    title: s.title || "",
    body: s.body || "",
    icon: s.icon || "",
  }));
}

export default async function MediaSolutionsPage() {
  const { page, voices } = await getMediaData();
  const hero = page?.hero || {};
  const caps = page?.caps || {};
  const approach = page?.approach || {};
  const footer = page?.footer || {};
  return (
    <>
      <ServiceHero
        pillarLabel={hero.pillarLabel || "Media Solutions"}
        pillarNum={hero.pillarNum || "04"}
        headingStart={hero.headingStart || "Paid media that"}
        headingAccent={hero.headingAccent || "compounds"}
        headingEnd={hero.headingEnd || "— not just converts."}
        lede={hero.lede || ""}
        stats={hero.stats || []}
        variant={hero.variant || "media"}
      />
      <CapabilityGrid
        title={caps.capsTitle || "Six channels."}
        accent={caps.capsAccent || "One scoreboard."}
        intro={caps.capsIntro || ""}
        items={mapCaps(caps.capabilities)}
      />
      <ChannelMatrix />
      <ServiceApproach
        title={approach.approachTitle || "Omni-channel. Data-backed. Creative-fueled."}
        subtitle={approach.approachSubtitle || "The operating system"}
        steps={mapSteps(approach.approachSteps)}
      />
      <ServiceVoices
        title={footer.voicesTitle || "Clients who let the numbers speak."}
        voices={mapVoices(voices)}
      />
      <CTA
        eyebrow={footer.ctaEyebrow || "— Media starts here"}
        heading={footer.ctaHeading || "Ready to turn paid media into your most reliable growth compounder?"}
        accent={footer.ctaAccent || "most reliable growth compounder"}
      />
    </>
  );
}
