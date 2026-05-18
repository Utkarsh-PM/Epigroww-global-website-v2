"use client";
import { useEffect, useRef } from "react";
import gsap from "gsap";
import { ScrollTrigger } from "gsap/ScrollTrigger";
import "./BrandMarquee.scss";

if (typeof window !== "undefined") gsap.registerPlugin(ScrollTrigger);

// Client brand logos. Public IDs live under
//   epigroww-global-website/home/brands/<slug>
// (uploaded by scripts/upload-brand-logos.js).
//
// `tone`           → drives theme-aware filtering so every logo stays visible
//                    in both dark and light mode without a background card:
//                      "color" → keep natural colours in both themes
//                      "dark"  → invert to white in dark mode, natural in light
//                      "white" → natural in dark mode, invert to black in light
//                    Tone was assigned per-brand based on pixel-luminance
//                    analysis of each source asset; see scripts/upload-brand-logos.js.
// `whiteBg: true`  → source asset has a solid white background; we strip it
//                    at delivery via Cloudinary `e_make_transparent`.
// `wide: true`     → allots a wider cell for unusually long wordmarks.
const BRANDS = [
  { slug: "times-group",                name: "Times Group",                tone: "dark",  whiteBg: true },
  { slug: "marico",                     name: "Marico",                     tone: "color" },
  { slug: "reliance-fresh-pik",         name: "Reliance Fresh Pik",         tone: "color", whiteBg: true, wide: true },
  { slug: "red-chief",                  name: "Red Chief",                  tone: "color" },
  { slug: "two-brothers-organic-farms", name: "Two Brothers Organic Farms", tone: "dark",  whiteBg: true, wide: true },
  { slug: "the-man-company",            name: "The Man Company",            tone: "white", wide: true },
  { slug: "brillare",                   name: "Brillare",                   tone: "dark",  wide: true },
  { slug: "beardo",                     name: "Beardo",                     tone: "white", wide: true },
  { slug: "just-herbs",                 name: "Just Herbs",                 tone: "dark",  whiteBg: true },
  { slug: "radio-mirchi",               name: "Radio Mirchi",               tone: "white", wide: true },
  { slug: "armaf",                      name: "Armaf",                      tone: "color" },
  { slug: "hira-fragrances",            name: "Hira Fragrances",            tone: "dark",  whiteBg: true },
  { slug: "the-pink-foundry",           name: "The Pink Foundry",           tone: "color" },
  { slug: "dream-beauty",               name: "Dream Beauty",               tone: "dark",  whiteBg: true },
  { slug: "ozone-ayurvedics",           name: "Ozone Ayurvedics",           tone: "dark",  wide: true },
  { slug: "rivona-naturals",            name: "Rivona Naturals",            tone: "dark",  wide: true },
  { slug: "rubys-organics",             name: "Ruby's Organics",            tone: "dark",  whiteBg: true, wide: true },
  { slug: "mitchell-usa",               name: "Mitchell USA",               tone: "dark",  whiteBg: true, wide: true },
  { slug: "namaste-india",              name: "Namaste India",              tone: "color", whiteBg: true },
  { slug: "juice-cosmetics",            name: "Juice Cosmetics",            tone: "color", wide: true },
  { slug: "bioderma",                   name: "Bioderma",                   tone: "color", wide: true },
  { slug: "blue-tribe-foods",           name: "Blue Tribe Foods",           tone: "color", whiteBg: true },
  { slug: "klaw-snacks",                name: "Klaw Snacks",                tone: "color", whiteBg: true },
  { slug: "kt-professional",            name: "KT Professional",            tone: "dark" },
  { slug: "himalaya-wellness",          name: "Himalaya Wellness",          tone: "color", wide: true },
  { slug: "reliance-trends",            name: "Reliance Trends",            tone: "white", wide: true },
];

const PUBLIC_ID_BASE = "epigroww-global-website/home/brands";

// Build a CDN URL with f_auto,q_auto + transparent-bg cleanup for white-bg
// source assets. We render at 2× the visible height to stay sharp on retina.
function brandLogoUrl(brand) {
  const publicId = `${PUBLIC_ID_BASE}/${brand.slug}`;
  const transforms = ["f_auto", "q_auto", "dpr_auto", "h_120", "c_fit"];
  if (brand.whiteBg) transforms.push("e_make_transparent:30");
  return `https://res.cloudinary.com/${process.env.NEXT_PUBLIC_CLOUDINARY_CLOUD_NAME || "dsauqv4va"}/image/upload/${transforms.join(",")}/${publicId}`;
}

export default function BrandMarquee() {
  const ref = useRef(null);
  const trackRef = useRef(null);

  useEffect(() => {
    const ctx = gsap.context(() => {
      gsap.fromTo(
        ".bm-head",
        { opacity: 0, y: 24 },
        {
          opacity: 1,
          y: 0,
          duration: 1,
          ease: "power3.out",
          scrollTrigger: { trigger: ref.current, start: "top 85%" },
        }
      );
      gsap.fromTo(
        ".bm-track",
        { opacity: 0 },
        {
          opacity: 1,
          duration: 1.2,
          ease: "power2.out",
          scrollTrigger: { trigger: ref.current, start: "top 85%" },
        }
      );

      const track = trackRef.current;
      if (!track) return;
      const setX = gsap.quickSetter(track, "x", "px");
      const state = { x: 0, mult: 1, half: 0 };
      const measure = () => { state.half = track.scrollWidth / 2; };
      measure();
      // Re-measure once images load so the seamless-loop math stays correct
      // (image widths aren't known until they decode).
      const imgs = track.querySelectorAll("img");
      let pending = imgs.length;
      const onImg = () => { if (--pending <= 0) measure(); };
      imgs.forEach((img) => {
        if (img.complete) onImg();
        else {
          img.addEventListener("load", onImg, { once: true });
          img.addEventListener("error", onImg, { once: true });
        }
      });
      window.addEventListener("resize", measure);

      const speed = 0.5;
      let raf = 0;
      const tick = () => {
        state.x -= speed * state.mult;
        if (state.x <= -state.half) state.x += state.half;
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
    }, ref);
    return () => ctx.revert();
  }, []);

  return (
    <section ref={ref} className="bm">
      <div className="bm-inner">
        <div className="bm-head">
          <span className="bm-dot" />
          <span className="bm-label">— 01.2 / Brands we engineer growth for</span>
          <span className="bm-count">500+ clients · 40+ industries</span>
        </div>

        <div className="bm-stage">
          <div className="bm-track" ref={trackRef}>
            {[...BRANDS, ...BRANDS].map((b, i) => (
              <span
                key={`${b.slug}-${i}`}
                className={`bm-logo bm-logo-tone-${b.tone || "color"}${b.wide ? " bm-logo-wide" : ""}`}
                aria-label={b.name}
              >
                <img
                  className="bm-logo-img"
                  src={brandLogoUrl(b)}
                  alt={b.name}
                  loading="lazy"
                  decoding="async"
                  draggable="false"
                />
              </span>
            ))}
          </div>
          <div className="bm-fade bm-fade-l" aria-hidden="true" />
          <div className="bm-fade bm-fade-r" aria-hidden="true" />
        </div>
      </div>
    </section>
  );
}
