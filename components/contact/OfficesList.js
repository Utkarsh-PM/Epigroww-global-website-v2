"use client";
import { useEffect, useRef } from "react";
import gsap from "gsap";
import { ScrollTrigger } from "gsap/ScrollTrigger";
import "./OfficesList.scss";

if (typeof window !== "undefined") gsap.registerPlugin(ScrollTrigger);

const DEFAULT_OFFICES = [
  { city: "New Delhi", country: "India", role: "Global HQ · Media & Tech", address: "Saket District Centre\nNew Delhi 110 017", tz: "IST +05:30", image: "https://images.unsplash.com/photo-1587474260584-136574528ed5?auto=format&fit=crop&w=1000&q=80" },
];

function mapOffices(rows) {
  if (!Array.isArray(rows) || rows.length === 0) return DEFAULT_OFFICES;
  return rows.map((o, i) => ({
    city: o.city || "",
    country: o.country || "",
    role: o.role || "",
    address: o.address || "",
    tz: o.tz || "",
    image: (o.image && o.image.url) || o.imageUrl || DEFAULT_OFFICES[i]?.image || "",
    directionsUrl: o.directionsUrl || "#",
  }));
}

export default function OfficesList({ data = {}, offices }) {
  const ref = useRef(null);
  const OFFICES = mapOffices(offices);
  const label = data.label || "— Four studios";
  const headPrefix = data.headingPrefix || "Where to find us";
  const headAccent = data.headingAccent || "in the flesh.";

  useEffect(() => {
    const ctx = gsap.context(() => {
      gsap.utils.toArray(".ol-card").forEach((card, i) => {
        gsap.fromTo(
          card,
          { y: 50, opacity: 0 },
          {
            y: 0, opacity: 1,
            duration: 0.95,
            delay: (i % 2) * 0.1,
            ease: "power3.out",
            scrollTrigger: { trigger: card, start: "top 88%" },
          }
        );
      });
    }, ref);
    return () => ctx.revert();
  }, []);

  return (
    <section ref={ref} className="ol">
      <div className="ol-inner">
        <div className="ol-head">
          <span className="ol-label">{label}</span>
          <h2 className="ol-heading">
            {headPrefix}<br/>
            <span className="serif">{headAccent}</span>
          </h2>
        </div>

        <div className="ol-grid">
          {OFFICES.map((o, i) => (
            <article key={o.city} className="ol-card">
              <div className="ol-card-img">
                <img src={o.image} alt={o.city} />
                <span className="ol-tz">{o.tz}</span>
              </div>
              <div className="ol-card-body">
                <div className="ol-card-head">
                  <h3>{o.city}</h3>
                  <span>{o.country}</span>
                </div>
                <div className="ol-role">{o.role}</div>
                <div className="ol-addr">{o.address}</div>
                <a href={o.directionsUrl} className="ol-dir" data-cursor="hover">
                  Get directions <span>↗</span>
                </a>
              </div>
            </article>
          ))}
        </div>
      </div>
    </section>
  );
}
