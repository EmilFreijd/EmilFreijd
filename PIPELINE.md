# Content Pipeline

This repository is the production site. Content flows in from a private development workspace (Daedalus) via GitHub Actions — but only when both language versions are complete.

---

## Principle

Content is only published when both an English and a Swedish version exist in Daedalus. Emil writes both. No auto-translation. No partial publishes.

---

## Flow

```
Daedalus (private workspace)
├── workspace/drafts/
│   ├── slug.en.md       ← Emil writes English version
│   └── slug.sv.md       ← Emil writes Swedish version
│
│   When both are complete:
│   → Mark ready (create issue with label ready-to-publish)
│
├── GitHub Actions
│   ├── publish-en.yml   → pushes slug.mdx        (lang: en)
│   └── publish-sv.yml   → pushes slug-sv.mdx     (lang: sv)
│
└── Gate: both files must exist before either action runs

EmilFreijd/src/content/stream/
├── slug.mdx             ← English, served at /stream/slug/
└── slug-sv.mdx          ← Swedish, served at /sv/stream/slug/
```

---

## File naming convention

| Daedalus source    | Published to EmilFreijd     | Language |
|--------------------|-----------------------------|----------|
| `slug.en.md`       | `src/content/stream/slug.mdx`    | English  |
| `slug.sv.md`       | `src/content/stream/slug-sv.mdx` | Swedish  |

---

## Frontmatter schema

Every `.mdx` file must have valid frontmatter:

```yaml
---
title:       "Title of the piece"
description: "One-sentence summary — shows in cards and meta."
date:        2025-01-15
kind:        case          # case | project | essay | update
lang:        en            # en | sv
timeless:    false         # true = appears in Timeless filter
featured:    false         # true = shown on home page (max 3)
draft:       false         # true = not published
sector:      public-sector # public-sector | defence | enterprise | personal | other
tags:        ["Program Management", "Digital Transformation"]
metrics:                   # optional — renders sidebar on detail page
  - { value: "47", label: "Courts migrated" }
  - { value: "18 months", label: "Delivery timeline" }
---
```

**Valid `kind` values:** `case` · `project` · `essay` · `update`  
**Invalid:** `article`, `story` (not in schema — will break the build)

---

## Routing behaviour

The site handles missing SV versions gracefully:

| Situation | `/stream/slug/` | `/sv/stream/slug/` |
|-----------|-----------------|---------------------|
| Both files exist | EN content | SV content |
| Only EN exists | EN content | EN content (fallback) |
| Only SV exists | — not routed — | — not routed — |

EN is required. SV is recommended but optional. The EN file is what creates the route.

---

## Publishing workflow (Daedalus)

1. Write `slug.en.md` and `slug.sv.md` in `workspace/drafts/`
2. When both are done, move both to `workspace/staging/`
3. Create a GitHub Issue in Daedalus:
   ```
   Title:  Publish: [piece title]
   Label:  ready-to-publish
   Files:  workspace/staging/slug.en.md
           workspace/staging/slug.sv.md
   ```
4. Gate check: Actions verify both files exist before running
5. `publish-en.yml` — converts `slug.en.md` → `slug.mdx`, pushes to EmilFreijd
6. `publish-sv.yml` — converts `slug.sv.md` → `slug-sv.mdx`, pushes to EmilFreijd
7. Both files archived to `published/YYYY-MM/` in Daedalus
8. Site live within ~2 minutes

---

## Direct publish (hotfix / manual)

Skip Daedalus entirely for corrections or quick additions:

```bash
# Edit or create files directly in src/content/stream/
git add src/content/stream/slug.mdx src/content/stream/slug-sv.mdx
git commit -m "Publish: [title]"
git push origin main
# → Live at emilfreijd.se within ~2 minutes
```

---

## What does NOT work

| Wrong | Correct |
|-------|---------|
| `kind: article` | `kind: essay` |
| `kind: story` | `kind: essay` |
| A `type` field | No `type` field in schema |
| `.sv.mdx` suffix | `-sv.mdx` suffix (dots break Astro slug generation) |

---

## Live site

**emilfreijd.se** — deployed via GitHub Actions on every push to `main`.
