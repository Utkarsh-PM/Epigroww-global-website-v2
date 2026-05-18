/*
 * One-shot uploader for the founder portrait used in the Manifesto / Philosophy
 * section. Lives under a dedicated `epigroww-global-website/` namespace so it
 * cannot collide with assets owned by other projects sharing this Cloudinary
 * account. Safe to re-run — uses `overwrite: true` on the same public_id.
 */
const path = require("path");
const cloudinary = require("cloudinary").v2;

// Load env from .env (the repo uses a single .env, not .env.local).
require("dotenv").config({ path: path.resolve(__dirname, "..", ".env") });

cloudinary.config({
  cloud_name: process.env.CLOUDINARY_CLOUD_NAME,
  api_key: process.env.CLOUDINARY_API_KEY,
  api_secret: process.env.CLOUDINARY_API_SECRET,
});

async function main() {
  const file = path.resolve(
    __dirname,
    "..",
    "raw-assets",
    "HOME PAGE",
    "FOUNDER IMAGE .png"
  );
  const folder = "epigroww-global-website/home";
  const public_id = "founder-portrait";

  const res = await cloudinary.uploader.upload(file, {
    folder,
    public_id,
    resource_type: "image",
    overwrite: true,
    unique_filename: false,
    use_filename: false,
  });

  console.log("Uploaded:", res.secure_url);
  console.log("public_id:", res.public_id);
}

main().catch((err) => {
  console.error(err);
  process.exit(1);
});
