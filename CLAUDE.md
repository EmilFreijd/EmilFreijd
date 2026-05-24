# Claude Code — Project Instructions

This is the personal portfolio site of Emil Freijd, built with Astro 5 and deployed to GitHub Pages at emilfreijd.se.

---

## Security policy

**Security is a gate, not a checklist.**

Before any solution or feature moves toward implementation — whether proposed by Emil or by Claude — it must satisfy the following:

- No new attack surfaces introduced (XSS, injection, open redirects, data exposure)
- External links use `rel="noopener noreferrer"`
- No secrets, tokens, or credentials in source code or commit history
- GitHub Actions steps pinned to commit SHAs, not floating version tags
- Dependencies checked with `npm audit` before adding; vulnerabilities assessed before accepting
- User-supplied content (form inputs, URL params) never rendered as raw HTML
- Third-party scripts evaluated for privacy impact before adding

If a proposed solution has a security trade-off, state it explicitly before implementing. If the trade-off is unacceptable, find a different approach.

---

## Architecture

- **Framework:** Astro 5 (static output, no server-side rendering)
- **Content:** MDX content collections in `src/content/stream/`
- **i18n:** EN default at `/`, SV at `/sv/` — all strings via `src/i18n/translations.ts`
- **Styles:** Single CSS file `src/styles/global.css` with CSS custom properties
- **Deployment:** GitHub Actions → GitHub Pages → custom domain emilfreijd.se

## Bilingual convention

- EN file: `slug.mdx` with `lang: en`
- SV file: `slug-sv.mdx` with `lang: sv`
- SV routes fall back to EN if no SV file exists
- Both files required before publishing (see `PIPELINE.md`)

## Content schema (required frontmatter)

```yaml
title, description, date, kind (case|project|essay|update),
lang (en|sv), timeless, featured, draft, sector, tags
```

Valid `kind` values: `case` · `project` · `essay` · `update` — nothing else.

## Tracking

- Open issues: https://github.com/EmilFreijd/EmilFreijd/issues
- Architecture decisions and changelog: `PROGRESS.md`
- Content pipeline spec: `PIPELINE.md`
