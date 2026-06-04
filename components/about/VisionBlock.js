"use client";
import { useEffect, useRef } from "react";
import gsap from "gsap";
import { ScrollTrigger } from "gsap/ScrollTrigger";
import "./VisionBlock.scss";

if (typeof window !== "undefined") gsap.registerPlugin(ScrollTrigger);

const QUOTE = `I wanted an agency that treated the client's P&L like their own — and shipped the creative the brand deserved. Epigroww is that agency. We built it.`;

const TILES = [
  {
    eyebrow: "The problem",
    title: "Agencies hid behind retainers.",
    body: "Hours billed, not outcomes shipped. Client P&Ls treated as someone else's math.",
    image: "https://images.unsplash.com/photo-1551288049-bebda4e38f71?auto=format&fit=crop&w=1200&q=80",
  },
  {
    eyebrow: "The thesis",
    title: "Outcomes over outputs.",
    body: "Every pod co-signs the scorecard. Wins scale. Losers get retired — weekly.",
    image: "https://images.unsplash.com/photo-1600880292203-757bb62b4baf?auto=format&fit=crop&w=1200&q=80",
  },
  {
    eyebrow: "The build",
    title: "One team, one retainer.",
    body: "Media, Brand, Tech and AI in the same Slack. No handoff theatre. No separate P&Ls.",
    image: "https://images.unsplash.com/photo-1542744173-8e7e53415bb0?auto=format&fit=crop&w=1200&q=80",
  },
];

export default function VisionBlock() {
  const ref = useRef(null);

  useEffect(() => {
    const ctx = gsap.context(() => {
      const words = ref.current.querySelectorAll(".vb-quote-word");
      gsap.fromTo(words, { opacity: 0.1 }, {
        opacity: 1,
        ease: "none",
        stagger: 0.025,
        scrollTrigger: { trigger: ".vb-quote", start: "top 75%", end: "top 15%", scrub: true },
      });

      gsap.utils.toArray(".vb-tile").forEach((tile, i) => {
        gsap.fromTo(tile,
          { y: 80, opacity: 0, clipPath: "inset(20% 0 20% 0)" },
          {
            y: 0, opacity: 1, clipPath: "inset(0% 0 0% 0)",
            duration: 1.1, ease: "power4.out",
            delay: i * 0.12,
            scrollTrigger: { trigger: tile, start: "top 85%" },
          }
        );
        // subtle parallax on the image inside
        gsap.to(tile.querySelector(".vb-tile-img img"), {
          yPercent: -12,
          ease: "none",
          scrollTrigger: { trigger: tile, start: "top bottom", end: "bottom top", scrub: true },
        });
      });
    }, ref);
    return () => ctx.revert();
  }, []);

  return (
    <section ref={ref} className="vb">
      <div className="vb-inner">
        <div className="vb-top">
          <div className="vb-quote-col">
            <span className="vb-label">— Founder · Danish Abbasi</span>
            <p className="vb-quote">
              <span className="vb-quote-mark">"</span>
              {QUOTE.split(" ").map((w, i, arr) => (
                <span key={i}>
                  <span className="vb-quote-word">{w}</span>
                  {i < arr.length - 1 ? " " : ""}
                </span>
              ))}
            </p>
            <div className="vb-sign">
              <img
                src="https://res.cloudinary.com/dsauqv4va/image/upload/f_auto,q_auto,c_fill,g_face,w_240,h_240/epigroww-global-website/about/team/danish-abbasi"
                alt="Danish Abbasi"
              />
              <div>
                <span className="vb-sign-name">Danish Abbasi</span>
                <span className="vb-sign-role">Founder & CEO · Since 2021</span>
              </div>
            </div>
          </div>

          <div className="vb-stat-col">
            <div className="vb-stat-card">
              <span className="vb-stat-num">05</span>
              <span className="vb-stat-label">Years · since a laptop in Lucknow</span>
            </div>
            <div className="vb-stat-card vb-stat-card-accent">
              <span className="vb-stat-num">50+</span>
              <span className="vb-stat-label">Specialists in the room</span>
            </div>
            <div className="vb-stat-card">
              <span className="vb-stat-num">3</span>
              <span className="vb-stat-label">Nationalities</span>
            </div>
          </div>
        </div>

        <div className="vb-grid">
          {TILES.map((t, i) => (
            <article key={i} className="vb-tile">
              <div className="vb-tile-img">
                <img src={t.image} alt="" loading="lazy" />
                <span className="vb-tile-num">{String(i + 1).padStart(2, "0")}</span>
              </div>
              <div className="vb-tile-body">
                <span className="vb-tile-eyebrow">— {t.eyebrow}</span>
                <h3 className="vb-tile-title">{t.title}</h3>
                <p className="vb-tile-desc">{t.body}</p>
              </div>
            </article>
          ))}
        </div>
      </div>
    </section>
  );
}
