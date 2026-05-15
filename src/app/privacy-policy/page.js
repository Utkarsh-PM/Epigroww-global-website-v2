import LegalPage from "../../../components/legal/LegalPage";

export const metadata = {
  title: "Privacy Policy — Epigroww Global",
  description:
    "How Epigroww Global Private Limited collects, uses, shares, protects, and processes your personal information through epigrowwglobal.com.",
  alternates: { canonical: "/privacy-policy" },
};

const sections = [
  {
    id: "introduction",
    heading: "Introduction",
    body: (
      <>
        <p>
          This Privacy Policy describes how Epigroww Global Private Limited and its associated entities
          (collectively "Epigroww Global Private Limited", "we", "our", "us") collect, use, share, protect or
          otherwise process your information and personal data through our website{" "}
          <a href="https://epigrowwglobal.com" target="_blank" rel="noopener noreferrer">
            https://epigrowwglobal.com
          </a>{" "}
          (the "Platform").
        </p>
        <p>
          We do not offer products or services for purchase outside India through this Platform, and personal data
          processing primarily occurs within India. By accessing the Platform or providing your information, you
          accept the terms outlined in this Policy and agree that the laws of India shall govern any related disputes.
        </p>
      </>
    ),
  },
  {
    id: "collection",
    heading: "Collection",
    body: (
      <>
        <p>
          We collect personal information when you interact with the Platform. Depending on the nature of the
          interaction, this may include:
        </p>
        <ul>
          <li>Basic data such as name, date of birth, address, telephone or mobile number, and email ID.</li>
          <li>
            Sensitive data such as bank account, credit or debit card or other payment instrument information, or
            biometric information such as facial features or physiological information — collected only with your
            consent.
          </li>
          <li>Behavioural data, including preferences and transaction-related information.</li>
          <li>Information received from business-partner platforms with your authorisation.</li>
        </ul>
        <div className="lp-callout">
          <span className="lp-callout-label">Important</span>
          Never share your debit or credit card PIN, net-banking or mobile-banking password, or any one-time password
          with anyone — including someone claiming to represent Epigroww Global.
        </div>
      </>
    ),
  },
  {
    id: "usage",
    heading: "Usage",
    body: (
      <p>
        We use personal data to deliver the services you request, handle orders, enhance the customer experience,
        resolve disputes, send marketing communications, customise your experience, detect and prevent fraud, enforce
        our Terms, and conduct research and analysis.
      </p>
    ),
  },
  {
    id: "sharing",
    heading: "Sharing",
    body: (
      <p>
        Personal data may be shared with our group entities and corporate associates, sellers, business partners,
        and third-party service providers — including logistics partners and prepaid payment instrument issuers — as
        required to provide our services. We may also disclose information to government agencies and law-enforcement
        authorities when required to do so by applicable law.
      </p>
    ),
  },
  {
    id: "security",
    heading: "Security Precautions",
    body: (
      <p>
        We adopt reasonable security practices and procedures to protect your information from unauthorised access,
        use, disclosure or alteration. However, the transmission of information over the internet is not completely
        secure for reasons beyond our control. You are responsible for safeguarding your login credentials and for
        any activity carried out through your account.
      </p>
    ),
  },
  {
    id: "retention",
    heading: "Data Deletion and Retention",
    body: (
      <>
        <p>
          You may delete your account through the profile settings on the Platform or by contacting us. We retain
          your personal data for a period no longer than is required for the purpose for which it was collected, or
          as required under any applicable law.
        </p>
        <p>
          We may refuse a deletion request where there are open disputes, pending services, or unresolved obligations,
          and may continue to retain anonymised data for research and analytical purposes.
        </p>
      </>
    ),
  },
  {
    id: "rights",
    heading: "Your Rights",
    body: (
      <p>
        You may access, rectify and update your personal data directly through the functionalities provided on the
        Platform. If you need assistance, you can write to our Grievance Officer at the address listed below.
      </p>
    ),
  },
  {
    id: "consent",
    heading: "Consent",
    body: (
      <p>
        By providing your information through the Platform, you consent to its collection, storage, use and
        processing in accordance with this Privacy Policy. You can withdraw your consent at any time by writing to our
        Grievance Officer with the subject line "Withdrawal of consent for processing personal data". Withdrawals are
        not retroactive, and may restrict your ability to access certain services.
      </p>
    ),
  },
  {
    id: "changes",
    heading: "Changes to this Privacy Policy",
    body: (
      <p>
        We may update this Privacy Policy from time to time. Where the changes are significant, we will notify you
        in the manner required by applicable law. We encourage you to review this page periodically to stay informed
        about how we protect your information.
      </p>
    ),
  },
  {
    id: "grievance-officer",
    heading: "Grievance Officer",
    body: (
      <>
        <p>
          In accordance with the Information Technology Act, 2000 and the rules made thereunder, the contact details
          of the Grievance Officer are provided below:
        </p>
        <div className="lp-callout">
          <span className="lp-callout-label">Grievance Officer</span>
          <p><strong>Name:</strong> Vanshika Arora</p>
          <p><strong>Company:</strong> Epigroww Global Pvt Ltd</p>
        </div>
      </>
    ),
  },
];

export default function PrivacyPolicyPage() {
  return (
    <LegalPage
      kicker="Legal · 01 Privacy"
      eyebrow="— Legal"
      title="Privacy Policy"
      lastUpdated="May 2026"
      intro="How we collect, use and protect the information you share with us when you visit epigrowwglobal.com or interact with our services."
      sections={sections}
    />
  );
}
