"use client";
import { useEffect, useRef, useState } from "react";
import gsap from "gsap";
import { ScrollTrigger } from "gsap/ScrollTrigger";
import "./ContactFAQ.scss";

if (typeof window !== "undefined") gsap.registerPlugin(ScrollTrigger);

const DEFAULT_FAQS = [
  { q: "How long until I hear back?", a: "Serious briefs get a human reply within 24 hours." },
];

function mapFaqs(rows) {
  if (!Array.isArray(rows) || rows.length === 0) return DEFAULT_FAQS;
  return rows.map((f) => ({ q: f.question || "", a: f.answer || "" }));
}

export default function ContactFAQ({ data = {}, faqs }) {
  const ref = useRef(null);
  const [open, setOpen] = useState(0);
  const FAQS = mapFaqs(faqs);
  const label = data.label || "— Quick answers";
  const heading = data.heading || "Before you send the brief.";

  useEffect(() => {
    const ctx = gsap.context(() => {
      gsap.utils.toArray(".fq-item").forEach((el, i) => {
        gsap.fromTo(el,
          { opacity: 0, y: 20 },
          {
            opacity: 1, y: 0,
            duration: 0.8, delay: i * 0.05, ease: "power3.out",
            scrollTrigger: { trigger: el, start: "top 90%" },
          }
        );
      });
    }, ref);
    return () => ctx.revert();
  }, []);

  return (
    <section ref={ref} className="fq">
      <div className="fq-inner">
        <div className="fq-head">
          <span className="fq-label">{label}</span>
          <h2 className="fq-heading">{heading}</h2>
        </div>

        <div className="fq-list">
          {FAQS.map((f, i) => (
            <div
              key={i}
              className={`fq-item ${open === i ? "is-open" : ""}`}
              onClick={() => setOpen(open === i ? -1 : i)}
            >
              <div className="fq-q">
                <span className="fq-q-num">{String(i + 1).padStart(2, "0")}</span>
                <span className="fq-q-text">{f.q}</span>
                <span className="fq-q-arrow">{open === i ? "−" : "+"}</span>
              </div>
              <div className="fq-a">
                <p>{f.a}</p>
              </div>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
}
