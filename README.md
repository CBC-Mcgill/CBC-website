Website runs here: https://cbc-website-mocha.vercel.app/ and https://www.claudebuildersmcgill.ca/

## Editing content

Members live in `data/people.ts`. Projects work the same way: edit the
named fields in `data/buildTracks.ts`; no page or component edits are needed.

To add a project, copy this entry into the `buildTracks` list:

```ts
{
  name: 'Your project',
  description: 'A short explanation of what it does.',
  why: 'The student problem this project solves.',
  leads: 'Project lead names',
  status: 'open',
  github: 'https://github.com/CBC-Mcgill/your-repository',
  symbol: '✳',
  published: true,
},
```

- List order is display order. Move an entry to reorder it; delete it to remove it.
- Required fields: `name` (use a unique name), `description`, `leads`, and `status`.
- Status must be `open`, `full`, or `complete`.
- `why`, `github`, and `symbol` are optional. Omit a repository until it exists;
  its link and GitHub logo will be hidden. Artwork defaults automatically.
- Set `published: false` to hide a draft. Omitting it publishes the entry.
  Drafts remain in the repository; do not put private information in them.
- Text is plain text, not HTML or Markdown. Use double quotes for text containing
  apostrophes.
- Preview with `npm run dev`, then run `npm run lint` and `npm run build`.
  Commit and deploy the changes to update the live site. There is no admin login
  or database.

Club destinations and the project suggestion email live in `data/links.ts`.
