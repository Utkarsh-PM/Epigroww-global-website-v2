/**
 * Resets the password for utkarsh@epigrowwglobal.com using Payload's local API.
 * Usage: node scripts/reset-admin-password.mjs [optional-password]
 */
import path from "node:path";
import { fileURLToPath } from "node:url";
import crypto from "node:crypto";
import { config as loadDotenv } from "dotenv";
import { getPayload } from "payload";

const __filename = fileURLToPath(import.meta.url);
const __dirname = path.dirname(__filename);
const ROOT = path.resolve(__dirname, "..");

loadDotenv({ path: path.join(ROOT, ".env.local") });
loadDotenv({ path: path.join(ROOT, ".env") });

const EMAIL = "utkarsh@epigrowwglobal.com";
const NEW_PASSWORD = process.argv[2] || crypto.randomBytes(10).toString("base64url");

const config = (await import(path.join(ROOT, "payload.config.js"))).default;
const payload = await getPayload({ config });

const { docs } = await payload.find({
  collection: "users",
  where: { email: { equals: EMAIL } },
  limit: 1,
});

if (!docs.length) {
  console.error(`✗ No user found with email ${EMAIL}`);
  process.exit(1);
}

await payload.update({
  collection: "users",
  id: docs[0].id,
  data: { password: NEW_PASSWORD },
});

console.log("\n════════════════════════════════════════════════════════════════");
console.log("  ADMIN — http://localhost:3055/admin");
console.log(`  Email:    ${EMAIL}`);
console.log(`  Password: ${NEW_PASSWORD}`);
console.log("════════════════════════════════════════════════════════════════\n");

process.exit(0);
