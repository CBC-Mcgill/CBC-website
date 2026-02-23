# Dark Theme Clash Fixes Implementation Plan

> **For Claude:** REQUIRED SUB-SKILL: Use superpowers:executing-plans to implement this plan task-by-task.

**Goal:** Remove three categories of leftover light/white values from the dark-theme CSS that cause visible cream blobs, a near-white card, and white hot-spots on card surfaces.

**Architecture:** All changes are in `app/globals.css` only — no JSX edits needed. The site uses CSS custom properties via `:root {}` and `@theme {}`, but the three issues are hardcoded `rgba(255,…)` values inside class/pseudo-element rules that were missed during the initial dark-theme migration.

**Tech Stack:** Next.js 16 App Router · Tailwind CSS v4 · `app/globals.css` as single source of truth for all design tokens and component styles.

---

### Task 1: Fix section background blobs

**File:** `app/globals.css` — `.section::before`, `.section:nth-of-type(even)::before`, `.section::after`

Current values (lines ~520–538) are leftover light-theme cream glows and a tan divider that create large white blobs on the dark page — this is the "white light in the back" the user flagged.

**Step 1: Locate the three selectors**

In `app/globals.css` find:
```css
.section::before {
  background: radial-gradient(600px 400px at 8% 20%, rgba(255, 248, 240, 0.9), transparent 60%);
  opacity: 0.35;
```
```css
.section:nth-of-type(even)::before {
  background: radial-gradient(700px 450px at 90% 30%, rgba(243, 232, 220, 0.9), transparent 60%);
  opacity: 0.3;
```
```css
.section::after {
  background: linear-gradient(90deg, transparent, rgba(199, 183, 170, 0.5), transparent);
  opacity: 0.6;
```

**Step 2: Replace with dark warm amber equivalents**

```css
.section::before {
  background: radial-gradient(600px 400px at 8% 20%, rgba(201, 130, 69, 0.06), transparent 60%);
  opacity: 1;
```
```css
.section:nth-of-type(even)::before {
  background: radial-gradient(700px 450px at 90% 30%, rgba(201, 130, 69, 0.05), transparent 60%);
  opacity: 1;
```
```css
.section::after {
  background: linear-gradient(90deg, transparent, rgba(201, 130, 69, 0.18), transparent);
  opacity: 0.6;
```

**Step 3: Verify build**

Run: `npm run build`
Expected: `✓ Compiled successfully` with zero errors.

---

### Task 2: Fix hero note near-white background

**File:** `app/globals.css` — `.hero-note`

Current background is `linear-gradient(140deg, rgba(255, 255, 255, 0.9), rgba(247, 240, 233, 0.9))` — 90% white — which renders as an almost-white card on the dark homepage. The dashed border is also a light tan.

**Step 1: Locate `.hero-note`**

```css
.hero-note {
  background: linear-gradient(140deg, rgba(255, 255, 255, 0.9), rgba(247, 240, 233, 0.9));
  border: 1px dashed rgba(210, 195, 182, 0.9);
  box-shadow: 0 12px 26px rgba(40, 33, 26, 0.08);
```

**Step 2: Replace with dark warm surface**

```css
.hero-note {
  background: linear-gradient(140deg, rgba(255, 220, 180, 0.06), rgba(255, 220, 180, 0.03));
  border: 1px dashed rgba(201, 130, 69, 0.3);
  box-shadow: 0 12px 26px rgba(0, 0, 0, 0.25);
```

**Step 3: Verify build**

Run: `npm run build`
Expected: `✓ Compiled successfully` with zero errors.

---

### Task 3: Fix white gloss overlays on cards and panels

**File:** `app/globals.css` — five selectors with leftover white `::before`/`::after` overlays

| Selector | Property | Current (light) | New (dark) |
|---|---|---|---|
| `.card::before` | `background` | `rgba(255,255,255,0.8)` at opacity 0.6 | `rgba(201,130,69,0.05)` at opacity 1 |
| `.img-frame::before` | `background` | `rgba(255,255,255,0.6)` at opacity 0.7 | `rgba(255,220,180,0.04)` at opacity 0.8 |
| `.img-frame::after` | `border` | `rgba(255,255,255,0.55)` | `rgba(255,220,180,0.08)` |
| `.soft-panel::before` | `background` | `rgba(255,245,232,0.9)` at opacity 0.7 | `rgba(201,130,69,0.06)` at opacity 1 |
| `.contact-panel::before` | `background` | `rgba(255,255,255,0.75)` at opacity 0.8 | `rgba(201,130,69,0.05)` at opacity 1 |

**Step 1: Fix `.card::before`**

Old:
```css
.card::before {
  background: radial-gradient(400px 200px at 0% 0%, rgba(255, 255, 255, 0.8), transparent 60%);
  opacity: 0.6;
```
New:
```css
.card::before {
  background: radial-gradient(400px 200px at 0% 0%, rgba(201, 130, 69, 0.05), transparent 60%);
  opacity: 1;
```

**Step 2: Fix `.img-frame::before` and `.img-frame::after`**

Old:
```css
.img-frame::before {
  background: linear-gradient(135deg, rgba(255, 255, 255, 0.6), transparent 55%);
  opacity: 0.7;
```
```css
.img-frame::after {
  border: 1px solid rgba(255, 255, 255, 0.55);
```
New:
```css
.img-frame::before {
  background: linear-gradient(135deg, rgba(255, 220, 180, 0.04), transparent 55%);
  opacity: 0.8;
```
```css
.img-frame::after {
  border: 1px solid rgba(255, 220, 180, 0.08);
```

**Step 3: Fix `.soft-panel::before`**

Old:
```css
.soft-panel::before {
  background: radial-gradient(600px 300px at 100% 0%, rgba(255, 245, 232, 0.9), transparent 60%);
  opacity: 0.7;
```
New:
```css
.soft-panel::before {
  background: radial-gradient(600px 300px at 100% 0%, rgba(201, 130, 69, 0.06), transparent 60%);
  opacity: 1;
```

**Step 4: Fix `.contact-panel::before`**

Old:
```css
.contact-panel::before {
  background: radial-gradient(480px 260px at 0% 0%, rgba(255, 255, 255, 0.75), transparent 60%);
  opacity: 0.8;
```
New:
```css
.contact-panel::before {
  background: radial-gradient(480px 260px at 0% 0%, rgba(201, 130, 69, 0.05), transparent 60%);
  opacity: 1;
```

**Step 5: Verify build**

Run: `npm run build`
Expected: `✓ Compiled successfully` with zero errors.

---

## Verification Checklist

After all three tasks:

1. `npm run build` → zero errors
2. `npm run dev` → visit `/` (home): section glows are warm amber not cream; hero note is dark not white
3. Visit `/about`: section blobs gone, cards have no white hot-spots
4. Visit `/people`: person cards, img-frames look dark with subtle amber depth
5. Visit `/contact`: contact panel no white glow in corner
6. Visit `/hackathon`: visually unchanged (`.hack-*` classes untouched)
