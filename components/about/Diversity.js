"use client";
import { useEffect, useRef } from "react";
import gsap from "gsap";
import { ScrollTrigger } from "gsap/ScrollTrigger";
import "./Diversity.scss";

if (typeof window !== "undefined") gsap.registerPlugin(ScrollTrigger);

const DEFAULT_BARS = [
  { label: "White", pct: 40, color: "#E3E65D" },
  { label: "Asian", pct: 30, color: "#CFDE54" },
  { label: "Hispanic · Latinx", pct: 19, color: "#F4F0A0" },
  { label: "Black", pct: 8, color: "#B5B847" },
  { label: "Two or more races", pct: 3, color: "#F0F0F0" },
];

const DEFAULT_META = [
  { num: "100+", label: "team members" },
  { num: "22", label: "nationalities" },
  { num: "1st", label: "generation founded" },
];

function mapBars(rows) {
  if (!Array.isArray(rows) || rows.length === 0) return DEFAULT_BARS;
  return rows.map((b, i) => ({
    label: b.label || "",
    pct: Number(b.pct) || 0,
    color: b.colorHex || DEFAULT_BARS[i]?.color || "#E3E65D",
  }));
}

export default function Diversity({ data = {} }) {
  const ref = useRef(null);
  const BARS = mapBars(data.bars);
  const META = (data.metaStats && data.metaStats.length) ? data.metaStats : DEFAULT_META;
  const label = data.label || "— Diversity & Inclusion";
  const heading = data.heading || "A minority-founded, deliberately mixed house.";
  const body = data.body || "We built Epigroww on the belief that the best work comes out of rooms that disagree well.";

  useEffect(() => {
    const ctx = gsap.context(() => {
      gsap.fromTo(
        ".dv-bar-fill",
        { scaleX: 0 },
        {
          scaleX: 1,
          duration: 1.6,
          ease: "power3.out",
          stagger: 0.08,
          scrollTrigger: { trigger: ".dv-chart", start: "top 80%" },
        }
      );

      gsap.utils.toArray(".dv-pct").forEach((el) => {
        const target = parseFloat(el.dataset.pct);
        const obj = { v: 0 };
        gsap.to(obj, {
          v: target,
          duration: 1.4,
          ease: "power3.out",
          scrollTrigger: { trigger: el, start: "top 85%" },
          onUpdate: () => { el.textContent = Math.round(obj.v) + '%'; },
        });
      });
    }, ref);
    return () => ctx.revert();
  }, []);

  return (
    <section ref={ref} className="dv">
      <div className="dv-inner">
        <div className="dv-left">
          <span className="dv-label">{label}</span>
          <h2 className="dv-heading">{heading}</h2>
          <p className="dv-body">{body}</p>
          <div className="dv-meta">
            {META.map((m, i) => (
              <div key={i}>
                <span className="dv-meta-num">{m.num}</span>
                <span className="dv-meta-lab">{m.label}</span>
              </div>
            ))}
          </div>
        </div>

        <div className="dv-chart">
          <div className="dv-chart-top">
            <span>Workforce composition</span>
            <span>FY 2025 – 26</span>
          </div>
          {BARS.map((b, i) => (
            <div key={i} className="dv-row">
              <div className="dv-row-head">
                <span className="dv-row-label">{b.label}</span>
                <span className="dv-pct" data-pct={b.pct}>0%</span>
              </div>
              <div className="dv-bar">
                <div className="dv-bar-fill" style={{ width: `${b.pct}%`, background: b.color }} />
              </div>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
}
