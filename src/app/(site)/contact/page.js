import ContactHero from "../../../../components/contact/ContactHero";
import ContactStage from "../../../../components/contact/ContactStage";
import OfficesList from "../../../../components/contact/OfficesList";
import ContactFAQ from "../../../../components/contact/ContactFAQ";

export const metadata = {
  title: "Contact — Epigroww Global",
  description: "Get in touch with Epigroww Global. Four studios, one inbox. We answer every serious brief within 24 hours.",
};

export default function ContactPage() {
  return (
    <>
      <ContactHero />
      <ContactStage />
      <OfficesList />
      <ContactFAQ />
    </>
  );
}
