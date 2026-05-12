import ServiceHero from "../../../components/service/ServiceHero";
import AICapabilities from "../../../components/service/AICapabilities";
import ServiceApproach from "../../../components/service/ServiceApproach";
import ServiceVoices from "../../../components/service/ServiceVoices";
import VisualShowcase from "../../../components/service/VisualShowcase";
import ProjectShowcase from "../../../components/service/ProjectShowcase";
import ModelMatrix from "../../../components/service/ModelMatrix";
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
    image: "https://images.unsplash.com/photo-1620712943543-bcc4688e7485?auto=format&fit=crop&w=1000&q=80",
  },
  {
    icon: "❖",
    title: "Custom AI Agents & Agentic Systems",
    body: "Goal-driven agents that plan, call tools, and finish tasks — research, outreach, internal copilots, multi-step workflows — shipped with evals, guardrails, and observability.",
    chips: ["Agents", "Tool Use", "Multi-step", "Evals"],
    image: "https://images.unsplash.com/photo-1677442136019-21780ecad995?auto=format&fit=crop&w=1000&q=80",
  },
  {
    icon: "●",
    title: "AI-Powered Products for Market Launch",
    body: "Production-grade AI products and apps — built from the prompt layer to the payments layer. We take your idea from a Figma frame to a live, billable SaaS.",
    chips: ["SaaS", "Apps", "GTM-ready"],
    image: "https://images.unsplash.com/photo-1593642634402-b0eb5e2eebc9?auto=format&fit=crop&w=1000&q=80",
  },
  {
    icon: "▲",
    title: "AI Features Inside Your Existing Product",
    body: "Drop intelligent features into the product your users already love — semantic search, smart summaries, copilots, recommendations, voice — without rebuilding the stack.",
    chips: ["Search", "Copilots", "Recommendations"],
    image: "https://images.unsplash.com/photo-1531746790731-6c087fecd65a?auto=format&fit=crop&w=1000&q=80",
  },
  {
    icon: "▣",
    title: "RAG & Knowledge Systems",
    body: "Private-data assistants over your docs, tickets, and databases — vector stores, retrieval, re-ranking, and grounded answers your team can actually trust.",
    chips: ["RAG", "Vector DB", "Citations"],
    image: "https://images.unsplash.com/photo-1532619675605-1ede6c2ed2b0?auto=format&fit=crop&w=1000&q=80",
  },
  {
    icon: "✦",
    title: "LLM Engineering & Fine-Tuning",
    body: "Frontier and open models — prompt engineering, function calling, fine-tunes, distillation — chosen by the use case and benchmarked, not by the news cycle.",
    chips: ["GPT", "Claude", "Llama", "Gemini"],
    image: "https://images.unsplash.com/photo-1635070041078-e363dbe005cb?auto=format&fit=crop&w=1000&q=80",
  },
  {
    icon: "◉",
    title: "Workflow Automation & Integrations",
    body: "AI woven into the tools you already pay for — HubSpot, Salesforce, Slack, Notion, WhatsApp, Zapier, n8n — so adoption is zero-friction from day one.",
    chips: ["HubSpot", "Slack", "WhatsApp", "n8n"],
    image: "https://images.unsplash.com/photo-1543286386-713bdd548da4?auto=format&fit=crop&w=1000&q=80",
  },
  {
    icon: "✧",
    title: "AI Strategy & Roadmaps",
    body: "Where AI actually moves your P&L — and where it shouldn't. A 30-60-90 plan with shipped pilots, success metrics, and a kill-switch for what doesn't compound.",
    chips: ["Discovery", "Pilots", "ROI"],
    image: "https://images.unsplash.com/photo-1518186285589-2f7649de83e0?auto=format&fit=crop&w=1000&q=80",
  },
];

const APPROACH = [
  {
    title: "Revenue first, demos second",
    body: "Every AI build maps to a P&L line — cost saved, revenue earned, hours back. If it can't be measured against a number, we won't ship it.",
    icon: "◉",
    image: "https://images.unsplash.com/photo-1454165804606-c3d57bc86b40?auto=format&fit=crop&w=1100&q=80",
  },
  {
    title: "Evals, guardrails, observability",
    body: "Every agent ships with an eval suite, output guardrails, and live observability — so quality is engineered, not vibes-checked.",
    icon: "※",
    image: "https://images.unsplash.com/photo-1551288049-bebda4e38f71?auto=format&fit=crop&w=1100&q=80",
  },
  {
    title: "Humans-in-the-loop where it counts",
    body: "Full autonomy where the stakes are low. Human review where they aren't. The boundary is designed, not assumed.",
    icon: "∞",
    image: "https://images.unsplash.com/photo-1556761175-5973dc0f32e7?auto=format&fit=crop&w=1100&q=80",
  },
  {
    title: "Built to scale, priced to start",
    body: "We pilot small, measure honestly, then scale what compounds. No six-month discovery decks — production within weeks.",
    icon: "↯",
    image: "https://images.unsplash.com/photo-1542744173-8e7e53415bb0?auto=format&fit=crop&w=1100&q=80",
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

const PROJECTS = [
  {
    name: "Atlas — Ops Automation Agent",
    tag: "Agentic · SaaS",
    year: "2026",
    description: "Autonomous ops agent that triages tickets, posts updates to Slack, and escalates on its own. Pulled 40 weekly hours off the support team in pilot.",
    stack: ["Claude", "LangGraph", "Postgres"],
    metric: "40 hrs / wk saved",
    image: "https://images.unsplash.com/photo-1620712943543-bcc4688e7485?auto=format&fit=crop&w=1200&q=80",
  },
  {
    name: "Echo — RAG Knowledge Copilot",
    tag: "RAG · Internal",
    year: "2025",
    description: "Private-data assistant grounded on the company's 18,000 policy and SOP docs. Citations, role-based access, and an eval suite that runs nightly.",
    stack: ["GPT-4o", "Pinecone", "Next.js"],
    metric: "92% answer accuracy",
    image: "https://images.unsplash.com/photo-1677442136019-21780ecad995?auto=format&fit=crop&w=1200&q=80",
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
      <AICapabilities
        title="Eight"
        accent="ways AI moves your P&L."
        intro="From the agent that handles your inbox to the SaaS product your team can sell — we build the AI layer end-to-end, with the evals and infra that make it dependable in production."
        items={CAPS}
      />
      <ModelMatrix />
      <VisualShowcase
        label="— AI in production"
        title="Agents at"
        accent="full tempo."
        intro="What our agentic systems look like in production — eval dashboards, traces, tool-use logs, and the human-in-the-loop checkpoints that keep quality honest."
        video={{
          src: "https://videos.pexels.com/video-files/3129957/3129957-hd_1920_1080_25fps.mp4",
          poster: "https://images.unsplash.com/photo-1677442136019-21780ecad995?auto=format&fit=crop&w=1600&q=80",
          tag: "Live · Eval room",
        }}
        tiles={[
          { img: "https://images.unsplash.com/photo-1593642634402-b0eb5e2eebc9?auto=format&fit=crop&w=900&q=80", label: "Agent Graph", w: 2, h: 1 },
          { img: "https://images.unsplash.com/photo-1635070041078-e363dbe005cb?auto=format&fit=crop&w=900&q=80", label: "Model Eval", w: 1, h: 1 },
          { img: "https://images.unsplash.com/photo-1532619675605-1ede6c2ed2b0?auto=format&fit=crop&w=900&q=80", label: "RAG Layer", w: 1, h: 1 },
          { img: "https://images.unsplash.com/photo-1531746790731-6c087fecd65a?auto=format&fit=crop&w=900&q=80", label: "Copilot UI", w: 1, h: 1 },
          { img: "https://images.unsplash.com/photo-1518186285589-2f7649de83e0?auto=format&fit=crop&w=900&q=80", label: "Roadmap", w: 2, h: 1 },
          { img: "https://images.unsplash.com/photo-1543286386-713bdd548da4?auto=format&fit=crop&w=900&q=80", label: "Integrations", w: 1, h: 1 },
        ]}
      />
      <ServiceApproach
        title="Four rules for AI that actually ships."
        subtitle="The operating principles"
        steps={APPROACH}
      />
      <ProjectShowcase
        label="— Selected work"
        title="AI,"
        accent="quietly compounding."
        intro="Two recent agentic builds — each measured against a P&L line, each shipped with the eval suite that keeps it honest in production."
        projects={PROJECTS}
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
