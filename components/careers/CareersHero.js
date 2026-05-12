"use client";
import { useEffect, useRef } from "react";
import gsap from "gsap";
import "./CareersHero.scss";

const wordsOf = (s) => (s || "").split(/\s+/).filter(Boolean);

export default function CareersHero({ data = {}, rolesCount }) {
  const ref = useRef(null);
  const kickerLeft = data.kickerLeft || "07 · Careers at Epigroww";
  const kickerRight = rolesCount ? `${rolesCount} open roles` : (data.kickerRight || "12 open roles");
  const headPrefix = wordsOf(data.headingPrefix || "Build an");
  const headAccent = data.headingAccent || "empire";
  const headSuffix = wordsOf((data.headingSuffix || ". Not just a ladder.").replace(/^\s*\./, ""));
  const lede = data.lede || "We're a remote-first, globally distributed team of 100+ specialists.";
  const stats = (data.heroStats && data.heroStats.length) ? data.heroStats : [
    { num: "100+", label: "Specialists" },
    { num: "04", label: "Studios" },
    { num: "22", label: "Nationalities" },
    { num: "5y", label: "Since founding" },
  ];
  const tags = (data.tags && data.tags.length) ? data.tags.map((t) => t.label).filter(Boolean) : [
    "Remote-first", "Async-biased", "Creative-led", "Results over location",
    "100% paid health", "Annual team trip", "Flexible time off", "Wellness budget",
  ];

  useEffect(() => {
    const ctx = gsap.context(() => {
      const tl = gsap.timeline({ delay: 0.2 });
      tl.fromTo(".ch-kicker > *", { opacity: 0, y: 12 }, { opacity: 1, y: 0, duration: 0.8, stagger: 0.08, ease: "power3.out" });
      tl.fromTo(".ch-word", { yPercent: 110 }, { yPercent: 0, duration: 1.1, ease: "power4.out", stagger: 0.055 }, "-=0.5");
      tl.fromTo(".ch-meta-stat", { opacity: 0, y: 20 }, { opacity: 1, y: 0, duration: 0.8, stagger: 0.08, ease: "power3.out" }, "-=0.6");
      tl.fromTo(".ch-tag", { scale: 0, opacity: 0 }, { scale: 1, opacity: 1, duration: 0.8, stagger: 0.05, ease: "back.out(1.6)" }, "-=0.5");
    }, ref);
    return () => ctx.revert();
  }, []);

  return (
    <section ref={ref} className="ch">
      <div className="ch-inner">
        <div className="ch-kicker">
          <span><span className="dot" /> {kickerLeft}</span>
          <span className="ch-count">{kickerRight}</span>
        </div>

        <h1 className="ch-head">
          {headPrefix.map((w, i) => (
            <span key={`hp${i}`}>
              <span className="word-wrap"><span className="ch-word">{w}</span></span>{" "}
            </span>
          ))}
          <span className="word-wrap"><span className="ch-word serif">{headAccent}</span></span>.<br />
          {headSuffix.map((w, i) => (
            <span key={`hs${i}`}>
              <span className="word-wrap"><span className={`ch-word${i === headSuffix.length - 1 ? " serif" : ""}`}>{w}</span></span>{i < headSuffix.length - 1 ? " " : ""}
            </span>
          ))}
        </h1>

        <div className="ch-footer">
          <p className="ch-lede">{lede}</p>

          <div className="ch-meta">
            {stats.map((s, i) => (
              <div className="ch-meta-stat" key={i}>
                <span className="n">{s.num}</span><span className="l">{s.label}</span>
              </div>
            ))}
          </div>
        </div>

        <div className="ch-tags">
          {tags.map((t, i) => (
            <span key={i} className="ch-tag">{t}</span>
          ))}
        </div>
      </div>
    </section>
  );
}
