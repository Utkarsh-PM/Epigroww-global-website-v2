"use client";
import { useEffect, useRef } from "react";
import gsap from "gsap";
import "./CareersHero.scss";

export default function CareersHero() {
  const ref = useRef(null);

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
          <span><span className="dot" /> 07 · Careers at Epigroww</span>
          <span className="ch-count">12 open roles</span>
        </div>

        <h1 className="ch-head">
          <span className="word-wrap"><span className="ch-word">Build</span></span>{" "}
          <span className="word-wrap"><span className="ch-word">an</span></span>{" "}
          <span className="word-wrap"><span className="ch-word serif">empire</span></span>.<br />
          <span className="word-wrap"><span className="ch-word">Not</span></span>{" "}
          <span className="word-wrap"><span className="ch-word">just</span></span>{" "}
          <span className="word-wrap"><span className="ch-word">a</span></span>{" "}
          <span className="word-wrap"><span className="ch-word serif">ladder.</span></span>
        </h1>

        <div className="ch-footer">
          <p className="ch-lede">
            We're a remote-first, globally distributed team of 100+ specialists — the kind that treats great ideas seriously and bureaucracy as a bug. Bring craft, obsess over outcomes, and we'll give you a room to build in.
          </p>

          <div className="ch-meta">
            <div className="ch-meta-stat"><span className="n">100+</span><span className="l">Specialists</span></div>
            <div className="ch-meta-stat"><span className="n">04</span><span className="l">Studios</span></div>
            <div className="ch-meta-stat"><span className="n">22</span><span className="l">Nationalities</span></div>
            <div className="ch-meta-stat"><span className="n">5y</span><span className="l">Since founding</span></div>
          </div>
        </div>

        <div className="ch-tags">
          {["Remote-first", "Async-biased", "Creative-led", "Results over location", "100% paid health", "Annual team trip", "Flexible time off", "Wellness budget"].map((t) => (
            <span key={t} className="ch-tag">{t}</span>
          ))}
        </div>
      </div>
    </section>
  );
}
