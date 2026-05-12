/**
 * Inject `name: "<slug>"` into every `label: "..."` tab definition across our
 * Payload page globals so each tab namespaces its fields and avoids
 * "DuplicateFieldName" errors on globals with repeated section labels.
 */
import fs from "node:fs/promises";
import path from "node:path";

const FILES = [
  "src/payload/globals/HomePage.js",
  "src/payload/globals/AboutPage.js",
  "src/payload/globals/WorkPage.js",
  "src/payload/globals/CareersPage.js",
  "src/payload/globals/ContactPage.js",
];

const slug = (s) =>
  s
    .replace(/[^a-zA-Z0-9 ]+/g, "")
    .trim()
    .split(/\s+/)
    .map((w, i) =>
      i === 0
        ? w.toLowerCase()
        : w.charAt(0).toUpperCase() + w.slice(1).toLowerCase(),
    )
    .join("");

for (const rel of FILES) {
  const file = path.resolve(rel);
  const src = await fs.readFile(file, "utf8");

  // Match the pattern: {<whitespace>label: "<Label>",<whitespace>fields: [
  // and inject a `name: "<slug>",` right after the opening `{`.
  // This is safe because in our schemas only tab objects start a literal
  // `{ label: "...", fields: [...] }` pattern at indent 6 (inside `tabs: [`).
  const re = /(\{\s*)label:\s*"([^"]+)",(\s+fields:)/g;

  const out = src.replace(re, (_match, lead, label, after) => {
    const name = slug(label);
    return `${lead}name: "${name}",\n        label: "${label}",${after}`;
  });

  if (out !== src) {
    await fs.writeFile(file, out, "utf8");
    console.log(`✓ patched ${rel}`);
  } else {
    console.log(`· no change ${rel}`);
  }
}
