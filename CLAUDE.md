# Claude Builder Club Website

## Stack
- **Framework:** Next.js 16 (App Router)
- **Styling:** Tailwind CSS v4 (CSS-first config via `@theme` in `app/globals.css`)
- **Language:** TypeScript
- **Fonts:** next/font/google — Fraunces (display) + Source Serif 4 (body)
- **Images:** next/image with SVG fallback via `components/shared/ImgFrame.tsx`
- **Package manager:** npm

## Commands
- `npm run dev` — start dev server (http://localhost:3000)
- `npm run build` — production build
- `npm run lint` — ESLint

## Architecture
- **App Router** with server components by default; client components only when browser APIs are needed
- **Design tokens** live in `@theme {}` block in `app/globals.css` — do NOT use `tailwind.config.ts` for theme values
- **All 13 CSS animations** are defined in `app/globals.css` as raw `@keyframes` — do not convert to Framer Motion
- **Animation triggers:** `html.intro-play` (blossom), `body.page-loaded` (reveal), `body.data-page` (page-specific delays) — these classes are set by client components `BlossomIntro.tsx` and `PageShell.tsx`

## Key Files
- `app/globals.css` — full design system (colors, typography, animations, components)
- `app/layout.tsx` — root layout with fonts, blossom intro, page shell
- `data/people.ts` — team member data (edit here to update People page)
- `data/links.ts` — all club URLs (Discord, Instagram, LinkedIn, etc.)
- `data/buildTracks.ts` — build track project list (homepage)
- `components/shared/BlossomIntro.tsx` — intro blossom animation (runs once per session on home)
- `components/shared/PageShell.tsx` — manages body classes for CSS animation triggers
- `types/index.ts` — Person, BuildTrack, ClubLink TypeScript types

## Conventions
- Prefer server components; add `'use client'` only when needed (browser APIs, useState, useEffect)
- New page-level colors/spacing → add to `@theme {}` in `globals.css`, not inline styles
- New components that mirror existing CSS class names → use `className="existing-class-name"` from globals.css rather than rewriting the styles as Tailwind utilities
- External links: use plain `<a target="_blank" rel="noopener noreferrer">`, not `<Link>`
- People/tracks data: update `data/` files, not JSX directly
