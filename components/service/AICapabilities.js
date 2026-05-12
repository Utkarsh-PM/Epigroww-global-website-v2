"use client";
import { useEffect, useRef } from "react";
import gsap from "gsap";
import { ScrollTrigger } from "gsap/ScrollTrigger";
import "./AICapabilities.scss";

if (typeof window !== "undefined") gsap.registerPlugin(ScrollTrigger);

export default function AICapabilities({ title, accent, intro, items = [] }) {
  const ref = useRef(null);

  useEffect(() => {
    const ctx = gsap.context(() => {
      gsap.fromTo(
        ".ac-head-word",
        { yPercent: 110 },
        {
          yPercent: 0,
          duration: 1,
          ease: "power4.out",
          stagger: 0.05,
          scrollTrigger: { trigger: ".ac-head", start: "top 80%" },
        }
      );
      gsap.utils.toArray(".ac-card").forEach((card, i) => {
        gsap.fromTo(
          card,
          { y: 60, opacity: 0, scale: 0.97 },
          {
            y: 0,
            opacity: 1,
            scale: 1,
            duration: 1,
            delay: (i % 4) * 0.06,
            ease: "power3.out",
            scrollTrigger: { trigger: card, start: "top 92%" },
          }
        );
      });
    }, ref);
    return () => ctx.revert();
  }, []);

  return (
    <section ref={ref} className="ac">
      <div className="ac-bg" aria-hidden="true">
        <div className="ac-bg-orb ac-bg-orb--a" />
        <div className="ac-bg-orb ac-bg-orb--b" />
        <div className="ac-bg-dots" />
      </div>

      <div className="ac-inner">
        <div className="ac-head">
          <span className="ac-label">
            <span className="ac-label-pulse" />
            <span>system · agents online</span>
          </span>
          <h2 className="ac-heading">
            {title.split(" ").map((w, i) => (
              <span key={i} className="word-wrap">
                <span className="ac-head-word">{w}</span>
              </span>
            ))}{" "}
            <span className="word-wrap">
              <span className="ac-head-word serif">{accent}</span>
            </span>
          </h2>
          {intro && <p className="ac-intro">{intro}</p>}
        </div>

        <div className="ac-grid">
          {items.map((it, i) => (
            <article key={i} className="ac-card" data-cursor="hover">
              <div className="ac-card-glow" aria-hidden="true" />
              <div className="ac-card-inner">
                <header className="ac-card-head">
                  <span className="ac-card-id">
                    <span className="ac-card-id-dot" />
                    agent_{String(i + 1).padStart(2, "0")}
                  </span>
                  <span className="ac-card-status">
                    <span className="ac-card-status-dot" />
                    active
                  </span>
                </header>

                <div className="ac-card-visual">
                  {it.image && <img src={it.image} alt="" loading="lazy" />}
                  <div className="ac-card-visual-mesh" />
                  <div className="ac-card-visual-tint" />
                  <div className="ac-card-glyph">{it.icon}</div>
                </div>

                <div className="ac-card-body">
                  <h3 className="ac-card-title">{it.title}</h3>
                  <p className="ac-card-body-text">{it.body}</p>

                  <ul className="ac-card-chips">
                    {it.chips?.map((c) => (
                      <li key={c}>
                        <span className="ac-card-chip-spark" />
                        {c}
                      </li>
                    ))}
                  </ul>

                  <div className="ac-card-foot">
                    <span className="ac-card-cta">
                      <span className="ac-card-cta-prompt">→</span> deploy agent
                    </span>
                    <div className="ac-card-arrow">
                      <svg viewBox="0 0 24 24" width="14" height="14">
                        <path
                          d="M5 12h14M13 6l6 6-6 6"
                          fill="none"
                          stroke="currentColor"
                          strokeWidth="1.8"
                          strokeLinecap="round"
                          strokeLinejoin="round"
                        />
                      </svg>
                    </div>
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
