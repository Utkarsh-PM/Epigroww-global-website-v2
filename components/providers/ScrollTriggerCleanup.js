"use client";
import { useEffect } from "react";
import { usePathname } from "next/navigation";
import gsap from "gsap";
import { ScrollTrigger } from "gsap/ScrollTrigger";

if (typeof window !== "undefined" && !gsap.core.globals().ScrollTrigger) {
  gsap.registerPlugin(ScrollTrigger);
}

export default function ScrollTriggerCleanup() {
  const pathname = usePathname();

  useEffect(() => {
    // Kill every ScrollTrigger (and unwrap any pin-spacers) before the new
    // page's effects register theirs. Passing `true` revertWise tells GSAP to
    // restore the pinned element's original position and remove the spacer
    // wrapper — without this the stale spacer keeps adding scroll length and
    // we get the "blank area at the bottom" symptom.
    ScrollTrigger.getAll().forEach((t) => t.kill(true));

    // Snap to the top on every route change. We have to reset BOTH the native
    // scroll position AND Lenis's internal target, otherwise Lenis will smooth
    // the previous page's scroll position back in on the new page.
    const lenis = window.__lenis;
    if (lenis) {
      lenis.scrollTo(0, { immediate: true, force: true, lock: true });
    }
    window.scrollTo(0, 0);
    if (document.scrollingElement) document.scrollingElement.scrollTop = 0;

    // Refresh through a chained rAF + a deferred refresh so we catch
    // late-mounting sections, images that resolve from cache, and font swaps.
    const r1 = requestAnimationFrame(() => {
      const r2 = requestAnimationFrame(() => {
        ScrollTrigger.refresh();
      });
      // Final safety refresh once everything has had time to settle.
      const t = setTimeout(() => ScrollTrigger.refresh(), 400);
      cleanupHandles.r2 = r2;
      cleanupHandles.t = t;
    });
    const cleanupHandles = { r1, r2: 0, t: 0 };

    return () => {
      cancelAnimationFrame(cleanupHandles.r1);
      cancelAnimationFrame(cleanupHandles.r2);
      clearTimeout(cleanupHandles.t);
    };
  }, [pathname]);

  return null;
}
