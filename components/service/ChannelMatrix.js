"use client";
import { useEffect, useRef } from "react";
import gsap from "gsap";
import { ScrollTrigger } from "gsap/ScrollTrigger";
import "./ChannelMatrix.scss";

if (typeof window !== "undefined") gsap.registerPlugin(ScrollTrigger);

const CHANNELS = [
  { name: "Meta", funnel: ["Awareness", "Consideration", "Conversion", "Retention"], strength: 92 },
  { name: "Google (Search + PMax)", funnel: ["Awareness", "Consideration", "Conversion"], strength: 95 },
  { name: "Amazon Ads", funnel: ["Conversion", "Retention"], strength: 88 },
  { name: "DV360 & Programmatic", funnel: ["Awareness", "Consideration"], strength: 78 },
  { name: "CTV · Hotstar · Prime", funnel: ["Awareness"], strength: 72 },
  { name: "TikTok · Snap", funnel: ["Awareness", "Consideration"], strength: 74 },
  { name: "Klaviyo · Braze (CRM)", funnel: ["Retention", "Conversion"], strength: 90 },
  { name: "WhatsApp + SMS", funnel: ["Retention"], strength: 82 },
];

const COLS = ["Awareness", "Consideration", "Conversion", "Retention"];

export default function ChannelMatrix() {
  const ref = useRef(null);

  useEffect(() => {
    const ctx = gsap.context(() => {
      gsap.fromTo(
        ".cm-row",
        { opacity: 0, x: -20 },
        {
          opacity: 1, x: 0,
          duration: 0.8, stagger: 0.05, ease: "power3.out",
          scrollTrigger: { trigger: ".cm-table", start: "top 80%" },
        }
      );
      gsap.fromTo(
        ".cm-strength-fill",
        { scaleX: 0 },
        {
          scaleX: 1, duration: 1.4, stagger: 0.07, ease: "power3.out",
          scrollTrigger: { trigger: ".cm-table", start: "top 75%" },
        }
      );
    }, ref);
    return () => ctx.revert();
  }, []);

  return (
    <section ref={ref} className="cm">
      <div className="cm-inner">
        <div className="cm-head">
          <span className="cm-label">— Channel matrix</span>
          <h2 className="cm-heading">
            Which channels we plug into, <span className="serif">and where they earn.</span>
          </h2>
        </div>

        <div className="cm-table">
          <div className="cm-thead">
            <div className="cm-th">Channel</div>
            {COLS.map((c) => <div key={c} className="cm-th">{c}</div>)}
            <div className="cm-th">Avg. strength</div>
          </div>

          {CHANNELS.map((ch, i) => (
            <div key={i} className="cm-row">
              <div className="cm-cell cm-name">
                <span className="cm-idx">{String(i + 1).padStart(2, "0")}</span>
                <span>{ch.name}</span>
              </div>
              {COLS.map((col) => (
                <div key={col} className="cm-cell cm-dot-cell">
                  {ch.funnel.includes(col) ? (
                    <span className="cm-dot" />
                  ) : (
                    <span className="cm-empty" />
                  )}
                </div>
              ))}
              <div className="cm-cell cm-strength">
                <span className="cm-strength-bar">
                  <span
                    className="cm-strength-fill"
                    style={{ width: `${ch.strength}%` }}
                  />
                </span>
                <span className="cm-strength-num">{ch.strength}</span>
              </div>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
}
