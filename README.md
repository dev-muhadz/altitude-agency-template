# Altitude — Digital Agency & Product Studio Template

Altitude is a polished, multi-page agency website template built with **pure HTML5, modern CSS3, and vanilla ES6+ JavaScript**. It is designed for agencies, studios, consultants, startups, and other service businesses that want a distinctive corporate site without a framework or build step.

> **Demo template:** The company names, people, addresses, contact details, testimonials, metrics, case studies, and other business claims included in this repository are demonstration content. Replace them before using the template for a real organization.

---

## Features

- Fully responsive multi-page layout
- Pure HTML5, CSS3, and vanilla JavaScript
- No build step and no framework dependency
- CSS custom properties for centralized theming
- Mobile navigation with keyboard/focus support
- Scroll-reveal animations with reduced-motion support
- Animated statistics counters
- Accessible process tabs with keyboard navigation
- Monthly/annual engagement comparison toggle
- Team and case-study modal system
- Testimonial slider with controls
- Client-side contact-form validation and submission stub
- Semantic landmarks and skip links
- Custom GitHub Pages `404.html`
- `robots.txt` and `sitemap.xml`
- Marketplace/production customization guide

---

## Project structure

```text
altitude-agency-template/
├── index.html
├── services.html
├── about.html
├── contact.html
├── 404.html
├── favicon.svg
├── robots.txt
├── sitemap.xml
├── MARKETPLACE.md
├── css/
│   ├── style.css
│   └── mobile-ux.css
├── js/
│   └── main.js
├── assets/
└── README.md
```

`css/style.css` contains the main design system and components. `css/mobile-ux.css` contains mobile-specific refinements. `js/main.js` contains the shared interactions used across the pages.

---

## Quick start

### Option 1 — Open locally

Download or clone the repository and open `index.html` in a browser. No package installation or build command is required.

### Option 2 — GitHub Pages

GitHub Pages can publish static HTML, CSS, and JavaScript directly from a repository. For a project site, the default URL follows this pattern:

```text
https://YOUR-USERNAME.github.io/REPOSITORY-NAME/
```

Keep `index.html` at the root of the publishing source. After deployment, test the live URL rather than relying only on local-file testing.

---

## Rebranding the template

### 1. Change the visual theme

The main design tokens are near the top of `css/style.css`:

```css
:root {
  --color-primary: #1b2a4a;
  --color-accent: #ff5a36;
  --color-mint: #2fb88c;
  --color-paper: #f5f3ed;
  --color-ink: #12141c;
}
```

Update the color variables, typography variables, spacing scale, radii, and shadows to match the buyer's brand.

### 2. Replace the brand

Update the Altitude name/logo treatment throughout:

- `index.html`
- `services.html`
- `about.html`
- `contact.html`
- `404.html`
- page titles and metadata
- footer credit/copyright text

### 3. Replace demonstration content

The template contains fictional demonstration content, including:

- agency/company names
- team members and biographies
- office addresses
- phone numbers and email addresses
- client names
- testimonials
- project results and statistics
- case studies

Do not present those claims as real client information.

### 4. Replace contact functionality

The contact form currently provides client-side validation and a demo submission state. It is **not a production email/backend service**.

Connect it to the buyer's chosen form provider or backend before production use.

### 5. Replace the map

The contact page includes a map placeholder. Replace it with the buyer's real map embed if a map is required.

---

## JavaScript features

| Function | Purpose |
|---|---|
| `initMobileNav()` | Accessible mobile navigation, outside-click dismissal, Escape handling and focus management |
| `initScrollReveal()` | Reveals `.reveal` elements as they enter the viewport |
| `initStatsCounters()` | Animates statistics when they enter the viewport |
| `initProcessTabs()` | Keyboard-accessible process tabs and panels |
| `initComparisonToggle()` | Switches engagement comparison values between billing periods |
| `initModals()` | Team and case-study modal system with focus trapping |
| `initTestimonialSlider()` | Testimonial navigation and auto-advance |
| `initContactForm()` | Client-side validation and demo submission state |
| `initHeaderScrollState()` | Header scroll state and active navigation handling |

The shared script uses defensive DOM checks so page-specific features do not require separate JavaScript files.

---

## Accessibility

Altitude includes:

- semantic HTML landmarks
- skip-to-content links
- keyboard-operable navigation
- visible `:focus-visible` states
- ARIA relationships for interactive controls
- keyboard navigation for process tabs
- modal focus trapping
- Escape/outside-click dismissal for overlays
- `prefers-reduced-motion` handling

Accessibility should still be re-tested after replacing content, imagery, colors, or interactive components.

---

## SEO & deployment checklist

Before delivering a customized copy:

- [ ] Give every page a unique `<title>`.
- [ ] Give every page a useful meta description.
- [ ] Add the final production canonical URL to every page.
- [ ] Add Open Graph metadata and a suitable social preview image.
- [ ] Replace the template favicon with the buyer's branding when appropriate.
- [ ] Update `robots.txt` for the final domain.
- [ ] Update `sitemap.xml` for the final domain and page set.
- [ ] Confirm every internal link works.
- [ ] Confirm the deployed `404.html` works.
- [ ] Test mobile navigation and all interactive components.
- [ ] Test the contact form against the real backend/provider.
- [ ] Remove or replace demonstration business claims.
- [ ] Test the actual deployed site on mobile and desktop.

GitHub Pages supports both `github.io` project URLs and custom domains. If a custom domain is used, configure it through the repository's Pages settings and update the site's canonical/SEO URLs accordingly.

---

## Marketplace customization guide

See **[`MARKETPLACE.md`](MARKETPLACE.md)** for the production handoff checklist, demo-content warning, SEO checklist, deployment notes, and customization map.

For a commercial marketplace listing, prepare your own:

- product screenshots
- live demo URL
- feature list
- browser/device support statement
- customization instructions
- support policy
- commercial license terms
- third-party asset/font notices where applicable

Do not assume that a generic open-source license is appropriate for a commercial template product. Choose licensing terms based on the marketplace and business model where the template will actually be sold.

---

## Browser support

The template targets current evergreen versions of Chrome, Firefox, Safari, and Edge. It uses modern CSS features such as Grid, Flexbox, `clamp()`, and `IntersectionObserver`.

Legacy-browser support is not included by default.

---

## Production handoff

Before calling a customized copy production-ready, review the complete site from the perspective of a first-time visitor:

1. Can they understand the business within a few seconds?
2. Do all navigation and CTA links lead somewhere meaningful?
3. Does the mobile menu work with touch and keyboard input?
4. Do forms provide clear feedback?
5. Are all business claims real and approved?
6. Are the SEO URLs correct for the final domain?
7. Does the 404 page work?
8. Are contact details and legal/consent requirements correct for the buyer?
9. Are all third-party assets properly licensed?
10. Has the live deployment been tested on real devices?

---

## License

This repository intentionally does not declare a generic open-source license for commercial resale. If the template is later distributed through a specific marketplace, apply the marketplace's current commercial licensing and listing requirements rather than assuming that an open-source license applies.

---

## Credits

**Altitude** is a fictional demonstration brand created as a website-template concept.

Replace the template credit and copyright information with the buyer's approved branding and licensing terms before production use.
