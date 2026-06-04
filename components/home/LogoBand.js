"use client";
import MarqueeBand from "../shared/MarqueeBand";
import "./LogoBand.scss";

const BRANDS_A = [
  "JK Lifestyle",
  "JCBL Group",
  "Cinegold",
  "Infinity Perfumes",
  "Shopify Partner",
  "Meta Business",
  "Google Ads",
  "Amazon Seller",
  "DV360",
];
const BRANDS_B = [
  "500+ Brands",
  "40+ Industries",
  "300+ Campaigns",
  "1000+ Creators",
  "4 Cities",
  "50+ Specialists",
  "Independent",
  "Since 2021",
];

export default function LogoBand() {
  return (
    <section className="lb">
      <div className="lb-cap">
        <span>— 09 / Trusted</span>
        <span>Meta · Google · Amazon · Shopify certified</span>
      </div>
      <MarqueeBand items={BRANDS_A} speed={42} />
      <MarqueeBand items={BRANDS_B} speed={38} reverse accent />
    </section>
  );
}
