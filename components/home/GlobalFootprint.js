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
    lat: 28.6139, lng: 77.2090,
    time: "09:00",
    blurb: "Our growth engine room — performance, analytics, and the research lab.",
  },
  {
    city: "Mumbai",
    country: "India",
    tz: "IST +05:30",
    role: "Brand & Film Studio",
    lat: 19.0760, lng: 72.8777,
    time: "09:00",
    blurb: "Where the creative happens — writers, art directors, and our in-house film team.",
  },
  {
    city: "Dubai",
    country: "United Arab Emirates",
    tz: "GST +04:00",
    role: "MENA Growth Hub",
    lat: 25.276987, lng: 55.296249,
    time: "07:30",
    blurb: "Servicing brands across the Gulf — Arabic-native production and MENA media buys.",
  },
  {
    city: "Toronto",
    country: "Canada",
    tz: "EDT −04:00",
    role: "North America Studio",
    lat: 43.6532, lng: -79.3832,
    time: "23:30",
    blurb: "Our bridge to NA brands — account leads, performance creative, and new-market launches.",
  },
];

export default function GlobalFootprint() {
  const ref = useRef(null);
  const [active, setActive] = useState(0);
  // Debounced "map city" — the right-side list highlights instantly, but the
  // map fade only commits once the cursor settles. Stops the opacity cross-
  // fade from re-triggering on every micro-hover between adjacent rows.
  const [mapCity, setMapCity] = useState(0);
  // Which city iframes have been mounted at least once. We keep them mounted
  // forever so the second visit to a city is instant (no Google Maps reload).
  const [loaded, setLoaded] = useState(() => new Set([0]));

  useEffect(() => {
    if (active === mapCity) return;
    const t = setTimeout(() => setMapCity(active), 220);
    return () => clearTimeout(t);
  }, [active, mapCity]);

  useEffect(() => {
    if (loaded.has(mapCity)) return;
    setLoaded((prev) => {
      const next = new Set(prev);
      next.add(mapCity);
      return next;
    });
  }, [mapCity, loaded]);

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
        ".gf-map",
        { opacity: 0, y: 30 },
        {
          opacity: 1,
          y: 0,
          duration: 1.1,
          ease: "power3.out",
          scrollTrigger: { trigger: ".gf-map", start: "top 85%" },
        }
      );
    }, ref);
    return () => ctx.revert();
  }, []);

  const current = CITIES[mapCity];

  return (
    <section ref={ref} className="gf">
      <div className="gf-inner">
        <div className="gf-head">
          <span className="gf-label">— 07 / Global footprint</span>
          <h2 className="gf-heading">
            <span className="word-wrap"><span className="gf-head-word">Four</span></span>{" "}
            <span className="word-wrap"><span className="gf-head-word">cities.</span></span>{" "}
            <span className="word-wrap"><span className="gf-head-word serif">One</span></span>{" "}
            <span className="word-wrap"><span className="gf-head-word serif">operating</span></span>{" "}
            <span className="word-wrap"><span className="gf-head-word serif">tempo.</span></span>
          </h2>
        </div>

        <div className="gf-stage">
          <div className="gf-map">
            <div className="gf-map-frame">
              {CITIES.map((c, i) => {
                if (!loaded.has(i)) return null;
                const src = `https://maps.google.com/maps?q=${c.lat},${c.lng}&z=10&output=embed`;
                return (
                  <iframe
                    key={c.city}
                    title={`Map of ${c.city}`}
                    src={src}
                    loading="lazy"
                    referrerPolicy="no-referrer-when-downgrade"
                    allowFullScreen
                    className={`gf-map-iframe ${mapCity === i ? "is-active" : ""}`}
                  />
                );
              })}
            </div>

            <div className="gf-map-overlay" aria-hidden="true">
              <span className="gf-map-pin">
                <span className="gf-map-pin-ring" />
                <span className="gf-map-pin-core" />
              </span>
            </div>

            <div className="gf-map-badge">
              <span className="gf-map-badge-dot" />
              <span className="gf-map-badge-city">{current.city}</span>
              <span className="gf-map-badge-time">{current.time} · {current.tz}</span>
            </div>
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
