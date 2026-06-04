"use client";
import { useEffect, useRef } from "react";
import gsap from "gsap";
import { ScrollTrigger } from "gsap/ScrollTrigger";
import "./LifeAt.scss";

if (typeof window !== "undefined") gsap.registerPlugin(ScrollTrigger);

const STUDIOS = [
  {
    city: "New Delhi",
    zone: "IST · +05:30",
    pulse: "Media HQ",
    note: "Performance, retainers, daily growth rooms.",
    headcount: "60+",
  },
  {
    city: "Mumbai",
    zone: "IST · +05:30",
    pulse: "Creative floor",
    note: "Brand, identity, films and packaging design.",
    headcount: "25+",
  },
  {
    city: "Dubai",
    zone: "GST · +04:00",
    pulse: "MENA hub",
    note: "Arabic-native production and Gulf media buys.",
    headcount: "10+",
  },
  {
    city: "Toronto",
    zone: "EDT · −04:00",
    pulse: "Engineering",
    note: "Tech, AI tooling and overnight QA coverage.",
    headcount: "8+",
  },
];

const RITUALS = [
  { k: "01", t: "Monday standups", d: "Every office opens the week together on one bridge." },
  { k: "02", t: "Wednesday crits",  d: "Open-room reviews — work in progress, read in the open." },
  { k: "03", t: "Friday ship logs", d: "What went live, what learned, what's next — written down." },
  { k: "04", t: "Quarterly offsites", d: "Two offices swap cities every quarter to cross-pollinate." },
];

export default function LifeAt() {
  const ref = useRef(null);

  useEffect(() => {
    const ctx = gsap.context(() => {
      gsap.utils.toArray(".la-studio").forEach((el, i) => {
        gsap.fromTo(el,
          { y: 40, opacity: 0 },
          {
            y: 0, opacity: 1,
            duration: 0.9,
            delay: (i % 4) * 0.06,
            ease: "power3.out",
            scrollTrigger: { trigger: el, start: "top 90%" },
          }
        );
      });
      gsap.utils.toArray(".la-ritual").forEach((el, i) => {
        gsap.fromTo(el,
          { y: 30, opacity: 0 },
          {
            y: 0, opacity: 1,
            duration: 0.8,
            delay: (i % 4) * 0.05,
            ease: "power3.out",
            scrollTrigger: { trigger: el, start: "top 92%" },
          }
        );
      });
    }, ref);
    return () => ctx.revert();
  }, []);

  return (
    <section ref={ref} className="la">
      <div className="la-inner">
        <div className="la-head">
          <span className="la-label">— Life at Epigroww</span>
          <h2 className="la-heading">
            Four cities. One<br />
            <span className="serif">operating tempo.</span>
          </h2>
          <p className="la-intro">
            We're remote-first but not remote-only. Each office holds a heartbeat — Delhi for media, Mumbai for creative, Dubai for MENA accounts, Toronto for North America.
          </p>
        </div>

        <div className="la-studios">
          {STUDIOS.map((s, i) => (
            <article key={s.city} className="la-studio">
              <header className="la-studio-top">
                <span className="la-studio-idx">{String(i + 1).padStart(2, "0")}</span>
                <span className="la-studio-pulse">
                  <span className="la-studio-dot" />
                  {s.pulse}
                </span>
              </header>
              <h3 className="la-studio-city">{s.city}</h3>
              <p className="la-studio-zone">{s.zone}</p>
              <p className="la-studio-note">{s.note}</p>
              <footer className="la-studio-foot">
                <span>Headcount</span>
                <span className="la-studio-count">{s.headcount}</span>
              </footer>
            </article>
          ))}
        </div>

        <div className="la-rituals">
          <span className="la-rituals-label">— Weekly rituals</span>
          <div className="la-rituals-grid">
            {RITUALS.map((r) => (
              <div key={r.k} className="la-ritual">
                <span className="la-ritual-k">{r.k}</span>
                <h4 className="la-ritual-t">{r.t}</h4>
                <p className="la-ritual-d">{r.d}</p>
              </div>
            ))}
          </div>
        </div>
      </div>
    </section>
  );
}
