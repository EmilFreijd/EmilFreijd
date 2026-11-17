# Content Pipeline

GitHub Issues are the mobile drafting interface for the site's four stream content types: case studies, projects, essays, and updates.

## Mobile publishing flow

1. In GitHub mobile, create an issue using the relevant content template.
2. Save and edit the issue as often as needed. The issue remains visible on GitHub with the `content-draft` label. The website receives the content after the generated pull request is merged.
3. Complete the English and Swedish title, description, and body. Both language versions are required before publication under `AGENTS.md`. The generator can create an English-only draft for compatibility, but that draft needs its Swedish counterpart before merge.
4. Verify the security-review checkbox. Public issues must not contain classified, confidential, personal, credential, or employer-restricted information.
5. Add the `publish-content` label when the draft is ready.
6. `.github/workflows/publish-content.yml` validates the issue, generates MDX, runs tests/check/build, and opens or updates `content/issue-N` as a pull request.
7. Review both language versions and merge the pull request. Merging deploys the site and closes the source issue.

To revise a failed or existing draft, edit the issue, remove `publish-content`, and add it again. The same publishing branch and pull request are updated.

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
