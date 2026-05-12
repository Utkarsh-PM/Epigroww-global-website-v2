"use client";
import { useEffect, useRef } from "react";
import gsap from "gsap";
import { ScrollTrigger } from "gsap/ScrollTrigger";
import "./LifeAt.scss";

if (typeof window !== "undefined") gsap.registerPlugin(ScrollTrigger);

const DEFAULT_GALLERY = [
  { img: "https://images.unsplash.com/photo-1522202176988-66273c2fd55f?auto=format&fit=crop&w=1200&q=80", cap: "Mumbai studio · Creative room", w: 2 },
  { img: "https://images.unsplash.com/photo-1542744173-8e7e53415bb0?auto=format&fit=crop&w=900&q=80", cap: "Wednesday team sync", w: 1 },
  { img: "https://images.unsplash.com/photo-1517245386807-bb43f82c33c4?auto=format&fit=crop&w=900&q=80", cap: "Delhi HQ — Growth floor", w: 1 },
  { img: "https://images.unsplash.com/photo-1519389950473-47ba0277781c?auto=format&fit=crop&w=1200&q=80", cap: "Engineering pod, Toronto", w: 2 },
  { img: "https://images.unsplash.com/photo-1517245386807-bb43f82c33c4?auto=format&fit=crop&w=900&q=80", cap: "Annual offsite · Udaipur", w: 1 },
  { img: "https://images.unsplash.com/photo-1556761175-5973dc0f32e7?auto=format&fit=crop&w=900&q=80", cap: "Dubai — MENA team", w: 1 },
];

function mapGallery(rows) {
  if (!Array.isArray(rows) || rows.length === 0) return DEFAULT_GALLERY;
  return rows.map((g, i) => ({
    img: (g.image && g.image.url) || g.imageUrl || DEFAULT_GALLERY[i]?.img || "",
    cap: g.caption || "",
    w: g.wide ? 2 : 1,
  })).filter((g) => g.img);
}

export default function LifeAt({ data = {} }) {
  const ref = useRef(null);
  const GALLERY = mapGallery(data.gallery);
  const label = data.label || "— Life at Epigroww";
  const headPrefix = data.headingPrefix || "Four cities. One";
  const headAccent = data.headingAccent || "operating tempo.";
  const intro = data.intro || "We're remote-first but not remote-only.";

  useEffect(() => {
    const ctx = gsap.context(() => {
      gsap.utils.toArray(".la-tile").forEach((tile, i) => {
        gsap.fromTo(tile,
          { y: 50, opacity: 0 },
          {
            y: 0, opacity: 1,
            duration: 1,
            delay: (i % 3) * 0.08,
            ease: "power3.out",
            scrollTrigger: { trigger: tile, start: "top 88%" },
          }
        );
      });
    }, ref);
    return () => ctx.revert();
  }, []);

  return (
    <section ref={ref} className="la">
      <div className="la-inner">
        <div className="la-head">
          <span className="la-label">{label}</span>
          <h2 className="la-heading">
            {headPrefix}<br />
            <span className="serif">{headAccent}</span>
          </h2>
          <p className="la-intro">{intro}</p>
        </div>

        <div className="la-grid">
          {GALLERY.map((g, i) => (
            <figure key={i} className={`la-tile la-w-${g.w}`}>
              <img src={g.img} alt={g.cap} />
              <figcaption>{g.cap}</figcaption>
            </figure>
          ))}
        </div>
      </div>
    </section>
  );
}
