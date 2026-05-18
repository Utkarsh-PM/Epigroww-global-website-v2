"use client";
import { useEffect, useRef, useState } from "react";
import "./VideoBackground.scss";

/**
 * VideoBackground
 *
 * Cover-style HTML5 video for hero / reel / showreel cards. Drop-in
 * replacement for the previous YouTube-iframe player.
 *
 *   - Native `<video autoplay muted loop playsinline preload="metadata">`.
 *     No iframe document, no third-party chrome, no postMessage handshake,
 *     no anti-pause logic. Each player is ~10x lighter than an iframe.
 *   - Lazy mount via IntersectionObserver: we don't even attach the <video>
 *     src until the card nears the viewport. Once attached we leave it
 *     alone — modern browsers throttle off-screen video decoding by
 *     themselves so we don't have to.
 *   - Poster fills the card immediately and only fades when the first
 *     frame paints (`onPlaying`). The card is never blank or loading-state.
 *   - Source URL is the Cloudinary delivery URL with `f_auto,q_auto` so
 *     Chrome gets AV1 / Firefox gets VP9 / Safari gets H.265 / everything
 *     else gets H.264 mp4 — automatically, from a single upload.
 *
 * Props:
 *   publicId    — Cloudinary video public_id (e.g. "epigroww-global-website/home/showreel-hero")
 *   orientation — "horizontal" (16:9 source) | "vertical" (9:16 source)
 *   poster      — optional poster public_id (or absolute URL). Falls back to
 *                 a Cloudinary video-thumbnail of the source.
 *   rootMargin  — IntersectionObserver pre-fetch margin. Default 200px.
 *   className   — passthrough wrapper class
 *   title       — a11y label
 *   onVideoReady — optional callback that receives the <video> element so the
 *                  host can implement its own play/pause UI (used by the
 *                  Showreel "Pause reel" button).
 */
const CLOUDINARY_CLOUD =
  process.env.NEXT_PUBLIC_CLOUDINARY_CLOUD_NAME || "dsauqv4va";

const videoUrl = (publicId) =>
  `https://res.cloudinary.com/${CLOUDINARY_CLOUD}/video/upload/f_auto,q_auto/${publicId}.mp4`;

// Cloudinary auto-generates a still frame from any uploaded video — just
// swap `/video/` → `/video/upload/<transforms>/<id>.jpg`. We pick a frame
// from ~0.5s in so we never grab a black title card.
const posterUrl = (publicId) =>
  `https://res.cloudinary.com/${CLOUDINARY_CLOUD}/video/upload/so_0.5,f_jpg,q_auto/${publicId}.jpg`;

export default function VideoBackground({
  publicId,
  orientation = "horizontal",
  poster,
  rootMargin = "200px",
  className = "",
  title = "Video",
  onVideoReady,
}) {
  const wrapRef = useRef(null);
  const videoRef = useRef(null);
  const [shouldLoad, setShouldLoad] = useState(false);
  const [playing, setPlaying] = useState(false);

  // Lazy-mount the <video> src once the card nears the viewport. Avoids the
  // network/decoder cost of starting twelve players the instant the page
  // hydrates.
  useEffect(() => {
    const node = wrapRef.current;
    if (!node) return undefined;

    if (typeof IntersectionObserver === "undefined") {
      setShouldLoad(true);
      return undefined;
    }

    const io = new IntersectionObserver(
      (entries) => {
        if (entries.some((e) => e.isIntersecting)) {
          setShouldLoad(true);
          io.disconnect();
        }
      },
      { rootMargin }
    );
    io.observe(node);
    return () => io.disconnect();
  }, [rootMargin]);

  const src = shouldLoad ? videoUrl(publicId) : undefined;
  const posterSrc = poster
    ? (poster.startsWith("http") ? poster : posterUrl(poster))
    : posterUrl(publicId);

  return (
    <div
      ref={wrapRef}
      className={`vbg vbg-${orientation} ${className}`.trim()}
      aria-label={title}
      data-playing={playing ? "true" : "false"}
    >
      <img
        className="vbg-poster"
        src={posterSrc}
        alt=""
        aria-hidden="true"
        loading="lazy"
        decoding="async"
      />
      {shouldLoad && (
        <video
          ref={(el) => {
            videoRef.current = el;
            if (el && onVideoReady) onVideoReady(el);
          }}
          className="vbg-video"
          src={src}
          autoPlay
          muted
          loop
          playsInline
          preload="metadata"
          tabIndex={-1}
          aria-hidden="true"
          onPlaying={() => setPlaying(true)}
          onPause={() => setPlaying(false)}
        />
      )}
    </div>
  );
}
