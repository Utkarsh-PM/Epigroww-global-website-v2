"use client";
import { useEffect, useRef } from "react";
import gsap from "gsap";
import { ScrollTrigger } from "gsap/ScrollTrigger";
import { CASE_STUDIES } from "./caseStudiesData";
import "./CaseLedger.scss";

if (typeof window !== "undefined") gsap.registerPlugin(ScrollTrigger);

// Headline figure for the index row — the first published metric, or the
// engagement outcome when the work isn't measured in a single number.
const headline = (c) =>
  c.metrics && c.metrics.length
    ? `${c.metrics[0].value} · ${c.metrics[0].label}`
    : `${c.scope.slice(0, 3).join(" · ")}`;

export default function CaseLedger() {
  const ref = useRef(null);

  useEffect(() => {
    const ctx = gsap.context(() => {
      const reduce = window.matchMedia("(prefers-reduced-motion: reduce)").matches;
      if (reduce) {
        gsap.set(".csl-row", { opacity: 1, y: 0 });
        return;
      }
      gsap.fromTo(
        ".csl-row",
        { opacity: 0, y: 26 },
        {
          opacity: 1,
          y: 0,
          duration: 0.85,
          stagger: 0.07,
          ease: "power3.out",
          scrollTrigger: { trigger: ".csl-table", start: "top 85%" },
        }
      );
    }, ref);
    return () => ctx.revert();
  }, []);

  // Lenis owns the scroll position, so a native hash jump fights the smooth
  // scroller. Hand the target to Lenis when it's alive, fall back otherwise.
  const jumpTo = (e, id) => {
    const el = document.getElementById(id);
    if (!el) return;
    e.preventDefault();
    const lenis = typeof window !== "undefined" ? window.__lenis : null;
    if (lenis && typeof lenis.scrollTo === "function") {
      lenis.scrollTo(el, { offset: -90 });
    } else {
      el.scrollIntoView({ behavior: "smooth", block: "start" });
    }
  };

  return (
    <section ref={ref} className="csl">
      <div className="csl-inner">
        <div className="csl-head">
          <span className="csl-label">— The index</span>
          <span className="csl-note">
            {CASE_STUDIES.length} engagements · jump to any file
          </span>
        </div>

        <div className="csl-table">
          <div className="csl-thead" aria-hidden="true">
            <span>No.</span>
            <span>Brand</span>
            <span>Discipline</span>
            <span>Market</span>
            <span>Headline result</span>
            <span />
          </div>

          {CASE_STUDIES.map((c) => (
            <a
              key={c.id}
              href={`#${c.id}`}
              className="csl-row"
              onClick={(e) => jumpTo(e, c.id)}
              data-cursor="view"
              data-cursor-label="Read"
            >
              <span className="csl-num">{c.num}</span>
              <span className="csl-brand">
                {c.brand}
                <span className="csl-tag">{c.category}</span>
              </span>
              <span className="csl-disc">{c.discipline}</span>
              <span className="csl-market">{c.market}</span>
              <span className="csl-result">{headline(c)}</span>
              <span className="csl-arrow" aria-hidden="true">
                ↓
              </span>
            </a>
          ))}
        </div>
      </div>
    </section>
  );
}
