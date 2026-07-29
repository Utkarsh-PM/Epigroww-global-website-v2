import CaseStudiesHero from "../../../components/case-studies/CaseStudiesHero";
import CaseLedger from "../../../components/case-studies/CaseLedger";
import CaseDossiers from "../../../components/case-studies/CaseDossiers";
import PlaybookBand from "../../../components/case-studies/PlaybookBand";
import CTA from "../../../components/shared/CTA";
import { BreadcrumbJsonLd } from "../../../components/seo/JsonLd";

export const metadata = {
  title: "Case Studies — Epigroww Global",
  description:
    "Documented growth case studies from Epigroww Global — Mitchell USA, Armaf, Beardo, Dream Beauty, Sonrisa and Birra. The challenge, the strategies implemented, and the numbers they moved.",
  keywords: [
    "marketing agency case studies",
    "performance marketing case study India",
    "D2C growth case study",
    "Amazon marketplace scaling case study",
    "Meta ads ROAS case study",
    "brand launch case study India",
    "Epigroww Global case studies",
  ],
  alternates: { canonical: "/case-studies" },
  openGraph: {
    type: "article",
    url: "https://epigrowwglobal.com/case-studies",
    title: "Case Studies — Epigroww Global",
    description:
      "Six engagements written out in full — the challenge, the plays we ran, and the numbers that moved.",
  },
};

export default function CaseStudiesPage() {
  return (
    <>
      <BreadcrumbJsonLd
        items={[
          { name: "Home", path: "/" },
          { name: "Case Studies", path: "/case-studies" },
        ]}
      />
      <CaseStudiesHero />
      <CaseLedger />
      <CaseDossiers />
      <PlaybookBand />
      <CTA
        eyebrow="— Your file, next"
        heading="Tell us where the brand actually is. We'll tell you what we'd run."
        accent="where the brand actually is"
        ctaText="Start the brand discovery"
        ctaHref="/questionnaire"
      />
    </>
  );
}
