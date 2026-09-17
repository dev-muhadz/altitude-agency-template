# Altitude — Marketplace & Production Guide

Altitude is a static website template. The included agency, people, addresses, metrics, case studies, phone numbers, email addresses, and other business details are demonstration content and should be replaced before a buyer uses the template for a real organization.

## Before publishing for a client

- Replace the Altitude brand name, logo, colours, typography, and copy.
- Replace all fictional team members, biographies, offices, phone numbers, email addresses, testimonials, metrics, and case studies.
- Replace the contact-form submission stub with a real form endpoint or backend.
- Replace the map placeholder with the client's real map embed if required.
- Add the client's real favicon, social preview image, canonical URL, and Open Graph metadata.
- Update `robots.txt` and `sitemap.xml` if the production domain changes.
- Review every internal and external link.
- Replace any template credit according to the license terms under which the template is sold.

## GitHub Pages deployment

The template is static and does not require a build step. GitHub Pages can publish static HTML, CSS, and JavaScript directly from a repository. Keep `index.html` at the top level of the publishing source.

For a project site, the default GitHub Pages URL follows this pattern:

`https://YOUR-USERNAME.github.io/REPOSITORY-NAME/`

After deployment, test the homepage, all internal page links, the custom 404 page, mobile navigation, forms, and every interactive component.

## SEO checklist

Before delivery:

- Set a unique `<title>` and meta description on every page.
- Add canonical URLs using the final production domain.
- Add Open Graph metadata and a suitable social preview image.
- Keep `robots.txt` and `sitemap.xml` aligned with the final domain.
- Confirm that important content is present in the HTML and not dependent on JavaScript for indexing.
- Test the deployed URLs, not only local files.

## Licensing note

This repository intentionally does not declare a generic open-source license for commercial resale. If the template is later sold through a specific marketplace, use that marketplace's current commercial licensing requirements and listing rules rather than assuming an open-source license applies.

## Customization map

| Area | Main file | Typical changes |
|---|---|---|
| Homepage | `index.html` | Hero, services, case studies, stats, testimonials |
| Services | `services.html` | Capabilities, process, engagement tiers |
| About | `about.html` | Story, timeline, team, offices |
| Contact | `contact.html` | Form, contact details, map |
| Theme | `css/style.css` | Design tokens, typography, spacing, components |
| Mobile UX | `css/mobile-ux.css` | Mobile-specific refinements |
| Interactions | `js/main.js` | Navigation, tabs, modals, slider, form behavior |
| SEO/deployment | `robots.txt`, `sitemap.xml` | Production crawl configuration |
| Error page | `404.html` | Missing-page experience |

## Demo-content warning

Altitude's content is intentionally polished demonstration copy. It should not be presented as the buyer's real company information. Replace business claims and contact details before commercial deployment.
