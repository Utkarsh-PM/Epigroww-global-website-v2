"use client";
import { useEffect, useRef } from "react";
import gsap from "gsap";
import { ScrollTrigger } from "gsap/ScrollTrigger";
import "./CapabilityGrid.scss";

if (typeof window !== "undefined") gsap.registerPlugin(ScrollTrigger);

export default function CapabilityGrid({ title, accent, intro, items = [], variant = "default" }) {
  const ref = useRef(null);

  useEffect(() => {
    const ctx = gsap.context(() => {
      gsap.fromTo(
        ".cg-head-word",
        { yPercent: 110 },
        {
          yPercent: 0,
          duration: 1,
          ease: "power4.out",
          stagger: 0.05,
          scrollTrigger: { trigger: ".cg-head", start: "top 80%" },
        }
      );
      gsap.utils.toArray(".cg-card").forEach((card, i) => {
        gsap.fromTo(
          card,
          { y: 70, opacity: 0 },
          {
            y: 0,
            opacity: 1,
            duration: 0.95,
            delay: (i % 3) * 0.08,
            ease: "power3.out",
            scrollTrigger: { trigger: card, start: "top 90%" },
          }
        );
      });
    }, ref);
    return () => ctx.revert();
  }, []);

  return (
    <section ref={ref} className={`cg cg-${variant}`}>
      <div className="cg-bg-grid" aria-hidden="true" />
      <div className="cg-inner">
        <div className="cg-head">
          <span className="cg-label">
            <span className="cg-label-dot" />
            <span>— Capabilities</span>
          </span>
          <h2 className="cg-heading">
            {title.split(" ").map((w, i) => (
              <span key={i} className="word-wrap">
                <span className="cg-head-word">{w}</span>
              </span>
            ))}{" "}
            <span className="word-wrap"><span className="cg-head-word serif">{accent}</span></span>
          </h2>
          {intro && <p className="cg-intro">{intro}</p>}
        </div>

        <div className="cg-grid">
          {items.map((it, i) => (
            <article key={i} className="cg-card" data-cursor="hover">
              <div className="cg-card-media" aria-hidden={!it.image}>
                {it.image && <img src={it.image} alt="" loading="lazy" />}
                <span className="cg-card-shine" />
                <div className="cg-card-media-meta">
                  <span className="cg-card-num">{String(i + 1).padStart(2, "0")}</span>
                  <span className="cg-card-icon">{it.icon}</span>
                </div>
                <div className="cg-card-media-tint" />
              </div>

              <div className="cg-card-body">
                <h3 className="cg-card-title">{it.title}</h3>
                <p className="cg-card-body-text">{it.body}</p>
                <ul className="cg-card-chips">
                  {it.chips?.map((c) => <li key={c}>{c}</li>)}
                </ul>
                <div className="cg-card-foot">
                  <span className="cg-card-cta">Explore</span>
                  <div className="cg-card-arrow">
                    <svg viewBox="0 0 24 24" width="16" height="16">
                      <path d="M6 18 L18 6 M10 6 L18 6 L18 14" fill="none" stroke="currentColor" strokeWidth="1.8"/>
                    </svg>
                  </div>
                </div>
              </div>
            </article>
          ))}
        </div>
      </div>
    </section>
  );
}
