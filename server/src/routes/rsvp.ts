import { Router, Request, Response } from 'express'
import { v4 as uuidv4 } from 'uuid'
import db from '../database'

const router = Router()

// Get RSVPs for an invitation
router.get('/:invitationId', async (req: Request, res: Response) => {
  try {
    const { rows } = await db.execute({
      sql: 'SELECT * FROM rsvps WHERE invitation_id = ? ORDER BY created_at DESC',
      args: [req.params.invitationId]
    })
    res.json(rows)
  } catch (error) {
    res.status(500).json({ error: 'Failed to fetch RSVPs' })
  }
})

// Submit RSVP
router.post('/', async (req: Request, res: Response) => {
  try {
    const { invitation_id, guest_name, attendance, guest_count, message } = req.body

    if (!invitation_id || !guest_name || !attendance) {
      return res.status(400).json({ error: 'Missing required fields' })
    }

    const id = uuidv4()
    await db.execute({
      sql: `INSERT INTO rsvps (id, invitation_id, guest_name, attendance, guest_count, message)
            VALUES (?, ?, ?, ?, ?, ?)`,
      args: [id, invitation_id, guest_name, attendance, guest_count || 1, message || '']
    })

    const { rows } = await db.execute({
      sql: 'SELECT * FROM rsvps WHERE id = ?',
      args: [id]
    })
    
    res.status(201).json(rows[0])
  } catch (error) {
    res.status(500).json({ error: 'Failed to submit RSVP' })
  }
})

export default router
