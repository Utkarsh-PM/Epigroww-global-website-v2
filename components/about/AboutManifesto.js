"use client";
import { useEffect, useRef } from "react";
import gsap from "gsap";
import { ScrollTrigger } from "gsap/ScrollTrigger";
import "./AboutManifesto.scss";

if (typeof window !== "undefined") gsap.registerPlugin(ScrollTrigger);

const MISSION = `To become the world's largest — and most trusted — growth partner, by making the boring parts of marketing radically specific, and the creative parts impossibly good.`;

export default function AboutManifesto() {
  const ref = useRef(null);

  useEffect(() => {
    const el = ref.current;
    if (!el) return;
    const words = el.querySelectorAll(".am-word");
    gsap.fromTo(
      words,
      { opacity: 0.1 },
      {
        opacity: 1,
        ease: "none",
        stagger: 0.025,
        scrollTrigger: { trigger: el, start: "top 75%", end: "top 10%", scrub: true },
      }
    );
  }, []);

  return (
    <section ref={ref} className="am">
      <div className="am-inner">
        <div className="am-side">
          <span className="am-label">The mission</span>
          <div className="am-row">
            <span>01</span>
            <span>Think big, then ship.</span>
          </div>
          <div className="am-row">
            <span>02</span>
            <span>Own every outcome.</span>
          </div>
          <div className="am-row">
            <span>03</span>
            <span>Stay curious.</span>
          </div>
        </div>
        <p className="am-statement">
          {MISSION.split(" ").map((w, i, arr) => (
            <span key={i}>
              <span className="am-word">{w}</span>
              {i < arr.length - 1 ? " " : ""}
            </span>
          ))}
        </p>
      </div>
    </section>
  );
}
