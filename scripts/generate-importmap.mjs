/**
 * Generates src/app/(payload)/admin/importMap.js by calling Payload's
 * generateImportMap directly. Bypasses `payload generate:importmap` because
 * Payload v3.84's CLI crashes on Next 16 (its loadEnv.js mis-imports
 * @next/env's default export which Next 16 no longer ships).
 *
 * Writes a complete importMap file that maps every "string path" reference
 * in our Payload config (built-in admin components + any custom ones) to a
 * real import + identifier.
 */
import fs from "node:fs/promises";
import path from "node:path";
import { fileURLToPath } from "node:url";
import { config as loadDotenv } from "dotenv";
import { generateImportMap, sanitizeConfig } from "payload";

const __filename = fileURLToPath(import.meta.url);
const __dirname = path.dirname(__filename);
const ROOT = path.resolve(__dirname, "..");

loadDotenv({ path: path.join(ROOT, ".env.local") });
loadDotenv({ path: path.join(ROOT, ".env") });

const outFile = path.join(ROOT, "src/app/(payload)/admin/importMap.js");
const cwd = ROOT;

// Load the user-authored config and sanitize it the way Payload does at boot
const userConfig = (await import(path.join(ROOT, "payload.config.js"))).default;
const sanitized = await sanitizeConfig(userConfig);

// Pass the SANITIZED config positionally — Payload v3.84 signature is
// generateImportMap(config, options).
const result = await generateImportMap(sanitized, { log: true });

// generateImportMap returns { imports, importMap, generatedImportMapText }
// where generatedImportMapText is the full JS module body. Write it.
const body =
  result?.generatedImportMapText ||
  // Fallback: build minimal text if newer Payload returns a different shape
  buildModuleText(result?.imports || {}, result?.importMap || {});

await fs.writeFile(outFile, body, "utf8");

const lineCount = body.split("\n").length;
console.log(`✓ Wrote ${outFile} (${lineCount} lines)`);

function buildModuleText(imports, importMap) {
  const importLines = Object.entries(imports || {})
    .map(([id, spec]) => `import { ${spec.specifier} as ${id} } from "${spec.path}";`)
    .join("\n");
  const mapLines = Object.entries(importMap || {})
    .map(([k, v]) => `  "${k}": ${v},`)
    .join("\n");
  return `${importLines}\n\nexport const importMap = {\n${mapLines}\n};\n`;
}
