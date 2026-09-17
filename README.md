# Altitude — Digital Agency & Product Studio Template

Altitude is a polished, multi-page agency website template built with **pure HTML5, modern CSS3, and vanilla ES6+ JavaScript**. It is designed for agencies, studios, consultants, startups, and other service businesses that want a distinctive corporate website without a framework or build step.

> **Template note:** The company names, people, addresses, contact details, testimonials, metrics, case studies, and other business claims included in this template are demonstration content. Replace them with your own content before using the template for a real organization.

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
- Client-side contact-form validation and demo submission state
- Semantic landmarks and skip links
- Custom GitHub Pages `404.html`
- `robots.txt` and `sitemap.xml`

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

### Open locally

Download or clone the template and open `index.html` in a browser. No package installation or build command is required.

### Publish with GitHub Pages

GitHub Pages can publish the template directly because it uses static HTML, CSS, and JavaScript.

For a project site, the default URL follows this pattern:

```text
https://YOUR-USERNAME.github.io/REPOSITORY-NAME/
```

Keep `index.html` at the root of the publishing source. After deployment, test the live website rather than relying only on local-file testing.

---

## Customize the template

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

Update the color variables, typography variables, spacing scale, radii, and shadows to match your brand.

### 2. Replace the brand

Update the Altitude name/logo treatment throughout:

- `index.html`
- `services.html`
- `about.html`
- `contact.html`
- `404.html`
- page titles and metadata
- footer credit/copyright text

### 3. Replace the demonstration content

The template contains fictional demonstration content, including:

- agency/company names
- team members and biographies
- office addresses
- phone numbers and email addresses
- client names
- testimonials
- project results and statistics
- case studies

Replace these details with your own approved content before publishing the website for your business or organization.

### 4. Connect the contact form

The contact form currently provides client-side validation and a demo submission state. It is **not a production email/backend service**.

Connect it to **your chosen form provider or backend** before production use.

### 5. Replace the map

The contact page includes a map placeholder. Replace it with your preferred map embed if your website needs one.

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

After customizing the template, re-test accessibility if you change content, imagery, colors, or interactive components.

---

## SEO & deployment checklist

Before publishing your customized website:

- [ ] Give every page a unique `<title>`.
- [ ] Give every page a useful meta description.
- [ ] Add the final canonical URL to every page.
- [ ] Add Open Graph metadata and a suitable social preview image.
- [ ] Replace the template favicon with your branding when appropriate.
- [ ] Update `robots.txt` for your final domain.
- [ ] Update `sitemap.xml` for your final domain and page set.
- [ ] Confirm every internal link works.
- [ ] Confirm the deployed `404.html` works.
- [ ] Test mobile navigation and all interactive components.
- [ ] Test the contact form with your real provider or backend.
- [ ] Remove or replace all demonstration business claims.
- [ ] Test the deployed website on mobile and desktop.

If you use a custom domain, make sure your canonical URL, Open Graph URL, `robots.txt`, and `sitemap.xml` all use the final domain.

---

## Production handoff checklist

Before considering your customized website ready for production, review it from the perspective of a first-time visitor:

1. Can visitors understand your business within a few seconds?
2. Do all navigation and CTA links lead somewhere meaningful?
3. Does the mobile menu work correctly?
4. Do forms provide clear feedback?
5. Are all business claims accurate and approved?
6. Are the SEO URLs correct for your final domain?
7. Does the 404 page work?
8. Are your contact details and legal/consent requirements correct?
9. Are all third-party assets properly licensed for your use?
10. Has the live website been tested on your target devices?

---

## Browser support

The template targets current evergreen versions of Chrome, Firefox, Safari, and Edge. It uses modern CSS features such as Grid, Flexbox, `clamp()`, and `IntersectionObserver`.

Legacy-browser support is not included by default.

---

## License & usage

Use the template according to the license and usage terms provided with your purchase or distribution source. Check the applicable license before redistributing the original template files or selling modified versions.

---

## Credits

**Altitude** is a fictional demonstration brand created as a website-template concept.

This template was created by **Muhadz Techo**. Replace the Altitude demonstration branding, content, and copyright information with your own approved details before production use.

For additional customization and production notes, see [`MARKETPLACE.md`](MARKETPLACE.md).
