import path from "path";
import { fileURLToPath } from "url";
import sharp from "sharp";
import { buildConfig } from "payload";
import { sqliteAdapter } from "@payloadcms/db-sqlite";
import { postgresAdapter } from "@payloadcms/db-postgres";
import { lexicalEditor } from "@payloadcms/richtext-lexical";
import { vercelBlobStorage } from "@payloadcms/storage-vercel-blob";

// Collections — lists of repeatable docs
import { Users } from "./src/payload/collections/Users.js";
import { Media } from "./src/payload/collections/Media.js";
import { Pillars } from "./src/payload/collections/Pillars.js";
import { WorkCases } from "./src/payload/collections/WorkCases.js";
import { Voices } from "./src/payload/collections/Voices.js";
import { Offices } from "./src/payload/collections/Offices.js";
import { OpenRoles } from "./src/payload/collections/OpenRoles.js";
import { Industries } from "./src/payload/collections/Industries.js";
import { FAQs } from "./src/payload/collections/FAQs.js";

// Globals — site-wide settings + one singleton per page
import { SiteSettings } from "./src/payload/globals/SiteSettings.js";
import { HomePage } from "./src/payload/globals/HomePage.js";
import { AboutPage } from "./src/payload/globals/AboutPage.js";
import { WorkPage } from "./src/payload/globals/WorkPage.js";
import { MediaSolutionsPage } from "./src/payload/globals/MediaSolutionsPage.js";
import { BrandSolutionsPage } from "./src/payload/globals/BrandSolutionsPage.js";
import { TechSolutionsPage } from "./src/payload/globals/TechSolutionsPage.js";
import { EcommerceSolutionsPage } from "./src/payload/globals/EcommerceSolutionsPage.js";
import { CareersPage } from "./src/payload/globals/CareersPage.js";
import { ContactPage } from "./src/payload/globals/ContactPage.js";

const __filename = fileURLToPath(import.meta.url);
const __dirname = path.dirname(__filename);

/**
 * Use Postgres (Neon / Vercel Postgres) when DATABASE_URL is set.
 * Fall back to a local SQLite file in dev so we can build everything
 * before provisioning the production DB.
 */
const db = process.env.DATABASE_URL
  ? postgresAdapter({
      pool: { connectionString: process.env.DATABASE_URL },
    })
  : sqliteAdapter({
      client: {
        url:
          process.env.SQLITE_URL ||
          `file:${path.resolve(__dirname, "payload-dev.db")}`,
      },
    });

export default buildConfig({
  routes: { admin: "/admin" },

  admin: {
    user: Users.slug,
    meta: { titleSuffix: " — Epigroww CMS" },
    importMap: { baseDir: __dirname },
  },

  collections: [
    Users,
    Media,
    Pillars,
    WorkCases,
    Voices,
    Offices,
    OpenRoles,
    Industries,
    FAQs,
  ],

  globals: [
    SiteSettings,
    HomePage,
    AboutPage,
    WorkPage,
    MediaSolutionsPage,
    BrandSolutionsPage,
    TechSolutionsPage,
    EcommerceSolutionsPage,
    CareersPage,
    ContactPage,
  ],

  db,
  editor: lexicalEditor({}),

  // Used by Media for image resizing into thumbnail/card/hero variants
  sharp,

  secret: process.env.PAYLOAD_SECRET || "dev-only-secret-replace-in-prod",

  // Plugins
  plugins: [
    ...(process.env.BLOB_READ_WRITE_TOKEN
      ? [
          vercelBlobStorage({
            collections: { media: true },
            token: process.env.BLOB_READ_WRITE_TOKEN,
          }),
        ]
      : []),
  ],
});
