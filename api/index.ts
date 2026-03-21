import express from 'express'
import cors from 'cors'
import { createClient } from '@supabase/supabase-js'
import { v4 as uuidv4 } from 'uuid'

const app = express()

app.use(cors({ origin: true, credentials: true }))
app.use(express.json())

// --- Supabase Client ---
const supabaseUrl = process.env.SUPABASE_URL || ''
const supabaseKey = process.env.SUPABASE_SERVICE_ROLE_KEY || process.env.SUPABASE_ANON_KEY || process.env.SUPABASE_AUTH_TOKEN || ''
const supabase = createClient(supabaseUrl, supabaseKey)

// --- INVITATIONS ---

// Get all invitations
app.get('/api/invitations', async (_req, res) => {
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
app.get('/api/invitations/slug/:slug', async (req, res) => {
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
app.get('/api/invitations/:id', async (req, res) => {
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
app.post('/api/invitations', async (req, res) => {
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

    const { data: existing } = await supabase
      .from('invitations')
      .select('id')
      .eq('slug', slug)
      .single()
    if (existing) {
      return res.status(400).json({ error: 'Slug sudah digunakan. Pilih slug lain.' })
    }

    const { data: created, error: createError } = await supabase
      .from('invitations')
      .insert([{
        id, slug, theme: theme || 'elegant', groom_name, bride_name,
        groom_full_name: groom_full_name || '', bride_full_name: bride_full_name || '',
        groom_father: groom_father || '', groom_mother: groom_mother || '',
        bride_father: bride_father || '', bride_mother: bride_mother || '',
        groom_photo: groom_photo || '', bride_photo: bride_photo || '',
        cover_photo: cover_photo || '',
        akad_date: akad_date || '', akad_time: akad_time || '',
        akad_venue: akad_venue || '', akad_address: akad_address || '',
        akad_map_url: akad_map_url || '',
        resepsi_date: resepsi_date || '', resepsi_time: resepsi_time || '',
        resepsi_venue: resepsi_venue || '', resepsi_address: resepsi_address || '',
        resepsi_map_url: resepsi_map_url || '',
        love_story: love_story ? (typeof love_story === 'string' ? JSON.parse(love_story) : love_story) : [],
        quote: quote || '', bank_name: bank_name || '',
        bank_account: bank_account || '', bank_holder: bank_holder || ''
      }])
      .select()
      .single()
    if (createError) throw createError

    if (photos && Array.isArray(photos) && photos.length > 0) {
      const dbPhotos = photos.map((p: any, index: number) => ({
        id: uuidv4(), invitation_id: id, url: p.url,
        caption: p.caption || '', sort_order: index
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
app.put('/api/invitations/:id', async (req, res) => {
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

    const updateData: any = { updated_at: new Date().toISOString() }
    const fields = [
      'slug', 'theme', 'groom_name', 'bride_name', 'groom_full_name', 'bride_full_name',
      'groom_father', 'groom_mother', 'bride_father', 'bride_mother',
      'groom_photo', 'bride_photo', 'cover_photo',
      'akad_date', 'akad_time', 'akad_venue', 'akad_address', 'akad_map_url',
      'resepsi_date', 'resepsi_time', 'resepsi_venue', 'resepsi_address', 'resepsi_map_url',
      'quote', 'bank_name', 'bank_account', 'bank_holder'
    ]
    for (const f of fields) {
      if (req.body[f] !== undefined) updateData[f] = req.body[f]
    }
    if (love_story !== undefined) {
      updateData.love_story = typeof love_story === 'string' ? JSON.parse(love_story) : love_story
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
          id: p.id || uuidv4(), invitation_id: id, url: p.url,
          caption: p.caption || '', sort_order: index
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
app.delete('/api/invitations/:id', async (req, res) => {
  try {
    const { error } = await supabase
      .from('invitations')
      .delete()
      .eq('id', req.params.id)
    if (error) throw error
    res.json({ message: 'Invitation deleted successfully' })
  } catch (err: any) {
    res.status(500).json({ error: err.message || 'Failed to delete invitation' })
  }
})

// --- RSVP ---

app.get('/api/rsvp/:invitationId', async (req, res) => {
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

app.post('/api/rsvp', async (req, res) => {
  try {
    const { invitation_id, guest_name, attendance, guest_count, message } = req.body
    if (!invitation_id || !guest_name || !attendance) {
      return res.status(400).json({ error: 'Missing required fields' })
    }
    const { data, error } = await supabase
      .from('rsvps')
      .insert([{
        id: uuidv4(), invitation_id, guest_name, attendance,
        guest_count: guest_count || 1, message: message || ''
      }])
      .select()
      .single()
    if (error) throw error
    res.status(201).json(data)
  } catch (err: any) {
    res.status(500).json({ error: err.message || 'Failed to submit RSVP' })
  }
})

// --- UPLOAD (using Supabase Storage) ---

app.post('/api/upload/single', async (req, res) => {
  try {
    // For Vercel serverless, we receive base64-encoded file data
    const { file, filename, mimetype } = req.body
    if (!file) return res.status(400).json({ error: 'No file provided' })

    const ext = filename?.split('.').pop() || 'jpg'
    const name = `${uuidv4()}.${ext}`
    const buffer = Buffer.from(file, 'base64')

    const { error } = await supabase.storage
      .from('uploads')
      .upload(name, buffer, { contentType: mimetype || 'image/jpeg' })

    if (error) throw error

    const { data: publicUrl } = supabase.storage
      .from('uploads')
      .getPublicUrl(name)

    res.json({ url: publicUrl.publicUrl, filename: name })
  } catch (err: any) {
    console.error('Upload error:', err)
    res.status(500).json({ error: err.message || 'Failed to upload file' })
  }
})

// Health check
app.get('/api/health', (_req, res) => {
  res.json({ status: 'ok', timestamp: new Date().toISOString() })
})

export default app
