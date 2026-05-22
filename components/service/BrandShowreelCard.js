"use client";
import { useEffect, useRef, useState } from "react";
import gsap from "gsap";
import { ScrollTrigger } from "gsap/ScrollTrigger";
import VideoBackground from "../shared/VideoBackground";
import "./BrandShowreelCard.scss";

if (typeof window !== "undefined") gsap.registerPlugin(ScrollTrigger);

const HERO_VIDEO = "epigroww-global-website/brand-solutions/showreel-hero";

export default function BrandShowreelCard() {
  const ref = useRef(null);
  const heroVideoRef = useRef(null);
  const [playing, setPlaying] = useState(true);

  useEffect(() => {
    const ctx = gsap.context(() => {
      gsap.fromTo(
        ".bsc-canvas",
        { clipPath: "inset(12% 8% 12% 8% round 28px)", scale: 1.02 },
        {
          clipPath: "inset(0% 0% 0% 0% round 24px)",
          scale: 1,
          ease: "none",
          scrollTrigger: {
            trigger: ref.current,
            start: "top 85%",
            end: "top 20%",
            scrub: 1,
          },
        }
      );
      gsap.fromTo(
        ".bsc-head-word",
        { yPercent: 110 },
        {
          yPercent: 0,
          duration: 1,
          ease: "power4.out",
          stagger: 0.05,
          scrollTrigger: { trigger: ".bsc-head", start: "top 85%" },
        }
      );
    }, ref);
    return () => ctx.revert();
  }, []);

  const togglePlay = () => {
    const v = heroVideoRef.current;
    if (!v) return;
    if (v.paused) {
      v.play();
      setPlaying(true);
    } else {
      v.pause();
      setPlaying(false);
    }
  };

  return (
    <section ref={ref} className="bsc">
      <div className="bsc-inner">
        <div className="bsc-head">
          <span className="bsc-label">
            <span className="bsc-label-dot" />
            <span>— 05.5 / Brand Showreel · Spring 2026</span>
          </span>
          <h2 className="bsc-heading">
            <span className="word-wrap"><span className="bsc-head-word">A</span></span>{" "}
            <span className="word-wrap"><span className="bsc-head-word">quarter</span></span>{" "}
            <span className="word-wrap"><span className="bsc-head-word serif">of</span></span>{" "}
            <span className="word-wrap"><span className="bsc-head-word serif">brand</span></span>
            <span className="word-wrap"><span className="bsc-head-word">,</span></span>{" "}
            <span className="word-wrap"><span className="bsc-head-word">cut</span></span>{" "}
            <span className="word-wrap"><span className="bsc-head-word">into</span></span>{" "}
            <span className="word-wrap"><span className="bsc-head-word">one</span></span>{" "}
            <span className="word-wrap"><span className="bsc-head-word">reel.</span></span>
          </h2>
        </div>

        <div className="bsc-canvas">
          <VideoBackground
            publicId={HERO_VIDEO}
            orientation="horizontal"
            title="Epigroww — Brand Showreel"
            onVideoReady={(el) => { heroVideoRef.current = el; }}
          />
          <div className="bsc-canvas-tint" />

          <div className="bsc-overlay">
            <div className="bsc-overlay-top">
              <span className="bsc-chip">
                <span className="bsc-chip-dot" />
                Now playing
              </span>
              <span className="bsc-chip">Brand studio · 100+ creatives / week</span>
            </div>
            <div className="bsc-overlay-bottom">
              <button
                type="button"
                className="bsc-play"
                onClick={togglePlay}
                data-cursor="hover"
                aria-label={playing ? "Pause showreel" : "Play showreel"}
              >
                {playing ? (
                  <svg viewBox="0 0 24 24" width="18" height="18">
                    <rect x="6" y="5" width="4" height="14" fill="currentColor" />
                    <rect x="14" y="5" width="4" height="14" fill="currentColor" />
                  </svg>
                ) : (
                  <svg viewBox="0 0 24 24" width="18" height="18">
                    <path d="M7 4 L20 12 L7 20 Z" fill="currentColor" />
                  </svg>
                )}
                <span>{playing ? "Pause reel" : "Play reel"}</span>
              </button>
              <div className="bsc-info">
                <span className="bsc-info-num">Brand reel · Q2 2026</span>
                <span className="bsc-info-sub">Films, identity, packaging — one cut</span>
              </div>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}
