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

      gsap.to(".sh-vis-spin", {
        rotation: 360,
        duration: 28,
        repeat: -1,
        ease: "none",
        svgOrigin: "130 130",
      });
    }, ref);
    return () => ctx.revert();
  }, []);

  const wrap = (text) => text.split(" ").map((w, i) => (
    <span key={i} className="word-wrap">
      <span className="sh-word">{w}</span>
    </span>
  ));

  const glyphs = {
    media: (
      <g fill="none" stroke="var(--on-accent)" strokeWidth="3">
        <circle cx="130" cy="130" r="26" />
        <circle cx="130" cy="130" r="14" />
        <circle cx="130" cy="130" r="4" fill="var(--on-accent)" stroke="none" />
      </g>
    ),
    brand: (
      <path
        d="M130 92 L139.9 120.1 L168 130 L139.9 139.9 L130 168 L120.1 139.9 L92 130 L120.1 120.1 Z"
        fill="var(--on-accent)"
      />
    ),
    tech: (
      <g fill="none" stroke="var(--on-accent)" strokeWidth="4" strokeLinecap="round" strokeLinejoin="round">
        <polyline points="122,110 104,130 122,150" />
        <polyline points="138,110 156,130 138,150" />
        <line x1="142" y1="106" x2="118" y2="154" />
      </g>
    ),
    ai: (
      <g>
        <g stroke="var(--on-accent)" strokeWidth="3" strokeLinecap="round">
          <line x1="130" y1="130" x2="130" y2="100" />
          <line x1="130" y1="130" x2="104" y2="146" />
          <line x1="130" y1="130" x2="156" y2="146" />
        </g>
        <circle cx="130" cy="100" r="6" fill="var(--on-accent)" />
        <circle cx="104" cy="146" r="6" fill="var(--on-accent)" />
        <circle cx="156" cy="146" r="6" fill="var(--on-accent)" />
        <circle cx="130" cy="130" r="7" fill="var(--on-accent)" />
      </g>
    ),
    ecommerce: (
      <g fill="none" stroke="var(--on-accent)" strokeWidth="3.5" strokeLinecap="round" strokeLinejoin="round">
        <path d="M110 120 h40 l3 32 a5 5 0 0 1 -5 5 h-36 a5 5 0 0 1 -5 -5 z" />
        <path d="M120 120 v-5 a10 10 0 0 1 20 0 v5" />
      </g>
    ),
  };

  const badge = (
    <svg viewBox="0 0 260 260" width="260" height="260">
      <defs>
        <radialGradient id={`sh-glow-${variant}`} cx="50%" cy="50%" r="50%">
          <stop offset="0%" stopColor="var(--accent)" stopOpacity="0.22" />
          <stop offset="100%" stopColor="var(--accent)" stopOpacity="0" />
        </radialGradient>
      </defs>
      <circle cx="130" cy="130" r="124" fill={`url(#sh-glow-${variant})`} />
      <circle cx="130" cy="130" r="118" fill="none" stroke="var(--accent)" strokeWidth="1" opacity="0.16" />
      <g className="sh-vis-spin">
        <circle cx="130" cy="130" r="100" fill="none" stroke="var(--accent)" strokeWidth="1.5" strokeDasharray="1 13" strokeLinecap="round" opacity="0.55" />
      </g>
      <circle cx="130" cy="30" r="2.4" fill="var(--accent)" opacity="0.7" />
      <circle cx="230" cy="130" r="2.4" fill="var(--accent)" opacity="0.7" />
      <circle cx="130" cy="230" r="2.4" fill="var(--accent)" opacity="0.7" />
      <circle cx="30" cy="130" r="2.4" fill="var(--accent)" opacity="0.7" />
      <circle cx="130" cy="130" r="54" fill="var(--accent)" />
      {glyphs[variant] || glyphs.media}
    </svg>
  );

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
            {badge}
          </div>
        </div>
      </div>
    </section>
  );
}
