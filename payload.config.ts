import path from "path";
import { fileURLToPath } from "url";
import { buildConfig } from "payload";
import { sqliteAdapter } from "@payloadcms/db-sqlite";
import { postgresAdapter } from "@payloadcms/db-postgres";
import { lexicalEditor } from "@payloadcms/richtext-lexical";
import { vercelBlobStorage } from "@payloadcms/storage-vercel-blob";

import { Users } from "./src/payload/collections/Users";
import { Media } from "./src/payload/collections/Media";
import { SiteSettings } from "./src/payload/globals/SiteSettings";

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
        url: process.env.SQLITE_URL || `file:${path.resolve(__dirname, "payload-dev.db")}`,
      },
    });

export default buildConfig({
  // Where the admin UI lives
  routes: { admin: "/admin" },

  // Admin UI customisation
  admin: {
    user: Users.slug,
    meta: {
      titleSuffix: " — Epigroww CMS",
    },
  },

  // Collections (lists of editable docs)
  collections: [Users, Media],

  // Globals (singletons — one doc per slug)
  globals: [SiteSettings],

  // Database
  db,

  // Rich text editor used inside content fields
  editor: lexicalEditor({}),

  // Where Payload writes generated TS types
  typescript: {
    outputFile: path.resolve(__dirname, "src/payload/payload-types.ts"),
  },

  // Auth secret — required. Set in .env.local locally and Vercel env in prod.
  secret: process.env.PAYLOAD_SECRET || "dev-only-secret-replace-in-prod",

  // File storage. Use Vercel Blob in prod; falls back to local filesystem in dev.
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
