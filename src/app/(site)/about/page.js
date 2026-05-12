import AboutHero from "../../../../components/about/AboutHero";
import AboutManifesto from "../../../../components/about/AboutManifesto";
import VisionBlock from "../../../../components/about/VisionBlock";
import Values from "../../../../components/about/Values";
import Timeline from "../../../../components/about/Timeline";
import Team from "../../../../components/about/Team";
import Diversity from "../../../../components/about/Diversity";
import CTA from "../../../../components/shared/CTA";
import { getAboutData } from "../../../../lib/fetchers";

export const revalidate = 60;

export async function generateMetadata() {
  const { about } = await getAboutData();
  return {
    title: about?.footerCtaSeo?.seoTitle || "About — Epigroww Global",
    description:
      about?.footerCtaSeo?.seoDescription ||
      "Minority-founded in 2021. 100+ specialists across Delhi, Mumbai, Dubai & Toronto.",
  };
}

export default async function AboutPage() {
  const { about } = await getAboutData();
  return (
    <>
      <AboutHero data={about?.hero} />
      <AboutManifesto data={about?.manifesto} />
      <VisionBlock data={about?.visionBlock} />
      <Values data={about?.values} />
      <Timeline data={about?.timeline} />
      <Team data={about?.team} />
      <Diversity data={about?.diversity} />
      <CTA
        eyebrow={about?.footerCtaSeo?.ctaEyebrow || "— Join the story"}
        heading={about?.footerCtaSeo?.ctaHeading || "Partner with the team quietly building the next global agency."}
        accent={about?.footerCtaSeo?.ctaAccent || "next global agency"}
      />
    </>
  );
}
