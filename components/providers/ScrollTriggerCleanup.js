"use client";
import { useEffect } from "react";
import { usePathname } from "next/navigation";
import gsap from "gsap";
import { ScrollTrigger } from "gsap/ScrollTrigger";

if (typeof window !== "undefined") {
  gsap.registerPlugin(ScrollTrigger);
}

export default function ScrollTriggerCleanup() {
  const pathname = usePathname();

  useEffect(() => {
    // Kill orphaned ScrollTriggers synchronously when the path changes,
    // then refresh once the new page's sections have registered theirs.
    ScrollTrigger.getAll().forEach((t) => t.kill());
    window.scrollTo(0, 0);
    const r1 = requestAnimationFrame(() => {
      const r2 = requestAnimationFrame(() => ScrollTrigger.refresh());
      return () => cancelAnimationFrame(r2);
    });
    return () => cancelAnimationFrame(r1);
  }, [pathname]);

  return null;
}
