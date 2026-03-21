import { Router, Request, Response } from 'express'
import { v4 as uuidv4 } from 'uuid'
import db from '../database'

const router = Router()

// Get all invitations
router.get('/', async (_req: Request, res: Response) => {
  try {
    const { rows } = await db.execute(`
      SELECT i.*, 
        (SELECT COUNT(*) FROM photos WHERE invitation_id = i.id) as photo_count,
        (SELECT COUNT(*) FROM rsvps WHERE invitation_id = i.id) as rsvp_count
      FROM invitations i 
      ORDER BY i.created_at DESC
    `)
    res.json(rows)
  } catch (error) {
    res.status(500).json({ error: 'Failed to fetch invitations' })
  }
})

// Get invitation by slug
router.get('/slug/:slug', async (req: Request, res: Response) => {
  try {
    const invRes = await db.execute({
      sql: 'SELECT * FROM invitations WHERE slug = ?',
      args: [req.params.slug]
    })
    
    const invitation = invRes.rows[0]

    if (!invitation) {
      return res.status(404).json({ error: 'Invitation not found' })
    }

    const photosRes = await db.execute({
      sql: 'SELECT * FROM photos WHERE invitation_id = ? ORDER BY sort_order ASC',
      args: [invitation.id as string]
    })

    const rsvpsRes = await db.execute({
      sql: 'SELECT * FROM rsvps WHERE invitation_id = ? ORDER BY created_at DESC',
      args: [invitation.id as string]
    })

    res.json({ ...invitation, photos: photosRes.rows, rsvps: rsvpsRes.rows })
  } catch (error) {
    res.status(500).json({ error: 'Failed to fetch invitation' })
  }
})

// Get invitation by ID
router.get('/:id', async (req: Request, res: Response) => {
  try {
    const invRes = await db.execute({
      sql: 'SELECT * FROM invitations WHERE id = ?',
      args: [req.params.id]
    })
    
    const invitation = invRes.rows[0]

    if (!invitation) {
      return res.status(404).json({ error: 'Invitation not found' })
    }

    const photosRes = await db.execute({
      sql: 'SELECT * FROM photos WHERE invitation_id = ? ORDER BY sort_order ASC',
      args: [req.params.id]
    })

    res.json({ ...invitation, photos: photosRes.rows })
  } catch (error) {
    res.status(500).json({ error: 'Failed to fetch invitation' })
  }
})

// Create invitation
router.post('/', async (req: Request, res: Response) => {
  try {
    const id = uuidv4()
    const {
      slug, theme, groom_name, bride_name, groom_full_name, bride_full_name,
      groom_father, groom_mother, bride_father, bride_mother,
      groom_photo, bride_photo, cover_photo,
      akad_date, akad_time, akad_venue, akad_address, akad_map_url,
      resepsi_date, resepsi_time, resepsi_venue, resepsi_address, resepsi_map_url,
      love_story, quote, bank_name, bank_account, bank_holder, photos
    } = req.body

    const existingRes = await db.execute({
      sql: 'SELECT id FROM invitations WHERE slug = ?',
      args: [slug]
    })
    if (existingRes.rows.length > 0) {
      return res.status(400).json({ error: 'Slug sudah digunakan. Pilih slug lain.' })
    }

    await db.execute({
      sql: `
      INSERT INTO invitations (
        id, slug, theme, groom_name, bride_name, groom_full_name, bride_full_name,
        groom_father, groom_mother, bride_father, bride_mother,
        groom_photo, bride_photo, cover_photo,
        akad_date, akad_time, akad_venue, akad_address, akad_map_url,
        resepsi_date, resepsi_time, resepsi_venue, resepsi_address, resepsi_map_url,
        love_story, quote, bank_name, bank_account, bank_holder
      ) VALUES (
        ?, ?, ?, ?, ?, ?, ?,
        ?, ?, ?, ?,
        ?, ?, ?,
        ?, ?, ?, ?, ?,
        ?, ?, ?, ?, ?,
        ?, ?, ?, ?, ?
      )`,
      args: [
        id, slug, theme || 'elegant', groom_name, bride_name, groom_full_name || '', bride_full_name || '',
        groom_father || '', groom_mother || '', bride_father || '', bride_mother || '',
        groom_photo || '', bride_photo || '', cover_photo || '',
        akad_date || '', akad_time || '', akad_venue || '', akad_address || '', akad_map_url || '',
        resepsi_date || '', resepsi_time || '', resepsi_venue || '', resepsi_address || '', resepsi_map_url || '',
        JSON.stringify(love_story || []), quote || '', bank_name || '', bank_account || '', bank_holder || ''
      ]
    })

    if (photos && Array.isArray(photos) && photos.length > 0) {
      const queries = photos.map((photo: any, index: number) => ({
        sql: `INSERT INTO photos (id, invitation_id, url, caption, sort_order) VALUES (?, ?, ?, ?, ?)`,
        args: [uuidv4(), id, photo.url, photo.caption || '', index]
      }))
      await db.batch(queries)
    }

    const created = await db.execute({
      sql: 'SELECT * FROM invitations WHERE id = ?',
      args: [id]
    })
    res.status(201).json(created.rows[0])
  } catch (error: any) {
    console.error('Create invitation error:', error)
    res.status(500).json({ error: 'Failed to create invitation' })
  }
})

// Update invitation
router.put('/:id', async (req: Request, res: Response) => {
  try {
    const { id } = req.params
    const existingRes = await db.execute({
      sql: 'SELECT * FROM invitations WHERE id = ?',
      args: [id]
    })
    
    const existing = existingRes.rows[0]
    if (!existing) {
      return res.status(404).json({ error: 'Invitation not found' })
    }

    const {
      slug, theme, groom_name, bride_name, groom_full_name, bride_full_name,
      groom_father, groom_mother, bride_father, bride_mother,
      groom_photo, bride_photo, cover_photo,
      akad_date, akad_time, akad_venue, akad_address, akad_map_url,
      resepsi_date, resepsi_time, resepsi_venue, resepsi_address, resepsi_map_url,
      love_story, quote, bank_name, bank_account, bank_holder, photos
    } = req.body

    if (slug && slug !== existing.slug) {
      const slugExists = await db.execute({
        sql: 'SELECT id FROM invitations WHERE slug = ? AND id != ?',
        args: [slug, id]
      })
      if (slugExists.rows.length > 0) {
        return res.status(400).json({ error: 'Slug sudah digunakan.' })
      }
    }

    await db.execute({
      sql: `
      UPDATE invitations SET
        slug = COALESCE(?, slug),
        theme = COALESCE(?, theme),
        groom_name = COALESCE(?, groom_name),
        bride_name = COALESCE(?, bride_name),
        groom_full_name = COALESCE(?, groom_full_name),
        bride_full_name = COALESCE(?, bride_full_name),
        groom_father = COALESCE(?, groom_father),
        groom_mother = COALESCE(?, groom_mother),
        bride_father = COALESCE(?, bride_father),
        bride_mother = COALESCE(?, bride_mother),
        groom_photo = COALESCE(?, groom_photo),
        bride_photo = COALESCE(?, bride_photo),
        cover_photo = COALESCE(?, cover_photo),
        akad_date = COALESCE(?, akad_date),
        akad_time = COALESCE(?, akad_time),
        akad_venue = COALESCE(?, akad_venue),
        akad_address = COALESCE(?, akad_address),
        akad_map_url = COALESCE(?, akad_map_url),
        resepsi_date = COALESCE(?, resepsi_date),
        resepsi_time = COALESCE(?, resepsi_time),
        resepsi_venue = COALESCE(?, resepsi_venue),
        resepsi_address = COALESCE(?, resepsi_address),
        resepsi_map_url = COALESCE(?, resepsi_map_url),
        love_story = COALESCE(?, love_story),
        quote = COALESCE(?, quote),
        bank_name = COALESCE(?, bank_name),
        bank_account = COALESCE(?, bank_account),
        bank_holder = COALESCE(?, bank_holder),
        updated_at = datetime('now')
      WHERE id = ?`,
      args: [
        slug, theme, groom_name, bride_name, groom_full_name, bride_full_name,
        groom_father, groom_mother, bride_father, bride_mother,
        groom_photo, bride_photo, cover_photo,
        akad_date, akad_time, akad_venue, akad_address, akad_map_url,
        resepsi_date, resepsi_time, resepsi_venue, resepsi_address, resepsi_map_url,
        love_story ? JSON.stringify(love_story) : null, quote,
        bank_name, bank_account, bank_holder,
        id
      ]
    })

    if (photos && Array.isArray(photos)) {
      await db.execute({
        sql: 'DELETE FROM photos WHERE invitation_id = ?',
        args: [id]
      })
      
      if (photos.length > 0) {
        const queries = photos.map((photo: any, index: number) => ({
          sql: `INSERT INTO photos (id, invitation_id, url, caption, sort_order) VALUES (?, ?, ?, ?, ?)`,
          args: [photo.id || uuidv4(), id, photo.url, photo.caption || '', index]
        }))
        await db.batch(queries)
      }
    }

    const updated = await db.execute({
      sql: 'SELECT * FROM invitations WHERE id = ?',
      args: [id]
    })
    res.json(updated.rows[0])
  } catch (error: any) {
    console.error('Update invitation error:', error)
    res.status(500).json({ error: 'Failed to update invitation' })
  }
})

// Delete invitation
router.delete('/:id', async (req: Request, res: Response) => {
  try {
    const { id } = req.params
    const existingReq = await db.execute({
      sql: 'SELECT * FROM invitations WHERE id = ?',
      args: [id]
    })
    if (existingReq.rows.length === 0) {
      return res.status(404).json({ error: 'Invitation not found' })
    }

    const queries = [
      { sql: 'DELETE FROM photos WHERE invitation_id = ?', args: [id] },
      { sql: 'DELETE FROM rsvps WHERE invitation_id = ?', args: [id] },
      { sql: 'DELETE FROM invitations WHERE id = ?', args: [id] }
    ]
    await db.batch(queries)

    res.json({ message: 'Invitation deleted successfully' })
  } catch (error) {
    res.status(500).json({ error: 'Failed to delete invitation' })
  }
})

export default router
