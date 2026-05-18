# Cloudinary-hosted Media Pipeline (Enterprise Reference)

> **Purpose:** a repeatable, framework-agnostic blueprint for serving images
> and autoplay videos on a marketing or product website using **Cloudinary as
> the CDN**, **ffmpeg / sharp for local preprocessing**, and a thin
> **React component layer** for delivery.
>
> Drop this file into the `docs/` folder of any new project, hand it to Claude
> Code, and the same architecture can be set up in under an hour.

---

## 1. Why this pattern

The default of "put media in `/public` and reference it directly" breaks down
quickly:

| Problem with `/public` | Why it hurts |
|---|---|
| Single fixed file per asset | One mobile user downloads the same 2 MB hero image as a 4K-monitor user |
| Single fixed format | Modern browsers wanting AV1/AVIF still get a fat mp4/jpg |
| No CDN edge caching beyond your origin | Slow TTFB for global users |
| Repo bloat | Heavy mp4s in git history kill clone time and CI cache |
| No transformations | Need a thumbnail variant? You hand-resize in Photoshop |

Embedding YouTube / Vimeo iframes solves origin bandwidth, but introduces a
worse class of problem for **autoplay-on-view card backgrounds**:

| Problem with YouTube iframes | Why it hurts |
|---|---|
| Each iframe is a full sub-document | 10 iframes ≈ 10 mini-browsers on one page |
| Player chrome is not fully suppressible | Center pause/play overlays leak through during state transitions |
| Chrome's autoplay budget pauses overflow | Multiple muted iframes will get auto-paused |
| 50–300 ms postMessage round-trip | Cannot react to state changes in the same frame they paint |
| `loop=1` requires `playlist=<id>` which draws playlist navigation chrome | No clean way to seamlessly loop a single video |

**The pattern below is what every enterprise marketing site actually does**
(Stripe, Linear, Apple, Notion, Vercel, Framer): native HTML5 `<video>` and
`<img>` elements pointing at a CDN that handles format + quality negotiation
per visitor.

---

## 2. Architecture at a glance

```
┌──────────────────────────────────────────────────────────────────────┐
│  raw-assets/                  (gitignored, client supplies)          │
│    HOME PAGE/                                                         │
│      FOUNDER IMAGE.png         3 MB                                   │
│      HERO BANNER/                                                     │
│        Teaser.mp4              106 MB                                 │
│      Reel Cards/*.mp4          ~80 MB each                            │
└──────────────────────────────────────────────────────────────────────┘
                            │
                            ▼  (local preprocessing)
┌──────────────────────────────────────────────────────────────────────┐
│  scripts/compress-videos.js   ffmpeg → libx264, CRF 23, ≤1080p,      │
│                                +faststart, audio stripped             │
│  scripts/upload-*.js           cloudinary.uploader.upload_large       │
└──────────────────────────────────────────────────────────────────────┘
                            │
                            ▼  (one-time per asset)
┌──────────────────────────────────────────────────────────────────────┐
│  Cloudinary                                                           │
│    <project-slug>/<page>/<section>/<asset-slug>                       │
│                                                                       │
│  Delivery URLs use `f_auto,q_auto` so:                                │
│    Chrome  → AV1                                                      │
│    Firefox → VP9                                                      │
│    Safari  → H.265 / HEVC                                             │
│    Everything else → H.264 mp4                                        │
│    Bitrate auto-tuned to viewer's network                             │
└──────────────────────────────────────────────────────────────────────┘
                            │
                            ▼  (request time)
┌──────────────────────────────────────────────────────────────────────┐
│  React components                                                     │
│    <VideoBackground publicId="..." />   HTML5 <video>                 │
│    <CldImage src="..." />               <img srcSet=...>              │
└──────────────────────────────────────────────────────────────────────┘
```

---

## 3. One-time setup

### 3.1 Cloudinary account
Free plan limits to know:
- **10 MB per image upload**
- **100 MB per video upload**
- 25 GB monthly delivery bandwidth
- 25 monthly transformation credits per 1000 transformations

These are generous for a marketing site. Paid plans lift the per-file caps if
you need them.

### 3.2 Environment variables

Add to `.env` (NEVER commit this file):

```bash
NEXT_PUBLIC_CLOUDINARY_CLOUD_NAME=<your-cloud-name>
CLOUDINARY_API_KEY=<server-side-only>
CLOUDINARY_API_SECRET=<server-side-only>
```

- `NEXT_PUBLIC_*` is safe in the client bundle — it's just the public ID of
  the cloud, no auth.
- `CLOUDINARY_API_KEY` and `CLOUDINARY_API_SECRET` must NEVER be exposed to
  the client. Use them only in Node scripts and server-side route handlers.

### 3.3 NPM packages

```bash
npm install cloudinary
npm install --save-dev dotenv sharp
```

- `cloudinary` — SDK for upload/delete from Node.
- `sharp` — lossless image compression for the rare case an image exceeds
  Cloudinary's 10 MB image cap. Required only if you have huge PNGs.
- `dotenv` — lets the scripts pick up `.env` when run directly with `node`.

### 3.4 System dependency

```bash
brew install ffmpeg          # macOS
sudo apt-get install ffmpeg  # Debian/Ubuntu
```

Only needed if the project has video. Verify with `ffmpeg -version`.

### 3.5 .gitignore

```
raw-assets/
```

Raw client deliverables should never enter git history. They can be hundreds
of MB each.

---

## 4. Folder / namespace strategy on Cloudinary

A single Cloudinary account is often shared across multiple projects. The
ironclad rule is: **every public_id starts with a project namespace**.

```
<project-slug>/<page>/<section>/<asset-slug>

✓  acme-website/home/founder-portrait
✓  acme-website/home/reels/wk-17-launch-film
✓  bigco-app/marketing/hero-loop

✗  founder-portrait                    (collides with other projects)
✗  home/hero                           (collides with other projects)
```

This guarantees a `delete_resources_by_prefix("acme-website/")` will never
touch another project's assets.

Section sub-folders (`/home/`, `/about/`, `/reels/`) make manual auditing
inside the Cloudinary dashboard far easier — assets cluster by where they
appear on the site.

---

## 5. Image workflow

### 5.1 Decision tree

```
                  ┌─────────────────────┐
                  │ Image file < 10 MB? │
                  └──┬───────────────┬──┘
                     │ yes           │ no
                     ▼               ▼
              upload directly    compress with sharp first
                                 (WebP lossless, EXIF stripped)
                                 then upload
```

### 5.2 Lossless compression (sharp) — only when needed

```js
// scripts/compress-image.js
const sharp = require("sharp");
await sharp(inputPath)
  .webp({ lossless: true })     // zero quality loss
  .toFile(outputPath);
// sharp also strips EXIF by default — that alone saves hundreds of KB
```

If lossless WebP still exceeds 10 MB:

```js
sharp(inputPath)
  .webp({ nearLossless: true, quality: 95 })
  .toFile(outputPath);
```

### 5.3 Upload script template

```js
// scripts/upload-image.js
const path = require("path");
const cloudinary = require("cloudinary").v2;
require("dotenv").config({ path: path.resolve(__dirname, "..", ".env") });

cloudinary.config({
  cloud_name: process.env.CLOUDINARY_CLOUD_NAME,
  api_key: process.env.CLOUDINARY_API_KEY,
  api_secret: process.env.CLOUDINARY_API_SECRET,
});

async function main() {
  const file = path.resolve(__dirname, "..", "raw-assets", "HOME PAGE", "founder.png");
  const folder = "<project-slug>/home";
  const public_id = "founder-portrait";

  const res = await cloudinary.uploader.upload(file, {
    folder,
    public_id,
    resource_type: "image",
    overwrite: true,        // idempotent: safe to re-run
    unique_filename: false,
    use_filename: false,
  });
  console.log("Uploaded:", res.secure_url);
}

main().catch((e) => { console.error(e); process.exit(1); });
```

Run with `node scripts/upload-image.js`. Re-running is safe — the same
`public_id` is overwritten in place.

### 5.4 Delivery URL helper

```js
// utils/cloudinary.js
export const CLOUDINARY_CLOUD_NAME =
  process.env.NEXT_PUBLIC_CLOUDINARY_CLOUD_NAME;

export function getCloudinaryUrl(publicId, opts = {}) {
  if (!publicId) return "";
  const {
    width, height,
    quality = "auto",
    format = "auto",
    crop = "fill",
    gravity,
    dpr = "auto",
  } = opts;
  const parts = [`f_${format}`, `q_${quality}`, `dpr_${dpr}`];
  if (crop)    parts.push(`c_${crop}`);
  if (gravity) parts.push(`g_${gravity}`);
  if (width)   parts.push(`w_${width}`);
  if (height)  parts.push(`h_${height}`);
  return `https://res.cloudinary.com/${CLOUDINARY_CLOUD_NAME}/image/upload/${parts.join(",")}/${publicId}`;
}
```

Always use `f_auto,q_auto,dpr_auto` for production. Cloudinary then:
- serves AVIF / WebP to browsers that accept them, jpg / png otherwise
- tunes quality to a perceptual sweet spot
- scales for the device pixel ratio of the viewer

### 5.5 React usage

```jsx
import { getCloudinaryUrl } from "../utils/cloudinary";

const PORTRAIT = "<project-slug>/home/founder-portrait";

<img
  src={getCloudinaryUrl(PORTRAIT, { width: 1200, crop: "fill", gravity: "auto" })}
  srcSet={`
    ${getCloudinaryUrl(PORTRAIT, { width: 600 })} 600w,
    ${getCloudinaryUrl(PORTRAIT, { width: 900 })} 900w,
    ${getCloudinaryUrl(PORTRAIT, { width: 1200 })} 1200w
  `}
  sizes="(max-width: 880px) 80vw, 38vw"
  alt="..."
  loading="lazy"
  decoding="async"
/>
```

`loading="lazy"` + `decoding="async"` are free wins — don't omit them.

---

## 6. Video workflow

### 6.1 The non-negotiables

| Rule | Why |
|---|---|
| Compress every video locally with ffmpeg before upload | Cloudinary caps videos at 100 MB upload; you also want web-shaped files |
| Strip audio if the player will be muted | Saves bytes, sidesteps audio decode cost |
| Cap long edge at 1080 px | A 4K source on a 280 px card is wasted bytes; 1080 covers retina too |
| `+faststart` flag | moov atom up front → playback can start before download finishes |
| Use `<video>` not iframe for autoplay-on-view backgrounds | Iframe approach is architecturally limited (see §1) |

### 6.2 The ffmpeg recipe

```js
// scripts/compress-videos.js
const { execFileSync } = require("child_process");
const fs = require("fs");
const path = require("path");

function compress(src, out) {
  if (fs.existsSync(out)) return;   // idempotent: skip if already done
  execFileSync("ffmpeg", [
    "-hide_banner", "-loglevel", "error", "-y",
    "-i", src,
    "-vf", "scale='min(1080,iw)':-2",   // cap long edge at 1080; -2 keeps even chroma
    "-c:v", "libx264",
    "-crf", "23",                       // x264 default — visually indistinguishable from source
    "-preset", "slow",                  // better compression vs encode time tradeoff
    "-profile:v", "high", "-pix_fmt", "yuv420p",  // universal compatibility incl. Safari
    "-movflags", "+faststart",
    "-an",                              // strip audio
    out,
  ], { stdio: "inherit" });
}

// Build a JOBS array of { src, out } objects and loop over compress().
```

**Expected results** (typical 1080p 10–30 s clip):
- Source: 50–150 MB
- Compressed: 3–25 MB
- Reduction: 75–95%
- Visual quality: indistinguishable at normal viewing

If a single clip is still > 100 MB after compression (rare — usually 60s+ at
high motion), drop `-crf 23` to `-crf 26` for that file or lower the
resolution cap to 720.

### 6.3 The upload script

Use `upload_large` (chunked) for any file > 50 MB to survive flaky networks.

```js
// scripts/upload-videos.js
const fs = require("fs");
const path = require("path");
const cloudinary = require("cloudinary").v2;
require("dotenv").config({ path: path.resolve(__dirname, "..", ".env") });

cloudinary.config({
  cloud_name: process.env.CLOUDINARY_CLOUD_NAME,
  api_key: process.env.CLOUDINARY_API_KEY,
  api_secret: process.env.CLOUDINARY_API_SECRET,
});

async function uploadOne({ file, folder, public_id }) {
  await cloudinary.uploader.upload_large(file, {
    folder,
    public_id,
    resource_type: "video",
    overwrite: true,
    unique_filename: false,
    use_filename: false,
    chunk_size: 20 * 1024 * 1024,    // 20 MB chunks
  });
}

// Iterate over JOBS array of { file, folder, public_id }.
```

### 6.4 Delivery URL

```
https://res.cloudinary.com/<cloud>/video/upload/f_auto,q_auto/<project-slug>/<page>/<section>/<asset-slug>.mp4
```

`f_auto` + `q_auto` for videos do the same per-browser negotiation as for
images: AV1 to Chrome, VP9 to Firefox, H.265 to Safari, H.264 mp4 fallback.

You can append the `.mp4` extension regardless — Cloudinary honors `Accept`
headers to pick the actual delivered codec.

### 6.5 The React `<VideoBackground>` component

A single component handles every autoplay-on-view card on the site. Drop-in,
cover-mode, lazy-mounted, posterised:

```jsx
"use client";
import { useEffect, useRef, useState } from "react";
import "./VideoBackground.scss";

const CLOUDINARY_CLOUD = process.env.NEXT_PUBLIC_CLOUDINARY_CLOUD_NAME;
const videoUrl  = (id) => `https://res.cloudinary.com/${CLOUDINARY_CLOUD}/video/upload/f_auto,q_auto/${id}.mp4`;
const posterUrl = (id) => `https://res.cloudinary.com/${CLOUDINARY_CLOUD}/video/upload/so_0.5,f_jpg,q_auto/${id}.jpg`;

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

  useEffect(() => {
    const node = wrapRef.current;
    if (!node) return;
    if (typeof IntersectionObserver === "undefined") { setShouldLoad(true); return; }
    const io = new IntersectionObserver(
      (entries) => { if (entries.some((e) => e.isIntersecting)) { setShouldLoad(true); io.disconnect(); } },
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
      <img className="vbg-poster" src={posterSrc} alt="" aria-hidden="true" loading="lazy" decoding="async" />
      {shouldLoad && (
        <video
          ref={(el) => { videoRef.current = el; if (el && onVideoReady) onVideoReady(el); }}
          className="vbg-video"
          src={src}
          autoPlay muted loop playsInline
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
```

The matching SCSS:

```scss
.vbg {
  position: absolute; inset: 0;
  width: 100%; height: 100%;
  overflow: hidden;
  background: #050505;
  isolation: isolate;
}
.vbg-video {
  position: absolute; inset: 0;
  width: 100%; height: 100%;
  object-fit: cover;
  z-index: 1;
  pointer-events: none;
}
.vbg-poster {
  position: absolute; inset: 0;
  width: 100%; height: 100%;
  object-fit: cover;
  z-index: 2;
  opacity: 1;
  transition: opacity 0s linear;  /* covers INSTANTLY */
  pointer-events: none;
}
.vbg[data-playing="true"] .vbg-poster {
  opacity: 0;
  transition: opacity 0.5s ease;  /* reveals SMOOTHLY */
}
```

### 6.6 Why this component is fast

| Decision | Reason |
|---|---|
| Lazy-mount via `IntersectionObserver` (200 px rootMargin) | No network or decoder cost until the card nears the viewport |
| HTML5 `<video>` not iframe | ~10× lighter; no separate document, no cross-origin postMessage, no third-party chrome |
| Poster fills card at first paint | Card is never blank or loading-state |
| Poster cover is instant (`transition: 0s`), reveal is smooth (`0.5s`) | Hides any brief decoder warm-up frame, transitions in feel intentional |
| `preload="metadata"` not `preload="auto"` | Browser fetches just enough to know duration/dims; full video starts on play |
| `muted` + `playsInline` | Universal mobile autoplay allowed by every browser policy |
| `object-fit: cover` | Same sizing math for 16:9 and 9:16 sources — no iframe geometry tricks |
| Cloudinary `f_auto, q_auto` | Per-browser codec + per-viewer bitrate without us doing anything |

### 6.7 Usage

```jsx
import VideoBackground from "../shared/VideoBackground";

<div className="hero-canvas">
  <VideoBackground
    publicId="<project-slug>/home/showreel-hero"
    orientation="horizontal"
    title="Showreel"
  />
</div>

<div className="reel-card">
  <VideoBackground
    publicId="<project-slug>/home/reels/wk-17-launch-film"
    orientation="vertical"
  />
</div>
```

---

## 7. Deletion (operational cleanup)

When media changes, **don't leave the old asset in Cloudinary**. Otherwise
storage cost creeps and the dashboard becomes a graveyard.

### 7.1 Single delete

```js
await cloudinary.uploader.destroy("<project-slug>/home/founder-portrait", {
  resource_type: "image",   // or "video"
});
```

### 7.2 Bulk delete (within a project namespace)

```js
await cloudinary.api.delete_resources_by_prefix("<project-slug>/home/", {
  resource_type: "image",
});
```

**Always namespace the prefix** — `delete_resources_by_prefix("home/")` would
nuke every project on the account that uses a `home/` subfolder.

### 7.3 When to delete

- Replacing an asset → `overwrite: true` is enough, no explicit delete.
- Removing an asset that's no longer used → explicit `destroy()`.
- Renaming a project namespace → bulk-delete the old prefix after the
  re-upload confirms.

---

## 8. Standard project file layout

```
<project-root>/
  .env                          # secrets (gitignored)
  .gitignore                    # includes `raw-assets/`
  utils/
    cloudinary.js               # getCloudinaryUrl helper
  components/
    shared/
      VideoBackground.js
      VideoBackground.scss
  scripts/
    compress-image.js           # sharp, only if needed
    upload-image.js
    compress-videos.js          # ffmpeg
    upload-videos.js
    delete-cloudinary.js        # optional cleanup utility
  raw-assets/                   # client-supplied originals (gitignored)
    <page>/
      <asset>
  raw-assets/compressed/        # ffmpeg output (gitignored)
    <slug>.mp4
  docs/
    cloudinary-media-pipeline.md  # this file
```

---

## 9. The end-to-end workflow per asset batch

```
1. Client sends source files (or links to download them)
   → drop into raw-assets/<page>/
2. For each image > 10 MB → scripts/compress-image.js
   For each video        → scripts/compress-videos.js  (idempotent)
3. Run scripts/upload-images.js  and  scripts/upload-videos.js
   (both idempotent — safe to re-run)
4. Update the React component / page to reference the public_id
5. Test locally:
   - run `npm run build` (catches dead imports + syntax)
   - run `npm run dev`, scroll the page, confirm playback / image render
6. Optionally delete obsolete asset versions:
   cloudinary.uploader.destroy(<old_public_id>)
7. Deploy
```

The whole loop, once set up the first time, takes ~30 min for a media
refresh of 10–20 assets.

---

## 10. Anti-patterns to avoid

| Don't | Do |
|---|---|
| Commit raw mp4s / huge images to git | Keep them in gitignored `raw-assets/` |
| Ship a single resolution for an image | Use `srcSet` + Cloudinary width transforms |
| Hardcode `?w=600&q=80` once | Use `f_auto,q_auto,dpr_auto` and let Cloudinary decide |
| Embed YouTube iframes for autoplaying card backgrounds | Use HTML5 `<video>` from Cloudinary |
| Mount 20 autoplaying videos at hydration | Lazy-mount via IntersectionObserver |
| Fade poster on iframe `onLoad` | Fade poster on `<video>` `onPlaying` (first frame guaranteed) |
| Compress to `crf 30+` to save bytes | Stay at `crf 23–26`; let Cloudinary's `q_auto` do the final shave |
| Upload audio you'll mute | `ffmpeg -an` strips it; smaller file, faster start |
| Use a flat public_id like `hero` | Namespace: `<project>/<page>/<asset>` |
| Hand-delete in the Cloudinary dashboard | Use a script — auditable, repeatable |

---

## 11. Performance targets to verify after rollout

Use Chrome DevTools → Network → "Disable cache", filter to Media + Img:

| Metric | Acceptable | Notes |
|---|---|---|
| Hero image initial paint | < 200 ms LCP for foreground hero | Use `priority` / `fetchpriority="high"` for above-fold |
| Reel card mp4 first byte | < 400 ms TTFB to Cloudinary | `+faststart` ensures playback starts well before file end |
| Reel card payload | < 5 MB delivered | Check that `f_auto` is actually serving AV1/VP9, not mp4, in Chrome |
| Number of simultaneously autoplaying `<video>` | Up to ~25 has been verified smooth | Beyond that, lazy-mount throttling is essential |
| Lighthouse Best Practices | 100 / 100 | Cloudinary delivers correctly-sized images so no warnings here |

---

## 12. Working with Claude Code on this pattern

When dropping this file into a new project, the initial prompt to Claude
Code can be as terse as:

> "Set up the Cloudinary media pipeline per `docs/cloudinary-media-pipeline.md`.
> Cloud name is `<x>`, secrets are already in `.env`. Source assets are in
> `raw-assets/`. Use `<project-slug>` as the Cloudinary namespace.
> Build the `VideoBackground` component and the upload + compress scripts.
> Don't touch any existing code outside of the new files."

Claude Code can then read this file as its single source of truth for the
architecture, generate the boilerplate end-to-end, run the compression and
upload scripts, and integrate the component. The pattern transfers cleanly
between Next.js (App Router or Pages), Remix, Astro, and SvelteKit — only
the import paths and CSS module syntax change.
