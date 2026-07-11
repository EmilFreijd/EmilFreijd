# Emil Freijd

Source for [emilfreijd.se](https://emilfreijd.se), a bilingual personal site built with Astro 7 and deployed to GitHub Pages.

## Local development

Requirements: Node.js 22 and npm.

```bash
nvm use
npm ci
npm run dev
```

Quality checks:

```bash
npm test
npm run check
npm run build
```

## Content

Published content lives in `src/content/stream/` as MDX. Supported types are `case`, `project`, `essay`, and `update`. English is required; Swedish is optional and falls back to English when absent.

Content can be drafted from GitHub mobile:

1. Open a new issue and choose a content template.
2. Edit the issue until the core content is ready.
3. Confirm that no restricted information is included.
4. Add the `publish-content` label.
5. The publishing workflow validates and normalizes the content, creates the MDX files, and opens a pull request.
6. Review the rendered result and merge the pull request. The issue closes automatically after merge.

See [PIPELINE.md](PIPELINE.md) for the schema and publishing details.

## Deployment and security

Pull requests run tests, Astro checks, and a production build. Merges to `main` additionally run Lighthouse before GitHub Pages deployment. Dependencies and GitHub Actions are monitored by Dependabot, and Actions are pinned to commit SHAs.

Report vulnerabilities privately through [the contact page](https://emilfreijd.se/contact/), not through a public issue. See [SECURITY.md](SECURITY.md).
