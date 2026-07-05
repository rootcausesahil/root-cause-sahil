# CLAUDE.md

This file provides guidance to Claude Code (claude.ai/code) when working with code in this repository.

## What this is

Personal site for "Root Cause: Sahil" — a channel recreating famous internet outages
and building deliberately over-engineered software. Next.js 15 (App Router) + Tailwind, statically
exported and deployed to Cloudflare (domain: rootcausesahil.com) via the unified Workers/Pages
platform. There is no backend: every page is pre-rendered HTML, and blog content is plain `.mdx`
files (no CMS, no database).

**Project status:** feature-complete and building cleanly. All pages (`/`, `/blog`, `/blog/[slug]`)
exist, dependencies are installed, and `npm run build` produces a verified static export in `./out`
(4 routes prerendered: home, blog index, and 2 example posts). `README.md` covers adding posts,
editing config, running locally, and deploying to Cloudflare.

## Commands

```bash
npm install      # first-time setup
npm run dev      # local dev server (http://localhost:3000)
npm run build    # static export -> ./out (via next.config.mjs `output: 'export'`)
npm run preview  # serve the built ./out directory (npx serve out)
npm run lint     # next lint
```

There is no test suite/runner configured.

**Don't run `npm run dev` and `npm run build` at the same time** — both write to `.next`, and a
concurrent dev server + build against the same cache has produced a spurious
`PageNotFoundError: Cannot find module for page` build failure before. Kill any running dev server
first if a build looks wrong, then `rm -rf .next out` and rebuild clean.

## Architecture

- **Static export only.** `next.config.mjs` sets `output: 'export'` and `trailingSlash: true`, and
  disables `next/image` optimization (`images.unoptimized`) because there's no server at runtime —
  everything must resolve to static files. Don't add API routes, middleware, or anything else that
  needs a Node runtime; it won't work in this deployment model.
  Deployed via `wrangler.jsonc`, which declares a Worker serving the `./out` directory as static
  assets (`assets.directory`) — Cloudflare's Git-connected build runs `npm run build` then
  `npx wrangler deploy`. (Workers and Pages are unified now, so a static-export site like this
  deploys as a Worker rather than through the old standalone Pages upload flow.)

- **`config.ts` is the single source of truth for site copy.** Channel name, tagline, bio, social
  links, nav links, and marquee ticker phrases all live there. Components read from `siteConfig`,
  `navLinks`, `socialLinks`, `marqueePhrases` rather than hardcoding text — that's the whole point
  of the file. One documented exception: which word is italicized in the hero heading is a
  typographic choice made directly in `components/Hero.tsx` (a plain substring match on `"Live."`
  in the tagline), not modeled as data — see the note in `config.ts`.

- **Theming is CSS-variable-based, not Tailwind dark-mode classes.** `app/globals.css` defines all
  colors as CSS custom properties per `[data-theme]` value (`dark` is default/`:root` fallback,
  `light` overrides). `tailwind.config.ts` maps Tailwind color names (`bg`, `fg`, `accent`,
  `muted`, `border`, `bg-raised`) straight to those variables, and sets
  `darkMode: ['selector', '[data-theme="dark"]']` — this is what makes `dark:` variants (e.g.
  `dark:prose-invert` in the blog post page) key off `[data-theme="dark"]` instead of Tailwind's
  usual `.dark` class. Never hardcode a color in a component — add a CSS variable in
  `globals.css` instead so both themes stay in sync.
  `lib/theme-script.ts` exports `themeInitScript`, a plain string of JS inlined via
  `dangerouslySetInnerHTML` into a blocking `<script>` in `app/layout.tsx`'s `<head>`. It runs
  synchronously before first paint to read `localStorage.theme` and set `data-theme` on `<html>`,
  avoiding a flash of the wrong theme. It defaults to `'dark'` and deliberately ignores
  `prefers-color-scheme`. It has to stay a plain inlined string (not an imported/executed module)
  because a static export has no server to run it per-request.
  `components/ThemeToggle.tsx` is the client component that flips `data-theme` and writes the
  choice back to `localStorage` — this is the pattern to follow for any future user-chosen setting
  that needs to persist per-browser on a static site (write on change, read in the pre-paint
  script or an early effect).

- **Fonts:** `Fraunces` (display/serif, used for large italic-capable headings) and `Inter` (body),
  loaded via `next/font/google` in `app/layout.tsx` and exposed as `--font-display` / `--font-body`
  CSS variables, consumed through `fontFamily.display` / `fontFamily.body` in `tailwind.config.ts`.

- **Content pipeline:** `lib/posts.ts` reads `.mdx` files straight off the filesystem at build time
  — `getAllPosts()` (sorted newest-first by frontmatter `date`), `getPostBySlug(slug)`, and
  `getAllSlugs()` (used by `/blog/[slug]`'s `generateStaticParams`). Every post in `content/posts/`
  needs frontmatter with `title`, `date` (ISO string), `description`, and `slug`; `readPostFile`
  throws at build time naming the file and field if any are missing. Post bodies are raw MDX
  strings rendered via `next-mdx-remote/rsc`'s `<MDXRemote source={...} />` in
  `app/blog/[slug]/page.tsx`, with `remark-gfm` for GFM (tables, strikethrough) and
  `@tailwindcss/typography`'s `prose` classes for styling. Two example posts ship in
  `content/posts/`: `recreating-the-2017-aws-s3-outage.mdx` and `kubernetes-cluster-for-a-todo-app.mdx`.
  `/blog/[slug]/page.tsx` sets `dynamicParams = false` — only slugs returned by
  `generateStaticParams` are ever built, matching the static-export/no-server constraint.

- **Home page section order matters:** `Marquee` renders first (directly under the sticky header,
  as a banner-style strip), then `Hero`, then About, then Latest Posts. This was deliberately
  reordered from an earlier draft (Hero-then-Marquee) after visual review — don't move Marquee
  back below Hero without checking with the user first.

- **Console easter egg:** `components/ConsoleEasterEgg.tsx` is a client component (renders `null`)
  mounted once in `app/layout.tsx`'s `<body>` that logs a styled, on-brand joke to devtools. Purely
  cosmetic, safe no-op during SSR/static export.

- **Path alias:** `@/*` maps to the repo root (`tsconfig.json`), e.g. `@/config`, `@/lib/theme-script`,
  `@/components/...`.
