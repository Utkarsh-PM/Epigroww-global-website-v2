/**
 * Server-only Payload client singleton.
 * Pattern lifted from the Payload v3 docs — caching the promise on globalThis
 * prevents Next.js dev's hot-reload from spinning up multiple DB connections.
 */
import "server-only";
import config from "../payload.config.js";
import { getPayload } from "payload";

const cached = globalThis.__epigrowwPayload ?? (globalThis.__epigrowwPayload = { client: null, init: null });

export async function getCms() {
  if (cached.client) return cached.client;
  if (!cached.init) cached.init = getPayload({ config });
  cached.client = await cached.init;
  return cached.client;
}

/**
 * Returns the displayable image URL for any field shape we use in the schemas.
 * Priority: a real Media upload → an `imageUrl` text fallback → null.
 */
export function imageOf(item, key = "image", urlKey = "imageUrl") {
  if (!item) return null;
  const upload = item[key];
  if (upload && typeof upload === "object" && upload.url) return upload.url;
  if (typeof item[urlKey] === "string" && item[urlKey].length) return item[urlKey];
  return null;
}
