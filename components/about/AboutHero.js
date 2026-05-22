"use client";
import { useEffect, useRef } from "react";
import gsap from "gsap";
import { ScrollTrigger } from "gsap/ScrollTrigger";
import "./AboutHero.scss";

if (typeof window !== "undefined") gsap.registerPlugin(ScrollTrigger);

export default function AboutHero() {
  const ref = useRef(null);
  const imgRef = useRef(null);

  useEffect(() => {
    const ctx = gsap.context(() => {
      const tl = gsap.timeline({ delay: 0.2 });
      tl.fromTo(
        ".ah-kicker",
        { opacity: 0, y: 14 },
        { opacity: 1, y: 0, duration: 1, ease: "power3.out" }
      );
      tl.fromTo(
        ".ah-line-word",
        { yPercent: 110 },
        { yPercent: 0, duration: 1.2, ease: "power4.out", stagger: 0.055 },
        "-=0.7"
      );
      tl.fromTo(
        ".ah-meta > *",
        { opacity: 0, y: 20 },
        { opacity: 1, y: 0, duration: 0.8, stagger: 0.08, ease: "power3.out" },
        "-=0.6"
      );
      tl.fromTo(
        ".ah-image-wrap",
        { clipPath: "inset(100% 0 0 0)" },
        { clipPath: "inset(0% 0 0 0)", duration: 1.4, ease: "power4.out" },
        "-=1.0"
      );

      gsap.to(imgRef.current, {
        yPercent: -12,
        ease: "none",
        scrollTrigger: {
          trigger: ref.current,
          start: "top top",
          end: "bottom top",
          scrub: true,
        },
      });
    }, ref);
    return () => ctx.revert();
  }, []);

  const words = ["We", "became", "the", "agency", "we", "wanted"];
  const words2 = ["to", "find", "when", "we", "were"];

  return (
    <section ref={ref} className="ah">
      <div className="ah-inner">
        <div className="ah-kicker">
          <span className="dot" />
          <span>— About · Epigroww Global</span>
          <span className="ah-est">Est. 2021 · Minority-owned</span>
        </div>

        <h1 className="ah-head">
          {words.map((w, i) => (
            <span key={`a${i}`} className="word-wrap">
              <span className="ah-line-word">{w}</span>
            </span>
          ))}
          <span className="word-wrap"><span className="ah-line-word">—</span></span>{" "}
          {words2.map((w, i) => (
            <span key={`b${i}`} className="word-wrap">
              <span className="ah-line-word">{w}</span>
            </span>
          ))}
          <span className="word-wrap"><span className="ah-line-word serif">clients.</span></span>
        </h1>

        <div className="ah-footer">
          <div className="ah-meta">
            <div className="meta-block">
              <span className="num">100+</span>
              <span className="lab">Specialists</span>
            </div>
            <div className="meta-block">
              <span className="num">04</span>
              <span className="lab">Global studios</span>
            </div>
            <div className="meta-block">
              <span className="num">40+</span>
              <span className="lab">Industries served</span>
            </div>
          </div>

          <div ref={imgRef} className="ah-image-wrap">
            <div className="ah-image">
              <img
                src="https://res.cloudinary.com/dsauqv4va/image/upload/f_auto,q_auto,w_1600/epigroww-global-website/home/featured/featured-work-4"
                alt="Epigroww team"
              />
              <div className="ah-image-meta">
                <span>001 / Studio — Mumbai</span>
                <span>2026</span>
              </div>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}
