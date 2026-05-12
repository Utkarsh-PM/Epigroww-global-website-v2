import Hero from "../../components/home/Hero";
import BrandMarquee from "../../components/home/BrandMarquee";
import Showreel from "../../components/home/Showreel";
import Manifesto from "../../components/home/Manifesto";
import GrowthEngine from "../../components/home/GrowthEngine";
import Pillars from "../../components/home/Pillars";
import LivePulse from "../../components/home/LivePulse";
import ProofInMotion from "../../components/home/ProofInMotion";
import FeaturedWork from "../../components/home/FeaturedWork";
import Approach from "../../components/home/Approach";
import GlobalFootprint from "../../components/home/GlobalFootprint";
import Voices from "../../components/home/Voices";
import LogoBand from "../../components/home/LogoBand";
import CTA from "../../components/shared/CTA";

export default function Home() {
  return (
    <>
      <Hero />
      <BrandMarquee />
      <Showreel />
      <Manifesto />
      <GrowthEngine />
      <Pillars />
      <LivePulse />
      <FeaturedWork />
      <Approach />
      <GlobalFootprint />
      <Voices />
      <LogoBand />
      <CTA
        eyebrow="— Your next chapter"
        heading="Engineer your next growth chapter with us."
        accent="next growth chapter"
      />
    </>
  );
}
