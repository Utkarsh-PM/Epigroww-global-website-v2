import ContactHero from "../../../components/contact/ContactHero";
import ContactStage from "../../../components/contact/ContactStage";
import OfficesList from "../../../components/contact/OfficesList";
import ContactFAQ from "../../../components/contact/ContactFAQ";
import { OfficesJsonLd } from "../../../components/seo/JsonLd";

export const metadata = {
  title: "Contact — Epigroww Global",
  description: "Get in touch with Epigroww Global. Two studios, one inbox. We answer every serious brief within 24 hours.",
  alternates: { canonical: "/contact" },
};

export default function ContactPage() {
  return (
    <>
      <OfficesJsonLd />
      <ContactHero />
      <ContactStage />
      <OfficesList />
      <ContactFAQ />
    </>
  );
}
