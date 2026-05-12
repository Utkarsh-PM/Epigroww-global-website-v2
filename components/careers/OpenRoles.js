"use client";
import { useEffect, useRef, useState } from "react";
import gsap from "gsap";
import { ScrollTrigger } from "gsap/ScrollTrigger";
import "./OpenRoles.scss";

if (typeof window !== "undefined") gsap.registerPlugin(ScrollTrigger);

const DEFAULT_ROLES = [
  { dept: "Media", title: "Senior Performance Marketing Specialist", loc: "Delhi · Remote OK", type: "Full-time" },
];

const DEPTS = ["All", "Media", "Brand", "Tech", "Operations"];

function mapRoles(rows) {
  if (!Array.isArray(rows) || rows.length === 0) return DEFAULT_ROLES;
  return rows.map((r) => ({
    dept: r.dept || "Operations",
    title: r.title || "",
    loc: r.loc || "",
    type: r.type || "Full-time",
    applyUrl: r.applyUrl || "#apply",
  }));
}

export default function OpenRoles({ data = {}, roles }) {
  const ref = useRef(null);
  const [filter, setFilter] = useState("All");
  const ROLES = mapRoles(roles);
  const label = data.label || "— Open roles";
  const headPrefix = data.headingPrefix || `${ROLES.length} current openings.`;
  const headAccent = data.headingAccent || "Find yours.";

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
            <span className="or-label">{label}</span>
            <h2 className="or-heading">
              {headPrefix}<br />
              <span className="serif">{headAccent}</span>
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
            <a key={i} href={r.applyUrl || "#apply"} className="or-row" data-cursor="view" data-cursor-label="Apply">
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
