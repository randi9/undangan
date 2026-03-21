import express from 'express'
import cors from 'cors'
import path from 'path'
import invitationRoutes from './routes/invitations'
import uploadRoutes from './routes/upload'
import rsvpRoutes from './routes/rsvp'

const app = express()
const PORT = process.env.PORT || 3000

// Middleware
app.use(cors({
  origin: ['http://localhost:5173', 'http://127.0.0.1:5173'],
  credentials: true
}))
app.use(express.json())

// Serve uploaded files statically
const uploadsDir = path.join(__dirname, '..', 'uploads')
app.use('/uploads', express.static(uploadsDir))

// API Routes
app.use('/api/invitations', invitationRoutes)
app.use('/api/upload', uploadRoutes)
app.use('/api/rsvp', rsvpRoutes)

// Health check
app.get('/api/health', (_req, res) => {
  res.json({ status: 'ok', timestamp: new Date().toISOString() })
})

app.listen(PORT, () => {
  console.log(`🚀 Server running on http://localhost:${PORT}`)
})

export default app
