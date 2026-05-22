"use client";
import { useEffect, useRef, useState } from "react";
import gsap from "gsap";
import { ScrollTrigger } from "gsap/ScrollTrigger";
import VideoBackground from "../shared/VideoBackground";
import "./ServiceApproach.scss";

if (typeof window !== "undefined") gsap.registerPlugin(ScrollTrigger);

const FALLBACK_VISUALS = [
  "https://images.unsplash.com/photo-1497366216548-37526070297c?auto=format&fit=crop&w=1100&q=80",
  "https://images.unsplash.com/photo-1531403009284-440f080d1e12?auto=format&fit=crop&w=1100&q=80",
  "https://images.unsplash.com/photo-1551434678-e076c223a692?auto=format&fit=crop&w=1100&q=80",
  "https://images.unsplash.com/photo-1517245386807-bb43f82c33c4?auto=format&fit=crop&w=1100&q=80",
  "https://images.unsplash.com/photo-1581091226825-a6a2a5aee158?auto=format&fit=crop&w=1100&q=80",
  "https://images.unsplash.com/photo-1499951360447-b19be8fe80f5?auto=format&fit=crop&w=1100&q=80",
];

export default function ServiceApproach({ title, subtitle, steps = [] }) {
  const ref = useRef(null);
  const [active, setActive] = useState(0);

  useEffect(() => {
    const ctx = gsap.context(() => {
      gsap.fromTo(
        ".sa-head > *",
        { opacity: 0, y: 24 },
        {
          opacity: 1,
          y: 0,
          duration: 0.9,
          ease: "power3.out",
          stagger: 0.08,
          scrollTrigger: { trigger: ".sa-head", start: "top 85%" },
        }
      );
      gsap.utils.toArray(".sa-step").forEach((step, i) => {
        gsap.fromTo(
          step,
          { opacity: 0, x: -40 },
          {
            opacity: 1,
            x: 0,
            duration: 0.9,
            ease: "power3.out",
            delay: i * 0.06,
            scrollTrigger: { trigger: step, start: "top 88%" },
          }
        );
      });
    }, ref);
    return () => ctx.revert();
  }, []);

  return (
    <section ref={ref} className="sa">
      <div className="sa-glow" aria-hidden="true" />
      <div className="sa-inner">
        <div className="sa-head">
          <span className="sa-label">
            <span className="sa-label-line" />
            <span>— {subtitle}</span>
          </span>
          <h2 className="sa-heading">{title}</h2>
        </div>

        <div className="sa-stage">
          <ol className="sa-list">
            {steps.map((s, i) => (
              <li
                key={i}
                className={`sa-step ${active === i ? "is-active" : ""}`}
                onMouseEnter={() => setActive(i)}
              >
                <span className="sa-step-num">{String(i + 1).padStart(2, "0")}</span>
                <div className="sa-step-content">
                  <h3>{s.title}</h3>
                  <p>{s.body}</p>
                </div>
                <span className="sa-step-icon">{s.icon}</span>
                <span className="sa-step-line" />
              </li>
            ))}
          </ol>

          <div className="sa-visual" aria-hidden="true">
            <div className="sa-visual-frame">
              {steps.map((s, i) => {
                const img = s.image || FALLBACK_VISUALS[i % FALLBACK_VISUALS.length];
                if (s.videoPublicId) {
                  return (
                    <div
                      key={i}
                      className={`sa-visual-slide sa-visual-slide--video ${active === i ? "is-active" : ""}`}
                    >
                      <VideoBackground
                        publicId={s.videoPublicId}
                        orientation="horizontal"
                        title={s.title}
                        rootMargin="400px"
                      />
                    </div>
                  );
                }
                return (
                  <div
                    key={i}
                    className={`sa-visual-slide ${active === i ? "is-active" : ""}`}
                    style={{ backgroundImage: `url(${img})` }}
                  />
                );
              })}
              <div className="sa-visual-tint" />
              <div className="sa-visual-meta">
                <span className="sa-visual-num">{String(active + 1).padStart(2, "0")} / {String(steps.length).padStart(2, "0")}</span>
                <span className="sa-visual-title">{steps[active]?.title}</span>
              </div>
              <div className="sa-visual-rings" aria-hidden="true">
                <span /><span /><span />
              </div>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}
