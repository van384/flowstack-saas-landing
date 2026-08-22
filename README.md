# FlowStack — Landing Page

A landing page built for FlowStack, a project management SaaS concept. Designed and built solo — front-end only, no framework, no build tools.

**Live site:** _(add link once deployed)_

## The brief I gave myself

Most SaaS landing pages default to the same three or four looks: cream background with a serif headline, dark mode with a neon accent, or a generic hero graphic that could belong to any product. I wanted this one to actually connect to what FlowStack does.

Since the product is about pulling a team's scattered work into one place, the design uses a recurring "stacked cards" motif — in the hero illustration, the feature grid, and the pricing cards — instead of a stock hero image. Typography pairs a geometric display face with a monospace face for status labels like `IN_PROGRESS` and `DONE`, borrowing the product's own interface language into the marketing page itself.

## What's actually functional here

This isn't a static mockup. The "Start free trial" button opens a real signup modal, and submitting it sends a genuine entry to Netlify Forms — no backend required. That's a deliberate choice: most portfolio landing pages have buttons that go nowhere, and I wanted at least one piece of real, working functionality a client could test themselves.

Also built in:
- Fully responsive across desktop, tablet, and mobile, tested down to small phone widths
- SEO metadata (Open Graph, Twitter Card, structured data) so the link actually previews correctly when shared
- Accessible focus states and reduced-motion support
- Clean, documented file structure — no build step required to read or edit

## Stack

HTML, CSS, and vanilla JavaScript. No React, no Tailwind, no Bootstrap. That's intentional: for a single landing page, a framework adds overhead without adding value. (I'm currently learning React separately — a component-based rebuild of this same page is planned as the next version.)

## Project structure

```
index.html          → the page
css/style.css        → styling, with all colors/type/spacing as CSS variables
js/main.js            → nav, FAQ accordion, pricing toggle, signup modal
assets/               → logo, favicons, illustrations, social share image
thank-you.html        → fallback page if the signup form's JS fails
```

## Running it

No install needed — open `index.html` directly in a browser.

The signup form only sends real data once deployed on Netlify (it needs Netlify's backend to receive the submission). Locally, the modal still opens correctly, but submitting will show a graceful error state.

## Notes for anyone reviewing this

This is a portfolio concept piece, not a live product — FlowStack itself isn't a real company. The testimonials and client logos on the page are placeholders, used to demonstrate layout and content structure. Everything else — the code, the design decisions, and the working signup form — is real.