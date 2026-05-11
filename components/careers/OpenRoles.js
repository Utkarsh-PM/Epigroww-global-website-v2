"use client";
import { useEffect, useRef, useState } from "react";
import gsap from "gsap";
import { ScrollTrigger } from "gsap/ScrollTrigger";
import "./OpenRoles.scss";

if (typeof window !== "undefined") gsap.registerPlugin(ScrollTrigger);

const ROLES = [
  { dept: "Media", title: "Senior Performance Marketing Specialist", loc: "Delhi · Remote OK", type: "Full-time" },
  { dept: "Media", title: "Performance Marketing Specialist", loc: "Remote · India", type: "Full-time" },
  { dept: "Media", title: "Senior Account Manager", loc: "Mumbai", type: "Full-time" },
  { dept: "Media", title: "E-commerce Specialist", loc: "Delhi", type: "Full-time" },
  { dept: "Brand", title: "Senior Graphic Designer", loc: "Delhi", type: "Full-time" },
  { dept: "Brand", title: "Video Editor", loc: "Mumbai", type: "Full-time" },
  { dept: "Brand", title: "Video Editor", loc: "Delhi", type: "Full-time" },
  { dept: "Brand", title: "Brand Solutions Lead", loc: "Mumbai", type: "Full-time" },
  { dept: "Tech", title: "Full-stack Engineer (Next.js)", loc: "Remote · Global", type: "Full-time" },
  { dept: "Tech", title: "Shopify Developer", loc: "Remote · India", type: "Full-time" },
  { dept: "Operations", title: "Marketing Executive", loc: "Delhi", type: "Full-time" },
  { dept: "Operations", title: "People & Talent Partner", loc: "Remote · India", type: "Full-time" },
];

const DEPTS = ["All", "Media", "Brand", "Tech", "Operations"];

export default function OpenRoles() {
  const ref = useRef(null);
  const [filter, setFilter] = useState("All");

  useEffect(() => {
    const ctx = gsap.context(() => {
      gsap.utils.toArray(".or-row").forEach((row, i) => {
        gsap.fromTo(row,
          { x: -30, opacity: 0 },
          {
            x: 0, opacity: 1,
            duration: 0.8,
            delay: i * 0.04,
            ease: "power3.out",
            scrollTrigger: { trigger: row, start: "top 90%" },
          }
        );
      });
    }, ref);
    return () => ctx.revert();
  }, []);

  const filtered = filter === "All" ? ROLES : ROLES.filter((r) => r.dept === filter);

  return (
    <section ref={ref} className="or">
      <div className="or-inner">
        <div className="or-head">
          <div>
            <span className="or-label">— Open roles</span>
            <h2 className="or-heading">
              {ROLES.length} current openings.<br />
              <span className="serif">Find yours.</span>
            </h2>
          </div>
          <div className="or-filters">
            {DEPTS.map((d) => (
              <button
                key={d}
                className={`or-filter ${filter === d ? "is-active" : ""}`}
                onClick={() => setFilter(d)}
                data-cursor="hover"
              >
                {d}
                <span className="or-filter-count">
                  {d === "All" ? ROLES.length : ROLES.filter((r) => r.dept === d).length}
                </span>
              </button>
            ))}
          </div>
        </div>

        <div className="or-list">
          <div className="or-row or-row-head">
            <span>Dept.</span>
            <span>Role</span>
            <span>Location</span>
            <span>Type</span>
            <span></span>
          </div>
          {filtered.map((r, i) => (
            <a key={i} href="#apply" className="or-row" data-cursor="view" data-cursor-label="Apply">
              <span className="or-dept">{r.dept}</span>
              <span className="or-title">{r.title}</span>
              <span className="or-loc">{r.loc}</span>
              <span className="or-type">{r.type}</span>
              <span className="or-arrow">↗</span>
            </a>
          ))}
        </div>
      </div>
    </section>
  );
}
