"use client";
import { useEffect, useRef } from "react";
import gsap from "gsap";
import "./CaseStudiesHero.scss";

const HEADS = [
  { t: "Growth,", serif: false },
  { t: "documented.", serif: true },
];

const TOTALS = [
  { n: "₹60L+", l: "Annual media spend under management" },
  { n: "3.58 lacs", l: "New customers added for a single brand" },
  { n: "+2.2×", l: "Best ROAS lift inside six months" },
];

export default function CaseStudiesHero() {
  const ref = useRef(null);

  useEffect(() => {
    const ctx = gsap.context(() => {
      const reduce =
        typeof window !== "undefined" &&
        window.matchMedia("(prefers-reduced-motion: reduce)").matches;

      if (reduce) {
        gsap.set(".csh-kicker > *, .csh-word, .csh-lede, .csh-total", {
          opacity: 1,
          y: 0,
          yPercent: 0,
        });
        return;
      }

      const tl = gsap.timeline({ delay: 0.2 });
      tl.fromTo(
        ".csh-kicker > *",
        { opacity: 0, y: 12 },
        { opacity: 1, y: 0, duration: 0.8, stagger: 0.08, ease: "power3.out" }
      );
      tl.fromTo(
        ".csh-word",
        { yPercent: 110 },
        { yPercent: 0, duration: 1.2, ease: "power4.out", stagger: 0.07 },
        "-=0.5"
      );
      tl.fromTo(
        ".csh-lede",
        { opacity: 0, y: 18 },
        { opacity: 1, y: 0, duration: 0.9, ease: "power3.out" },
        "-=0.7"
      );
      tl.fromTo(
        ".csh-total",
        { opacity: 0, y: 20 },
        { opacity: 1, y: 0, duration: 0.8, stagger: 0.1, ease: "power3.out" },
        "-=0.65"
      );
    }, ref);
    return () => ctx.revert();
  }, []);

  return (
    <section ref={ref} className="csh">
      <div className="csh-inner">
        <div className="csh-kicker">
          <span>
            <span className="dot" /> Case studies
          </span>
          <span>Six brands · documented</span>
        </div>

        <div className="csh-body">
          <div className="csh-lead">
            <h1 className="csh-head">
              {HEADS.map((w) => (
                <span key={w.t} className="csh-word-wrap">
                  <span className={`csh-word ${w.serif ? "is-em" : ""}`}>{w.t}</span>
                </span>
              ))}
            </h1>
            <p className="csh-lede">
              Not a logo wall. Six engagements written out in full — the state the
              brand walked in with, the plays we ran, and the numbers that moved
              because of them. Where a figure is published, it is exactly as it was
              reported to the client.
            </p>
          </div>

          <div className="csh-totals" aria-label="Programme highlights">
            {TOTALS.map((t) => (
              <div key={t.l} className="csh-total">
                <span className="csh-total-n ticker-num">{t.n}</span>
                <span className="csh-total-l">{t.l}</span>
              </div>
            ))}
          </div>
        </div>
      </div>
    </section>
  );
}
