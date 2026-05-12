/**
 * Generates src/app/(payload)/admin/importMap.js by walking our payload.config.js
 * and emitting an import statement per custom component referenced under
 * admin.components.{graphics,beforeDashboard,...}.
 *
 * We bypass Payload's bundled generator because (a) the v3.84 CLI crashes on
 * Next 16 due to a loadEnv mis-import, and (b) the bundled `generateImportMap`
 * helper in 3.84 mysteriously emits an empty map for our config shape. Writing
 * the file ourselves keeps it deterministic and easy to debug.
 *
 * Format the runtime expects:
 *   import { default as ID } from '<relative-path>'
 *   export const importMap = { "<payload-component-key>#default": ID }
 */
import fs from "node:fs/promises";
import path from "node:path";
import crypto from "node:crypto";
import { fileURLToPath } from "node:url";
import { config as loadDotenv } from "dotenv";

const __filename = fileURLToPath(import.meta.url);
const __dirname = path.dirname(__filename);
const ROOT = path.resolve(__dirname, "..");

loadDotenv({ path: path.join(ROOT, ".env.local") });
loadDotenv({ path: path.join(ROOT, ".env") });

const importMapFile = path.join(ROOT, "src/app/(payload)/admin/importMap.js");
const importMapDir = path.dirname(importMapFile);

// payload.config.js → `export default buildConfig(...)`. buildConfig returns
// a Promise in v3.84.
const loaded = (await import(path.join(ROOT, "payload.config.js"))).default;
const cfg = await Promise.resolve(loaded);

// Collect every PayloadComponent reference in the admin block. Each entry is
// either a string `<path>[#<exportName>]` or `{ path, exportName }`.
const found = []; // { component, raw }
const visit = (raw) => {
  if (!raw) return;
  if (Array.isArray(raw)) return raw.forEach(visit);
  found.push(raw);
};

const ac = cfg?.admin?.components || {};
visit(ac.graphics?.Logo);
visit(ac.graphics?.Icon);
visit(ac.Nav);
visit(ac.header);
visit(ac.logout?.Button);
visit(ac.settingsMenu);
visit(ac.actions);
visit(ac.afterDashboard);
visit(ac.afterLogin);
visit(ac.afterNav);
visit(ac.afterNavLinks);
visit(ac.beforeDashboard);
visit(ac.beforeLogin);
visit(ac.beforeNav);
visit(ac.beforeNavLinks);
visit(ac.providers);
if (ac.views) {
  for (const key in ac.views) visit(ac.views[key]?.Component);
}

const parsed = found
  .map((raw) => {
    const str = typeof raw === "string" ? raw : raw.path;
    if (!str) return null;
    let p = str;
    let exportName = "default";
    if (str.includes("#")) {
      const [a, b] = str.split("#", 2);
      p = a;
      exportName = b || "default";
    }
    if (typeof raw === "object" && raw.exportName) exportName = raw.exportName;
    return { path: p, exportName, key: `${p}#${exportName}` };
  })
  .filter(Boolean);

// De-duplicate by key (same component referenced twice = one import)
const uniq = Array.from(new Map(parsed.map((c) => [c.key, c])).values());

// Adjusted path = relative path from importMapDir to <baseDir>+<componentPath>
const baseDir = cfg?.admin?.importMap?.baseDir || ROOT;
const adjust = (p) => {
  const absoluteTarget = path.posix.join(baseDir.replace(/\\/g, "/"), p);
  let rel = path.posix.relative(importMapDir.replace(/\\/g, "/"), absoluteTarget);
  if (!rel.startsWith(".") && !rel.startsWith("/")) rel = `./${rel}`;
  return rel;
};

const idFor = (c) =>
  `${c.exportName}_${crypto.createHash("md5").update(c.path).digest("hex")}`;

const importLines = uniq
  .map((c) => `import { ${c.exportName} as ${idFor(c)} } from '${adjust(c.path)}'`)
  .join("\n");

const mapLines = uniq.map((c) => `  "${c.key}": ${idFor(c)}`).join(",\n");

const body = `${importLines}

/** @type import('payload').ImportMap */
export const importMap = {
${mapLines}
}
`;

await fs.mkdir(importMapDir, { recursive: true });
await fs.writeFile(importMapFile, body, "utf8");

console.log(`✓ Wrote ${importMapFile}`);
console.log(`  ${uniq.length} component(s):`);
for (const c of uniq) console.log(`  • ${c.key}  →  ${adjust(c.path)}`);
