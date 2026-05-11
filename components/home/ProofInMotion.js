"use client";
import { useEffect, useRef } from "react";
import gsap from "gsap";
import { ScrollTrigger } from "gsap/ScrollTrigger";
import "./ProofInMotion.scss";

if (typeof window !== "undefined") gsap.registerPlugin(ScrollTrigger);

const STATS = [
  { value: 300, suffix: "+", label: "Successful campaigns\nshipped in 12 months" },
  { value: 500, suffix: "+", label: "Brands trust Epigroww\nwith their growth" },
  { value: 1000, suffix: "+", label: "Creators collaborating\nacross our network" },
  { value: 40, suffix: "+", label: "Industries served —\nfrom D2C to Enterprise" },
  { value: 100, suffix: "+", label: "Specialists on staff\nacross four studios" },
  { value: 4, suffix: "", label: "Global offices in\nDelhi · Mumbai · Dubai · Toronto" },
];

export default function ProofInMotion() {
  const ref = useRef(null);

  useEffect(() => {
    const ctx = gsap.context(() => {
      const numEls = gsap.utils.toArray(".proof-num");
      numEls.forEach((el) => {
        const target = parseInt(el.dataset.value, 10);
        const obj = { n: 0 };
        gsap.to(obj, {
          n: target,
          duration: 2.2,
          ease: "power3.out",
          scrollTrigger: { trigger: el, start: "top 85%", once: true },
          onUpdate: () => { el.textContent = Math.round(obj.n); },
        });
      });

      gsap.fromTo(
        ".proof-lead-word",
        { yPercent: 110 },
        {
          yPercent: 0,
          duration: 1.1,
          ease: "power4.out",
          stagger: 0.05,
          scrollTrigger: { trigger: ".proof-lead", start: "top 80%" },
        }
      );

      gsap.utils.toArray(".proof-card").forEach((card, i) => {
        gsap.fromTo(
          card,
          { y: 50, opacity: 0 },
          {
            y: 0,
            opacity: 1,
            duration: 0.9,
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
    <section ref={ref} className="proof">
      <div className="proof-inner">
        <div className="proof-top">
          <span className="proof-label">— 04 / Proof in motion</span>
          <span className="proof-label proof-year">FY 2025 — 2026</span>
        </div>

        <h2 className="proof-lead">
          <span className="word-wrap"><span className="proof-lead-word">Numbers</span></span>{" "}
          <span className="word-wrap"><span className="proof-lead-word">that</span></span>{" "}
          <span className="word-wrap"><span className="proof-lead-word serif">stopped</span></span>{" "}
          <span className="word-wrap"><span className="proof-lead-word serif">being</span></span>{" "}
          <span className="word-wrap"><span className="proof-lead-word serif">vanity</span></span>{" "}
          <br />
          <span className="word-wrap"><span className="proof-lead-word">and</span></span>{" "}
          <span className="word-wrap"><span className="proof-lead-word">started</span></span>{" "}
          <span className="word-wrap"><span className="proof-lead-word">being</span></span>{" "}
          <span className="word-wrap"><span className="proof-lead-word">proof.</span></span>
        </h2>

        <div className="proof-grid">
          {STATS.map((s, i) => (
            <div className="proof-card" key={i}>
              <div className="proof-card-num">
                <span className="proof-num ticker-num" data-value={s.value}>0</span>
                <span className="proof-suffix">{s.suffix}</span>
              </div>
              <div className="proof-card-line" />
              <p className="proof-card-label">{s.label}</p>
              <div className="proof-card-index">{String(i + 1).padStart(2, "0")}</div>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
}
