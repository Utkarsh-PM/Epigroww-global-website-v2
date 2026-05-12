"use client";
import { useEffect, useRef, useState } from "react";
import gsap from "gsap";
import { ScrollTrigger } from "gsap/ScrollTrigger";
import "./CaseGrid.scss";

if (typeof window !== "undefined") gsap.registerPlugin(ScrollTrigger);

const DEFAULT_CASES = [
  { client: "JK Lifestyle — Infinity", tag: "Launch", category: "Brand", services: ["Brand identity", "Launch film", "Performance creatives"], outcome: "3.4× ROAS · 1.2M first-week views", year: "2025", image: "https://images.unsplash.com/photo-1541643600914-78b084683601?auto=format&fit=crop&w=1400&q=80", size: "lg" },
];

// Capitalize first letter (category in CMS is lowercase: "brand", "media", ...)
const cap = (s) => (s ? s.charAt(0).toUpperCase() + s.slice(1) : s);

function mapCases(rows) {
  if (!Array.isArray(rows) || rows.length === 0) return DEFAULT_CASES;
  return rows.map((c) => ({
    client: c.client || "",
    tag: c.tag || "",
    category: cap(c.category) || "",
    services: (c.services || []).map((s) => s.label),
    outcome: c.outcome || "",
    year: c.year || "",
    image: (c.image && c.image.url) || c.imageUrl || "",
    size: c.size || "md",
  }));
}

const CATS = ["All", "Brand", "Media", "Tech"];

export default function CaseGrid({ data = {}, cases }) {
  const ref = useRef(null);
  const [cat, setCat] = useState("All");
  const CASES = mapCases(cases);
  const label = data.label || "— Selected work";

  useEffect(() => {
    const ctx = gsap.context(() => {
      gsap.utils.toArray(".cg-case").forEach((el, i) => {
        gsap.fromTo(el,
          { y: 60, opacity: 0, clipPath: "inset(20% 0 20% 0)" },
          {
            y: 0, opacity: 1,
            clipPath: "inset(0% 0 0% 0)",
            duration: 1.1,
            delay: (i % 3) * 0.08,
            ease: "power4.out",
            scrollTrigger: { trigger: el, start: "top 88%" },
          }
        );
      });
    }, ref);
    return () => ctx.revert();
  }, [cat]);

  const shown = cat === "All" ? CASES : CASES.filter((c) => c.category === cat);

  return (
    <section ref={ref} className="w-cases">
      <div className="w-cases-inner">
        <div className="w-cases-head">
          <span className="w-cases-label">{label}</span>
          <div className="w-cases-filters">
            {CATS.map((c) => (
              <button
                key={c}
                className={`w-filter ${cat === c ? "is-active" : ""}`}
                onClick={() => setCat(c)}
                data-cursor="hover"
              >
                {c}
                <span className="w-filter-count">
                  {c === "All" ? CASES.length : CASES.filter((x) => x.category === c).length}
                </span>
              </button>
            ))}
          </div>
        </div>

        <div className="w-cases-grid">
          {shown.map((c, i) => (
            <article
              key={i}
              className={`cg-case cg-case-${c.size}`}
              data-cursor="view"
              data-cursor-label="Case"
            >
              <div className="cg-case-img">
                <img src={c.image} alt={c.client} />
                <span className="cg-case-year">{c.year}</span>
                <span className="cg-case-cat">{c.category}</span>
              </div>
              <div className="cg-case-body">
                <div className="cg-case-top">
                  <span className="cg-case-tag">{c.tag}</span>
                  <span className="cg-case-num">{String(i + 1).padStart(2, "0")}</span>
                </div>
                <h3 className="cg-case-client">{c.client}</h3>
                <div className="cg-case-foot">
                  <ul className="cg-case-services">
                    {c.services.map((s) => <li key={s}>{s}</li>)}
                  </ul>
                  <span className="cg-case-outcome">{c.outcome}</span>
                </div>
              </div>
            </article>
          ))}
        </div>
      </div>
    </section>
  );
}
