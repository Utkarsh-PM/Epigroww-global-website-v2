"use client";
import { useEffect, useRef } from "react";
import gsap from "gsap";
import "./ContactHero.scss";

const wordsOf = (s) => (s || "").split(/\s+/).filter(Boolean);

export default function ContactHero({ data = {} }) {
  const ref = useRef(null);
  const kickerLeft = data.kickerLeft || "08 · Contact";
  const kickerRight = data.kickerRight || "Reply in under 24 hours";
  const headPrefix = wordsOf(data.headingPrefix || "You made it");
  const headAccent = wordsOf(data.headingAccent || "all the way");
  const headSuffix = wordsOf(data.headingSuffix || "here.");
  const sub = data.sub || "Four studios, one inbox.";

  useEffect(() => {
    const ctx = gsap.context(() => {
      const tl = gsap.timeline({ delay: 0.2 });
      tl.fromTo(".co-kicker > *", { opacity: 0, y: 12 }, { opacity: 1, y: 0, duration: 0.8, stagger: 0.08, ease: "power3.out" });
      tl.fromTo(".co-word", { yPercent: 110 }, { yPercent: 0, duration: 1.1, ease: "power4.out", stagger: 0.06 }, "-=0.5");
      tl.fromTo(".co-sub", { opacity: 0, y: 16 }, { opacity: 1, y: 0, duration: 0.9, ease: "power3.out" }, "-=0.4");
    }, ref);
    return () => ctx.revert();
  }, []);

  return (
    <section ref={ref} className="co">
      <div className="co-inner">
        <div className="co-kicker">
          <span><span className="dot" /> {kickerLeft}</span>
          <span>{kickerRight}</span>
        </div>
        <h1 className="co-head">
          {headPrefix.map((w, i) => (
            <span key={`cp${i}`}>
              <span className="word-wrap"><span className="co-word">{w}</span></span>{" "}
            </span>
          ))}
          {headAccent.map((w, i) => (
            <span key={`ca${i}`}>
              <span className="word-wrap"><span className="co-word serif">{w}</span></span>{" "}
            </span>
          ))}
          {headSuffix.map((w, i) => (
            <span key={`cs${i}`}>
              <span className="word-wrap"><span className="co-word">{w}</span></span>{i < headSuffix.length - 1 ? " " : ""}
            </span>
          ))}
        </h1>
        <p className="co-sub">{sub}</p>
      </div>
    </section>
  );
}
