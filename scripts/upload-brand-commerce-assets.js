/*
 * One-shot uploader for the May-22 brand / commerce / featured-work refresh.
 *
 * Compresses raw videos with the same ffmpeg recipe as scripts/compress-videos.js
 * (1080p cap, libx264 CRF 23, faststart, no audio) into raw-assets/compressed/,
 * then uploads compressed videos and raw images to Cloudinary under stable
 * public_ids that the components reference.
 *
 * Re-running is safe: ffmpeg skips already-compressed files, and Cloudinary
 * upload uses overwrite + fixed public_id.
 */
const { execFileSync } = require("child_process");
const fs = require("fs");
const path = require("path");
const cloudinary = require("cloudinary").v2;
require("dotenv").config({ path: path.resolve(__dirname, "..", ".env") });

cloudinary.config({
  cloud_name: process.env.CLOUDINARY_CLOUD_NAME,
  api_key: process.env.CLOUDINARY_API_KEY,
  api_secret: process.env.CLOUDINARY_API_SECRET,
});

const ROOT = path.resolve(__dirname, "..");
const RAW = path.join(ROOT, "raw-assets");
const OUT = path.join(RAW, "compressed");

fs.mkdirSync(OUT, { recursive: true });

function bytes(n) {
  if (n < 1024) return `${n} B`;
  if (n < 1024 ** 2) return `${(n / 1024).toFixed(1)} KB`;
  if (n < 1024 ** 3) return `${(n / 1024 ** 2).toFixed(1)} MB`;
  return `${(n / 1024 ** 3).toFixed(2)} GB`;
}

function compress(src, outFile) {
  if (!fs.existsSync(src)) { console.warn(`SKIP — missing source: ${src}`); return false; }
  fs.mkdirSync(path.dirname(outFile), { recursive: true });
  if (fs.existsSync(outFile)) {
    console.log(`SKIP — already compressed: ${path.basename(outFile)} (${bytes(fs.statSync(outFile).size)})`);
    return true;
  }
  const srcSize = fs.statSync(src).size;
  console.log(`→ compressing ${path.basename(src)} (${bytes(srcSize)})`);
  execFileSync("ffmpeg", [
    "-hide_banner", "-loglevel", "error", "-y",
    "-i", src,
    "-vf", "scale='min(1080,iw)':-2",
    "-c:v", "libx264", "-crf", "23", "-preset", "slow",
    "-profile:v", "high", "-pix_fmt", "yuv420p",
    "-movflags", "+faststart", "-an",
    outFile,
  ], { stdio: "inherit" });
  const outSize = fs.statSync(outFile).size;
  const ratio = ((1 - outSize / srcSize) * 100).toFixed(1);
  console.log(`   → ${path.basename(outFile)} (${bytes(outSize)}, ${ratio}% smaller)`);
  return true;
}

const VIDEO_JOBS = [
  { src: path.join(RAW, "BRAND", "BRAND 3.mp4"),       out: "brand/showreel-hero.mp4",          publicId: "epigroww-global-website/brand-solutions/showreel-hero" },
  { src: path.join(RAW, "BRAND", "BRAND 1.mp4"),       out: "brand/full-funnel.mp4",            publicId: "epigroww-global-website/brand-solutions/op-full-funnel" },
  { src: path.join(RAW, "BRAND 2", "TVC.mp4"),         out: "brand/tvc.mp4",                    publicId: "epigroww-global-website/brand-solutions/card-tvc" },
  { src: path.join(RAW, "BRAND 2", "AI VIDEO.mp4"),    out: "brand/creative-top.mp4",           publicId: "epigroww-global-website/brand-solutions/op-creative-top" },
  { src: path.join(RAW, "FEAUTRED WORK 2.mp4"),        out: "featured/featured-work-2.mp4",     publicId: "epigroww-global-website/home/featured/featured-work-2" },
  { src: path.join(RAW, "COMMERCE", "infinity reel.mp4"), out: "commerce/strategy-infinity.mp4", publicId: "epigroww-global-website/ecommerce/strategy-infinity" },
];

const IMAGE_JOBS = [
  { src: path.join(RAW, "BRAND 2", "banner.png"),     publicId: "epigroww-global-website/brand-solutions/card-identity" },
  { src: path.join(RAW, "BRAND 2", "SOCIAL.png"),     publicId: "epigroww-global-website/brand-solutions/card-social" },
  { src: path.join(RAW, "BRAND 2", "SKU LIDES.png"),  publicId: "epigroww-global-website/brand-solutions/card-packaging" },
  { src: path.join(RAW, "FAETURED WORK 4.jpg"),       publicId: "epigroww-global-website/home/featured/featured-work-4" },
  { src: path.join(RAW, "BRAND", "about us.png"),     publicId: "epigroww-global-website/about/about-us" },
  // Commerce logos — slugs match the existing home/brands convention.
  // We reuse existing home/brands/{juice-cosmetics,mitchell-usa} where the source already lives there.
  { src: path.join(RAW, "COMMERCE", "LOGOS", "ACTIHERBZZ.png"),     publicId: "epigroww-global-website/ecommerce/brands/actiherbzz" },
  { src: path.join(RAW, "COMMERCE", "LOGOS", "CFS PERFUMES.png"),   publicId: "epigroww-global-website/ecommerce/brands/cfs-perfumes" },
  { src: path.join(RAW, "COMMERCE", "LOGOS", "EZE PERFUMES.png"),   publicId: "epigroww-global-website/ecommerce/brands/eze-perfumes" },
  { src: path.join(RAW, "COMMERCE", "LOGOS", "INFINITY.png"),       publicId: "epigroww-global-website/ecommerce/brands/infinity" },
  { src: path.join(RAW, "COMMERCE", "LOGOS", "SKINOIVATE.png"),     publicId: "epigroww-global-website/ecommerce/brands/skinoivate" },
  { src: path.join(RAW, "COMMERCE", "LOGOS", "SUNKEY.png"),         publicId: "epigroww-global-website/ecommerce/brands/sunkey" },
  { src: path.join(RAW, "COMMERCE", "LOGOS", "peter.png"),          publicId: "epigroww-global-website/ecommerce/brands/peter" },
];

async function uploadVideo(j) {
  const compressed = path.join(OUT, j.out);
  const ok = compress(j.src, compressed);
  if (!ok) return;
  process.stdout.write(`↑ video ${j.publicId} ... `);
  const res = await cloudinary.uploader.upload_large(compressed, {
    public_id: j.publicId,
    resource_type: "video",
    overwrite: true,
    unique_filename: false,
    use_filename: false,
    chunk_size: 20 * 1024 * 1024,
  });
  console.log(`OK (${res.bytes ? bytes(res.bytes) : ""})`);
}

async function uploadImage(j) {
  if (!fs.existsSync(j.src)) { console.warn(`SKIP — missing image: ${j.src}`); return; }
  process.stdout.write(`↑ image ${j.publicId} ... `);
  const res = await cloudinary.uploader.upload(j.src, {
    public_id: j.publicId,
    resource_type: "image",
    overwrite: true,
    unique_filename: false,
    use_filename: false,
  });
  console.log(`OK (${res.bytes ? bytes(res.bytes) : ""})`);
}

(async () => {
  for (const j of VIDEO_JOBS) {
    try { await uploadVideo(j); }
    catch (e) { console.error(`FAIL video ${j.publicId}:`, e.message || JSON.stringify(e)); process.exitCode = 1; }
  }
  for (const j of IMAGE_JOBS) {
    try { await uploadImage(j); }
    catch (e) { console.error(`FAIL image ${j.publicId}:`, e.message || JSON.stringify(e)); process.exitCode = 1; }
  }
  console.log("\nDone.");
})();
