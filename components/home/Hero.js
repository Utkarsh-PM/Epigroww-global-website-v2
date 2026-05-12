"use client";
import { useEffect, useRef } from "react";
import Link from "next/link";
import gsap from "gsap";
import { ScrollTrigger } from "gsap/ScrollTrigger";
import ParticleField from "../hero/ParticleField";
import "./Hero.scss";

if (typeof window !== "undefined") gsap.registerPlugin(ScrollTrigger);

const wordArray = (s) => (s || "").split(/\s+/).filter(Boolean);

export default function Hero({ data = {} }) {
  const rootRef = useRef(null);
  const topline = data.heroTopline || "Integrated growth since 2021";
  const eyebrowNum = data.heroEyebrowNum || "(01)";
  const eyebrowText = data.heroEyebrowText || "Media · Brand · Tech — unified";
  const lineA = wordArray(data.headlinePrefix || "We engineer");
  const accent = data.headlineAccent || "growth";
  const suffixWords = wordArray(data.headlineSuffix || "that compounds across four continents.");
  const lineB = suffixWords.slice(0, 2);
  const lineC = suffixWords.slice(2);
  const blurb =
    data.heroBlurb ||
    "An integrated growth partner sitting at the intersection of brand, media, and technology. 500+ clients, 40+ industries — delivered from Delhi, Mumbai, Dubai & Toronto.";
  const stats = (data.heroStats && data.heroStats.length ? data.heroStats : [
    { num: "300+", label: "Campaigns in 12 months" },
    { num: "500+", label: "Brands trust us" },
    { num: "4", label: "Studios worldwide" },
  ]);
  const film = data.heroFilm || {};
  const filmVideo = film.videoUrl || "https://videos.pexels.com/video-files/853889/853889-hd_1920_1080_25fps.mp4";
  const filmPoster = (film.poster && film.poster.url) || "https://images.unsplash.com/photo-1551288049-bebda4e38f71?auto=format&fit=crop&w=1200&q=70";
  const filmBadge = film.badge || "LIVE · Mumbai studio";
  const ctaPrimary = data.ctaPrimary || { label: "Learn more", href: "/work" };
  const ctaGhost = data.ctaGhost || { label: "Hire us", href: "/contact" };

  useEffect(() => {
    const ctx = gsap.context(() => {
      const tl = gsap.timeline({ delay: 0.25 });

      tl.fromTo(".hero-pre", { opacity: 0, y: 30 }, { opacity: 1, y: 0, duration: 1, ease: "power3.out" });
      tl.fromTo(".hero-line-a-word", { yPercent: 110 }, { yPercent: 0, duration: 1.1, ease: "power4.out", stagger: 0.06 }, "-=0.7");
      tl.fromTo(".hero-line-b-word", { yPercent: 110 }, { yPercent: 0, duration: 1.1, ease: "power4.out", stagger: 0.05 }, "-=0.95");
      tl.fromTo(".hero-line-c-word", { yPercent: 110 }, { yPercent: 0, duration: 1.1, ease: "power4.out", stagger: 0.04 }, "-=0.95");
      tl.fromTo(".hero-side", { opacity: 0, y: 20 }, { opacity: 1, y: 0, duration: 0.9, stagger: 0.08, ease: "power3.out" }, "-=0.6");
      tl.fromTo(".hero-cta", { opacity: 0, y: 20, scale: 0.92 }, { opacity: 1, y: 0, scale: 1, duration: 0.8, ease: "back.out(1.4)" }, "-=0.45");
      tl.fromTo(".hero-orb", { scale: 0, opacity: 0 }, { scale: 1, opacity: 1, duration: 1.3, ease: "expo.out" }, "-=0.8");

      gsap.to(".hero-orb", { y: -12, duration: 3.5, yoyo: true, repeat: -1, ease: "sine.inOut" });

      gsap.to(".hero-headline", {
        yPercent: -14,
        opacity: 0.2,
        ease: "none",
        scrollTrigger: {
          trigger: rootRef.current,
          start: "top top",
          end: "bottom top",
          scrub: 1.2,
        },
      });
    }, rootRef);

    return () => ctx.revert();
  }, []);

  return (
    <section ref={rootRef} className="hero">
      <ParticleField className="hero-particles" />

      <div className="hero-film" aria-hidden="true">
        <video
          className="hero-film-video"
          autoPlay
          loop
          muted
          playsInline
          preload="auto"
          poster={filmPoster}
        >
          <source src={filmVideo} type="video/mp4" />
        </video>
        <div className="hero-film-tint" />
        <div className="hero-film-meta">
          <span className="hero-film-dot" />
          <span>{filmBadge}</span>
        </div>
      </div>

      <div className="hero-inner">
        <div className="hero-topline hero-side">
          <span className="dot" /> <span>{topline}</span>
        </div>

        <div className="hero-pre">
          <span className="eyebrow">
            <span className="eyebrow-num">{eyebrowNum}</span> {eyebrowText}
          </span>
        </div>

        <h1 className="hero-headline">
          <span className="hero-line hero-line-a">
            {lineA.map((w, i) => (
              <span key={`a${i}`} className="word-wrap">
                <span className="hero-line-a-word word">{w}</span>
              </span>
            ))}
          </span>
          <span className="hero-line hero-line-b">
            <span className="word-wrap">
              <span className="hero-line-b-word word hero-accent">{accent}</span>
            </span>
            {lineB.map((w, i) => (
              <span key={`b${i}`} className="word-wrap">
                <span className="hero-line-b-word word">{w}</span>
              </span>
            ))}
          </span>
          <span className="hero-line hero-line-c">
            {lineC.map((w, i) => (
              <span key={`c${i}`} className="word-wrap">
                <span className="hero-line-c-word word">{w}</span>
              </span>
            ))}
          </span>
        </h1>

        <div className="hero-footer">
          <div className="hero-side hero-blurb">
            <p>{blurb}</p>
          </div>

          <div className="hero-side hero-meta">
            {stats.map((s, i) => (
              <div className="meta-block" key={i}>
                <span className="meta-num">{s.num}</span>
                <span className="meta-label">{s.label}</span>
              </div>
            ))}
          </div>

          <div className="hero-cta-row">
            <Link href={ctaPrimary.href || "/work"} className="btn-primary btn-shine" data-cursor="hover">
              <span>{ctaPrimary.label || "Learn more"}</span>
            </Link>
            <Link href={ctaGhost.href || "/contact"} className="btn-ghost btn-shine hero-cta" data-cursor="hover">
              <span>{ctaGhost.label || "Hire us"}</span>
            </Link>
          </div>
        </div>

        <div className="hero-orb" aria-hidden="true">
          <div className="orb-inner">
            <span className="orb-tag">Scroll</span>
            <span className="orb-sub">to explore</span>
          </div>
          <svg viewBox="0 0 100 100" className="orb-rot">
            <defs>
              <path id="circ" d="M50 50 m-40 0 a40 40 0 1 1 80 0 a40 40 0 1 1 -80 0" />
            </defs>
            <text>
              <textPath href="#circ">
                EPIGROWW GLOBAL · EPIGROWW GLOBAL ·
              </textPath>
            </text>
          </svg>
        </div>
      </div>
    </section>
  );
}
