"use client";
import { useEffect, useRef } from "react";
import gsap from "gsap";
import { ScrollTrigger } from "gsap/ScrollTrigger";
import "./BrandMarquee.scss";

if (typeof window !== "undefined") gsap.registerPlugin(ScrollTrigger);

const LOGOS = [
  { name: "WINZO", style: "italic-bold" },
  { name: "SATMOLA", style: "oval" },
  { name: "POSTBOX", style: "outline" },
  { name: "NEESH", style: "diamond" },
  { name: "WAVELINE", style: "wave" },
  { name: "BATA", style: "script" },
  { name: "aurelia", style: "lower" },
  { name: "ANDAMEN", style: "serif" },
  { name: "NATURE · 4 · NATURE", style: "stack" },
  { name: "INFINITE", style: "block" },
  { name: "JK LIFESTYLE", style: "block" },
  { name: "CINEGOLD", style: "italic-bold" },
];

export default function BrandMarquee() {
  const ref = useRef(null);
  const trackRef = useRef(null);

  useEffect(() => {
    const ctx = gsap.context(() => {
      gsap.fromTo(
        ".bm-head",
        { opacity: 0, y: 24 },
        {
          opacity: 1,
          y: 0,
          duration: 1,
          ease: "power3.out",
          scrollTrigger: { trigger: ref.current, start: "top 85%" },
        }
      );
      gsap.fromTo(
        ".bm-track",
        { opacity: 0 },
        {
          opacity: 1,
          duration: 1.2,
          ease: "power2.out",
          scrollTrigger: { trigger: ref.current, start: "top 85%" },
        }
      );

      const track = trackRef.current;
      if (!track) return;
      const setX = gsap.quickSetter(track, "x", "px");
      const state = { x: 0, mult: 1, half: 0 };
      const measure = () => { state.half = track.scrollWidth / 2; };
      measure();
      window.addEventListener("resize", measure);

      const speed = 0.5;
      let raf = 0;
      const tick = () => {
        state.x -= speed * state.mult;
        if (state.x <= -state.half) state.x += state.half;
        setX(state.x);
        raf = requestAnimationFrame(tick);
      };
      raf = requestAnimationFrame(tick);

      const onEnter = () => gsap.to(state, { mult: 0, duration: 0.6, ease: "power2.out" });
      const onLeave = () => gsap.to(state, { mult: 1, duration: 0.8, ease: "power2.out" });
      track.addEventListener("mouseenter", onEnter);
      track.addEventListener("mouseleave", onLeave);

      return () => {
        cancelAnimationFrame(raf);
        window.removeEventListener("resize", measure);
        track.removeEventListener("mouseenter", onEnter);
        track.removeEventListener("mouseleave", onLeave);
      };
    }, ref);
    return () => ctx.revert();
  }, []);

  return (
    <section ref={ref} className="bm">
      <div className="bm-inner">
        <div className="bm-head">
          <span className="bm-dot" />
          <span className="bm-label">— 01.2 / Brands we engineer growth for</span>
          <span className="bm-count">500+ clients · 40+ industries</span>
        </div>

        <div className="bm-stage">
          <div className="bm-track" ref={trackRef}>
            {[...LOGOS, ...LOGOS].map((l, i) => (
              <span key={i} className={`bm-logo bm-style-${l.style}`}>
                {l.name}
              </span>
            ))}
          </div>
          <div className="bm-fade bm-fade-l" aria-hidden="true" />
          <div className="bm-fade bm-fade-r" aria-hidden="true" />
        </div>
      </div>
    </section>
  );
}
