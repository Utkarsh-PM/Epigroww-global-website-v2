"use client";
import { useEffect, useRef, useState } from "react";
import gsap from "gsap";
import { ScrollTrigger } from "gsap/ScrollTrigger";
import "./GrowthEngine.scss";

if (typeof window !== "undefined") gsap.registerPlugin(ScrollTrigger);

const PILLARS = [
  {
    k: "media",
    num: "01",
    label: "Media",
    sub: "The spend",
    desc: "Paid everywhere the customer is — Meta, Google, Amazon, CTV, programmatic, retention. Engineered around incrementality.",
    services: ["Performance", "Programmatic", "Retention", "Marketplace"],
    angle: -90,
  },
  {
    k: "brand",
    num: "02",
    label: "Brand",
    sub: "The creative",
    desc: "A full creative house — 100+ pieces a week. Films, UGC, CGI, identity, packaging. Craft without the timeline drag.",
    services: ["Performance creative", "Films & TVC", "Identity", "Influencer"],
    angle: -18,
  },
  {
    k: "tech",
    num: "03",
    label: "Tech",
    sub: "The plumbing",
    desc: "Websites, stacks, automations. Green Core Web Vitals. CRM your team actually uses. Built to stay out of the way.",
    services: ["Web build", "CRM & ERP", "Analytics", "Automation"],
    angle: 54,
  },
  {
    k: "ai",
    num: "04",
    label: "AI",
    sub: "The force-multiplier",
    desc: "LLM-native pods shipping assistants, agents, copy engines, and audience models — guard-railed, evaluated, owned by you.",
    services: ["Assistants", "Agents", "Copy engines", "Audience models"],
    angle: 126,
  },
  {
    k: "ecommerce",
    num: "05",
    label: "Ecommerce",
    sub: "The revenue line",
    desc: "D2C storefronts, marketplace P&Ls, CRO, fulfilment and retention — engineered as one revenue product, not five stitched vendors.",
    services: ["Shopify & D2C", "Marketplaces", "CRO", "Retention"],
    angle: 198,
  },
];

export default function GrowthEngine() {
  const ref = useRef(null);
  const [active, setActive] = useState(0);

  useEffect(() => {
    const ctx = gsap.context(() => {
      gsap.fromTo(
        ".ge-head-word",
        { yPercent: 110 },
        {
          yPercent: 0,
          duration: 1,
          ease: "power4.out",
          stagger: 0.05,
          scrollTrigger: { trigger: ".ge-head", start: "top 80%" },
        }
      );
      gsap.fromTo(
        ".ge-orbit",
        { scale: 0.7, opacity: 0, rotate: -40 },
        {
          scale: 1,
          opacity: 1,
          rotate: 0,
          duration: 1.6,
          ease: "expo.out",
          scrollTrigger: { trigger: ".ge-stage", start: "top 75%" },
        }
      );
      gsap.fromTo(
        ".ge-ring",
        { strokeDashoffset: 1200 },
        {
          strokeDashoffset: 0,
          duration: 2.2,
          ease: "power3.out",
          scrollTrigger: { trigger: ".ge-stage", start: "top 75%" },
        }
      );
      gsap.fromTo(
        ".ge-node",
        { scale: 0, opacity: 0 },
        {
          scale: 1,
          opacity: 1,
          duration: 0.8,
          stagger: 0.1,
          ease: "back.out(1.6)",
          scrollTrigger: { trigger: ".ge-stage", start: "top 70%" },
        }
      );

      // Gentle continuous rotation of the outer orbit
      gsap.to(".ge-rotate-slow", {
        rotate: 360,
        duration: 90,
        ease: "none",
        repeat: -1,
        transformOrigin: "50% 50%",
      });
    }, ref);

    // Auto-rotate active pillar
    const iv = setInterval(() => setActive((i) => (i + 1) % PILLARS.length), 4800);
    return () => {
      ctx.revert();
      clearInterval(iv);
    };
  }, []);

  const p = PILLARS[active];

  return (
    <section ref={ref} className="ge">
      <div className="ge-inner">
        <div className="ge-head">
          <span className="ge-label">— 03 / The growth engine</span>
          <h2 className="ge-heading">
            <span className="word-wrap"><span className="ge-head-word">Four</span></span>{" "}
            <span className="word-wrap"><span className="ge-head-word">disciplines</span></span>
            <span className="word-wrap"><span className="ge-head-word">,</span></span>{" "}
            <span className="word-wrap"><span className="ge-head-word">one</span></span>{" "}
            <span className="word-wrap"><span className="ge-head-word serif">compounding</span></span>{" "}
            <span className="word-wrap"><span className="ge-head-word">system.</span></span>
          </h2>
          <p className="ge-lede">
            Media, Brand, Tech and AI — run as a single pod, priced as a single retainer, measured against a single revenue line. One system your CFO can read.
          </p>
        </div>

        <div className="ge-stage">
          <div className="ge-orbit">
            <svg viewBox="-100 -100 200 200" className="ge-orbit-svg" aria-hidden="true">
              <defs>
                <radialGradient id="geCoreGrad" cx="50%" cy="50%" r="50%">
                  <stop offset="0" stopColor="#E3E65D" stopOpacity="0.55" />
                  <stop offset="1" stopColor="#E3E65D" stopOpacity="0" />
                </radialGradient>
              </defs>
              {/* Rotating outer dashed ring */}
              <g className="ge-rotate-slow">
                <circle className="ge-ring ge-ring-outer" r="90" />
                <circle className="ge-ring ge-ring-mid" r="66" />
              </g>
              {/* Inner solid ring */}
              <circle className="ge-ring ge-ring-inner" r="46" />
              {/* Center glow */}
              <circle r="34" fill="url(#geCoreGrad)" />
              {/* Axis lines */}
              <line x1="-90" y1="0" x2="90" y2="0" className="ge-axis" />
              <line x1="0" y1="-90" x2="0" y2="90" className="ge-axis" />

              {PILLARS.map((pi, i) => {
                const rad = (pi.angle * Math.PI) / 180;
                const x = Math.cos(rad) * 66;
                const y = Math.sin(rad) * 66;
                return (
                  <g
                    key={pi.k}
                    className={`ge-node ${active === i ? "is-active" : ""}`}
                    transform={`translate(${x}, ${y})`}
                    onMouseEnter={() => setActive(i)}
                    onClick={() => setActive(i)}
                  >
                    <circle r="12" className="ge-node-ring" />
                    <circle r="6" className="ge-node-core" />
                  </g>
                );
              })}
            </svg>

            <div className="ge-center">
              <span className="ge-center-label">The system</span>
              <span className="ge-center-word">{p.label}</span>
              <span className="ge-center-sub">{p.sub}</span>
            </div>

            {PILLARS.map((pi, i) => {
              const rad = (pi.angle * Math.PI) / 180;
              // Position labels outside the orbit
              const labelX = Math.cos(rad) * 46;
              const labelY = Math.sin(rad) * 46;
              return (
                <button
                  key={pi.k}
                  type="button"
                  className={`ge-pill ge-pill-${pi.k} ${active === i ? "is-active" : ""}`}
                  style={{
                    left: `calc(50% + ${labelX}%)`,
                    top: `calc(50% + ${labelY}%)`,
                  }}
                  onMouseEnter={() => setActive(i)}
                  onClick={() => setActive(i)}
                >
                  <span className="ge-pill-num">{pi.num}</span>
                  <span className="ge-pill-lab">{pi.label}</span>
                </button>
              );
            })}
          </div>

          <div className="ge-detail">
            <div className="ge-detail-top">
              <span>{p.num} / {String(PILLARS.length).padStart(2, "0")}</span>
              <span className="ge-detail-sub">{p.sub}</span>
            </div>
            <h3 className="ge-detail-title">{p.label}</h3>
            <p className="ge-detail-desc">{p.desc}</p>
            <ul className="ge-detail-chips">
              {p.services.map((s) => <li key={s}>{s}</li>)}
            </ul>
            <div className="ge-detail-progress">
              {PILLARS.map((_, i) => (
                <span
                  key={i}
                  className={`ge-detail-bar ${active === i ? "is-active" : ""}`}
                  onMouseEnter={() => setActive(i)}
                  onClick={() => setActive(i)}
                />
              ))}
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}
