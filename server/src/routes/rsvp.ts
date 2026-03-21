import { Router, Request, Response } from 'express'
import { v4 as uuidv4 } from 'uuid'
import supabase from '../database'

const router = Router()

// Get RSVPs for an invitation
router.get('/:invitationId', async (req: Request, res: Response) => {
  try {
    const { data, error } = await supabase
      .from('rsvps')
      .select('*')
      .eq('invitation_id', req.params.invitationId)
      .order('created_at', { ascending: false })

    if (error) throw error
    res.json(data || [])
  } catch (err: any) {
    res.status(500).json({ error: err.message || 'Failed to fetch RSVPs' })
  }
})

// Submit RSVP
router.post('/', async (req: Request, res: Response) => {
  try {
    const { invitation_id, guest_name, attendance, guest_count, message } = req.body

    if (!invitation_id || !guest_name || !attendance) {
      return res.status(400).json({ error: 'Missing required fields' })
    }

    const { data, error } = await supabase
      .from('rsvps')
      .insert([{
        id: uuidv4(),
        invitation_id,
        guest_name,
        attendance,
        guest_count: guest_count || 1,
        message: message || ''
      }])
      .select()
      .single()

    if (error) throw error
    res.status(201).json(data)
  } catch (err: any) {
    res.status(500).json({ error: err.message || 'Failed to submit RSVP' })
  }
})

export default router
