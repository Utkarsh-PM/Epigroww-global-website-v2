"use client";
import { useEffect, useRef } from "react";
import gsap from "gsap";
import { ScrollTrigger } from "gsap/ScrollTrigger";
import "./Team.scss";

if (typeof window !== "undefined") gsap.registerPlugin(ScrollTrigger);

// Image URLs are placeholders cycling through the original Unsplash set — the
// names and roles are the source of truth from the client; real headshots will
// replace `image` once provided. The `city` field is intentionally optional;
// the chip in the card image only renders when set.
const PLACEHOLDER_M1 = "https://images.unsplash.com/photo-1560250097-0b93528c311a?auto=format&fit=crop&w=800&q=80";
const PLACEHOLDER_M2 = "https://images.unsplash.com/photo-1507003211169-0a1dd7228f2d?auto=format&fit=crop&w=800&q=80";
const PLACEHOLDER_M3 = "https://images.unsplash.com/photo-1519085360753-af0119f7cbe7?auto=format&fit=crop&w=800&q=80";
const PLACEHOLDER_F1 = "https://images.unsplash.com/photo-1573496359142-b8d87734a5a2?auto=format&fit=crop&w=800&q=80";

const TEAM = [
  { name: "Danish Abbasi",       role: "Founder",                                  image: PLACEHOLDER_M1 },
  { name: "Avi Madan Sharma",    role: "Group Head · Media Solutions",             image: PLACEHOLDER_M2 },
  { name: "Sandeep Arora",       role: "Ecommerce Director",                       image: PLACEHOLDER_M3 },
  { name: "Gauri Malhotra",      role: "Group Account Manager · Brand Solutions",  image: PLACEHOLDER_F1 },
  { name: "Tanush Puri",         role: "Senior Business Manager",                  image: PLACEHOLDER_M1 },
  { name: "Abhishek Passi",      role: "Creative Manager · Brand Solutions",       image: PLACEHOLDER_M2 },
  { name: "Abhishek Rajvanshi",  role: "Creative Manager · Brand Solutions",       image: PLACEHOLDER_M3 },
  { name: "Akshay Wadhwa",       role: "Creative Manager · Brand Solutions",       image: PLACEHOLDER_M1 },
  { name: "Utkarsh Chandna",     role: "Product Manager · Technology Solutions",   image: PLACEHOLDER_M2 },
  { name: "Vishal Kumar",        role: "Senior Creative Lead · Brand Solutions",   image: PLACEHOLDER_M3 },
  { name: "Arkalal Chakravarty", role: "Software Engineer · Technology Solutions", image: PLACEHOLDER_M1 },
  { name: "Anuj Khirwar",        role: "Group Account Manager · Brand Solutions",  image: PLACEHOLDER_M2 },
];

export default function Team() {
  const ref = useRef(null);

  useEffect(() => {
    const ctx = gsap.context(() => {
      gsap.utils.toArray(".tm-card").forEach((card, i) => {
        gsap.fromTo(
          card,
          { y: 50, opacity: 0 },
          {
            y: 0,
            opacity: 1,
            duration: 0.95,
            delay: (i % 3) * 0.08,
            ease: "power3.out",
            scrollTrigger: { trigger: card, start: "top 85%" },
          }
        );
      });
    }, ref);
    return () => ctx.revert();
  }, []);

  return (
    <section ref={ref} className="tm">
      <div className="tm-inner">
        <div className="tm-head">
          <div>
            <span className="tm-label">— The people</span>
            <h2 className="tm-heading">
              People at <span className="serif">Epigroww.</span>
            </h2>
          </div>
          <p className="tm-intro">
            100+ specialists across four cities. Designers, performance marketers, film-makers, engineers, analysts — who sit on the same Slack channel and care about the same spreadsheet.
          </p>
        </div>

        <div className="tm-grid">
          {TEAM.map((t, i) => (
            <article key={i} className="tm-card" data-cursor="hover">
              <div className="tm-card-img">
                <img src={t.image} alt={t.name} />
                {t.city && <span className="tm-city">{t.city}</span>}
              </div>
              <div className="tm-card-body">
                <h3 className="tm-name">{t.name}</h3>
                <span className="tm-role">{t.role}</span>
              </div>
            </article>
          ))}

          <article className="tm-card tm-card-end">
            <div className="tm-end-number">+ 94</div>
            <div className="tm-end-body">
              <h3>and the rest of the team.</h3>
              <p>Growing carefully, one hire at a time.</p>
            </div>
          </article>
        </div>
      </div>
    </section>
  );
}
