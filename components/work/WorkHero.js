"use client";
import { useEffect, useRef } from "react";
import gsap from "gsap";
import "./WorkHero.scss";

export default function WorkHero() {
  const ref = useRef(null);

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
          <span><span className="dot" /> 03 · Work</span>
          <span>2021 → 2026 · Selected</span>
        </div>

        <h1 className="wh-head">
          <span className="word-wrap"><span className="wh-word">Five</span></span>{" "}
          <span className="word-wrap"><span className="wh-word">years.</span></span>{" "}
          <span className="word-wrap"><span className="wh-word serif">Five</span></span>{" "}
          <span className="word-wrap"><span className="wh-word serif">hundred</span></span>{" "}
          <span className="word-wrap"><span className="wh-word serif">brands.</span></span>
        </h1>

        <div className="wh-footer">
          <p className="wh-lede">
            What follows is a small, named subset of the work. The full case book — with P&L figures, incrementality curves, and the stuff we can't publish online — is a private share.
          </p>
          <div className="wh-meta">
            <div className="wh-stat"><span className="n">500+</span><span className="l">Brands shipped</span></div>
            <div className="wh-stat"><span className="n">40+</span><span className="l">Industries</span></div>
            <div className="wh-stat"><span className="n">1000+</span><span className="l">Creators</span></div>
            <div className="wh-stat"><span className="n">$1B+</span><span className="l">Media spend</span></div>
          </div>
        </div>
      </div>
    </section>
  );
}
