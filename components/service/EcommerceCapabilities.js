"use client";
import { useEffect, useRef } from "react";
import gsap from "gsap";
import { ScrollTrigger } from "gsap/ScrollTrigger";
import "./EcommerceCapabilities.scss";

if (typeof window !== "undefined") gsap.registerPlugin(ScrollTrigger);

export default function EcommerceCapabilities({ title, accent, intro, items = [] }) {
  const ref = useRef(null);

  useEffect(() => {
    const ctx = gsap.context(() => {
      gsap.fromTo(
        ".ec-head-word",
        { yPercent: 110 },
        {
          yPercent: 0,
          duration: 1,
          ease: "power4.out",
          stagger: 0.05,
          scrollTrigger: { trigger: ".ec-head", start: "top 80%" },
        }
      );
      gsap.utils.toArray(".ec-card").forEach((card, i) => {
        gsap.fromTo(
          card,
          { y: 80, opacity: 0 },
          {
            y: 0,
            opacity: 1,
            duration: 1,
            delay: (i % 3) * 0.08,
            ease: "power3.out",
            scrollTrigger: { trigger: card, start: "top 92%" },
          }
        );
      });
    }, ref);
    return () => ctx.revert();
  }, []);

  const sku = (i) => `SKU-${String(1042 + i * 17).padStart(4, "0")}`;

  return (
    <section ref={ref} className="ec">
      <div className="ec-rail" aria-hidden="true" />
      <div className="ec-inner">
        <div className="ec-head">
          <span className="ec-label">
            <span className="ec-label-tick" />
            <span>In stock · Six capabilities</span>
          </span>
          <h2 className="ec-heading">
            {title.split(" ").map((w, i) => (
              <span key={i} className="word-wrap">
                <span className="ec-head-word">{w}</span>
              </span>
            ))}{" "}
            <span className="word-wrap">
              <span className="ec-head-word serif">{accent}</span>
            </span>
          </h2>
          {intro && <p className="ec-intro">{intro}</p>}
        </div>

        <div className="ec-shelf">
          {items.map((it, i) => (
            <article key={i} className="ec-card" data-cursor="hover">
              <div className="ec-card-shot">
                {it.image && <img src={it.image} alt="" loading="lazy" />}
                <div className="ec-card-shot-tint" />
                <span className="ec-card-tag">
                  <span className="ec-card-tag-hole" />
                  <span className="ec-card-tag-rule" />
                  <span className="ec-card-tag-text">{sku(i)}</span>
                </span>
                <span className="ec-card-glyph">{it.icon}</span>
              </div>

              <div className="ec-card-body">
                <div className="ec-card-meta">
                  <span className="ec-card-cat">Capability · {String(i + 1).padStart(2, "0")}</span>
                  <span className="ec-card-rating" aria-hidden="true">
                    <span>★</span><span>★</span><span>★</span><span>★</span><span>★</span>
                  </span>
                </div>

                <h3 className="ec-card-title">{it.title}</h3>
                <p className="ec-card-body-text">{it.body}</p>

                <div className="ec-card-barcode" aria-hidden="true">
                  <span className="ec-card-barcode-bars" />
                  <span className="ec-card-barcode-code">{sku(i).replace("SKU-", "")} · EG</span>
                </div>

                <div className="ec-card-chips-wrap">
                  <span className="ec-card-chips-label">Included</span>
                  <ul className="ec-card-chips">
                    {it.chips?.map((c) => <li key={c}>{c}</li>)}
                  </ul>
                </div>

                <div className="ec-card-foot">
                  <span className="ec-card-cta">
                    <span className="ec-card-cta-symbol">+</span>
                    Add to cart
                  </span>
                  <div className="ec-card-arrow">
                    <svg viewBox="0 0 24 24" width="14" height="14">
                      <path d="M6 18 L18 6 M10 6 L18 6 L18 14" fill="none" stroke="currentColor" strokeWidth="1.8" strokeLinecap="round" strokeLinejoin="round"/>
                    </svg>
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
