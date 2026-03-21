import { Router, Request, Response } from 'express'
import { v4 as uuidv4 } from 'uuid'
import db from '../database'

const router = Router()

// Get all invitations
router.get('/', (_req: Request, res: Response) => {
  try {
    const invitations = db.prepare(`
      SELECT i.*, 
        (SELECT COUNT(*) FROM photos WHERE invitation_id = i.id) as photo_count,
        (SELECT COUNT(*) FROM rsvps WHERE invitation_id = i.id) as rsvp_count
      FROM invitations i 
      ORDER BY i.created_at DESC
    `).all()
    res.json(invitations)
  } catch (error) {
    res.status(500).json({ error: 'Failed to fetch invitations' })
  }
})

// Get invitation by slug
router.get('/slug/:slug', (req: Request, res: Response) => {
  try {
    const invitation = db.prepare(`
      SELECT * FROM invitations WHERE slug = ?
    `).get(req.params.slug)

    if (!invitation) {
      return res.status(404).json({ error: 'Invitation not found' })
    }

    const photos = db.prepare(`
      SELECT * FROM photos WHERE invitation_id = ? ORDER BY sort_order ASC
    `).all((invitation as any).id)

    const rsvps = db.prepare(`
      SELECT * FROM rsvps WHERE invitation_id = ? ORDER BY created_at DESC
    `).all((invitation as any).id)

    res.json({ ...invitation, photos, rsvps })
  } catch (error) {
    res.status(500).json({ error: 'Failed to fetch invitation' })
  }
})

// Get invitation by ID
router.get('/:id', (req: Request, res: Response) => {
  try {
    const invitation = db.prepare(`
      SELECT * FROM invitations WHERE id = ?
    `).get(req.params.id)

    if (!invitation) {
      return res.status(404).json({ error: 'Invitation not found' })
    }

    const photos = db.prepare(`
      SELECT * FROM photos WHERE invitation_id = ? ORDER BY sort_order ASC
    `).all(req.params.id)

    res.json({ ...invitation, photos })
  } catch (error) {
    res.status(500).json({ error: 'Failed to fetch invitation' })
  }
})

// Create invitation
router.post('/', (req: Request, res: Response) => {
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

    // Check slug uniqueness
    const existing = db.prepare('SELECT id FROM invitations WHERE slug = ?').get(slug)
    if (existing) {
      return res.status(400).json({ error: 'Slug sudah digunakan. Pilih slug lain.' })
    }

    const stmt = db.prepare(`
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
      )
    `)

    stmt.run(
      id, slug, theme || 'elegant', groom_name, bride_name, groom_full_name || '', bride_full_name || '',
      groom_father || '', groom_mother || '', bride_father || '', bride_mother || '',
      groom_photo || '', bride_photo || '', cover_photo || '',
      akad_date || '', akad_time || '', akad_venue || '', akad_address || '', akad_map_url || '',
      resepsi_date || '', resepsi_time || '', resepsi_venue || '', resepsi_address || '', resepsi_map_url || '',
      JSON.stringify(love_story || []), quote || '', bank_name || '', bank_account || '', bank_holder || ''
    )

    // Insert gallery photos
    if (photos && Array.isArray(photos)) {
      const photoStmt = db.prepare(`
        INSERT INTO photos (id, invitation_id, url, caption, sort_order)
        VALUES (?, ?, ?, ?, ?)
      `)
      photos.forEach((photo: any, index: number) => {
        photoStmt.run(uuidv4(), id, photo.url, photo.caption || '', index)
      })
    }

    const created = db.prepare('SELECT * FROM invitations WHERE id = ?').get(id)
    res.status(201).json(created)
  } catch (error: any) {
    console.error('Create invitation error:', error)
    res.status(500).json({ error: 'Failed to create invitation' })
  }
})

// Update invitation
router.put('/:id', (req: Request, res: Response) => {
  try {
    const { id } = req.params
    const existing = db.prepare('SELECT * FROM invitations WHERE id = ?').get(id)
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

    // Check slug uniqueness if changed
    if (slug && slug !== (existing as any).slug) {
      const slugExists = db.prepare('SELECT id FROM invitations WHERE slug = ? AND id != ?').get(slug, id)
      if (slugExists) {
        return res.status(400).json({ error: 'Slug sudah digunakan.' })
      }
    }

    const stmt = db.prepare(`
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
      WHERE id = ?
    `)

    stmt.run(
      slug, theme, groom_name, bride_name, groom_full_name, bride_full_name,
      groom_father, groom_mother, bride_father, bride_mother,
      groom_photo, bride_photo, cover_photo,
      akad_date, akad_time, akad_venue, akad_address, akad_map_url,
      resepsi_date, resepsi_time, resepsi_venue, resepsi_address, resepsi_map_url,
      love_story ? JSON.stringify(love_story) : null, quote,
      bank_name, bank_account, bank_holder,
      id
    )

    // Update gallery photos if provided
    if (photos && Array.isArray(photos)) {
      db.prepare('DELETE FROM photos WHERE invitation_id = ?').run(id)
      const photoStmt = db.prepare(`
        INSERT INTO photos (id, invitation_id, url, caption, sort_order)
        VALUES (?, ?, ?, ?, ?)
      `)
      photos.forEach((photo: any, index: number) => {
        photoStmt.run(photo.id || uuidv4(), id, photo.url, photo.caption || '', index)
      })
    }

    const updated = db.prepare('SELECT * FROM invitations WHERE id = ?').get(id)
    res.json(updated)
  } catch (error: any) {
    console.error('Update invitation error:', error)
    res.status(500).json({ error: 'Failed to update invitation' })
  }
})

// Delete invitation
router.delete('/:id', (req: Request, res: Response) => {
  try {
    const { id } = req.params
    const existing = db.prepare('SELECT * FROM invitations WHERE id = ?').get(id)
    if (!existing) {
      return res.status(404).json({ error: 'Invitation not found' })
    }

    db.prepare('DELETE FROM photos WHERE invitation_id = ?').run(id)
    db.prepare('DELETE FROM rsvps WHERE invitation_id = ?').run(id)
    db.prepare('DELETE FROM invitations WHERE id = ?').run(id)

    res.json({ message: 'Invitation deleted successfully' })
  } catch (error) {
    res.status(500).json({ error: 'Failed to delete invitation' })
  }
})

export default router
