"use client";
import { useEffect, useRef } from "react";
import gsap from "gsap";
import "./ContactHero.scss";

export default function ContactHero() {
  const ref = useRef(null);

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
          <span><span className="dot" /> 08 · Contact</span>
          <span>Reply in under 24 hours</span>
        </div>
        <h1 className="co-head">
          <span className="word-wrap"><span className="co-word">You</span></span>{" "}
          <span className="word-wrap"><span className="co-word">made</span></span>{" "}
          <span className="word-wrap"><span className="co-word">it</span></span>{" "}
          <span className="word-wrap"><span className="co-word serif">all</span></span>{" "}
          <span className="word-wrap"><span className="co-word serif">the</span></span>{" "}
          <span className="word-wrap"><span className="co-word serif">way</span></span>{" "}
          <span className="word-wrap"><span className="co-word">here.</span></span>
        </h1>
        <p className="co-sub">
          Four studios, one inbox. If you've got a brief — a vague one, a specific one, a three-hundred-million one — we'd love to read it.
        </p>
      </div>
    </section>
  );
}
