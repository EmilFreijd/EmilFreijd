# Bug Tracker

Status key: 🔴 High · 🟡 Medium · 🟢 Low · ✅ Fixed

---

## Open bugs

*No open bugs.*

---

## Resolved bugs

| # | Description | Fixed in |
|---|-------------|----------|
| BUG-02 | Primary CTA buttons linked to wrong domain (`emilfreijd.se` instead of LinkedIn) — fixed with correct LinkedIn URLs in all components | Stream migration commit |
| BUG-03 | OG image URL ignored `/EmilFreijd/` base path — resolved when site moved to custom domain; `new URL('/og.png', Astro.site)` now produces the correct URL (`https://emilfreijd.se/og.png`) | Custom domain commit |
| BUG-06 | `hero.scroll` "Scroll" text hardcoded in English — fixed with `t('hero.scroll')` + SV translation `'Scrolla'` | Full page tree commit |
| BUG-07 | `sector.replace()` only replaced first hyphen — fixed with `replaceAll('-', ' ')` in Home.astro, Stream.astro, and StreamDetail.astro | Stream migration commit |
| BUG-01 | Sub-page headings (`About`, `Stream`, `Contact`) invisible in light mode — `.page-hero h1` used hardcoded `#fff` gradient; fixed with `var(--gradient-text)` | Bug fixes commit 2026-05-22 |
| BUG-04 | Ghost button hover effect invisible in light mode — white-opacity values only work on dark backgrounds; fixed with `[data-theme="light"]` override in global.css | Bug fixes commit 2026-05-22 |
| BUG-05 | About-teaser skill tags hardcoded in English — moved to `translations.ts` as `about.teaser.tag1–6` with Swedish equivalents; Home.astro now uses `t()` | Bug fixes commit 2026-05-22 |
