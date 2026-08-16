# Altitude — Digital Agency & Corporate Website Template

A four-page, fully responsive corporate website template built with **pure HTML5, modern CSS3 (Flexbox + Grid), and vanilla ES6+ JavaScript** — no build step, no frameworks, no dependencies. Unzip it, open `index.html`, and it works.

---

## 1. Directory structure

```
altitude-template/
├── index.html          Homepage — hero, trust logos, services, stats, case studies, testimonials
├── services.html        Services & capabilities — comparison tiers, tabbed process timeline
├── about.html            About & team — mission, history timeline, team grid, offices
├── contact.html         Contact — validated form, map embed, office cards
├── css/
│   └── style.css         Single stylesheet for the whole site (see §2)
├── js/
│   └── main.js            Single script for the whole site (see §4)
├── assets/                Drop your images, photos, and logo files in here
└── README.md               You are here
```

Every page loads the same `css/style.css` and `js/main.js`, so a change to either file updates all four pages at once.

---

## 2. Re-branding: colours, typography & theme

All visual theming is controlled from **one place**: the `:root` block at the top of `css/style.css` (Section 1, "Design Tokens"). You should not need to touch any other CSS to re-skin the template.

### Brand colours

```css
:root {
  --color-primary: #1b2a4a;   /* your primary/corporate colour */
  --color-accent:  #ff5a36;   /* your CTA / highlight colour */
  --color-mint:    #2fb88c;   /* secondary accent, used for stats & positive data */
  --color-paper:   #f5f3ed;   /* page background */
  --color-ink:     #12141c;   /* primary text & dark section background */
}
```

Change these six values and every button, link underline, stat number, badge, and dark section across all four pages updates automatically.

### Typography

The template ships with three Google Fonts, loaded via `<link>` tags in the `<head>` of every page:

- **Space Grotesk** — `--font-display` — headings, buttons, big numbers
- **Inter** — `--font-body` — paragraph text
- **IBM Plex Mono** — `--font-mono` — eyebrow labels, case-file numbers, data points

To swap a typeface, replace the Google Fonts `<link>` in each HTML file's `<head>` **and** update the matching variable in `css/style.css`:

```css
--font-display: 'Space Grotesk', sans-serif;
--font-body: 'Inter', sans-serif;
--font-mono: 'IBM Plex Mono', monospace;
```

The type scale itself (`--text-xs` through `--text-5xl`) uses fluid `clamp()` values, so font sizes scale smoothly between mobile and desktop without extra media queries. Adjust the min/max values inside each `clamp()` to change how aggressively text scales.

### Spacing, radius & shadows

- `--space-1` → `--space-12` is a 4px-based spacing scale used for all margins, padding, and gaps.
- `--radius-sm` / `--radius-md` / `--radius-lg` / `--radius-full` control corner rounding site-wide — set them all to `0` for a sharp, corner-square look, or increase `--radius-lg` for a softer feel.
- `--shadow-sm` / `--shadow-md` / `--shadow-lg` control elevation on cards, modals, and the sticky header.

### Section rhythm

`--section-padding-y` controls the vertical spacing of every `<section class="section">` block across the site. Change this one variable to tighten or loosen the whole site's pacing.

---

## 3. Editing content

### Adding or removing a service (`index.html` §"Services Overview" and `services.html` §"Capabilities")

Each service is a self-contained block. To add one, copy an existing `<article class="service-card">` (index.html) or `<div class="capability">` (services.html) block, update the index number, icon, heading, and copy, and paste it into the grid. To remove a service, delete its block. No JS changes are required — the grid layout reflows automatically.

### Adding or removing a team member (`about.html` §"Team")

Team cards are buttons that carry their bio data in `data-*` attributes, which the shared modal (`js/main.js` → `initModals()`) reads when clicked:

```html
<button class="team-card" data-modal-trigger data-modal-type="team"
        data-name="Full Name"
        data-role="Job Title"
        data-bio="Their bio, written as plain text or simple sentences."
        data-photo-initials="FN">
  <div class="team-card__photo" aria-hidden="true">FN</div>
  <div class="team-card__body">
    <h3>Full Name</h3>
    <p class="team-card__role">Job Title</p>
  </div>
</button>
```

To use a real photo instead of initials, replace the `.team-card__photo` div's content with an `<img>` tag pointing at a file in `/assets`. To add a member, copy this whole block inside `.grid--4`; to remove one, delete it. No JS changes needed — the modal populates itself from whichever card was clicked.

### Adding or removing a case study (`index.html` §"Featured Case Studies")

Case study cards follow the same data-attribute pattern as team cards, plus an optional metric:

```html
<article class="case-card" data-modal-trigger data-modal-type="case-study"
         data-tag="Industry · Discipline"
         data-name="Project headline"
         data-role="Scope — engagement length"
         data-bio="The full case study write-up shown inside the modal."
         data-photo-initials="XX">
  <div class="case-card__media">
    <span class="case-card__file-no font-mono">FILE / 0XX</span>
    <span class="case-card__tag">Industry</span>
  </div>
  <div class="case-card__body">
    <h3>Project headline</h3>
    <p class="text-muted">One-sentence summary shown on the card.</p>
    <div class="case-card__metric" data-metric="+000%" data-metric-label="Metric name">
      <span class="case-card__metric-value">+000%</span>
      <span>Metric name</span>
    </div>
  </div>
</article>
```

You can add multiple `data-metric` blocks inside a card (see `js/main.js` → `populateCaseModal`, which reads all `[data-metric]` elements) — the modal will display up to three metrics side by side.

### Editing the process timeline (`services.html` §"How we work")

Each step is a `.process-tab` button paired with a `.process-panel` in the same position. Tabs and panels are matched **by index**, so keep the number and order of tabs and panels identical when adding or removing a step.

### Editing engagement tiers / pricing (`services.html` §"Engagement tiers")

Each price element carries both a monthly and annual value:

```html
<div class="compare-card__price" data-monthly="$4,800" data-annual="$3,900">$4,800<span>/mo, avg.</span></div>
```

The billing toggle (`#billing-toggle`) swaps between these automatically — just update the two `data-*` values and the visible starting price to match.

### Wiring up the contact form

`contact.html`'s form validates client-side only (see `js/main.js` → `initContactForm()`). To connect it to a real backend:

1. Open `js/main.js` and find the `// ---- Submission stub ----` comment inside `initContactForm()`.
2. Replace the `setTimeout(...)` block with a `fetch()` call to your form endpoint (Formspree, Netlify Forms, a custom API route, etc.).
3. Keep the success-state code (`form.reset()`, `statusBox` update) inside your fetch's `.then()`.

### Wiring up the map

`contact.html` includes a placeholder `<div class="map-placeholder">` inside `.map-embed`, with an HTML comment showing the exact `<iframe>` markup to paste in from Google Maps' "Share → Embed a map" panel.

---

## 4. JavaScript features (`js/main.js`)

All functions are self-guarding — each checks that its DOM hooks exist before running, so the single shared file works safely across all four pages without errors.

| Function | Purpose | Used on |
|---|---|---|
| `initMobileNav()` | Accessible hamburger menu: toggles the off-canvas drawer, closes on link click / outside click / Escape | All pages |
| `initScrollReveal()` | Fades/slides any `.reveal` element into view once scrolled into the viewport | All pages |
| `initStatsCounters()` | Animates numbers from 0 to their `data-counter-target` value on scroll into view | `index.html` |
| `initProcessTabs()` | Keyboard-accessible tabbed timeline (arrow-key navigation, ARIA tabs pattern) | `services.html` |
| `initComparisonToggle()` | Swaps monthly/annual pricing across comparison cards | `services.html` |
| `initModals()` | Shared modal system for team bios and case studies, populated from `data-*` attributes, with focus trap | `index.html`, `about.html` |
| `initTestimonialSlider()` | Auto-advancing testimonial slider with dot/arrow navigation, pauses on hover/focus | `index.html` |
| `initContactForm()` | Client-side form validation with inline error messages and a submission stub | `contact.html` |
| `initHeaderScrollState()` | Adds elevation to the sticky header on scroll; marks the active nav link | All pages |

---

## 5. Accessibility & performance notes

- Semantic landmarks (`<header>`, `<nav>`, `<main>`, `<section>`, `<article>`, `<footer>`) are used throughout for screen-reader navigation.
- All interactive components (nav, tabs, modal, slider) are keyboard-operable and respect `prefers-reduced-motion`.
- Visible focus states are enabled globally via `:focus-visible`.
- The template ships with no build tooling by design — it is meant to be edited directly and deployed to any static host (Netlify, Vercel, GitHub Pages, S3, or a standard web server).

---

## 6. Browser support

Built against current versions of Chrome, Firefox, Safari, and Edge. Uses CSS Grid, Flexbox, `clamp()`, and `IntersectionObserver` — all standard in evergreen browsers since 2020. No polyfills are included; add them if you need to support legacy browsers.
