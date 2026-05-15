import ServiceHero from "../../../components/service/ServiceHero";
import EcommerceCapabilities from "../../../components/service/EcommerceCapabilities";
import ServiceApproach from "../../../components/service/ServiceApproach";
import ServiceVoices from "../../../components/service/ServiceVoices";
import FunnelStages from "../../../components/service/FunnelStages";
import CTA from "../../../components/shared/CTA";

export const metadata = {
  title: "Commerce Vertical — Epigroww Global",
  description:
    "Full-spectrum commerce built for beauty brands. Strategy, product development, marketplace management, content, visibility and intelligence — all under one roof. Fragrance, Makeup, Personal Care.",
  alternates: { canonical: "/ecommerce-solutions" },
};

const CAPS = [
  {
    icon: "◆",
    title: "Strategy & Brand Foundation",
    body: "Where every brand journey begins — brand consultation, GTM, RTM, AOP, pricing architecture and whitespace identification before a single rupee on execution.",
    chips: ["GTM", "AOP", "Positioning", "Whitespace"],
    image: "https://images.unsplash.com/photo-1556228720-195a672e8a03?auto=format&fit=crop&w=1000&q=80",
  },
  {
    icon: "▣",
    title: "Product Development Consultation",
    body: "From concept to shelf — NPD for fragrance, makeup and skincare, formulation briefs, packaging strategy and regulatory guidance grounded in market intelligence.",
    chips: ["Fragrance", "Makeup", "Skincare", "Regulatory"],
    image: "https://images.unsplash.com/photo-1522335789203-aaa2c1c01b9c?auto=format&fit=crop&w=1000&q=80",
  },
  {
    icon: "◉",
    title: "E-Commerce Management",
    body: "End-to-end marketplace ownership — onboarding, listings, ads, inventory, pricing monitoring and QCOM across Amazon, Flipkart, Nykaa, Myntra, Blinkit and beyond.",
    chips: ["Amazon", "Flipkart", "Nykaa", "QCOM"],
    image: "https://images.unsplash.com/photo-1607082348824-0a96f2a4b9da?auto=format&fit=crop&w=1000&q=80",
  },
  {
    icon: "●",
    title: "Content & Digital Presence",
    body: "Content that converts — SEO listings, A+ pages, brand stores, photography and video direction benchmarked against competitor content at every scroll.",
    chips: ["A+ Content", "Brand Store", "SEO", "Imagery"],
    image: "https://images.unsplash.com/photo-1596462502278-27bfdc403348?auto=format&fit=crop&w=1000&q=80",
  },
  {
    icon: "▲",
    title: "Visibility, Traffic & Growth",
    body: "Driving discovery across touchpoints — category visibility, campaign planning (BBD, GIF, Pink Friday), external traffic, influencer, affiliate and CRM loyalty.",
    chips: ["Banners", "Meta", "Google", "Influencer"],
    image: "https://images.unsplash.com/photo-1607082349566-187342175e2f?auto=format&fit=crop&w=1000&q=80",
  },
  {
    icon: "✦",
    title: "Intelligence & Operations",
    body: "The backbone of scalable commerce — live competitor and performance dashboards, GT structuring, warehousing, last-mile and supply-chain consulting.",
    chips: ["Dashboards", "GT", "Warehousing", "Supply Chain"],
    image: "https://images.unsplash.com/photo-1553413077-190dd305871c?auto=format&fit=crop&w=1000&q=80",
  },
];

const APPROACH = [
  {
    title: "Pricing & Assortment",
    body: "Live competitor price monitoring across platforms — every SKU benchmarked against the category leaders, every day.",
    icon: "↗",
    image: "https://images.unsplash.com/photo-1556742044-3c52d6e88c62?auto=format&fit=crop&w=1100&q=80",
  },
  {
    title: "Ad Share & Keywords",
    body: "Keyword gaps and sponsored-slot benchmarking — your ad rupee placed exactly where competitors are losing ground.",
    icon: "※",
    image: "https://images.unsplash.com/photo-1551288049-bebda4e38f71?auto=format&fit=crop&w=1100&q=80",
  },
  {
    title: "Content & Listings",
    body: "Title, claims, A+ and image benchmarking — every listing module measured against what's already converting in your category.",
    icon: "◉",
    image: "https://images.unsplash.com/photo-1492144534655-ae79c964c9d7?auto=format&fit=crop&w=1100&q=80",
  },
  {
    title: "Review & Sentiment",
    body: "Mining competitor reviews for positioning gaps — turning what their customers complain about into your next claim.",
    icon: "∞",
    image: "https://images.unsplash.com/photo-1556228724-4dac9da92d52?auto=format&fit=crop&w=1100&q=80",
  },
  {
    title: "Visibility & Share",
    body: "Share-of-voice and category placement tracking — banner, search and homepage real estate audited against the competition, weekly.",
    icon: "△",
    image: "https://images.unsplash.com/photo-1460925895917-afdab827c52f?auto=format&fit=crop&w=1100&q=80",
  },
];

const VOICES = [
  {
    quote:
      "From listings to last-mile — finally one team that understands beauty. Our marketplace P&L looks like a real business now.",
    name: "Sandeep Arora",
    role: "CEO · JK Lifestyle",
    tag: "Fragrance · D2C",
  },
  {
    quote:
      "The competitor dashboard alone changed how we price every launch. We see ad share and keyword gaps before our category managers do.",
    name: "Jatinder Chaudhary",
    role: "Director · JCBL Group",
    tag: "Personal Care",
  },
  {
    quote:
      "Strategy, NPD, content and ops out of one pod — we cut three vendors and shipped two new SKUs in a single quarter.",
    name: "Mohit Bubber",
    role: "Founder · Cinegold",
    tag: "Makeup",
  },
];

export default function EcommerceSolutionsPage() {
  return (
    <>
      <ServiceHero
        pillarLabel="Commerce Vertical"
        pillarNum="05"
        headingStart="Full-spectrum commerce."
        headingAccent="Built"
        headingEnd="for beauty brands."
        lede="A dedicated commerce partner for Fragrance, Makeup and Personal Care. From first brief to last mile — strategy, execution and intelligence under one expert team, with competitor benchmarking embedded at every layer."
        stats={[
          { num: "50+", label: "Brands scaled" },
          { num: "8+", label: "Platforms & QCOM" },
          { num: "360°", label: "Coverage" },
        ]}
        variant="ecommerce"
      />
      <EcommerceCapabilities
        title="Six services."
        accent="One commerce engine."
        intro="Strategy, NPD, marketplace, content, visibility and intelligence — one expert team, one scorecard, one revenue line. Every decision benchmarked against the competition."
        items={CAPS}
      />
      <FunnelStages />
      <ServiceApproach
        title="Competitor intelligence, embedded in everything."
        subtitle="Our approach"
        steps={APPROACH}
      />
      <ServiceVoices
        title="Operators who scaled with us."
        voices={VOICES}
      />
      <CTA
        eyebrow="— Build a brand that sells"
        heading="Ready to build a brand that sells across every shelf?"
        accent="brand that sells"
      />
    </>
  );
}
