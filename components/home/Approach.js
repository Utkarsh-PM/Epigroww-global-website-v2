"use client";
import { useEffect, useRef } from "react";
import gsap from "gsap";
import { ScrollTrigger } from "gsap/ScrollTrigger";
import "./Approach.scss";

if (typeof window !== "undefined") gsap.registerPlugin(ScrollTrigger);

const STEPS = [
  {
    n: "01",
    k: "Discover",
    t: "Diagnosis before prescription.",
    d: "We audit your funnel end-to-end — brand perception, media efficiency, tech plumbing, analytics truth. The brief only writes itself after the audit.",
    chips: ["Brand audit", "Media efficiency", "CRO teardown", "Analytics integrity"],
    image: "https://images.unsplash.com/photo-1551288049-bebda4e38f71?auto=format&fit=crop&w=900&q=80",
  },
  {
    n: "02",
    k: "Design",
    t: "Strategy that a CFO would sign.",
    d: "A 90-day growth plan with KPIs, channel math, creative testing matrix, and the tech prerequisites — all tied to revenue, not impressions.",
    chips: ["Channel mix model", "Creative matrix", "Tech backlog", "Success KPIs"],
    image: "https://images.unsplash.com/photo-1552664730-d307ca884978?auto=format&fit=crop&w=900&q=80",
  },
  {
    n: "03",
    k: "Deploy",
    t: "Ship weekly, learn weekly.",
    d: "A two-studio delivery engine producing 100+ creatives a week, launching campaigns across Meta, Google, Amazon, DV360, CTV & owned channels — always live-tuned.",
    chips: ["100+ creatives/week", "Always-on campaigns", "Agile sprints", "Daily pacing"],
    image: "https://images.unsplash.com/photo-1542744173-8e7e53415bb0?auto=format&fit=crop&w=900&q=80",
  },
  {
    n: "04",
    k: "Decompound",
    t: "Compound the wins. Cut the waste.",
    d: "Weekly scorecards, incrementality testing, creative winners rolling to evergreen, losers retired fast. We optimize for compounding ROAS — not flashes.",
    chips: ["Incrementality tests", "Scorecard rituals", "Win/kill cadence", "Evergreen engine"],
    image: "https://images.unsplash.com/photo-1460925895917-afdab827c52f?auto=format&fit=crop&w=900&q=80",
  },
];

export default function Approach() {
  const ref = useRef(null);

  useEffect(() => {
    const ctx = gsap.context(() => {
      gsap.fromTo(
        ".ap-head-word",
        { yPercent: 110 },
        {
          yPercent: 0,
          duration: 1,
          ease: "power4.out",
          stagger: 0.05,
          scrollTrigger: { trigger: ".ap-head", start: "top 80%" },
        }
      );

      gsap.utils.toArray(".ap-step").forEach((step, i) => {
        gsap.fromTo(
          step,
          { y: 60, opacity: 0 },
          {
            y: 0,
            opacity: 1,
            duration: 0.95,
            delay: i * 0.05,
            ease: "power3.out",
            scrollTrigger: { trigger: step, start: "top 85%" },
          }
        );
        gsap.fromTo(
          step.querySelector(".ap-step-bar"),
          { scaleX: 0 },
          {
            scaleX: 1,
            duration: 1.4,
            ease: "power3.out",
            delay: 0.2 + i * 0.05,
            scrollTrigger: { trigger: step, start: "top 85%" },
          }
        );
      });
    }, ref);
    return () => ctx.revert();
  }, []);

  return (
    <section ref={ref} className="ap">
      <div className="ap-inner">
        <div className="ap-head">
          <span className="ap-label">— 06 / The approach</span>
          <h2 className="ap-heading">
            <span className="word-wrap"><span className="ap-head-word">Omni-channel,</span></span>{" "}
            <span className="word-wrap"><span className="ap-head-word">data-backed,</span></span>{" "}
            <span className="word-wrap"><span className="ap-head-word serif">creative-fueled.</span></span>
          </h2>
          <p className="ap-lede">
            Our four-step operating system — refined across 300+ campaigns and 40+ industries — makes growth measurable, repeatable, and quietly obsessive.
          </p>
        </div>

        <ol className="ap-steps">
          {STEPS.map((s) => (
            <li className="ap-step" key={s.n}>
              <div className="ap-step-head">
                <span className="ap-step-num">{s.n}</span>
                <span className="ap-step-kind">{s.k}</span>
              </div>
              <div className="ap-step-body">
                <h3 className="ap-step-title">{s.t}</h3>
                <p className="ap-step-desc">{s.d}</p>
                <ul className="ap-step-chips">
                  {s.chips.map((c) => <li key={c}>{c}</li>)}
                </ul>
              </div>
              <div className="ap-step-media" aria-hidden="true">
                <img src={s.image} alt="" loading="lazy" />
                <span className="ap-step-media-tag">{s.k}</span>
              </div>
              <div className="ap-step-bar" />
            </li>
          ))}
        </ol>
      </div>
    </section>
  );
}
