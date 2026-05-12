"use client";
import { useEffect, useRef } from "react";
import gsap from "gsap";
import { ScrollTrigger } from "gsap/ScrollTrigger";
import "./AboutManifesto.scss";

if (typeof window !== "undefined") gsap.registerPlugin(ScrollTrigger);

const DEFAULT_MISSION = `To become the world's largest — and most trusted — growth partner, by making the boring parts of marketing radically specific, and the creative parts impossibly good.`;
const DEFAULT_PRINCIPLES = [
  { num: "01", text: "Think big, then ship." },
  { num: "02", text: "Own every outcome." },
  { num: "03", text: "Stay curious." },
];

export default function AboutManifesto({ data = {} }) {
  const ref = useRef(null);
  const MISSION = data.body || DEFAULT_MISSION;
  const label = data.label || "The mission";
  const principles = (data.principles && data.principles.length) ? data.principles : DEFAULT_PRINCIPLES;

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
          <span className="am-label">{label}</span>
          {principles.map((p, i) => (
            <div className="am-row" key={i}>
              <span>{p.num}</span>
              <span>{p.text}</span>
            </div>
          ))}
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
