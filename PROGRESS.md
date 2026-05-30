# Portfolio Build — Progress Tracker

Live site: https://emilfreijd.se  
Repo: https://github.com/EmilFreijd/EmilFreijd  
Issues: https://github.com/EmilFreijd/EmilFreijd/issues

---

## Architecture decisions

| Decision | Choice | Rationale |
|----------|--------|-----------|
| Build system | Astro 6 (static) | Component-based, MDX for case studies, fast GitHub Pages builds |
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
```

---

## Changelog

| Date | What was done |
|------|---------------|
| 2026-05-21 | Initial site built: hero, about, expertise, projects, contact |
| 2026-05-21 | Migrated to Astro 5 — MDX, content collections, GitHub Actions CI/CD |
| 2026-05-21 | i18n (EN/SV) + dark/light theme + design system (CSS tokens) |
| 2026-05-21 | Formspree SDK integrated — form ID and Cal.com link set |
| 2026-05-22 | Real hero copy, expertise areas, stats — EN/SV |
| 2026-05-22 | Unified Stream collection replacing work collection |
| 2026-05-22 | Custom domain emilfreijd.se — CNAME, base path, site URL |
| 2026-05-22 | About page: real bio, traits, proof points, career timeline, certs, skills |
| 2026-05-22 | Bilingual MDX routing: lang frontmatter + -sv filename convention |
| 2026-05-22 | PIPELINE.md — bilingual publish gate documented |
| 2026-05-22 | Light mode bugs fixed: page-hero heading, ghost button hover, about-teaser tags |
| 2026-05-23 | Placeholder cases removed |
| 2026-05-23 | 10 stream entries published: design-thinking-lab, 3 essays, 2 projects, 4 updates (EN + SV) |
| 2026-05-23 | Sitemap + hreflang EN/SV/x-default + JSON-LD URL corrected |
| 2026-05-24 | SVG favicon — EF monogram, dark theme |
| 2026-05-24 | Backlog moved to GitHub Issues (#3–#15) |
| 2026-05-24 | Stale tracking files removed (BUGS.md, NOTES.md, Smartly Certificate.jpeg) |
| 2026-05-25 | Security-first policy added — CLAUDE.md + SECURITY.md |
| 2026-05-25 | Dependabot configured for npm and GitHub Actions |
| 2026-05-26 | Draft stream entries moved to GitHub Issues (#17–#24) — stream reduced to one published piece (`design-thinking-lab`) pending bilingual completion |
| 2026-05-28 | Bug fixes: LinkedIn URL, duplicate i18n key, removed fake case count, Python cert placeholder; tab title, featured flag, stats, procedural post covers |
| 2026-05-29 | GitHub Actions pinned to commit SHAs (security policy compliance) |
| 2026-05-29 | OG/social share image added (`public/og.png` + generator script) |
| 2026-05-29 | Bug fixes: optional metrics guard on home cards, years-in-IT baseline aligned to 2017, `rel="noreferrer"` on all external links |
| 2026-05-29 | Upgraded Astro 5 → 6 (resolves 2 npm audit advisories); migrated content collection to the glob loader (`src/content.config.ts`, `entry.slug` → `entry.id`) |
| 2026-05-29 | Cleanup: localized 404 via i18n keys, removed dead translation keys + unused vars |
| 2026-05-29 | Quick wins (#3 #5 #9 #10 #14 #15 #27 #30): Apple touch icon, active nav highlight, View Transitions (ClientRouter), spam honeypot, skip-to-content link, theme-color meta, SV contact meta description, aria-hidden on decorative icons |
| 2026-05-29 | #28 best-effort Swedish 404 (client-side language swap for /sv/ routes) |
| 2026-05-29 | #13 Lighthouse CI quality gate (≥0.9 perf/a11y/best-practices/SEO) on every deploy; action pinned to SHA |
| 2026-05-29 | #8 CV: generated privacy-safe `public/cv.pdf` (no address/phone/personal email) + download link; corrected timeline (Norumi 2018–2019, added Telia 2018–2019), added Professional Scrum Master I (2019) and a Languages section (SV native · EN C2 · ES A1) |
