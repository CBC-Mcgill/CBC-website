# CLAUDE.md

This file provides guidance to Claude Code (claude.ai/code) when working with code in this repository.

## Project

Claude Builder Club at McGill — student chapter site. Live at https://www.claudebuildersmcgill.ca/ (canonical) and https://cbc-website-mocha.vercel.app/.

## Stack

- **Framework:** Next.js 16 (App Router, Turbopack dev) on React 19
- **Styling:** Tailwind CSS v4 — CSS-first config via `@theme {}` block. There is **no** `tailwind.config.ts`.
- **Language:** TypeScript (strict)
- **Fonts:** `next/font/google` — Fraunces (display, variable; axes: `opsz`, `SOFT`, `WONK`) + Source Serif 4 (body, variable; axis: `opsz`)
- **Icons:** `@lobehub/icons` (Claude marks) and local SVG components in `components/icons/`
- **Package manager:** npm

## Commands

- `npm run dev` — Turbopack dev server (http://localhost:3000)
- `npm run build` — production build (typechecks + lints + prerenders every route as static HTML)
- `npm run lint` — `eslint . --max-warnings=0` (one warning fails the build)
- `npm run start` — serve a built bundle

## Architecture

### Rendering

- Server components by default. `'use client'` only for state, effects, or browser APIs.
- Every route prerenders to static HTML at build time. Verify with `npm run build` — each route should be marked `○ (Static)`.
- The WebGL shader background (`HeroShader`) is mounted at **the layout level** (`app/layout.tsx`), not inside the homepage hero. It's a `position: fixed; inset: 0` ambient background visible on every page. The hero section is content-only.

### Design system layers

`app/globals.css` does three things only:
1. `@import "tailwindcss"`
2. Imports the nine concern-scoped stylesheets under `app/styles/` (`base`, `layout`, `buttons`, `forms`, `components`, `people`, `animations`, `intro`, `hackathon`)
3. Defines tokens in `@theme {}` (colors/spacing/radii/fonts/eases) and `:root {}` (the `--accent-r/g/b` RGB channels for `rgba()` calls, plus `--space-*` and `--container-width`)

The bulk of "design system" is **not** in `globals.css` itself — it's in `app/styles/*.css`. Page-specific styles belong in `components.css` unless they fit one of the other files (hackathon page → `hackathon.css`, etc.).

**Token sync gotcha:** if you change `--color-accent` in `@theme`, you must also update `--accent-r/g/b` in `:root` manually — CSS can't extract RGB channels from a hex value, and many `rgba(var(--accent-r),...)` calls depend on them.

### Animations

All motion is raw `@keyframes` in `styles/animations.css`. Do **not** introduce Framer Motion.

Triggered by class manipulation on `<html>` and `<body>`:
- `html.intro-play` / `html.intro-complete` — set by `BlossomIntro.tsx`, only on `/` and only once per session (`sessionStorage.cbcIntroPlayed` gate).
- `body.page-loaded` / `body.page-initialized` — set by `PageShell.tsx`. Reveal animations match `body.page-loaded:not(.page-initialized) .reveal { animation: riseIn ... }` and run during a ~1.8s window after each route change, then freeze. **`PageShell` re-toggles these on every nav**, so reveals replay on every page change. That's a product choice (deliberately "alive" navigation), not a bug — don't simplify it away.

### Glassmorphism

`.soft-panel` (used by home sections + About page panels) uses Apple-style glass: `backdrop-filter: blur(16px) saturate(180%) brightness(1.05)`, paired inset top-highlight + bottom-shadow, and a `::before` top-half reflection gradient. It's globally shared — adjusting any value affects every panel. The blueprint cards inside (`.blueprint`) are intentionally **darker/matte** to avoid glass-on-glass muddiness.

### Build Tracks section

Status filtering on `/#build-tracks` uses a custom dropdown (`StatusFilter` inline-defined inside `components/home/BuildTracksSection.tsx`) instead of native `<select>`. The native widget can't be fully styled in dark contexts (OS draws the open popup), so we replaced it with a button + listbox. If you need similar styled dropdowns elsewhere, copy that pattern.

## Key files

- `app/layout.tsx` — fonts, `<HeroShader>` (page-wide), `<BlossomIntro>`, `<PageShell>`, header/footer
- `app/globals.css` — token definitions + stylesheet imports only
- `app/styles/components.css` — hero copy, `.soft-panel`, `.blueprint`, `.track-canvas`, `.stat-callout`, `.tracks-select`, `.section`, `.card`, etc. (largest stylesheet)
- `components/shared/PageShell.tsx` — route-change class manager (`page-loaded` / `page-initialized` / `data-page`)
- `components/home/HeroShader.tsx` — raw WebGL canvas (no Three.js); mouse-reactive + click ripples; honors `prefers-reduced-motion`
- `data/people.ts`, `data/buildTracks.ts`, `data/links.ts` — content sources. **Edit data files, not JSX**, when adding/changing people, projects, or links.
- `types/index.ts` — `Person`, `BuildTrack`, `BuildTrackStatus`, `ClubLinks`

## Conventions

- **Prefer existing CSS class names** (`.soft-panel`, `.section-title`, `.btn`, `.blueprint`, `.stat-callout`) over inventing new Tailwind utilities. The CSS layer is the source of truth.
- **External links:** plain `<a target="_blank" rel="noopener noreferrer">`. Use `next/link` only for internal navigation.
- **Typographic punctuation in JSX text:** `&rsquo;` for `'`, `&mdash;` for `—`. See `app/about/page.tsx` for the established pattern.
- **No `tailwind.config.ts`** — design tokens belong in `@theme {}` inside `globals.css`.

## Known state

- `app/hackathon/page.tsx` has pre-existing `<img>` warnings that fail `npm run lint`'s zero-tolerance rule. Lint your own changes via `npx eslint <path>` instead of the full project until those `<img>` tags become `next/image`.
- The `.claude/worktrees/` directory may shadow source files in grep results — exclude it when searching codebase-wide.
