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
                <circle cx="130" cy="130" r="110" fill="none" stroke="var(--accent)" strokeWidth="1" strokeDasharray="2 4" opacity="0.7" />
                <circle cx="130" cy="130" r="80" fill="none" stroke="var(--accent)" strokeWidth="1" strokeDasharray="4 6" opacity="0.5" />
                <circle cx="130" cy="130" r="50" fill="var(--accent)" />
                <circle cx="130" cy="130" r="30" fill="var(--on-accent)" />
                <text x="130" y="135" textAnchor="middle" fill="var(--accent)" fontFamily="var(--font-display)" fontSize="12" fontWeight="700">MEDIA</text>
              </svg>
            )}
            {variant === "brand" && (
              <svg viewBox="0 0 260 260" width="260" height="260">
                <rect x="20" y="20" width="220" height="220" fill="none" stroke="var(--accent)" strokeWidth="1" />
                <rect x="50" y="50" width="160" height="160" fill="none" stroke="var(--accent)" strokeWidth="1" opacity="0.5" />
                <rect x="80" y="80" width="100" height="100" fill="var(--accent)" />
                <text x="130" y="135" textAnchor="middle" fill="var(--on-accent)" fontFamily="var(--font-serif)" fontStyle="italic" fontSize="20">brand</text>
              </svg>
            )}
            {variant === "tech" && (
              <svg viewBox="0 0 260 260" width="260" height="260">
                <polygon points="130,20 240,130 130,240 20,130" fill="none" stroke="var(--accent)" strokeWidth="1" />
                <polygon points="130,50 210,130 130,210 50,130" fill="none" stroke="var(--accent)" strokeWidth="1" opacity="0.6" />
                <polygon points="130,80 180,130 130,180 80,130" fill="var(--accent)" />
                <text x="130" y="136" textAnchor="middle" fill="var(--on-accent)" fontFamily="var(--font-display)" fontSize="12" fontWeight="500">TECH</text>
              </svg>
            )}
            {variant === "ecommerce" && (
              <svg viewBox="0 0 260 260" width="260" height="260">
                <circle cx="130" cy="130" r="110" fill="none" stroke="var(--accent)" strokeWidth="1" strokeDasharray="2 5" opacity="0.7" />
                <rect x="60" y="60" width="140" height="140" rx="18" fill="none" stroke="var(--accent)" strokeWidth="1" opacity="0.55" />
                <rect x="86" y="86" width="88" height="88" rx="14" fill="var(--accent)" />
                <path d="M104 118 h52 l-6 30 h-40 z" fill="var(--on-accent)" />
                <circle cx="116" cy="158" r="5" fill="var(--on-accent)" />
                <circle cx="146" cy="158" r="5" fill="var(--on-accent)" />
                <path d="M104 118 l-4 -10 h-10" stroke="var(--on-accent)" strokeWidth="2" fill="none" strokeLinecap="round" />
              </svg>
            )}
          </div>
        </div>
      </div>
    </section>
  );
}
