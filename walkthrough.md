# Wedding Invitation Generator - Walkthrough

## What Was Built
Website generator undangan pernikahan digital dengan admin panel dan template undangan premium.

## Tech Stack
- **Frontend**: Vue 3 + TypeScript + Vite + Vue Router + Pinia
- **Backend**: Express + TypeScript + better-sqlite3 + Multer
- **Design**: Custom CSS with dark admin theme + elegant invitation styling

## Application Structure

```
c:\projek\undangan\
├── server/                    # Backend API
│   ├── src/
│   │   ├── index.ts           # Express server entry
│   │   ├── database.ts        # SQLite setup (3 tables)
│   │   └── routes/
│   │       ├── invitations.ts # CRUD API
│   │       ├── upload.ts      # Photo upload (Multer)
│   │       └── rsvp.ts        # Guest RSVP API
│   └── uploads/               # Uploaded photos storage
├── src/                       # Vue frontend
│   ├── views/admin/           # Admin panel pages
│   │   ├── DashboardView.vue
│   │   ├── CreateInvitationView.vue
│   │   └── EditInvitationView.vue
│   ├── views/invitation/
│   │   └── InvitationView.vue # Guest-facing invitation page
│   ├── stores/invitation.ts   # Pinia state management
│   ├── types/invitation.ts    # TypeScript interfaces
│   └── assets/main.css        # Complete design system
```

## Features

### Admin Panel (Dark Theme)
- Dashboard with stats (total invitations, photos, RSVPs)
- Search & filter invitations
- Create/Edit form with sections: URL slug, couple info, photo uploads, events, love story, gallery, extras
- Drag & drop photo upload
- Delete with confirmation modal

### Invitation Template (Elegant Theme)
- Full-screen cover with couple names & date
- Couple profiles with photos & family info
- Live countdown timer
- Event details (Akad & Resepsi) with Google Maps links
- Love Story timeline
- Photo gallery with lightbox
- RSVP form with guest messages
- Digital gift / bank transfer info
- Scroll-based fade-in animations
- Fully responsive for mobile

## Verification Results

### Admin Dashboard
![Admin Dashboard](admin_dashboard_empty_1773918406720.png)

### Create Invitation Form
![Create Form](create_invitation_page_1773918421186.png)

## How to Run

```bash
# Terminal 1 - Backend
cd server
npm install
npm run dev    # runs on http://localhost:3000

# Terminal 2 - Frontend
npm install
npm run dev    # runs on http://localhost:5173
```

### URLs
- **Admin Dashboard**: http://localhost:5173/
- **Create Invitation**: http://localhost:5173/create
- **View Invitation**: http://localhost:5173/invitation/{slug}
