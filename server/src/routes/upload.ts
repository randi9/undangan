import { Router, Request, Response } from "express";
import multer from "multer";
import path from "path";
import { v4 as uuidv4 } from "uuid";
import sharp from "sharp";
import { S3Client, PutObjectCommand } from "@aws-sdk/client-s3";
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

async function uploadBufferToStorage(file: Express.Multer.File, slug?: string) {
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
  const filename = `${uuidv4()}${cleanExt}`;
  // Use slug as folder prefix: slug/uuid.webp — falls back to flat if no slug
  const key = slug ? `${slug}/${filename}` : filename;

  const isMusic = isAudioMime(file.mimetype);
  const bucket = isMusic ? "music" : "uploads";
  const publicUrlBase = isMusic 
    ? process.env.R2_PUBLIC_URL_MUSIC || "https://music.mengundanganda.fun"
    : process.env.R2_PUBLIC_URL_UPLOADS || "https://media.mengundanganda.fun";

  // Konfigurasi S3 Client untuk R2
  const s3Client = new S3Client({
    region: "auto",
    endpoint: `https://${process.env.R2_ACCOUNT_ID}.r2.cloudflarestorage.com`,
    forcePathStyle: true,
    credentials: {
      accessKeyId: process.env.R2_ACCESS_KEY_ID || "",
      secretAccessKey: process.env.R2_SECRET_ACCESS_KEY || "",
    },
  });

  const command = new PutObjectCommand({
    Bucket: bucket,
    Key: key,
    Body: buffer,
    ContentType: contentType,
  });

  try {
    await s3Client.send(command);
  } catch (error) {
    console.error("R2 storage upload error:", error);
    throw error;
  }

  const publicUrl = `${publicUrlBase}/${key}`;
  return { url: publicUrl, filename: key };
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
        const slug = (req.query.slug as string) || undefined;
        const uploaded = await uploadBufferToStorage(req.file, slug);
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
        const slug = (req.query.slug as string) || undefined;
        const uploaded = await Promise.all(files.map(f => uploadBufferToStorage(f, slug)));
        res.json(uploaded);
      } catch {
        res.status(500).json({ error: "Failed to upload files" });
      }
    })();
  },
);

export default router;
