# About $mol SSG

This is a proof of concept for static site generation with `$mol`.

## Architecture

- **$mol app** handles routing and rendering via `$mol_text`
- **$mol_browser** uses Puppeteer to open each page and capture the rendered HTML
- **Content** lives in `.md` files, fetched by `$mol_fetch`

## Why not Eleventy/Hugo/Astro?

Because `$mol` already has everything needed:

- `$mol_text` parses Markdown
- `$mol_fetch` loads content
- `$mol_state_arg` handles routing
- `$mol_browser` pre-renders pages

One framework, two outputs: static HTML and interactive SPA.

[Back to home](?page=index)
