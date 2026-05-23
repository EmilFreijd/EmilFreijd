# Portfolio Build — Progress Tracker

Live site: https://emilfreijd.se  
Repo: https://github.com/EmilFreijd/EmilFreijd

---

## Architecture decisions

| Decision | Choice | Rationale |
|----------|--------|-----------|
| Build system | Astro 5 (static) | Component-based, MDX for case studies, fast GitHub Pages builds |
| Structure | Hybrid — home + sub-pages | Scrollable home, dedicated /about /stream /contact |
| Languages | EN (default) + SV at /sv/ | Astro i18n routing, prefixDefaultLocale: false |
| Primary CTA | LinkedIn | Audience is clients/peers, not recruiters |
| Secondary CTA | Cal.com (contact page) | Available but not prominent |
| Contact form | Formspree | No backend, delivers to inbox |
| Content | Unified stream (cases, essays, updates, projects) | Quality over quantity; one timeline, one filter |
| Audience | Clients/partners + professional peers | Not job-seeking — "know me", not "hire me" |
| Positioning | IT leader — capacity/potential site | The carpenter advertises buildings, not tools |
| Industries | Public sector · Defence · Enterprise IT | High-trust, high-stakes environments |
| Tone | Personal but professional | Honest, sharp, human — not a polished facade |

---

## Site map

```
/                   Home (hero, about teaser, expertise, stream teasers, CTA strip)
/about              Full bio, how I work, approach, career timeline, skills, certs
/stream             Unified timeline (cases, projects, essays, updates) with Timeless filter
/stream/[slug]      Individual entry (MDX, optional metrics sidebar)
/contact            Formspree form + Cal.com + LinkedIn

/sv/                Swedish equivalents of all above
/sv/about
/sv/stream
/sv/stream/[slug]
/sv/contact
```

---

## Status key
- ✅ Done
- 🔄 In progress / partial content
- ⬜ Not started

---

## Foundation

| # | Feature | Status | Notes |
|---|---------|--------|-------|
| F1 | Initial site | ✅ | Dark modern design |
| F2 | Astro 5 — MDX, content collections, static output | ✅ | |
| F3 | GitHub Actions CI/CD — auto-deploy on push to `main` | ✅ | Node.js 24-native action versions |
| F4 | Lighthouse CI on every deploy | ⬜ | Add to Actions workflow |
| F5 | Design system — CSS tokens, typography, shared components | ✅ | Full token set, light/dark aware |
| F6 | i18n — English + Swedish routing | ✅ | All strings in `src/i18n/translations.ts` |
| F7 | Custom domain `emilfreijd.se` | ✅ | CNAME in public/, base: '/', site: 'https://emilfreijd.se' |

---

## Home page (`/` and `/sv/`)

| # | Section | Status | Notes |
|---|---------|--------|-------|
| H1 | Hero — name, title, tagline, LinkedIn CTA | ✅ | Real copy EN/SV; badge, title, subtitle all set |
| H2 | About teaser — bio + stat cards + link to /about | ✅ | Real copy EN/SV |
| H3 | Expertise — four areas with real copy | ✅ | Technical Team Building, Tech Adoption, Applied AI, Platform Architecture |
| H4 | Stream teasers — featured entries linking to /stream/[slug] | ✅ | Shows featured cases, empty state fallback |
| H5 | Contact CTA strip | ✅ | "Låt oss connecta." EN/SV; LinkedIn primary |

---

## About page (`/about` and `/sv/about`)

| # | Feature | Status | Notes |
|---|---------|--------|-------|
| A1 | Bio — real intro paragraph EN/SV | ✅ | From drafts/about-page.md |
| A2 | "How I work" — six core traits | ✅ | Numbered cards, EN/SV |
| A3 | "Approach" — three proof points | ✅ | Left-accented cards, EN/SV |
| A4 | "What I want to build" — forward-looking section | ✅ | Two-column, bullet list, EN/SV |
| A5 | "Values" — brief personal statement | ✅ | EN/SV |
| A6 | Career timeline | 🔄 | Structure ready — needs real roles, orgs, dates from Emil |
| A7 | Skills matrix | ✅ | Three groups: Delivery, Leadership, Technology |
| A8 | Certifications | 🔄 | Structure ready — needs real certs from Emil |
| A9 | CV / resume PDF download | ⬜ | Add `public/cv.pdf`, uncomment link in About.astro |

---

## Stream page (`/stream` + `/stream/[slug]`)

| # | Feature | Status | Notes |
|---|---------|--------|-------|
| S1 | Stream index — unified timeline with kind tags | ✅ | All/Timeless filter, colour-coded kind tags |
| S2 | Stream detail — MDX with optional metrics sidebar | ✅ | Sidebar only shown when metrics present |
| S3 | Case: Court system modernisation | 🔄 | `court-system-modernisation.mdx` — structure ready, real content needed |
| S4 | Case: Defence IT programme | 🔄 | `defence-programme-delivery.mdx` — structure ready, real content needed |
| S5 | Essays (3 ready) | ⬜ | Content in `drafts/writing-section.md` — publish as stream entries |
| S6 | Personal projects (2 ready) | ⬜ | Content in `drafts/personal-projects.md` — publish as stream entries |
| S7 | Updates feed (4 ready) | ⬜ | Content in `drafts/updates-feed.md` — publish as stream entries |

---

## Contact page (`/contact` and `/sv/contact`)

| # | Feature | Status | Notes |
|---|---------|--------|-------|
| CO1 | Formspree contact form | ✅ | `@formspree/ajax` SDK — form ID `xwvzoqrk` |
| CO2 | Cal.com link | ✅ | `https://cal.com/emilfreijd` |
| CO3 | LinkedIn link (primary) | ✅ | `https://www.linkedin.com/in/emilfreijd` |
| CO4 | Confidentiality note | ✅ | Translated EN/SV |
| CO5 | Spam honeypot field | ⬜ | Hidden `<input name="_gotcha">` — blocks most bots |

---

## UX & Polish

| # | Feature | Status | Notes |
|---|---------|--------|-------|
| U1 | Scroll-triggered reveal animations | ✅ | IntersectionObserver |
| U2 | Frosted glass nav on scroll | ✅ | Theme-aware |
| U3 | Mobile navigation (hamburger menu) | ✅ | Drawer with lang switcher |
| U4 | Dark / light mode toggle | ✅ | System preference detected, persists to localStorage, zero flash |
| U5 | Language switcher (EN ↔ SV) | ✅ | In nav + mobile drawer, preserves current page |
| U6 | Nav logo preserves language | ✅ | Logo links to `/` or `/sv/` based on current lang |
| U7 | Page transitions (Astro View Transitions) | ⬜ | One-line addition to BaseLayout |
| U8 | Favicon + Apple Touch icon | ⬜ | `.ico` + 180px PNG in `public/` |
| U9 | Active nav link highlight | ⬜ | `Astro.url.pathname` check in Nav.astro |
| U10 | Custom 404 page | ✅ | Branded, links to EN and SV home |
| U11 | Skip-to-content link | ⬜ | Accessibility — first focusable element in BaseLayout |
| U12 | `theme-color` meta tag | ⬜ | Mobile browser chrome matches dark/light mode |

---

## SEO & Discoverability

| # | Feature | Status | Notes |
|---|---------|--------|-------|
| SE1 | Open Graph + Twitter Card meta tags | ✅ | In BaseLayout |
| SE2 | JSON-LD Person schema | ✅ | In BaseLayout |
| SE3 | Canonical URLs | ✅ | In BaseLayout |
| SE4 | Sitemap.xml | ✅ | `@astrojs/sitemap` with i18n config — generates `sitemap-index.xml` |
| SE5 | `hreflang` alternate link tags | ✅ | EN/SV/x-default pairs in BaseLayout `<head>`, computed from `Astro.url.pathname` |
| SE6 | Open Graph image | ⬜ | 1200×630 PNG at `public/og.png` — controls LinkedIn share preview |

---

## Analytics

| # | Feature | Status | Notes |
|---|---------|--------|-------|
| AN1 | Privacy-friendly analytics | ⬜ | Cloudflare Web Analytics — free, no cookies, GDPR-safe |

---

## Backlog

| # | Item | Priority | Notes |
|---|------|----------|-------|
| B1 | Favicon + Apple Touch icon + OG image | High | Favicon: `.ico` + SVG in `public/`. OG: 1200×630 PNG at `public/og.png`. BaseLayout `<head>` already references `/og.png`. |
| B2 | Daedalus content pipeline | High | Create private `emilfreijd/daedalus` repo, write `publish-en.yml` + `publish-sv.yml` with gate check (both lang files required). See `PIPELINE.md`. |
| B3 | Active nav link highlight | Medium | `Nav.astro`: compare `Astro.url.pathname` with link path, apply `.active` class + CSS underline. |
| B4 | Cloudflare Web Analytics | Medium | One script tag in BaseLayout. Free, no cookies, GDPR-safe. |
| B5 | Now page `/now` | Medium | Draft ready in `drafts/now-page.md`. New Astro page + SV version. |
| B6 | CV / resume PDF | Low | Add `public/cv.pdf`, uncomment download link in `About.astro`. |
| B7 | Page transitions (View Transitions API) | Low | One import in BaseLayout: `import { ViewTransitions } from 'astro:transitions'`. |
| B8 | Spam honeypot on contact form | Low | Hidden `<input name="_gotcha">` in contact form. |

## Content still needed

| # | Item | Status | Notes |
|---|------|--------|-------|
| C1 | 3 essays | ✅ | Published: building-with-friction, direction-in-public, better-inputs |
| C2 | 2 personal projects | ✅ | Published: accountability-agent, creative-operating-system |
| C3 | 4 updates | ✅ | Published: update-better-inputs, update-living-feed, update-publish-early, update-what-projects-prove |
| C4 | Design Thinking lab | ✅ | Published: design-thinking-lab (EN + SV) |
| C5 | Career case studies (Domstolsverket programs) | ⬜ | The big ones — real program narratives from Emil's work history |
| C6 | CV / resume PDF | ⬜ | Add to `public/cv.pdf` |
| C7 | Now page content | ⬜ | Draft in `drafts/now-page.md` |

---

## Completed changelog

| Date | What was done |
|------|---------------|
| 2026-05-21 | Initial site built: hero, about, expertise, projects, contact |
| 2026-05-21 | Dark modern design — CSS animations, grid bg, gradient glows, responsive |
| 2026-05-21 | Migrated to Astro 5 — full boilerplate, all pages, GitHub Actions |
| 2026-05-21 | GitHub Actions CI/CD — updated to Node.js 24-native action versions |
| 2026-05-21 | i18n (EN/SV) + dark/light theme |
| 2026-05-21 | Formspree SDK integrated — form ID and Cal.com link set |
| 2026-05-22 | Real hero copy — badge, title, subtitle EN/SV |
| 2026-05-22 | Four expertise areas with real copy EN/SV |
| 2026-05-22 | Stats updated (years dynamic, labels updated) |
| 2026-05-22 | Swedish CTA language: "Connecta på LinkedIn", "Låt oss connecta." |
| 2026-05-22 | Content analysis of old Daedalus site; drafts/ folder created |
| 2026-05-22 | Work collection replaced with unified Stream collection |
| 2026-05-22 | Stream index + detail components built (All/Timeless filter, kind tags) |
| 2026-05-22 | Nav updated: work → stream links; logo preserves language on click |
| 2026-05-22 | Footer updated: work → stream link |
| 2026-05-22 | Custom domain emilfreijd.se — CNAME, base path, site URL updated |
| 2026-05-22 | README.md updated with real positioning and links |
| 2026-05-22 | About page rebuilt: real bio, six traits, three proof points, forward/values sections |
| 2026-05-22 | Career timeline, certifications, and skills populated with real data from LinkedIn |
| 2026-05-22 | Bilingual MDX routing: lang frontmatter field, -sv suffix convention, SV fallback |
| 2026-05-22 | PIPELINE.md added — bilingual publish gate documented |
| 2026-05-22 | BUG-01/04/05 fixed: page-hero heading, ghost button hover, about-teaser tags |
| 2026-05-23 | Placeholder cases removed (court-system-modernisation, defence-programme-delivery) |
| 2026-05-23 | 9 stream entries published: 3 essays, 2 projects, 4 updates (EN + SV each) |
| 2026-05-23 | Design Thinking lab case published (EN + SV) |
| 2026-05-23 | Sitemap (`@astrojs/sitemap`) + hreflang EN/SV/x-default added |
| 2026-05-23 | JSON-LD URL corrected from GitHub Pages to emilfreijd.se |
