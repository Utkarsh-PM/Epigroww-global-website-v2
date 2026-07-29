"use client";
import { useEffect, useRef } from "react";
import gsap from "gsap";
import { ScrollTrigger } from "gsap/ScrollTrigger";
import { PLAYBOOK } from "./caseStudiesData";
import "./PlaybookBand.scss";

if (typeof window !== "undefined") gsap.registerPlugin(ScrollTrigger);

export default function PlaybookBand() {
  const ref = useRef(null);

  useEffect(() => {
    const ctx = gsap.context(() => {
      const reduce = window.matchMedia("(prefers-reduced-motion: reduce)").matches;
      if (reduce) {
        gsap.set(".csp-word, .csp-row", { opacity: 1, y: 0, yPercent: 0 });
        return;
      }

      const tl = gsap.timeline({
        scrollTrigger: { trigger: ref.current, start: "top 76%" },
      });

      tl.fromTo(
        ".csp-word",
        { yPercent: 110 },
        { yPercent: 0, duration: 1, stagger: 0.055, ease: "power4.out" }
      );
      tl.fromTo(
        ".csp-row",
        { opacity: 0, y: 28 },
        { opacity: 1, y: 0, duration: 0.85, stagger: 0.09, ease: "power3.out" },
        "-=0.6"
      );
    }, ref);
    return () => ctx.revert();
  }, []);

  const words = [
    { t: "Four", em: false },
    { t: "rules", em: false },
    { t: "behind", em: true },
    { t: "every", em: true },
    { t: "number", em: true },
    { t: "above.", em: false },
  ];

  return (
    <section ref={ref} className="csp">
      <div className="csp-inner">
        <div className="csp-head">
          <span className="csp-label">— The operating discipline</span>
          <h2 className="csp-heading">
            {words.map((w, i) => (
              <span key={`${w.t}-${i}`} className="csp-word-wrap">
                <span className={`csp-word ${w.em ? "is-em" : ""}`}>{w.t}</span>
              </span>
            ))}
          </h2>
          <p className="csp-lede">
            The brands are different. The category, the market and the budget are
            different. What repeats is how the accounts are actually run.
          </p>
        </div>

        <ol className="csp-list">
          {PLAYBOOK.map((p) => (
            <li key={p.num} className="csp-row">
              <span className="csp-row-num">{p.num}</span>
              <h3 className="csp-row-title">{p.title}</h3>
              <p className="csp-row-body">{p.body}</p>
            </li>
          ))}
        </ol>
      </div>
    </section>
  );
}
