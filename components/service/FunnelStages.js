"use client";
import { useEffect, useRef } from "react";
import gsap from "gsap";
import { ScrollTrigger } from "gsap/ScrollTrigger";
import "./FunnelStages.scss";

if (typeof window !== "undefined") gsap.registerPlugin(ScrollTrigger);

const STAGES = [
  {
    name: "Awareness",
    metric: "100%",
    body: "Hero films, performance creative, marketplace spots — everything tuned to the first cold view.",
    surfaces: ["Meta", "TikTok", "OTT", "Programmatic"],
  },
  {
    name: "Consideration",
    metric: "42%",
    body: "PDP storytelling, A+ pages, comparison modules and influencer reviews — built to earn the click, not chase it.",
    surfaces: ["PDP", "A+ content", "UGC", "Reviews"],
  },
  {
    name: "Purchase",
    metric: "18%",
    body: "One-page checkout, address intelligence, COD recovery, BNPL — engineered against drop-off, not for it.",
    surfaces: ["Checkout", "Razorpay", "Stripe", "BNPL"],
  },
  {
    name: "Retention",
    metric: "9%",
    body: "Email, SMS, WhatsApp, push, loyalty — second-purchase engines that out-earn your acquisition spend.",
    surfaces: ["Klaviyo", "WhatsApp", "Loyalty", "Win-back"],
  },
  {
    name: "Advocacy",
    metric: "3.2%",
    body: "Referral loops, UGC harvests, review flywheels — turning your second-order cohort into a third-party sales team.",
    surfaces: ["Referral", "Reviews", "UGC", "Affiliate"],
  },
];

export default function FunnelStages() {
  const ref = useRef(null);

  useEffect(() => {
    const ctx = gsap.context(() => {
      gsap.fromTo(
        ".fs-head-word",
        { yPercent: 110 },
        {
          yPercent: 0,
          duration: 1,
          ease: "power4.out",
          stagger: 0.05,
          scrollTrigger: { trigger: ".fs-head", start: "top 85%" },
        }
      );
      gsap.utils.toArray(".fs-stage-item").forEach((stage, i) => {
        gsap.fromTo(
          stage,
          { opacity: 0, x: -28 },
          {
            opacity: 1,
            x: 0,
            duration: 0.9,
            delay: i * 0.06,
            ease: "power3.out",
            scrollTrigger: { trigger: stage, start: "top 90%" },
          }
        );
      });
      gsap.utils.toArray(".fs-meter-fill").forEach((bar, i) => {
        gsap.fromTo(
          bar,
          { scaleX: 0 },
          {
            scaleX: 1,
            duration: 1.4,
            delay: i * 0.1,
            ease: "power3.out",
            scrollTrigger: { trigger: ".fs-chart", start: "top 80%" },
          }
        );
      });
      gsap.utils.toArray(".fs-meter-pct").forEach((el) => {
        const target = parseFloat(el.dataset.pct);
        const obj = { v: 0 };
        gsap.to(obj, {
          v: target,
          duration: 1.4,
          ease: "power3.out",
          scrollTrigger: { trigger: el, start: "top 90%" },
          onUpdate: () => {
            const v = obj.v;
            el.textContent = (Number.isInteger(target) ? Math.round(v) : v.toFixed(1)) + "%";
          },
        });
      });
    }, ref);
    return () => ctx.revert();
  }, []);

  // Drop-off between stages — value lost from the previous step.
  const drops = STAGES.map((s, i) => {
    if (i === 0) return null;
    const prev = parseFloat(STAGES[i - 1].metric);
    const cur = parseFloat(s.metric);
    const lost = prev - cur;
    const lostPct = (lost / prev) * 100;
    return { lost: lost.toFixed(1), lostPct: lostPct.toFixed(0) };
  });

  const top = parseFloat(STAGES[0].metric);
  const bottom = parseFloat(STAGES[STAGES.length - 1].metric);
  const total = ((bottom / top) * 100).toFixed(1);

  return (
    <section ref={ref} className="fs">
      <div className="fs-inner">
        <div className="fs-head">
          <span className="fs-label">
            <span className="fs-label-dot" />
            <span>— The funnel</span>
          </span>
          <h2 className="fs-heading">
            <span className="word-wrap"><span className="fs-head-word">Acquisition</span></span>{" "}
            <span className="word-wrap"><span className="fs-head-word">pays</span></span>{" "}
            <span className="word-wrap"><span className="fs-head-word">the</span></span>{" "}
            <span className="word-wrap"><span className="fs-head-word">first</span></span>{" "}
            <span className="word-wrap"><span className="fs-head-word">order.</span></span>{" "}
            <span className="word-wrap"><span className="fs-head-word serif">Retention</span></span>{" "}
            <span className="word-wrap"><span className="fs-head-word serif">pays</span></span>{" "}
            <span className="word-wrap"><span className="fs-head-word serif">the</span></span>{" "}
            <span className="word-wrap"><span className="fs-head-word serif">brand.</span></span>
          </h2>
          <p className="fs-intro">
            We engineer the entire customer journey, not just the first click. Every percentage point of lift in the lower stages compounds into the LTV line that pays for everything above it.
          </p>
        </div>

        <div className="fs-stage">
          <ol className="fs-list">
            {STAGES.map((s, i) => (
              <li key={s.name} className="fs-stage-item">
                <div className="fs-stage-head">
                  <span className="fs-stage-num">{String(i + 1).padStart(2, "0")}</span>
                  <span className="fs-stage-name">{s.name}</span>
                  <span className="fs-stage-metric">{s.metric}</span>
                </div>
                <p className="fs-stage-body">{s.body}</p>
                <ul className="fs-stage-surfaces">
                  {s.surfaces.map((sf) => <li key={sf}>{sf}</li>)}
                </ul>
              </li>
            ))}
          </ol>

          {/* RIGHT — premium funnel meter chart.
              Replaces the cramped trapezoid stack with a clean horizontal-bar
              dashboard: stage label, animated fill bar, percentage, and an
              inter-stage drop-off note. */}
          <aside className="fs-chart" aria-label="Funnel cohort">
            <div className="fs-chart-head">
              <div>
                <span className="fs-chart-eyebrow">Funnel · cohort</span>
                <h3 className="fs-chart-title">Conversion meter</h3>
              </div>
              <span className="fs-chart-period">Q1 / 2026</span>
            </div>

            <div className="fs-chart-summary">
              <div>
                <span className="fs-chart-summary-num">{total}%</span>
                <span className="fs-chart-summary-lab">Top → bottom retention</span>
              </div>
              <div className="fs-chart-summary-divider" />
              <div>
                <span className="fs-chart-summary-num">{STAGES.length}</span>
                <span className="fs-chart-summary-lab">Stages instrumented</span>
              </div>
            </div>

            <ul className="fs-meter">
              {STAGES.map((s, i) => {
                const pct = parseFloat(s.metric);
                return (
                  <li key={s.name} className="fs-meter-row" style={{ "--w": `${pct}%`, "--i": i }}>
                    <div className="fs-meter-head">
                      <span className="fs-meter-num">{String(i + 1).padStart(2, "0")}</span>
                      <span className="fs-meter-name">{s.name}</span>
                      <span className="fs-meter-pct" data-pct={pct}>0%</span>
                    </div>
                    <div className="fs-meter-track" aria-hidden="true">
                      <span className="fs-meter-fill" />
                    </div>
                    {drops[i] && (
                      <span className="fs-meter-drop">
                        <span className="fs-meter-drop-arrow">↓</span>
                        <span>−{drops[i].lostPct}% vs. prior stage</span>
                      </span>
                    )}
                  </li>
                );
              })}
            </ul>

            <div className="fs-chart-foot">
              <span>Acquisition → Advocacy</span>
              <span className="fs-chart-foot-pulse" />
              <span>Compounding cohort</span>
            </div>
          </aside>
        </div>
      </div>
    </section>
  );
}
