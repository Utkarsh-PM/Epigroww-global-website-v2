"use client";
import { useEffect, useRef } from "react";
import gsap from "gsap";
import { ScrollTrigger } from "gsap/ScrollTrigger";
import "./AboutHero.scss";

if (typeof window !== "undefined") gsap.registerPlugin(ScrollTrigger);

const wordsOf = (s) => (s || "").split(/\s+/).filter(Boolean);

export default function AboutHero({ data = {} }) {
  const ref = useRef(null);
  const imgRef = useRef(null);
  const kicker = data.kicker || "— About · Epigroww Global";
  const kickerRight = data.kickerRight || "Est. 2021 · Minority-owned";
  const headlinePrefix = wordsOf(data.headlinePrefix || "We became the agency we wanted to find when we were");
  const headlineAccent = data.headlineAccent || "clients.";
  const stats = (data.stats && data.stats.length ? data.stats : [
    { num: "100+", label: "Specialists" },
    { num: "04", label: "Global studios" },
    { num: "40+", label: "Industries served" },
  ]);
  const imgUrl = (data.image && data.image.url) || data.imageUrl || "https://images.unsplash.com/photo-1522202176988-66273c2fd55f?auto=format&fit=crop&w=1600&q=80";
  const imageMeta = data.imageMeta || "001 / Studio — Mumbai · 2026";

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

  return (
    <section ref={ref} className="ah">
      <div className="ah-inner">
        <div className="ah-kicker">
          <span className="dot" />
          <span>{kicker}</span>
          <span className="ah-est">{kickerRight}</span>
        </div>

        <h1 className="ah-head">
          {headlinePrefix.map((w, i) => (
            <span key={`a${i}`} className="word-wrap">
              <span className="ah-line-word">{w}</span>
            </span>
          ))}{" "}
          <span className="word-wrap"><span className="ah-line-word serif">{headlineAccent}</span></span>
        </h1>

        <div className="ah-footer">
          <div className="ah-meta">
            {stats.map((s, i) => (
              <div className="meta-block" key={i}>
                <span className="num">{s.num}</span>
                <span className="lab">{s.label}</span>
              </div>
            ))}
          </div>

          <div ref={imgRef} className="ah-image-wrap">
            <div className="ah-image">
              <img src={imgUrl} alt="Epigroww team" />
              <div className="ah-image-meta">
                <span>{imageMeta}</span>
              </div>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}
