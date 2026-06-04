"use client";
import { useEffect, useRef, useState } from "react";
import gsap from "gsap";
import { ScrollTrigger } from "gsap/ScrollTrigger";
import "./Voices.scss";

if (typeof window !== "undefined") gsap.registerPlugin(ScrollTrigger);

const VOICES = [
  {
    quote:
      "Epigroww is the rare partner who treats our P&L like theirs. Campaigns launch faster, creative comes sharper, and the revenue shows up in the sheet.",
    name: "Rohit Sethi",
    role: "CEO · JK Lifestyle",
    tag: "Brand + Media partner",
  },
  {
    quote:
      "They rebuilt our tech stack in a quarter and stayed on through two product launches. It's the first agency that actually stuck around past the handoff.",
    name: "Jatinder Chaudhary",
    role: "Director · JCBL Group",
    tag: "Tech transformation",
  },
  {
    quote:
      "The OTT launch plan they shipped moved retention almost 60%. What surprised us was how tight the creative was — and how cheaply it scaled.",
    name: "Mohit Bubber",
    role: "Founder · Cinegold",
    tag: "OTT growth",
  },
];

export default function Voices() {
  const ref = useRef(null);
  const [active, setActive] = useState(0);
  const autoTimer = useRef(null);

  useEffect(() => {
    const ctx = gsap.context(() => {
      gsap.fromTo(
        ".voice-head-word",
        { yPercent: 110 },
        {
          yPercent: 0,
          duration: 1,
          ease: "power4.out",
          stagger: 0.05,
          scrollTrigger: { trigger: ".voice-head", start: "top 80%" },
        }
      );
    }, ref);

    autoTimer.current = setInterval(() => {
      setActive((i) => (i + 1) % VOICES.length);
    }, 6000);

    return () => {
      ctx.revert();
      if (autoTimer.current) clearInterval(autoTimer.current);
    };
  }, []);

  const go = (i) => {
    setActive(i);
    if (autoTimer.current) clearInterval(autoTimer.current);
    autoTimer.current = setInterval(() => {
      setActive((idx) => (idx + 1) % VOICES.length);
    }, 6000);
  };

  const v = VOICES[active];

  return (
    <section ref={ref} className="voices">
      <div className="voices-inner">
        <div className="voice-head">
          <span className="voice-label">— 08 / Voices</span>
          <h2 className="voice-heading">
            <span className="word-wrap"><span className="voice-head-word">What</span></span>{" "}
            <span className="word-wrap"><span className="voice-head-word">the</span></span>{" "}
            <span className="word-wrap"><span className="voice-head-word serif">people</span></span>{" "}
            <span className="word-wrap"><span className="voice-head-word serif">paying</span></span>{" "}
            <span className="word-wrap"><span className="voice-head-word serif">us</span></span>{" "}
            <span className="word-wrap"><span className="voice-head-word">say.</span></span>
          </h2>
        </div>

        <div className="voice-stage">
          <div className="voice-left">
            <div className="voice-mark">“</div>
            <p key={active} className="voice-quote">{v.quote}</p>
            <div className="voice-by">
              <div className="voice-name">{v.name}</div>
              <div className="voice-role">{v.role}</div>
              <div className="voice-tag">{v.tag}</div>
            </div>
          </div>

          <div className="voice-right">
            {VOICES.map((_, i) => (
              <button
                key={i}
                className={`voice-pip ${active === i ? "is-active" : ""}`}
                onMouseEnter={() => go(i)}
                onClick={() => go(i)}
                data-cursor="hover"
              >
                <span className="voice-pip-num">{String(i + 1).padStart(2, "0")}</span>
                <span className="voice-pip-name">{VOICES[i].name}</span>
                <span className="voice-pip-line" />
              </button>
            ))}
          </div>
        </div>
      </div>
    </section>
  );
}
