"use client";
import { useEffect, useRef, useState } from "react";
import gsap from "gsap";
import { ScrollTrigger } from "gsap/ScrollTrigger";
import "./BeforeAfter.scss";

if (typeof window !== "undefined") gsap.registerPlugin(ScrollTrigger);

const CASES = [
  {
    k: "beauty",
    client: "D2C Beauty · India",
    discipline: "Brand identity + packaging",
    before: "https://images.unsplash.com/photo-1512496015851-a90fb38ba796?auto=format&fit=crop&w=1400&q=80",
    after: "https://images.unsplash.com/photo-1596462502278-27bfdc403348?auto=format&fit=crop&w=1400&q=80",
    metrics: [
      { k: "+340%", label: "Brand recall" },
      { k: "+128%", label: "Repeat purchase" },
      { k: "-22%", label: "Unit COGS" },
    ],
  },
  {
    k: "fmcg",
    client: "Infinity · JK Lifestyle",
    discipline: "Launch film + creative suite",
    before: "https://images.unsplash.com/photo-1531177071211-f57b33aab4f9?auto=format&fit=crop&w=1400&q=80",
    after: "https://images.unsplash.com/photo-1541643600914-78b084683601?auto=format&fit=crop&w=1400&q=80",
    metrics: [
      { k: "3.4×", label: "Launch ROAS" },
      { k: "1.2M", label: "First-week views" },
      { k: "+58%", label: "Retention" },
    ],
  },
  {
    k: "auto",
    client: "Automotive · MENA",
    discipline: "TVC + performance cut-downs",
    before: "https://images.unsplash.com/photo-1486754735734-325b5831c3ad?auto=format&fit=crop&w=1400&q=80",
    after: "https://images.unsplash.com/photo-1492144534655-ae79c964c9d7?auto=format&fit=crop&w=1400&q=80",
    metrics: [
      { k: "-37%", label: "CPL" },
      { k: "8 cuts", label: "From one shoot" },
      { k: "2.1×", label: "Engagement" },
    ],
  },
];

export default function BeforeAfter() {
  const ref = useRef(null);
  const [active, setActive] = useState(0);
  const [pos, setPos] = useState(50);
  const dragRef = useRef(false);
  const frameRef = useRef(null);

  useEffect(() => {
    const ctx = gsap.context(() => {
      gsap.fromTo(
        ".ba-head-word",
        { yPercent: 110 },
        {
          yPercent: 0,
          duration: 1,
          ease: "power4.out",
          stagger: 0.05,
          scrollTrigger: { trigger: ".ba-head", start: "top 80%" },
        }
      );
      gsap.fromTo(
        ".ba-canvas",
        { clipPath: "inset(10% 0 10% 0 round 28px)", scale: 1.02 },
        {
          clipPath: "inset(0% 0 0% 0 round 24px)",
          scale: 1,
          ease: "none",
          scrollTrigger: {
            trigger: ".ba-canvas",
            start: "top 85%",
            end: "top 30%",
            scrub: 1,
          },
        }
      );
    }, ref);
    return () => ctx.revert();
  }, []);

  const updatePos = (clientX) => {
    const el = frameRef.current;
    if (!el) return;
    const rect = el.getBoundingClientRect();
    const x = Math.max(0, Math.min(1, (clientX - rect.left) / rect.width));
    setPos(x * 100);
  };

  const onPointerDown = (e) => { dragRef.current = true; updatePos(e.clientX); };
  const onPointerMove = (e) => { if (dragRef.current) updatePos(e.clientX); };
  const onPointerUp = () => { dragRef.current = false; };
  const onMouseMove = (e) => { if (!dragRef.current) updatePos(e.clientX); };

  useEffect(() => {
    const up = () => { dragRef.current = false; };
    window.addEventListener("pointerup", up);
    return () => window.removeEventListener("pointerup", up);
  }, []);

  const c = CASES[active];

  return (
    <section ref={ref} className="ba">
      <div className="ba-inner">
        <div className="ba-head">
          <span className="ba-label">— Before / After</span>
          <h2 className="ba-heading">
            <span className="word-wrap"><span className="ba-head-word">The</span></span>{" "}
            <span className="word-wrap"><span className="ba-head-word">work</span></span>{" "}
            <span className="word-wrap"><span className="ba-head-word serif">we</span></span>{" "}
            <span className="word-wrap"><span className="ba-head-word serif">were</span></span>{" "}
            <span className="word-wrap"><span className="ba-head-word serif">hired</span></span>{" "}
            <span className="word-wrap"><span className="ba-head-word serif">to</span></span>{" "}
            <span className="word-wrap"><span className="ba-head-word serif">fix.</span></span>
          </h2>
          <p className="ba-lede">
            Drag the handle to see the before state. Every project starts with an honest audit — sometimes the brand needed a new logo, sometimes it needed a better ad, sometimes it needed everything.
          </p>
        </div>

        <div className="ba-stage">
          <div
            ref={frameRef}
            className="ba-canvas"
            onPointerDown={onPointerDown}
            onPointerMove={onPointerMove}
            onMouseMove={onMouseMove}
            onPointerUp={onPointerUp}
            data-cursor="drag"
            data-cursor-label="Drag"
          >
            <img className="ba-after" src={c.after} alt={`${c.client} — after`} draggable={false} />
            <div className="ba-before-wrap" style={{ width: `${pos}%` }}>
              <img
                className="ba-before"
                src={c.before}
                alt={`${c.client} — before`}
                draggable={false}
                style={{ width: frameRef.current ? `${frameRef.current.offsetWidth}px` : "100%" }}
              />
            </div>

            <div className="ba-label-before" style={{ left: `${Math.max(2, pos - 24)}%` }}>Before</div>
            <div className="ba-label-after">After · Epigroww</div>

            <div className="ba-handle" style={{ left: `${pos}%` }}>
              <span className="ba-handle-grip">
                <svg width="18" height="18" viewBox="0 0 24 24">
                  <path d="M8 6 L4 12 L8 18 M16 6 L20 12 L16 18" fill="none" stroke="currentColor" strokeWidth="1.8" strokeLinecap="round" strokeLinejoin="round"/>
                </svg>
              </span>
            </div>
          </div>

          <div className="ba-side">
            <div className="ba-side-top">
              <span>{String(active + 1).padStart(2, "0")} / {String(CASES.length).padStart(2, "0")}</span>
              <span className="ba-side-kind">{c.discipline}</span>
            </div>
            <h3 className="ba-side-client">{c.client}</h3>

            <div className="ba-metrics">
              {c.metrics.map((m) => (
                <div key={m.k} className="ba-metric">
                  <span className="ba-metric-num">{m.k}</span>
                  <span className="ba-metric-lab">{m.label}</span>
                </div>
              ))}
            </div>

            <div className="ba-nav">
              {CASES.map((x, i) => (
                <button
                  key={x.k}
                  className={`ba-nav-item ${active === i ? "is-active" : ""}`}
                  onClick={() => { setActive(i); setPos(50); }}
                >
                  <span>{String(i + 1).padStart(2, "0")}</span>
                  <span>{x.client}</span>
                </button>
              ))}
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}
