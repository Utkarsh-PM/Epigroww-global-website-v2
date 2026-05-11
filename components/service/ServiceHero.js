"use client";
import { useEffect, useRef } from "react";
import gsap from "gsap";
import { ScrollTrigger } from "gsap/ScrollTrigger";
import "./ServiceHero.scss";

if (typeof window !== "undefined") gsap.registerPlugin(ScrollTrigger);

export default function ServiceHero({
  pillarLabel = "Media",
  pillarNum = "04",
  headingStart = "Accelerate revenue with",
  headingAccent = "paid media",
  headingEnd = "that earns its CAC.",
  lede = "",
  stats = [],
  variant = "media",
}) {
  const ref = useRef(null);

  useEffect(() => {
    const ctx = gsap.context(() => {
      const tl = gsap.timeline({ delay: 0.2 });
      tl.fromTo(
        ".sh-kicker > *",
        { opacity: 0, y: 14 },
        { opacity: 1, y: 0, duration: 0.9, ease: "power3.out", stagger: 0.08 }
      );
      tl.fromTo(
        ".sh-word",
        { yPercent: 110 },
        { yPercent: 0, duration: 1.2, ease: "power4.out", stagger: 0.055 },
        "-=0.6"
      );
      tl.fromTo(
        ".sh-meta-right > *",
        { opacity: 0, y: 20 },
        { opacity: 1, y: 0, duration: 0.8, stagger: 0.07, ease: "power3.out" },
        "-=0.7"
      );
      tl.fromTo(
        ".sh-vis",
        { scale: 0.92, opacity: 0 },
        { scale: 1, opacity: 1, duration: 1.2, ease: "expo.out" },
        "-=0.9"
      );

      gsap.to(".sh-vis-float", {
        y: -14,
        duration: 3.5,
        repeat: -1,
        yoyo: true,
        ease: "sine.inOut",
      });
    }, ref);
    return () => ctx.revert();
  }, []);

  const wrap = (text) => text.split(" ").map((w, i) => (
    <span key={i} className="word-wrap">
      <span className="sh-word">{w}</span>
    </span>
  ));

  return (
    <section ref={ref} className={`sh sh-${variant}`}>
      <div className="sh-inner">
        <div className="sh-kicker">
          <span className="sh-pillar">
            <span className="sh-pillar-num">{pillarNum}</span>
            <span>— {pillarLabel}</span>
          </span>
          <span className="sh-dot" />
          <span className="sh-status">Now accepting Q3 · Q4 2026 engagements</span>
        </div>

        <h1 className="sh-head">
          {wrap(headingStart)}{" "}
          <span className="word-wrap"><span className="sh-word serif">{headingAccent}</span></span>{" "}
          {wrap(headingEnd)}
        </h1>

        <div className="sh-footer">
          <p className="sh-lede">{lede}</p>
          <div className="sh-meta-right">
            {stats.map((s, i) => (
              <div key={i} className="sh-meta-item">
                <span className="sh-meta-num">{s.num}</span>
                <span className="sh-meta-lab">{s.label}</span>
              </div>
            ))}
          </div>
        </div>

        <div className="sh-vis" aria-hidden="true">
          <div className="sh-vis-float">
            {variant === "media" && (
              <svg viewBox="0 0 260 260" width="260" height="260">
                <defs>
                  <linearGradient id="g1" x1="0" y1="0" x2="1" y2="1">
                    <stop offset="0" stopColor="#E3E65D" />
                    <stop offset="1" stopColor="#F4F0A0" />
                  </linearGradient>
                </defs>
                <circle cx="130" cy="130" r="110" fill="none" stroke="url(#g1)" strokeWidth="1" strokeDasharray="2 4" />
                <circle cx="130" cy="130" r="80" fill="none" stroke="url(#g1)" strokeWidth="1" strokeDasharray="4 6" opacity="0.6" />
                <circle cx="130" cy="130" r="50" fill="url(#g1)" opacity="0.9" />
                <circle cx="130" cy="130" r="30" fill="#141730" />
                <text x="130" y="135" textAnchor="middle" fill="#F0F0F0" fontFamily="var(--font-display)" fontSize="12" fontWeight="700">MEDIA</text>
              </svg>
            )}
            {variant === "brand" && (
              <svg viewBox="0 0 260 260" width="260" height="260">
                <rect x="20" y="20" width="220" height="220" fill="none" stroke="var(--accent)" strokeWidth="1" />
                <rect x="50" y="50" width="160" height="160" fill="none" stroke="var(--accent)" strokeWidth="1" opacity="0.5" />
                <rect x="80" y="80" width="100" height="100" fill="var(--accent)" />
                <text x="130" y="135" textAnchor="middle" fill="#141730" fontFamily="var(--font-serif)" fontStyle="italic" fontSize="20">brand</text>
              </svg>
            )}
            {variant === "tech" && (
              <svg viewBox="0 0 260 260" width="260" height="260">
                <polygon points="130,20 240,130 130,240 20,130" fill="none" stroke="var(--accent)" strokeWidth="1" />
                <polygon points="130,50 210,130 130,210 50,130" fill="none" stroke="var(--accent)" strokeWidth="1" opacity="0.6" />
                <polygon points="130,80 180,130 130,180 80,130" fill="var(--accent)" />
                <text x="130" y="136" textAnchor="middle" fill="#141730" fontFamily="var(--font-display)" fontSize="12" fontWeight="500">TECH</text>
              </svg>
            )}
          </div>
        </div>
      </div>
    </section>
  );
}
