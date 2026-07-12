# Content Pipeline

GitHub Issues are the mobile drafting interface for the site's four stream content types: case studies, projects, essays, and updates.

## Mobile publishing flow

1. In GitHub mobile, create an issue using the relevant content template.
2. Save and edit the issue as often as needed. It remains labeled `content-draft` and is not published.
3. Complete the English title, description, and body. Swedish is optional, but all three Swedish fields must be completed together.
4. Verify the security-review checkbox. Public issues must not contain classified, confidential, personal, credential, or employer-restricted information.
5. Add the `publish-content` label when the draft is ready.
6. `.github/workflows/publish-content.yml` validates the issue, generates MDX, runs tests/check/build, and opens or updates `content/issue-N` as a pull request.
7. Review and merge the pull request. Merging deploys the site and closes the source issue.

To revise a failed or existing draft, edit the issue, remove `publish-content`, and add it again. The same publishing branch and pull request are updated.

## Automatic normalization

The generator in `scripts/publish-content-issue.mjs`:

- validates the content type from the protected issue-template label;
- validates and normalizes the slug, date, sector, tags, metrics, and booleans;
- escapes frontmatter values;
- creates `slug.mdx` for English and `slug-sv.mdx` when Swedish is complete;
- rejects HTML, JSX, imports, exports, and MDX expressions from issue-authored body text;
- refuses partial Swedish translations and invalid schema values;
- never pushes directly to `main`.

The workflow only accepts publish requests from issues authored by the repository owner.

## Frontmatter schema

```yaml
---
title: "Title"
description: "One-sentence summary used in cards and metadata."
date: 2026-07-10
kind: case # case | project | essay | update
lang: en # en | sv
timeless: false
featured: false
draft: false
sector: defence # public-sector | defence | enterprise | personal | other
tags: ["Governance", "Architecture"]
metrics:
  - { value: "4 teams", label: "Delivery scope" }
---
```

English creates the canonical route. If a Swedish file is absent, the Swedish route displays the English entry with a visible fallback notice and English canonical URL.

## Direct editing

For corrections, edit the MDX files directly on a branch and open a pull request. Do not push content directly to `main`; branch protection and CI are part of the publication gate.
