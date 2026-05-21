# Portfolio Build — Progress Tracker

Live site: https://emilfreijd.github.io/EmilFreijd  
PRs: [#1 — Initial build](https://github.com/EmilFreijd/EmilFreijd/pull/1) · [#2 — i18n + theming](https://github.com/EmilFreijd/EmilFreijd/pull/2)

---

## Architecture decisions

| Decision | Choice | Rationale |
|----------|--------|-----------|
| Build system | Astro 5 (static) | Component-based, MDX for case studies, fast GitHub Pages builds |
| Structure | Hybrid — home + sub-pages | Scrollable home, dedicated /about /work /contact |
| Languages | EN (default) + SV at /sv/ | Astro i18n routing, prefixDefaultLocale: false |
| Primary CTA | LinkedIn | Audience is clients/peers, not recruiters |
| Secondary CTA | Cal.com (contact page) | Available but not prominent |
| Contact form | Formspree | No backend, delivers to inbox |
| Blog | No — case studies only | 2–3 flagship project deep-dives |
| Case studies | 2–3 flagship projects | Quality over quantity |
| Audience | Clients/partners + professional peers | Not job-seeking |
| Positioning | Currently employed — building professional brand | Not "hire me", but "know me" |
| Industries | Public sector (Courts) + Defence Tech + Enterprise IT | High-trust, high-stakes environments |
| Tone | Sharp and warm | Professional but human — credible without being stiff |

---

## Site map

```
/                   Home (hero, about teaser, expertise, work teasers, CTA strip)
/about              Full bio, career timeline, skills matrix, certifications
/work               Case studies index
/work/[slug]        Individual case study (MDX, metrics sidebar)
/contact            Formspree form + Cal.com + links

/sv/                Swedish equivalents of all above
/sv/about
/sv/work
/sv/work/[slug]
/sv/contact
```

---

## Status key
- ✅ Done
- 🔄 In progress
- ⬜ Not started

---

## Foundation

| # | Feature | Status | Notes |
|---|---------|--------|-------|
| F1 | Initial site | ✅ | Dark modern design |
| F2 | Migrate to Astro 5 | ✅ | MDX, content collections, static output |
| F3 | GitHub Actions CI/CD — auto-deploy on push to `main` | ✅ | Node.js 24-native action versions |
| F4 | Lighthouse CI on every deploy | ⬜ | Add to Actions workflow |
| F5 | Design system — CSS tokens, typography, shared components | ✅ | Full token set, light/dark aware |
| F6 | i18n — English + Swedish routing | ✅ | Strings in `src/i18n/translations.ts` |

---

## Home page (`/` and `/sv/`)

| # | Section | Status | Notes |
|---|---------|--------|-------|
| H1 | Hero — name, title, tagline, LinkedIn CTA | ✅ | Fully translated EN/SV |
| H2 | About teaser — bio + stat cards + link to /about | ✅ | Placeholder content, fully translated |
| H3 | Expertise — Leadership, Delivery, Strategic Impact | ✅ | Fully translated EN/SV |
| H4 | Work teasers — cards linking to /work/[slug] | ✅ | Shows featured case studies, empty state fallback |
| H5 | Contact CTA strip | ✅ | LinkedIn primary, "get in touch" secondary |

---

## About page (`/about` and `/sv/about`)

| # | Feature | Status | Notes |
|---|---------|--------|-------|
| A1 | Full bio — background, approach, values | ⬜ | Structure built, needs real content |
| A2 | Career timeline — roles, companies, dates, key win per role | ⬜ | Structure built, needs real content |
| A3 | Certifications section | ⬜ | Structure built, needs real content |
| A4 | Skills matrix — methodology, leadership, tooling | ✅ | Structure built with placeholder groups |
| A5 | CV / resume PDF download | ⬜ | Add `public/cv.pdf`, uncomment link in About.astro |

---

## Work page (`/work` + `/work/[slug]`)

| # | Feature | Status | Notes |
|---|---------|--------|-------|
| W1 | Case studies index — list with sector tag + metrics | ✅ | Empty state shown until content added |
| W2 | Case study MDX template — metrics sidebar + prose | ✅ | `src/content/work/example-project.mdx` as reference |
| W3 | Case study: [TBD — project 1] | ⬜ | Content needed from Emil |
| W4 | Case study: [TBD — project 2] | ⬜ | Content needed from Emil |
| W5 | Case study: [TBD — project 3 — optional] | ⬜ | Content needed from Emil |

---

## Contact page (`/contact` and `/sv/contact`)

| # | Feature | Status | Notes |
|---|---------|--------|-------|
| CO1 | Formspree contact form | ✅ | Replace `YOUR_FORM_ID` in `Contact.astro` |
| CO2 | Cal.com link — secondary | ✅ | Replace `CAL_LINK` in `Contact.astro` |
| CO3 | LinkedIn link (primary) | ✅ | Wired up |
| CO4 | Confidentiality note | ✅ | Translated EN/SV |

---

## UX & Polish

| # | Feature | Status | Notes |
|---|---------|--------|-------|
| U1 | Scroll-triggered reveal animations | ✅ | IntersectionObserver |
| U2 | Frosted glass nav on scroll | ✅ | Theme-aware |
| U3 | Mobile navigation (hamburger menu) | ✅ | Drawer with lang switcher |
| U4 | Dark / light mode toggle | ✅ | System preference detected, persists to localStorage, zero flash |
| U5 | Language switcher (EN ↔ SV) | ✅ | In nav + mobile drawer, preserves current page |
| U6 | Project / case study filtering by sector | ⬜ | Client-side JS, add when case studies exist |
| U7 | Page transitions (Astro View Transitions) | ⬜ | One-line addition to BaseLayout |

---

## SEO & Discoverability

| # | Feature | Status | Notes |
|---|---------|--------|-------|
| SE1 | Open Graph + Twitter Card meta tags | ✅ | In BaseLayout |
| SE2 | JSON-LD Person schema | ✅ | In BaseLayout |
| SE3 | Canonical URLs | ✅ | In BaseLayout |
| SE4 | Sitemap.xml + robots.txt | ⬜ | Add `@astrojs/sitemap` integration |

---

## Analytics

| # | Feature | Status | Notes |
|---|---------|--------|-------|
| AN1 | Privacy-friendly analytics | ⬜ | Cloudflare Web Analytics — free, no cookies, GDPR-safe |

---

## Content (needs Emil's input)

| # | Item | Status | Notes |
|---|------|--------|-------|
| C1 | Hero tagline | ⬜ | Edit `hero.subtitle` in `translations.ts` (both EN + SV) |
| C2 | Full bio (EN + SV) | ⬜ | Edit placeholder paragraphs in `About.astro` |
| C3 | Career stats — real numbers | ⬜ | Edit stat cards in `Home.astro` and `About.astro` |
| C4 | Work history — roles, companies, dates, one key win each | ⬜ | Edit `timeline` array in `About.astro` |
| C5 | Certifications list | ⬜ | Edit `certifications` array in `About.astro` |
| C6 | Case study 1 — title, challenge, approach, outcome, metrics | ⬜ | Copy `example-project.mdx`, set `draft: false` |
| C7 | Case study 2 | ⬜ | Same as above |
| C8 | Case study 3 — optional | ⬜ | Same as above |
| C9 | Formspree form ID | ⬜ | Replace `YOUR_FORM_ID` in `Contact.astro` |
| C10 | Cal.com link | ⬜ | Replace `CAL_LINK` in `Contact.astro` |
| C11 | CV / resume PDF | ⬜ | Add to `public/cv.pdf`, uncomment link in `About.astro` |

---

## Completed changelog

| Date | What was done |
|------|---------------|
| 2026-05-21 | Initial site built: hero, about, expertise, projects, contact sections |
| 2026-05-21 | Dark modern design — CSS animations, grid bg, gradient glows, responsive |
| 2026-05-21 | PROGRESS.md created |
| 2026-05-21 | Architecture session — decisions locked, site map defined |
| 2026-05-21 | Migrated to Astro 5 — full boilerplate: all pages, components, GitHub Actions |
| 2026-05-21 | GitHub Actions CI/CD — updated to Node.js 24-native action versions |
| 2026-05-21 | i18n (EN/SV) + dark/light theme — PR #2 |
