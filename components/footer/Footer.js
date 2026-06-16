"use client";
import { useEffect, useRef } from "react";
import Link from "next/link";
import gsap from "gsap";
import { ScrollTrigger } from "gsap/ScrollTrigger";
import "./Footer.scss";

if (typeof window !== "undefined") gsap.registerPlugin(ScrollTrigger);

export default function Footer() {
  const giantRef = useRef(null);
  const footRef = useRef(null);

  useEffect(() => {
    const el = giantRef.current;
    if (!el) return;
    const chars = el.querySelectorAll(".footer-char");
    gsap.fromTo(
      chars,
      { yPercent: 110 },
      {
        yPercent: 0,
        duration: 1.1,
        ease: "power4.out",
        stagger: 0.025,
        scrollTrigger: {
          trigger: footRef.current,
          start: "top 75%",
        },
      }
    );
  }, []);

  const letters = "EPIGROWW".split("");
  const letters2 = "GLOBAL".split("");

  return (
    <footer ref={footRef} className="site-footer">
      <div className="footer-inner">
        <div className="footer-top">
          <div className="footer-col footer-col-wide">
            <div className="footer-eyebrow">— Ready when you are</div>
            <h3 className="footer-heading">
              Let's engineer your <span className="footer-italic">next growth chapter.</span>
            </h3>
            <Link href="/contact" className="footer-cta" data-cursor="hover">
              <span className="cta-text">Start a project</span>
              <span className="cta-arrow">
                <svg viewBox="0 0 20 20" width="14" height="14">
                  <path d="M5 15 L15 5 M8 5 L15 5 L15 12" fill="none" stroke="currentColor" strokeWidth="1.4" />
                </svg>
              </span>
            </Link>
            <div className="footer-ready-legal">
              <Link href="/privacy-policy" data-cursor="hover">Privacy Policy</Link>
              <span className="footer-legal-sep" aria-hidden="true">·</span>
              <Link href="/terms-and-conditions" data-cursor="hover">Terms &amp; Conditions</Link>
              <span className="footer-legal-sep" aria-hidden="true">·</span>
              <Link href="/refunds-policy" data-cursor="hover">Refund &amp; Cancellation</Link>
            </div>
          </div>

          <div className="footer-col">
            <div className="footer-caption">Offices</div>
            <ul>
              <li>New Delhi <span>IST</span></li>
              <li>Mumbai <span>IST</span></li>
              <li>Dubai <span>GST</span></li>
              <li>Toronto <span>EDT</span></li>
            </ul>
          </div>

          <div className="footer-col">
            <div className="footer-caption">Sitemap</div>
            <ul>
              <li><Link href="/" data-cursor="hover">Home</Link></li>
              <li><Link href="/about" data-cursor="hover">About</Link></li>
              <li><Link href="/work" data-cursor="hover">Work</Link></li>
              <li><Link href="/media-solutions" data-cursor="hover">Media</Link></li>
              <li><Link href="/brand-solutions" data-cursor="hover">Brand</Link></li>
              <li><Link href="/tech-solutions" data-cursor="hover">Tech</Link></li>
              <li><Link href="/ai-solutions" data-cursor="hover">AI</Link></li>
              <li><Link href="/careers" data-cursor="hover">Careers</Link></li>
              <li><Link href="/contact" data-cursor="hover">Contact</Link></li>
            </ul>
          </div>

          <div className="footer-col">
            <div className="footer-caption">Reach</div>
            <ul>
              <li><a href="mailto:business@epigrowwglobal.com" data-cursor="hover">business@epigrowwglobal.com</a></li>
              <li><a href="tel:+918932972567" data-cursor="hover">+91 89329 72567</a></li>
            </ul>
            <div className="footer-caption" style={{ marginTop: '1.2rem' }}>Socials</div>
            <ul className="footer-socials">
              <li><a href="https://www.linkedin.com/company/epigroww-global" target="_blank" rel="noopener noreferrer" data-cursor="hover">LinkedIn ↗</a></li>
              <li><a href="https://www.instagram.com/epigrowwglobal" target="_blank" rel="noopener noreferrer" data-cursor="hover">Instagram ↗</a></li>
              <li><a href="https://www.facebook.com/epigrowwhq" target="_blank" rel="noopener noreferrer" data-cursor="hover">Facebook ↗</a></li>
            </ul>
          </div>
        </div>

        <div ref={giantRef} className="footer-giant">
          <div className="footer-giant-row">
            {letters.map((l, i) => (
              <span key={`a${i}`} className="footer-giant-char-wrap">
                <span className="footer-char">{l}</span>
              </span>
            ))}
          </div>
          <div className="footer-giant-row">
            {letters2.map((l, i) => (
              <span key={`b${i}`} className="footer-giant-char-wrap">
                <span className="footer-char">{l}</span>
              </span>
            ))}
            <span className="footer-giant-dot">●</span>
          </div>
        </div>

        <div className="footer-bottom">
          <span>© 2026 Epigroww Global Pvt Ltd</span>
        </div>
      </div>
    </footer>
  );
}
