import ServiceHero from "../../../components/service/ServiceHero";
import CapabilityGrid from "../../../components/service/CapabilityGrid";
import TerminalLive from "../../../components/service/TerminalLive";
import StackShowcase from "../../../components/service/StackShowcase";
import ServiceApproach from "../../../components/service/ServiceApproach";
import ServiceVoices from "../../../components/service/ServiceVoices";
import CTA from "../../../components/shared/CTA";

export const metadata = {
  title: "Tech Solutions — Epigroww Global",
  description: "Custom software, websites, and mobile apps engineered with modern design, GSAP and Framer Motion animations, AI-accelerated delivery, and SaaS-grade architecture ready for market launch.",
};

const CAPS = [
  {
    icon: "◆",
    title: "Custom Software & SaaS Products",
    body: "From a Figma frame to a billable SaaS — auth, billing, dashboards, multi-tenancy, role-based access — production-grade architecture from day one.",
    chips: ["SaaS", "Multi-tenant", "Stripe", "Auth"],
  },
  {
    icon: "●",
    title: "Modern Websites & Web Apps",
    body: "Next.js and React builds with cinematic GSAP and Framer Motion animations, green Core Web Vitals, and editorial-grade design that turns visitors into believers.",
    chips: ["Next.js", "GSAP", "Framer Motion", "Three.js"],
  },
  {
    icon: "▲",
    title: "iOS, Android & Cross-Platform Apps",
    body: "React Native, Expo, and native — one codebase, two stores, polished animations and offline-first patterns that feel premium on every device.",
    chips: ["React Native", "Expo", "iOS", "Android"],
  },
  {
    icon: "❖",
    title: "AI-Accelerated Engineering",
    body: "We actively use AI across our build process — coding agents, code review, test generation, and design-to-code pipelines — so we ship in weeks what shops take quarters to deliver.",
    chips: ["AI Pair", "Codegen", "AI Reviews"],
  },
  {
    icon: "▣",
    title: "Product Design & UX Engineering",
    body: "Design systems, micro-interactions, motion choreography — interfaces engineered to feel inevitable. Brand value made tangible in every scroll, hover and tap.",
    chips: ["Design Systems", "Motion", "Prototyping"],
  },
  {
    icon: "◉",
    title: "Backend, APIs & Cloud Infrastructure",
    body: "Node, Python, Go — built on Vercel, AWS and GCP. Type-safe APIs, queues, cron, observability — the boring backbone that lets your product scale without drama.",
    chips: ["Node", "Python", "Vercel", "AWS"],
  },
  {
    icon: "✦",
    title: "Idea to Venture — 0 → 1 Studio",
    body: "We've taken founders from a one-line idea to a launched SaaS — discovery, naming, product, GTM-ready landing, analytics, payments — all in a single sprint.",
    chips: ["MVP", "0→1", "GTM"],
  },
  {
    icon: "✧",
    title: "Performance, SEO & Core Web Vitals",
    body: "LCP, CLS, INP all green. Image pipelines, edge caching, server components — Lighthouse 98+ is the floor, never the ceiling.",
    chips: ["LCP", "INP", "Edge"],
  },
];

const APPROACH = [
  {
    title: "Design that engineers can ship",
    body: "Modern, animated, opinionated design — but engineered against a system. Every motion has a reason; every interaction has a fallback.",
    icon: "◉",
  },
  {
    title: "AI inside our build process",
    body: "We use AI tooling end-to-end — codegen, reviews, design-to-code, test scaffolding — to compress timelines without compressing quality.",
    icon: "⚡",
  },
  {
    title: "Built to launch, not to demo",
    body: "Every product ships with auth, billing, analytics, monitoring, and a deploy pipeline. Market-launch ready isn't a phase — it's the definition of done.",
    icon: "↯",
  },
  {
    title: "Animations with intent",
    body: "GSAP timelines and Framer Motion choreographed to brand — never noise. Smooth on a flagship phone, graceful on a five-year-old laptop.",
    icon: "∞",
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
      <CapabilityGrid
        title="Eight"
        accent="ways we turn ideas into shipped product."
        intro="From a one-line idea to a market-ready SaaS — design, software, animations, mobile, infra and AI tooling all live in the same room, on the same sprint."
        items={CAPS}
        variant="tech"
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
