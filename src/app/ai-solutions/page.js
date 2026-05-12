import ServiceHero from "../../../components/service/ServiceHero";
import CapabilityGrid from "../../../components/service/CapabilityGrid";
import ServiceApproach from "../../../components/service/ServiceApproach";
import ServiceVoices from "../../../components/service/ServiceVoices";
import CTA from "../../../components/shared/CTA";

export const metadata = {
  title: "AI Solutions — Epigroww Global",
  description: "AI automations, custom agentic systems, and AI-powered products engineered to automate business processes and scale revenue for ambitious brands.",
};

const CAPS = [
  {
    icon: "◆",
    title: "AI Automations for Business Processes",
    body: "We automate the workflows that quietly eat your team's week — ops, support, sales, finance, content — with AI pipelines that run 24/7 with human-in-the-loop where it matters.",
    chips: ["Ops", "Sales", "Support", "Finance"],
  },
  {
    icon: "❖",
    title: "Custom AI Agents & Agentic Systems",
    body: "Goal-driven agents that plan, call tools, and finish tasks — research, outreach, internal copilots, multi-step workflows — shipped with evals, guardrails, and observability.",
    chips: ["Agents", "Tool Use", "Multi-step", "Evals"],
  },
  {
    icon: "●",
    title: "AI-Powered Products for Market Launch",
    body: "Production-grade AI products and apps — built from the prompt layer to the payments layer. We take your idea from a Figma frame to a live, billable SaaS.",
    chips: ["SaaS", "Apps", "GTM-ready"],
  },
  {
    icon: "▲",
    title: "AI Features Inside Your Existing Product",
    body: "Drop intelligent features into the product your users already love — semantic search, smart summaries, copilots, recommendations, voice — without rebuilding the stack.",
    chips: ["Search", "Copilots", "Recommendations"],
  },
  {
    icon: "▣",
    title: "RAG & Knowledge Systems",
    body: "Private-data assistants over your docs, tickets, and databases — vector stores, retrieval, re-ranking, and grounded answers your team can actually trust.",
    chips: ["RAG", "Vector DB", "Citations"],
  },
  {
    icon: "✦",
    title: "LLM Engineering & Fine-Tuning",
    body: "Frontier and open models — prompt engineering, function calling, fine-tunes, distillation — chosen by the use case and benchmarked, not by the news cycle.",
    chips: ["GPT", "Claude", "Llama", "Gemini"],
  },
  {
    icon: "◉",
    title: "Workflow Automation & Integrations",
    body: "AI woven into the tools you already pay for — HubSpot, Salesforce, Slack, Notion, WhatsApp, Zapier, n8n — so adoption is zero-friction from day one.",
    chips: ["HubSpot", "Slack", "WhatsApp", "n8n"],
  },
  {
    icon: "✧",
    title: "AI Strategy & Roadmaps",
    body: "Where AI actually moves your P&L — and where it shouldn't. A 30-60-90 plan with shipped pilots, success metrics, and a kill-switch for what doesn't compound.",
    chips: ["Discovery", "Pilots", "ROI"],
  },
];

const APPROACH = [
  {
    title: "Revenue first, demos second",
    body: "Every AI build maps to a P&L line — cost saved, revenue earned, hours back. If it can't be measured against a number, we won't ship it.",
    icon: "◉",
  },
  {
    title: "Evals, guardrails, observability",
    body: "Every agent ships with an eval suite, output guardrails, and live observability — so quality is engineered, not vibes-checked.",
    icon: "※",
  },
  {
    title: "Humans-in-the-loop where it counts",
    body: "Full autonomy where the stakes are low. Human review where they aren't. The boundary is designed, not assumed.",
    icon: "∞",
  },
  {
    title: "Built to scale, priced to start",
    body: "We pilot small, measure honestly, then scale what compounds. No six-month discovery decks — production within weeks.",
    icon: "↯",
  },
];

const VOICES = [
  {
    quote: "Their AI ops agent took 40 hours of weekly manual work off our team — and the implementation paid for itself inside the quarter.",
    name: "Sandeep Arora",
    role: "CEO · JK Lifestyle",
    tag: "Ops Automation",
  },
  {
    quote: "We launched our AI-powered SaaS in under 12 weeks. Their team handled the product, the model layer, and the infra — we just sold it.",
    name: "Mohit Bubber",
    role: "Founder · Cinegold",
    tag: "AI SaaS · Launch",
  },
  {
    quote: "The internal copilot they shipped is the only tool our managers open before email. That's the bar — and they hit it.",
    name: "Jatinder Chaudhary",
    role: "Director · JCBL Group",
    tag: "Internal Copilot",
  },
];

export default function AISolutionsPage() {
  return (
    <>
      <ServiceHero
        pillarLabel="AI Solutions"
        pillarNum="07"
        headingStart="AI that"
        headingAccent="ships"
        headingEnd="— and earns its keep."
        lede="From AI automations that quietly run your back office to custom agentic systems and full AI-powered products ready for market launch — we engineer AI that compounds revenue, not curiosity."
        stats={[
          { num: "40+", label: "AI projects shipped" },
          { num: "12 wk", label: "Avg. pilot → production" },
          { num: "60%", label: "Avg. ops time saved" },
        ]}
        variant="ai"
      />
      <CapabilityGrid
        title="Eight"
        accent="ways AI moves your P&L."
        intro="From the agent that handles your inbox to the SaaS product your team can sell — we build the AI layer end-to-end, with the evals and infra that make it dependable in production."
        items={CAPS}
        variant="ai"
      />
      <ServiceApproach
        title="Four rules for AI that actually ships."
        subtitle="The operating principles"
        steps={APPROACH}
      />
      <ServiceVoices
        title="Teams who let AI quietly do the work."
        voices={VOICES}
      />
      <CTA
        eyebrow="— AI starts here"
        heading="Ready to put AI to work on the parts of your business that actually compound?"
        accent="actually compound"
      />
    </>
  );
}
