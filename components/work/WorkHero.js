"use client";
import { useEffect, useRef } from "react";
import gsap from "gsap";
import "./WorkHero.scss";

const wordsOf = (s) => (s || "").split(/\s+/).filter(Boolean);

export default function WorkHero({ data = {} }) {
  const ref = useRef(null);
  const kickerLeft = data.kickerLeft || "03 · Work";
  const kickerRight = data.kickerRight || "2021 → 2026 · Selected";
  const headPrefix = wordsOf(data.headingPrefix || "Five years.");
  const headAccent = wordsOf(data.headingAccent || "Five hundred");
  const headSuffix = wordsOf(data.headingSuffix || "brands.");
  const lede = data.lede || "What follows is a small, named subset of the work.";
  const stats = (data.heroStats && data.heroStats.length) ? data.heroStats : [
    { num: "500+", label: "Brands shipped" },
    { num: "40+", label: "Industries" },
    { num: "1000+", label: "Creators" },
    { num: "$1B+", label: "Media spend" },
  ];

  useEffect(() => {
    const ctx = gsap.context(() => {
      const tl = gsap.timeline({ delay: 0.2 });
      tl.fromTo(".wh-kicker > *", { opacity: 0, y: 12 }, { opacity: 1, y: 0, duration: 0.8, stagger: 0.08, ease: "power3.out" });
      tl.fromTo(".wh-word", { yPercent: 110 }, { yPercent: 0, duration: 1.2, ease: "power4.out", stagger: 0.055 }, "-=0.5");
      tl.fromTo(".wh-meta > *", { opacity: 0, y: 16 }, { opacity: 1, y: 0, duration: 0.8, stagger: 0.08, ease: "power3.out" }, "-=0.6");
    }, ref);
    return () => ctx.revert();
  }, []);

  return (
    <section ref={ref} className="wh">
      <div className="wh-inner">
        <div className="wh-kicker">
          <span><span className="dot" /> {kickerLeft}</span>
          <span>{kickerRight}</span>
        </div>

        <h1 className="wh-head">
          {headPrefix.map((w, i) => (
            <span key={`wp${i}`}>
              <span className="word-wrap"><span className="wh-word">{w}</span></span>{" "}
            </span>
          ))}
          {headAccent.map((w, i) => (
            <span key={`wa${i}`}>
              <span className="word-wrap"><span className="wh-word serif">{w}</span></span>{" "}
            </span>
          ))}
          {headSuffix.map((w, i) => (
            <span key={`ws${i}`}>
              <span className="word-wrap"><span className="wh-word serif">{w}</span></span>{i < headSuffix.length - 1 ? " " : ""}
            </span>
          ))}
        </h1>

        <div className="wh-footer">
          <p className="wh-lede">{lede}</p>
          <div className="wh-meta">
            {stats.map((s, i) => (
              <div className="wh-stat" key={i}>
                <span className="n">{s.num}</span><span className="l">{s.label}</span>
              </div>
            ))}
          </div>
        </div>
      </div>
    </section>
  );
}
