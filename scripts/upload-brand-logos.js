/*
 * Fetches each client brand's logo from its official source, saves a local
 * copy under raw-assets/HOME PAGE/brands/ (gitignored), then uploads to
 * Cloudinary at epigroww-global-website/home/brands/<slug>.
 *
 * Drives the marquee in components/home/BrandMarquee.js. Safe to re-run —
 * each upload uses overwrite + a fixed public_id.
 */
const fs = require("fs");
const path = require("path");
const https = require("https");
const cloudinary = require("cloudinary").v2;
require("dotenv").config({ path: path.resolve(__dirname, "..", ".env") });

cloudinary.config({
  cloud_name: process.env.CLOUDINARY_CLOUD_NAME,
  api_key: process.env.CLOUDINARY_API_KEY,
  api_secret: process.env.CLOUDINARY_API_SECRET,
});

const ROOT = path.resolve(__dirname, "..");
const LOCAL_DIR = path.join(ROOT, "raw-assets", "HOME PAGE", "brands");
const CLOUDINARY_FOLDER = "epigroww-global-website/home/brands";

// Per-brand logo source. URLs were validated to return a real image (200,
// content-type image/*, > 1 KB) at the time of authoring. If a source ever
// goes dead, re-run after updating just that entry.
const JOBS = [
  { slug: "times-group",                name: "Times Group",                url: "https://upload.wikimedia.org/wikipedia/en/5/5b/The_Times_Group_logo.png" },
  { slug: "marico",                     name: "Marico",                     url: "https://upload.wikimedia.org/wikipedia/en/9/90/Marico_Logo.svg" },
  { slug: "reliance-fresh-pik",         name: "Reliance Fresh Pik",         url: "https://www.relianceretail.com/img/brands/larg/freshpik-logo.jpg" },
  { slug: "red-chief",                  name: "Red Chief",                  url: "https://redchief.in/cdn/shop/files/Logo.png?v=1758126959&width=600" },
  { slug: "two-brothers-organic-farms", name: "Two Brothers Organic Farms", url: "https://twobrothersindiashop.com/cdn/shop/files/2020_12_01_TBOF_LOGO-13_1_b2ec8ed6-dce3-4ecf-a157-fabae9f654ac.png?v=1766753727&width=600" },
  { slug: "the-man-company",            name: "The Man Company",            url: "https://www.themancompany.com/cdn/shop/files/logo_08a2688e-7c47-4081-a0e8-942d40f74a6d.png?v=1663137227&width=600" },
  { slug: "brillare",                   name: "Brillare",                   url: "https://www.brillare.co.in/cdn/shop/files/logo.svg?v=1719305859" },
  { slug: "beardo",                     name: "Beardo",                     url: "https://beardo.in/cdn/shop/files/beardo_logo_white_png_1.png?v=1679998281" },
  { slug: "just-herbs",                 name: "Just Herbs",                 url: "https://www.justherbs.in/cdn/shop/files/Logo_JH_88939a9a-7e44-45b3-b819-298b0ad23559.png?v=1773119633" },
  { slug: "radio-mirchi",               name: "Radio Mirchi",               url: "https://mirchi.com/os/cdn/content/images/public/logos/logo-w.png" },
  { slug: "armaf",                      name: "Armaf",                      url: "https://armaf.com/cdn/shop/files/Armaf_Black_Logo-removebg-preview_1.png?v=1765219631&width=500" },
  { slug: "hira-fragrances",            name: "Hira Fragrances",            url: "https://hirafragrances.com/cdn/shop/files/HIRA_Logo8.png?v=1742968866" },
  { slug: "the-pink-foundry",           name: "The Pink Foundry",           url: "https://www.thepinkfoundry.com/cdn/shop/files/TPF_Logo.png?v=1653462544&width=1024" },
  { slug: "dream-beauty",               name: "Dream Beauty",               url: "https://dreambeauty.com/logo.png" },
  { slug: "ozone-ayurvedics",           name: "Ozone Ayurvedics",           url: "https://www.ozoneayurvedics.com/cdn/shop/files/Group_7_2x_07c4dde1-3f4d-4e8a-9b6d-65de41176b9e.png?v=1660120258&width=320" },
  { slug: "rivona-naturals",            name: "Rivona Naturals",            url: "https://rivona.in/cdn/shop/files/Rivona_Logo.png?v=1728025888&width=600" },
  { slug: "rubys-organics",             name: "Ruby's Organics",            url: "https://rubyorganics.com/cdn/shop/files/logo.jpg?v=1613522658" },
  { slug: "mitchell-usa",               name: "Mitchell USA",               url: "https://www.mitchellusa.co.in/cdn/shop/files/mitchell_usa_logo_4000x4000-removebg1.png?v=1668146179&width=600" },
  { slug: "namaste-india",              name: "Namaste India",              url: "https://www.namasteindia.in/wp-content/uploads/2025/05/Namaste-India-Logo.png" },
  { slug: "juice-cosmetics",            name: "Juice Cosmetics",            url: "https://juicecosmetics.in/cdn/shop/files/color_logo_medium.svg?v=1745316221" },
  { slug: "bioderma",                   name: "Bioderma",                   url: "https://upload.wikimedia.org/wikipedia/commons/7/7b/Bioderma_logo.svg" },
  { slug: "blue-tribe-foods",           name: "Blue Tribe Foods",           url: "https://www.bluetribefoods.com/cdn/shop/files/LOGO_text_0388606f-7168-4aac-b5bf-7ba73ce932f9.png?v=1620275756" },
  { slug: "klaw-snacks",                name: "Klaw Snacks",                url: "https://getklaw.com/cdn/shop/files/klaw_Text_Logo.png?v=1768812812&width=600" },
  { slug: "kt-professional",            name: "KT Professional",            url: "https://ktlife.in/cdn/shop/files/Untitled_design_22.png?v=1778656538&width=500" },
  { slug: "himalaya-wellness",          name: "Himalaya Wellness",          url: "https://upload.wikimedia.org/wikipedia/commons/c/c0/The_Himalaya_Drug_Company_logo.svg" },
  { slug: "reliance-trends",            name: "Reliance Trends",            url: "https://cdn.fynd.com/v2/falling-surf-7c8bb8/fyprod/wrkr/company/4835/applications/646f16ecacf6d0900a166cc6/application/pictures/free-logo/original/pe0vCgexQ-RELIANCE-TRENDS.png" },
];

function extFromContentType(ct) {
  if (!ct) return "bin";
  if (ct.includes("svg")) return "svg";
  if (ct.includes("png")) return "png";
  if (ct.includes("jpeg") || ct.includes("jpg")) return "jpg";
  if (ct.includes("webp")) return "webp";
  if (ct.includes("gif")) return "gif";
  return "bin";
}

function download(url, destPath, { maxRedirects = 5 } = {}) {
  return new Promise((resolve, reject) => {
    function get(u, hops) {
      https
        .get(u, { headers: { "User-Agent": "Mozilla/5.0 brand-logo-fetcher" } }, (res) => {
          if (
            (res.statusCode === 301 || res.statusCode === 302 || res.statusCode === 303 || res.statusCode === 307 || res.statusCode === 308) &&
            res.headers.location
          ) {
            if (hops <= 0) return reject(new Error("Too many redirects"));
            const next = new URL(res.headers.location, u).toString();
            res.resume();
            return get(next, hops - 1);
          }
          if (res.statusCode !== 200) {
            res.resume();
            return reject(new Error(`HTTP ${res.statusCode} for ${u}`));
          }
          const ext = extFromContentType(res.headers["content-type"]);
          const finalPath = `${destPath}.${ext}`;
          const tmp = `${finalPath}.part`;
          const out = fs.createWriteStream(tmp);
          res.pipe(out);
          out.on("finish", () =>
            out.close(() => {
              fs.renameSync(tmp, finalPath);
              resolve({ path: finalPath, ext, bytes: fs.statSync(finalPath).size });
            })
          );
          out.on("error", (e) => {
            try { fs.unlinkSync(tmp); } catch {}
            reject(e);
          });
        })
        .on("error", reject);
    }
    get(url, maxRedirects);
  });
}

(async () => {
  fs.mkdirSync(LOCAL_DIR, { recursive: true });

  const results = [];
  for (const j of JOBS) {
    const base = path.join(LOCAL_DIR, j.slug);
    process.stdout.write(`→ ${j.name.padEnd(28)} `);
    try {
      // Remove any previous variant of this slug so the new ext is canonical.
      for (const e of ["svg", "png", "jpg", "jpeg", "webp", "gif", "bin"]) {
        const p = `${base}.${e}`;
        if (fs.existsSync(p)) fs.unlinkSync(p);
      }

      const dl = await download(j.url, base);
      process.stdout.write(`dl ${dl.ext} ${(dl.bytes / 1024).toFixed(1)}KB ... `);

      const res = await cloudinary.uploader.upload(dl.path, {
        folder: CLOUDINARY_FOLDER,
        public_id: j.slug,
        resource_type: "image",
        overwrite: true,
        unique_filename: false,
        use_filename: false,
      });
      console.log("OK");
      results.push({ slug: j.slug, name: j.name, public_id: res.public_id, format: res.format, w: res.width, h: res.height, url: res.secure_url });
    } catch (err) {
      console.log("FAIL —", err.message || err);
      results.push({ slug: j.slug, name: j.name, error: String(err.message || err) });
      process.exitCode = 1;
    }
  }

  console.log("\nSummary:");
  for (const r of results) {
    if (r.error) console.log(`  ✗ ${r.name}: ${r.error}`);
    else console.log(`  ✓ ${r.name} (${r.format} ${r.w}x${r.h}) ${r.public_id}`);
  }
})();
