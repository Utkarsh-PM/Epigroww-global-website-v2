"use client";
import { useEffect, useRef } from "react";
import gsap from "gsap";
import { ScrollTrigger } from "gsap/ScrollTrigger";
import "./ServiceVoices.scss";

if (typeof window !== "undefined") gsap.registerPlugin(ScrollTrigger);

const DEFAULT_AVATARS = [
  "https://images.unsplash.com/photo-1535713875002-d1d0cf377fde?auto=format&fit=facearea&facepad=3&w=240&q=80",
  "https://images.unsplash.com/photo-1507003211169-0a1dd7228f2d?auto=format&fit=facearea&facepad=3&w=240&q=80",
  "https://images.unsplash.com/photo-1500648767791-00dcc994a43e?auto=format&fit=facearea&facepad=3&w=240&q=80",
];

export default function ServiceVoices({ title = "What clients say.", voices = [] }) {
  const ref = useRef(null);

  useEffect(() => {
    const ctx = gsap.context(() => {
      gsap.fromTo(
        ".sv-head > *",
        { opacity: 0, y: 28 },
        {
          opacity: 1,
          y: 0,
          duration: 0.9,
          ease: "power3.out",
          stagger: 0.07,
          scrollTrigger: { trigger: ".sv-head", start: "top 88%" },
        }
      );
      gsap.utils.toArray(".sv-card").forEach((card, i) => {
        gsap.fromTo(
          card,
          { opacity: 0, y: 48 },
          {
            opacity: 1,
            y: 0,
            duration: 0.95,
            delay: i * 0.08,
            ease: "power3.out",
            scrollTrigger: { trigger: card, start: "top 90%" },
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
          <span className="sv-label">
            <span className="sv-label-dot" />
            <span>— Voices</span>
          </span>
          <h2 className="sv-heading">{title}</h2>
          <div className="sv-head-rail">
            <span className="sv-head-count">{String(voices.length).padStart(2, "0")} testimonials</span>
            <span className="sv-head-stars" aria-hidden="true">★★★★★</span>
          </div>
        </div>

        <div className="sv-grid">
          {voices.map((v, i) => {
            const avatar = v.avatar || DEFAULT_AVATARS[i % DEFAULT_AVATARS.length];
            return (
              <article key={i} className={`sv-card ${i === 1 ? "sv-card-featured" : ""}`}>
                <div className="sv-card-mark" aria-hidden="true">
                  <svg viewBox="0 0 48 36" width="48" height="36">
                    <path d="M0 36 V18 C0 8 8 0 18 0 V8 C12 8 8 12 8 18 H18 V36 Z M28 36 V18 C28 8 36 0 46 0 V8 C40 8 36 12 36 18 H46 V36 Z" fill="currentColor"/>
                  </svg>
                </div>
                <p className="sv-card-quote">{v.quote}</p>
                <div className="sv-card-by">
                  <div className="sv-card-author">
                    <div className="sv-card-avatar">
                      <img src={avatar} alt="" />
                    </div>
                    <div>
                      <div className="sv-card-name">{v.name}</div>
                      <div className="sv-card-role">{v.role}</div>
                    </div>
                  </div>
                  <span className="sv-card-tag">{v.tag}</span>
                </div>
              </article>
            );
          })}
        </div>
      </div>
    </section>
  );
}
