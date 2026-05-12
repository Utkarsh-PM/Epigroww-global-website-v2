/**
 * Media library — all uploaded images and videos.
 * Stored on Vercel Blob in production, local filesystem in dev.
 */
export const Media = {
  slug: "media",
  access: { read: () => true },
  upload: {
    mimeTypes: ["image/*", "video/*"],
    imageSizes: [
      { name: "thumbnail", width: 400, height: 400, position: "centre" },
      { name: "card", width: 900, height: 600, position: "centre" },
      { name: "hero", width: 1920, height: 1080, position: "centre" },
    ],
  },
  admin: {
    group: "Media",
    description: "Upload images and videos here, then reference them from any page.",
  },
  fields: [
    {
      name: "alt",
      type: "text",
      required: true,
      admin: { description: "Short description for screen readers and SEO." },
    },
    {
      name: "caption",
      type: "text",
      admin: { description: "Optional caption shown alongside the asset." },
    },
  ],
};
