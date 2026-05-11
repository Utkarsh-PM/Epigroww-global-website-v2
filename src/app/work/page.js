import WorkHero from "../../../components/work/WorkHero";
import ResultsBand from "../../../components/work/ResultsBand";
import CaseGrid from "../../../components/work/CaseGrid";
import IndustryBand from "../../../components/work/IndustryBand";
import CTA from "../../../components/shared/CTA";

export const metadata = {
  title: "Work — Epigroww Global",
  description: "Case studies and campaigns across Media, Brand and Tech. 500+ brands, 40+ industries, four continents.",
};

export default function WorkPage() {
  return (
    <>
      <WorkHero />
      <ResultsBand />
      <CaseGrid />
      <IndustryBand />
      <CTA
        eyebrow="— More in the vault"
        heading="The juicy stuff lives in the deck. Ask for it."
        accent="the juicy stuff"
        ctaText="Request the case book"
        ctaHref="/contact"
      />
    </>
  );
}
