import { Router, Request, Response } from 'express'
import multer from 'multer'
import path from 'path'
import fs from 'fs'
import { v4 as uuidv4 } from 'uuid'

const router = Router()

// Ensure uploads directory exists
const uploadsDir = path.join(__dirname, '..', '..', 'uploads')
if (!fs.existsSync(uploadsDir)) {
  fs.mkdirSync(uploadsDir, { recursive: true })
}

// Configure multer
const storage = multer.diskStorage({
  destination: (_req, _file, cb) => {
    cb(null, uploadsDir)
  },
  filename: (_req, file, cb) => {
    const ext = path.extname(file.originalname)
    const name = `${uuidv4()}${ext}`
    cb(null, name)
  }
})

const upload = multer({
  storage,
  limits: {
    fileSize: 10 * 1024 * 1024 // 10MB max
  },
  fileFilter: (_req, file, cb) => {
    const allowedTypes = ['image/jpeg', 'image/png', 'image/webp', 'image/gif']
    if (allowedTypes.includes(file.mimetype)) {
      cb(null, true)
    } else {
      cb(new Error('Only JPEG, PNG, WebP, and GIF images are allowed'))
    }
  }
})

// Upload single photo
router.post('/single', upload.single('photo'), (req: Request, res: Response) => {
  try {
    if (!req.file) {
      return res.status(400).json({ error: 'No file uploaded' })
    }

    const url = `/uploads/${req.file.filename}`
    res.json({ url, filename: req.file.filename })
  } catch (error) {
    res.status(500).json({ error: 'Failed to upload file' })
  }
})

// Upload multiple photos
router.post('/multiple', upload.array('photos', 20), (req: Request, res: Response) => {
  try {
    const files = req.files as Express.Multer.File[]
    if (!files || files.length === 0) {
      return res.status(400).json({ error: 'No files uploaded' })
    }

    const urls = files.map(file => ({
      url: `/uploads/${file.filename}`,
      filename: file.filename
    }))

    res.json(urls)
  } catch (error) {
    res.status(500).json({ error: 'Failed to upload files' })
  }
})

export default router
