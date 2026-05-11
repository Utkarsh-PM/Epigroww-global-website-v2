"use client";
import { useEffect, useRef } from "react";
import Link from "next/link";
import gsap from "gsap";
import { ScrollTrigger } from "gsap/ScrollTrigger";
import "./CTA.scss";

if (typeof window !== "undefined") gsap.registerPlugin(ScrollTrigger);

export default function CTA({
  eyebrow = "— Let's build",
  heading = "Start a project with a team that treats your KPIs like ours.",
  accent = "next growth chapter",
  ctaText = "Start a project",
  ctaHref = "/contact",
  dark = true,
}) {
  const secRef = useRef(null);
  const bgRef = useRef(null);

  useEffect(() => {
    const el = secRef.current;
    if (!el) return;
    gsap.fromTo(
      bgRef.current,
      { scale: 1.08, borderRadius: "48px" },
      {
        scale: 1,
        borderRadius: "32px",
        ease: "none",
        scrollTrigger: {
          trigger: el,
          start: "top bottom",
          end: "top 30%",
          scrub: 1,
        },
      }
    );
  }, []);

  return (
    <section ref={secRef} className={`cta-section ${dark ? "cta-dark" : "cta-light"}`}>
      <div ref={bgRef} className="cta-bg">
        <div className="cta-orb cta-orb-1" />
        <div className="cta-orb cta-orb-2" />
        <div className="cta-grid" />

        <div className="cta-inner">
          <div className="cta-eyebrow">{eyebrow}</div>
          <h2 className="cta-heading">
            {heading.split(accent)[0]}
            <span className="cta-accent">{accent}</span>
            {heading.split(accent)[1] || ''}
          </h2>
          <div className="cta-row">
            <Link href={ctaHref} className="cta-btn" data-cursor="view" data-cursor-label="Let's talk">
              <span>{ctaText}</span>
              <span className="cta-btn-arr">
                <svg viewBox="0 0 24 24" width="18" height="18"><path d="M6 18 L18 6 M10 6 L18 6 L18 14" fill="none" stroke="currentColor" strokeWidth="1.6"/></svg>
              </span>
            </Link>
            <a href="mailto:hello@epigrowwglobal.com" className="cta-mail" data-cursor="hover">hello@epigrowwglobal.com</a>
          </div>
        </div>
      </div>
    </section>
  );
}
