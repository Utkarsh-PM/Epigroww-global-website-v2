/**
 * Welcome panel shown above the default Payload dashboard.
 * Pulls live counts so the editor immediately sees the state of the site
 * and can jump straight into the page they want to edit.
 */
import React from "react";
import Link from "next/link";
import { getPayload } from "payload";
import config from "../../payload.config.js";

const tileBase = {
  display: "flex",
  flexDirection: "column",
  gap: 6,
  padding: "16px 18px",
  borderRadius: 14,
  background: "var(--theme-elevation-50)",
  border: "1px solid var(--theme-elevation-100)",
  textDecoration: "none",
  color: "inherit",
};

const linkRow = {
  display: "inline-flex",
  gap: 14,
  fontSize: 12,
  marginTop: 6,
};

const linkBtn = {
  color: "inherit",
  opacity: 0.85,
  textDecoration: "underline",
  textUnderlineOffset: 3,
};

const tileLink = {
  ...linkBtn,
  fontWeight: 700,
  opacity: 1,
};

const PAGES = [
  { label: "Home page", slug: "home-page", view: "/", desc: "Hero, growth engine, showreel, voices…" },
  { label: "About page", slug: "about-page", view: "/about", desc: "Mission, founder, values, timeline." },
  { label: "Work page", slug: "work-page", view: "/work", desc: "Case grid + results band." },
  { label: "Careers page", slug: "careers-page", view: "/careers", desc: "Culture, benefits, open roles." },
  { label: "Contact page", slug: "contact-page", view: "/contact", desc: "Brief form, offices, FAQs." },
  { label: "Media solutions", slug: "media-solutions-page", view: "/media-solutions", desc: "Service page · Media." },
  { label: "Brand solutions", slug: "brand-solutions-page", view: "/brand-solutions", desc: "Service page · Brand." },
  { label: "Tech solutions", slug: "tech-solutions-page", view: "/tech-solutions", desc: "Service page · Tech." },
  { label: "Ecommerce solutions", slug: "ecommerce-solutions-page", view: "/ecommerce-solutions", desc: "Service page · Ecom." },
];

const COLLECTIONS = [
  { label: "Pillars", slug: "pillars" },
  { label: "Work cases", slug: "work-cases" },
  { label: "Voices", slug: "voices" },
  { label: "Offices", slug: "offices" },
  { label: "Open roles", slug: "open-roles" },
  { label: "Industries", slug: "industries" },
  { label: "FAQs", slug: "faqs" },
];

export default async function BeforeDashboard() {
  // Pull live counts so the editor sees the size of each list immediately
  let counts = {};
  try {
    const payload = await getPayload({ config });
    const results = await Promise.all(
      COLLECTIONS.map((c) => payload.count({ collection: c.slug }).catch(() => ({ totalDocs: 0 })))
    );
    counts = Object.fromEntries(COLLECTIONS.map((c, i) => [c.slug, results[i].totalDocs]));
  } catch {
    counts = {};
  }

  return (
    <section
      style={{
        margin: "0 0 28px",
        padding: "26px 28px",
        background: "linear-gradient(135deg, rgba(227,230,93,0.10), rgba(227,230,93,0.02))",
        border: "1px solid rgba(227,230,93,0.35)",
        borderRadius: 18,
      }}
    >
      <div
        style={{
          display: "flex",
          justifyContent: "space-between",
          alignItems: "flex-start",
          gap: 24,
          flexWrap: "wrap",
          marginBottom: 22,
        }}
      >
        <div>
          <div
            style={{
              fontSize: 11,
              letterSpacing: "0.18em",
              textTransform: "uppercase",
              opacity: 0.6,
              marginBottom: 8,
              fontWeight: 600,
            }}
          >
            Welcome back · Epigroww CMS
          </div>
          <h2 style={{ margin: 0, fontSize: 26, fontWeight: 700, lineHeight: 1.2 }}>
            Edit a page, save, refresh the site.
          </h2>
          <p style={{ margin: "8px 0 0", opacity: 0.7, maxWidth: 560 }}>
            Pick a page below to edit its hero, sections and CTAs — or jump straight to the
            shared content collections used across the site.
          </p>
        </div>
        <a
          href="/"
          target="_blank"
          rel="noopener noreferrer"
          style={{
            padding: "10px 16px",
            borderRadius: 999,
            background: "#E3E65D",
            color: "#141730",
            fontWeight: 700,
            textDecoration: "none",
            whiteSpace: "nowrap",
          }}
        >
          ↗ View live site
        </a>
      </div>

      <div
        style={{
          fontSize: 11,
          textTransform: "uppercase",
          letterSpacing: "0.16em",
          opacity: 0.6,
          marginBottom: 10,
          fontWeight: 600,
        }}
      >
        Pages
      </div>
      <div
        style={{
          display: "grid",
          gridTemplateColumns: "repeat(auto-fill, minmax(220px, 1fr))",
          gap: 10,
          marginBottom: 22,
        }}
      >
        {PAGES.map((p) => (
          <div key={p.slug} style={tileBase}>
            <span style={{ fontWeight: 700, fontSize: 14 }}>{p.label}</span>
            <span style={{ fontSize: 12, opacity: 0.7 }}>{p.desc}</span>
            <span style={linkRow}>
              <Link href={`/admin/globals/${p.slug}`} style={tileLink}>
                Edit ↗
              </Link>
              <a href={p.view} target="_blank" rel="noopener noreferrer" style={linkBtn}>
                View live ↗
              </a>
            </span>
          </div>
        ))}
      </div>

      <div
        style={{
          fontSize: 11,
          textTransform: "uppercase",
          letterSpacing: "0.16em",
          opacity: 0.6,
          marginBottom: 10,
          fontWeight: 600,
        }}
      >
        Content collections
      </div>
      <div
        style={{
          display: "grid",
          gridTemplateColumns: "repeat(auto-fill, minmax(160px, 1fr))",
          gap: 10,
        }}
      >
        {COLLECTIONS.map((c) => (
          <Link key={c.slug} href={`/admin/collections/${c.slug}`} style={tileBase}>
            <span style={{ fontWeight: 700, fontSize: 14 }}>{c.label}</span>
            <span style={{ fontSize: 22, fontWeight: 800, color: "#E3E65D", lineHeight: 1 }}>
              {counts[c.slug] ?? 0}
            </span>
            <span style={{ fontSize: 11, opacity: 0.55, textTransform: "uppercase", letterSpacing: "0.1em" }}>
              docs
            </span>
          </Link>
        ))}
      </div>
    </section>
  );
}
