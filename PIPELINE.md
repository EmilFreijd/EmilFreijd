# Content handoff

Editorial issues, drafting, approval and publication follow-up live in private Daedalus. Use a pull request in this repository to deliver approved English and Swedish MDX and any cleared assets. Site issues track site changes and operations.

Place the approved files in `src/content/stream/` as `slug.mdx` and `slug-sv.mdx`. Use an unused slug for new entries and keep existing URLs stable. Include translated value/label pairs for any metrics. Put approved images in `public/images/` and reference them with local paths.

Run `scripts/verify.sh` and check both rendered routes before opening the pull request. Merge after review and passing CI, including Lighthouse. GitHub Pages deploys from `main`. Verify both routes and RSS, then record the release in Daedalus.

Branches and PRs in this repository are public. Review all files, assets and commit diffs for information that needs to stay private before pushing.

## Frontmatter schema

```yaml
---
title: "Title"
description: "One-sentence summary used in cards and metadata."
date: 2026-07-10
kind: case # case | project | essay | tool | update
lang: en # en | sv
sourceIssue: 123 # optional; private publication issue number, stable for the same article
timeless: false
featured: false
draft: false
sector: defence # public-sector | defence | enterprise | personal | other
tags: ["Governance", "Architecture"]
metrics:
  - { value: "4 teams", label: "Delivery scope" }
---
```

English creates the canonical route. The renderer retains an English fallback for compatibility, but check/build prevents new incomplete published language pairs from merging. Both translations must agree on date, kind, timeless/featured flags, and generated source issue.
