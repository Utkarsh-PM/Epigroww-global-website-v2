import ServiceHero from "../../../components/service/ServiceHero";
import TechCapabilities from "../../../components/service/TechCapabilities";
import TerminalLive from "../../../components/service/TerminalLive";
import StackShowcase from "../../../components/service/StackShowcase";
import ServiceApproach from "../../../components/service/ServiceApproach";
import ServiceVoices from "../../../components/service/ServiceVoices";
import VisualShowcase from "../../../components/service/VisualShowcase";
import ProjectShowcase from "../../../components/service/ProjectShowcase";
import CTA from "../../../components/shared/CTA";

export const metadata = {
  title: "Tech Solutions — Epigroww Global",
  description: "Custom software, websites, and mobile apps engineered with modern design, GSAP and Framer Motion animations, AI-accelerated delivery, and SaaS-grade architecture ready for market launch.",
  alternates: { canonical: "/tech-solutions" },
};

const CAPS = [
  {
    icon: "◆",
    title: "Custom Software & SaaS Products",
    body: "From a Figma frame to a billable SaaS — auth, billing, dashboards, multi-tenancy, role-based access — production-grade architecture from day one.",
    chips: ["SaaS", "Multi-tenant", "Stripe", "Auth"],
    image: "https://images.unsplash.com/photo-1551434678-e076c223a692?auto=format&fit=crop&w=1000&q=80",
  },
  {
    icon: "●",
    title: "Modern Websites & Web Apps",
    body: "Next.js and React builds with cinematic GSAP and Framer Motion animations, green Core Web Vitals, and editorial-grade design that turns visitors into believers.",
    chips: ["Next.js", "GSAP", "Framer Motion", "Three.js"],
    image: "https://images.unsplash.com/photo-1467232004584-a241de8bcf5d?auto=format&fit=crop&w=1000&q=80",
  },
  {
    icon: "▲",
    title: "iOS, Android & Cross-Platform Apps",
    body: "React Native, Expo, and native — one codebase, two stores, polished animations and offline-first patterns that feel premium on every device.",
    chips: ["React Native", "Expo", "iOS", "Android"],
    image: "https://images.unsplash.com/photo-1512941937669-90a1b58e7e9c?auto=format&fit=crop&w=1000&q=80",
  },
  {
    icon: "❖",
    title: "AI-Accelerated Engineering",
    body: "We actively use AI across our build process — coding agents, code review, test generation, and design-to-code pipelines — so we ship in weeks what shops take quarters to deliver.",
    chips: ["AI Pair", "Codegen", "AI Reviews"],
    image: "https://images.unsplash.com/photo-1620712943543-bcc4688e7485?auto=format&fit=crop&w=1000&q=80",
  },
  {
    icon: "▣",
    title: "Product Design & UX Engineering",
    body: "Design systems, micro-interactions, motion choreography — interfaces engineered to feel inevitable. Brand value made tangible in every scroll, hover and tap.",
    chips: ["Design Systems", "Motion", "Prototyping"],
    image: "https://images.unsplash.com/photo-1561070791-2526d30994b8?auto=format&fit=crop&w=1000&q=80",
  },
  {
    icon: "◉",
    title: "Backend, APIs & Cloud Infrastructure",
    body: "Node, Python, Go — built on Vercel, AWS and GCP. Type-safe APIs, queues, cron, observability — the boring backbone that lets your product scale without drama.",
    chips: ["Node", "Python", "Vercel", "AWS"],
    image: "https://images.unsplash.com/photo-1558494949-ef010cbdcc31?auto=format&fit=crop&w=1000&q=80",
  },
  {
    icon: "✦",
    title: "Idea to Venture — 0 → 1 Studio",
    body: "We've taken founders from a one-line idea to a launched SaaS — discovery, naming, product, GTM-ready landing, analytics, payments — all in a single sprint.",
    chips: ["MVP", "0→1", "GTM"],
    image: "https://images.unsplash.com/photo-1559136555-9303baea8ebd?auto=format&fit=crop&w=1000&q=80",
  },
  {
    icon: "✧",
    title: "Performance, SEO & Core Web Vitals",
    body: "LCP, CLS, INP all green. Image pipelines, edge caching, server components — Lighthouse 98+ is the floor, never the ceiling.",
    chips: ["LCP", "INP", "Edge"],
    image: "https://images.unsplash.com/photo-1551288049-bebda4e38f71?auto=format&fit=crop&w=1000&q=80",
  },
];

const APPROACH = [
  {
    title: "Design that engineers can ship",
    body: "Modern, animated, opinionated design — but engineered against a system. Every motion has a reason; every interaction has a fallback.",
    icon: "◉",
    image: "https://images.unsplash.com/photo-1545235617-9465d2a55698?auto=format&fit=crop&w=1100&q=80",
  },
  {
    title: "AI inside our build process",
    body: "We use AI tooling end-to-end — codegen, reviews, design-to-code, test scaffolding — to compress timelines without compressing quality.",
    icon: "⚡",
    image: "https://images.unsplash.com/photo-1677442136019-21780ecad995?auto=format&fit=crop&w=1100&q=80",
  },
  {
    title: "Built to launch, not to demo",
    body: "Every product ships with auth, billing, analytics, monitoring, and a deploy pipeline. Market-launch ready isn't a phase — it's the definition of done.",
    icon: "↯",
    image: "https://images.unsplash.com/photo-1542744173-8e7e53415bb0?auto=format&fit=crop&w=1100&q=80",
  },
  {
    title: "Animations with intent",
    body: "GSAP timelines and Framer Motion choreographed to brand — never noise. Smooth on a flagship phone, graceful on a five-year-old laptop.",
    icon: "∞",
    image: "https://images.unsplash.com/photo-1550745165-9bc0b252726f?auto=format&fit=crop&w=1100&q=80",
  },
];

const VOICES = [
  {
    quote: "They turned our idea into a launched SaaS in 10 weeks — design, app, payments, the lot. The animations alone made the funding round easier.",
    name: "Sandeep Arora",
    role: "CEO · JK Lifestyle",
    tag: "0→1 SaaS",
  },
  {
    quote: "Their use of AI in development is real, not marketing. We shipped a feature in three days that our last vendor quoted three weeks for.",
    name: "Mohit Bubber",
    role: "Founder · Cinegold",
    tag: "Web App · AI-accelerated",
  },
  {
    quote: "The iOS app feels like an Apple product. Animations, haptics, performance — none of which we asked for but all of which we now sell on.",
    name: "Jatinder Chaudhary",
    role: "Director · JCBL Group",
    tag: "Mobile · iOS",
  },
];

const PROJECTS = [
  {
    name: "Lumen — AI Sales Copilot",
    tag: "SaaS · 0→1",
    year: "2026",
    description: "A Slack-native copilot for B2B sales teams. Closed deals 24% faster in pilot through always-on competitor intel and call-summary memory.",
    stack: ["Next.js", "GPT-4o", "Postgres"],
    metric: "+24% close rate",
    image: "https://images.unsplash.com/photo-1551434678-e076c223a692?auto=format&fit=crop&w=1200&q=80",
  },
  {
    name: "Halo Beauty — D2C Storefront",
    tag: "Web · Commerce",
    year: "2025",
    description: "Headless Shopify Plus build with editorial-grade GSAP storytelling. 0.9s LCP on a 4,000-SKU catalog and a +38% conversion lift.",
    stack: ["Shopify Plus", "Next.js", "GSAP"],
    metric: "+38% conversion",
    image: "https://images.unsplash.com/photo-1556228720-195a672e8a03?auto=format&fit=crop&w=1200&q=80",
  },
  {
    name: "Trail — Field-Ops Mobile App",
    tag: "Mobile · iOS / Android",
    year: "2025",
    description: "Offline-first React Native app for inspection crews working in low-signal areas. Sync queue, signed reports, haptic-rich UX.",
    stack: ["React Native", "Expo", "SQLite"],
    metric: "10× faster reporting",
    image: "https://images.unsplash.com/photo-1512941937669-90a1b58e7e9c?auto=format&fit=crop&w=1200&q=80",
  },
  {
    name: "Northwind — Logistics Dashboard",
    tag: "Internal Tool",
    year: "2025",
    description: "Real-time fleet & inventory dashboard for a mid-market logistics player. Replaced four legacy tools with one product the ops team actually opens.",
    stack: ["Next.js", "Postgres", "Mapbox"],
    metric: "4 tools → 1",
    image: "https://images.unsplash.com/photo-1586528116311-ad8dd3c8310d?auto=format&fit=crop&w=1200&q=80",
  },
  {
    name: "Crate — Subscription Box Platform",
    tag: "Web · Stripe",
    year: "2024",
    description: "Multi-tenant subscription engine with Stripe billing, address intelligence, and a builder-mode merchandiser dashboard.",
    stack: ["Next.js", "Stripe", "Tailwind"],
    metric: "12 brands live",
    image: "https://images.unsplash.com/photo-1607082348824-0a96f2a4b9da?auto=format&fit=crop&w=1200&q=80",
  },
  {
    name: "Pulse — Studio Booking App",
    tag: "Marketplace",
    year: "2024",
    description: "Two-sided booking platform for production studios & creators. Calendar sync, in-app chat, escrow payouts and review system.",
    stack: ["Next.js", "Twilio", "Razorpay"],
    metric: "2,400+ studios",
    image: "https://images.unsplash.com/photo-1581291518857-4e27b48ff24e?auto=format&fit=crop&w=1200&q=80",
  },
];

export default function TechSolutionsPage() {
  return (
    <>
      <ServiceHero
        pillarLabel="Tech Solutions"
        pillarNum="06"
        headingStart="Custom software,"
        headingAccent="cinematic"
        headingEnd="websites & mobile apps."
        lede="Custom software, modern websites and mobile apps for ambitious brands — engineered with GSAP and Framer Motion animations, premium UX, and AI-accelerated delivery. We turn ideas into launched ventures, not just clickable demos."
        stats={[
          { num: "120+", label: "Products shipped" },
          { num: "10 wk", label: "Avg. idea → launch" },
          { num: "98+", label: "Avg. Lighthouse score" },
        ]}
        variant="tech"
      />
      <TechCapabilities
        title="Eight"
        accent="ways we turn ideas into shipped product."
        intro="From a one-line idea to a market-ready SaaS — design, software, animations, mobile, infra and AI tooling all live in the same room, on the same sprint."
        items={CAPS}
      />
      <VisualShowcase
        label="— Live build · Frame 002"
        title="Software with"
        accent="real motion."
        intro="Cinematic interfaces engineered against real systems — design that engineers can ship, animations choreographed by frame, performance budgets that never slip."
        video={{
          src: "https://videos.pexels.com/video-files/3195394/3195394-hd_1920_1080_25fps.mp4",
          poster: "https://images.unsplash.com/photo-1499951360447-b19be8fe80f5?auto=format&fit=crop&w=1600&q=80",
          tag: "Studio · Mumbai",
        }}
        tiles={[
          { img: "https://images.unsplash.com/photo-1551434678-e076c223a692?auto=format&fit=crop&w=900&q=80", label: "SaaS Dashboard", w: 2, h: 1 },
          { img: "https://images.unsplash.com/photo-1561070791-2526d30994b8?auto=format&fit=crop&w=900&q=80", label: "Design System", w: 1, h: 1 },
          { img: "https://images.unsplash.com/photo-1512941937669-90a1b58e7e9c?auto=format&fit=crop&w=900&q=80", label: "Mobile · iOS", w: 1, h: 1 },
          { img: "https://images.unsplash.com/photo-1558494949-ef010cbdcc31?auto=format&fit=crop&w=900&q=80", label: "Infra", w: 1, h: 1 },
          { img: "https://images.unsplash.com/photo-1467232004584-a241de8bcf5d?auto=format&fit=crop&w=900&q=80", label: "Web App", w: 2, h: 1 },
          { img: "https://images.unsplash.com/photo-1620712943543-bcc4688e7485?auto=format&fit=crop&w=900&q=80", label: "AI Tooling", w: 1, h: 1 },
        ]}
      />
      <ProjectShowcase
        label="— Selected work"
        title="Software,"
        accent="actually shipped."
        intro="A handful of recent builds — SaaS products, storefronts, mobile apps and internal tools that went live, earned revenue, and stayed up."
        projects={PROJECTS}
      />
      <TerminalLive />
      <StackShowcase />
      <ServiceApproach
        title="Four rules for software that ships."
        subtitle="The engineering principles"
        steps={APPROACH}
      />
      <ServiceVoices
        title="Founders who launched on schedule."
        voices={VOICES}
      />
      <CTA
        eyebrow="— Tech starts here"
        heading="Ready to turn your idea into a launched product with animations that sell it?"
        accent="animations that sell it"
      />
    </>
  );
}
