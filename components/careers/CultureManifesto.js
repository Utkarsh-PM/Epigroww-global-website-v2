"use client";
import { useEffect, useRef } from "react";
import gsap from "gsap";
import { ScrollTrigger } from "gsap/ScrollTrigger";
import "./CultureManifesto.scss";

if (typeof window !== "undefined") gsap.registerPlugin(ScrollTrigger);

const CULTURE = [
  { k: "01", t: "Big ideas over bureaucracy", d: "The biggest plan in the room wins, regardless of who brought it. We don't promote titles — we promote ideas that shipped." },
  { k: "02", t: "Results over location", d: "Remote-first, deeply. Delhi, Mumbai, Dubai, Toronto — and sometimes a café in Goa. The output is the meeting." },
  { k: "03", t: "Craft over speed", d: "We ship weekly, but we don't ship sloppy. Every deliverable ends with a review round that's honest about what's not yet good enough." },
  { k: "04", t: "Balance over burnout", d: "Empires are built on rested people. Flexible time off, no meeting Fridays, and a founder who reads \"rest\" as \"investment.\"" },
];

export default function CultureManifesto() {
  const ref = useRef(null);

  useEffect(() => {
    const ctx = gsap.context(() => {
      const words = ref.current.querySelectorAll(".cmf-word");
      gsap.fromTo(words, { opacity: 0.12 }, {
        opacity: 1,
        ease: "none",
        stagger: 0.025,
        scrollTrigger: { trigger: ".cmf-statement", start: "top 75%", end: "top 15%", scrub: true },
      });

      gsap.utils.toArray(".cmf-principle").forEach((el, i) => {
        gsap.fromTo(el, { x: i % 2 === 0 ? -30 : 30, opacity: 0 }, {
          x: 0, opacity: 1, duration: 0.9, ease: "power3.out",
          scrollTrigger: { trigger: el, start: "top 85%" },
        });
      });
    }, ref);
    return () => ctx.revert();
  }, []);

  const mission = `We believe great ideas don't need an office. They need curious people, clear outcomes, and the trust to build.`;

  return (
    <section ref={ref} className="cmf">
      <div className="cmf-inner">
        <span className="cmf-label">— The culture</span>
        <p className="cmf-statement">
          {mission.split(" ").map((w, i, arr) => (
            <span key={i}>
              <span className="cmf-word">{w}</span>
              {i < arr.length - 1 ? " " : ""}
            </span>
          ))}
        </p>

        <div className="cmf-grid">
          {CULTURE.map((c) => (
            <div key={c.k} className="cmf-principle">
              <div className="cmf-principle-num">{c.k}</div>
              <h3 className="cmf-principle-t">{c.t}</h3>
              <p className="cmf-principle-d">{c.d}</p>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
}
