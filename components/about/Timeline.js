"use client";
import { useEffect, useRef } from "react";
import gsap from "gsap";
import { ScrollTrigger } from "gsap/ScrollTrigger";
import "./Timeline.scss";

if (typeof window !== "undefined") gsap.registerPlugin(ScrollTrigger);

const MILESTONES = [
  {
    year: "2021",
    quarter: "Q1",
    heading: "The Lucknow beginning",
    body: "Founded in Lucknow, India, by Danish Abbasi. A single brief. One laptop. A stubborn belief that the agency model needed breaking.",
  },
  {
    year: "2022",
    quarter: "Q4",
    heading: "Delhi HQ opens",
    body: "First 25 hires. Launched the performance-creative pod that still powers our retainer clients today.",
  },
  {
    year: "2023",
    quarter: "Q2",
    heading: "Mumbai studio",
    body: "Opened a brand-and-film studio — CGI, TVC commercials, celebrity endorsements. Creative finally got the stage it deserved.",
  },
  {
    year: "2024",
    quarter: "Q1",
    heading: "Global footprint",
    body: "Toronto + Dubai offices launched in the same quarter. We crossed $1B+ in managed media spend.",
  },
  {
    year: "2025",
    quarter: "Q3",
    heading: "50+ team",
    body: "300+ campaigns in 12 months. 500+ brands on the books. 40+ industries served. Quiet compounding, on schedule.",
  },
  {
    year: "2026",
    quarter: "next",
    heading: "To be written",
    body: "AI-native pods, owned-media tooling, and the next 500 brands. The plan hasn't changed: ship weekly, compound forever.",
  },
];

export default function Timeline() {
  const ref = useRef(null);
  const progressRef = useRef(null);

  useEffect(() => {
    const ctx = gsap.context(() => {
      gsap.utils.toArray(".tl-item").forEach((item, i) => {
        gsap.fromTo(
          item,
          { x: i % 2 === 0 ? -40 : 40, opacity: 0 },
          {
            x: 0,
            opacity: 1,
            duration: 1,
            ease: "power3.out",
            scrollTrigger: { trigger: item, start: "top 85%" },
          }
        );
      });

      gsap.to(progressRef.current, {
        height: "100%",
        ease: "none",
        scrollTrigger: {
          trigger: ".tl-rail-wrap",
          start: "top 80%",
          end: "bottom 60%",
          scrub: true,
        },
      });
    }, ref);
    return () => ctx.revert();
  }, []);

  return (
    <section ref={ref} className="tl">
      <div className="tl-inner">
        <div className="tl-head">
          <span className="tl-label">— Story · 2021 → now</span>
          <h2 className="tl-heading">
            Five years of compounding.<br />
            <span className="serif">One plan.</span>
          </h2>
        </div>

        <div className="tl-rail-wrap">
          <div className="tl-rail">
            <div ref={progressRef} className="tl-rail-fill" />
          </div>
          <ol className="tl-list">
            {MILESTONES.map((m, i) => (
              <li className="tl-item" key={i}>
                <div className="tl-item-node" />
                <div className="tl-item-card">
                  <div className="tl-item-year">
                    <span>{m.year}</span>
                    <span className="tl-item-q">· {m.quarter}</span>
                  </div>
                  <h3 className="tl-item-head">{m.heading}</h3>
                  <p className="tl-item-body">{m.body}</p>
                </div>
              </li>
            ))}
          </ol>
        </div>
      </div>
    </section>
  );
}
