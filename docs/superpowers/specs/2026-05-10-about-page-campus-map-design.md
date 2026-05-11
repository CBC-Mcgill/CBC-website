# About page — Claude Campus world map

**Date:** 2026-05-10
**Status:** Approved design, pending implementation
**Owner:** Thai

## Summary

Replace the `/about` page hero section with a world map that shows every active Claude Campus Program university as an orange dot. The map sits at the top of the page; the existing "A global initiative" section directly below it remains and now plays the role of explanatory caption.

## Motivation

The current hero (`<eyebrow>About CBC</eyebrow>` + H1 "A student AI builder club at McGill.") restates information already in the global site header and the page below it. A map is a stronger top-of-page statement: it shows scale ("60+ universities") instead of asserting it in prose, and it visually anchors McGill inside a global network rather than presenting CBC as a standalone McGill chapter.

## Scope

**In scope**
- Remove the page hero (`app/about/page.tsx` lines 11–23).
- Add a new `CampusMapSection` component rendered in the hero's place.
- Add a data file listing the schools with `{ name, country, lat, lng }`.
- Add styles for the map, dots, tooltips, and pulse animation.
- Update the "A global initiative" section copy: bump "60+ schools" → "75+ schools" and remove the now-redundant school-tag pill list (the map is the canonical list).

**Out of scope**
- Touching any other section on `/about`.
- Linking each dot to a chapter site (data is `name`/`country` only; no URLs).
- Filtering / search / region selection. The map is read-only.
- Showing the count of students per chapter from the source sheet (waves and student counts are payroll data, not public).

## Architecture

### Files

| File | Status | Purpose |
|------|--------|---------|
| `app/about/page.tsx` | edited | Delete hero section, import + render `<CampusMapSection />` in its place |
| `components/about/CampusMapSection.tsx` | new | Server component. Renders `<section class="section">` → `<div class="container soft-panel campus-map-panel">` → SVG world map + dots, sourced from data file |
| `data/claudeCampusSchools.ts` | new | Exports `claudeCampusSchools: CampusSchool[]` and type `CampusSchool` |
| `types/index.ts` | edited | Re-export `CampusSchool` type alongside existing types (consistent with `Person`, `BuildTrack`) |
| `app/styles/components.css` | edited | `.campus-map-panel`, `.campus-map`, `.campus-map__svg`, `.campus-map__dot`, `.campus-map__tooltip` |
| `app/styles/animations.css` | edited | `@keyframes campusDotPulse` |
| `public/assets/ui/world-outline.svg` | new (optional) | Standalone SVG world outline if we don't inline the path data into the component |

### Rendering strategy

- **Server component.** No state, no effects. All hover behavior is CSS.
- The map is a single inline SVG, viewBox `0 0 1000 500` (2:1 equirectangular), `preserveAspectRatio="xMidYMid meet"`, country borders as a single `<path>` with a low-opacity stroke and no fill.
- Source for country path data: a public-domain equirectangular world map (Natural Earth derived). The path data is committed inline in the component file. No fetch at runtime.
- Dots are absolutely-positioned `<button>` elements inside a relatively-positioned wrapper that overlays the SVG. Position computed at render time from lat/lng:

  ```
  left = ((lng + 180) / 360) * 100%
  top  = ((90 - lat) / 180) * 100%
  ```

  Equirectangular distorts above ~60° latitude. Every Claude Campus school sits between roughly 30°S and 55°N, so the distortion is invisible in our use case.

### Dot interaction (CSS-only)

- Default: 10 px orange disc, `background: var(--color-accent)`, soft glow via `box-shadow: 0 0 0 0 rgba(var(--accent-r), var(--accent-g), var(--accent-b), 0.45)` plus `animation: campusDotPulse 2.4s var(--ease-soft) infinite`.
- `:hover`, `:focus-visible`: dot scales to 1.25; tooltip child becomes `opacity: 1; transform: translate(-50%, -110%)`.
- Tooltip is a child `<span class="campus-map__tooltip">` with the school name. Positioned absolutely above the dot, no JS. Uses the dark glass pill style already used elsewhere (charcoal background, light text, 4 px radius, drop shadow).

### Accessibility

- Outer `<figure>` with `<figcaption class="sr-only">` summarizing "Claude Campus Program — universities worldwide".
- SVG gets `role="img"` and `aria-labelledby` pointing at the caption.
- Each dot is a real `<button type="button">` with `aria-label="{name}, {country}"`, focusable in tab order. Tooltip appears on `:focus-visible` so keyboard users see labels.
- Pulse animation respects `@media (prefers-reduced-motion: reduce)` — animation set to `none`.

### Data

`data/claudeCampusSchools.ts` exports `CampusSchool[]`. Each entry: `{ name: string; country: string; lat: number; lng: number }`.

Source: Anthropic's Spring 2026 Claude Campus roster (Google Sheet shared by the user, 9 tabs total). Final roster — **78 schools across 9 countries**:

**United States (51)**

```
Arizona State University              33.4242 -111.9281
California Institute of Technology    34.1377 -118.1253
Carnegie Mellon University            40.4433  -79.9436
Columbia University                   40.8075  -73.9626
Cornell University                    42.4534  -76.4735
Dartmouth College                     43.7044  -72.2887
Duke University                       36.0014  -78.9382
Georgetown University                 38.9076  -77.0723
Georgia Institute of Technology       33.7756  -84.3963
Harvard University                    42.3744  -71.1169
Illinois Institute of Technology      41.8350  -87.6270
Indiana University-Bloomington        39.1682  -86.5230
Massachusetts Institute of Technology 42.3601  -71.0942
Michigan State University             42.7018  -84.4822
Minnesota State University-Mankato    44.1463  -93.9994
New Jersey Institute of Technology    40.7421  -74.1786
New York University                   40.7295  -73.9965
Northeastern University               42.3398  -71.0892
Northwestern University               42.0565  -87.6753
Ohio State University                 40.0067  -83.0305
Pennsylvania State University         40.7982  -77.8599
Princeton University                  40.3431  -74.6551
Purdue University                     40.4237  -86.9212
Rice University                       29.7174  -95.4018
Stanford University                   37.4275 -122.1697
Syracuse University                   43.0387  -76.1351
The University of Texas at Austin     30.2849  -97.7341
University of California, Berkeley    37.8719 -122.2585
University of California, Irvine      33.6404 -117.8443
University of California, Los Angeles 34.0689 -118.4452
University of California, San Diego   32.8801 -117.2340
University of Chicago                 41.7886  -87.5987
University of Florida                 29.6436  -82.3549
University of Georgia                 33.9480  -83.3773
University of Illinois Urbana-Champaign 40.1020 -88.2272
University of Louisville              38.2154  -85.7585
University of Maryland                38.9869  -76.9426
University of Massachusetts Amherst   42.3868  -72.5301
University of Michigan-Ann Arbor      42.2780  -83.7382
University of Missouri-Columbia       38.9404  -92.3277
University of Nevada, Las Vegas       36.1072 -115.1426
University of North Carolina at Chapel Hill 35.9049 -79.0469
University of Pennsylvania            39.9522  -75.1932
University of Pittsburgh              40.4444  -79.9608
University of San Francisco           37.7765 -122.4506
University of Southern California     34.0224 -118.2851
University of Virginia                38.0336  -78.5080
University of Washington-Seattle      47.6553 -122.3035
University of Wisconsin-Madison       43.0766  -89.4125
Vanderbilt University                 36.1447  -86.8027
Yale University                       41.3163  -72.9223
```

**Canada (4)**

```
McGill University                     45.5048  -73.5772
University of Toronto                 43.6629  -79.3957
University of Victoria                48.4634 -123.3117
University of Waterloo                43.4723  -80.5449
```

**United Kingdom (8)**

```
Imperial College London               51.4988   -0.1749
London Business School                51.5252   -0.1604
London School of Economics            51.5145   -0.1167
Northumbria University                54.9821   -1.6097
University College London             51.5246   -0.1340
University of Cambridge               52.2043    0.1218
University of Edinburgh               55.9445   -3.1875
University of Oxford                  51.7548   -1.2544
```

**Ireland (2)**

```
Trinity College Dublin                53.3438   -6.2546
University College Cork               51.8927   -8.4922
```

**Switzerland (1)**

```
ETH Zurich                            47.3763    8.5485
```

**Germany (1)**

```
Technical University of Munich        48.1496   11.5685
```

**India (4)**

```
BITS Pilani                           28.3568   75.5870
Indian Institute of Technology Bombay 19.1334   72.9133
Indian Institute of Technology Delhi  28.5450   77.1926
Indian Institute of Technology Madras 12.9916   80.2336
```

**Africa (7)**

```
African Leadership University Rwanda  -1.9536   30.0606   Rwanda
Kwame Nkrumah University of Science & Technology 6.6738 -1.5712 Ghana
Makerere University                    0.3354   32.5703   Uganda
University of Ghana                    5.6505   -0.1864   Ghana
University of Lagos                    6.5158    3.3964   Nigeria
University of Nairobi                 -1.2796   36.8169   Kenya
University of Rwanda                  -2.5994   29.7392   Rwanda
```

**Total: 78 schools, 9 countries.**

### Copy update

The existing "A global initiative" section below the map currently asserts "60+ schools with over 15,000 students enrolled globally". Update the school count to match the roster — change "60+" to "75+" (rounded down to leave room for late additions). The 15,000-student figure stays; it's Anthropic's published number and unrelated to chapter count. The text-tag pill list (MIT, Stanford, etc.) at the bottom of that section is now redundant with the map and gets removed.

### Pulse animation

```css
@keyframes campusDotPulse {
  0%, 100% { box-shadow: 0 0 0 0 rgba(var(--accent-r), var(--accent-g), var(--accent-b), 0.55); }
  50%      { box-shadow: 0 0 0 10px rgba(var(--accent-r), var(--accent-g), var(--accent-b), 0); }
}
```

Stagger dots by index using `animation-delay: calc(var(--i) * 80ms)` so the pulse isn't synchronous across all 24 dots.

## Learning-mode contribution slot

In `app/styles/components.css`, the `.campus-map__dot:hover` / `:focus-visible` block will be left as a TODO with surrounding context. The user implements the 5–10 lines that define **how a dot reacts to interaction** — pure-tooltip reveal vs. scale-up vs. ring-expand vs. ripple. The choice shapes how "alive" the map feels.

## Resolved decisions

- Section to replace → page hero (user confirmed).
- Dot interactivity → hover/tap tooltip (user confirmed).
- Tech approach → inline SVG + absolute-positioned dots, no library (proposed and approved).
- Roster → 78 schools from the Anthropic Spring 2026 sheet (user-provided source).

## Verification

- `npm run build` succeeds and the `/about` route stays in the `○ (Static)` column.
- `npx eslint app/about/page.tsx components/about/CampusMapSection.tsx data/claudeCampusSchools.ts` passes with zero warnings (project lint is `--max-warnings=0`).
- Manual: at 1440 px desktop and 375 px mobile, the map fits inside `.soft-panel`, dots cluster correctly over their cities, tooltips appear on hover and on keyboard focus, and reduced-motion preference disables the pulse.
