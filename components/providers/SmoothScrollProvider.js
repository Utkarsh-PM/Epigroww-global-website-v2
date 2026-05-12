"use client";
import { useEffect, useRef } from "react";
import Lenis from "lenis";
import gsap from "gsap";
import { ScrollTrigger } from "gsap/ScrollTrigger";

if (typeof window !== "undefined" && !gsap.core.globals().ScrollTrigger) {
  gsap.registerPlugin(ScrollTrigger);
}

export default function SmoothScrollProvider({ children }) {
  const lenisRef = useRef(null);

  useEffect(() => {
    const lenis = new Lenis({
      duration: 1.6,
      easing: (t) => Math.min(1, 1.001 - Math.pow(2, -10 * t)),
      wheelMultiplier: 0.9,
      lerp: 0.08,
      smoothWheel: true,
    });
    lenisRef.current = lenis;
    // Expose for the route-change handler so it can hard-reset the smooth
    // scroll position when the user navigates to a new page.
    window.__lenis = lenis;

    // Belt-and-braces refresh-to-top: the boot script already disables
    // `history.scrollRestoration`, but if the browser still nudges the page
    // (Safari, bf-cache, lazy images) we re-pin to the top once Lenis is alive.
    lenis.scrollTo(0, { immediate: true });
    requestAnimationFrame(() => lenis.scrollTo(0, { immediate: true }));

    lenis.on("scroll", ScrollTrigger.update);
    const tickerFn = (time) => lenis.raf(time * 1000);
    gsap.ticker.add(tickerFn);
    gsap.ticker.lagSmoothing(0);

    const refresh = () => {
      lenis.resize();
      ScrollTrigger.refresh();
    };

    // Refresh once the page is fully loaded (images/iframes settle)
    if (document.readyState === "complete") {
      requestAnimationFrame(refresh);
    } else {
      window.addEventListener("load", refresh, { once: true });
    }

    // Refresh once webfonts finish loading — prevents stale measurements
    if (document.fonts && document.fonts.ready) {
      document.fonts.ready.then(() => {
        requestAnimationFrame(refresh);
      }).catch(() => {});
    }

    // Refresh on resize (debounced) — covers viewport changes + dev HMR repaints
    let resizeRaf = 0;
    const onResize = () => {
      cancelAnimationFrame(resizeRaf);
      resizeRaf = requestAnimationFrame(refresh);
    };
    window.addEventListener("resize", onResize);

    // Refresh whenever the document height changes (deferred images, animations
    // unmounting, fonts swapping, dev HMR class changes). This is the most
    // important guard against the "blank space at bottom" issue.
    let lastHeight = document.documentElement.scrollHeight;
    const ro = new ResizeObserver(() => {
      const h = document.documentElement.scrollHeight;
      if (Math.abs(h - lastHeight) > 4) {
        lastHeight = h;
        cancelAnimationFrame(resizeRaf);
        resizeRaf = requestAnimationFrame(refresh);
      }
    });
    ro.observe(document.body);

    return () => {
      window.removeEventListener("load", refresh);
      window.removeEventListener("resize", onResize);
      cancelAnimationFrame(resizeRaf);
      ro.disconnect();
      gsap.ticker.remove(tickerFn);
      lenis.destroy();
      lenisRef.current = null;
      if (window.__lenis === lenis) window.__lenis = null;
    };
  }, []);

  return <>{children}</>;
}
