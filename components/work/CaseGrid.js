"use client";
import { useEffect, useRef, useState } from "react";
import gsap from "gsap";
import { ScrollTrigger } from "gsap/ScrollTrigger";
import VideoBackground from "../shared/VideoBackground";
import "./CaseGrid.scss";

if (typeof window !== "undefined") gsap.registerPlugin(ScrollTrigger);

const CASES = [
  {
    client: "JK Lifestyle — Infinity",
    tag: "Launch",
    category: "Brand",
    services: ["Brand identity", "Launch film", "Performance creatives"],
    outcome: "3.4× ROAS · 1.2M first-week views",
    year: "2025",
    videoPublicId: "epigroww-global-website/home/featured/featured-work-1",
    size: "lg",
  },
  {
    client: "Cinegold — OTT",
    tag: "Retention",
    category: "Media",
    services: ["OTT campaigns", "Lifecycle CRM"],
    outcome: "+58% 30-day retention",
    year: "2025",
    image: "https://images.unsplash.com/photo-1598899134739-24c46f58b8c0?auto=format&fit=crop&w=1400&q=80",
    size: "md",
  },
  {
    client: "JCBL Group — Tractors",
    tag: "Brand film",
    category: "Tech",
    services: ["TVC production", "Sales automation"],
    outcome: "42% faster lead-to-quote",
    year: "2024",
    videoPublicId: "epigroww-global-website/brand-solutions/card-tvc",
    size: "md",
  },
  {
    client: "Aurelle — Dubai D2C",
    tag: "D2C launch",
    category: "Media",
    services: ["Shopify Plus", "Full-stack media"],
    outcome: "$2.1M revenue · 90 days",
    year: "2025",
    videoPublicId: "epigroww-global-website/home/featured/featured-work-2",
    size: "md",
  },
  {
    client: "Belmar — North America FMCG",
    tag: "Creative engine",
    category: "Brand",
    services: ["Performance creative", "UGC"],
    outcome: "CAC down 37% · 90 days",
    year: "2024",
    image: "https://res.cloudinary.com/dsauqv4va/image/upload/f_auto,q_auto,w_1400/epigroww-global-website/home/featured/featured-work-4",
    size: "lg",
  },
  {
    client: "Northcrest — BFSI India",
    tag: "Paid performance",
    category: "Media",
    services: ["Google PMax", "Meta retargeting"],
    outcome: "2× leads · 35% lower CPL",
    year: "2025",
    videoPublicId: "epigroww-global-website/home/reels/wk-15-shopify-launch",
    size: "md",
  },
  {
    client: "Mira Bites — MENA F&B",
    tag: "Loyalty",
    category: "Tech",
    services: ["WhatsApp API", "Klaviyo flows"],
    outcome: "+28% repeat orders",
    year: "2024",
    videoPublicId: "epigroww-global-website/home/reels/wk-16-ugc-reel-fnb",
    size: "md",
  },
  {
    client: "EdTech — Global",
    tag: "Rebrand + platform",
    category: "Brand",
    services: ["Identity", "Web rebuild"],
    outcome: "4× organic traffic in 6 mo",
    year: "2024",
    image: "https://images.unsplash.com/photo-1522202176988-66273c2fd55f?auto=format&fit=crop&w=1400&q=80",
    size: "md",
  },
  {
    client: "Fintech — SaaS",
    tag: "AI assistant",
    category: "Tech",
    services: ["LLM support bot", "Evals framework"],
    outcome: "65% deflection rate",
    year: "2025",
    image: "https://images.unsplash.com/photo-1551288049-bebda4e38f71?auto=format&fit=crop&w=1400&q=80",
    size: "lg",
  },
];

const CATS = ["All", "Brand", "Media", "Tech"];

export default function CaseGrid() {
  const ref = useRef(null);
  const [cat, setCat] = useState("All");

  useEffect(() => {
    const ctx = gsap.context(() => {
      gsap.utils.toArray(".cg-case").forEach((el, i) => {
        gsap.fromTo(el,
          { y: 60, opacity: 0, clipPath: "inset(20% 0 20% 0)" },
          {
            y: 0, opacity: 1,
            clipPath: "inset(0% 0 0% 0)",
            duration: 1.1,
            delay: (i % 3) * 0.08,
            ease: "power4.out",
            scrollTrigger: { trigger: el, start: "top 88%" },
          }
        );
      });
    }, ref);
    return () => ctx.revert();
  }, [cat]);

  const shown = cat === "All" ? CASES : CASES.filter((c) => c.category === cat);

  return (
    <section ref={ref} className="w-cases">
      <div className="w-cases-inner">
        <div className="w-cases-head">
          <span className="w-cases-label">— Selected work</span>
          <div className="w-cases-filters">
            {CATS.map((c) => (
              <button
                key={c}
                className={`w-filter ${cat === c ? "is-active" : ""}`}
                onClick={() => setCat(c)}
                data-cursor="hover"
              >
                {c}
                <span className="w-filter-count">
                  {c === "All" ? CASES.length : CASES.filter((x) => x.category === c).length}
                </span>
              </button>
            ))}
          </div>
        </div>

        <div className="w-cases-grid">
          {shown.map((c, i) => (
            <article
              key={i}
              className={`cg-case cg-case-${c.size}`}
              data-cursor="view"
              data-cursor-label="Case"
            >
              <div className="cg-case-img">
                {c.videoPublicId ? (
                  <VideoBackground
                    publicId={c.videoPublicId}
                    orientation="horizontal"
                    title={c.client}
                    rootMargin="400px"
                  />
                ) : (
                  <img src={c.image} alt={c.client} />
                )}
                <span className="cg-case-year">{c.year}</span>
                <span className="cg-case-cat">{c.category}</span>
              </div>
              <div className="cg-case-body">
                <div className="cg-case-top">
                  <span className="cg-case-tag">{c.tag}</span>
                  <span className="cg-case-num">{String(i + 1).padStart(2, "0")}</span>
                </div>
                <h3 className="cg-case-client">{c.client}</h3>
                <div className="cg-case-foot">
                  <ul className="cg-case-services">
                    {c.services.map((s) => <li key={s}>{s}</li>)}
                  </ul>
                  <span className="cg-case-outcome">{c.outcome}</span>
                </div>
              </div>
            </article>
          ))}
        </div>
      </div>
    </section>
  );
}
