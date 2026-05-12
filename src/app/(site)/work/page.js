import WorkHero from "../../../../components/work/WorkHero";
import ResultsBand from "../../../../components/work/ResultsBand";
import CaseGrid from "../../../../components/work/CaseGrid";
import IndustryBand from "../../../../components/work/IndustryBand";
import CTA from "../../../../components/shared/CTA";
import { getWorkData } from "../../../../lib/fetchers";

export const revalidate = 60;

export async function generateMetadata() {
  const { work } = await getWorkData();
  return {
    title: work?.footerCtaSeo?.seoTitle || "Work — Epigroww Global",
    description:
      work?.footerCtaSeo?.seoDescription ||
      "Case studies and campaigns across Media, Brand and Tech.",
  };
}

export default async function WorkPage() {
  const { work, cases, industries, kpis } = await getWorkData();
  return (
    <>
      <WorkHero data={work?.hero} />
      <ResultsBand data={work?.resultsBand} kpis={kpis} />
      <CaseGrid data={work?.caseGrid} cases={cases} />
      <IndustryBand data={work?.industryBand} industries={industries} />
      <CTA
        eyebrow={work?.footerCtaSeo?.ctaEyebrow || "— More in the vault"}
        heading={work?.footerCtaSeo?.ctaHeading || "The juicy stuff lives in the deck. Ask for it."}
        accent={work?.footerCtaSeo?.ctaAccent || "the juicy stuff"}
        ctaText={work?.footerCtaSeo?.ctaText || "Request the case book"}
        ctaHref={work?.footerCtaSeo?.ctaHref || "/contact"}
      />
    </>
  );
}
