// Public Cloudinary cloud name. Safe to embed; the secret API key never leaves
// the server. Other projects share this account, so every public_id we create
// is namespaced under `epigroww-global-website/...`.
export const CLOUDINARY_CLOUD_NAME =
  process.env.NEXT_PUBLIC_CLOUDINARY_CLOUD_NAME || "dsauqv4va";

export function getCloudinaryUrl(publicId, opts = {}) {
  if (!publicId) return "";
  const {
    width,
    height,
    quality = "auto",
    format = "auto",
    crop = "fill",
    gravity,
    dpr = "auto",
  } = opts;

  const parts = [`f_${format}`, `q_${quality}`, `dpr_${dpr}`];
  if (crop) parts.push(`c_${crop}`);
  if (gravity) parts.push(`g_${gravity}`);
  if (width) parts.push(`w_${width}`);
  if (height) parts.push(`h_${height}`);

  return `https://res.cloudinary.com/${CLOUDINARY_CLOUD_NAME}/image/upload/${parts.join(",")}/${publicId}`;
}
