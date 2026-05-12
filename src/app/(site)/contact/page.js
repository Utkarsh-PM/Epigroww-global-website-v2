import ContactHero from "../../../../components/contact/ContactHero";
import ContactStage from "../../../../components/contact/ContactStage";
import OfficesList from "../../../../components/contact/OfficesList";
import ContactFAQ from "../../../../components/contact/ContactFAQ";
import { getContactData } from "../../../../lib/fetchers";

export const revalidate = 60;

export async function generateMetadata() {
  const { contact } = await getContactData();
  return {
    title: contact?.seo?.seoTitle || "Contact — Epigroww Global",
    description:
      contact?.seo?.seoDescription ||
      "Get in touch with Epigroww Global. Four studios, one inbox.",
  };
}

export default async function ContactPage() {
  const { contact, offices, faqs, siteSettings } = await getContactData();
  return (
    <>
      <ContactHero data={contact?.hero} />
      <ContactStage data={contact?.directLines} form={contact?.briefForm} siteSettings={siteSettings} />
      <OfficesList data={contact?.officesSection} offices={offices} />
      <ContactFAQ data={contact?.faqSection} faqs={faqs} />
    </>
  );
}
