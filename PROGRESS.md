# Portfolio Build — Progress Tracker

Live site: https://emilfreijd.github.io/EmilFreijd

---

## Status key
- ✅ Done
- 🔄 In progress
- ⬜ Not started

---

## Foundation

| # | Feature | Status | Notes |
|---|---------|--------|-------|
| F1 | Initial HTML/CSS/JS site | ✅ | Dark modern design, deployed on branch |
| F2 | Migrate to Astro (component-based, MDX support) | ⬜ | Unlocks blog, case studies, build pipeline |
| F3 | GitHub Actions CI/CD — auto-deploy on push to `main` | ⬜ | Also add nightly cron for dynamic data |
| F4 | Lighthouse CI check on every deploy (score ≥ 90) | ⬜ | Add to Actions workflow |
| F5 | Design system: tokens, typography, component library | ⬜ | Extend current CSS variables |

---

## Sections

| # | Feature | Status | Notes |
|---|---------|--------|-------|
| S1 | Hero — name, title, tagline, CTA buttons | ✅ | Animated grid bg, gradient glows |
| S2 | About — bio, stat cards | ✅ | Placeholder content — needs real data |
| S3 | Expertise — 3 cards (Leadership, Delivery, Strategy) | ✅ | Placeholder content |
| S4 | Projects — 4 cards with metrics | ✅ | Placeholder content — needs real projects |
| S5 | Contact — LinkedIn, email, GitHub links | ✅ | Needs real email address |
| S6 | Work history timeline | ⬜ | Career progression with key win per role |
| S7 | Certifications section | ⬜ | PMP, PRINCE2, ITIL, SAFe, ISO etc. |
| S8 | Skills matrix | ⬜ | Grouped tags or radar chart |
| S9 | Case study detail pages (per-project deep dives) | ⬜ | Own URL per project, MDX-authored |
| S10 | Testimonials / recommendations | ⬜ | Quotes from stakeholders, managers, reports |
| S11 | Speaking & events section | ⬜ | Conferences, webinars, internal talks |
| S12 | Blog / writing section | ⬜ | GitHub Issues as CMS, auto-built via Actions |

---

## Integrations

| # | Feature | Status | Notes |
|---|---------|--------|-------|
| I1 | Cal.com booking embed | ⬜ | Inline embed or popup on contact page |
| I2 | Custom contact form with email delivery | ⬜ | No backend — Formspree or EmailJS |
| I3 | LinkedIn post feed / activity showcase | ⬜ | Static embed or screenshot approach |
| I4 | GitHub activity widget (fetched at build time) | ⬜ | Actions fetches data → bakes into static JSON |
| I5 | CV / resume PDF download | ⬜ | Host PDF in repo, link from hero + about |

---

## SEO & Discoverability

| # | Feature | Status | Notes |
|---|---------|--------|-------|
| SE1 | Open Graph + Twitter Card meta tags | ⬜ | Controls LinkedIn/Slack link previews |
| SE2 | JSON-LD structured data (Person schema) | ⬜ | Improves Google knowledge panel |
| SE3 | Auto-generated sitemap.xml + robots.txt | ⬜ | Astro plugin handles this |
| SE4 | Canonical URLs | ⬜ | Avoid duplicate content |

---

## UX & Polish

| # | Feature | Status | Notes |
|---|---------|--------|-------|
| U1 | Scroll-triggered reveal animations | ✅ | IntersectionObserver on cards |
| U2 | Active nav highlight on scroll | ✅ | Section observer wired up |
| U3 | Nav blur/frosted glass on scroll | ✅ | `scrolled` class toggled |
| U4 | Dark / light mode toggle | ⬜ | Respect `prefers-color-scheme`, persist to localStorage |
| U5 | Project filtering by category | ⬜ | Client-side JS filter |
| U6 | GSAP advanced scroll animations | ⬜ | Staggered reveals, parallax, timeline effects |
| U7 | Typewriter / scramble text in hero | ⬜ | Animates title on load |
| U8 | Mobile navigation (hamburger menu) | ⬜ | Current nav breaks below ~480px |

---

## Analytics & Performance

| # | Feature | Status | Notes |
|---|---------|--------|-------|
| A1 | Privacy-friendly analytics | ⬜ | Cloudflare Web Analytics (free, no cookies) |
| A2 | Image optimization | ⬜ | Astro's built-in `<Image />` component |
| A3 | PWA — manifest.json + service worker | ⬜ | Installable on mobile, works offline |

---

## Content (needs Emil's input)

| # | Item | Status | Notes |
|---|------|--------|-------|
| C1 | Real bio / about text | ⬜ | Replace placeholder in About section |
| C2 | Accurate career stats (years, projects, etc.) | ⬜ | Replace placeholder numbers |
| C3 | Real work history (roles, dates, companies) | ⬜ | Needed for timeline (S6) |
| C4 | Real project cards (titles, descriptions, metrics) | ⬜ | Replace 4 placeholder projects |
| C5 | Certifications list | ⬜ | Needed for S7 |
| C6 | Testimonials / quotes | ⬜ | Needed for S10 |
| C7 | Real email address | ⬜ | Replace placeholder in contact section |
| C8 | CV / resume PDF | ⬜ | Needed for I5 |
| C9 | Cal.com link or embed code | ⬜ | Needed for I1 |

---

## Completed changelog

| Date | What was done |
|------|---------------|
| 2026-05-21 | Initial site built: hero, about, expertise, projects, contact sections |
| 2026-05-21 | Dark modern design with CSS animations, grid bg, gradient glows |
| 2026-05-21 | Responsive layout, scroll reveal, active nav highlight |
