"use client";
import { useEffect, useRef } from "react";
import gsap from "gsap";
import { ScrollTrigger } from "gsap/ScrollTrigger";
import "./ServiceApproach.scss";

if (typeof window !== "undefined") gsap.registerPlugin(ScrollTrigger);

export default function ServiceApproach({ title, subtitle, steps = [] }) {
  const ref = useRef(null);

  useEffect(() => {
    const ctx = gsap.context(() => {
      gsap.utils.toArray(".sa-step").forEach((step, i) => {
        gsap.fromTo(
          step,
          { opacity: 0, x: -40 },
          {
            opacity: 1,
            x: 0,
            duration: 0.9,
            ease: "power3.out",
            delay: i * 0.08,
            scrollTrigger: { trigger: step, start: "top 85%" },
          }
        );
      });
    }, ref);
    return () => ctx.revert();
  }, []);

  return (
    <section ref={ref} className="sa">
      <div className="sa-inner">
        <div className="sa-head">
          <span className="sa-label">— {subtitle}</span>
          <h2 className="sa-heading">{title}</h2>
        </div>
        <ol className="sa-list">
          {steps.map((s, i) => (
            <li key={i} className="sa-step">
              <span className="sa-step-num">{String(i + 1).padStart(2, "0")}</span>
              <div className="sa-step-content">
                <h3>{s.title}</h3>
                <p>{s.body}</p>
              </div>
              <span className="sa-step-icon">{s.icon}</span>
            </li>
          ))}
        </ol>
      </div>
    </section>
  );
}
