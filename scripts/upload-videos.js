/*
 * Uploads every compressed video under raw-assets/compressed/ to Cloudinary.
 * Folder layout under the shared Cloudinary account is namespaced so it
 * cannot collide with assets owned by other projects:
 *
 *   epigroww-global-website/home/showreel-hero
 *   epigroww-global-website/home/featured/featured-work-1
 *   epigroww-global-website/home/reels/wk-17-launch-film-beauty
 *   ...
 *
 * Safe to re-run — uses overwrite + a fixed public_id per file.
 */
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
const COMPRESSED = path.join(ROOT, "raw-assets", "compressed");
const BASE_FOLDER = "epigroww-global-website/home";

const job = (localFile, folder, publicId) => ({
  file: path.join(COMPRESSED, localFile),
  folder,
  public_id: publicId,
});

const JOBS = [
  job("showreel-hero.mp4",   BASE_FOLDER,                  "showreel-hero"),
  job("featured-work-1.mp4", `${BASE_FOLDER}/featured`,    "featured-work-1"),
  job("reels/wk-17-launch-film-beauty.mp4",     `${BASE_FOLDER}/reels`, "wk-17-launch-film-beauty"),
  job("reels/wk-16-tvc-automotive.mp4",         `${BASE_FOLDER}/reels`, "wk-16-tvc-automotive"),
  job("reels/wk-16-ugc-reel-fnb.mp4",           `${BASE_FOLDER}/reels`, "wk-16-ugc-reel-fnb"),
  job("reels/wk-15-cgi-perfume.mp4",            `${BASE_FOLDER}/reels`, "wk-15-cgi-perfume"),
  job("reels/wk-15-shopify-launch.mp4",         `${BASE_FOLDER}/reels`, "wk-15-shopify-launch"),
  job("reels/wk-14-performance-reel.mp4",       `${BASE_FOLDER}/reels`, "wk-14-performance-reel"),
  job("reels/wk-14-identity-fashion.mp4",       `${BASE_FOLDER}/reels`, "wk-14-identity-fashion"),
  job("reels/wk-13-influencer-d2c.mp4",         `${BASE_FOLDER}/reels`, "wk-13-influencer-d2c"),
  job("reels/wk-13-brand-film-lifestyle.mp4",   `${BASE_FOLDER}/reels`, "wk-13-brand-film-lifestyle"),
  job("reels/wk-12-social-reel-beauty.mp4",     `${BASE_FOLDER}/reels`, "wk-12-social-reel-beauty"),
];

async function uploadOne(j) {
  if (!fs.existsSync(j.file)) {
    console.warn(`SKIP — missing: ${j.file}`);
    return null;
  }
  const sizeMB = (fs.statSync(j.file).size / 1024 / 1024).toFixed(1);
  process.stdout.write(`→ ${path.basename(j.file)} (${sizeMB} MB) ... `);
  const res = await cloudinary.uploader.upload_large(j.file, {
    folder: j.folder,
    public_id: j.public_id,
    resource_type: "video",
    overwrite: true,
    unique_filename: false,
    use_filename: false,
    chunk_size: 20 * 1024 * 1024, // 20MB chunks for reliability
  });
  console.log("OK");
  console.log(`   public_id: ${res.public_id}`);
  return res;
}

(async () => {
  for (const j of JOBS) {
    try {
      await uploadOne(j);
    } catch (err) {
      console.error(`FAIL — ${j.public_id}:`, err.message || err);
      process.exitCode = 1;
    }
  }
  console.log("\nDone.");
})();
