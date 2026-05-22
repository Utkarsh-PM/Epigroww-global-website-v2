"use client";
import { useEffect, useRef } from "react";
import gsap from "gsap";
import { ScrollTrigger } from "gsap/ScrollTrigger";
import "./CommerceMarquee.scss";

if (typeof window !== "undefined") gsap.registerPlugin(ScrollTrigger);

// Commerce brand logos. Sourced from the raw-assets/COMMERCE/LOGOS pack —
// logos that already lived under epigroww-global-website/home/brands (juice
// cosmetics, mitchell USA) are reused from there; the rest were uploaded
// fresh under epigroww-global-website/ecommerce/brands/ via
// scripts/upload-brand-commerce-assets.js.
//
// `tone` drives theme-aware filtering (see home/BrandMarquee for the same rule):
//   "color" → keep natural colours in both themes
//   "dark"  → mark prints in dark on transparent; invert to white on dark
//             theme, keep natural on light
//   "white" → mark prints in white on transparent; natural on dark theme,
//             invert to black on light
//
// Tone was hand-picked by sampling the raw source PNGs (all already alpha-
// transparent, no white plate). Peter J and CFS are WHITE marks → must be
// "white" tone or they vanish against the cream light-theme background.
// `whiteBg` is intentionally omitted everywhere: the sources are already
// transparent, so `e_make_transparent` would only chew into the mark itself.
const BRANDS = [
  { publicId: "epigroww-global-website/ecommerce/brands/actiherbzz",   name: "ActiHerbz",        tone: "dark",  wide: true },
  { publicId: "epigroww-global-website/ecommerce/brands/cfs-perfumes", name: "CFS Perfumes",     tone: "white" },
  { publicId: "epigroww-global-website/ecommerce/brands/eze-perfumes", name: "Eze Perfumes",     tone: "dark",  wide: true },
  { publicId: "epigroww-global-website/ecommerce/brands/infinity",     name: "Infinity",         tone: "color", wide: true },
  { publicId: "epigroww-global-website/home/brands/juice-cosmetics",   name: "Juice Cosmetics",  tone: "color", wide: true },
  { publicId: "epigroww-global-website/home/brands/mitchell-usa",      name: "Mitchell USA",     tone: "dark",  whiteBg: true, wide: true },
  { publicId: "epigroww-global-website/ecommerce/brands/peter",        name: "Peter J",          tone: "white", wide: true },
  { publicId: "epigroww-global-website/ecommerce/brands/skinoivate",   name: "Skinovate",        tone: "color", wide: true },
  { publicId: "epigroww-global-website/ecommerce/brands/sunkey",       name: "Sunkey",           tone: "color", wide: true },
];

// Renders each logo at ~2× the visible max-height for crisp retina output,
// matching the home BrandMarquee pipeline. Extra steps:
//   - `e_make_transparent:30` strips the solid white backplate on the
//     commerce-pack sources so they composite cleanly against navy / cream.
//   - `e_trim:10` trims the residual padding around the visible mark so
//     every 1080×1080 source ends up at the same effective render height.
//     Without this, logos whose mark occupied a small portion of the canvas
//     (Peter J's signature, ActiHerbz wordmark, etc.) printed tiny while
//     edge-to-edge marks (Juice, Mitchell) printed full size — exactly the
//     "some logos bigger, some smaller" issue the user flagged.
function logoUrl(brand) {
  const t = ["f_auto", "q_auto", "dpr_auto"];
  if (brand.whiteBg) t.push("e_make_transparent:30");
  t.push("e_trim:10");
  t.push("h_180", "c_fit");
  return `https://res.cloudinary.com/${process.env.NEXT_PUBLIC_CLOUDINARY_CLOUD_NAME || "dsauqv4va"}/image/upload/${t.join(",")}/${brand.publicId}`;
}

export default function CommerceMarquee() {
  const ref = useRef(null);
  const trackRef = useRef(null);

  useEffect(() => {
    const ctx = gsap.context(() => {
      gsap.fromTo(".cm-head",
        { opacity: 0, y: 24 },
        { opacity: 1, y: 0, duration: 1, ease: "power3.out",
          scrollTrigger: { trigger: ref.current, start: "top 85%" } }
      );
      gsap.fromTo(".cm-track",
        { opacity: 0 },
        { opacity: 1, duration: 1.2, ease: "power2.out",
          scrollTrigger: { trigger: ref.current, start: "top 85%" } }
      );

      const track = trackRef.current;
      if (!track) return;
      const setX = gsap.quickSetter(track, "x", "px");
      const state = { x: 0, mult: 1, half: 0 };
      const measure = () => { state.half = track.scrollWidth / 2; };
      measure();
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

      const pxPerSec = 32;
      const MAX_DT = 1 / 30;
      let last = 0;
      let raf = 0;
      const tick = (now) => {
        if (!last) last = now;
        const dt = Math.min((now - last) / 1000, MAX_DT);
        last = now;
        state.x -= pxPerSec * dt * state.mult;
        if (state.half > 0 && state.x <= -state.half) state.x += state.half;
        setX(state.x);
        raf = requestAnimationFrame(tick);
      };
      raf = requestAnimationFrame(tick);

      const onVis = () => { last = 0; };
      document.addEventListener("visibilitychange", onVis);
      const onEnter = () => gsap.to(state, { mult: 0, duration: 0.6, ease: "power2.out" });
      const onLeave = () => gsap.to(state, { mult: 1, duration: 0.8, ease: "power2.out" });
      track.addEventListener("mouseenter", onEnter);
      track.addEventListener("mouseleave", onLeave);

      return () => {
        cancelAnimationFrame(raf);
        window.removeEventListener("resize", measure);
        document.removeEventListener("visibilitychange", onVis);
        track.removeEventListener("mouseenter", onEnter);
        track.removeEventListener("mouseleave", onLeave);
      };
    }, ref);
    return () => ctx.revert();
  }, []);

  return (
    <section ref={ref} className="cm">
      <div className="cm-inner">
        <div className="cm-head">
          <span className="cm-dot" />
          <span className="cm-label">— Commerce brands we operate</span>
          <span className="cm-count">Fragrance · Beauty · Personal care</span>
        </div>

        <div className="cm-stage">
          <div className="cm-track" ref={trackRef}>
            {[...BRANDS, ...BRANDS].map((b, i) => (
              <span
                key={`${b.publicId}-${i}`}
                className={`cm-logo cm-logo-tone-${b.tone || "color"}${b.wide ? " cm-logo-wide" : ""}`}
                aria-label={b.name}
              >
                <img
                  className="cm-logo-img"
                  src={logoUrl(b)}
                  alt={b.name}
                  loading="lazy"
                  decoding="async"
                  draggable="false"
                />
              </span>
            ))}
          </div>
          <div className="cm-fade cm-fade-l" aria-hidden="true" />
          <div className="cm-fade cm-fade-r" aria-hidden="true" />
        </div>
      </div>
    </section>
  );
}
