# Content Pipeline

This repository is the production site. Content is published here — either manually or via an automated pipeline from a private development workspace (Daedalus).

---

## How it works

Emil writes in Swedish. The pipeline translates to English. Both versions land in `src/content/stream/`.

```
Emil writes in Swedish
        ↓
  Daedalus (private workspace)
        ↓  GitHub Action: translate via Claude API
        ↓  push both files to EmilFreijd/EmilFreijd
        ↓
  src/content/stream/
  ├── slug.mdx          ← English (generated)
  └── slug-sv.mdx       ← Swedish (source of truth)
        ↓
  emilfreijd.se/stream/slug/       ← serves EN
  emilfreijd.se/sv/stream/slug/    ← serves SV (falls back to EN if missing)
```

---

## File naming convention

| File | Language | Rule |
|------|----------|------|
| `court-system-modernisation.mdx`    | English  | Default — no suffix |
| `court-system-modernisation-sv.mdx` | Swedish  | `-sv` suffix |

Both files live in `src/content/stream/`. The routing uses the `lang` frontmatter field to distinguish them.

---

## Frontmatter schema

```mdx
---
title:       "Title of the piece"
description: "One-sentence summary — shows in cards and meta."
date:        2025-01-15
kind:        case          # case | project | essay | update
lang:        en            # en | sv  (default: en)
timeless:    false         # true = appears in Timeless filter
featured:    false         # true = shown on home page (max 3)
draft:       false         # true = not published
sector:      public-sector # public-sector | defence | enterprise | personal | other
tags:        ["Program Management", "Digital Transformation"]
metrics:                   # optional — shows sidebar on detail page
  - { value: "47", label: "Courts migrated" }
  - { value: "18 months", label: "Delivery timeline" }
---
```

**Kind values:**
- `case` — Case study, detailed program write-up
- `project` — Shorter project description
- `essay` — Long-form thinking, principles
- `update` — Short signal, quick note

---

## Bilingual publishing

Every entry has an English file. The Swedish file is optional — if it exists, `/sv/stream/slug/` serves it; if not, the English version is shown instead.

**To publish in both languages:**
1. Create `slug-sv.mdx` with `lang: sv` in frontmatter (Emil writes this)
2. Create `slug.mdx` with `lang: en` (pipeline translates from SV, or Emil writes it)

**To publish English only** (e.g., initial draft):
1. Create only `slug.mdx` with `lang: en`
2. Add `slug-sv.mdx` later when ready

---

## Adding content manually (hotfix / direct)

```bash
# In src/content/stream/
# 1. Create slug.mdx (English)
# 2. Optionally create slug-sv.mdx (Swedish)
# 3. Both must pass schema validation (see above)
git add src/content/stream/
git commit -m "Publish: [title]"
git push origin main
# → Live at emilfreijd.se within ~2 minutes via GitHub Actions
```

---

## Adding content via Daedalus pipeline

1. Write content in Swedish in Daedalus (`workspace/drafts/`)
2. Move to `workspace/staging/` when ready
3. Create GitHub Issue with label `ready-to-publish`
4. GitHub Action automatically:
   - Translates Swedish → English via Claude API
   - Creates `slug.mdx` (EN) and `slug-sv.mdx` (SV)
   - Commits and pushes to this repo
   - Archives source to `published/YYYY-MM/` in Daedalus
5. Site deploys within ~2 minutes

---

## What does NOT work

- `kind: article` — not in schema. Use `essay` instead.
- A `type` field — schema has no `type` key.
- `.sv.mdx` suffix — Astro strips dots from slugs. Use `-sv.mdx` instead.
- Same slug for EN and SV — they must have different filenames (`slug.mdx` vs `slug-sv.mdx`).

---

## Live site

**emilfreijd.se** — deployed via GitHub Actions on every push to `main`.
