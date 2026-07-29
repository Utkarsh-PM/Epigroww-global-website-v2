"use client";
import { useEffect, useRef } from "react";
import gsap from "gsap";
import { ScrollTrigger } from "gsap/ScrollTrigger";
import { CASE_STUDIES } from "./caseStudiesData";
import "./CaseDossiers.scss";

if (typeof window !== "undefined") gsap.registerPlugin(ScrollTrigger);

export default function CaseDossiers() {
  const ref = useRef(null);

  useEffect(() => {
    const ctx = gsap.context(() => {
      const reduce = window.matchMedia("(prefers-reduced-motion: reduce)").matches;

      if (reduce) {
        gsap.set(".csd-plate-brand, .csd-reveal", {
          opacity: 1,
          y: 0,
          yPercent: 0,
        });
        return;
      }

      gsap.utils.toArray(".csd-case").forEach((el) => {
        const brand = el.querySelector(".csd-plate-brand");
        const blocks = el.querySelectorAll(".csd-reveal");

        const tl = gsap.timeline({
          scrollTrigger: { trigger: el, start: "top 72%" },
        });

        if (brand) {
          tl.fromTo(
            brand,
            { yPercent: 108 },
            { yPercent: 0, duration: 1.05, ease: "power4.out" }
          );
        }
        if (blocks.length) {
          tl.fromTo(
            blocks,
            { opacity: 0, y: 26 },
            {
              opacity: 1,
              y: 0,
              duration: 0.8,
              stagger: 0.075,
              ease: "power3.out",
            },
            "-=0.65"
          );
        }
      });
    }, ref);
    return () => ctx.revert();
  }, []);

  return (
    <div ref={ref} className="csd">
      {CASE_STUDIES.map((c, i) => (
        <article
          key={c.id}
          id={c.id}
          className={`csd-case ${i % 2 === 1 ? "is-alt" : ""}`}
        >
          <div className="csd-inner">
            <aside className="csd-plate">
              <div className="csd-plate-sticky">
                <span className="csd-plate-num">
                  <span className="csd-plate-num-cur">{c.num}</span>
                  <span className="csd-plate-num-sep">/</span>
                  <span className="csd-plate-num-tot">
                    {String(CASE_STUDIES.length).padStart(2, "0")}
                  </span>
                </span>

                <h2 className="csd-plate-head">
                  <span className="csd-plate-mask">
                    <span className="csd-plate-brand">{c.brand}</span>
                  </span>
                </h2>

                <dl className="csd-facts csd-reveal">
                  <div className="csd-fact">
                    <dt>Market</dt>
                    <dd>{c.market}</dd>
                  </div>
                  <div className="csd-fact">
                    <dt>Discipline</dt>
                    <dd>{c.discipline}</dd>
                  </div>
                  <div className="csd-fact">
                    <dt>Engagement</dt>
                    <dd>{c.engagement}</dd>
                  </div>
                  <div className="csd-fact">
                    <dt>Window</dt>
                    <dd>{c.window}</dd>
                  </div>
                </dl>

                <p className="csd-quote csd-reveal">{c.quote}</p>
              </div>
            </aside>

            <div className="csd-main">
              <section className="csd-block csd-reveal">
                <span className="csd-block-lab">The state we walked into</span>
                <p className="csd-challenge">{c.challenge}</p>
              </section>

              {c.metrics ? (
                <section className="csd-block csd-reveal">
                  <span className="csd-block-lab">Results</span>
                  <div className="csd-metrics">
                    {c.metrics.map((m, mi) => (
                      <div
                        key={m.label}
                        className={`csd-metric ${mi === 0 ? "is-lead" : ""}`}
                      >
                        <span className="csd-metric-n ticker-num">{m.value}</span>
                        <span className="csd-metric-l">{m.label}</span>
                      </div>
                    ))}
                  </div>
                </section>
              ) : null}

              {c.scope ? (
                <section className="csd-block csd-reveal">
                  <span className="csd-block-lab">Delivered</span>
                  <ul className="csd-scope">
                    {c.scope.map((s) => (
                      <li key={s}>{s}</li>
                    ))}
                  </ul>
                </section>
              ) : null}

              <section className="csd-block csd-reveal">
                <span className="csd-block-lab">Strategies implemented</span>
                <ol className="csd-plays">
                  {c.strategies.map((s, si) => (
                    <li key={s.title} className="csd-play">
                      <span className="csd-play-num">
                        {String(si + 1).padStart(2, "0")}
                      </span>
                      <div className="csd-play-body">
                        <h3 className="csd-play-title">{s.title}</h3>
                        <p className="csd-play-text">{s.body}</p>
                      </div>
                    </li>
                  ))}
                </ol>
              </section>
            </div>
          </div>
        </article>
      ))}
    </div>
  );
}
