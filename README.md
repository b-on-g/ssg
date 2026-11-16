# $bog_ssg

Static site generation with [$mol](https://mol.hyoo.ru): Markdown pages are rendered by a regular $mol app and saved as plain HTML that works without JavaScript.

## How it works

1. Content lives in Markdown files in [`content/`](content), one file per page.
2. The `$bog_ssg` app ([`ssg.view.tree`](ssg.view.tree)) loads `content/<page>.md` by the `page` route parameter and renders it with `$mol_text`. The page title is taken from the first `#` heading.
3. The generator ([`generate/generate.node.ts`](generate/generate.node.ts)) opens every page in headless Chrome via Puppeteer, waits for the network to settle, removes all `<script>` tags and writes the result to `-/static/<page>.html`.

The same app works as an interactive SPA and as a source of static pages, so any $mol component can be used inside the content pages.

## Usage

Start the MAM dev server from the root of a MAM workspace with this repo cloned into `bog/ssg`:

```sh
npx mam
```

Then run the generator. It expects the dev server on `http://localhost:9080`:

```sh
npx mam bog/ssg/generate
node bog/ssg/generate/-/node.js
```

Static pages appear in `bog/ssg/-/static/`.

To add a page, put a new `.md` file into `content/` and link to it as `?page=<name>`.

## CI

[`.github/workflows/deploy.yml`](.github/workflows/deploy.yml) builds the app with [`hyoo-ru/mam_build`](https://github.com/hyoo-ru/mam_build), prerenders the pages with [`b-on-g/mol-prerender-action`](https://github.com/b-on-g/mol-prerender-action) and deploys to GitHub Pages.

## Eleventy comparison

[`eleventy/`](eleventy) contains the same pages built with [Eleventy](https://www.11ty.dev). CI builds both and deploys the Eleventy output to `/eleventy/` next to the $mol version for side-by-side comparison.

## License

[MIT](LICENSE)
