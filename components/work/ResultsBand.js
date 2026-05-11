"use client";
import { useEffect, useRef } from "react";
import gsap from "gsap";
import { ScrollTrigger } from "gsap/ScrollTrigger";
import "./ResultsBand.scss";

if (typeof window !== "undefined") gsap.registerPlugin(ScrollTrigger);

const RESULTS = [
  { k: "3.4×", label: "Launch ROAS · JK Lifestyle Infinity" },
  { k: "+58%", label: "30-day retention · Cinegold OTT" },
  { k: "−37%", label: "Blended CAC · FMCG · NA" },
  { k: "42%", label: "Lead-to-quote cycle · JCBL" },
  { k: "$2.1M", label: "90-day revenue · D2C Dubai" },
  { k: "+28%", label: "Repeat orders · MENA F&B" },
  { k: "98", label: "Lighthouse score · avg. build" },
  { k: "65%", label: "Support deflection · AI assistant" },
  { k: "1.2M", label: "First-week views · Infinity TVC" },
];

export default function ResultsBand() {
  const ref = useRef(null);

  useEffect(() => {
    const ctx = gsap.context(() => {
      gsap.fromTo(
        ".rb-head-word",
        { yPercent: 110 },
        {
          yPercent: 0,
          duration: 1,
          ease: "power4.out",
          stagger: 0.05,
          scrollTrigger: { trigger: ".rb-head", start: "top 80%" },
        }
      );

      // Horizontal scroll-scrub of the ticker band
      const track = ref.current.querySelector(".rb-track");
      if (track) {
        const trackWidth = track.scrollWidth;
        const containerWidth = ref.current.querySelector(".rb-viewport").offsetWidth;
        const distance = trackWidth - containerWidth;
        if (distance > 0) {
          gsap.to(track, {
            x: () => -distance,
            ease: "none",
            scrollTrigger: {
              trigger: ref.current,
              start: "top 70%",
              end: () => `+=${distance * 1.2}`,
              scrub: 1,
              invalidateOnRefresh: true,
            },
          });
        }
      }

      gsap.fromTo(
        ".rb-tile",
        { y: 40, opacity: 0 },
        {
          y: 0,
          opacity: 1,
          duration: 0.9,
          stagger: 0.05,
          ease: "power3.out",
          scrollTrigger: { trigger: ".rb-track", start: "top 85%" },
        }
      );
    }, ref);
    return () => ctx.revert();
  }, []);

  return (
    <section ref={ref} className="rb">
      <div className="rb-head">
        <span className="rb-label">— Proof · selected wins</span>
        <h2 className="rb-heading">
          <span className="word-wrap"><span className="rb-head-word">Nine</span></span>{" "}
          <span className="word-wrap"><span className="rb-head-word">results</span></span>{" "}
          <span className="word-wrap"><span className="rb-head-word serif">the</span></span>{" "}
          <span className="word-wrap"><span className="rb-head-word serif">clients</span></span>{" "}
          <span className="word-wrap"><span className="rb-head-word serif">let</span></span>{" "}
          <span className="word-wrap"><span className="rb-head-word">us</span></span>{" "}
          <span className="word-wrap"><span className="rb-head-word">print.</span></span>
        </h2>
      </div>

      <div className="rb-viewport">
        <div className="rb-track">
          {RESULTS.map((r, i) => (
            <article key={i} className="rb-tile">
              <span className="rb-tile-num">{String(i + 1).padStart(2, "0")}</span>
              <span className="rb-tile-k">{r.k}</span>
              <span className="rb-tile-label">{r.label}</span>
            </article>
          ))}
          <div className="rb-endcard">
            <div>
              <span className="rb-end-lab">+ 491 more</span>
              <span className="rb-end-sub">under NDA — ask for the deck</span>
            </div>
            <span className="rb-end-arrow">↗</span>
          </div>
        </div>
      </div>

      <div className="rb-foot">
        <span className="rb-foot-dot" />
        <span>Live scorecards · updated weekly with every client</span>
      </div>
    </section>
  );
}
