"use client";
import { useEffect, useRef, useState } from "react";
import gsap from "gsap";
import { ScrollTrigger } from "gsap/ScrollTrigger";
import "./GlobalFootprint.scss";

if (typeof window !== "undefined") gsap.registerPlugin(ScrollTrigger);

const CITIES = [
  {
    city: "New Delhi",
    country: "India",
    tz: "IST +05:30",
    role: "Global HQ · Media & Tech",
    x: 68.5, y: 40.5,
    time: "09:00",
    blurb: "Our growth engine room — performance, analytics, and the research lab.",
  },
  {
    city: "Mumbai",
    country: "India",
    tz: "IST +05:30",
    role: "Brand & Film Studio",
    x: 67, y: 45,
    time: "09:00",
    blurb: "Where the creative happens — writers, art directors, and our in-house film team.",
  },
  {
    city: "Dubai",
    country: "United Arab Emirates",
    tz: "GST +04:00",
    role: "MENA Growth Hub",
    x: 62, y: 44,
    time: "07:30",
    blurb: "Servicing brands across the Gulf — Arabic-native production and MENA media buys.",
  },
  {
    city: "Toronto",
    country: "Canada",
    tz: "EDT −04:00",
    role: "North America Studio",
    x: 25, y: 34,
    time: "23:30",
    blurb: "Our bridge to NA brands — account leads, performance creative, and new-market launches.",
  },
];

export default function GlobalFootprint() {
  const ref = useRef(null);
  const [active, setActive] = useState(0);

  useEffect(() => {
    const ctx = gsap.context(() => {
      gsap.fromTo(
        ".gf-head-word",
        { yPercent: 110 },
        {
          yPercent: 0,
          duration: 1,
          ease: "power4.out",
          stagger: 0.05,
          scrollTrigger: { trigger: ".gf-head", start: "top 80%" },
        }
      );

      gsap.fromTo(
        ".gf-map-dot",
        { scale: 0, opacity: 0 },
        {
          scale: 1,
          opacity: 1,
          duration: 0.75,
          ease: "back.out(1.6)",
          stagger: 0.12,
          scrollTrigger: { trigger: ".gf-map", start: "top 80%" },
        }
      );

      gsap.fromTo(
        ".gf-map-arc",
        { strokeDashoffset: 600 },
        {
          strokeDashoffset: 0,
          duration: 2.4,
          ease: "power3.out",
          scrollTrigger: { trigger: ".gf-map", start: "top 75%" },
        }
      );
    }, ref);
    return () => ctx.revert();
  }, []);

  return (
    <section ref={ref} className="gf">
      <div className="gf-inner">
        <div className="gf-head">
          <span className="gf-label">— 07 / Global footprint</span>
          <h2 className="gf-heading">
            <span className="word-wrap"><span className="gf-head-word">Four</span></span>{" "}
            <span className="word-wrap"><span className="gf-head-word">studios.</span></span>{" "}
            <span className="word-wrap"><span className="gf-head-word serif">One</span></span>{" "}
            <span className="word-wrap"><span className="gf-head-word serif">operating</span></span>{" "}
            <span className="word-wrap"><span className="gf-head-word serif">tempo.</span></span>
          </h2>
        </div>

        <div className="gf-stage">
          <div className="gf-map">
            <svg viewBox="0 0 100 60" preserveAspectRatio="xMidYMid meet" aria-hidden="true">
              <defs>
                <pattern id="dotgrid" x="0" y="0" width="1.2" height="1.2" patternUnits="userSpaceOnUse">
                  <circle cx="0.6" cy="0.6" r="0.15" fill="rgba(10,10,10,0.2)" />
                </pattern>
                <mask id="worldmask">
                  <rect width="100" height="60" fill="black" />
                  {/* Simplified world landmass suggestions */}
                  <ellipse cx="26" cy="32" rx="12" ry="9" fill="white" />
                  <ellipse cx="50" cy="42" rx="7" ry="11" fill="white" />
                  <ellipse cx="50" cy="28" rx="10" ry="6" fill="white" />
                  <ellipse cx="68" cy="36" rx="16" ry="10" fill="white" />
                  <ellipse cx="82" cy="46" rx="6" ry="4" fill="white" />
                </mask>
              </defs>
              <rect width="100" height="60" fill="url(#dotgrid)" mask="url(#worldmask)" />

              {/* Arcs connecting cities */}
              <path className="gf-map-arc" d="M 25 34 Q 46 22 68.5 40.5" />
              <path className="gf-map-arc" d="M 68.5 40.5 Q 65.5 40 67 45" />
              <path className="gf-map-arc" d="M 67 45 Q 64.5 44 62 44" />
              <path className="gf-map-arc" d="M 62 44 Q 42 22 25 34" />
            </svg>

            {CITIES.map((c, i) => (
              <button
                key={c.city}
                className={`gf-map-dot ${active === i ? "is-active" : ""}`}
                style={{ left: `${c.x}%`, top: `${c.y}%` }}
                onMouseEnter={() => setActive(i)}
                onClick={() => setActive(i)}
                data-cursor="hover"
                aria-label={c.city}
              >
                <span className="gf-dot-ring" />
                <span className="gf-dot-core" />
                <span className="gf-dot-label">
                  <span>{c.city}</span>
                  <span className="gf-dot-time">{c.time}</span>
                </span>
              </button>
            ))}
          </div>

          <div className="gf-detail">
            <div className="gf-detail-header">
              <span className="gf-detail-index">{String(active + 1).padStart(2, "0")} / 04</span>
              <span className="gf-detail-tz">{CITIES[active].tz}</span>
            </div>
            <h3 className="gf-detail-city">{CITIES[active].city}</h3>
            <p className="gf-detail-country">{CITIES[active].country}</p>
            <p className="gf-detail-role">{CITIES[active].role}</p>
            <p className="gf-detail-blurb">{CITIES[active].blurb}</p>
            <div className="gf-detail-list">
              {CITIES.map((c, i) => (
                <button
                  key={c.city}
                  className={`gf-detail-item ${active === i ? "is-active" : ""}`}
                  onMouseEnter={() => setActive(i)}
                  onClick={() => setActive(i)}
                  data-cursor="hover"
                >
                  <span>{String(i + 1).padStart(2, "0")}</span>
                  <span>{c.city}</span>
                  <span className="gf-detail-arrow">↗</span>
                </button>
              ))}
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}
