# Portfolio Build — Progress Tracker

Live site: https://emilfreijd.github.io/EmilFreijd  
PR: https://github.com/EmilFreijd/EmilFreijd/pull/1

---

## Architecture decisions

| Decision | Choice | Rationale |
|----------|--------|-----------|
| Build system | Astro (static) | Component-based, MDX for case studies, fast GitHub Pages builds |
| Structure | Hybrid — home + sub-pages | Scrollable home, dedicated /about /work /contact |
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
/about              Full bio, career timeline, certifications, background
/work               Case studies index
/work/[slug]        Individual case study pages (Astro dynamic routes)
/contact            Formspree form + Cal.com embed + links
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
| F1 | Initial HTML/CSS/JS site | ✅ | Dark modern design, on PR branch |
| F2 | Migrate to Astro | ⬜ | Unlocks pages, MDX, build pipeline |
| F3 | GitHub Actions — auto-deploy on push to `main` | ⬜ | + nightly cron for dynamic data refresh |
| F4 | Lighthouse CI on every deploy (score ≥ 90) | ⬜ | Add to Actions workflow |
| F5 | Design system — tokens, typography, shared components | ⬜ | Extend current CSS vars into Astro components |

---

## Home page (`/`)

| # | Section | Status | Notes |
|---|---------|--------|-------|
| H1 | Hero — name, title, tagline, LinkedIn CTA | ✅ | Needs real tagline once content is ready |
| H2 | About teaser — short bio + stat cards + link to /about | ✅ | Placeholder content |
| H3 | Expertise — Leadership, Delivery, Strategic Impact | ✅ | Placeholder content |
| H4 | Work teasers — 2–3 project cards linking to /work/[slug] | ✅ | Placeholder — becomes real with case studies |
| H5 | Contact CTA strip — LinkedIn primary, "get in touch" secondary | ⬜ | Replace current contact section with lighter strip |

---

## About page (`/about`)

| # | Feature | Status | Notes |
|---|---------|--------|-------|
| A1 | Full bio — background, approach, values | ⬜ | Tone: sharp and warm, high-trust environments |
| A2 | Career timeline — roles, companies, dates, key win per role | ⬜ | Courts + Defence Tech + Enterprise IT |
| A3 | Certifications section | ⬜ | PMP, PRINCE2, ITIL, SAFe, ISO etc. |
| A4 | Skills matrix — methodology, leadership, tooling | ⬜ | Grouped tags |
| A5 | CV / resume PDF download | ⬜ | Host in repo, link from About |

---

## Work page (`/work` + `/work/[slug]`)

| # | Feature | Status | Notes |
|---|---------|--------|-------|
| W1 | Case studies index page — 2–3 project cards | ⬜ | Filterable by domain/sector |
| W2 | Case study template (Astro MDX layout) | ⬜ | Challenge → approach → outcome format |
| W3 | Case study: [TBD — project 1] | ⬜ | Content needed from Emil |
| W4 | Case study: [TBD — project 2] | ⬜ | Content needed from Emil |
| W5 | Case study: [TBD — project 3 — optional] | ⬜ | Content needed from Emil |

---

## Contact page (`/contact`)

| # | Feature | Status | Notes |
|---|---------|--------|-------|
| CO1 | Formspree contact form (name, email, message) | ⬜ | Free tier, no backend |
| CO2 | Cal.com embed — secondary, below the form | ⬜ | Needs Cal.com link/embed code |
| CO3 | LinkedIn link (primary) | ✅ | Already in current site |
| CO4 | Email link | ⬜ | Real address needed |

---

## SEO & Discoverability

| # | Feature | Status | Notes |
|---|---------|--------|-------|
| SE1 | Open Graph + Twitter Card meta tags | ⬜ | Controls how links look on LinkedIn, Slack, Teams |
| SE2 | JSON-LD Person schema | ⬜ | Improves Google knowledge panel |
| SE3 | Auto-generated sitemap.xml + robots.txt | ⬜ | Astro plugin |
| SE4 | Canonical URLs | ⬜ | One URL per page |

---

## UX & Polish

| # | Feature | Status | Notes |
|---|---------|--------|-------|
| U1 | Scroll-triggered reveal animations | ✅ | IntersectionObserver |
| U2 | Active nav highlight on scroll | ✅ | Section observer |
| U3 | Frosted glass nav on scroll | ✅ | `scrolled` class |
| U4 | Mobile navigation (hamburger menu) | ⬜ | Needed — current nav breaks on small screens |
| U5 | Dark / light mode toggle | ⬜ | Respect system preference, persist to localStorage |
| U6 | Project / case study filtering by sector | ⬜ | Client-side JS |
| U7 | Page transitions (Astro View Transitions API) | ⬜ | Smooth between home → /about, /work, /contact |

---

## Analytics

| # | Feature | Status | Notes |
|---|---------|--------|-------|
| AN1 | Privacy-friendly analytics | ⬜ | Cloudflare Web Analytics — free, no cookies, GDPR-safe |

---

## Content (needs Emil's input)

| # | Item | Status | Notes |
|---|------|--------|-------|
| C1 | Hero tagline — one sharp sentence positioning you | ⬜ | Example: "Delivering complex programs in high-trust environments" |
| C2 | Full bio text (for /about) | ⬜ | Sharp + warm tone, Courts + Defence Tech background |
| C3 | Career stats — real numbers (years, projects, etc.) | ⬜ | Replace placeholders in about teaser |
| C4 | Work history — roles, companies, dates, one key win each | ⬜ | Needed for career timeline |
| C5 | Certifications list | ⬜ | Name, issuer, year |
| C6 | Case study 1 — title, challenge, approach, outcome, metrics | ⬜ | |
| C7 | Case study 2 — title, challenge, approach, outcome, metrics | ⬜ | |
| C8 | Case study 3 — optional | ⬜ | |
| C9 | Real email address | ⬜ | |
| C10 | Cal.com link or embed code | ⬜ | |
| C11 | CV / resume PDF | ⬜ | |

---

## Completed changelog

| Date | What was done |
|------|---------------|
| 2026-05-21 | Initial site built: hero, about, expertise, projects, contact |
| 2026-05-21 | Dark modern design — CSS animations, grid bg, gradient glows, responsive |
| 2026-05-21 | PROGRESS.md created |
| 2026-05-21 | Architecture session — decisions locked, site map defined, PROGRESS.md refined |
