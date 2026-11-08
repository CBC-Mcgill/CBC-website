# Repository guide

Claude Builder Club at McGill. Next.js 16 App Router, React 19, strict TypeScript, npm, plain CSS (no Tailwind).
Live at https://www.claudebuildersmcgill.ca (canonical) and https://cbc-website-mocha.vercel.app.

## Commands

- `npm run dev` starts the dev server (Turbopack).
- `npm run lint` runs ESLint with zero warnings permitted.
- `npm run build` typechecks and prerenders every route. Each route must stay `○ (Static)`.
- `npm run start` serves the production build.

## Design system

The look is a workbench: white paper, black type, one brand blue, flat colour bands with hard edges, and real artefacts (product screenshots and club photography) doing the visual work.
No gradients, glass, glows, or decorative art.

### Tokens (`app/globals.css`)

| Token | Value | Use |
|---|---|---|
| `--white` | `#ffffff` | Page background. Never cream or off-white. |
| `--black` | `#000000` | Headings, primary buttons, the black band, footer rule. |
| `--blue` | `#2338e5` | Brand colour: the blue band, hover states, focus ring, links on hover. |
| `--blue-deep` | `#1626b4` | Text on `--ice`. |
| `--marigold` | `#ffc928` | The energy colour: masking tape, the Live chip and stickers, selection, hover on dark bands, and at most one `.band-marigold` section per page. |
| `--ice` | `#eef0ff` | Tinted surface behind screenshots and the In progress chip. |
| `--ink-2` / `--ink-3` | `#262626` / `#5c5c5c` | Body copy / secondary copy. |

Type scale: `--text-display` (hero only), `--text-h1`, `--text-h2`, `--text-h3`, `--text-lead`, `--text-body` (17px), `--text-small`, `--text-tiny`.
Space: `--s-1` (4px) to `--s-9` (96px), plus `--section-y` for section padding.
Shape: `--r-sm` 4px (chips), `--r-md` 6px (buttons), `--r-lg` 10px (frames). Nothing is pill-shaped.

### Typography

One family, Bricolage Grotesque, loaded in `app/layout.tsx` with the `opsz` and `wdth` axes as `--font-bricolage`.
Headings are condensed poster type: `h1` and `.display` at weight 800 with `font-stretch` 84 to 88%, `h2` at weight 700 and 92%; body is weight 400 at full width.
The header wordmark and the giant footer wordmark are plain text, "Claude Builder Club McGill". There is no logo mark; the favicon is just the letters CBC.
Do not italicize or recolour a single word in a heading.
Do not add eyebrow labels, all-caps labels, numbered `01 / 02 / 03` markers, or monospace labels.
Join metadata with plain words or spacing, not middle dots.
Do not append arrows to link or button text.

### Shared classes

- Layout: `.container`, `.band`, `.band-blue`, `.band-black`, `.band-ice`, `.band-marigold`, `.section-head`, `.page-head`.
- Workbench motifs: `.paper` (dot-grid engineering paper, hero only), `.tape` with `.tape-left` / `.tape-right` (a yellow masking-tape strip on a `position: relative` print), `.sticker` (a chip stuck on a frame corner). Every product screenshot is a taped-down print; portraits stay untaped.
- Type: `.display`, `.lead`, `.muted`, `.small`.
- Buttons: `.btn`, `.btn-outline`, `.btn-sm`, grouped in `.actions`. Dark bands restyle buttons automatically.
- Chips: `.chip` with `.chip-live`, `.chip-building`, `.chip-muted`. Use `statusChipClass` and `statusLabel` from `data/projects.ts`.
- Media: `.frame` wraps an image with the standard radius, border and ice background.

Page-specific layout goes in a CSS module beside the page (`app/<route>/<route>.module.css`).
Reuse the shared classes before writing new ones.
Use `next/image` for every raster image; `next.config.ts` allows `/assets/**`.

### Motion

One orchestrated moment per page at most (the home hero prints settle in on load), plus motion that answers the visitor: dragging the prints on the home bench, hover feedback.
No scroll reveals, pointer tilt, marquees, countdowns, or ambient animation.
`globals.css` already collapses all motion under `prefers-reduced-motion`.

### Accessibility floor

Visible focus (3px blue ring, white on dark bands), skip link, native `details`/`summary` mobile menu that works without JavaScript, alt text on every image, 4.5:1 contrast for text.
Check every route at 360px, 768px and 1440px after layout changes.

## Content and routes

- `/` home, `/projects`, `/hackathon`, `/people`, `/about`, `/contact`.
- `/sponsors` rewrites to `public/sponsors.html`, a standalone print-ready sponsorship package with its own styles. Leave it alone unless the package changes.
- `/roulette` rewrites (in `vercel.json`) to the Claude Roulette app. Preserve them.
- `/hackathon26` redirects to `/hackathon`.
- Edit `data/projects.ts` for projects, `data/people.ts` for the roster, `data/links.ts` for club destinations, `data/hackathonTracks.ts` for the hackathon tracks.
- Keep club-supplied names, roles, taglines and numbers; never invent replacements.
- Project screenshots live in `public/assets/projects/` and are real captures of the products. Club photos live in `public/assets/hackathon_26_photos/` and `public/assets/people/`. No stock or generated imagery.
- There is no logo. The wordmark is text, and `app/icon.svg` is the letters CBC on marigold. The look is deliberately independent of Claude or Anthropic branding.
