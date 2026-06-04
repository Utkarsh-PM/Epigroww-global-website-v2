import AboutHero from "../../../components/about/AboutHero";
import AboutManifesto from "../../../components/about/AboutManifesto";
import VisionBlock from "../../../components/about/VisionBlock";
import Values from "../../../components/about/Values";
import Timeline from "../../../components/about/Timeline";
import Team from "../../../components/about/Team";
import Diversity from "../../../components/about/Diversity";
import CTA from "../../../components/shared/CTA";

export const metadata = {
  title: "About — Epigroww Global",
  description: "Independent agency founded in 2021. 50+ specialists across Delhi, Mumbai, Dubai & Toronto. Our mission is to become the world's most trusted growth partner.",
  alternates: { canonical: "/about" },
};

export default function AboutPage() {
  return (
    <>
      <AboutHero />
      <AboutManifesto />
      <VisionBlock />
      <Values />
      <Timeline />
      <Team />
      <Diversity />
      <CTA
        eyebrow="— Join the story"
        heading="Partner with the team quietly building the next global agency."
        accent="next global agency"
      />
    </>
  );
}
