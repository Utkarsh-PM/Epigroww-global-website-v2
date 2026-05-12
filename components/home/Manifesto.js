"use client";
import { useEffect, useRef } from "react";
import gsap from "gsap";
import { ScrollTrigger } from "gsap/ScrollTrigger";
import "./Manifesto.scss";

if (typeof window !== "undefined") gsap.registerPlugin(ScrollTrigger);

const DEFAULT_MANIFESTO = `We don't sell services. We engineer outcomes — pairing award-winning creative with performance data and tech that compounds. One team, four cities, endless specificity.`;

export default function Manifesto({ data = {} }) {
  const ref = useRef(null);
  const MANIFESTO = data.manifestoBody || DEFAULT_MANIFESTO;
  const label = data.manifestoLabel || "— 02 / Philosophy · Read · 18 sec";
  const author = data.manifestoAuthor || "— Danish Abbasi";
  const authorRole = data.manifestoAuthorRole || "Founder, Epigroww Global";
  // Some CMS labels combine two segments — split on ' · ' if present so we
  // can render the two-column label row that the existing UI expects.
  const labelParts = label.split(/\s+·\s+/);
  const labelLeft = labelParts[0];
  const labelRight = labelParts.slice(1).join(" · ");

  useEffect(() => {
    const el = ref.current;
    if (!el) return;
    const words = el.querySelectorAll(".mf-word");
    gsap.fromTo(
      words,
      { opacity: 0.12 },
      {
        opacity: 1,
        ease: "none",
        stagger: 0.04,
        scrollTrigger: {
          trigger: el,
          start: "top 75%",
          end: "top 15%",
          scrub: true,
        },
      }
    );
  }, []);

  return (
    <section ref={ref} className="manifesto">
      <div className="manifesto-inner">
        <div className="manifesto-top">
          <span className="manifesto-label">{labelLeft}</span>
          {labelRight && <span className="manifesto-label">{labelRight}</span>}
        </div>
        <p className="manifesto-text">
          {MANIFESTO.split(" ").map((w, i) => (
            <span key={i}>
              <span className="mf-word">{w}</span>
              {i < MANIFESTO.split(" ").length - 1 ? " " : ""}
            </span>
          ))}
        </p>
        <div className="manifesto-sign">
          <span>{author}</span>
          <span className="manifesto-role">{authorRole}</span>
        </div>
      </div>
    </section>
  );
}
