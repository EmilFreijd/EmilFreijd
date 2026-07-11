# Security Policy

## Principle

This site is developed with security as a gate, not an afterthought. No feature or fix moves toward implementation — regardless of who proposes it — unless it is demonstrably safe.

## Requirements for all changes

- No new XSS vectors, injection points, or open redirects
- No secrets, tokens, or credentials in source code or commit history
- External links include `rel="noopener noreferrer"`
- GitHub Actions steps pinned to commit SHAs
- New dependencies assessed with `npm audit` before merging
- Third-party scripts evaluated for privacy impact before adding
- User input never rendered as raw HTML
- Issue-authored content is schema validated and rejected if it contains executable MDX, JSX, or HTML

## Reporting a vulnerability

If you find a security issue in this site, please report it privately:

- Email: contact via [emilfreijd.se/contact](https://emilfreijd.se/contact/)
- Do not open a public GitHub issue for security vulnerabilities

## Scope

This is a static personal portfolio site with no backend, no authentication, and no user data storage. The primary risk surface is the contact form (handled by Formspree) and the build/deploy pipeline (GitHub Actions).

## Known limitations

- GitHub Pages does not support custom HTTP security headers. The site uses a CSP and referrer `<meta>` policy, but header-only protections such as HSTS, X-Content-Type-Options, and CSP `frame-ancestors` require a security-header-capable proxy.
- Inter is self-hosted via `@fontsource/inter`; no third-party font CDN requests are made by the site
- Contact messages are processed by Formspree; the form warns visitors not to submit restricted or highly sensitive information
