"use client";
import MarqueeBand from "../shared/MarqueeBand";
import "./IndustryBand.scss";

const INDUSTRIES_A = [
  "D2C Beauty", "FMCG", "BFSI", "EdTech", "Fintech", "SaaS",
  "Consumer Electronics", "Fashion & Apparel", "OTT & Media", "Automotive",
  "F&B", "Hospitality", "Travel", "Wellness",
];
const INDUSTRIES_B = [
  "Real Estate", "Healthcare", "Pharma", "B2B Manufacturing",
  "Agritech", "Gaming", "Crypto & Web3", "Publishing",
  "Marketplace", "Luxury", "Quick Commerce",
  "Logistics", "HR Tech", "Legal Tech",
];

export default function IndustryBand() {
  return (
    <section className="ib">
      <div className="ib-head">
        <span>— 40+ industries served</span>
        <span>Brand + Media + Tech</span>
      </div>
      <MarqueeBand items={INDUSTRIES_A} speed={44} />
      <MarqueeBand items={INDUSTRIES_B} speed={40} reverse />
      <div className="ib-foot">
        <p>And counting. If your category isn't here, we've probably built adjacent muscle — ask.</p>
      </div>
    </section>
  );
}
