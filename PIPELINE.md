# Content Pipeline

Write and review cases, projects, essays and updates in private Daedalus. The public website repository holds cleared content, code and implementation issues.

## Mobile publishing flow

1. Finish and approve both language versions in Daedalus, including title, description, body and any images or metrics.
2. In GitHub Mobile, open the relevant publishing issue form and paste the approved EN/SV copy. The issue is public from submission. Confirm both versions are final and cleared for public release.
3. The repository owner adds `publish-content`. GitHub Actions validates the handoff, generates the bilingual MDX, runs tests and builds, and opens or updates a pull request.
4. Check both rendered versions and merge when CI (including Lighthouse) passes. Verify the deployment and both RSS feeds.

If the text needs editorial changes, resolve them in Daedalus. When the corrected versions are approved, update the public handoff, then remove and re-add `publish-content` to regenerate its pull request.

## Working sources and public history

Keep raw conversations, working screenshots, certificates, original CV files and unpublished source notes in private storage. Bring verified project decisions, approved copy and cleared assets into this repository as separate files. Review those files before uploading a branch or opening an issue.

A later deletion from the current tree leaves the earlier version in Git history. Review the branch diff and any new commits before sharing. Test the rendered EN and SV routes where the change affects links, navigation or page metadata.

## Editorial purpose

Start with the [editorial interview guides](docs/editorial/README.md) to capture an experience, project, essay, or short update. The [source-material review](docs/source-material-review.md) maps preserved conversations to current decisions and remaining work.

Use the Stream for experiences, ideas and projects that give a reader something useful to take away. A short update can document an experiment or a lesson while a longer piece is still developing. Work experience and personal projects both fit.

Keep the website article at a stable address and link to it when sharing a shorter introduction on LinkedIn. Choose a publishing rhythm that leaves time for the work and experiences being described. Define any commercial offer in Norumi before linking it from the personal site.

## Automatic normalization

The generator in `scripts/publish-content-issue.mjs`:

- validates the content type from the protected issue-template label;
- validates and normalizes the slug, date, sector, tags, metrics, and booleans;
- escapes frontmatter values;
- creates `slug.mdx` and `slug-sv.mdx` together, recording `sourceIssue` on each;
- rejects HTML, JSX, imports, exports, and MDX expressions from issue-authored body text;
- requires complete English and Swedish translations and invalidates incomplete metric translations;
- refuses slug collisions with manually maintained content or content from another issue;
- never pushes directly to `main`.

The workflow accepts issues authored and labeled by the repository owner. Check and build reject entries marked as drafts.

## Editing and stable URLs

Each generated pair belongs to its source issue through `sourceIssue`. Re-running an unmerged issue rebuilds its branch from `main` and replaces that issue's generated files. Carry editorial revisions forward from Daedalus before regenerating. Manual changes made only to a generated branch will be replaced.

A different issue cannot overwrite that pair. Existing manually authored entries must be edited through a normal pull request. The `-sv` suffix is reserved for translations. Once a source issue's content has reached `main`, keep its slug stable; rename both language files and review redirects in an explicit pull request if a URL change is necessary.

## Metrics and images

`Metrics` contains English `value | label` rows. When used, fill `Swedish metrics` with the same number of rows in the same order, translating both values and labels where needed (for example `3 teams | Delivery scope` → `3 team | Leveransomfattning`). Metrics are optional; do not invent numbers to fill the fields.

Add cleared, optimized images to `public/images/` through a reviewed pull request first, then use Markdown such as `![A useful description](/images/workshop-flow.svg)` in each language. Issue attachments are not automatically copied into the repository. Remote image URLs are rejected because the site's CSP only permits local image assets. Check/build verifies that inline Markdown images exist locally. Keep raw screenshots and original working material private. See the [image workflow](docs/editorial/README.md#bilder-och-illustrationer).

## Frontmatter schema

```yaml
---
title: "Title"
description: "One-sentence summary used in cards and metadata."
date: 2026-07-10
kind: case # case | project | essay | update
lang: en # en | sv
sourceIssue: 123 # optional; generated ownership, do not reuse for another article
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

## Direct editing

For corrections, edit the MDX files directly on a branch and open a pull request. Do not push content directly to `main`; branch protection and CI are part of the publication gate.
