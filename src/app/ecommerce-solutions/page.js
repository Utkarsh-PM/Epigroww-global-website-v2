import ServiceHero from "../../../components/service/ServiceHero";
import EcommerceCapabilities from "../../../components/service/EcommerceCapabilities";
import ServiceApproach from "../../../components/service/ServiceApproach";
import ServiceVoices from "../../../components/service/ServiceVoices";
import FunnelStages from "../../../components/service/FunnelStages";
import CTA from "../../../components/shared/CTA";

export const metadata = {
  title: "Ecommerce Solutions — Epigroww Global",
  description:
    "End-to-end D2C and marketplace commerce — Shopify, custom storefronts, marketplace P&Ls, CRO, fulfilment integrations and retention engines. One pod, one revenue line.",
};

const CAPS = [
  {
    icon: "◆",
    title: "Shopify & D2C Storefronts",
    body: "Shopify Plus, Headless, and custom Next.js builds. CRO-led, sub-second LCP, theme-as-code so the next campaign ships in days.",
    chips: ["Shopify Plus", "Headless", "Next.js", "Sanity"],
    image: "https://images.unsplash.com/photo-1556228720-195a672e8a03?auto=format&fit=crop&w=1000&q=80",
  },
  {
    icon: "▣",
    title: "Marketplace Storefronts",
    body: "Amazon Brand Stores, Flipkart, Myntra, Noon — A+ content, video modules, and creative tuned to convert in-feed.",
    chips: ["Amazon A+", "Flipkart", "Myntra", "Noon"],
    image: "https://images.unsplash.com/photo-1607082348824-0a96f2a4b9da?auto=format&fit=crop&w=1000&q=80",
  },
  {
    icon: "◉",
    title: "Conversion Rate Optimization",
    body: "PDP audits, funnel teardowns, on-site search, exit-intent flows — every percentage point of lift compounds into the LTV line.",
    chips: ["A/B testing", "Heatmaps", "PDP CRO", "Funnel"],
    image: "https://images.unsplash.com/photo-1460925895917-afdab827c52f?auto=format&fit=crop&w=1000&q=80",
  },
  {
    icon: "●",
    title: "Catalog, OMS & Fulfilment",
    body: "PIM, OMS, WMS, and 3PL integrations. Stock, pricing, and SKU sanity stitched into one source of truth.",
    chips: ["PIM", "OMS", "WMS", "3PL"],
    image: "https://images.unsplash.com/photo-1553413077-190dd305871c?auto=format&fit=crop&w=1000&q=80",
  },
  {
    icon: "▲",
    title: "Retention & Lifecycle",
    body: "Email, SMS, WhatsApp, loyalty — second-purchase engines that out-earn your acquisition spend by month four.",
    chips: ["Klaviyo", "MoEngage", "WhatsApp", "Loyalty"],
    image: "https://images.unsplash.com/photo-1607082349566-187342175e2f?auto=format&fit=crop&w=1000&q=80",
  },
  {
    icon: "✦",
    title: "Payments, Cart & Checkout",
    body: "Local payment rails, one-page checkout, BNPL, COD recovery, address intelligence — engineered against drop-off, not for it.",
    chips: ["Razorpay", "Stripe", "BNPL", "COD"],
    image: "https://images.unsplash.com/photo-1563013544-824ae1b704d3?auto=format&fit=crop&w=1000&q=80",
  },
];

const APPROACH = [
  {
    title: "Storefront as a revenue product",
    body: "We treat your storefront like a software product — releases, instrumentation, weekly metric reviews. Not a one-off 'project'.",
    icon: "↗",
    image: "https://images.unsplash.com/photo-1556742044-3c52d6e88c62?auto=format&fit=crop&w=1100&q=80",
  },
  {
    title: "Funnel-first, not feature-first",
    body: "Every roadmap item earns its slot against a funnel KPI. Vanity features get killed before the sprint starts.",
    icon: "※",
    image: "https://images.unsplash.com/photo-1551288049-bebda4e38f71?auto=format&fit=crop&w=1100&q=80",
  },
  {
    title: "Creative + commerce, same pod",
    body: "PDP copy, hero films, lifecycle creatives — produced by the same studio shipping your media. Brand voice never leaks.",
    icon: "◉",
    image: "https://images.unsplash.com/photo-1492144534655-ae79c964c9d7?auto=format&fit=crop&w=1100&q=80",
  },
  {
    title: "Compounds via retention",
    body: "Acquisition pays the first order. Retention pays the brand. We engineer for second-purchase from day one.",
    icon: "∞",
    image: "https://images.unsplash.com/photo-1556228724-4dac9da92d52?auto=format&fit=crop&w=1100&q=80",
  },
];

const VOICES = [
  {
    quote:
      "Replatform to Shopify Plus + retention rebuild — repeat purchase rate doubled inside two quarters.",
    name: "Sandeep Arora",
    role: "CEO · JK Lifestyle",
    tag: "D2C · Beauty",
  },
  {
    quote:
      "Our Amazon P&L finally looks like a real business. The PPC, A+ and retention loops all run from the same pod.",
    name: "Jatinder Chaudhary",
    role: "Director · JCBL Group",
    tag: "Marketplace",
  },
  {
    quote:
      "Sub-second LCP on a catalog of 4,000 SKUs — and a CMS our merchandiser actually opens every morning.",
    name: "Mohit Bubber",
    role: "Founder · Cinegold",
    tag: "Commerce · Tech",
  },
];

export default function EcommerceSolutionsPage() {
  return (
    <>
      <ServiceHero
        pillarLabel="Ecommerce Solutions"
        pillarNum="05"
        headingStart="Commerce that"
        headingAccent="compounds"
        headingEnd="from first click to second purchase."
        lede="D2C storefronts, marketplace P&Ls, CRO, fulfilment and retention — engineered as one revenue product, not five stitched vendors. Sub-second pages, weekly releases, second-purchase rates that actually move."
        stats={[
          { num: "120+", label: "Stores shipped" },
          { num: "0.9s", label: "Median LCP" },
          { num: "2.4×", label: "Avg. repeat-purchase lift" },
        ]}
        variant="ecommerce"
      />
      <EcommerceCapabilities
        title="Six surfaces."
        accent="One commerce engine."
        intro="Storefront, marketplace, CRO, catalog, retention, payments — one team, one scorecard, one revenue line. The bits your CFO reads agree with the bits your merchandiser ships."
        items={CAPS}
      />
      <FunnelStages />
      <ServiceApproach
        title="Storefront-as-product. Funnel-first."
        subtitle="The operating philosophy"
        steps={APPROACH}
      />
      <ServiceVoices
        title="Operators who compounded with us."
        voices={VOICES}
      />
      <CTA
        eyebrow="— Commerce starts here"
        heading="Ready to make your storefront the most reliable line on your P&L?"
        accent="most reliable line on your P&L"
      />
    </>
  );
}
