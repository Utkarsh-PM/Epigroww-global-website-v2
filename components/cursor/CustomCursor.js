"use client";
import { useEffect, useRef, useState } from "react";
import gsap from "gsap";
import "./CustomCursor.scss";

export default function CustomCursor() {
  const dotRef = useRef(null);
  const ringRef = useRef(null);
  const [label, setLabel] = useState("");
  const [variant, setVariant] = useState("default");

  useEffect(() => {
    const dot = dotRef.current;
    const ring = ringRef.current;
    if (!dot || !ring) return;

    const pos = { x: window.innerWidth / 2, y: window.innerHeight / 2 };
    const mouse = { x: pos.x, y: pos.y };
    const speed = 0.22;

    const xSet = gsap.quickSetter(dot, "x", "px");
    const ySet = gsap.quickSetter(dot, "y", "px");
    const rxSet = gsap.quickSetter(ring, "x", "px");
    const rySet = gsap.quickSetter(ring, "y", "px");

    const move = (e) => {
      mouse.x = e.clientX;
      mouse.y = e.clientY;
      xSet(mouse.x);
      ySet(mouse.y);
    };

    const tick = () => {
      pos.x += (mouse.x - pos.x) * speed;
      pos.y += (mouse.y - pos.y) * speed;
      rxSet(pos.x);
      rySet(pos.y);
    };
    gsap.ticker.add(tick);
    window.addEventListener("mousemove", move);

    const hoverables = document.querySelectorAll("[data-cursor]");
    const listeners = [];
    hoverables.forEach((el) => {
      const enter = () => {
        const v = el.getAttribute("data-cursor") || "hover";
        const l = el.getAttribute("data-cursor-label") || "";
        setVariant(v);
        setLabel(l);
      };
      const leave = () => {
        setVariant("default");
        setLabel("");
      };
      el.addEventListener("mouseenter", enter);
      el.addEventListener("mouseleave", leave);
      listeners.push({ el, enter, leave });
    });

    return () => {
      gsap.ticker.remove(tick);
      window.removeEventListener("mousemove", move);
      listeners.forEach(({ el, enter, leave }) => {
        el.removeEventListener("mouseenter", enter);
        el.removeEventListener("mouseleave", leave);
      });
    };
  }, []);

  return (
    <>
      <div ref={dotRef} className={`cursor-dot cursor-${variant}`} />
      <div ref={ringRef} className={`cursor-ring cursor-${variant}`}>
        {label && <span className="cursor-label">{label}</span>}
      </div>
    </>
  );
}
