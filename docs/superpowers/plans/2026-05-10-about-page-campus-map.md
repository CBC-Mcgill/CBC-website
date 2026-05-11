# About Page Campus Map Implementation Plan

> **For agentic workers:** REQUIRED SUB-SKILL: Use superpowers:subagent-driven-development (recommended) or superpowers:executing-plans to implement this plan task-by-task. Steps use checkbox (`- [ ]`) syntax for tracking.

**Goal:** Replace the `/about` page hero with a world map of 78 Claude Campus universities rendered as orange dots, with hover/focus tooltips.

**Architecture:** A new server component (`CampusMapSection`) renders a static SVG world map (equirectangular projection, 2:1) with absolutely-positioned `<button>` dots computed from per-school `{lat, lng}`. Tooltips are CSS-only. Pulse animation honors `prefers-reduced-motion`.

**Tech Stack:** Next.js 16 App Router, React 19, TypeScript, Tailwind v4 (`@theme` tokens only), raw CSS in `app/styles/*.css`, no new npm dependencies.

**Spec:** `docs/superpowers/specs/2026-05-10-about-page-campus-map-design.md`

**Verification convention.** This project has no test framework. Each task's "verify" step uses `npx eslint <files> --max-warnings=0` (project lints with zero tolerance) and, when the task changes rendering, a `npm run build` to confirm static generation still works. The final task does a manual browser check.

---

## File Map

| File | Action | Responsibility |
|------|--------|----------------|
| `data/claudeCampusSchools.ts` | create | Roster + `CampusSchool` type |
| `types/index.ts` | edit | Re-export `CampusSchool` |
| `public/assets/maps/world-equirectangular.svg` | create | Static map background |
| `components/about/CampusMapSection.tsx` | create | Server component renders section + SVG + dot buttons |
| `app/styles/components.css` | edit | `.campus-map-*` styles (one learning-mode slot for hover/focus CSS) |
| `app/styles/animations.css` | edit | `@keyframes campusDotPulse` |
| `app/about/page.tsx` | edit | Remove hero, mount `<CampusMapSection />`, update "A global initiative" copy |

---

## Task 1: Add the school roster data file

**Files:**
- Create: `data/claudeCampusSchools.ts`
- Edit: `types/index.ts`

- [ ] **Step 1.1: Create the data file**

Create `data/claudeCampusSchools.ts` with exactly this content:

```ts
export type CampusSchool = {
  name: string;
  country: string;
  lat: number;
  lng: number;
};

export const claudeCampusSchools: CampusSchool[] = [
  // United States
  { name: 'Arizona State University', country: 'USA', lat: 33.4242, lng: -111.9281 },
  { name: 'California Institute of Technology', country: 'USA', lat: 34.1377, lng: -118.1253 },
  { name: 'Carnegie Mellon University', country: 'USA', lat: 40.4433, lng: -79.9436 },
  { name: 'Columbia University', country: 'USA', lat: 40.8075, lng: -73.9626 },
  { name: 'Cornell University', country: 'USA', lat: 42.4534, lng: -76.4735 },
  { name: 'Dartmouth College', country: 'USA', lat: 43.7044, lng: -72.2887 },
  { name: 'Duke University', country: 'USA', lat: 36.0014, lng: -78.9382 },
  { name: 'Georgetown University', country: 'USA', lat: 38.9076, lng: -77.0723 },
  { name: 'Georgia Institute of Technology', country: 'USA', lat: 33.7756, lng: -84.3963 },
  { name: 'Harvard University', country: 'USA', lat: 42.3744, lng: -71.1169 },
  { name: 'Illinois Institute of Technology', country: 'USA', lat: 41.8350, lng: -87.6270 },
  { name: 'Indiana University Bloomington', country: 'USA', lat: 39.1682, lng: -86.5230 },
  { name: 'Massachusetts Institute of Technology', country: 'USA', lat: 42.3601, lng: -71.0942 },
  { name: 'Michigan State University', country: 'USA', lat: 42.7018, lng: -84.4822 },
  { name: 'Minnesota State University, Mankato', country: 'USA', lat: 44.1463, lng: -93.9994 },
  { name: 'New Jersey Institute of Technology', country: 'USA', lat: 40.7421, lng: -74.1786 },
  { name: 'New York University', country: 'USA', lat: 40.7295, lng: -73.9965 },
  { name: 'Northeastern University', country: 'USA', lat: 42.3398, lng: -71.0892 },
  { name: 'Northwestern University', country: 'USA', lat: 42.0565, lng: -87.6753 },
  { name: 'Ohio State University', country: 'USA', lat: 40.0067, lng: -83.0305 },
  { name: 'Pennsylvania State University', country: 'USA', lat: 40.7982, lng: -77.8599 },
  { name: 'Princeton University', country: 'USA', lat: 40.3431, lng: -74.6551 },
  { name: 'Purdue University', country: 'USA', lat: 40.4237, lng: -86.9212 },
  { name: 'Rice University', country: 'USA', lat: 29.7174, lng: -95.4018 },
  { name: 'Stanford University', country: 'USA', lat: 37.4275, lng: -122.1697 },
  { name: 'Syracuse University', country: 'USA', lat: 43.0387, lng: -76.1351 },
  { name: 'The University of Texas at Austin', country: 'USA', lat: 30.2849, lng: -97.7341 },
  { name: 'University of California, Berkeley', country: 'USA', lat: 37.8719, lng: -122.2585 },
  { name: 'University of California, Irvine', country: 'USA', lat: 33.6404, lng: -117.8443 },
  { name: 'University of California, Los Angeles', country: 'USA', lat: 34.0689, lng: -118.4452 },
  { name: 'University of California, San Diego', country: 'USA', lat: 32.8801, lng: -117.2340 },
  { name: 'University of Chicago', country: 'USA', lat: 41.7886, lng: -87.5987 },
  { name: 'University of Florida', country: 'USA', lat: 29.6436, lng: -82.3549 },
  { name: 'University of Georgia', country: 'USA', lat: 33.9480, lng: -83.3773 },
  { name: 'University of Illinois Urbana-Champaign', country: 'USA', lat: 40.1020, lng: -88.2272 },
  { name: 'University of Louisville', country: 'USA', lat: 38.2154, lng: -85.7585 },
  { name: 'University of Maryland', country: 'USA', lat: 38.9869, lng: -76.9426 },
  { name: 'University of Massachusetts Amherst', country: 'USA', lat: 42.3868, lng: -72.5301 },
  { name: 'University of Michigan, Ann Arbor', country: 'USA', lat: 42.2780, lng: -83.7382 },
  { name: 'University of Missouri', country: 'USA', lat: 38.9404, lng: -92.3277 },
  { name: 'University of Nevada, Las Vegas', country: 'USA', lat: 36.1072, lng: -115.1426 },
  { name: 'University of North Carolina at Chapel Hill', country: 'USA', lat: 35.9049, lng: -79.0469 },
  { name: 'University of Pennsylvania', country: 'USA', lat: 39.9522, lng: -75.1932 },
  { name: 'University of Pittsburgh', country: 'USA', lat: 40.4444, lng: -79.9608 },
  { name: 'University of San Francisco', country: 'USA', lat: 37.7765, lng: -122.4506 },
  { name: 'University of Southern California', country: 'USA', lat: 34.0224, lng: -118.2851 },
  { name: 'University of Virginia', country: 'USA', lat: 38.0336, lng: -78.5080 },
  { name: 'University of Washington, Seattle', country: 'USA', lat: 47.6553, lng: -122.3035 },
  { name: 'University of Wisconsin-Madison', country: 'USA', lat: 43.0766, lng: -89.4125 },
  { name: 'Vanderbilt University', country: 'USA', lat: 36.1447, lng: -86.8027 },
  { name: 'Yale University', country: 'USA', lat: 41.3163, lng: -72.9223 },

  // Canada
  { name: 'McGill University', country: 'Canada', lat: 45.5048, lng: -73.5772 },
  { name: 'University of Toronto', country: 'Canada', lat: 43.6629, lng: -79.3957 },
  { name: 'University of Victoria', country: 'Canada', lat: 48.4634, lng: -123.3117 },
  { name: 'University of Waterloo', country: 'Canada', lat: 43.4723, lng: -80.5449 },

  // United Kingdom
  { name: 'Imperial College London', country: 'UK', lat: 51.4988, lng: -0.1749 },
  { name: 'London Business School', country: 'UK', lat: 51.5252, lng: -0.1604 },
  { name: 'London School of Economics', country: 'UK', lat: 51.5145, lng: -0.1167 },
  { name: 'Northumbria University', country: 'UK', lat: 54.9821, lng: -1.6097 },
  { name: 'University College London', country: 'UK', lat: 51.5246, lng: -0.1340 },
  { name: 'University of Cambridge', country: 'UK', lat: 52.2043, lng: 0.1218 },
  { name: 'University of Edinburgh', country: 'UK', lat: 55.9445, lng: -3.1875 },
  { name: 'University of Oxford', country: 'UK', lat: 51.7548, lng: -1.2544 },

  // Ireland
  { name: 'Trinity College Dublin', country: 'Ireland', lat: 53.3438, lng: -6.2546 },
  { name: 'University College Cork', country: 'Ireland', lat: 51.8927, lng: -8.4922 },

  // Continental Europe
  { name: 'ETH Zürich', country: 'Switzerland', lat: 47.3763, lng: 8.5485 },
  { name: 'Technical University of Munich', country: 'Germany', lat: 48.1496, lng: 11.5685 },

  // India
  { name: 'BITS Pilani', country: 'India', lat: 28.3568, lng: 75.5870 },
  { name: 'Indian Institute of Technology Bombay', country: 'India', lat: 19.1334, lng: 72.9133 },
  { name: 'Indian Institute of Technology Delhi', country: 'India', lat: 28.5450, lng: 77.1926 },
  { name: 'Indian Institute of Technology Madras', country: 'India', lat: 12.9916, lng: 80.2336 },

  // Africa
  { name: 'African Leadership University Rwanda', country: 'Rwanda', lat: -1.9536, lng: 30.0606 },
  { name: 'Kwame Nkrumah University of Science & Technology', country: 'Ghana', lat: 6.6738, lng: -1.5712 },
  { name: 'Makerere University', country: 'Uganda', lat: 0.3354, lng: 32.5703 },
  { name: 'University of Ghana', country: 'Ghana', lat: 5.6505, lng: -0.1864 },
  { name: 'University of Lagos', country: 'Nigeria', lat: 6.5158, lng: 3.3964 },
  { name: 'University of Nairobi', country: 'Kenya', lat: -1.2796, lng: 36.8169 },
  { name: 'University of Rwanda', country: 'Rwanda', lat: -2.5994, lng: 29.7392 },
];
```

- [ ] **Step 1.2: Re-export the type**

Open `types/index.ts` and append (or insert next to similar re-exports — match the style already in that file):

```ts
export type { CampusSchool } from '@/data/claudeCampusSchools';
```

If `types/index.ts` doesn't have other `export type` lines and the existing pattern is in-file definitions, instead leave the type defined in the data file and import it directly where needed. **Inspect `types/index.ts` first; follow the existing pattern.**

- [ ] **Step 1.3: Lint and verify count**

Run:
```
npx eslint data/claudeCampusSchools.ts types/index.ts --max-warnings=0
```
Expected: no warnings, no errors.

Quick count check in PowerShell:
```
(Select-String -Path data\claudeCampusSchools.ts -Pattern "{ name:").Count
```
Expected: `78`

- [ ] **Step 1.4: Commit**

```
git add data/claudeCampusSchools.ts types/index.ts
git commit -m "feat(about): add Claude Campus schools roster data"
```

---

## Task 2: Add the world map SVG asset

**Files:**
- Create: `public/assets/maps/world-equirectangular.svg`

- [ ] **Step 2.1: Source a public-domain world outline SVG**

We need a 2:1 equirectangular world map (typically viewBox `0 0 1000 500` or `0 0 2000 1000`) with country borders only — no fill, no labels, no graticule. Wikimedia Commons hosts several public-domain options. The implementer downloads one of these (try in order; each is CC0 / public-domain):

1. `https://upload.wikimedia.org/wikipedia/commons/8/80/World_map_-_low_resolution.svg`
2. `https://upload.wikimedia.org/wikipedia/commons/e/ec/World_location_map_%28equirectangular_180%29.svg`
3. `https://upload.wikimedia.org/wikipedia/commons/4/4d/BlankMap-World.svg`

From PowerShell:
```
mkdir public\assets\maps -Force
Invoke-WebRequest -Uri "https://upload.wikimedia.org/wikipedia/commons/8/80/World_map_-_low_resolution.svg" -OutFile "public\assets\maps\world-equirectangular.svg"
```

If the URL 404s, try the next one in the list. Open the saved SVG in a browser to confirm: should show world country outlines in equirectangular projection with no fill (or a light fill that can be overridden with CSS).

- [ ] **Step 2.2: Verify viewBox is 2:1 equirectangular**

Open `public/assets/maps/world-equirectangular.svg` in your editor and check the root `<svg>` tag. It should have a `viewBox` whose width/height ratio is 2:1 (e.g., `0 0 2058 1029`, `0 0 1009.6727 665.96301` is **not** correct).

If the chosen file isn't 2:1, pick a different URL from the list. The dot positioning math in Task 4 assumes 2:1.

- [ ] **Step 2.3: Strip color/fill so CSS can style it**

Open the SVG and remove any hard-coded `fill="#..."` attributes from `<path>` elements (replace with `fill="none"`) and remove any hard-coded `stroke` attributes. We'll style strokes from CSS. The simplest find/replace in the file:

- Replace every `fill="#[0-9a-fA-F]+"` with `fill="none"`
- Replace every `stroke="#[0-9a-fA-F]+"` with no attribute (or `stroke="currentColor"`)

If the file uses inline `<style>` tags, edit those instead. Goal: at end, the SVG renders nothing visible by default; CSS will provide stroke color and width.

- [ ] **Step 2.4: Commit**

```
git add public/assets/maps/world-equirectangular.svg
git commit -m "feat(about): add public-domain world map SVG asset"
```

---

## Task 3: Create the CampusMapSection component (skeleton)

**Files:**
- Create: `components/about/CampusMapSection.tsx`

- [ ] **Step 3.1: Write the component**

Create `components/about/CampusMapSection.tsx` with this exact content:

```tsx
import Image from 'next/image';
import { claudeCampusSchools, type CampusSchool } from '@/data/claudeCampusSchools';

function dotPosition(school: CampusSchool): { left: string; top: string } {
  const left = ((school.lng + 180) / 360) * 100;
  const top = ((90 - school.lat) / 180) * 100;
  return { left: `${left}%`, top: `${top}%` };
}

export function CampusMapSection() {
  return (
    <section className="section">
      <div className="container">
        <figure className="campus-map-panel soft-panel">
          <figcaption className="campus-map-caption">
            <p
              className="eyebrow reveal"
              style={{ '--delay': '0.1s' } as React.CSSProperties}
            >
              Claude Campus Program
            </p>
            <h1
              className="campus-map-title reveal"
              style={{ '--delay': '0.2s' } as React.CSSProperties}
            >
              A network of student builders, worldwide.
            </h1>
            <p
              className="campus-map-lead reveal"
              style={{ '--delay': '0.3s' } as React.CSSProperties}
            >
              {claudeCampusSchools.length} universities. {new Set(claudeCampusSchools.map((s) => s.country)).size} countries. One global community of students building with Claude.
            </p>
          </figcaption>

          <div className="campus-map" role="img" aria-label={`World map showing ${claudeCampusSchools.length} Claude Campus universities`}>
            <Image
              src="/assets/maps/world-equirectangular.svg"
              alt=""
              aria-hidden="true"
              width={2000}
              height={1000}
              className="campus-map__svg"
              priority={false}
            />
            <ul className="campus-map__dots">
              {claudeCampusSchools.map((school, i) => {
                const pos = dotPosition(school);
                return (
                  <li
                    key={school.name}
                    className="campus-map__dot-wrap"
                    style={{
                      left: pos.left,
                      top: pos.top,
                      ['--i' as string]: i,
                    } as React.CSSProperties}
                  >
                    <button
                      type="button"
                      className="campus-map__dot"
                      aria-label={`${school.name}, ${school.country}`}
                    >
                      <span className="campus-map__tooltip">{school.name}</span>
                    </button>
                  </li>
                );
              })}
            </ul>
          </div>
        </figure>
      </div>
    </section>
  );
}
```

- [ ] **Step 3.2: Lint**

Run:
```
npx eslint components/about/CampusMapSection.tsx --max-warnings=0
```
Expected: no warnings, no errors. If ESLint complains about `next/image` and SVG, that's the same `<img>` rule the existing `app/hackathon/page.tsx` runs into — we're using `next/image` so it should pass.

- [ ] **Step 3.3: Commit**

```
git add components/about/CampusMapSection.tsx
git commit -m "feat(about): add CampusMapSection component"
```

---

## Task 4: Add map and dot styles + pulse animation

**Files:**
- Edit: `app/styles/components.css`
- Edit: `app/styles/animations.css`

- [ ] **Step 4.1: Add the pulse keyframes**

Open `app/styles/animations.css` and append at the end of the file:

```css
@keyframes campusDotPulse {
  0%,
  100% {
    box-shadow: 0 0 0 0 rgba(var(--accent-r), var(--accent-g), var(--accent-b), 0.55);
  }
  50% {
    box-shadow: 0 0 0 10px rgba(var(--accent-r), var(--accent-g), var(--accent-b), 0);
  }
}
```

- [ ] **Step 4.2: Add the panel, map, and dot base styles**

Open `app/styles/components.css` and append at the end of the file:

```css
/* ── Campus map ─────────────────────────────────────────── */

.campus-map-panel {
  display: grid;
  gap: var(--space-3);
  padding: var(--space-4);
}

.campus-map-caption {
  display: grid;
  gap: 0.6rem;
  margin: 0;
}

.campus-map-title {
  font-family: var(--font-fraunces);
  font-weight: 500;
  font-size: clamp(1.85rem, 3.2vw, 2.7rem);
  letter-spacing: -0.01em;
  line-height: 1.1;
  margin: 0;
  color: var(--color-fg);
}

.campus-map-lead {
  color: var(--color-muted);
  font-size: 0.98rem;
  max-width: 60ch;
  margin: 0;
}

.campus-map {
  position: relative;
  width: 100%;
  aspect-ratio: 2 / 1;
  border-radius: var(--radius-md, 14px);
  overflow: hidden;
}

.campus-map__svg {
  width: 100%;
  height: 100%;
  object-fit: cover;
  opacity: 0.55;
  filter: saturate(0) brightness(0) invert(1);
  /* invert + grayscale renders the world outline as soft white-on-glass */
  pointer-events: none;
}

.campus-map__dots {
  position: absolute;
  inset: 0;
  margin: 0;
  padding: 0;
  list-style: none;
}

.campus-map__dot-wrap {
  position: absolute;
  transform: translate(-50%, -50%);
  width: 0;
  height: 0;
}

.campus-map__dot {
  appearance: none;
  -webkit-appearance: none;
  position: absolute;
  top: 0;
  left: 0;
  transform: translate(-50%, -50%);
  width: 10px;
  height: 10px;
  padding: 0;
  border: 0;
  border-radius: 50%;
  background: var(--color-accent);
  cursor: pointer;
  animation: campusDotPulse 2.4s var(--ease-soft, ease-in-out) infinite;
  animation-delay: calc(var(--i, 0) * 80ms);
  transition: transform 180ms var(--ease-soft, ease-in-out);
}

.campus-map__tooltip {
  position: absolute;
  bottom: calc(100% + 8px);
  left: 50%;
  transform: translate(-50%, 4px);
  padding: 0.35rem 0.6rem;
  background: rgba(20, 18, 16, 0.92);
  color: #fff;
  font-size: 0.78rem;
  font-family: var(--font-source-serif);
  white-space: nowrap;
  border-radius: 6px;
  pointer-events: none;
  opacity: 0;
  transition: opacity 160ms var(--ease-soft, ease-in-out),
    transform 160ms var(--ease-soft, ease-in-out);
  box-shadow: 0 4px 18px rgba(0, 0, 0, 0.25);
  z-index: 2;
}

/*
 * ─────────────────────────────────────────────────────────
 * LEARNING-MODE CONTRIBUTION SLOT
 * ─────────────────────────────────────────────────────────
 * Define how a dot reacts on hover and keyboard focus.
 *
 * The wrapper exposes `.campus-map__dot:hover`, `.campus-map__dot:focus-visible`,
 * and the descendant `.campus-map__tooltip`. Write 5-10 lines below that:
 *
 *   1. Reveals the tooltip (set `.campus-map__tooltip` to `opacity: 1` and
 *      `transform: translate(-50%, 0)`).
 *   2. Indicates the focused dot itself. Pick ONE approach — each has a different feel:
 *
 *        (a) Pure tooltip reveal — dot stays the same size, only the tooltip shows.
 *            Cleanest, most minimal.
 *        (b) Scale-up — dot grows to 1.25× or 1.4×. Most "selected".
 *        (c) Ring expand — drop a `box-shadow: 0 0 0 6px rgba(...)` ring around it.
 *            Most "ripple-y", borrows the existing pulse vocabulary.
 *
 * Whatever you pick, also handle `:focus-visible` (keyboard) with the same visual
 * so keyboard users see the same affordance as mouse users.
 *
 * TODO: write your hover/focus rule here.
 */

@media (prefers-reduced-motion: reduce) {
  .campus-map__dot {
    animation: none;
  }
  .campus-map__tooltip {
    transition: none;
  }
}
```

- [ ] **Step 4.3: Lint the CSS files**

CSS isn't linted by ESLint in this project, so verify by building:
```
npm run build
```
Expected: build succeeds. The `/about` route prerenders. The page renders the section with map background + dots but no hover effect yet (that's the learning-mode slot).

- [ ] **Step 4.4: Commit**

```
git add app/styles/components.css app/styles/animations.css
git commit -m "feat(about): add campus map and dot pulse styles"
```

---

## Task 5: User writes the dot hover/focus CSS (learning-mode slot)

**Files:**
- Edit: `app/styles/components.css`

- [ ] **Step 5.1: Pause for the user**

This is the spec's learning-mode contribution slot. The user opens `app/styles/components.css`, finds the `TODO` block added in Task 4, and writes 5–10 lines of CSS defining the dot hover/focus behavior. Three reference approaches are documented inline; the user picks one (or invents a fourth).

If the user is offline / wants you to pick: use approach (c) "Ring expand" — it matches the existing pulse vocabulary best. Concrete fallback CSS:

```css
.campus-map__dot:hover,
.campus-map__dot:focus-visible {
  outline: none;
  box-shadow: 0 0 0 6px rgba(var(--accent-r), var(--accent-g), var(--accent-b), 0.25);
  animation-play-state: paused;
}

.campus-map__dot:hover .campus-map__tooltip,
.campus-map__dot:focus-visible .campus-map__tooltip {
  opacity: 1;
  transform: translate(-50%, 0);
}
```

Replace the `TODO: write your hover/focus rule here.` line (and the closing `*/` immediately above it) so that the rule lives *outside* the comment block.

- [ ] **Step 5.2: Verify in the browser**

```
npm run dev
```
Open http://localhost:3000/about. Hover any dot — its tooltip should appear. Tab into the map (focus a dot via keyboard) — the same affordance should appear. Reduced motion: in OS settings or DevTools "Emulate CSS prefers-reduced-motion: reduce", confirm the pulse stops.

- [ ] **Step 5.3: Commit**

```
git add app/styles/components.css
git commit -m "feat(about): add dot hover and focus affordance"
```

---

## Task 6: Wire the section into the About page and update copy

**Files:**
- Edit: `app/about/page.tsx`

- [ ] **Step 6.1: Replace the hero and remove the school-tag pill row**

Open `app/about/page.tsx`. Apply these two edits.

**Edit A** — remove the page hero (current lines 11–23 — the first `<section>`) and replace with the new map section. At the top of the file, add the import:

```tsx
import { CampusMapSection } from '@/components/about/CampusMapSection';
```

Then in the JSX, delete the entire first `<section className="section">…</section>` (the one with eyebrow "About CBC" and the H1 "A student AI builder club at McGill.") and replace it with:

```tsx
<CampusMapSection />
```

**Edit B** — in the second section ("Backed by Anthropic / A global initiative"):
- Change `"60+ schools"` to `"75+ schools"` in the section copy (in the first `<p className="section-copy">`).
- Delete the entire `<div style={{ display: 'flex', flexWrap: 'wrap', gap: '0.5rem' }}>…</div>` containing the `school-tag` pills. The map is the canonical list now; the pills are redundant.

The keys for the school-tag pills (`MIT`, `Stanford`, etc.) and the surrounding `.map()` go away with that `<div>`.

- [ ] **Step 6.2: Lint just this file**

```
npx eslint app/about/page.tsx --max-warnings=0
```
Expected: zero warnings, zero errors.

- [ ] **Step 6.3: Build and verify static prerender**

```
npm run build
```
Expected: success. In the build output, locate the `/about` row — it must show `○ (Static)`, not `λ (Server)` or `ƒ (Dynamic)`. If it's anything other than `○ (Static)`, something in the component triggered dynamic rendering — investigate before continuing.

- [ ] **Step 6.4: Commit**

```
git add app/about/page.tsx
git commit -m "feat(about): mount campus map and update global initiative copy"
```

---

## Task 7: End-to-end verification

**Files:** none (verification only)

- [ ] **Step 7.1: Full project lint and build**

```
npm run build
```
Expected: succeeds. `/about` is `○ (Static)`. No new ESLint warnings introduced by our files. (The pre-existing `<img>` warnings in `app/hackathon/page.tsx` may still appear — those are documented as out-of-scope in CLAUDE.md.)

- [ ] **Step 7.2: Manual browser check at desktop (1440 px)**

```
npm run dev
```
Open http://localhost:3000/about. Verify:

| Check | Expected |
|-------|----------|
| Page opens with map section at top (no "About CBC" hero) | ✓ |
| Map shows ~78 orange dots distributed across continents | ✓ |
| Dots in known locations land correctly (eyeball McGill in Montreal, IIT Bombay in western India, ETH Zürich in central Europe) | ✓ |
| Hover any dot — tooltip shows the school name | ✓ |
| Pulse animation runs and is gently staggered (not all dots blinking in unison) | ✓ |
| "A global initiative" section below the map says "75+ schools" and no longer has the pill row | ✓ |
| Header/footer/glass aesthetic match the rest of the site | ✓ |

- [ ] **Step 7.3: Mobile check (375 px)**

In DevTools, switch to iPhone SE / 375 px width. Verify:
- Map fits inside `.soft-panel` without overflow.
- Dots remain on their continents (lat/lng → percentage holds at any width).
- Tooltips appear on tap and don't get clipped by the panel edge (the panel has overflow:hidden on `.campus-map`, so a tooltip near the panel edge may clip — that's acceptable; tooltips for edge schools can lose a few pixels).

- [ ] **Step 7.4: Reduced-motion check**

In DevTools → Rendering → "Emulate CSS media feature `prefers-reduced-motion`" → `reduce`. The pulse must stop on all dots. Tooltips still appear instantly (no transition).

- [ ] **Step 7.5: Keyboard-only check**

From the URL bar, press Tab repeatedly. You should be able to reach each dot in source order and see its tooltip on focus. Press Tab again to advance to the next dot.

- [ ] **Step 7.6: Final commit (if anything was tweaked)**

If steps 7.2–7.5 required small fixes, commit them. Otherwise this task closes without a commit.

```
git add -A
git commit -m "fix(about): post-verification polish"  # only if needed
```

---

## Self-Review

**Spec coverage check:**

| Spec requirement | Plan task |
|------------------|-----------|
| Remove page hero from `/about` | Task 6 Edit A |
| Add `CampusMapSection` in hero's place | Task 6 Edit A |
| Data file with `{name, country, lat, lng}` × 78 | Task 1 |
| Update "60+" → "75+", remove pill row | Task 6 Edit B |
| Inline SVG / SVG asset world map | Task 2 |
| Absolute-positioned button dots from lat/lng | Task 3 (`dotPosition`) |
| Orange dots, pulse, prefers-reduced-motion | Task 4 |
| CSS-only tooltip on hover and focus | Task 4 (tooltip base) + Task 5 (reveal) |
| `aria-label` per dot, figure/figcaption | Task 3 |
| Static prerender preserved | Task 6 Step 3, Task 7 Step 1 |
| Lint zero-tolerance | Each task includes targeted `npx eslint` |
| Learning-mode contribution slot | Task 5 |

All spec items covered.

**Placeholder scan:** No `TBD` / `TODO` / `implement later` / "appropriate" / "etc.". The only `TODO` appears inside a CSS comment that is itself the documented learning-mode slot in Task 4, with a concrete fallback CSS provided in Task 5.

**Type consistency:** `CampusSchool` declared in Task 1, used by name in Task 3. Field names (`name`, `country`, `lat`, `lng`) match across both. CSS class names are consistent: `.campus-map-panel`, `.campus-map`, `.campus-map__dot-wrap`, `.campus-map__dot`, `.campus-map__tooltip`, `.campus-map__svg`, `.campus-map__dots` — all used in Task 3 markup and Task 4 styles with matching spellings.
