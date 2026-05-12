"use client";
import MarqueeBand from "../shared/MarqueeBand";
import "./LogoBand.scss";

const DEFAULT_A = [
  "JK Lifestyle", "JCBL Group", "Cinegold", "Infinity Perfumes",
  "Shopify Partner", "Meta Business", "Google Ads", "Amazon Seller", "DV360",
];
const DEFAULT_B = [
  "500+ Brands", "40+ Industries", "300+ Campaigns", "1000+ Creators",
  "4 Continents", "100+ Specialists", "Minority-owned", "Since 2021",
];

const namesOf = (arr, fallback) => {
  if (!Array.isArray(arr) || arr.length === 0) return fallback;
  return arr.map((r) => r.name).filter(Boolean);
};

export default function LogoBand({ data = {} }) {
  const BRANDS_A = namesOf(data.lbBrandsA, DEFAULT_A);
  const BRANDS_B = namesOf(data.lbBrandsB, DEFAULT_B);
  const caption = data.lbCaption || "— 09 / Trusted · Meta · Google · Amazon · Shopify certified";
  // Split caption into two segments at the first ' · ' so the existing two-span
  // layout (left tag + right description) keeps working.
  const [capLeft, ...capRest] = caption.split(" · ");
  const capRight = capRest.join(" · ");
  return (
    <section className="lb">
      <div className="lb-cap">
        <span>{capLeft}</span>
        {capRight && <span>{capRight}</span>}
      </div>
      <MarqueeBand items={BRANDS_A} speed={42} />
      <MarqueeBand items={BRANDS_B} speed={38} reverse accent />
    </section>
  );
}
