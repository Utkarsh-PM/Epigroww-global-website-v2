import Hero from "../../../components/home/Hero";
import Showreel from "../../../components/home/Showreel";
import Manifesto from "../../../components/home/Manifesto";
import GrowthEngine from "../../../components/home/GrowthEngine";
import Pillars from "../../../components/home/Pillars";
import LivePulse from "../../../components/home/LivePulse";
import FeaturedWork from "../../../components/home/FeaturedWork";
import Approach from "../../../components/home/Approach";
import GlobalFootprint from "../../../components/home/GlobalFootprint";
import Voices from "../../../components/home/Voices";
import LogoBand from "../../../components/home/LogoBand";
import CTA from "../../../components/shared/CTA";
import { getHomeData } from "../../../lib/fetchers";

// 60-second ISR — CMS edits show on the live site within a minute.
export const revalidate = 60;

export async function generateMetadata() {
  const { home, siteSettings } = await getHomeData();
  return {
    title: home?.seo?.seoTitle || siteSettings?.defaultTitle || "Epigroww Global",
    description:
      home?.seo?.seoDescription ||
      siteSettings?.defaultDescription ||
      "Integrated growth partner — brand, media, tech.",
  };
}

export default async function Home() {
  const { home, voices, featured } = await getHomeData();
  const pillars = home?.growthEngine?.pillarRefs || [];
  return (
    <>
      <Hero data={home?.hero} />
      <Showreel data={home?.showreel} />
      <Manifesto data={home?.manifesto} />
      <GrowthEngine data={home?.growthEngine} pillars={pillars} />
      <Pillars pillars={pillars} />
      <LivePulse data={home?.livePulse} />
      <FeaturedWork cases={featured} />
      <Approach data={home?.approach} />
      <GlobalFootprint />
      <Voices voices={voices} data={home?.voicesFooterCta} />
      <LogoBand data={home?.logoBand} />
      <CTA
        eyebrow={home?.voicesFooterCta?.ctaEyebrow || "— Your next chapter"}
        heading={home?.voicesFooterCta?.ctaHeading || "Engineer your next growth chapter with us."}
        accent={home?.voicesFooterCta?.ctaAccent || "next growth chapter"}
      />
    </>
  );
}
