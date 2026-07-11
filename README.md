# Emil Freijd

**IT Object Leader at Saab** working across governance, architecture, and lifecycle delivery in high-assurance environments.

I work where technical environments, ownership, and delivery have to function as one. My focus is turning complexity into clear direction, durable capability, and dependable progress.

[Website](https://emilfreijd.se) · [Writing and case studies](https://emilfreijd.se/stream/) · [LinkedIn](https://www.linkedin.com/in/emilfreijd)

## What I work on

- **IT governance and architecture** — creating explicit ownership, sound technical direction, and systems that remain operable over time.
- **Technical teams and delivery** — building the structures and conditions that let teams take responsibility and deliver autonomously.
- **Technology adoption and change** — connecting platforms, processes, and people so that change survives beyond go-live.
- **Applied AI and automation** — moving useful ideas from concept to working systems in cloud and on-premises environments.

## Current focus

At Saab, I lead the governance and development of specialised IT environments in a defence and aerospace context. Outside that role, I write about systems thinking, technical leadership, delivery, and the practical work of making organisational change hold.

### Recent writing

- [Problem-First: Coaching a Design Thinking Lab at Domstolsverket](https://emilfreijd.se/stream/design-thinking-lab/)

## This repository

This profile repository also contains the source for [emilfreijd.se](https://emilfreijd.se), a bilingual site built with Astro and deployed through GitHub Pages.

<details>
<summary><strong>Local development</strong></summary>

Requires Node.js 22 and npm.

```bash
nvm use
npm ci
npm run dev
```

Run the complete local quality suite with:

```bash
npm test
npm run check
npm run build
```

</details>

<details>
<summary><strong>Publishing content from GitHub</strong></summary>

Cases, projects, essays, and updates can be drafted from GitHub mobile using the repository issue forms. Adding the `publish-content` label validates and normalizes the content, creates bilingual MDX where supplied, and opens a pull request for review.

See [PIPELINE.md](PIPELINE.md) for the content schema, editorial conventions, and publication workflow.

</details>

<details>
<summary><strong>Deployment and security</strong></summary>

Pull requests run tests, Astro checks, and a production build. Merges to `main` additionally run Lighthouse before GitHub Pages deployment. Dependencies and GitHub Actions are monitored by Dependabot, and Actions are pinned to commit SHAs.

Report vulnerabilities privately through [the contact page](https://emilfreijd.se/contact/), not through a public issue. See [SECURITY.md](SECURITY.md).

</details>
