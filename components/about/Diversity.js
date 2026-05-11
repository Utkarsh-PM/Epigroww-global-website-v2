"use client";
import { useEffect, useRef } from "react";
import gsap from "gsap";
import { ScrollTrigger } from "gsap/ScrollTrigger";
import "./Diversity.scss";

if (typeof window !== "undefined") gsap.registerPlugin(ScrollTrigger);

const BARS = [
  { label: "White", pct: 40, color: "#E3E65D" },
  { label: "Asian", pct: 30, color: "#CFDE54" },
  { label: "Hispanic · Latinx", pct: 19, color: "#F4F0A0" },
  { label: "Black", pct: 8, color: "#B5B847" },
  { label: "Two or more races", pct: 3, color: "#F0F0F0" },
];

export default function Diversity() {
  const ref = useRef(null);

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
          <span className="dv-label">— Diversity & Inclusion</span>
          <h2 className="dv-heading">
            A minority-founded,<br />
            deliberately <span className="serif">mixed</span> house.
          </h2>
          <p className="dv-body">
            We built Epigroww on the belief that the best work comes out of rooms that disagree well. Our team composition isn't a dashboard metric — it's the reason the work lands in markets that global holding companies can't read.
          </p>
          <div className="dv-meta">
            <div>
              <span className="dv-meta-num">100+</span>
              <span className="dv-meta-lab">team members</span>
            </div>
            <div>
              <span className="dv-meta-num">22</span>
              <span className="dv-meta-lab">nationalities</span>
            </div>
            <div>
              <span className="dv-meta-num">1st</span>
              <span className="dv-meta-lab">generation founded</span>
            </div>
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
