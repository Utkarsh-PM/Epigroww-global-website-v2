"use client";
import { useEffect, useRef, useState } from "react";
import gsap from "gsap";
import { ScrollTrigger } from "gsap/ScrollTrigger";
import "./LivePulse.scss";

if (typeof window !== "undefined") gsap.registerPlugin(ScrollTrigger);

// Metric seeds — autoincrement at realistic rates so they feel live
const DEFAULT_METRICS = [
  { k: "imp", label: "Impressions served · today", seed: 14_820_430, perSec: 182, format: (n) => n.toLocaleString(), unit: "" },
  { k: "rev", label: "Revenue tracked · today", seed: 2_412_800, perSec: 36.5, format: (n) => "$" + Math.round(n).toLocaleString(), unit: "" },
  { k: "creatives", label: "Creatives in production · now", seed: 47, perSec: 0.015, format: (n) => Math.floor(n).toLocaleString(), unit: "" },
  { k: "clicks", label: "Clicks routed · last hour", seed: 128_340, perSec: 9.4, format: (n) => Math.round(n).toLocaleString(), unit: "" },
  { k: "cac", label: "Avg. CAC reduction · YTD", seed: 37, perSec: 0, format: (n) => Math.round(n).toString(), unit: "%" },
];

const DEFAULT_FEED = [
  { t: "IST 14:32", txt: "JK Lifestyle · Infinity — ad set scaled 40% ↑" },
  { t: "GST 12:58", txt: "MENA retainer — new creative batch shipped (12)" },
  { t: "IST 14:29", txt: "Cinegold OTT — retention flow A+ winner locked" },
  { t: "EDT 04:58", txt: "Toronto pod — Shopify Plus deploy, zero downtime" },
  { t: "IST 14:24", txt: "D2C beauty — ROAS threshold crossed (3.8×)" },
  { t: "IST 14:19", txt: "FMCG NA — 8 performance cut-downs queued" },
];

// CMS stores `format` as a string select; map back to a formatter function
const FORMATTERS = {
  number: (n) => Math.round(n).toLocaleString(),
  usd: (n) => "$" + Math.round(n).toLocaleString(),
  percent: (n) => Math.round(n).toString(),
};

const mapMetrics = (rows) => {
  if (!Array.isArray(rows) || rows.length === 0) return DEFAULT_METRICS;
  return rows.map((m) => ({
    k: m.key || "",
    label: m.label || "",
    seed: Number(m.seed) || 0,
    perSec: Number(m.perSec) || 0,
    unit: m.unit || "",
    format: FORMATTERS[m.format] || FORMATTERS.number,
  }));
};

const mapFeed = (rows) => {
  if (!Array.isArray(rows) || rows.length === 0) return DEFAULT_FEED;
  return rows.map((f) => ({ t: f.timeTag || "", txt: f.text || "" }));
};

const wordsOf = (s) => (s || "").split(/\s+/).filter(Boolean);

export default function LivePulse({ data = {} }) {
  const ref = useRef(null);
  const METRICS = mapMetrics(data.lpMetrics);
  const FEED = mapFeed(data.lpFeed);
  const label = data.lpLabel || "— 04 / What's happening right now";
  const liveBadge = data.lpLiveBadge || "LIVE · Q2 2026";
  const headPrefix = wordsOf(data.lpHeadingPrefix || "Numbers that");
  const headAccent = data.lpHeadingAccent || "tick";
  const headSuffix = wordsOf(data.lpHeadingSuffix || "while you're reading.");
  const [values, setValues] = useState(METRICS.map((m) => m.seed));

  useEffect(() => {
    const ctx = gsap.context(() => {
      gsap.fromTo(
        ".lp-head-word",
        { yPercent: 110 },
        {
          yPercent: 0,
          duration: 1,
          ease: "power4.out",
          stagger: 0.05,
          scrollTrigger: { trigger: ".lp-head", start: "top 80%" },
        }
      );
      gsap.fromTo(
        ".lp-card",
        { y: 40, opacity: 0 },
        {
          y: 0,
          opacity: 1,
          duration: 0.9,
          stagger: 0.08,
          ease: "power3.out",
          scrollTrigger: { trigger: ".lp-grid", start: "top 80%" },
        }
      );
    }, ref);

    const iv = setInterval(() => {
      setValues((prev) =>
        prev.map((v, i) => {
          const m = METRICS[i];
          // add a small randomized tick per second
          const tick = m.perSec * (0.6 + Math.random() * 0.8);
          return v + tick;
        })
      );
    }, 1000);

    return () => {
      ctx.revert();
      clearInterval(iv);
    };
  }, []);

  return (
    <section ref={ref} className="lp">
      <div className="lp-inner">
        <div className="lp-head">
          <div className="lp-head-top">
            <span className="lp-live">
              <span className="lp-live-dot" />
              {liveBadge}
            </span>
            <span className="lp-label">{label}</span>
          </div>
          <h2 className="lp-heading">
            {headPrefix.map((w, i) => (
              <span key={`lp${i}`}>
                <span className="word-wrap"><span className="lp-head-word">{w}</span></span>{" "}
              </span>
            ))}
            <span className="word-wrap"><span className="lp-head-word serif">{headAccent}</span></span>{" "}
            {headSuffix.map((w, i) => (
              <span key={`ls${i}`}>
                <span className="word-wrap"><span className="lp-head-word">{w}</span></span>{i < headSuffix.length - 1 ? " " : ""}
              </span>
            ))}
          </h2>
        </div>

        <div className="lp-grid">
          {METRICS.map((m, i) => (
            <div key={m.k} className={`lp-card lp-card-${m.k}`}>
              <div className="lp-card-top">
                <span className="lp-card-dot" />
                <span>Tracking</span>
              </div>
              <div className="lp-card-num">
                <span>{m.format(values[i])}</span>
                {m.unit && <span className="lp-card-unit">{m.unit}</span>}
              </div>
              <div className="lp-card-label">{m.label}</div>
              <div className="lp-card-spark">
                <Spark live={m.perSec > 0} />
              </div>
            </div>
          ))}
        </div>

        <div className="lp-feed">
          <div className="lp-feed-head">
            <span className="lp-live">
              <span className="lp-live-dot" />
              Activity feed
            </span>
            <span className="lp-feed-meta">Last updated · just now</span>
          </div>
          <ul>
            {FEED.map((f, i) => (
              <li key={i} className="lp-feed-item">
                <span className="lp-feed-time">{f.t}</span>
                <span className="lp-feed-dot" />
                <span className="lp-feed-txt">{f.txt}</span>
              </li>
            ))}
          </ul>
        </div>
      </div>
    </section>
  );
}

function Spark({ live }) {
  // Empty on first paint (server + first client render); randomize only after mount
  // so SSR and client markup match.
  const [points, setPoints] = useState("");
  useEffect(() => {
    setPoints(generate());
    if (!live) return;
    const iv = setInterval(() => setPoints(generate()), 1500);
    return () => clearInterval(iv);
  }, [live]);

  return (
    <svg viewBox="0 0 100 24" preserveAspectRatio="none" aria-hidden="true">
      <polyline
        points={points}
        fill="none"
        stroke="currentColor"
        strokeWidth="1.2"
        strokeLinecap="round"
        strokeLinejoin="round"
      />
    </svg>
  );
}

function generate() {
  const count = 24;
  return Array.from({ length: count }, (_, i) => {
    const x = (i / (count - 1)) * 100;
    const y = 6 + Math.random() * 12;
    return `${x.toFixed(2)},${y.toFixed(2)}`;
  }).join(" ");
}
