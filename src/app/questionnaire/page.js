import QuestionnaireHero from "../../../components/questionnaire/QuestionnaireHero";
import QuestionnaireForm from "../../../components/questionnaire/QuestionnaireForm";
import { BreadcrumbJsonLd } from "../../../components/seo/JsonLd";

export const metadata = {
  title: "Brand Discovery Questionnaire — Epigroww Global",
  description:
    "Answer the Epigroww Global brand discovery questionnaire so we can build a tailored go-to-market, route-to-market, branding and media strategy for your India launch.",
  keywords: [
    "brand discovery questionnaire",
    "India market launch strategy",
    "go to market questionnaire",
    "route to market India",
    "brand launch brief",
    "Epigroww Global",
  ],
  alternates: { canonical: "/questionnaire" },
  openGraph: {
    type: "website",
    url: "https://epigrowwglobal.com/questionnaire",
    title: "Brand Discovery Questionnaire — Epigroww Global",
    description:
      "Eighteen questions that shape your go-to-market, route-to-market, branding and media strategy.",
  },
};

export default function QuestionnairePage() {
  return (
    <>
      <BreadcrumbJsonLd
        items={[
          { name: "Home", path: "/" },
          { name: "Brand Discovery Questionnaire", path: "/questionnaire" },
        ]}
      />
      <QuestionnaireHero />
      <QuestionnaireForm />
    </>
  );
}
