# The Sanskriti Academy

Marketing website for **The Sanskriti Academy** — a board-exam (BSEB & CBSE) coaching
institute in Aurangabad, Bihar, focused on Classes VIII–X.

The design direction is **clean and minimal**, not glossy/modern-startup. Think
"trustworthy local institute": calm typography, a single accent colour, real photos
of the campus instead of stock imagery.

## Tech Stack

- **React 18** + **Vite 5** (JSX, no TypeScript)
- **React Router 7** for client-side routing
- **Tailwind CSS** — loaded at runtime via the CDN script in `index.html`
  (`cdn.tailwindcss.com`). The `tailwindcss`/`postcss` dev deps in `package.json`
  are not currently wired to the build. If you want to move to a compiled
  Tailwind setup later, remove the CDN script and enable PostCSS.
- **ESLint** for linting

## Project Structure

```
src/
├── components/
│   ├── Navbar.jsx         # Sticky top nav with mobile menu
│   ├── Footer.jsx         # Site footer with contact block
│   ├── EnrollPopup.jsx    # Free-demo enquiry modal (auto-opens on scroll)
│   ├── ImageCarousel.jsx  # Minimal, dependency-free carousel
│   └── YouTubeEmbed.jsx   # Lite thumbnail-first YouTube embed
├── data/
│   ├── galleryImages.js   # Single source of truth for campus photos
│   ├── videos.js          # Manifest of YouTube videos (empty → "Coming Soon")
│   └── resources.js       # Google Drive API client for /resources page
├── pages/
│   ├── Home.jsx           # Hero, Why-Us, Life-at-Sanskriti carousel, Watch-Us-Teach, Faculty, CTA
│   ├── About.jsx
│   ├── Courses.jsx
│   ├── Results.jsx
│   ├── Faculty.jsx
│   ├── Gallery.jsx        # Carousel + filterable grid + lightbox
│   ├── Videos.jsx         # Video library — auto coming-soon state when videos.js is empty
│   ├── Resources.jsx      # Study material listing — pulls live from a Google Drive folder
│   └── Contact.jsx        # Info + enquiry form + embedded map
├── App.jsx                # Router + global EnrollPopup state
└── main.jsx               # Entry point

public/
└── images/                # Real campus photos (see naming convention below)
```

## Design System

Defined in `index.html` via the Tailwind CDN config.

| Token              | Value                                |
|--------------------|--------------------------------------|
| `primary`          | `#581c87` (deep purple — accent)     |
| `primary-hover`    | `#4c1d95`                            |
| `deep-blue`        | `#1e1b4b` (headings / footer)        |
| `background-light` | `#f8f7f5` (off-white page bg)        |
| Display font       | `Lexend`                             |
| Body font          | `Poppins`                            |
| Icon set           | Material Symbols Outlined (CDN)      |

**Design rules of thumb** (to keep the "minimal" feel):

- One accent colour per section — don't stack gradients.
- Prefer `font-semibold` / `font-bold` over `font-extrabold`.
- Headings: `text-3xl md:text-4xl`, not `text-5xl md:text-6xl`.
- Rounded-lg / rounded-xl over rounded-3xl.
- `border border-slate-200` + soft shadows instead of `shadow-2xl`.
- Avoid stacked `uppercase tracking-widest` labels — use one if needed.

## Images

Real campus photos live in `public/images/` and are referenced with absolute
paths (`/images/foo.png`) since Vite serves `public/` from the root.

Filenames follow a **descriptive kebab-case convention**:

```
classroom-smartboard.png
classroom-science-lesson.png
classroom-periodic-table.png
mentorship-session.png
student-project.png
award-ceremony-1.png
award-ceremony-2.png
award-ceremony-3.png
```

All photos are registered in `src/data/galleryImages.js` with `src`, `alt`,
`caption`, and `category`. **Add new photos here** — both the Home carousel
(`Life at Sanskriti` section) and the `/gallery` page read from this list
automatically.

The images are currently large (1–6 MB PNG screenshots). Before launch, convert
them to web-optimised JPEG/WebP (~200–400 KB each).

## Routes

| Route        | Purpose                                |
|--------------|----------------------------------------|
| `/`          | Hero, why-us, life carousel, faculty, CTA |
| `/about`     | Philosophy, mission/vision, director's message |
| `/courses`   | Class VIII / IX / X cards, batch schedule |
| `/results`   | Stats, board highlights, testimonials  |
| `/faculty`   | Detailed faculty bios                  |
| `/gallery`   | Featured carousel + filterable grid + lightbox |
| `/contact`   | Contact details + enquiry form + map placeholder |

## Key Behaviours

- **EnrollPopup** is hoisted in `App.jsx` and opened from Navbar, hero CTA, per-page
  CTAs, and automatically **once per session** when the user scrolls past 40% of
  the Home page (logic in `Home.jsx`, guarded by `sessionStorage`).
- **ScrollToTop** in `App.jsx` resets scroll on every route change.
- The **WhatsApp fab** is hard-coded in `index.html` and targets
  `https://wa.me/917033866582` (primary number).
- Forms (`EnrollPopup`, `Contact`) submit by **opening WhatsApp** with a
  pre-filled message containing the form data — no backend, no inbox to
  monitor. Target number lives in a `WHATSAPP_NUMBER` const at the top of each
  file. The `handleSubmit` function also flips a `submitted` state to show
  a confirmation card.

## Institute Details (used across the site)

- **Name:** The Sanskriti Academy
- **Address:** Bahuara More Deo, Bypass Road, Aurangabad, Bihar
- **Phones:** 7033866582 (primary / WhatsApp) · 8507020492
- **Email:** info@sanskriti.edu.in
- **Classes:** VIII, IX, X (BSEB & CBSE)
- **Tagline:** *Defining Success, The Sanskriti Way*
- **Navneet Prakash** — Founder & All Subjects Specialist
- **Vivek Prakash** — Director (Social Science & Humanities)
- **Priyanka Prakash** — Science HOD & Life Coach

## Getting Started

```bash
npm install
cp .env.example .env # then fill in the values (only needed for /resources)
npm run dev          # http://localhost:5173
npm run build        # dist/
npm run preview
npm run lint
```

## Environment Variables

The `/resources` page reads files from a public Google Drive folder via the
Drive API. Two env vars are needed (both prefixed `VITE_` so Vite exposes
them to the client bundle):

| Variable                      | Purpose                                              |
|-------------------------------|------------------------------------------------------|
| `VITE_GOOGLE_DRIVE_API_KEY`   | Drive API key (restricted to your domain + Drive API) |
| `VITE_GOOGLE_DRIVE_FOLDER_ID` | The Drive folder containing study material           |

If either is missing, `/resources` shows a "Setup needed" placeholder
locally (`import.meta.env.DEV`) and a friendly "Coming Soon" state in
production. Folder must be shared as **Anyone with the link can view**.

When deploying to Vercel / Netlify, register these vars in the hosting
dashboard — never commit `.env` (it's gitignored).

## Known Cleanups (nice-to-haves)

- `src/home.html` and `src/home2.html` are stale design references — safe to delete.
- `cookie` and `set-cookie-parser` are in `dependencies` but unused.
- Many strings in source (`â€”`, `â€"`, `â†'`, `Â·`, `âœ•`) are mojibake from an
  earlier copy-paste of em-dashes/bullets/arrows — worth a sweep.
- Tailwind is loaded via CDN while a compiled Tailwind config exists —
  pick one path and remove the other.
