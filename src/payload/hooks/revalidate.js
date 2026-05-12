/**
 * Shared Payload afterChange hook → revalidates one or more Next.js paths
 * the moment an editor clicks Save. Combined with each page's
 * `export const revalidate = 60`, this gives both instant updates AND a
 * safety net.
 *
 * `next/cache` is imported dynamically because Payload's importMap generator
 * (and any other plain-Node script that loads the config) doesn't run inside
 * a Next.js context — a static `import` would crash at module-load time.
 *
 * Usage in a global:
 *   hooks: { afterChange: [revalidate(["/"])] }
 *
 * Usage in a collection:
 *   hooks: { afterChange: [revalidate(["/", "/work"])] }
 */
export const revalidate = (paths) => async () => {
  try {
    const { revalidatePath } = await import("next/cache");
    for (const p of paths) {
      try {
        revalidatePath(p);
      } catch {
        // Outside a request scope (e.g. CLI seed) — silently fall back to ISR
      }
    }
  } catch {
    // next/cache not loadable (also fine — ISR will catch up within 60s)
  }
};
