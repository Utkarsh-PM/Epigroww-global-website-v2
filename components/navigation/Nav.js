"use client";
import { useEffect, useRef, useState } from "react";
import Link from "next/link";
import gsap from "gsap";
import { useMenu } from "./MenuProvider";
import ThemeToggle from "./ThemeToggle";
import "./Nav.scss";

export default function Nav() {
  const navRef = useRef(null);
  const [scrolled, setScrolled] = useState(false);
  const { open, setOpen } = useMenu();

  useEffect(() => {
    gsap.fromTo(
      navRef.current,
      { y: -30, opacity: 0 },
      { y: 0, opacity: 1, duration: 1, delay: 0.15, ease: "power3.out" }
    );
  }, []);

  useEffect(() => {
    const onScroll = () => setScrolled(window.scrollY > 24);
    onScroll();
    window.addEventListener("scroll", onScroll, { passive: true });
    return () => window.removeEventListener("scroll", onScroll);
  }, []);

  return (
    <nav ref={navRef} className={`site-nav ${scrolled ? "is-scrolled" : ""}`}>
      <Link href="/" className="nav-brand" aria-label="Epigroww Global — home">
        <img src="/logo.png" alt="Epigroww Global" className="nav-logo" />
      </Link>

      <div className="nav-links">
        <Link href="/media-solutions" className="nav-link">Media</Link>
        <Link href="/brand-solutions" className="nav-link">Brand</Link>
        <Link href="/tech-solutions" className="nav-link">Tech</Link>
        <Link href="/ai-solutions" className="nav-link">AI</Link>
        <Link href="/ecommerce-solutions" className="nav-link">Ecommerce</Link>
        <Link href="/work" className="nav-link">Work</Link>
        <Link href="/about" className="nav-link">About</Link>
      </div>

      <div className="nav-right">
        <ThemeToggle />
        <Link href="/contact" className="nav-quote btn-shine" data-cursor="hover">
          Get Quote
        </Link>
        <button
          type="button"
          className={`nav-menu-btn ${open ? "is-open" : ""}`}
          onClick={() => setOpen(!open)}
          aria-label={open ? "Close menu" : "Open menu"}
          aria-expanded={open}
        >
          <span className="menu-btn-icon" aria-hidden="true">
            <span className="menu-btn-bar" />
            <span className="menu-btn-bar" />
          </span>
        </button>
      </div>
    </nav>
  );
}
