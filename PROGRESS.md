# Portfolio Build — Progress Tracker

Live site: https://emilfreijd.se  
Repo: https://github.com/EmilFreijd/EmilFreijd  
Issues: https://github.com/EmilFreijd/EmilFreijd/issues

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
