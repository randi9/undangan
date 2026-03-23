import { Router, Request, Response } from "express";
import multer from "multer";
import path from "path";
import { v4 as uuidv4 } from "uuid";
import supabase from "../database";

const router = Router();

// Configure multer
const storage = multer.memoryStorage();

const allowedTypes = ["image/jpeg", "image/png", "image/webp", "image/gif"];

function isAllowedMime(mimeType: string) {
  return allowedTypes.includes(mimeType);
}

async function uploadBufferToStorage(file: Express.Multer.File) {
  const ext = path.extname(file.originalname) || ".jpg";
  const cleanExt = ext.replace(/[^a-zA-Z0-9.]/g, "") || ".jpg";
  const name = `${uuidv4()}${cleanExt}`;

  const { error } = await supabase.storage
    .from("uploads")
    .upload(name, file.buffer, { contentType: file.mimetype });

  if (error) throw error;

  const { data } = supabase.storage.from("uploads").getPublicUrl(name);
  return { url: data.publicUrl, filename: name };
}

const upload = multer({
  storage,
  limits: {
    fileSize: 10 * 1024 * 1024, // 10MB max
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
      } catch {
        res.status(500).json({ error: "Failed to upload file" });
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
