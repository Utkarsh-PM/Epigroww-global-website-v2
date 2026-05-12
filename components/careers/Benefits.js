"use client";
import { useEffect, useRef } from "react";
import gsap from "gsap";
import { ScrollTrigger } from "gsap/ScrollTrigger";
import "./Benefits.scss";

if (typeof window !== "undefined") gsap.registerPlugin(ScrollTrigger);

const DEFAULT_BENEFITS = [
  { k: "01", t: "Fully paid health", d: "Medical, dental, vision — covered 100% for employees.", icon: "✚" },
];

function mapBenefits(rows) {
  if (!Array.isArray(rows) || rows.length === 0) return DEFAULT_BENEFITS;
  return rows.map((b, i) => ({
    k: b.k || String(i + 1).padStart(2, "0"),
    t: b.title || "",
    d: b.body || "",
    icon: b.icon || "",
  }));
}

export default function Benefits({ data = {} }) {
  const ref = useRef(null);
  const BENEFITS = mapBenefits(data.items);
  const label = data.label || "— Perks & benefits";
  const headPrefix = data.headingPrefix || "The real list.";
  const headAccent = data.headingAccent || "No fine print.";

  useEffect(() => {
    const ctx = gsap.context(() => {
      gsap.utils.toArray(".bf-card").forEach((card, i) => {
        gsap.fromTo(card,
          { y: 40, opacity: 0 },
          {
            y: 0, opacity: 1,
            duration: 0.85,
            delay: (i % 4) * 0.06,
            ease: "power3.out",
            scrollTrigger: { trigger: card, start: "top 90%" },
          }
        );
      });
    }, ref);
    return () => ctx.revert();
  }, []);

  return (
    <section ref={ref} className="bf">
      <div className="bf-inner">
        <div className="bf-head">
          <span className="bf-label">{label}</span>
          <h2 className="bf-heading">
            {headPrefix}<br/>
            <span className="serif">{headAccent}</span>
          </h2>
        </div>

        <div className="bf-grid">
          {BENEFITS.map((b) => (
            <article key={b.k} className="bf-card">
              <span className="bf-icon">{b.icon}</span>
              <span className="bf-num">{b.k}</span>
              <h3>{b.t}</h3>
              <p>{b.d}</p>
            </article>
          ))}
        </div>
      </div>
    </section>
  );
}
