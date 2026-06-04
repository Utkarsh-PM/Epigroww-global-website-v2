"use client";
import { useEffect, useRef, useState } from "react";
import gsap from "gsap";
import { ScrollTrigger } from "gsap/ScrollTrigger";
import "./ContactFAQ.scss";

if (typeof window !== "undefined") gsap.registerPlugin(ScrollTrigger);

const FAQS = [
  { q: "How long until I hear back?", a: "Serious briefs get a human reply within 24 hours, usually within 4 working hours. We don't use auto-responders — every inbound is read by a partner." },
  { q: "Do you work with smaller brands?", a: "Yes, as long as the ambition is real. Our minimum retainer is $10K/month — below that, we refer you to specialists we trust." },
  { q: "Can we hire you for just one thing — media, or creative, or tech?", a: "Absolutely. Most new clients start with one pillar. The integration benefit shows up in months 3–6 when pods start collaborating." },
  { q: "Do you work internationally?", a: "Yes — with offices in Delhi, Mumbai, Dubai and Toronto, and three nationalities across the team. We run campaigns in English, Hindi, Arabic and French, and partner in-market when a brief needs another language." },
  { q: "What's your pricing model?", a: "Monthly retainers for ongoing work, scoped engagements for projects. We publish our rate card after the first discovery call — no mystery." },
  { q: "Do you share case studies?", a: "Named ones after a mutual NDA. You can see client logos, outcomes, and redacted case studies on /work — the juicy ones live in the deck." },
];

export default function ContactFAQ() {
  const ref = useRef(null);
  const [open, setOpen] = useState(0);

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
          <span className="fq-label">— Quick answers</span>
          <h2 className="fq-heading">Before you send the brief.</h2>
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
