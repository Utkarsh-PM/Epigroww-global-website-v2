"use client";
import { useEffect, useRef, useState } from "react";
import Link from "next/link";
import gsap from "gsap";
import { ScrollTrigger } from "gsap/ScrollTrigger";
import "./Pillars.scss";

if (typeof window !== "undefined") gsap.registerPlugin(ScrollTrigger);

const DEFAULT_PILLARS = [
  {
    num: "01",
    title: "Media",
    href: "/media-solutions",
    tagline: "Precision in every impression.",
    desc: "Performance buying across Google, Meta, Amazon, DV360, CTV and OTT — engineered around incrementality, not last-click vanity.",
    capabilities: ["Paid Social & Search", "Programmatic & CTV", "Marketplace Management", "Retention & CRM"],
    image: "https://images.unsplash.com/photo-1551288049-bebda4e38f71?auto=format&fit=crop&w=1200&q=80",
    accent: "#E3E65D",
  },
  {
    num: "02",
    title: "Brand",
    href: "/brand-solutions",
    tagline: "Creative sits at the top.",
    desc: "From 30-second spots to 30-frame performance assets — a studio that produces 100+ pieces a week without sacrificing craft.",
    capabilities: ["Creative Suite — Ads", "Influencer & UGC", "Films, CGI & VFX", "Identity & Packaging"],
    image: "https://images.unsplash.com/photo-1586717799252-bd134ad00e26?auto=format&fit=crop&w=1200&q=80",
    accent: "#F4F0A0",
  },
  {
    num: "03",
    title: "Tech",
    href: "/tech-solutions",
    tagline: "Compounds quietly in the background.",
    desc: "Websites, stacks and automations that stay out of the way — Core Web Vitals greens, CRMs your team actually uses, AI assistants that ship.",
    capabilities: ["Web & E-commerce Build", "CRM / ERP Systems", "Marketing Automation", "AI Assistants & Chatbots"],
    image: "https://images.unsplash.com/photo-1518770660439-4636190af475?auto=format&fit=crop&w=1200&q=80",
    accent: "#CFDE54",
  },
];

function mapPillars(refs) {
  if (!Array.isArray(refs) || refs.length === 0) return DEFAULT_PILLARS;
  // This component only renders the first 3 (the original UI shows 3 pillars).
  return refs.slice(0, 3).map((p, i) => ({
    num: p.num || String(i + 1).padStart(2, "0"),
    title: p.title || "",
    href: p.href || "#",
    tagline: p.tagline || "",
    desc: p.description || "",
    capabilities: (p.capabilities || []).map((c) => c.label),
    image: (p.image && p.image.url) || p.imageUrl || DEFAULT_PILLARS[i]?.image,
    accent: p.accentHex || DEFAULT_PILLARS[i]?.accent || "#E3E65D",
  }));
}

export default function Pillars({ pillars: refs }) {
  const ref = useRef(null);
  const [active, setActive] = useState(0);
  const PILLARS = mapPillars(refs);

  useEffect(() => {
    const ctx = gsap.context(() => {
      gsap.fromTo(
        ".p-head-line",
        { yPercent: 110 },
        {
          yPercent: 0,
          duration: 1,
          ease: "power4.out",
          stagger: 0.08,
          scrollTrigger: { trigger: ".pillars-head", start: "top 80%" },
        }
      );

      gsap.utils.toArray(".pillar-row").forEach((row) => {
        gsap.fromTo(
          row,
          { y: 60, opacity: 0 },
          {
            y: 0,
            opacity: 1,
            duration: 1,
            ease: "power3.out",
            scrollTrigger: { trigger: row, start: "top 85%" },
          }
        );
      });
    }, ref);
    return () => ctx.revert();
  }, []);

  return (
    <section ref={ref} className="pillars">
      <div className="pillars-inner">
        <div className="pillars-head">
          <div className="pillars-caption">
            <span>— 03 / Capabilities</span>
            <span>(Three pillars, one team)</span>
          </div>
          <h2 className="pillars-heading">
            <span className="p-head-wrap"><span className="p-head-line">Media that</span></span>
            <span className="p-head-wrap"><span className="p-head-line">earns its CAC.</span></span>
            <span className="p-head-wrap"><span className="p-head-line serif">Brand that</span></span>
            <span className="p-head-wrap"><span className="p-head-line serif">moves hearts.</span></span>
            <span className="p-head-wrap"><span className="p-head-line">Tech that stays</span></span>
            <span className="p-head-wrap"><span className="p-head-line">out of the way.</span></span>
          </h2>
        </div>

        <ul className="pillar-list">
          {PILLARS.map((p, i) => (
            <li
              key={p.title}
              className={`pillar-row ${active === i ? "is-active" : ""}`}
              onMouseEnter={() => setActive(i)}
              style={{ '--pillar-accent': p.accent }}
            >
              <Link href={p.href} className="pillar-link" data-cursor="view" data-cursor-label="Explore">
                <span className="pillar-num">{p.num}</span>

                <div className="pillar-text">
                  <h3 className="pillar-title">
                    <span className="pillar-title-main">{p.title}</span>
                    <span className="pillar-title-sub">{p.tagline}</span>
                  </h3>
                  <p className="pillar-desc">{p.desc}</p>
                  <ul className="pillar-caps">
                    {p.capabilities.map((c, j) => (
                      <li key={j}>{c}</li>
                    ))}
                  </ul>
                </div>

                <div className="pillar-media">
                  <div className="pillar-media-frame">
                    <img src={p.image} alt="" />
                    <div className="pillar-media-label">
                      <span>{p.title} pillar</span>
                      <span>↗</span>
                    </div>
                  </div>
                </div>
              </Link>
            </li>
          ))}
        </ul>
      </div>
    </section>
  );
}
