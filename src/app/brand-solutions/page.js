import ServiceHero from "../../../components/service/ServiceHero";
import CreativeReel from "../../../components/service/CreativeReel";
import BeforeAfter from "../../../components/service/BeforeAfter";
import CapabilityGrid from "../../../components/service/CapabilityGrid";
import ServiceApproach from "../../../components/service/ServiceApproach";
import ServiceVoices from "../../../components/service/ServiceVoices";
import CTA from "../../../components/shared/CTA";

export const metadata = {
  title: "Brand Solutions — Epigroww Global",
  description: "Creative sits at the top. From copy to TVC commercials, from influencer UGC to CGI — a creative house producing 100+ pieces of work every week.",
};

const CAPS = [
  { icon: "◆", title: "Creative Suite — Performance Ads", body: "The weekly 100-creative engine that powers our paid media. Iteration speed, locked craft.", chips: ["Static", "Motion", "UGC-style"], image: "https://images.unsplash.com/photo-1611162616305-c69b3fa7fbe0?auto=format&fit=crop&w=1000&q=80" },
  { icon: "▣", title: "Creative Suite — Marketplaces", body: "A+ pages, brand stores, catalog imagery, video modules — tuned to convert on page, not dashboards.", chips: ["Amazon", "Flipkart", "Shopify"], image: "https://images.unsplash.com/photo-1556228720-195a672e8a03?auto=format&fit=crop&w=1000&q=80" },
  { icon: "◉", title: "Influencer Marketing", body: "1,000+ creator network. Macro, mid, nano — curated, contracted, and measured by incrementality.", chips: ["Macro", "Mid", "Nano"], image: "https://images.unsplash.com/photo-1596462502278-27bfdc403348?auto=format&fit=crop&w=1000&q=80" },
  { icon: "●", title: "User Generated Ads", body: "Scripted, produced, and edited UGC — the format that beats your best static ad, every quarter.", chips: ["Scripted UGC", "Reviews", "Unboxing"], image: "https://images.unsplash.com/photo-1516684732162-798a0062be99?auto=format&fit=crop&w=1000&q=80" },
  { icon: "▲", title: "Social Media Marketing", body: "Always-on content, community, reactive creative — built for the feed, not the deck.", chips: ["Always-on", "Community", "Reactive"], image: "https://images.unsplash.com/photo-1611605698323-b1e99cfd37ea?auto=format&fit=crop&w=1000&q=80" },
  { icon: "✦", title: "CGI, Animation & VFX", body: "In-house CGI team — product renders, 3D packs, VFX shorts. When the shot can't be shot, we build it.", chips: ["CGI", "3D", "VFX"], image: "https://images.unsplash.com/photo-1559181567-c3190ca9959b?auto=format&fit=crop&w=1000&q=80" },
  { icon: "❖", title: "Ad Commercials (TVC)", body: "Full-service film production — from scripting to post. The same team across story and edit.", chips: ["TVC", "Digital films", "Brand docs"], image: "https://images.unsplash.com/photo-1485846234645-a62644f84728?auto=format&fit=crop&w=1000&q=80" },
  { icon: "✧", title: "Celebrity Endorsements", body: "Curation, contracting, creative direction — celebrity partnerships that earn their fee.", chips: ["Celebrity", "Athletes", "Regional"], image: "https://images.unsplash.com/photo-1492691527719-9d1e07e534b4?auto=format&fit=crop&w=1000&q=80" },
  { icon: "◎", title: "Branding & Packaging", body: "Identity systems, packaging, and the tiny things nobody ships but we do — sonic logos, motion brand kits.", chips: ["Identity", "Packaging", "Motion brand"], image: "https://images.unsplash.com/photo-1513885535751-8b9238bd345a?auto=format&fit=crop&w=1000&q=80" },
];

const APPROACH = [
  { title: "Creative sits at the top", body: "Every engagement starts with a brief that creative owns. Media, tech, and ops orbit the idea — not the other way around.", icon: "◉", image: "https://images.unsplash.com/photo-1490481651871-ab68de25d43d?auto=format&fit=crop&w=1100&q=80" },
  { title: "Tested, unified messaging", body: "We build one message architecture and then tune it for channel. One story, nine executions — never nine stories.", icon: "※", image: "https://images.unsplash.com/photo-1542744095-291d1f67b221?auto=format&fit=crop&w=1100&q=80" },
  { title: "Full-funnel across platforms", body: "Hero film + 24 cut-downs + 120 performance creatives — all planned from day one, none stitched in reverse.", icon: "∞", image: "https://images.unsplash.com/photo-1611162616305-c69b3fa7fbe0?auto=format&fit=crop&w=1100&q=80" },
  { title: "Digital × traditional", body: "We bridge TVC, OOH, and digital rather than treating them as separate line items. Your TVC ships 30-sec, 15-sec, 6-sec and performance cut-downs in one production cycle.", icon: "↯", image: "https://images.unsplash.com/photo-1485846234645-a62644f84728?auto=format&fit=crop&w=1100&q=80" },
];

const VOICES = [
  { quote: "The Infinity launch films landed in the top 3 in our category. The team stayed on for the retention creatives — rare energy.", name: "Sandeep Arora", role: "CEO · JK Lifestyle", tag: "FMCG · Launch" },
  { quote: "We came for the brand film and stayed for the always-on creative engine. 100+ pieces a week and still crisp.", name: "Mohit Bubber", role: "Founder · Cinegold", tag: "OTT · Launch" },
  { quote: "They delivered the CGI product spots in half the time of our usual production house.", name: "Jatinder Chaudhary", role: "Director · JCBL Group", tag: "Brand · CGI" },
];

export default function BrandSolutionsPage() {
  return (
    <>
      <ServiceHero
        pillarLabel="Brand Solutions"
        pillarNum="05"
        headingStart="From copies to"
        headingAccent="blockbuster"
        headingEnd="TVC commercials."
        lede="An award-winning creative house that sits at the brand × performance intersection — producing 100+ pieces of work a week, across static, motion, film, CGI and UGC, without once blinking on craft."
        stats={[
          { num: "100+", label: "Creatives weekly" },
          { num: "250+", label: "Brand collaborations" },
          { num: "1000+", label: "Creators on tap" },
        ]}
        variant="brand"
      />
      <CreativeReel />
      <BeforeAfter />
      <CapabilityGrid
        title="Nine studios,"
        accent="one creative engine."
        intro="Whether it's a 6-second hook or a 90-second TVC, it ships from the same team — writers, art directors, film-makers, CGI artists, editors — all in the same Slack channel."
        items={CAPS}
        variant="brand"
      />
      <ServiceApproach
        title="Creative sits at the top."
        subtitle="The operating philosophy"
        steps={APPROACH}
      />
      <ServiceVoices
        title="What the brands who trusted us say."
        voices={VOICES}
      />
      <CTA
        eyebrow="— Brand starts here"
        heading="Ready to ship the creative that actually earns its media spend?"
        accent="actually earns its media spend"
      />
    </>
  );
}
