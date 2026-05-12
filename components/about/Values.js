"use client";
import { useEffect, useRef, useState } from "react";
import gsap from "gsap";
import { ScrollTrigger } from "gsap/ScrollTrigger";
import "./Values.scss";

if (typeof window !== "undefined") gsap.registerPlugin(ScrollTrigger);

const DEFAULT_VALUES = [
  { k: "01", name: "Think Big", tag: "Ambition", body: "If the plan doesn't scare the CFO a little, it isn't the plan.", image: "https://images.unsplash.com/photo-1494891848038-7bd202a2afeb?auto=format&fit=crop&w=1400&q=80" },
  { k: "02", name: "Own It", tag: "Accountability", body: "There are no 'agency wins.'", image: "https://images.unsplash.com/photo-1552664730-d307ca884978?auto=format&fit=crop&w=1400&q=80" },
  { k: "03", name: "Pursue with Curiosity", tag: "Craft", body: "10% R&D budget. Always.", image: "https://images.unsplash.com/photo-1531403009284-440f080d1e12?auto=format&fit=crop&w=1400&q=80" },
  { k: "04", name: "Diversity & Inclusion", tag: "People", body: "Minority-founded and deliberately mixed.", image: "https://images.unsplash.com/photo-1529156069898-49953e39b3ac?auto=format&fit=crop&w=1400&q=80" },
  { k: "05", name: "Unity is Strength", tag: "Team", body: "Brand, media, and tech, one pod.", image: "https://images.unsplash.com/photo-1522071820081-009f0129c71c?auto=format&fit=crop&w=1400&q=80" },
];

function mapValues(rows) {
  if (!Array.isArray(rows) || rows.length === 0) return DEFAULT_VALUES;
  return rows.map((v, i) => ({
    k: v.num || String(i + 1).padStart(2, "0"),
    name: v.name || "",
    tag: v.tag || "",
    body: v.body || "",
    image: (v.image && v.image.url) || v.imageUrl || DEFAULT_VALUES[i]?.image || "",
  }));
}

const wordsOf = (s) => (s || "").split(/\s+/).filter(Boolean);

export default function Values({ data = {} }) {
  const ref = useRef(null);
  const [active, setActive] = useState(0);
  const VALUES = mapValues(data.items);
  const label = data.label || "— Values · five of them";
  const headPrefix = wordsOf(data.headingPrefix || "What we won't");
  const headAccent = data.headingAccent || "compromise on.";

  useEffect(() => {
    const ctx = gsap.context(() => {
      gsap.fromTo(
        ".v-head-word",
        { yPercent: 110 },
        {
          yPercent: 0,
          duration: 1,
          ease: "power4.out",
          stagger: 0.06,
          scrollTrigger: { trigger: ".v-head", start: "top 80%" },
        }
      );
    }, ref);
    return () => ctx.revert();
  }, []);

  return (
    <section ref={ref} className="v-sec">
      <div className="v-inner">
        <div className="v-head">
          <span className="v-label">{label}</span>
          <h2 className="v-heading">
            {headPrefix.map((w, i) => (
              <span key={`vp${i}`}>
                <span className="word-wrap"><span className="v-head-word">{w}</span></span>{" "}
              </span>
            ))}
            <span className="word-wrap"><span className="v-head-word serif">{headAccent}</span></span>
          </h2>
        </div>

        <div className="v-stage">
          <div className="v-media">
            {VALUES.map((v, i) => (
              <div key={i} className={`v-media-item ${active === i ? "is-active" : ""}`}>
                <img src={v.image} alt="" />
              </div>
            ))}
            <div className="v-media-caption">
              <span>{VALUES[active].tag}</span>
              <span>{String(active + 1).padStart(2, "0")} / {String(VALUES.length).padStart(2, "0")}</span>
            </div>
          </div>

          <ul className="v-list">
            {VALUES.map((v, i) => (
              <li
                key={v.k}
                className={`v-item ${active === i ? "is-active" : ""}`}
                onMouseEnter={() => setActive(i)}
                onClick={() => setActive(i)}
              >
                <div className="v-item-top">
                  <span className="v-item-num">{v.k}</span>
                  <span className="v-item-name">{v.name}</span>
                  <span className="v-item-tag">{v.tag}</span>
                </div>
                <div className="v-item-body">
                  <p>{v.body}</p>
                </div>
              </li>
            ))}
          </ul>
        </div>
      </div>
    </section>
  );
}
