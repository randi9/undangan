import { Router, Request, Response } from 'express'
import { v4 as uuidv4 } from 'uuid'
import db from '../database'

const router = Router()

// Get RSVPs for an invitation
router.get('/:invitationId', (req: Request, res: Response) => {
  try {
    const rsvps = db.prepare(`
      SELECT * FROM rsvps WHERE invitation_id = ? ORDER BY created_at DESC
    `).all(req.params.invitationId)
    res.json(rsvps)
  } catch (error) {
    res.status(500).json({ error: 'Failed to fetch RSVPs' })
  }
})

// Submit RSVP
router.post('/', (req: Request, res: Response) => {
  try {
    const { invitation_id, guest_name, attendance, guest_count, message } = req.body

    if (!invitation_id || !guest_name || !attendance) {
      return res.status(400).json({ error: 'Missing required fields' })
    }

    const id = uuidv4()
    db.prepare(`
      INSERT INTO rsvps (id, invitation_id, guest_name, attendance, guest_count, message)
      VALUES (?, ?, ?, ?, ?, ?)
    `).run(id, invitation_id, guest_name, attendance, guest_count || 1, message || '')

    const rsvp = db.prepare('SELECT * FROM rsvps WHERE id = ?').get(id)
    res.status(201).json(rsvp)
  } catch (error) {
    res.status(500).json({ error: 'Failed to submit RSVP' })
  }
})

export default router
