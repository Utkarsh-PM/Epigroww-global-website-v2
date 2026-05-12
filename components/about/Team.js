"use client";
import { useEffect, useRef } from "react";
import gsap from "gsap";
import { ScrollTrigger } from "gsap/ScrollTrigger";
import "./Team.scss";

if (typeof window !== "undefined") gsap.registerPlugin(ScrollTrigger);

const DEFAULT_TEAM = [
  { name: "Danish Abbasi", role: "Founder & CEO", city: "New Delhi", image: "https://images.unsplash.com/photo-1560250097-0b93528c311a?auto=format&fit=crop&w=800&q=80" },
  { name: "Priyam Mehra", role: "Co-Director", city: "Mumbai", image: "https://images.unsplash.com/photo-1573496359142-b8d87734a5a2?auto=format&fit=crop&w=800&q=80" },
  { name: "Aanya Kapoor", role: "VP · Creative", city: "Mumbai", image: "https://images.unsplash.com/photo-1580489944761-15a19d654956?auto=format&fit=crop&w=800&q=80" },
  { name: "Rahul Verma", role: "VP · Media", city: "New Delhi", image: "https://images.unsplash.com/photo-1507003211169-0a1dd7228f2d?auto=format&fit=crop&w=800&q=80" },
  { name: "Mariam Al-Noori", role: "Head · MENA", city: "Dubai", image: "https://images.unsplash.com/photo-1594744803329-e58b31de8bf5?auto=format&fit=crop&w=800&q=80" },
  { name: "Ethan O'Connell", role: "Head · NA", city: "Toronto", image: "https://images.unsplash.com/photo-1519085360753-af0119f7cbe7?auto=format&fit=crop&w=800&q=80" },
];

function mapTeam(rows) {
  if (!Array.isArray(rows) || rows.length === 0) return DEFAULT_TEAM;
  return rows.map((m, i) => ({
    name: m.name || "",
    role: m.role || "",
    city: m.city || "",
    image: (m.image && m.image.url) || m.imageUrl || DEFAULT_TEAM[i]?.image || "",
  }));
}

export default function Team({ data = {} }) {
  const ref = useRef(null);
  const TEAM = mapTeam(data.members);
  const label = data.label || "— The people";
  const intro = data.intro || "100+ specialists across four cities.";
  const endNumber = data.endCardNumber || "+ 94";
  const endBody = data.endCardBody || "Growing carefully, one hire at a time.";

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
            <span className="tm-label">{label}</span>
            <h2 className="tm-heading">
              People at <span className="serif">Epigroww.</span>
            </h2>
          </div>
          <p className="tm-intro">{intro}</p>
        </div>

        <div className="tm-grid">
          {TEAM.map((t, i) => (
            <article key={i} className="tm-card" data-cursor="hover">
              <div className="tm-card-img">
                <img src={t.image} alt={t.name} />
                <span className="tm-city">{t.city}</span>
              </div>
              <div className="tm-card-body">
                <h3 className="tm-name">{t.name}</h3>
                <span className="tm-role">{t.role}</span>
              </div>
            </article>
          ))}

          <article className="tm-card tm-card-end">
            <div className="tm-end-number">{endNumber}</div>
            <div className="tm-end-body">
              <h3>and the rest of the team.</h3>
              <p>{endBody}</p>
            </div>
          </article>
        </div>
      </div>
    </section>
  );
}
