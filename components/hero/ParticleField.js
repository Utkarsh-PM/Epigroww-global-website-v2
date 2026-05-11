"use client";
import { useEffect, useRef, useState } from "react";

export default function ParticleField({
  density = 0.00009,        // particles per pixel² (≈ 70 particles at 1200×800)
  linkDistance = 140,
  speed = 0.35,
  className = "",
}) {
  const canvasRef = useRef(null);
  const rafRef = useRef(0);
  const colorRef = useRef("#E3E65D");
  const [, forceRerender] = useState(0);

  // Read the live --accent CSS var. Falls back to lime if unresolvable.
  const readAccent = () => {
    if (typeof window === "undefined") return "#E3E65D";
    const c = getComputedStyle(document.documentElement)
      .getPropertyValue("--accent")
      .trim();
    return c || "#E3E65D";
  };

  // React to theme changes — update the color used by the running RAF loop.
  useEffect(() => {
    colorRef.current = readAccent();
    const onThemeChange = () => {
      colorRef.current = readAccent();
    };
    window.addEventListener("theme-change", onThemeChange);
    return () => window.removeEventListener("theme-change", onThemeChange);
  }, []);

  useEffect(() => {
    const canvas = canvasRef.current;
    if (!canvas) return;
    const ctx = canvas.getContext("2d");
    const dpr = Math.min(window.devicePixelRatio || 1, 2);

    let particles = [];
    let mouse = { x: -9999, y: -9999 };

    const resize = () => {
      const { clientWidth: w, clientHeight: h } = canvas;
      canvas.width = w * dpr;
      canvas.height = h * dpr;
      ctx.setTransform(dpr, 0, 0, dpr, 0, 0);
      const count = Math.max(40, Math.min(140, Math.floor(w * h * density)));
      particles = new Array(count).fill(0).map(() => ({
        x: Math.random() * w,
        y: Math.random() * h,
        vx: (Math.random() - 0.5) * speed,
        vy: (Math.random() - 0.5) * speed,
        r: 1 + Math.random() * 1.6,
      }));
    };

    resize();
    const ro = new ResizeObserver(resize);
    ro.observe(canvas);

    const onMove = (e) => {
      const rect = canvas.getBoundingClientRect();
      mouse.x = e.clientX - rect.left;
      mouse.y = e.clientY - rect.top;
    };
    const onLeave = () => { mouse.x = -9999; mouse.y = -9999; };
    canvas.addEventListener("mousemove", onMove);
    canvas.addEventListener("mouseleave", onLeave);

    const render = () => {
      const w = canvas.clientWidth;
      const h = canvas.clientHeight;
      ctx.clearRect(0, 0, w, h);

      // Update
      for (const p of particles) {
        p.x += p.vx;
        p.y += p.vy;
        if (p.x < 0 || p.x > w) p.vx *= -1;
        if (p.y < 0 || p.y > h) p.vy *= -1;

        // Subtle mouse repulsion
        const dx = p.x - mouse.x;
        const dy = p.y - mouse.y;
        const d2 = dx * dx + dy * dy;
        if (d2 < 120 * 120) {
          const d = Math.sqrt(d2) || 1;
          const f = (120 - d) / 120 * 0.6;
          p.vx += (dx / d) * f * 0.03;
          p.vy += (dy / d) * f * 0.03;
        }
        // Cap velocity
        const v = Math.hypot(p.vx, p.vy);
        const max = speed * 1.8;
        if (v > max) { p.vx = (p.vx / v) * max; p.vy = (p.vy / v) * max; }
      }

      // Draw links
      ctx.lineWidth = 1;
      for (let i = 0; i < particles.length; i++) {
        const a = particles[i];
        for (let j = i + 1; j < particles.length; j++) {
          const b = particles[j];
          const dx = a.x - b.x;
          const dy = a.y - b.y;
          const d2 = dx * dx + dy * dy;
          const Ld = linkDistance;
          if (d2 < Ld * Ld) {
            const alpha = (1 - Math.sqrt(d2) / Ld) * 0.32;
            ctx.strokeStyle = colorToRgba(colorRef.current, alpha);
            ctx.beginPath();
            ctx.moveTo(a.x, a.y);
            ctx.lineTo(b.x, b.y);
            ctx.stroke();
          }
        }
      }

      // Draw particles
      for (const p of particles) {
        ctx.beginPath();
        ctx.arc(p.x, p.y, p.r, 0, Math.PI * 2);
        ctx.fillStyle = colorRef.current;
        ctx.globalAlpha = 0.85;
        ctx.fill();
      }
      ctx.globalAlpha = 1;

      rafRef.current = requestAnimationFrame(render);
    };
    render();

    return () => {
      cancelAnimationFrame(rafRef.current);
      ro.disconnect();
      canvas.removeEventListener("mousemove", onMove);
      canvas.removeEventListener("mouseleave", onLeave);
    };
  }, [density, linkDistance, speed]);

  return <canvas ref={canvasRef} className={`particle-field ${className}`} aria-hidden="true" />;
}

// Accepts hex (#E3E65D) or rgb() strings, returns rgba() with given alpha.
function colorToRgba(c, a) {
  if (!c) return `rgba(227, 230, 93, ${a})`;
  const s = c.trim();
  if (s.startsWith("rgb")) {
    // rgb(r, g, b) or rgb(r g b / alpha) → strip alpha, use ours
    const nums = s.replace(/rgba?\(|\)|\//g, " ").split(/[ ,]+/).filter(Boolean).slice(0, 3);
    return `rgba(${nums[0]},${nums[1]},${nums[2]},${a})`;
  }
  const v = s.replace("#", "");
  const n = parseInt(v.length === 3 ? v.split("").map(x => x + x).join("") : v, 16);
  const r = (n >> 16) & 255;
  const g = (n >> 8) & 255;
  const b = n & 255;
  return `rgba(${r},${g},${b},${a})`;
}
