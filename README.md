Claude Builder Club at McGill. Live at https://www.claudebuildersmcgill.ca/ and https://cbc-website-mocha.vercel.app/.

## Editing content

No page or component edits are needed for day-to-day updates.

- Projects: `data/projects.ts`
- Team roster: `data/people.ts`
- Club links (Discord, Instagram, LinkedIn, GitHub, membership form, email): `data/links.ts`
- Hackathon tracks: `data/hackathonTracks.ts`
- Sponsorship package: `public/sponsors.html` (served at `/sponsors`)

To add a project, copy this entry into the `projects` list:

```ts
{
  slug: "your-project",
  name: "Your project",
  summary: "One sentence on what it does for the person using it.",
  why: "A short paragraph on the problem it solves.",
  status: "building",
  leads: "Lead names",
  since: "Started Fall 2026",
  github: "https://github.com/CBC-Mcgill/your-repository",
  url: "https://your-project.vercel.app",
  urlLabel: "your-project.vercel.app",
  image: {
    src: "/assets/projects/your-project.webp",
    alt: "What the screenshot shows",
    width: 1440,
    height: 900,
  },
},
```

- List order is display order.
- `status` is `live`, `building` or `paused`.
- `url`, `urlLabel`, `image`, `why`, `since` and `github` are optional. Without an image the project gets a typographic tile.
- Set `featured: true` on exactly one project to show it large on the home page.
- Screenshots are real captures of the product. Save them as WebP in `public/assets/projects/`.
- Text is plain text, not Markdown.
- Preview with `npm run dev`, then run `npm run lint` and `npm run build` before committing. Vercel deploys `main`.

See `CLAUDE.md` for the design system and conventions.
