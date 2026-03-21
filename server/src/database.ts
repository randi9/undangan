import { createClient } from '@libsql/client'
import path from 'path'
import * as dotenv from 'dotenv'

dotenv.config()

const dbPath = path.join(__dirname, '..', 'database.sqlite')
const dbUrl = process.env.TURSO_DATABASE_URL || `file:${dbPath}`
const dbAuthToken = process.env.TURSO_AUTH_TOKEN

const db = createClient({
  url: dbUrl,
  authToken: dbAuthToken
})

// Create tables
export const initDb = async () => {
  try {
    await db.executeMultiple(`
      CREATE TABLE IF NOT EXISTS invitations (
        id TEXT PRIMARY KEY,
        slug TEXT UNIQUE NOT NULL,
        theme TEXT DEFAULT 'elegant',
        groom_name TEXT NOT NULL,
        bride_name TEXT NOT NULL,
        groom_full_name TEXT DEFAULT '',
        bride_full_name TEXT DEFAULT '',
        groom_father TEXT DEFAULT '',
        groom_mother TEXT DEFAULT '',
        bride_father TEXT DEFAULT '',
        bride_mother TEXT DEFAULT '',
        groom_photo TEXT DEFAULT '',
        bride_photo TEXT DEFAULT '',
        cover_photo TEXT DEFAULT '',
        akad_date TEXT DEFAULT '',
        akad_time TEXT DEFAULT '',
        akad_venue TEXT DEFAULT '',
        akad_address TEXT DEFAULT '',
        akad_map_url TEXT DEFAULT '',
        resepsi_date TEXT DEFAULT '',
        resepsi_time TEXT DEFAULT '',
        resepsi_venue TEXT DEFAULT '',
        resepsi_address TEXT DEFAULT '',
        resepsi_map_url TEXT DEFAULT '',
        love_story TEXT DEFAULT '[]',
        quote TEXT DEFAULT '',
        bank_name TEXT DEFAULT '',
        bank_account TEXT DEFAULT '',
        bank_holder TEXT DEFAULT '',
        created_at TEXT DEFAULT (datetime('now')),
        updated_at TEXT DEFAULT (datetime('now'))
      );

      CREATE TABLE IF NOT EXISTS photos (
        id TEXT PRIMARY KEY,
        invitation_id TEXT NOT NULL,
        url TEXT NOT NULL,
        caption TEXT DEFAULT '',
        sort_order INTEGER DEFAULT 0,
        created_at TEXT DEFAULT (datetime('now')),
        FOREIGN KEY (invitation_id) REFERENCES invitations(id) ON DELETE CASCADE
      );

      CREATE TABLE IF NOT EXISTS rsvps (
        id TEXT PRIMARY KEY,
        invitation_id TEXT NOT NULL,
        guest_name TEXT NOT NULL,
        attendance TEXT NOT NULL,
        guest_count INTEGER DEFAULT 1,
        message TEXT DEFAULT '',
        created_at TEXT DEFAULT (datetime('now')),
        FOREIGN KEY (invitation_id) REFERENCES invitations(id) ON DELETE CASCADE
      );
    `)
    console.log('Database initialized successfully')
  } catch (err) {
    console.error('Failed to initialize database', err)
  }
}

initDb()

export default db
