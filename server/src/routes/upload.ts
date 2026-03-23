import { Router, Request, Response } from "express";
import multer from "multer";
import path from "path";
import { v4 as uuidv4 } from "uuid";
import sharp from "sharp";
import supabase from "../database";

const router = Router();

// Configure multer
const storage = multer.memoryStorage();

const allowedTypes = [
  "image/jpeg", "image/png", "image/webp", "image/gif",
  "audio/mpeg", "audio/aac", "audio/mp4", "audio/wav", "audio/ogg", "audio/x-m4a"
];

function isAllowedMime(mimeType: string) {
  return allowedTypes.includes(mimeType);
}

function isAudioMime(mimeType: string) {
  return mimeType.startsWith("audio/");
}

async function compressImage(buffer: Buffer): Promise<Buffer> {
  return sharp(buffer)
    .resize({ width: 1920, withoutEnlargement: true })
    .webp({ quality: 85 })
    .toBuffer();
}

async function uploadBufferToStorage(file: Express.Multer.File) {
  const isAudio = isAudioMime(file.mimetype);
  const isImage = file.mimetype.startsWith("image/");

  let buffer = file.buffer;
  let ext = path.extname(file.originalname) || ".jpg";
  let contentType = file.mimetype;

  // Compress images to WebP
  if (isImage) {
    buffer = await compressImage(buffer);
    ext = ".webp";
    contentType = "image/webp";
  }

  const cleanExt = ext.replace(/[^a-zA-Z0-9.]/g, "") || ".jpg";
  const name = `${uuidv4()}${cleanExt}`;

  const bucket = isAudioMime(file.mimetype) ? "music" : "uploads";

  const { error } = await supabase.storage
    .from(bucket)
    .upload(name, buffer, { contentType });

  if (error) {
    console.error("Supabase storage upload error:", error);
    throw error;
  }

  const { data } = supabase.storage.from(bucket).getPublicUrl(name);
  return { url: data.publicUrl, filename: name };
}

const upload = multer({
  storage,
  limits: {
    fileSize: 20 * 1024 * 1024, // 20MB max (audio can be large)
  },
  fileFilter: (_req, file, cb) => {
    if (isAllowedMime(file.mimetype)) {
      cb(null, true);
    } else {
      cb(new Error("Only JPEG, PNG, WebP, and GIF images are allowed"));
    }
  },
});

// Upload single photo
router.post(
  "/single",
  upload.single("photo"),
  (req: Request, res: Response) => {
    void (async () => {
      if (!req.file) {
        res.status(400).json({ error: "No file uploaded" });
        return;
      }

      try {
        const uploaded = await uploadBufferToStorage(req.file);
        res.json(uploaded);
      } catch (err: any) {
        console.error("Upload single error:", err);
        res.status(500).json({ error: err.message || "Failed to upload file" });
      }
    })();
  },
);

// Upload multiple photos
router.post(
  "/multiple",
  upload.array("photos", 20),
  (req: Request, res: Response) => {
    void (async () => {
      const files = req.files as Express.Multer.File[];
      if (!files || files.length === 0) {
        res.status(400).json({ error: "No files uploaded" });
        return;
      }

      try {
        const uploaded = await Promise.all(files.map(uploadBufferToStorage));
        res.json(uploaded);
      } catch {
        res.status(500).json({ error: "Failed to upload files" });
      }
    })();
  },
);

export default router;
