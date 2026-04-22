/**
 * Client-side image compression using the browser's native Canvas API.
 *
 * Replaces server-side `sharp` which is NOT compatible with Cloudflare Workers.
 * Images are resized and converted to WebP BEFORE uploading, saving both
 * bandwidth and server processing.
 */

const MAX_WIDTH = 1920;
const MAX_HEIGHT = 1920;
const WEBP_QUALITY = 0.85;

/**
 * Compress an image File to WebP with max dimensions.
 * Returns a new File ready for upload.
 */
export async function compressImage(
  file: File,
  options?: {
    maxWidth?: number;
    maxHeight?: number;
    quality?: number;
  },
): Promise<File> {
  // Skip non-image files
  if (!file.type.startsWith("image/")) return file;

  // Skip SVGs (vector, no need to compress)
  if (file.type === "image/svg+xml") return file;

  // Skip very small files (< 50KB, already small enough)
  if (file.size < 50 * 1024) return file;

  const maxW = options?.maxWidth ?? MAX_WIDTH;
  const maxH = options?.maxHeight ?? MAX_HEIGHT;
  const quality = options?.quality ?? WEBP_QUALITY;

  try {
    // Decode image using browser's native decoder
    const bitmap = await createImageBitmap(file);
    const { width, height } = bitmap;

    // Calculate new dimensions maintaining aspect ratio
    let newWidth = width;
    let newHeight = height;

    if (width > maxW || height > maxH) {
      const ratio = Math.min(maxW / width, maxH / height);
      newWidth = Math.round(width * ratio);
      newHeight = Math.round(height * ratio);
    }

    // Draw to canvas
    const canvas = document.createElement("canvas");
    canvas.width = newWidth;
    canvas.height = newHeight;

    const ctx = canvas.getContext("2d");
    if (!ctx) {
      bitmap.close();
      return file; // Fallback: return original
    }

    ctx.drawImage(bitmap, 0, 0, newWidth, newHeight);
    bitmap.close();

    // Convert to WebP blob
    const blob = await new Promise<Blob>((resolve, reject) => {
      canvas.toBlob(
        (b) => (b ? resolve(b) : reject(new Error("Canvas toBlob failed"))),
        "image/webp",
        quality,
      );
    });

    // Create new File with .webp extension
    const originalName = file.name.replace(/\.[^.]+$/, "") || "photo";
    return new File([blob], `${originalName}.webp`, { type: "image/webp" });
  } catch (err) {
    console.warn("[ImageCompress] Failed, using original:", err);
    return file; // Fallback: return original if compression fails
  }
}

/**
 * Compress multiple image files.
 */
export async function compressImages(files: File[]): Promise<File[]> {
  return Promise.all(files.map((f) => compressImage(f)));
}
