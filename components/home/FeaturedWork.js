"use client";
import { useEffect, useRef } from "react";
import Link from "next/link";
import gsap from "gsap";
import { ScrollTrigger } from "gsap/ScrollTrigger";
import VideoBackground from "../shared/VideoBackground";
import "./FeaturedWork.scss";

if (typeof window !== "undefined") gsap.registerPlugin(ScrollTrigger);

const WORK = [
  {
    client: "JK Lifestyle",
    project: "Infinity — Fragrance launch",
    services: ["Brand", "Media", "Commerce"],
    outcome: "3.4× ROAS · 1.2M first-week views",
    videoPublicId: "epigroww-global-website/home/featured/featured-work-1",
    color: "#1e3a2f",
  },
  {
    client: "JCBL Group",
    project: "B2B stack modernization",
    services: ["Tech", "Automation"],
    outcome: "42% faster lead-to-quote cycle",
    image: "https://images.unsplash.com/photo-1518770660439-4636190af475?auto=format&fit=crop&w=1400&q=80",
    color: "#0a0a0a",
  },
  {
    client: "Cinegold",
    project: "OTT campaign & retention",
    services: ["Media", "CRM"],
    outcome: "+58% 30-day retention",
    image: "https://images.unsplash.com/photo-1598899134739-24c46f58b8c0?auto=format&fit=crop&w=1400&q=80",
    color: "#4a1c0f",
  },
  {
    client: "Private brand · Dubai",
    project: "Full-stack D2C launch",
    services: ["Brand", "Media", "Tech"],
    outcome: "$2.1M revenue in Q1",
    image: "https://images.unsplash.com/photo-1492691527719-9d1e07e534b4?auto=format&fit=crop&w=1400&q=80",
    color: "#2b1b3a",
  },
  {
    client: "FMCG / North America",
    project: "Performance creative engine",
    services: ["Creative", "Media"],
    outcome: "CAC down 37% in 90 days",
    image: "https://images.unsplash.com/photo-1542744173-8e7e53415bb0?auto=format&fit=crop&w=1400&q=80",
    color: "#102a43",
  },
];

export default function FeaturedWork() {
  const ref = useRef(null);
  const trackRef = useRef(null);
  const progressRef = useRef(null);
  const counterRef = useRef(null);

  useEffect(() => {
    const ctx = gsap.context(() => {
      const track = trackRef.current;
      if (!track) return;

      const distance = track.scrollWidth - window.innerWidth + 96;

      const tween = gsap.to(track, {
        x: () => -distance,
        ease: "none",
        scrollTrigger: {
          trigger: ref.current,
          start: "top top",
          end: () => `+=${distance + 200}`,
          pin: true,
          scrub: 1,
          anticipatePin: 1,
          invalidateOnRefresh: true,
          onUpdate: (self) => {
            if (progressRef.current) progressRef.current.style.transform = `scaleX(${self.progress})`;
            if (counterRef.current) {
              const idx = Math.min(Math.floor(self.progress * WORK.length), WORK.length - 1);
              counterRef.current.textContent = `${String(idx + 1).padStart(2, "0")} / ${String(WORK.length).padStart(2, "0")}`;
            }
          },
        },
      });

      gsap.fromTo(
        ".fw-head-word",
        { yPercent: 110 },
        {
          yPercent: 0,
          stagger: 0.06,
          duration: 1,
          ease: "power4.out",
          scrollTrigger: { trigger: ".fw-head", start: "top 80%" },
        }
      );

      return () => tween.kill();
    }, ref);
    return () => ctx.revert();
  }, []);

  return (
    <section ref={ref} className="fw">
      <div className="fw-layer">
        <div className="fw-head">
          <div className="fw-label-row">
            <span className="fw-label">— 05 / Featured work</span>
            <span ref={counterRef} className="fw-counter">01 / {String(WORK.length).padStart(2, "0")}</span>
          </div>
          <h2 className="fw-heading">
            <span className="word-wrap"><span className="fw-head-word">Work</span></span>{" "}
            <span className="word-wrap"><span className="fw-head-word">that</span></span>{" "}
            <span className="word-wrap"><span className="fw-head-word serif">moved</span></span>{" "}
            <span className="word-wrap"><span className="fw-head-word serif">the</span></span>{" "}
            <span className="word-wrap"><span className="fw-head-word serif">needle.</span></span>
          </h2>
          <Link href="/work" className="fw-viewall" data-cursor="hover">
            View all case studies <span>↗</span>
          </Link>
        </div>

        <div className="fw-viewport">
          <div ref={trackRef} className="fw-track">
            {WORK.map((w, i) => (
              <article
                key={i}
                className="fw-card"
                style={{ '--card-color': w.color }}
                data-cursor="view"
                data-cursor-label="Open"
              >
                <div className="fw-card-image">
                  {w.videoPublicId ? (
                    <VideoBackground
                      publicId={w.videoPublicId}
                      orientation="vertical"
                      title={`${w.client} — ${w.project}`}
                      rootMargin="400px"
                    />
                  ) : (
                    <img src={w.image} alt={w.project} />
                  )}
                  <div className="fw-card-tint" />
                </div>
                <div className="fw-card-head">
                  <span className="fw-client">{w.client}</span>
                  <span className="fw-num">{String(i + 1).padStart(2, '0')}</span>
                </div>
                <div className="fw-card-body">
                  <h3 className="fw-project">{w.project}</h3>
                  <div className="fw-row">
                    <ul className="fw-services">
                      {w.services.map((s) => <li key={s}>{s}</li>)}
                    </ul>
                    <span className="fw-outcome">{w.outcome}</span>
                  </div>
                </div>
              </article>
            ))}

            <div className="fw-endcard">
              <div>
                <div className="fw-end-caption">— End of reel</div>
                <h3 className="fw-end-heading">
                  See the<br/>
                  <span className="serif">full portfolio</span>
                </h3>
                <Link href="/work" className="fw-end-cta" data-cursor="hover">
                  Open the vault <span>↗</span>
                </Link>
              </div>
            </div>
          </div>
        </div>

        <div className="fw-progress">
          <div ref={progressRef} className="fw-progress-fill" />
        </div>
      </div>
    </section>
  );
}
