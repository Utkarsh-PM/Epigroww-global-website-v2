"use client";
import { useEffect, useRef } from "react";
import gsap from "gsap";
import { ScrollTrigger } from "gsap/ScrollTrigger";
import VideoBackground from "../shared/VideoBackground";
import "./CreativeReel.scss";

if (typeof window !== "undefined") gsap.registerPlugin(ScrollTrigger);

// Tile media is sourced first from Cloudinary public_ids that already exist
// (e.g. wk-14-performance-reel reuses raw-assets/BRAND 2/asmi final 02.mp4
// which is the same source as the home-page performance reel). Other
// brand-solutions public_ids were uploaded via
// scripts/upload-brand-commerce-assets.js.
//
// Each tile may carry:
//   - `videoPublicId` → autoplay vertical reel via <VideoBackground/>
//   - `imagePublicId` → Cloudinary image rendered with f_auto,q_auto crop
//   - `img`           → external/unsplash URL fallback
const CLOUDINARY = process.env.NEXT_PUBLIC_CLOUDINARY_CLOUD_NAME || "dsauqv4va";
const cldImg = (id, w = 1400) =>
  `https://res.cloudinary.com/${CLOUDINARY}/image/upload/f_auto,q_auto,c_fill,g_auto,w_${w}/${id}`;

const TILES = [
  { type: "PERFORMANCE", w: 1, h: 1, img: "https://images.unsplash.com/photo-1560250097-0b93528c311a?auto=format&fit=crop&w=900&q=80" },
  { type: "TVC FILM",    w: 2, h: 1, videoPublicId: "epigroww-global-website/brand-solutions/card-tvc", img: "https://images.unsplash.com/photo-1485846234645-a62644f84728?auto=format&fit=crop&w=1400&q=80" },
  { type: "PACKAGING",   w: 1, h: 1, imagePublicId: "epigroww-global-website/brand-solutions/card-packaging" },
  // CGI render slot has been retitled to UGC and now carries a UGC reel.
  // It already spans two rows (h:2) so it reads as a portrait-format
  // reel card without disturbing the grid math.
  { type: "UGC",         w: 1, h: 2, videoPublicId: "epigroww-global-website/home/reels/wk-13-influencer-d2c", img: "https://images.unsplash.com/photo-1559181567-c3190ca9959b?auto=format&fit=crop&w=900&q=80" },
  { type: "INFLUENCER",  w: 1, h: 1, videoPublicId: "epigroww-global-website/home/reels/wk-14-performance-reel", img: "https://images.unsplash.com/photo-1596462502278-27bfdc403348?auto=format&fit=crop&w=900&q=80" },
  { type: "SOCIAL",      w: 1, h: 1, imagePublicId: "epigroww-global-website/brand-solutions/card-social" },
  // Existing UGC tile on the right of the grid — bumped to h:2 so the
  // vertical reel reads as a phone-frame next to its sibling UGC tile.
  { type: "UGC",         w: 1, h: 2, videoPublicId: "epigroww-global-website/home/reels/wk-16-ugc-reel-fnb", img: "https://images.unsplash.com/photo-1516684732162-798a0062be99?auto=format&fit=crop&w=900&q=80" },
  { type: "IDENTITY",    w: 2, h: 1, imagePublicId: "epigroww-global-website/brand-solutions/card-identity" },
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
              {t.videoPublicId ? (
                <VideoBackground
                  publicId={t.videoPublicId}
                  orientation={t.h === 2 ? "vertical" : "horizontal"}
                  title={t.type}
                  rootMargin="400px"
                />
              ) : t.imagePublicId ? (
                <img src={cldImg(t.imagePublicId, t.w === 2 ? 1600 : 900)} alt={t.type} />
              ) : (
                <img src={t.img} alt={t.type} />
              )}
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
