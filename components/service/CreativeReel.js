"use client";
import { useEffect, useRef } from "react";
import gsap from "gsap";
import { ScrollTrigger } from "gsap/ScrollTrigger";
import "./CreativeReel.scss";

if (typeof window !== "undefined") gsap.registerPlugin(ScrollTrigger);

const TILES = [
  { type: "PERFORMANCE", w: 1, h: 1, img: "https://images.unsplash.com/photo-1560250097-0b93528c311a?auto=format&fit=crop&w=900&q=80" },
  { type: "TVC FILM", w: 2, h: 1, img: "https://images.unsplash.com/photo-1485846234645-a62644f84728?auto=format&fit=crop&w=1400&q=80" },
  { type: "PACKAGING", w: 1, h: 1, img: "https://images.unsplash.com/photo-1513885535751-8b9238bd345a?auto=format&fit=crop&w=900&q=80" },
  { type: "CGI RENDER", w: 1, h: 2, img: "https://images.unsplash.com/photo-1559181567-c3190ca9959b?auto=format&fit=crop&w=900&q=80" },
  { type: "INFLUENCER", w: 1, h: 1, img: "https://images.unsplash.com/photo-1596462502278-27bfdc403348?auto=format&fit=crop&w=900&q=80" },
  { type: "SOCIAL", w: 1, h: 1, img: "https://images.unsplash.com/photo-1611605698323-b1e99cfd37ea?auto=format&fit=crop&w=900&q=80" },
  { type: "UGC", w: 1, h: 1, img: "https://images.unsplash.com/photo-1516684732162-798a0062be99?auto=format&fit=crop&w=900&q=80" },
  { type: "IDENTITY", w: 2, h: 1, img: "https://images.unsplash.com/photo-1558655146-9f40138edfeb?auto=format&fit=crop&w=1400&q=80" },
];

export default function CreativeReel() {
  const ref = useRef(null);

  useEffect(() => {
    const ctx = gsap.context(() => {
      gsap.utils.toArray(".cr-tile").forEach((tile, i) => {
        gsap.fromTo(
          tile,
          { y: 80, opacity: 0, clipPath: "inset(100% 0 0 0)" },
          {
            y: 0,
            opacity: 1,
            clipPath: "inset(0% 0 0 0)",
            duration: 1.1,
            delay: (i % 4) * 0.08,
            ease: "power4.out",
            scrollTrigger: { trigger: tile, start: "top 90%" },
          }
        );
      });
    }, ref);
    return () => ctx.revert();
  }, []);

  return (
    <section ref={ref} className="cr">
      <div className="cr-inner">
        <div className="cr-head">
          <span className="cr-label">— Recent reel · 002</span>
          <h2 className="cr-heading">
            A week's output.<br/><span className="serif">Any given Monday.</span>
          </h2>
          <p className="cr-intro">
            A taste of what 100+ creative pieces a week looks like — static, motion, film, identity, packaging — all produced under one roof.
          </p>
        </div>

        <div className="cr-grid">
          {TILES.map((t, i) => (
            <div
              key={i}
              className={`cr-tile cr-w-${t.w} cr-h-${t.h}`}
              data-cursor="view"
              data-cursor-label="View"
            >
              <img src={t.img} alt={t.type} />
              <div className="cr-tile-meta">
                <span>{t.type}</span>
                <span>{String(i + 1).padStart(2, "0")}</span>
              </div>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
}
