"use client";
import { useEffect, useState } from "react";
import "./ThemeToggle.scss";

/**
 * Pill-shaped dark/light toggle.
 * Writes `html[data-theme]` and persists to localStorage.
 * Also dispatches a `theme-change` custom event so other components
 * (ParticleField, custom cursor) can react.
 */
export default function ThemeToggle() {
  const [theme, setTheme] = useState("dark");
  const [mounted, setMounted] = useState(false);

  useEffect(() => {
    // Read whichever theme was applied by the boot script (or storage)
    const t = document.documentElement.getAttribute("data-theme") || "dark";
    setTheme(t);
    setMounted(true);
  }, []);

  const setT = (next) => {
    setTheme(next);
    document.documentElement.setAttribute("data-theme", next);
    try { localStorage.setItem("epg-theme", next); } catch (e) {}
    window.dispatchEvent(new CustomEvent("theme-change", { detail: next }));
  };

  const toggle = () => setT(theme === "dark" ? "light" : "dark");

  // Use suppressHydrationWarning on the live state bits so initial SSR/client render matches
  const ariaLabel = `Switch to ${theme === "dark" ? "light" : "dark"} theme`;

  return (
    <button
      type="button"
      className={`theme-toggle ${theme === "light" ? "is-light" : "is-dark"}`}
      onClick={toggle}
      aria-label={ariaLabel}
      aria-pressed={theme === "light"}
      suppressHydrationWarning
    >
      <span className="tt-track">
        <span className="tt-icon tt-moon" aria-hidden="true">
          <svg viewBox="0 0 16 16" width="12" height="12">
            <path d="M12.5 9.5 A5 5 0 0 1 6.5 3.5 A6 6 0 1 0 12.5 9.5 Z" fill="currentColor" />
          </svg>
        </span>
        <span className="tt-icon tt-sun" aria-hidden="true">
          <svg viewBox="0 0 16 16" width="12" height="12">
            <circle cx="8" cy="8" r="3" fill="currentColor" />
            <g stroke="currentColor" strokeWidth="1.3" strokeLinecap="round">
              <line x1="8" y1="1.5" x2="8" y2="3" />
              <line x1="8" y1="13" x2="8" y2="14.5" />
              <line x1="1.5" y1="8" x2="3" y2="8" />
              <line x1="13" y1="8" x2="14.5" y2="8" />
              <line x1="3.2" y1="3.2" x2="4.3" y2="4.3" />
              <line x1="11.7" y1="11.7" x2="12.8" y2="12.8" />
              <line x1="3.2" y1="12.8" x2="4.3" y2="11.7" />
              <line x1="11.7" y1="4.3" x2="12.8" y2="3.2" />
            </g>
          </svg>
        </span>
        <span className="tt-knob" aria-hidden="true" />
      </span>
    </button>
  );
}
