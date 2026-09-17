# Repository guide

Claude Builder Club at McGill. Next.js 16 App Router, React 19, strict TypeScript, npm.

## Commands

- `npm run dev` starts the local development server.
- `npm run lint` runs ESLint with zero warnings permitted.
- `npm run build` typechecks and prerenders the production site. Run lint separately.
- `npm run start` serves the production build.

## Presentation

The site uses dark charcoal, warm cream text, and copper accents with Fraunces headings and system sans-serif body text. Shared tokens, navigation, buttons, and layout rules live in `app/globals.css`. Editorial layouts use `app/editorial.module.css`; gallery styles live beside its component.

Keep content server-rendered. Client behavior includes navigation, the native-dialog gallery, and progressive motion enhancements in `components/motion/`. The mobile menu uses native details/summary so navigation remains available without JavaScript; gallery thumbnails link directly to images as a fallback. Keep visible focus, reduced-motion support, keyboard controls, and focus restoration.

The user requested expressive animations after reviewing the minimal proposal. Keep the ambient glow, orbital artwork, floating photographs, scroll reveals, and pointer interactions. Motion must respect reduced-motion settings and the pause control; content must remain accessible without animation or JavaScript. Avoid a blocking intro or expired event countdown.

## Content and routes

- Edit `data/people.ts` for roster updates using named fields. Photos and bios are optional. Keep club-supplied names, roles, and bios; never invent replacements.
- Edit `data/buildTracks.ts` for projects and `data/links.ts` for club destinations.
- `/hackathon` is the April 4, 2026 recap. `/hackathon26` is a past-event archive. Conflicting historical duration claims were omitted; confirm the schedule with club records before adding it.
- Preserve the `/roulette` rewrites in `vercel.json`.
- Use existing real club photography and optimized Next images. No stock or generated photos.
- Check all six routes at 360px, 768px, and 1440px and with JavaScript disabled after material layout changes.
