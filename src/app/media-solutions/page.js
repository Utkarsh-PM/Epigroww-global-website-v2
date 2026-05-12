import ServiceHero from "../../../components/service/ServiceHero";
import CapabilityGrid from "../../../components/service/CapabilityGrid";
import ServiceApproach from "../../../components/service/ServiceApproach";
import ServiceVoices from "../../../components/service/ServiceVoices";
import ChannelMatrix from "../../../components/service/ChannelMatrix";
import CTA from "../../../components/shared/CTA";

export const metadata = {
  title: "Media Solutions — Epigroww Global",
  description: "Omni-channel paid media that earns its CAC. Paid social, search, programmatic, OTT, marketplaces, and retention — always-on and live-tuned.",
};

const CAPS = [
  {
    icon: "◐",
    title: "Paid Social & Search",
    body: "Meta, Google, LinkedIn, TikTok, Snap — one pod, one scorecard, one source of truth for CAC.",
    chips: ["Meta", "Google", "TikTok", "LinkedIn"],
    image: "https://images.unsplash.com/photo-1611605698323-b1e99cfd37ea?auto=format&fit=crop&w=1000&q=80",
  },
  {
    icon: "▲",
    title: "Marketplace Management",
    body: "Amazon, Flipkart, Noon, Myntra — listing, PPC, store creatives, and full P&L visibility.",
    chips: ["Amazon", "Flipkart", "Noon", "Myntra"],
    image: "https://images.unsplash.com/photo-1607082348824-0a96f2a4b9da?auto=format&fit=crop&w=1000&q=80",
  },
  {
    icon: "◆",
    title: "Programmatic & Display",
    body: "DV360, TTD, native, rich-media — precision in every impression, priced to beat walled gardens.",
    chips: ["DV360", "TTD", "Native", "DOOH"],
    image: "https://images.unsplash.com/photo-1551288049-bebda4e38f71?auto=format&fit=crop&w=1000&q=80",
  },
  {
    icon: "●",
    title: "OTT & CTV Distribution",
    body: "Hotstar, Prime, Netflix Ads, YouTube Prime Time — streaming success, redefined.",
    chips: ["Hotstar", "Netflix Ads", "Prime", "YT CTV"],
    image: "https://images.unsplash.com/photo-1593359677879-a4bb92f829d1?auto=format&fit=crop&w=1000&q=80",
  },
  {
    icon: "▣",
    title: "Retention & CRM",
    body: "Email, SMS, WhatsApp, push — second-purchase engines that out-earn your acquisition spend.",
    chips: ["Klaviyo", "MoEngage", "WebEngage", "Braze"],
    image: "https://images.unsplash.com/photo-1551836022-d5d88e9218df?auto=format&fit=crop&w=1000&q=80",
  },
  {
    icon: "✦",
    title: "Measurement & Incrementality",
    body: "Geo-holdouts, MMM, MTA, conversion APIs — so the scorecard you read is the truth, not the story.",
    chips: ["MMM", "MTA", "Incrementality", "CAPI"],
    image: "https://images.unsplash.com/photo-1460925895917-afdab827c52f?auto=format&fit=crop&w=1000&q=80",
  },
];

const APPROACH = [
  { title: "Omni-channel from day one", body: "Customers consult an average of 10 sources and 90% switch between devices. We plan across the entire journey, not just the last-click touchpoint.", icon: "↗", image: "https://images.unsplash.com/photo-1551288049-bebda4e38f71?auto=format&fit=crop&w=1100&q=80" },
  { title: "Data-backed, not opinion-backed", body: "Every channel mix ships with a scorecard, incrementality plan, and a kill-switch. Opinions are the starting point; data is the referee.", icon: "※", image: "https://images.unsplash.com/photo-1460925895917-afdab827c52f?auto=format&fit=crop&w=1100&q=80" },
  { title: "Creative-fueled, always", body: "Winning performance is 70% creative. Our in-house studio produces 100+ creatives a week — and kills losers within 48 hours.", icon: "◉", image: "https://images.unsplash.com/photo-1492144534655-ae79c964c9d7?auto=format&fit=crop&w=1100&q=80" },
  { title: "Engineered for compounding", body: "Winners move to evergreen, retention flows catch second-purchase, referral loops pay back CAC. Compounding, not spiking.", icon: "∞", image: "https://images.unsplash.com/photo-1551836022-d5d88e9218df?auto=format&fit=crop&w=1100&q=80" },
];

const VOICES = [
  { quote: "Epigroww's media team pulled our blended CAC down 37% in 90 days — without touching creative quality.", name: "Sandeep Arora", role: "CEO · JK Lifestyle", tag: "D2C · Beauty" },
  { quote: "They run our Amazon + Flipkart P&Ls like owners. Our rank is better than it's ever been.", name: "Jatinder Chaudhary", role: "Director · JCBL Group", tag: "Marketplace" },
  { quote: "The OTT retention playbook alone was worth the engagement.", name: "Mohit Bubber", role: "Founder · Cinegold", tag: "OTT · Media" },
];

export default function MediaSolutionsPage() {
  return (
    <>
      <ServiceHero
        pillarLabel="Media Solutions"
        pillarNum="04"
        headingStart="Paid media that"
        headingAccent="compounds"
        headingEnd="— not just converts."
        lede="A full-funnel paid media engine — Meta, Google, Amazon, DV360, CTV and owned — engineered around incrementality and tuned daily. No last-click theatre, no vanity dashboards."
        stats={[
          { num: "$1B+", label: "Managed media spend" },
          { num: "300+", label: "Campaigns last 12 mo" },
          { num: "37%", label: "Avg. CAC reduction" },
        ]}
        variant="media"
      />
      <CapabilityGrid
        title="Six channels. One"
        accent="scoreboard."
        intro="Every pod has a direct line from media spend to revenue in your P&L. No separate teams for Meta vs. Amazon vs. CRM — just one scorecard, updated weekly."
        items={CAPS}
      />
      <ChannelMatrix />
      <ServiceApproach
        title="Omni-channel. Data-backed. Creative-fueled."
        subtitle="The operating system"
        steps={APPROACH}
      />
      <ServiceVoices
        title="Clients who let the numbers speak."
        voices={VOICES}
      />
      <CTA
        eyebrow="— Media starts here"
        heading="Ready to turn paid media into your most reliable growth compounder?"
        accent="most reliable growth compounder"
      />
    </>
  );
}
