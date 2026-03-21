import { Router, Request, Response } from 'express'
import { v4 as uuidv4 } from 'uuid'
import supabase from '../database'

const router = Router()

// Get all invitations
router.get('/', async (_req: Request, res: Response) => {
  try {
    const { data, error } = await supabase
      .from('invitations')
      .select('*, photos(id), rsvps(id)')
      .order('created_at', { ascending: false })

    if (error) throw error

    const invitations = (data || []).map((i: any) => ({
      ...i,
      photo_count: i.photos?.length || 0,
      rsvp_count: i.rsvps?.length || 0
    }))
    res.json(invitations)
  } catch (err: any) {
    res.status(500).json({ error: err.message || 'Failed to fetch invitations' })
  }
})

// Get invitation by slug
router.get('/slug/:slug', async (req: Request, res: Response) => {
  try {
    const { data: invitation, error } = await supabase
      .from('invitations')
      .select('*')
      .eq('slug', req.params.slug)
      .single()

    if (error || !invitation) {
      return res.status(404).json({ error: 'Invitation not found' })
    }

    const { data: photos } = await supabase
      .from('photos')
      .select('*')
      .eq('invitation_id', invitation.id)
      .order('sort_order', { ascending: true })

    const { data: rsvps } = await supabase
      .from('rsvps')
      .select('*')
      .eq('invitation_id', invitation.id)
      .order('created_at', { ascending: false })

    res.json({ ...invitation, photos: photos || [], rsvps: rsvps || [] })
  } catch (err: any) {
    res.status(500).json({ error: err.message || 'Failed to fetch invitation' })
  }
})

// Get invitation by ID
router.get('/:id', async (req: Request, res: Response) => {
  try {
    const { data: invitation, error } = await supabase
      .from('invitations')
      .select('*')
      .eq('id', req.params.id)
      .single()

    if (error || !invitation) {
      return res.status(404).json({ error: 'Invitation not found' })
    }

    const { data: photos } = await supabase
      .from('photos')
      .select('*')
      .eq('invitation_id', invitation.id)
      .order('sort_order', { ascending: true })

    res.json({ ...invitation, photos: photos || [] })
  } catch (err: any) {
    res.status(500).json({ error: err.message || 'Failed to fetch invitation' })
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

    // Check slug
    const { data: existing } = await supabase
      .from('invitations')
      .select('id')
      .eq('slug', slug)
      .single()

    if (existing) {
      return res.status(400).json({ error: 'Slug sudah digunakan. Pilih slug lain.' })
    }

    const newInvitation = {
      id,
      slug,
      theme: theme || 'elegant',
      groom_name,
      bride_name,
      groom_full_name: groom_full_name || '',
      bride_full_name: bride_full_name || '',
      groom_father: groom_father || '',
      groom_mother: groom_mother || '',
      bride_father: bride_father || '',
      bride_mother: bride_mother || '',
      groom_photo: groom_photo || '',
      bride_photo: bride_photo || '',
      cover_photo: cover_photo || '',
      akad_date: akad_date || '',
      akad_time: akad_time || '',
      akad_venue: akad_venue || '',
      akad_address: akad_address || '',
      akad_map_url: akad_map_url || '',
      resepsi_date: resepsi_date || '',
      resepsi_time: resepsi_time || '',
      resepsi_venue: resepsi_venue || '',
      resepsi_address: resepsi_address || '',
      resepsi_map_url: resepsi_map_url || '',
      love_story: love_story ? (typeof love_story === 'string' ? JSON.parse(love_story) : love_story) : [],
      quote: quote || '',
      bank_name: bank_name || '',
      bank_account: bank_account || '',
      bank_holder: bank_holder || ''
    }

    const { data: created, error: createError } = await supabase
      .from('invitations')
      .insert([newInvitation])
      .select()
      .single()

    if (createError) throw createError

    if (photos && Array.isArray(photos) && photos.length > 0) {
      const dbPhotos = photos.map((p: any, index: number) => ({
        id: uuidv4(),
        invitation_id: id,
        url: p.url,
        caption: p.caption || '',
        sort_order: index
      }))

      await supabase.from('photos').insert(dbPhotos)
    }

    res.status(201).json(created)
  } catch (err: any) {
    console.error('Create invitation error:', err)
    res.status(500).json({ error: err.message || 'Failed to create invitation' })
  }
})

// Update invitation
router.put('/:id', async (req: Request, res: Response) => {
  try {
    const { id } = req.params

    const { data: existing } = await supabase
      .from('invitations')
      .select('*')
      .eq('id', id)
      .single()

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
      const { data: slugExists } = await supabase
        .from('invitations')
        .select('id')
        .eq('slug', slug)
        .neq('id', id)
        .single()
      
      if (slugExists) {
        return res.status(400).json({ error: 'Slug sudah digunakan.' })
      }
    }

    const updateData = {
      slug: slug || existing.slug,
      theme: theme || existing.theme,
      groom_name: groom_name || existing.groom_name,
      bride_name: bride_name || existing.bride_name,
      groom_full_name: groom_full_name !== undefined ? groom_full_name : existing.groom_full_name,
      bride_full_name: bride_full_name !== undefined ? bride_full_name : existing.bride_full_name,
      groom_father: groom_father !== undefined ? groom_father : existing.groom_father,
      groom_mother: groom_mother !== undefined ? groom_mother : existing.groom_mother,
      bride_father: bride_father !== undefined ? bride_father : existing.bride_father,
      bride_mother: bride_mother !== undefined ? bride_mother : existing.bride_mother,
      groom_photo: groom_photo !== undefined ? groom_photo : existing.groom_photo,
      bride_photo: bride_photo !== undefined ? bride_photo : existing.bride_photo,
      cover_photo: cover_photo !== undefined ? cover_photo : existing.cover_photo,
      akad_date: akad_date !== undefined ? akad_date : existing.akad_date,
      akad_time: akad_time !== undefined ? akad_time : existing.akad_time,
      akad_venue: akad_venue !== undefined ? akad_venue : existing.akad_venue,
      akad_address: akad_address !== undefined ? akad_address : existing.akad_address,
      akad_map_url: akad_map_url !== undefined ? akad_map_url : existing.akad_map_url,
      resepsi_date: resepsi_date !== undefined ? resepsi_date : existing.resepsi_date,
      resepsi_time: resepsi_time !== undefined ? resepsi_time : existing.resepsi_time,
      resepsi_venue: resepsi_venue !== undefined ? resepsi_venue : existing.resepsi_venue,
      resepsi_address: resepsi_address !== undefined ? resepsi_address : existing.resepsi_address,
      resepsi_map_url: resepsi_map_url !== undefined ? resepsi_map_url : existing.resepsi_map_url,
      love_story: love_story !== undefined ? (typeof love_story === 'string' ? JSON.parse(love_story) : love_story) : existing.love_story,
      quote: quote !== undefined ? quote : existing.quote,
      bank_name: bank_name !== undefined ? bank_name : existing.bank_name,
      bank_account: bank_account !== undefined ? bank_account : existing.bank_account,
      bank_holder: bank_holder !== undefined ? bank_holder : existing.bank_holder,
      updated_at: new Date().toISOString()
    }

    const { data: updated, error: updateError } = await supabase
      .from('invitations')
      .update(updateData)
      .eq('id', id)
      .select()
      .single()

    if (updateError) throw updateError

    if (photos && Array.isArray(photos)) {
      await supabase.from('photos').delete().eq('invitation_id', id)
      
      if (photos.length > 0) {
        const dbPhotos = photos.map((p: any, index: number) => ({
          id: p.id || uuidv4(),
          invitation_id: id,
          url: p.url,
          caption: p.caption || '',
          sort_order: index
        }))
        await supabase.from('photos').insert(dbPhotos)
      }
    }

    res.json(updated)
  } catch (err: any) {
    console.error('Update invitation error:', err)
    res.status(500).json({ error: err.message || 'Failed to update invitation' })
  }
})

// Delete invitation
router.delete('/:id', async (req: Request, res: Response) => {
  try {
    const { id } = req.params
    const { error } = await supabase
      .from('invitations')
      .delete()
      .eq('id', id)

    if (error) throw error

    res.json({ message: 'Invitation deleted successfully' })
  } catch (err: any) {
    res.status(500).json({ error: err.message || 'Failed to delete invitation' })
  }
})

export default router
