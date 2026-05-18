/*
 * Compresses every raw home-page mp4 into a web-ready file under
 * raw-assets/compressed/. Recipe (chosen for "broadcast-quality at 1080p with
 * no audio, ready for HTML5 autoplay-on-view"):
 *
 *   -vf scale='min(1080,iw)':-2     cap long edge at 1080; -2 keeps even chroma
 *   -c:v libx264                    universal, every browser plays it
 *   -crf 23                         x264 default. Visually indistinguishable
 *                                   from source at normal viewing.
 *   -preset slow                    better compression vs encode time tradeoff
 *   -profile:v high -pix_fmt yuv420p  maximum compatibility (incl. Safari)
 *   -movflags +faststart            moov atom up front → starts playing
 *                                   before the file finishes downloading
 *   -an                             strip audio — we mute on the page anyway
 *
 * Outputs land at fixed slugged names so the upload script + the React code
 * have a stable contract:
 *
 *   raw-assets/compressed/
 *     showreel-hero.mp4
 *     featured-work-1.mp4
 *     reels/wk-17-launch-film-beauty.mp4
 *     reels/wk-16-tvc-automotive.mp4
 *     ...
 */
const { execFileSync } = require("child_process");
const fs = require("fs");
const path = require("path");

const ROOT = path.resolve(__dirname, "..");
const SRC = path.join(ROOT, "raw-assets", "HOME PAGE");
const OUT = path.join(ROOT, "raw-assets", "compressed");
const REELS_OUT = path.join(OUT, "reels");

const reel = (src, slug) => ({
  src: path.join(SRC, "6-10 Small Reel Cards", src),
  out: path.join(REELS_OUT, `${slug}.mp4`),
});

// Slug = local filename = Cloudinary public_id. The label mapping (which
// source file belongs to which on-page card) is editorial — the card labels
// in Showreel.js are decorative copy and can be moved around freely.
const JOBS = [
  {
    src: path.join(SRC, "HERO BANNER", "Teaser 02 in Landscape.mp4"),
    out: path.join(OUT, "showreel-hero.mp4"),
  },
  {
    src: path.join(SRC, "FEATURED WORK", "FEAUTRED WORK 1.mp4"),
    out: path.join(OUT, "featured-work-1.mp4"),
  },
  reel("Juice Cosmetic 11.mp4",                  "wk-17-launch-film-beauty"),
  reel("01 (2).mp4",                             "wk-16-tvc-automotive"),
  reel("Aincient Yogies (Amlaprash) Version 02.mp4", "wk-16-ugc-reel-fnb"),
  reel("02 (1).mp4",                             "wk-15-cgi-perfume"),
  reel("Divea final 01.mp4",                     "wk-15-shopify-launch"),
  reel("asmi final 02.mp4",                      "wk-14-performance-reel"),
  reel("Celeb Lips.mp4",                         "wk-14-identity-fashion"),
  reel("Juice Cosmetic 09.mp4",                  "wk-13-influencer-d2c"),
  reel("Juice Cosmetic 10.mp4",                  "wk-13-brand-film-lifestyle"),
  reel("honeysha final.mp4",                     "wk-12-social-reel-beauty"),
];

fs.mkdirSync(OUT, { recursive: true });
fs.mkdirSync(REELS_OUT, { recursive: true });

function bytes(n) {
  if (n < 1024) return `${n} B`;
  if (n < 1024 ** 2) return `${(n / 1024).toFixed(1)} KB`;
  if (n < 1024 ** 3) return `${(n / 1024 ** 2).toFixed(1)} MB`;
  return `${(n / 1024 ** 3).toFixed(2)} GB`;
}

function compress(src, out) {
  if (!fs.existsSync(src)) {
    console.warn(`SKIP — source missing: ${src}`);
    return;
  }
  if (fs.existsSync(out)) {
    console.log(`SKIP — already compressed: ${path.basename(out)} (${bytes(fs.statSync(out).size)})`);
    return;
  }
  const srcSize = fs.statSync(src).size;
  console.log(`\n→ ${path.basename(src)}  (${bytes(srcSize)})`);

  execFileSync(
    "ffmpeg",
    [
      "-hide_banner",
      "-loglevel", "error",
      "-y",
      "-i", src,
      "-vf", "scale='min(1080,iw)':-2",
      "-c:v", "libx264",
      "-crf", "23",
      "-preset", "slow",
      "-profile:v", "high",
      "-pix_fmt", "yuv420p",
      "-movflags", "+faststart",
      "-an",
      out,
    ],
    { stdio: "inherit" }
  );

  const outSize = fs.statSync(out).size;
  const ratio = ((1 - outSize / srcSize) * 100).toFixed(1);
  console.log(`  → ${path.basename(out)}  (${bytes(outSize)}, ${ratio}% smaller)`);
}

for (const j of JOBS) {
  compress(j.src, j.out);
}

console.log("\nDone.");
