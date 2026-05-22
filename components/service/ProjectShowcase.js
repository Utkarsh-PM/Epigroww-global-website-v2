"use client";
import React, { useRef, useEffect, useLayoutEffect } from "react";
import gsap from "gsap";
import { ScrollTrigger } from "gsap/ScrollTrigger";
import "./ProjectShowcase.scss";

if (typeof window !== "undefined") gsap.registerPlugin(ScrollTrigger);

// useLayoutEffect emits an SSR warning when the client component is rendered
// during the initial HTML pass. Swap to useEffect on the server to silence it
// while keeping the pre-paint measurement behaviour client-side.
const useIsoLayoutEffect = typeof window !== "undefined" ? useLayoutEffect : useEffect;

/* Pinned stacking-cards showcase.
   Section is pinned at the top of the viewport while the user scrolls.
   Each project card slides up from below and stacks on top of the previous,
   leaving a thin strip of the previous card visible. Driven by a single
   scrubbed gsap timeline — reverses cleanly on scroll-up, no hover state,
   no glitch.
   (Pattern adapted from the TapX features reference shared by the team.) */
export default function ProjectShowcase({
  label = "— Selected work",
  title = "Selected work,",
  accent = "shipped.",
  intro = "",
  projects = [],
}) {
  const sectionRef = useRef(null);
  const headerRef = useRef(null);
  const stageRef = useRef(null);
  const cardsRef = useRef([]);

  useIsoLayoutEffect(() => {
    if (typeof window === "undefined") return;

    // Defer setup until the parent route-change handlers (ScrollTrigger
    // cleanup, scroll-to-top, Lenis snap) have settled. Without this the
    // pinned ScrollTrigger occasionally measures a transient layout — the
    // pin-spacer never gets inserted and the stacked cards stay offscreen
    // (`yPercent: 100`) on the first navigation to the page. Refreshing
    // after the timeline is built guarantees a correct measurement.
    let cancelled = false;
    let ctx;
    let raf1 = 0;
    let raf2 = 0;
    let mountedRefreshTimer = 0;

    const setup = () => {
      if (cancelled) return;
      ctx = gsap.context(() => {
        const cards = cardsRef.current.filter(Boolean);
        if (!cards.length) return;

        const mm = gsap.matchMedia();

        mm.add("(min-width: 901px)", () => {
          const sectionH = sectionRef.current.offsetHeight;
          const headerH = headerRef.current.offsetHeight;
          const cardsContainerH = sectionH - headerH;

          const reservedForContent = 420;
          const maxOffset = Math.max(0, cardsContainerH - reservedForContent);
          const stripH = Math.max(
            50,
            Math.min(120, Math.floor(maxOffset / Math.max(1, cards.length - 1)))
          );

          sectionRef.current.style.setProperty("--ps-strip-h", `${stripH}px`);

          const centerY = (sectionH - headerH) / 2;
          gsap.set(headerRef.current, { y: centerY });
          cards.forEach((card) => gsap.set(card, { yPercent: 100 }));

          const tl = gsap.timeline({
            scrollTrigger: {
              trigger: sectionRef.current,
              start: "top top",
              end: () => `+=${cards.length * window.innerHeight * 0.8}`,
              pin: true,
              scrub: 1,
              pinSpacing: true,
              invalidateOnRefresh: true,
            },
          });

          tl.to(headerRef.current, { y: 0, duration: 1, ease: "none" }, 0);
          tl.to(cards[0], { yPercent: 0, duration: 1, ease: "none" }, 0);

          for (let i = 1; i < cards.length; i++) {
            tl.to(cards[i], {
              yPercent: 0,
              y: i * stripH,
              duration: 1,
              ease: "none",
            });
          }

          // Force a refresh now that the pin + timeline exist. The
          // ScrollTriggerCleanup that runs on route change ran its refresh
          // before our trigger was created, so without this the pin-spacer
          // is missing on first navigation and the cards never animate in.
          ScrollTrigger.refresh();
          // Once more on the next frame in case layout (fonts, images) is
          // still settling.
          mountedRefreshTimer = window.setTimeout(() => ScrollTrigger.refresh(), 300);

          return () => {
            gsap.set(headerRef.current, { clearProps: "all" });
            cards.forEach((c) => gsap.set(c, { clearProps: "all" }));
          };
        });
      }, sectionRef);
    };

    // Double-rAF so the deferred setup runs AFTER ScrollTriggerCleanup's own
    // double-rAF refresh has executed on route change.
    raf1 = requestAnimationFrame(() => {
      raf2 = requestAnimationFrame(setup);
    });

    return () => {
      cancelled = true;
      cancelAnimationFrame(raf1);
      cancelAnimationFrame(raf2);
      clearTimeout(mountedRefreshTimer);
      if (ctx) ctx.revert();
    };
  }, []);

  return (
    <section ref={sectionRef} className="ps">
      <div className="ps-inner">
        <header ref={headerRef} className="ps-head">
          <span className="ps-label">
            <span className="ps-label-dot" />
            <span>{label}</span>
          </span>
          <h2 className="ps-heading">
            {title.split(" ").map((w, i) => (
              <span key={i} className="word-wrap">
                <span className="ps-head-word">{w}</span>
              </span>
            ))}{" "}
            <span className="word-wrap"><span className="ps-head-word serif">{accent}</span></span>
          </h2>
          {intro && <p className="ps-intro">{intro}</p>}
        </header>

        <div ref={stageRef} className="ps-stage">
          {projects.map((p, i) => (
            <article
              key={i}
              ref={(el) => (cardsRef.current[i] = el)}
              className="ps-card"
              style={{ zIndex: i + 1 }}
            >
              <div className="ps-card-strip">
                <span className="ps-card-num">{String(i + 1).padStart(2, "0")}</span>
                <span className="ps-card-strip-line" />
                <h3 className="ps-card-name">{p.name}</h3>
                <span className="ps-card-tag">{p.tag || "Case study"}</span>
              </div>

              <div className="ps-card-body">
                <div className="ps-card-media">
                  <img src={p.image} alt={p.name} loading="lazy" />
                  <span className="ps-card-media-tint" aria-hidden="true" />
                  <span className="ps-card-year">{p.year || "2026"}</span>
                </div>

                <div className="ps-card-content">
                  <p className="ps-card-desc">{p.description}</p>
                  {p.stack && (
                    <ul className="ps-card-stack">
                      {p.stack.slice(0, 4).map((s) => <li key={s}>{s}</li>)}
                    </ul>
                  )}
                  <div className="ps-card-foot">
                    {p.metric && (
                      <div className="ps-card-metric">
                        <span className="ps-card-metric-num">{p.metric}</span>
                        <span className="ps-card-metric-lab">Outcome</span>
                      </div>
                    )}
                    <div className="ps-card-cta">
                      <span>Open case study</span>
                      <span className="ps-card-arrow">
                        <svg viewBox="0 0 24 24" width="14" height="14">
                          <path d="M6 18 L18 6 M10 6 L18 6 L18 14" fill="none" stroke="currentColor" strokeWidth="1.8"/>
                        </svg>
                      </span>
                    </div>
                  </div>
                </div>
              </div>
            </article>
          ))}
        </div>
      </div>
    </section>
  );
}
