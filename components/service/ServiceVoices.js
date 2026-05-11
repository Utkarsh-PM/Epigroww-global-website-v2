"use client";
import { useEffect, useRef } from "react";
import gsap from "gsap";
import { ScrollTrigger } from "gsap/ScrollTrigger";
import "./ServiceVoices.scss";

if (typeof window !== "undefined") gsap.registerPlugin(ScrollTrigger);

export default function ServiceVoices({ title = "What clients say.", voices = [] }) {
  const ref = useRef(null);

  useEffect(() => {
    const ctx = gsap.context(() => {
      gsap.utils.toArray(".sv-card").forEach((card, i) => {
        gsap.fromTo(
          card,
          { opacity: 0, y: 40 },
          {
            opacity: 1,
            y: 0,
            duration: 0.9,
            delay: i * 0.1,
            ease: "power3.out",
            scrollTrigger: { trigger: card, start: "top 88%" },
          }
        );
      });
    }, ref);
    return () => ctx.revert();
  }, []);

  return (
    <section ref={ref} className="sv">
      <div className="sv-inner">
        <div className="sv-head">
          <span className="sv-label">— Voices</span>
          <h2 className="sv-heading">{title}</h2>
        </div>

        <div className="sv-grid">
          {voices.map((v, i) => (
            <article key={i} className="sv-card">
              <div className="sv-card-mark">“</div>
              <p className="sv-card-quote">{v.quote}</p>
              <div className="sv-card-by">
                <div>
                  <div className="sv-card-name">{v.name}</div>
                  <div className="sv-card-role">{v.role}</div>
                </div>
                <span className="sv-card-tag">{v.tag}</span>
              </div>
            </article>
          ))}
        </div>
      </div>
    </section>
  );
}
