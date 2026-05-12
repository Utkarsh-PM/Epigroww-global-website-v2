"use client";
import MarqueeBand from "../shared/MarqueeBand";
import "./IndustryBand.scss";

const DEFAULT_A = [
  "D2C Beauty", "FMCG", "BFSI", "EdTech", "Fintech", "SaaS",
  "Consumer Electronics", "Fashion & Apparel", "OTT & Media", "Automotive",
  "F&B", "Hospitality", "Travel", "Wellness",
];
const DEFAULT_B = [
  "Real Estate", "Healthcare", "Pharma", "B2B Manufacturing",
  "Agritech", "Gaming", "Crypto & Web3", "Publishing",
  "Marketplace", "Luxury", "Quick Commerce",
  "Logistics", "HR Tech", "Legal Tech",
];

export default function IndustryBand({ data = {}, industries }) {
  const all = Array.isArray(industries) ? industries : [];
  const A = all.filter((i) => i.band === "a").map((i) => i.name);
  const B = all.filter((i) => i.band === "b").map((i) => i.name);
  const INDUSTRIES_A = A.length ? A : DEFAULT_A;
  const INDUSTRIES_B = B.length ? B : DEFAULT_B;
  const topLabel = data.topLabel || "— 40+ industries served";
  const topRight = data.topRight || "Brand + Media + Tech";
  const footerLine = data.footerLine || "And counting. If your category isn't here, we've probably built adjacent muscle — ask.";
  return (
    <section className="ib">
      <div className="ib-head">
        <span>{topLabel}</span>
        <span>{topRight}</span>
      </div>
      <MarqueeBand items={INDUSTRIES_A} speed={44} />
      <MarqueeBand items={INDUSTRIES_B} speed={40} reverse />
      <div className="ib-foot">
        <p>{footerLine}</p>
      </div>
    </section>
  );
}
