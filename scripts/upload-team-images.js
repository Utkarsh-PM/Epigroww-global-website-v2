/*
 * Uploads the About → People portrait set to Cloudinary under
 *   epigroww-global-website/about/team/<slug>
 *
 * Each source is already a pre-designed 1:1 card (photo + name + role + logo
 * baked in), well under Cloudinary's 10 MB image cap, so no compression step
 * is needed. Safe to re-run — uses overwrite + fixed public_id per file.
 */
const path = require("path");
const cloudinary = require("cloudinary").v2;
require("dotenv").config({ path: path.resolve(__dirname, "..", ".env") });

cloudinary.config({
  cloud_name: process.env.CLOUDINARY_CLOUD_NAME,
  api_key: process.env.CLOUDINARY_API_KEY,
  api_secret: process.env.CLOUDINARY_API_SECRET,
});

const ROOT = path.resolve(__dirname, "..");
const SRC = path.join(ROOT, "raw-assets", "IMAGES");
const FOLDER = "epigroww-global-website/about/team";

// Source filename → on-Cloudinary public_id slug. Slug is kebab-case of the
// person's name; Team.js references it.
const JOBS = [
  { file: "danish sir.png",    slug: "danish-abbasi" },
  { file: "AVI SIR.png",       slug: "avi-madan-sharma" },
  { file: "SANDEEP SIR.png",   slug: "sandeep-arora" },
  { file: "GAURI MAM.png",     slug: "gauri-malhotra" },
  { file: "TANUSH.png",        slug: "tanush-puri" },
  { file: "PASSI SIR.png",     slug: "abhishek-passi" },
  { file: "RAJVANSHI SIR.png", slug: "abhishek-rajvanshi" },
  { file: "AKSHAY SIR.png",    slug: "akshay-wadhwa" },
  { file: "UTKARSH SIR.png",   slug: "utkarsh-chandna" },
  { file: "VISHAL SIR.png",    slug: "vishal-kumar" },
  { file: "ARKALA.png",        slug: "arkalal-chakravarty" },
  { file: "ANUJ.png",          slug: "anuj-khirwar" },
];

(async () => {
  for (const j of JOBS) {
    const full = path.join(SRC, j.file);
    process.stdout.write(`→ ${j.file} → ${j.slug} ... `);
    try {
      const res = await cloudinary.uploader.upload(full, {
        folder: FOLDER,
        public_id: j.slug,
        resource_type: "image",
        overwrite: true,
        unique_filename: false,
        use_filename: false,
      });
      console.log("OK");
      console.log(`   ${res.secure_url}`);
    } catch (err) {
      console.error("FAIL —", err.message || err);
      process.exitCode = 1;
    }
  }
  console.log("\nDone.");
})();
