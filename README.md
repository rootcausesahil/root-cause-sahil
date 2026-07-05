# Root Cause: Sahil

Personal site for the "Root Cause: Sahil" YouTube channel. Next.js (App
Router) + TypeScript + Tailwind CSS, statically exported and deployed to
Cloudflare Pages. No CMS, no database — blog posts are `.mdx` files in
`/content/posts`, and all editable copy (name, tagline, socials, marquee
phrases) lives in one file: `config.ts`.

## Run it locally

```bash
npm install
npm run dev
```

Open http://localhost:3000.

## (a) Add a blog post

1. Create a new file in `/content/posts`, e.g. `content/posts/my-new-post.mdx`.
2. Add frontmatter at the top, then write the post body in Markdown/MDX below it:

   ```mdx
   ---
   title: "My New Post"
   date: "2024-08-01"
   description: "One or two sentences that show up on the blog cards."
   slug: "my-new-post"
   ---

   Your post content goes here. Standard **Markdown** works, including
   headings, lists, `code blocks`, and > blockquotes. GitHub-flavored
   tables and strikethrough work too (via remark-gfm).
   ```

3. That's it — no registration step. `lib/posts.ts` reads every `.mdx`
   file in `/content/posts` at build time, sorts by `date` (newest first),
   and both `/blog` and the home page's "Latest Posts" section pick it up
   automatically. The `slug` in frontmatter determines the URL:
   `/blog/<slug>`.

   All four frontmatter fields (`title`, `date`, `description`, `slug`)
   are required — the build will fail with a clear error naming the file
   and the missing field if one is left out.

## (b) Edit social links, name, tagline, or the marquee

Everything is in **`config.ts`** at the project root:

- `siteConfig` — channel name, tagline, about-blurb, production URL
- `navLinks` — header navigation
- `socialLinks` — footer social links (platform, handle, URL)
- `marqueePhrases` — the phrases that scroll in the ticker strip

Edit values there; you should never need to touch component files just to
change copy. (One exception: which word is italicized in the hero
headline is a typographic choice made directly in `components/Hero.tsx`,
not config — see the comment in `config.ts` for details.)

## (c) Run locally

```bash
npm run dev      # dev server with hot reload, http://localhost:3000
npm run build    # production static export -> ./out
npm run preview  # serve the built ./out folder locally (npx serve out)
npm run lint     # next lint
```

## (d) Deploy to Cloudflare Pages

This project uses `output: 'export'` (see `next.config.mjs`), so `next build`
produces a fully static site in `./out` — no Cloudflare-specific adapter or
Node runtime needed.

**Cloudflare Pages dashboard setup:**

1. Push this repo to GitHub (or GitLab).
2. In the Cloudflare dashboard: **Workers & Pages → Create → Pages → Connect to Git**, and pick this repo.
3. Build settings:
   - **Framework preset:** Next.js (Static HTML Export) — or just set the fields manually:
   - **Build command:** `npm run build`
   - **Build output directory:** `out`
4. Deploy. Cloudflare rebuilds and redeploys automatically on every push.

**Custom domain:** in the Pages project, go to **Custom domains** and add
`rootcausesahil.com` (and `www.rootcausesahil.com` if you want that too),
then follow Cloudflare's DNS instructions.

**Local one-off deploy** (optional, via Wrangler):

```bash
npm run build
npx wrangler pages deploy out --project-name=root-cause-sahil
```

## Project structure

```
config.ts                  # ALL editable site copy (name, tagline, socials, marquee)
content/posts/*.mdx        # Blog posts — drop a file in, frontmatter + body
lib/posts.ts               # Reads/parses/sorts posts from content/posts
lib/theme-script.ts        # Inline no-flash dark/light pre-paint script
app/layout.tsx             # Root layout: fonts, theme script, Header/Footer
app/page.tsx               # Home page
app/blog/page.tsx          # Blog index (/blog)
app/blog/[slug]/page.tsx   # Individual blog post, renders MDX
components/                # Header, Footer, Hero, Marquee, PostCard, etc.
app/icon.png               # Favicon (64x64)
app/apple-icon.png         # iOS home-screen icon (180x180)
scripts/generate-icons.mjs # Regenerates the two files above from code
```

## Favicon / app icon

`app/icon.png` and `app/apple-icon.png` are plain static PNGs — Next.js
picks up files with these exact names in `app/` automatically and adds
the right `<link>` tags, no config needed. They're deliberately **not**
`app/icon.tsx`/`app/apple-icon.tsx` (Next's code-generated-icon convention):
with `output: 'export'`, those export as extensionless files (`out/icon`,
`out/apple-icon`), and most static hosts — Cloudflare Pages included —
infer content type from the file extension, so an extensionless file can
fail to serve as an image. Plain `.png` files sidestep that entirely.

To change the design, edit `scripts/generate-icons.mjs` (it draws the
mark with the same `ImageResponse` engine Next uses internally, just run
standalone) and re-run:

```bash
node scripts/generate-icons.mjs
```

That overwrites `app/icon.png` and `app/apple-icon.png` in place.

## Notes on the theme system

Dark mode is the default. All colors are CSS variables defined per-theme
in `app/globals.css` (`[data-theme='dark']` / `[data-theme='light']`), and
`tailwind.config.ts` maps Tailwind color utilities (`bg-bg`, `text-fg`,
`text-accent`, etc.) straight to those variables — so both themes are
designed on purpose, not just inverted. The user's choice is persisted to
`localStorage` and re-applied by a small inline script in `<head>` that
runs before first paint, so there's no flash of the wrong theme on a
static export (no server-side cookie/session available to do this any
other way).
