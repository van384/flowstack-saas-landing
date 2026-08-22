# FlowStack — Landing Page

A single-page marketing site for **FlowStack**, a fictional project management SaaS built as a portfolio concept piece. No build tools, no framework — just HTML, CSS, and vanilla JS.

**Live URL:** _add your Netlify URL here once deployed, e.g. `https://flowstack.netlify.app`_

**Status:** ✅ Ready to deploy and share

## About this project (for your portfolio write-up)

FlowStack's landing page was designed around one idea: since the product is about stacking a team's work into one flow, the *design itself* uses layered, offset cards throughout — the hero illustration, the feature grid, and the pricing cards all repeat the same "stack" motif instead of using a generic hero graphic. Typography pairs a geometric display face (Space Grotesk) with a utility mono face (JetBrains Mono) for status-tag labels like `IN_PROGRESS` and `DONE`, borrowing the product's own UI vocabulary into the marketing page.

The "Start free trial" flow is a real, working signup — not just a linked button — using Netlify Forms with no backend code. That's the one piece of functionality in an otherwise static page worth calling out when you talk through this with a client or interviewer.

## Folder structure

```
flowstack-landing/
├── index.html              ← the whole page (all sections + signup modal)
├── thank-you.html           ← page shown after a real form submission
├── css/
│   └── style.css           ← all styles + design tokens (colors, fonts, spacing)
├── js/
│   └── main.js              ← mobile nav, FAQ accordion, pricing toggle, signup modal
├── assets/
│   ├── images/
│   │   ├── logo.svg         ← header/footer logo
│   │   ├── favicon.svg      ← browser tab icon
│   │   └── hero-stack.svg   ← hero illustration (stacked task cards)
│   └── fonts/                ← empty — see "About the fonts" below
└── README.md
```

## The "Start free trial" flow (this one actually works)

Every "Start free trial" button opens a modal with a real form. On submit:

1. JS sends the entry to **Netlify Forms** via `fetch` — no backend code, no npm packages.
2. The modal shows a success message without leaving the page.
3. If JavaScript ever fails, the form falls back to a normal submit and lands on `thank-you.html`.

**This only works once the site is deployed to Netlify** — Netlify scans your HTML at deploy time for the hidden form near the top of `index.html` (`<form name="trial-signup" data-netlify="true" hidden>`) and provisions a dashboard for it. Locally (double-clicking the file) the modal still opens, but the submission will fail gracefully and show the "something went wrong" state, since there's no Netlify backend to receive it.

Once deployed, real submissions show up at **Netlify → Site → Forms** in your dashboard, with email notifications you can turn on.

**Note on the "Concept project" badge**: since this is a portfolio piece and not a live product, there's a small badge in the header (hidden on mobile) noting that. The signup form is genuinely functional — it's the FlowStack *product* that's fictional. Worth keeping this honest for anyone reviewing your portfolio.

## How to deploy it (GitHub + Netlify, both free)

This is the setup that makes the "Start free trial" form actually work, since Netlify Forms requires Netlify to be hosting the site.

1. **Push to GitHub** — create a public repo, then from inside this folder:
   ```
   git init
   git add .
   git commit -m "Initial commit"
   git branch -M main
   git remote add origin <your-repo-url>
   git push -u origin main
   ```
2. **Connect it to Netlify** — at [app.netlify.com](https://app.netlify.com), click *Add new site → Import an existing project → GitHub*, select this repo. Leave the build command blank and the publish directory as `/`. Click Deploy.
3. **Get your live URL** — Netlify gives you a free `.netlify.app` link within seconds. Test the "Start free trial" button there — that's the real test, not opening the file locally.
4. **Confirm the form works** — check the *Forms* tab in your Netlify site dashboard for a `trial-signup` entry. If it's missing, redeploy (Netlify only scans for forms at build time).
5. *(Optional)* Rename the free subdomain to something cleaner under *Site settings → Domain management*, or connect a real domain if you buy one.

Netlify's free plan covers this easily — 300 credits/month, no credit card required, and it never auto-bills you if you somehow exceed it (it just pauses until next cycle).

**Note:** opening `index.html` directly (double-click, no deploy) still works for browsing the design, but the signup form will show the "something went wrong" state on submit — that's expected, since there's no Netlify backend behind a local file.

## SEO

The page ships with a full set of SEO tags in `index.html`'s `<head>`, plus `robots.txt` and `sitemap.xml` at the project root:

- **Title + meta description** — what shows up in Google search results
- **Open Graph tags** (`og:*`) — control how the link previews on Facebook, LinkedIn, Slack, and iMessage
- **Twitter Card tags** — same idea, for X/Twitter previews
- **A dedicated share image** (`assets/images/og-image.png`, 1200×630 — the standard social preview size) rather than reusing the hero illustration, since OG images need different proportions
- **JSON-LD structured data** — a machine-readable snippet describing FlowStack as a SoftwareApplication, which helps search engines understand what the page is about (and can enable rich results like pricing shown directly in search)
- **Favicons for every context** — SVG (modern browsers), PNG fallback, Apple touch icon (iOS home screen), and a 512×512 icon (Android/PWA)

**⚠️ Before you deploy:** every URL in these tags currently points at a placeholder — `https://flowstack.example/`. Once your Netlify URL exists, find-and-replace `flowstack.example` across `index.html`, `robots.txt`, and `sitemap.xml` with your real domain (e.g. `flowstack.netlify.app`), or the social previews and sitemap will point at a dead link.

## Responsiveness

Tested across four breakpoints, not just "does it not break":

- **900px** (tablets) — hero switches to a stacked single column, grids go from 3 columns to 2
- **768px** — section padding tightens slightly for the smaller viewport
- **640px** (phones) — grids collapse to 1 column, desktop nav is replaced by the hamburger menu
- **400px** (small phones) — headline size, button padding, and modal padding all step down further

Two real mobile bugs fixed while doing this pass:
- **iOS Safari auto-zoom** — form inputs under 16px font-size trigger an unwanted zoom when focused on iPhone; the signup modal's inputs are now set to 16px to prevent that.
- **Tap target size** — the mobile hamburger button was under Apple/Google's 44×44px minimum recommended touch target; padding increased to meet it.



The page uses three Google Fonts, loaded via CDN link in `index.html`'s `<head>`:

- **Space Grotesk** (headings) — geometric, modern, gives FlowStack its personality
- **Inter** (body text) — clean, highly legible at small sizes
- **JetBrains Mono** (status tags like `IN_PROGRESS`, `DONE`) — ties the design to the product's own UI language

They're loaded from Google's CDN rather than shipped as local files, which means:
- Nothing to download or manage in `assets/fonts/`
- Fonts stay cached across other sites your visitors have used
- If you ever need to self-host (e.g. for strict privacy requirements), download the `.woff2` files from [fonts.google.com](https://fonts.google.com) for the three families above, drop them in `assets/fonts/`, and replace the `<link>` tags in `index.html` with `@font-face` rules in `style.css`.

## About the icons

Icons come from **[Lucide](https://lucide.dev)**, loaded via a single CDN `<script>` tag — no image files needed. To change an icon anywhere on the page, just swap the `data-lucide="icon-name"` attribute; browse available names at lucide.dev/icons.

## Editing the content

- **Copy/text** — edit directly in `index.html`, it's plain HTML.
- **Colors/fonts/spacing** — edit the `:root { --variable: value; }` block at the top of `css/style.css`. Everything on the page pulls from those variables, so changing `--accent` there re-colors every button, tag, and icon at once.
- **Pricing numbers** — in `index.html`, search for `price-value`; each plan's monthly and yearly numbers are set via `data-monthly` / `data-yearly` attributes.

## Pre-launch checklist (before you send the link to a client)

- [ ] Replaced `flowstack.example` with your real Netlify URL in `index.html`, `robots.txt`, and `sitemap.xml`
- [ ] Deployed on Netlify, live URL works
- [ ] Clicked every "Start free trial" button and submitted the form once, successfully
- [ ] Checked the *Forms* tab in Netlify to confirm the submission landed
- [ ] Opened the page on an actual phone, not just resized a desktop browser
- [ ] Read through all copy once for typos
- [ ] Have a one-paragraph case study ready to send alongside the link — a bare link with no context is easy to skim past

## What's next (if you want to grow this into the full app)

This is a static marketing page only — no login, no database. When you're ready to build the actual product (dashboards, boards, auth), that's when a framework like React or Vue starts to earn its complexity, paired with something like Supabase for auth and a database. For a landing page alone, either would only have slowed you down.
