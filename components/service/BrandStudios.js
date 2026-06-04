"use client";
import { useEffect, useRef } from "react";
import gsap from "gsap";
import { ScrollTrigger } from "gsap/ScrollTrigger";
import VideoBackground from "../shared/VideoBackground";
import "./BrandStudios.scss";

if (typeof window !== "undefined") gsap.registerPlugin(ScrollTrigger);

const STUDIO_CATS = [
  "Studio",
  "Reel",
  "Edit",
  "Film",
  "Loop",
  "Print",
  "Direct",
  "Vision",
  "Sound",
];

export default function BrandStudios({ title, accent, intro, items = [] }) {
  const ref = useRef(null);

  useEffect(() => {
    const ctx = gsap.context(() => {
      gsap.fromTo(
        ".bs-head-word",
        { yPercent: 110 },
        {
          yPercent: 0,
          duration: 1,
          ease: "power4.out",
          stagger: 0.05,
          scrollTrigger: { trigger: ".bs-head", start: "top 80%" },
        }
      );
      gsap.utils.toArray(".bs-card").forEach((card, i) => {
        gsap.fromTo(
          card,
          { y: 80, opacity: 0, rotate: i % 2 === 0 ? -1.5 : 1.5 },
          {
            y: 0,
            opacity: 1,
            rotate: 0,
            duration: 1,
            delay: (i % 3) * 0.07,
            ease: "power3.out",
            scrollTrigger: { trigger: card, start: "top 92%" },
          }
        );
      });
    }, ref);
    return () => ctx.revert();
  }, []);

  return (
    <section ref={ref} className="bs">
      <div className="bs-paper" aria-hidden="true" />
      <div className="bs-inner">
        <div className="bs-head">
          <div className="bs-masthead">
            <span className="bs-masthead-rule" />
            <span className="bs-masthead-text">Issue · 09 — The Creative Volume</span>
            <span className="bs-masthead-rule" />
          </div>
          <h2 className="bs-heading">
            {title.split(" ").map((w, i) => (
              <span key={i} className="word-wrap">
                <span className="bs-head-word">{w}</span>
              </span>
            ))}{" "}
            <span className="word-wrap">
              <span className="bs-head-word serif">{accent}</span>
            </span>
          </h2>
          {intro && <p className="bs-intro">{intro}</p>}
        </div>

        <div className="bs-grid">
          {items.map((it, i) => (
            <article key={i} className="bs-card" data-cursor="hover">
              <div className="bs-card-frame">
                <span className="bs-card-num">{String(i + 1).padStart(2, "0")}</span>
                <span className="bs-card-glyph">{it.icon}</span>
                <div className="bs-card-photo">
                  {it.videoPublicId ? (
                    <VideoBackground
                      publicId={it.videoPublicId}
                      orientation="vertical"
                      title={it.title}
                      rootMargin="300px"
                    />
                  ) : (
                    it.image && <img src={it.image} alt="" loading="lazy" />
                  )}
                  <div className="bs-card-photo-grain" />
                </div>
                <div className="bs-card-tape bs-card-tape--tl" />
                <div className="bs-card-tape bs-card-tape--br" />
              </div>

              <div className="bs-card-body">
                <div className="bs-card-meta">
                  <span className="bs-card-folio">Folio {String(i + 1).padStart(3, "0")}</span>
                  <span className="bs-card-dot" />
                  <span className="bs-card-cat">{STUDIO_CATS[i % STUDIO_CATS.length]}</span>
                </div>
                <h3 className="bs-card-title">{it.title}</h3>
                <p className="bs-card-body-text">{it.body}</p>

                <ul className="bs-card-chips">
                  {it.chips?.map((c) => (
                    <li key={c}>{c}</li>
                  ))}
                </ul>

                <div className="bs-card-foot">
                  <span className="bs-card-cta">Read the issue</span>
                  <div className="bs-card-arrow">
                    <svg viewBox="0 0 24 24" width="14" height="14">
                      <path
                        d="M5 12h14M13 6l6 6-6 6"
                        fill="none"
                        stroke="currentColor"
                        strokeWidth="1.8"
                        strokeLinecap="round"
                        strokeLinejoin="round"
                      />
                    </svg>
                  </div>
                </div>
              </div>
            </article>
          ))}
        </div>
      </div>
    </section>
  );
}
