# The Sanskriti Academy

Website for **The Sanskriti Academy** — an educational institution focused on board exam preparation and academic excellence.

## Tech Stack

- **React 18** — UI framework
- **Vite 5** — Build tool & dev server
- **React Router 7** — Client-side routing
- **Tailwind CSS 4** — Styling
- **ESLint** — Linting

## Project Structure

```
src/
├── components/     # Reusable components (Navbar, Footer, EnrollPopup)
├── pages/          # Route pages (Home, About, Courses, Results, Faculty, Gallery, Contact)
├── App.jsx         # Main app & routing
├── main.jsx        # Entry point
└── index.css       # Global styles
```

## Getting Started

### Prerequisites

- Node.js 18+ 
- npm

### Installation

```bash
npm install
```

### Development

```bash
npm run dev
```

Runs the dev server at [http://localhost:5173](http://localhost:5173).

### Build

```bash
npm run build
```

Outputs to the `dist/` folder for production deployment.

### Preview Production Build

```bash
npm run preview
```

### Lint

```bash
npm run lint
```

## Pages

| Route   | Description                    |
|---------|--------------------------------|
| `/`     | Home — hero, features, CTA     |
| `/about`| About the academy              |
| `/courses` | Course offerings            |
| `/results`  | Student results & achievements |
| `/faculty`  | Faculty profiles             |
| `/gallery`  | Photo gallery               |
| `/contact`  | Contact information         |

## Features

- Responsive design (mobile-first)
- Enrollment popup with scroll-triggered demo class CTA
- Sticky navigation with mobile menu
- Scroll-to-top on route change
