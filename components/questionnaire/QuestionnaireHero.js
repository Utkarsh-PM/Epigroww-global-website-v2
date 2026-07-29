"use client";
import { useEffect, useRef } from "react";
import gsap from "gsap";
import "./QuestionnaireHero.scss";

const META = [
  { k: "18", l: "Questions" },
  { k: "~8 min", l: "To complete" },
  { k: "1 team", l: "Reads every answer" },
];

export default function QuestionnaireHero() {
  const ref = useRef(null);

  useEffect(() => {
    const ctx = gsap.context(() => {
      const reduce = window.matchMedia("(prefers-reduced-motion: reduce)").matches;
      if (reduce) {
        gsap.set(".qnh-kicker > *, .qnh-word, .qnh-lede, .qnh-meta-item", {
          opacity: 1,
          y: 0,
          yPercent: 0,
        });
        return;
      }

      const tl = gsap.timeline({ delay: 0.15 });
      tl.fromTo(
        ".qnh-kicker > *",
        { opacity: 0, y: 12 },
        { opacity: 1, y: 0, duration: 0.7, stagger: 0.08, ease: "power3.out" }
      );
      tl.fromTo(
        ".qnh-word",
        { yPercent: 110 },
        { yPercent: 0, duration: 1.1, stagger: 0.06, ease: "power4.out" },
        "-=0.45"
      );
      tl.fromTo(
        ".qnh-lede",
        { opacity: 0, y: 16 },
        { opacity: 1, y: 0, duration: 0.8, ease: "power3.out" },
        "-=0.65"
      );
      tl.fromTo(
        ".qnh-meta-item",
        { opacity: 0, y: 16 },
        { opacity: 1, y: 0, duration: 0.7, stagger: 0.08, ease: "power3.out" },
        "-=0.55"
      );
    }, ref);
    return () => ctx.revert();
  }, []);

  const words = [
    { t: "Before", em: false },
    { t: "we", em: false },
    { t: "pitch,", em: false },
    { t: "we", em: true },
    { t: "ask.", em: true },
  ];

  return (
    <section ref={ref} className="qnh">
      <div className="qnh-inner">
        <div className="qnh-kicker">
          <span>
            <span className="dot" /> Brand discovery
          </span>
          <span>India market launch</span>
        </div>

        <div className="qnh-body">
          <div className="qnh-lead">
            <h1 className="qnh-head">
              {words.map((w, i) => (
                <span key={`${w.t}-${i}`} className="qnh-word-wrap">
                  <span className={`qnh-word ${w.em ? "is-em" : ""}`}>{w.t}</span>
                </span>
              ))}
            </h1>
            <p className="qnh-lede">
              These answers shape your go-to-market, route-to-market, branding and
              media strategy — so we come back with a plan built on your reality,
              not a template. Answer what you can; leave what you can&apos;t. Nothing
              here is published, sold or shared outside the strategy team.
            </p>
          </div>

          <ul className="qnh-meta">
            {META.map((m) => (
              <li key={m.l} className="qnh-meta-item">
                <span className="qnh-meta-k ticker-num">{m.k}</span>
                <span className="qnh-meta-l">{m.l}</span>
              </li>
            ))}
          </ul>
        </div>
      </div>
    </section>
  );
}
