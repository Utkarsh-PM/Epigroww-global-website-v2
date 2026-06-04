"use client";
import { useEffect, useRef } from "react";
import gsap from "gsap";
import { ScrollTrigger } from "gsap/ScrollTrigger";
import "./OfficesList.scss";

if (typeof window !== "undefined") gsap.registerPlugin(ScrollTrigger);

const OFFICES = [
  {
    city: "New Delhi",
    country: "India",
    role: "Global HQ · Media & Tech",
    address: "Saket District Centre\nNew Delhi 110 017",
    tz: "IST +05:30",
    image: "https://images.unsplash.com/photo-1587474260584-136574528ed5?auto=format&fit=crop&w=1000&q=80",
  },
  {
    city: "Mumbai",
    country: "India",
    role: "Brand & Film Studio",
    address: "Andheri West\nMumbai 400 053",
    tz: "IST +05:30",
    image: "https://images.unsplash.com/photo-1570168007204-dfb528c6958f?auto=format&fit=crop&w=1000&q=80",
  },
  {
    city: "Dubai",
    country: "UAE",
    role: "MENA Growth Hub",
    address: "Business Bay\nDubai, U.A.E.",
    tz: "GST +04:00",
    image: "https://images.unsplash.com/photo-1518684079-3c830dcef090?auto=format&fit=crop&w=1000&q=80",
  },
  {
    city: "Toronto",
    country: "Canada",
    role: "North America Studio",
    address: "King Street West\nToronto M5V",
    tz: "EDT −04:00",
    image: "https://images.unsplash.com/photo-1517090504586-fde19ea6066f?auto=format&fit=crop&w=1000&q=80",
  },
];

export default function OfficesList() {
  const ref = useRef(null);

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
          <span className="ol-label">— Four cities</span>
          <h2 className="ol-heading">
            Where to find us<br/>
            <span className="serif">in the flesh.</span>
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
                <a href="#" className="ol-dir" data-cursor="hover">
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
