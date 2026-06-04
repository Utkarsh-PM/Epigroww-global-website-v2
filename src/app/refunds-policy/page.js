import LegalPage from "../../../components/legal/LegalPage";

export const metadata = {
  title: "Refund & Cancellation Policy — Epigroww Global",
  description:
    "How Epigroww Global Private Limited handles refund approvals and processing timelines for services delivered through epigrowwglobal.com.",
  alternates: { canonical: "/refunds-policy" },
};

const sections = [
  {
    id: "approval",
    heading: "Refund Approval",
    body: (
      <p>
        Refunds are subject to the approval of delivery and the scope of the service contract signed at the time of
        onboarding. Each request is reviewed against the deliverables and milestones agreed upon in that contract.
      </p>
    ),
  },
  {
    id: "processing-timeline",
    heading: "Processing Timeline",
    body: (
      <p>
        In case of any refund approved by Epigroww Global Private Limited, it will take{" "}
        <strong>7–10 business days</strong> for the refund to be processed to you from the date of approval.
      </p>
    ),
  },
  {
    id: "credit",
    heading: "Credit to Original Payment Method",
    body: (
      <p>
        Once a refund is approved, your refund will be processed and a credit will automatically be applied to your
        original method of payment within <strong>7–10 business days</strong>. The exact time may vary depending on
        your bank or card issuer.
      </p>
    ),
  },
  {
    id: "questions",
    heading: "Questions about a Refund",
    body: (
      <p>
        If you have not received your refund within the timelines above, or have any questions about your billing,
        please reach out via the <a href="/contact">contact page</a> and our team will respond within one business
        day.
      </p>
    ),
  },
];

export default function RefundsPolicyPage() {
  return (
    <LegalPage
      kicker="Legal · 03 Refunds"
      eyebrow="— Legal"
      title="Refund & Cancellation Policy"
      lastUpdated="May 2026"
      intro="How refund requests are reviewed, approved and processed for services delivered by Epigroww Global Private Limited."
      sections={sections}
    />
  );
}
