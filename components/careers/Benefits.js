"use client";
import { useEffect, useRef } from "react";
import gsap from "gsap";
import { ScrollTrigger } from "gsap/ScrollTrigger";
import "./Benefits.scss";

if (typeof window !== "undefined") gsap.registerPlugin(ScrollTrigger);

const BENEFITS = [
  { k: "01", t: "Fully paid health", d: "Medical, dental, vision — covered 100% for employees. Family cover at a deeply discounted rate.", icon: "✚" },
  { k: "02", t: "Mental health & wellness", d: "Annual wellness budget, therapy reimbursement, and a no-questions mental-health day policy.", icon: "◉" },
  { k: "03", t: "Flexible time off", d: "Take the time you need, when you need it — no minimums, no maximums, no awkward approvals.", icon: "∞" },
  { k: "04", t: "Paid company holidays", d: "National holidays off by default — plus four additional paid 'rest weeks' throughout the year.", icon: "✦" },
  { k: "05", t: "Annual team trip", d: "An all-expenses-paid retreat somewhere interesting. Past years: Udaipur, Da Nang, Tulum.", icon: "◇" },
  { k: "06", t: "Remote-first, always", d: "Work from anywhere in your time zone. Home-office setup stipend on day one.", icon: "⌂" },
  { k: "07", t: "Learning & growth", d: "Annual learning budget for courses, conferences, books — plus internal mobility across pods.", icon: "✎" },
  { k: "08", t: "Top-of-market equity", d: "Every full-time hire gets meaningful equity on a four-year vest with a one-year cliff.", icon: "◆" },
];

export default function Benefits() {
  const ref = useRef(null);

  useEffect(() => {
    const ctx = gsap.context(() => {
      gsap.utils.toArray(".bf-card").forEach((card, i) => {
        gsap.fromTo(card,
          { y: 40, opacity: 0 },
          {
            y: 0, opacity: 1,
            duration: 0.85,
            delay: (i % 4) * 0.06,
            ease: "power3.out",
            scrollTrigger: { trigger: card, start: "top 90%" },
          }
        );
      });
    }, ref);
    return () => ctx.revert();
  }, []);

  return (
    <section ref={ref} className="bf">
      <div className="bf-inner">
        <div className="bf-head">
          <span className="bf-label">— Perks & benefits</span>
          <h2 className="bf-heading">
            The real list.<br/>
            <span className="serif">No fine print.</span>
          </h2>
        </div>

        <div className="bf-grid">
          {BENEFITS.map((b) => (
            <article key={b.k} className="bf-card">
              <span className="bf-icon">{b.icon}</span>
              <span className="bf-num">{b.k}</span>
              <h3>{b.t}</h3>
              <p>{b.d}</p>
            </article>
          ))}
        </div>
      </div>
    </section>
  );
}
