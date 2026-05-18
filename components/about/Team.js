"use client";
import { useEffect, useRef } from "react";
import gsap from "gsap";
import { ScrollTrigger } from "gsap/ScrollTrigger";
import { getCloudinaryUrl } from "../../utils/cloudinary";
import "./Team.scss";

if (typeof window !== "undefined") gsap.registerPlugin(ScrollTrigger);

// Each portrait lives on Cloudinary under epigroww-global-website/about/team/
// as a pre-designed 1:1 brand card (photo + name + role + Epigroww logo all
// baked into the image). Because name and role are already inside the
// graphic, the card body (separate <h3>/<span> below the image) would be a
// duplicate — it's hidden via CSS for a clean gallery look, kept in the DOM
// for SEO / a11y / screen readers.
const TEAM_FOLDER = "epigroww-global-website/about/team";

const TEAM = [
  { name: "Danish Abbasi",       role: "Founder",                                  slug: "danish-abbasi" },
  { name: "Avi Madan Sharma",    role: "Group Head · Media Solutions",             slug: "avi-madan-sharma" },
  { name: "Sandeep Arora",       role: "Ecommerce Director",                       slug: "sandeep-arora" },
  { name: "Gauri Malhotra",      role: "Group Account Manager · Brand Solutions",  slug: "gauri-malhotra" },
  { name: "Tanush Puri",         role: "Senior Business Manager",                  slug: "tanush-puri" },
  { name: "Abhishek Passi",      role: "Creative Manager · Brand Solutions",       slug: "abhishek-passi" },
  { name: "Abhishek Rajvanshi",  role: "Creative Manager · Brand Solutions",       slug: "abhishek-rajvanshi" },
  { name: "Akshay Wadhwa",       role: "Creative Manager · Brand Solutions",       slug: "akshay-wadhwa" },
  { name: "Utkarsh Chandna",     role: "Product Manager · Technology Solutions",   slug: "utkarsh-chandna" },
  { name: "Vishal Kumar",        role: "Senior Creative Lead · Brand Solutions",   slug: "vishal-kumar" },
  { name: "Arkalal Chakravarty", role: "Software Engineer · Technology Solutions", slug: "arkalal-chakravarty" },
  { name: "Anuj Khirwar",        role: "Group Account Manager · Brand Solutions",  slug: "anuj-khirwar" },
];

const portraitUrl = (slug, width) =>
  getCloudinaryUrl(`${TEAM_FOLDER}/${slug}`, { width, crop: "fill", gravity: "auto" });

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
          {TEAM.map((t) => (
            <article key={t.slug} className="tm-card" data-cursor="hover">
              <div className="tm-card-img">
                <img
                  src={portraitUrl(t.slug, 800)}
                  srcSet={`${portraitUrl(t.slug, 500)} 500w, ${portraitUrl(t.slug, 800)} 800w, ${portraitUrl(t.slug, 1100)} 1100w`}
                  sizes="(max-width: 520px) 90vw, (max-width: 900px) 45vw, 30vw"
                  alt={`${t.name} — ${t.role}`}
                  loading="lazy"
                  decoding="async"
                />
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
