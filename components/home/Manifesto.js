"use client";
import { useEffect, useRef } from "react";
import gsap from "gsap";
import { ScrollTrigger } from "gsap/ScrollTrigger";
import { getCloudinaryUrl } from "../../utils/cloudinary";
import "./Manifesto.scss";

if (typeof window !== "undefined") gsap.registerPlugin(ScrollTrigger);

const MANIFESTO = `We don't sell services. We engineer outcomes — pairing award-winning creative with performance data and tech that compounds. One team, four cities, endless specificity.`;

const FOUNDER_PUBLIC_ID = "epigroww-global-website/home/founder-portrait";

export default function Manifesto() {
  const ref = useRef(null);

  useEffect(() => {
    const el = ref.current;
    if (!el) return;
    const ctx = gsap.context(() => {
      const words = el.querySelectorAll(".mf-word");
      gsap.fromTo(
        words,
        { opacity: 0.12 },
        {
          opacity: 1,
          ease: "none",
          stagger: 0.04,
          scrollTrigger: {
            trigger: el,
            start: "top 75%",
            end: "top 15%",
            scrub: true,
          },
        }
      );

      // Founder portrait — slow parallax reveal alongside the manifesto words.
      const portrait = el.querySelector(".manifesto-portrait");
      if (portrait) {
        gsap.fromTo(
          portrait,
          { opacity: 0, y: 60, scale: 1.04 },
          {
            opacity: 1,
            y: 0,
            scale: 1,
            duration: 1.2,
            ease: "power3.out",
            scrollTrigger: { trigger: el, start: "top 70%" },
          }
        );
      }
    }, ref);
    return () => ctx.revert();
  }, []);

  return (
    <section ref={ref} className="manifesto">
      <div className="manifesto-inner">
        <div className="manifesto-top">
          <span className="manifesto-label">— 02 / Philosophy</span>
          <span className="manifesto-label">Read · 18 sec</span>
        </div>
        <div className="manifesto-grid">
          <div className="manifesto-body">
            <p className="manifesto-text">
              {MANIFESTO.split(" ").map((w, i) => (
                <span key={i}>
                  <span className="mf-word">{w}</span>
                  {i < MANIFESTO.split(" ").length - 1 ? " " : ""}
                </span>
              ))}
            </p>
            <div className="manifesto-sign">
              <span>— Danish Abbasi</span>
              <span className="manifesto-role">Founder, Epigroww Global</span>
            </div>
          </div>

          <figure className="manifesto-portrait" aria-hidden="false">
            <span className="manifesto-portrait-glow" aria-hidden="true" />
            <div className="manifesto-portrait-frame">
              <img
                src={getCloudinaryUrl(FOUNDER_PUBLIC_ID, { width: 1200, crop: "fill", gravity: "auto" })}
                srcSet={`${getCloudinaryUrl(FOUNDER_PUBLIC_ID, { width: 600 })} 600w, ${getCloudinaryUrl(FOUNDER_PUBLIC_ID, { width: 900 })} 900w, ${getCloudinaryUrl(FOUNDER_PUBLIC_ID, { width: 1200 })} 1200w`}
                sizes="(max-width: 880px) 80vw, 38vw"
                alt="Danish Abbasi — Founder, Epigroww Global"
                loading="lazy"
                decoding="async"
              />
            </div>
            <figcaption className="manifesto-portrait-meta">
              <span className="manifesto-portrait-tag">
                <span className="manifesto-portrait-dot" />
                Founder
              </span>
              <span className="manifesto-portrait-name">Danish Abbasi</span>
            </figcaption>
          </figure>
        </div>
      </div>
    </section>
  );
}
