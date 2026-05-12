"use client";
import { useEffect, useRef } from "react";
import gsap from "gsap";
import { ScrollTrigger } from "gsap/ScrollTrigger";
import "./VisualShowcase.scss";

if (typeof window !== "undefined") gsap.registerPlugin(ScrollTrigger);

export default function VisualShowcase({
  label = "— In motion",
  title = "What it looks like in production.",
  accent = "in production.",
  intro = "",
  video,
  tiles = [],
}) {
  const ref = useRef(null);

  useEffect(() => {
    const ctx = gsap.context(() => {
      gsap.fromTo(
        ".vs-head-word",
        { yPercent: 110 },
        {
          yPercent: 0,
          duration: 1,
          ease: "power4.out",
          stagger: 0.05,
          scrollTrigger: { trigger: ".vs-head", start: "top 85%" },
        }
      );
      gsap.fromTo(
        ".vs-canvas",
        { clipPath: "inset(10% 6% 10% 6% round 28px)", scale: 1.02 },
        {
          clipPath: "inset(0% 0% 0% 0% round 24px)",
          scale: 1,
          ease: "none",
          scrollTrigger: {
            trigger: ref.current,
            start: "top 80%",
            end: "top 20%",
            scrub: 1,
          },
        }
      );
      gsap.utils.toArray(".vs-tile").forEach((t, i) => {
        gsap.fromTo(
          t,
          { y: 60, opacity: 0, clipPath: "inset(100% 0 0 0)" },
          {
            y: 0,
            opacity: 1,
            clipPath: "inset(0% 0 0 0)",
            duration: 1.1,
            delay: (i % 3) * 0.07,
            ease: "power4.out",
            scrollTrigger: { trigger: t, start: "top 92%" },
          }
        );
      });
    }, ref);
    return () => ctx.revert();
  }, []);

  const titleWords = title.split(" ");

  return (
    <section ref={ref} className="vs">
      <div className="vs-inner">
        <div className="vs-head">
          <span className="vs-label">
            <span className="vs-label-dot" />
            <span>{label}</span>
          </span>
          <h2 className="vs-heading">
            {titleWords.map((w, i) => (
              <span key={i} className="word-wrap">
                <span className={`vs-head-word ${w === accent.trim() ? "serif" : ""}`}>{w}</span>
              </span>
            ))}
            {accent && !titleWords.includes(accent.trim()) && (
              <>
                {" "}
                <span className="word-wrap">
                  <span className="vs-head-word serif">{accent}</span>
                </span>
              </>
            )}
          </h2>
          {intro && <p className="vs-intro">{intro}</p>}
        </div>

        {video && (
          <div className="vs-canvas">
            <video
              className="vs-video"
              autoPlay
              loop
              muted
              playsInline
              preload="metadata"
              poster={video.poster}
            >
              <source src={video.src} type="video/mp4" />
            </video>
            <div className="vs-canvas-tint" />
            <div className="vs-canvas-meta">
              <span className="vs-chip">
                <span className="vs-chip-dot" />
                Live build
              </span>
              {video.tag && <span className="vs-chip">{video.tag}</span>}
            </div>
          </div>
        )}

        {tiles.length > 0 && (
          <div className="vs-grid">
            {tiles.map((t, i) => (
              <figure key={i} className={`vs-tile vs-w-${t.w || 1} vs-h-${t.h || 1}`} data-cursor="view" data-cursor-label="View">
                <img src={t.img} alt={t.label || ""} loading="lazy" />
                <figcaption className="vs-tile-meta">
                  <span>{t.label}</span>
                  <span>{String(i + 1).padStart(2, "0")}</span>
                </figcaption>
              </figure>
            ))}
          </div>
        )}
      </div>
    </section>
  );
}
