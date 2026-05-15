"use client";
import { useEffect, useRef } from "react";
import gsap from "gsap";
import "./LegalPage.scss";

export default function LegalPage({ eyebrow, kicker, title, intro, sections, lastUpdated }) {
  const ref = useRef(null);

  useEffect(() => {
    const ctx = gsap.context(() => {
      const tl = gsap.timeline({ delay: 0.15 });
      tl.fromTo(".lp-kicker > *", { opacity: 0, y: 10 }, { opacity: 1, y: 0, duration: 0.7, stagger: 0.06, ease: "power3.out" });
      tl.fromTo(".lp-title", { opacity: 0, y: 24 }, { opacity: 1, y: 0, duration: 1, ease: "power4.out" }, "-=0.4");
      tl.fromTo(".lp-intro", { opacity: 0, y: 16 }, { opacity: 1, y: 0, duration: 0.85, ease: "power3.out" }, "-=0.55");
      tl.fromTo(".lp-toc", { opacity: 0, y: 12 }, { opacity: 1, y: 0, duration: 0.7, ease: "power3.out" }, "-=0.5");
    }, ref);
    return () => ctx.revert();
  }, []);

  return (
    <section ref={ref} className="lp">
      <div className="lp-inner">
        <header className="lp-head">
          <div className="lp-kicker">
            <span><span className="dot" /> {kicker}</span>
            {lastUpdated ? <span>Last updated · {lastUpdated}</span> : null}
          </div>

          <h1 className="lp-title">
            {eyebrow ? <span className="lp-eyebrow">{eyebrow}</span> : null}
            <span className="lp-title-main">{title}</span>
          </h1>

          {intro ? <p className="lp-intro">{intro}</p> : null}

          {sections?.length > 1 ? (
            <nav className="lp-toc" aria-label="On this page">
              <span className="lp-toc-label">— On this page</span>
              <ol>
                {sections.map((s, i) => (
                  <li key={s.id}>
                    <a href={`#${s.id}`} data-cursor="hover">
                      <span className="lp-toc-num">{String(i + 1).padStart(2, "0")}</span>
                      <span className="lp-toc-text">{s.heading}</span>
                    </a>
                  </li>
                ))}
              </ol>
            </nav>
          ) : null}
        </header>

        <div className="lp-body">
          {sections.map((s, i) => (
            <article key={s.id} id={s.id} className="lp-section">
              <div className="lp-section-num">{String(i + 1).padStart(2, "0")}</div>
              <div className="lp-section-content">
                <h2 className="lp-section-heading">{s.heading}</h2>
                <div className="lp-section-prose">{s.body}</div>
              </div>
            </article>
          ))}
        </div>
      </div>
    </section>
  );
}
