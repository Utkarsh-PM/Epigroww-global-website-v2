"use client";
import { useEffect, useRef } from "react";
import gsap from "gsap";
import { ScrollTrigger } from "gsap/ScrollTrigger";
import "./Manifesto.scss";

if (typeof window !== "undefined") gsap.registerPlugin(ScrollTrigger);

const MANIFESTO = `We don't sell services. We engineer outcomes — pairing award-winning creative with performance data and tech that compounds. One team, four cities, endless specificity.`;

export default function Manifesto() {
  const ref = useRef(null);

  useEffect(() => {
    const el = ref.current;
    if (!el) return;
    const words = el.querySelectorAll(".mf-word");
    gsap.fromTo(
      words,
      { opacity: 0.12 },
      {
        opacity: 1,
        ease: "none",
        stagger: 0.04,
        scrollTrigger: {
          trigger: el,
          start: "top 75%",
          end: "top 15%",
          scrub: true,
        },
      }
    );
  }, []);

  return (
    <section ref={ref} className="manifesto">
      <div className="manifesto-inner">
        <div className="manifesto-top">
          <span className="manifesto-label">— 02 / Philosophy</span>
          <span className="manifesto-label">Read · 18 sec</span>
        </div>
        <p className="manifesto-text">
          {MANIFESTO.split(" ").map((w, i) => (
            <span key={i}>
              <span className="mf-word">{w}</span>
              {i < MANIFESTO.split(" ").length - 1 ? " " : ""}
            </span>
          ))}
        </p>
        <div className="manifesto-sign">
          <span>— Danish Abbasi</span>
          <span className="manifesto-role">Founder, Epigroww Global</span>
        </div>
      </div>
    </section>
  );
}
