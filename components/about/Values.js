"use client";
import { useEffect, useRef, useState } from "react";
import gsap from "gsap";
import { ScrollTrigger } from "gsap/ScrollTrigger";
import "./Values.scss";

if (typeof window !== "undefined") gsap.registerPlugin(ScrollTrigger);

const VALUES = [
  {
    k: "01",
    name: "Think Big",
    tag: "Ambition",
    body: "If the plan doesn't scare the CFO a little, it isn't the plan. We choose uncomfortable growth goals and then make them inevitable.",
    image: "https://images.unsplash.com/photo-1494891848038-7bd202a2afeb?auto=format&fit=crop&w=1400&q=80",
  },
  {
    k: "02",
    name: "Own It",
    tag: "Accountability",
    body: "There are no 'agency wins.' Every campaign is co-signed by the team that built it — and un-signed by no one when it breaks.",
    image: "https://images.unsplash.com/photo-1552664730-d307ca884978?auto=format&fit=crop&w=1400&q=80",
  },
  {
    k: "03",
    name: "Pursue with Curiosity",
    tag: "Craft",
    body: "We keep a standing 10% time budget for R&D — new channels, new AI tools, new creative formats. Last year's playbook is this year's floor.",
    image: "https://images.unsplash.com/photo-1531403009284-440f080d1e12?auto=format&fit=crop&w=1400&q=80",
  },
  {
    k: "04",
    name: "Diversity & Inclusion",
    tag: "People",
    body: "Minority-founded and deliberately mixed — by nationality, craft, and perspective. We ship better work because our rooms disagree well.",
    image: "https://images.unsplash.com/photo-1529156069898-49953e39b3ac?auto=format&fit=crop&w=1400&q=80",
  },
  {
    k: "05",
    name: "Unity is Strength",
    tag: "Team",
    body: "Brand, media, and tech don't live on different floors here. The pod that launches your campaign is the same one that built the landing page.",
    image: "https://images.unsplash.com/photo-1522071820081-009f0129c71c?auto=format&fit=crop&w=1400&q=80",
  },
];

export default function Values() {
  const ref = useRef(null);
  const [active, setActive] = useState(0);

  useEffect(() => {
    const ctx = gsap.context(() => {
      gsap.fromTo(
        ".v-head-word",
        { yPercent: 110 },
        {
          yPercent: 0,
          duration: 1,
          ease: "power4.out",
          stagger: 0.06,
          scrollTrigger: { trigger: ".v-head", start: "top 80%" },
        }
      );
    }, ref);
    return () => ctx.revert();
  }, []);

  return (
    <section ref={ref} className="v-sec">
      <div className="v-inner">
        <div className="v-head">
          <span className="v-label">— Values · five of them</span>
          <h2 className="v-heading">
            <span className="word-wrap"><span className="v-head-word">What we</span></span>{" "}
            <span className="word-wrap"><span className="v-head-word">won't</span></span>{" "}
            <span className="word-wrap"><span className="v-head-word serif">compromise</span></span>{" "}
            <span className="word-wrap"><span className="v-head-word">on.</span></span>
          </h2>
        </div>

        <div className="v-stage">
          <div className="v-media">
            {VALUES.map((v, i) => (
              <div key={i} className={`v-media-item ${active === i ? "is-active" : ""}`}>
                <img src={v.image} alt="" />
              </div>
            ))}
            <div className="v-media-caption">
              <span>{VALUES[active].tag}</span>
              <span>{String(active + 1).padStart(2, "0")} / {String(VALUES.length).padStart(2, "0")}</span>
            </div>
          </div>

          <ul className="v-list">
            {VALUES.map((v, i) => (
              <li
                key={v.k}
                className={`v-item ${active === i ? "is-active" : ""}`}
                onMouseEnter={() => setActive(i)}
                onClick={() => setActive(i)}
              >
                <div className="v-item-top">
                  <span className="v-item-num">{v.k}</span>
                  <span className="v-item-name">{v.name}</span>
                  <span className="v-item-tag">{v.tag}</span>
                </div>
                <div className="v-item-body">
                  <p>{v.body}</p>
                </div>
              </li>
            ))}
          </ul>
        </div>
      </div>
    </section>
  );
}
