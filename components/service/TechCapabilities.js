"use client";
import { useEffect, useRef } from "react";
import gsap from "gsap";
import { ScrollTrigger } from "gsap/ScrollTrigger";
import "./TechCapabilities.scss";

if (typeof window !== "undefined") gsap.registerPlugin(ScrollTrigger);

const FILE_EXT = ["tsx", "ts", "jsx", "go", "py", "rs", "swift", "kt"];

export default function TechCapabilities({ title, accent, intro, items = [] }) {
  const ref = useRef(null);

  useEffect(() => {
    const ctx = gsap.context(() => {
      gsap.fromTo(
        ".tc-head-word",
        { yPercent: 110 },
        {
          yPercent: 0,
          duration: 1,
          ease: "power4.out",
          stagger: 0.05,
          scrollTrigger: { trigger: ".tc-head", start: "top 80%" },
        }
      );
      gsap.utils.toArray(".tc-card").forEach((card, i) => {
        gsap.fromTo(
          card,
          { y: 70, opacity: 0 },
          {
            y: 0,
            opacity: 1,
            duration: 1,
            delay: (i % 3) * 0.07,
            ease: "power3.out",
            scrollTrigger: { trigger: card, start: "top 92%" },
          }
        );
      });
    }, ref);
    return () => ctx.revert();
  }, []);

  const fileName = (title, i) => {
    const slug = title
      .toLowerCase()
      .replace(/[^a-z0-9]+/g, "-")
      .replace(/(^-|-$)/g, "")
      .split("-")
      .slice(0, 2)
      .join("-");
    return `${slug || "module"}.${FILE_EXT[i % FILE_EXT.length]}`;
  };

  return (
    <section ref={ref} className="tc">
      <div className="tc-bg" aria-hidden="true" />
      <div className="tc-inner">
        <div className="tc-head">
          <span className="tc-label">
            <span className="tc-label-bracket">{"<"}</span>
            <span>capabilities</span>
            <span className="tc-label-bracket">{" />"}</span>
          </span>
          <h2 className="tc-heading">
            {title.split(" ").map((w, i) => (
              <span key={i} className="word-wrap">
                <span className="tc-head-word">{w}</span>
              </span>
            ))}{" "}
            <span className="word-wrap">
              <span className="tc-head-word serif">{accent}</span>
            </span>
          </h2>
          {intro && <p className="tc-intro">{intro}</p>}
        </div>

        <div className="tc-grid">
          {items.map((it, i) => (
            <article key={i} className="tc-card" data-cursor="hover">
              <header className="tc-card-chrome">
                <span className="tc-dots">
                  <span className="tc-dot tc-dot--r" />
                  <span className="tc-dot tc-dot--y" />
                  <span className="tc-dot tc-dot--g" />
                </span>
                <span className="tc-file">{fileName(it.title, i)}</span>
                <span className="tc-card-num">{String(i + 1).padStart(2, "0")}</span>
              </header>

              <div className="tc-card-media">
                {it.image && <img src={it.image} alt="" loading="lazy" />}
                <div className="tc-card-scan" />
                <div className="tc-card-grid-overlay" />
                <div className="tc-card-tag">
                  <span className="tc-card-glyph">{it.icon}</span>
                  <span className="tc-card-tag-text">module.ready()</span>
                </div>
              </div>

              <div className="tc-card-body">
                <h3 className="tc-card-title">{it.title}</h3>
                <p className="tc-card-body-text">{it.body}</p>

                <div className="tc-card-stack">
                  <span className="tc-card-stack-label">stack</span>
                  <ul className="tc-card-chips">
                    {it.chips?.map((c) => <li key={c}>{c}</li>)}
                  </ul>
                </div>

                <div className="tc-card-foot">
                  <span className="tc-card-cta">
                    <span className="tc-card-prompt">$</span> run capability
                  </span>
                  <div className="tc-card-arrow">
                    <svg viewBox="0 0 24 24" width="14" height="14">
                      <path d="M6 18 L18 6 M10 6 L18 6 L18 14" fill="none" stroke="currentColor" strokeWidth="1.8" strokeLinecap="round" strokeLinejoin="round"/>
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
