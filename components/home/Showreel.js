"use client";
import { useEffect, useRef, useState } from "react";
import gsap from "gsap";
import { ScrollTrigger } from "gsap/ScrollTrigger";
import VideoBackground from "../shared/VideoBackground";
import "./Showreel.scss";

if (typeof window !== "undefined") gsap.registerPlugin(ScrollTrigger);

// Main showreel — long-form landscape clip in the 16:9 canvas. Served from
// Cloudinary as an HTML5 mp4 (with f_auto / q_auto delivery transforms) so
// every browser gets the best codec it supports.
const HERO_VIDEO = "epigroww-global-website/home/showreel-hero";

// Vertical reels populating the floating-card marquee. HTML5 <video> is
// ~10× lighter than a YouTube iframe, so the full list of ten reels plays
// concurrently without saturating the main thread that drives the rAF
// marquee animation.
const STRIP = [
  { k: "WK 17", t: "Launch film · Beauty",   pid: "epigroww-global-website/home/reels/wk-17-launch-film-beauty" },
  { k: "WK 16", t: "TVC · Automotive",       pid: "epigroww-global-website/home/reels/wk-16-tvc-automotive" },
  { k: "WK 16", t: "UGC reel · F&B",         pid: "epigroww-global-website/home/reels/wk-16-ugc-reel-fnb" },
  { k: "WK 15", t: "CGI · Perfume",          pid: "epigroww-global-website/home/reels/wk-15-cgi-perfume" },
  { k: "WK 15", t: "Shopify launch",         pid: "epigroww-global-website/home/reels/wk-15-shopify-launch" },
  { k: "WK 14", t: "Performance reel",       pid: "epigroww-global-website/home/reels/wk-14-performance-reel" },
  { k: "WK 14", t: "Identity · Fashion",     pid: "epigroww-global-website/home/reels/wk-14-identity-fashion" },
  { k: "WK 13", t: "Influencer · D2C",       pid: "epigroww-global-website/home/reels/wk-13-influencer-d2c" },
  { k: "WK 13", t: "Brand film · Lifestyle", pid: "epigroww-global-website/home/reels/wk-13-brand-film-lifestyle" },
  { k: "WK 12", t: "Social reel · Beauty",   pid: "epigroww-global-website/home/reels/wk-12-social-reel-beauty" },
];

export default function Showreel() {
  const ref = useRef(null);
  const heroVideoRef = useRef(null);
  const trackRef = useRef(null);
  const [playing, setPlaying] = useState(true);

  useEffect(() => {
    const ctx = gsap.context(() => {
      gsap.fromTo(
        ".sr-canvas",
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
        ".sr-head-word",
        { yPercent: 110 },
        {
          yPercent: 0,
          duration: 1,
          ease: "power4.out",
          stagger: 0.05,
          scrollTrigger: { trigger: ".sr-head", start: "top 85%" },
        }
      );
      gsap.fromTo(
        ".sr-marquee",
        { opacity: 0, y: 40 },
        {
          opacity: 1,
          y: 0,
          duration: 1.1,
          ease: "power3.out",
          scrollTrigger: { trigger: ".sr-marquee", start: "top 92%" },
        }
      );

      // Infinite drift marquee — rAF-driven loop on the inner track. The
      // track is rendered with two copies of the strip back-to-back; we move
      // it from 0 → -halfWidth, then snap back for a seamless loop. Hover
      // smoothly eases the speed to 0 so cards become readable on dwell.
      const track = trackRef.current;
      if (track) {
        const setX = gsap.quickSetter(track, "x", "px");
        const state = { x: 0, mult: 1, half: 0 };
        const measure = () => { state.half = track.scrollWidth / 2; };
        measure();
        window.addEventListener("resize", measure);

        const speed = 0.55; // px / frame — premium drift
        let raf = 0;
        const tick = () => {
          state.x -= speed * state.mult;
          if (state.x <= -state.half) state.x += state.half;
          if (state.x > 0) state.x -= state.half;
          setX(state.x);
          raf = requestAnimationFrame(tick);
        };
        raf = requestAnimationFrame(tick);

        const onEnter = () => gsap.to(state, { mult: 0, duration: 0.6, ease: "power2.out" });
        const onLeave = () => gsap.to(state, { mult: 1, duration: 0.8, ease: "power2.out" });
        track.addEventListener("mouseenter", onEnter);
        track.addEventListener("mouseleave", onLeave);

        return () => {
          cancelAnimationFrame(raf);
          window.removeEventListener("resize", measure);
          track.removeEventListener("mouseenter", onEnter);
          track.removeEventListener("mouseleave", onLeave);
        };
      }
    }, ref);
    return () => ctx.revert();
  }, []);

  // Hero canvas is a native <video> now — toggle directly via HTMLMediaElement
  // methods. Muted is locked on, so play() is always allowed without a user
  // gesture.
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
    <section ref={ref} className="sr">
      <div className="sr-inner">
        <div className="sr-head">
          <span className="sr-label">
            <span className="sr-label-dot" />
            <span>— 01.5 / Showreel · Spring 2026</span>
          </span>
          <h2 className="sr-heading">
            <span className="word-wrap"><span className="sr-head-word">A</span></span>{" "}
            <span className="word-wrap"><span className="sr-head-word">week's</span></span>{" "}
            <span className="word-wrap"><span className="sr-head-word serif">output</span></span>
            <span className="word-wrap"><span className="sr-head-word">,</span></span>{" "}
            <span className="word-wrap"><span className="sr-head-word">cut</span></span>{" "}
            <span className="word-wrap"><span className="sr-head-word">into</span></span>{" "}
            <span className="word-wrap"><span className="sr-head-word">ninety</span></span>{" "}
            <span className="word-wrap"><span className="sr-head-word">seconds.</span></span>
          </h2>
        </div>

        <div className="sr-canvas">
          <VideoBackground
            publicId={HERO_VIDEO}
            orientation="horizontal"
            title="Epigroww Global — Showreel"
            onVideoReady={(el) => { heroVideoRef.current = el; }}
          />
          <div className="sr-canvas-tint" />

          <div className="sr-overlay">
            <div className="sr-overlay-top">
              <span className="sr-chip">
                <span className="sr-chip-dot" />
                Now playing
              </span>
              <span className="sr-chip">100+ creatives / week</span>
            </div>
            <div className="sr-overlay-bottom">
              <button
                type="button"
                className="sr-play"
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
              <div className="sr-info">
                <span className="sr-info-num">00:00 / 01:28</span>
                <span className="sr-info-sub">Made weekly · Q2 2026</span>
              </div>
            </div>
          </div>
        </div>

        <div className="sr-marquee" aria-label="Recent reels">
          <div className="sr-marquee-track" ref={trackRef}>
            {[...STRIP, ...STRIP].map((s, i) => (
              <figure
                key={i}
                className="sr-frame"
                style={{ "--i": i % STRIP.length }}
                data-cursor="view"
                data-cursor-label="View"
              >
                <div className="sr-frame-inner">
                  <VideoBackground
                    publicId={s.pid}
                    orientation="vertical"
                    title={`${s.k} — ${s.t}`}
                    rootMargin="200px"
                  />
                  <span className="sr-frame-shine" aria-hidden="true" />
                  <span className="sr-frame-badge">
                    <span className="sr-frame-badge-dot" />
                    Reel
                  </span>
                  <figcaption>
                    <span>{s.k}</span>
                    <span>{s.t}</span>
                  </figcaption>
                </div>
              </figure>
            ))}
          </div>
          <div className="sr-marquee-fade sr-marquee-fade-l" aria-hidden="true" />
          <div className="sr-marquee-fade sr-marquee-fade-r" aria-hidden="true" />
        </div>
      </div>
    </section>
  );
}
