# Cloudinary Image Management — Full Implementation Plan

**Created:** 2026-03-27
**Last Updated:** 2026-03-27
**Status:** Planned (Not yet implemented)

---

## Overview

A complete end-to-end workflow for managing website images:

1. **Receive** raw images from the client (stored in a root folder in the codebase).
2. **Compress** images losslessly if they exceed Cloudinary's 10MB free-plan limit — resolution stays 100% unchanged.
3. **Upload** compressed images to Cloudinary programmatically.
4. **Integrate** the new Cloudinary URLs/public_ids into the relevant website sections.
5. **Delete** the old/replaced images from Cloudinary to keep the account clean.

---

## Problem Statement

- **Cloudinary free plan limit:** Max **10MB per image** upload.
- **Client's images:** Often **20MB+** in size.
- **Client's requirement:** Image resolution and quality must remain **100% intact** — no visible degradation.
- **Solution:** Lossless compression using `sharp` (Node.js) — converts to WebP lossless format, strips EXIF metadata, reduces file size by ~60% on average, with zero quality/resolution loss.

---

## Current Setup

- **Cloud Name:** `dsauqv4va`
- **Utility File:** `utils/cloudinary.js` — provides `getCloudinaryUrl()` and `preloadCloudinaryImages()` helpers.
- **Image referencing:** Images are referenced via Cloudinary `public_id` (e.g. `atomx-website/home/event-logos/1`) and built into full URLs using `getCloudinaryUrl()`.

---

## Part 1: Image Compression (Lossless)

### Why Lossless?

| Term     | Meaning                                                    |
| -------- | ---------------------------------------------------------- |
| Lossless | File size ↓, resolution & quality = **100% unchanged**     |
| Lossy    | File size ↓↓, slight quality degradation (JPEG artifacts)  |

We use **lossless only** — the client's images will look pixel-identical after compression.

### How It Works — `sharp` (Node.js)

`sharp` is a high-performance image processing library built on `libvips`. It is 4-5x faster than ImageMagick.

**Key behaviors:**
- Converts images to **WebP lossless** format — significantly smaller file sizes.
- **Strips all EXIF metadata by default** (camera model, GPS, timestamps) — this alone can save several hundred KB per image. No extra config needed.
- Resolution, pixel data, and visual quality remain **100% unchanged**.

### Compression Script Logic

```js
const sharp = require('sharp');
const path = require('path');

async function compressImage(inputPath, outputDir) {
  const filename = path.basename(inputPath, path.extname(inputPath));
  const outputPath = path.join(outputDir, `${filename}.webp`);

  await sharp(inputPath)
    .webp({ lossless: true })  // zero quality loss
    .toFile(outputPath);

  return outputPath;
}
```

**What this does:**
1. Takes any input image (PNG, JPG, TIFF, etc.).
2. Converts to WebP with `lossless: true` — no quality degradation whatsoever.
3. EXIF metadata is automatically stripped (sharp's default behavior).
4. Outputs a `.webp` file with significantly reduced file size.

### Fallback: If WebP Lossless Still Exceeds 10MB

In rare cases where a lossless WebP is still over 10MB (e.g., extremely large resolution images), we can use **near-lossless** compression:

```js
sharp(inputPath)
  .webp({ nearLossless: true, quality: 95 })  // visually identical, even smaller
  .toFile(outputPath);
```

This is visually indistinguishable from the original but achieves additional size reduction.

### npm Packages Required

```bash
npm install sharp
```

> `sharp` is the only package needed. It handles compression, format conversion, and metadata stripping all in one.

---

## Part 2: Upload to Cloudinary (Programmatic)

### Cloudinary Node.js SDK — Upload API

```js
const cloudinary = require('cloudinary').v2;

cloudinary.config({
  cloud_name: process.env.CLOUDINARY_CLOUD_NAME,
  api_key: process.env.CLOUDINARY_API_KEY,
  api_secret: process.env.CLOUDINARY_API_SECRET,
});

async function uploadToCloudinary(filePath, folder, publicId) {
  const result = await cloudinary.uploader.upload(filePath, {
    folder: folder,               // e.g. "atomx-website/home"
    public_id: publicId,          // e.g. "hero-banner"
    resource_type: 'image',
    overwrite: true,
  });
  return result;
}
```

**What this does:**
1. Uploads the compressed image to Cloudinary.
2. Places it in the specified folder with a meaningful `public_id`.
3. Returns the full Cloudinary URL and metadata.

---

## Part 3: Delete Old Images from Cloudinary

### Upload API — `destroy` method (Single image)

```js
cloudinary.uploader.destroy('public_id')
  .then(result => console.log(result));
```

- Deletes one image at a time.
- Requires `CLOUDINARY_API_KEY` and `CLOUDINARY_API_SECRET` (server-side only).
- No rate limit concerns for single deletions.

### Admin API — `delete_resources` method (Bulk delete)

```js
cloudinary.api.delete_resources(['public_id_1', 'public_id_2'])
  .then(result => console.log(result));
```

- Deletes multiple images in one call.
- Rate-limited — use for infrequent bulk operations only.

### Extracting `public_id` from Old Images

Every Cloudinary URL contains a `public_id`:

```
URL:       https://res.cloudinary.com/dsauqv4va/image/upload/v123/atomx-website/home/hero.jpg
public_id: atomx-website/home/hero
```

When replacing an image in a section, the old `public_id` is extracted from the existing code before updating.

---

## Part 4: Implementation Plan

### Step 1: Create a Utility Script

Create a Node.js utility script at `scripts/manage-images.js` that handles:

- **Compress:** Takes an input image path, compresses it losslessly using `sharp`, outputs a `.webp` file.
- **Upload:** Takes a compressed image, uploads it to Cloudinary with the specified folder and public_id.
- **Delete:** Takes an old `public_id`, deletes it from Cloudinary.

### Step 2: Create a Next.js API Route

Create `src/app/api/cloudinary/delete/route.js` for server-side deletion:

- Accepts a `public_id` (or array) via POST request.
- Authenticates using env variables.
- Calls `cloudinary.uploader.destroy()`.
- Returns success/failure response.

### Step 3: Create a Raw Images Folder

Create a `raw-images/` folder in the project root:

- Client's original high-resolution images are placed here.
- This folder is added to `.gitignore` — raw images are never committed to git.
- After compression and upload, the raw images can be cleaned up.

---

## Full Workflow (Step-by-Step)

This is the exact process followed every time images need to be updated:

```
┌─────────────────────────────────────────────────────────────────┐
│  1. CLIENT provides new images                                  │
│     → Stored in /raw-images/ folder in the project root         │
├─────────────────────────────────────────────────────────────────┤
│  2. USER tells Claude which sections need updating               │
│     → Specifies which image goes where                          │
├─────────────────────────────────────────────────────────────────┤
│  3. CLAUDE checks image file size                                │
│     → If ≤ 10MB: proceed to upload directly                     │
│     → If > 10MB: compress using sharp (lossless WebP)           │
├─────────────────────────────────────────────────────────────────┤
│  4. CLAUDE compresses the image (if needed)                      │
│     → sharp converts to WebP lossless                           │
│     → EXIF metadata stripped automatically                      │
│     → Resolution stays 100% unchanged                           │
│     → Verify output is under 10MB                               │
│     → If still > 10MB: use near-lossless (quality: 95)          │
├─────────────────────────────────────────────────────────────────┤
│  5. CLAUDE uploads compressed image to Cloudinary                │
│     → Uses cloudinary.uploader.upload()                         │
│     → Assigns proper folder + public_id                         │
│     → Verifies upload success                                   │
├─────────────────────────────────────────────────────────────────┤
│  6. CLAUDE extracts old image's public_id from the code          │
│     → Reads the component/section to find the old public_id     │
├─────────────────────────────────────────────────────────────────┤
│  7. CLAUDE updates the code                                      │
│     → Replaces old public_id with new public_id in the section  │
│     → Verifies the section renders correctly                    │
├─────────────────────────────────────────────────────────────────┤
│  8. CLAUDE deletes the old image from Cloudinary                 │
│     → Confirms with user before deletion                        │
│     → Calls cloudinary.uploader.destroy(old_public_id)          │
│     → Verifies deletion success                                 │
├─────────────────────────────────────────────────────────────────┤
│  9. CLEANUP                                                      │
│     → Raw image in /raw-images/ can be removed                  │
│     → Compressed file can be removed                            │
│     → Cloudinary account stays clean with only active images    │
└─────────────────────────────────────────────────────────────────┘
```

---

## Environment Variables Required

The following must be set in `.env.local`:

```
NEXT_PUBLIC_CLOUDINARY_CLOUD_NAME=dsauqv4va
CLOUDINARY_API_KEY=<your_api_key>
CLOUDINARY_API_SECRET=<your_api_secret>
```

> `CLOUDINARY_API_KEY` and `CLOUDINARY_API_SECRET` must NOT be prefixed with `NEXT_PUBLIC_` as they are secrets and must only be used server-side.

---

## npm Packages Required

```bash
npm install sharp cloudinary
```

| Package      | Purpose                                              |
| ------------ | ---------------------------------------------------- |
| `sharp`      | Lossless image compression, format conversion, EXIF stripping |
| `cloudinary` | Programmatic upload and deletion via Cloudinary SDK  |

---

## Important Notes

- **Lossless = zero quality loss.** The client's images will look pixel-identical after compression. Resolution is never changed.
- **Deletion is irreversible.** Once an image is deleted from Cloudinary, it cannot be recovered. Always confirm before deleting.
- **Server-side only.** API key and secret must never be exposed to the client.
- **`raw-images/` must be in `.gitignore`.** Never commit large raw images to the repository.
- **One-at-a-time deletions** use the Upload API (no rate limit concerns).
- **Bulk deletions** use the Admin API (rate-limited — use sparingly).
- **sharp strips EXIF by default.** No extra configuration needed — camera data, GPS, timestamps are all removed automatically, reducing file size further.

---

## References

- [Cloudinary — File Size Limits](https://support.cloudinary.com/hc/en-us/articles/202520592-Do-you-have-a-file-size-limit)
- [Cloudinary — Node.js Image Upload](https://cloudinary.com/documentation/node_image_and_video_upload)
- [Cloudinary — Upload API Reference](https://cloudinary.com/documentation/image_upload_api_reference)
- [Cloudinary — How to delete an image via the API](https://support.cloudinary.com/hc/en-us/articles/203465641-How-can-I-delete-an-image-via-the-API-Programmable-Media)
- [Cloudinary — Delete Assets Node.js Tutorial](https://cloudinary.com/documentation/deleting_assets_tutorial)
- [Cloudinary — Delete Assets Documentation](https://cloudinary.com/documentation/delete_assets)
- [Sharp — Official Documentation](https://sharp.pixelplumbing.com/)
- [Sharp — Output Options (WebP lossless)](https://sharp.pixelplumbing.com/api-output/)
- [Sharp — GitHub Repository](https://github.com/lovell/sharp)
