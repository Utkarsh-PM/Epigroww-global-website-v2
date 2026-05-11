import ServiceHero from "../../../components/service/ServiceHero";
import CapabilityGrid from "../../../components/service/CapabilityGrid";
import TerminalLive from "../../../components/service/TerminalLive";
import StackShowcase from "../../../components/service/StackShowcase";
import ServiceApproach from "../../../components/service/ServiceApproach";
import ServiceVoices from "../../../components/service/ServiceVoices";
import CTA from "../../../components/shared/CTA";

export const metadata = {
  title: "Tech Solutions — Epigroww Global",
  description: "Websites, systems, and automations that stay out of the way. Core Web Vitals greens, CRMs your team actually uses, AI assistants that ship.",
};

const CAPS = [
  { icon: "◆", title: "Web Development & Engineering", body: "Next.js, React, WordPress, Shopify, full-stack MERN — shipped with clean code, green scores, and hand-off docs your team can read.", chips: ["Next.js", "Shopify", "MERN"] },
  { icon: "●", title: "Core Web Vitals & Speed", body: "LCP, CLS, INP green. Image pipelines, edge caching, server components — a performance audit that ends in a 98 Lighthouse.", chips: ["LCP", "INP", "CLS"] },
  { icon: "▲", title: "CRM · ERP · Business Systems", body: "Salesforce, HubSpot, Zoho, custom — workflows your sales and ops teams actually use. We ship the change management, not just the config.", chips: ["HubSpot", "Salesforce", "Zoho"] },
  { icon: "◉", title: "Marketing & WhatsApp Automation", body: "Klaviyo, MoEngage, WebEngage, WhatsApp Business API — lifecycle flows that recover carts, upsell, and re-engage on autopilot.", chips: ["Klaviyo", "WhatsApp API", "MoEngage"] },
  { icon: "▣", title: "E-commerce & Marketplace Tech", body: "Shopify Plus, WooCommerce, Amazon/Flipkart integrations — the plumbing that makes D2C and marketplace math work in the same dashboard.", chips: ["Shopify Plus", "Woo", "Headless"] },
  { icon: "✦", title: "Data, Analytics & Reporting", body: "GA4, Looker Studio, BigQuery pipelines — one source of truth dashboards for boards, ops, and media pods alike.", chips: ["GA4", "Looker", "BigQuery"] },
  { icon: "❖", title: "AI Chatbots & Assistants", body: "LLM-powered assistants — customer support, internal ops, knowledge base — shipped with guardrails, evals, and a human-in-loop for edge cases.", chips: ["LLM", "RAG", "Guardrails"] },
];

const APPROACH = [
  { title: "Built for real teams", body: "Systems your team adopts, not systems your team fights. Every build includes training, docs, and 30-60-90 success criteria.", icon: "◉" },
  { title: "Performance first, always", body: "Green Core Web Vitals are the floor, not a stretch goal. Your users, your SEO, and your paid ads all benefit from the same milliseconds.", icon: "⚡" },
  { title: "Automation with control", body: "Automation that your ops team can inspect, override, and extend — not black boxes. Every flow comes with an admin console.", icon: "∞" },
];

const VOICES = [
  { quote: "They replatformed our three Shopify stores to a single Plus instance in six weeks. Zero downtime, zero data loss.", name: "Sandeep Arora", role: "CEO · JK Lifestyle", tag: "Replatform · D2C" },
  { quote: "The WhatsApp automation alone recovered 18% more abandoned carts. The retention stack paid back in week two.", name: "Mohit Bubber", role: "Founder · Cinegold", tag: "Automation · CRM" },
  { quote: "Our internal tooling finally feels like it was built by people who use it. Our ops team halved their manual hours.", name: "Jatinder Chaudhary", role: "Director · JCBL Group", tag: "ERP · Ops" },
];

export default function TechSolutionsPage() {
  return (
    <>
      <ServiceHero
        pillarLabel="Tech Solutions"
        pillarNum="06"
        headingStart="Tech that compounds"
        headingAccent="quietly"
        headingEnd="in the background."
        lede="Websites that score green. CRMs your team actually uses. Automations that save hours a week. AI assistants that ship. We build the boring things well — so your team can focus on the loud things."
        stats={[
          { num: "98", label: "Avg. Lighthouse score" },
          { num: "42%", label: "Avg. ops time saved" },
          { num: "0", label: "Downtime migrations" },
        ]}
        variant="tech"
      />
      <CapabilityGrid
        title="Seven"
        accent="systems that actually ship."
        intro="From the website your customer sees to the CRM your team clicks into 200 times a day — we build the whole stack, and we stay on to make sure it keeps earning its keep."
        items={CAPS}
        variant="tech"
      />
      <TerminalLive />
      <StackShowcase />
      <ServiceApproach
        title="Three rules we won't break."
        subtitle="The engineering principles"
        steps={APPROACH}
      />
      <ServiceVoices
        title="Teams who now spend less time fighting their tools."
        voices={VOICES}
      />
      <CTA
        eyebrow="— Tech starts here"
        heading="Ready to replace the stack that's quietly slowing your growth?"
        accent="quietly slowing your growth"
      />
    </>
  );
}
