"use client";
import { useEffect, useRef } from "react";
import Link from "next/link";
import gsap from "gsap";
import "./FullscreenMenu.scss";

const MENU_ITEMS = [
  { label: "Home", href: "/", num: "01" },
  { label: "About", href: "/about", num: "02" },
  { label: "Work", href: "/work", num: "03" },
  { label: "Media Solutions", href: "/media-solutions", num: "04" },
  { label: "Brand Solutions", href: "/brand-solutions", num: "05" },
  { label: "Tech Solutions", href: "/tech-solutions", num: "06" },
  { label: "Careers", href: "/careers", num: "07" },
  { label: "Contact", href: "/contact", num: "08" },
];

const CITIES = [
  { name: "New Delhi", zone: "IST +05:30" },
  { name: "Mumbai", zone: "IST +05:30" },
  { name: "Dubai", zone: "GST +04:00" },
  { name: "Toronto", zone: "EDT −04:00" },
];

export default function FullscreenMenu({ open, onClose }) {
  const overlayRef = useRef(null);
  const panelRef = useRef(null);
  const itemsRef = useRef([]);
  const metaRef = useRef(null);
  const mounted = useRef(false);

  // Prime initial GSAP state
  useEffect(() => {
    const el = overlayRef.current;
    if (!el) return;
    gsap.set(el, { yPercent: -100, visibility: "hidden", pointerEvents: "none" });
    gsap.set(itemsRef.current, { y: 60, opacity: 0 });
    gsap.set(metaRef.current, { opacity: 0, y: 20 });
    mounted.current = true;
  }, []);

  // Open/close animation
  useEffect(() => {
    const el = overlayRef.current;
    if (!el || !mounted.current) return;

    if (open) {
      document.body.style.overflow = "hidden";
      gsap.set(el, { visibility: "visible", pointerEvents: "auto" });
      const tl = gsap.timeline();
      tl.to(el, { yPercent: 0, duration: 0.85, ease: "power4.inOut" });
      tl.to(
        itemsRef.current,
        { y: 0, opacity: 1, duration: 0.8, stagger: 0.055, ease: "power4.out" },
        "-=0.4"
      );
      tl.to(
        metaRef.current,
        { opacity: 1, y: 0, duration: 0.7, ease: "power3.out" },
        "-=0.3"
      );
    } else {
      document.body.style.overflow = "";
      const tl = gsap.timeline({
        onComplete: () => gsap.set(el, { visibility: "hidden", pointerEvents: "none" }),
      });
      tl.to(itemsRef.current, {
        y: -30,
        opacity: 0,
        duration: 0.3,
        stagger: 0.015,
        ease: "power3.in",
      });
      tl.to(metaRef.current, { opacity: 0, y: -10, duration: 0.25, ease: "power3.in" }, "-=0.25");
      tl.to(el, { yPercent: -100, duration: 0.7, ease: "power4.inOut" }, "-=0.15");
    }
  }, [open]);

  // ESC key to close
  useEffect(() => {
    if (!open) return;
    const onKey = (e) => { if (e.key === "Escape") onClose(); };
    window.addEventListener("keydown", onKey);
    return () => window.removeEventListener("keydown", onKey);
  }, [open, onClose]);

  const addRef = (el) => {
    if (el && !itemsRef.current.includes(el)) itemsRef.current.push(el);
  };

  return (
    <div
      ref={overlayRef}
      className="fs-menu"
      aria-hidden={!open}
      role="dialog"
      aria-modal="true"
      onClick={(e) => {
        // click on backdrop (not panel) closes
        if (e.target === overlayRef.current) onClose();
      }}
    >
      <div ref={panelRef} className="fs-panel">
        <div className="fs-top">
          <span className="fs-top-label">— Navigation</span>
          <span className="fs-top-label">Est. 2021 · Growing</span>
        </div>

        <ul className="fs-list">
          {MENU_ITEMS.map((it) => (
            <li key={it.label} ref={addRef} className="fs-li">
              <Link
                href={it.href}
                onClick={onClose}
                className="fs-link"
                data-cursor="hover"
              >
                <span className="fs-num">{it.num}</span>
                <span className="fs-label">
                  <span className="fs-label-front">{it.label}</span>
                  <span className="fs-label-back">{it.label}</span>
                </span>
                <span className="fs-arrow" aria-hidden="true">↗</span>
              </Link>
            </li>
          ))}
        </ul>

        <div ref={metaRef} className="fs-meta">
          <div className="fs-meta-col">
            <div className="fs-caption">Studios</div>
            <ul>
              {CITIES.map((c) => (
                <li key={c.name}>
                  <span>{c.name}</span>
                  <span className="fs-zone">{c.zone}</span>
                </li>
              ))}
            </ul>
          </div>
          <div className="fs-meta-col">
            <div className="fs-caption">Reach</div>
            <a href="mailto:hello@epigrowwglobal.com" data-cursor="hover">hello@epigrowwglobal.com</a>
            <a href="tel:+919876543210" data-cursor="hover">+91 98765 43210</a>
          </div>
          <div className="fs-meta-col">
            <div className="fs-caption">Social</div>
            <a href="#" data-cursor="hover">LinkedIn ↗</a>
            <a href="#" data-cursor="hover">Instagram ↗</a>
            <a href="#" data-cursor="hover">Facebook ↗</a>
          </div>
        </div>
      </div>
    </div>
  );
}
