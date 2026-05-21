# Bug Tracker

Status key: 🔴 High · 🟡 Medium · 🟢 Low · ✅ Fixed

---

## Open bugs

### BUG-01 🔴 Sub-page headings invisible in light mode

**File:** `src/styles/global.css:189`

`.page-hero h1` hardcodes a white-to-purple gradient instead of using the `--gradient-text` token:

```css
/* current — broken in light mode */
.page-hero h1 {
  background: linear-gradient(135deg, #fff 30%, var(--accent-2) 100%);
  -webkit-background-clip: text;
  -webkit-text-fill-color: transparent;
}
```

In light mode the page background is `#ffffff` (white). Starting the gradient from `#fff` means the left 30% of the heading text is invisible. Affects the About, Work, and Contact page headings.

The home hero (`hero-name`) and case study hero (`case-hero h1`) already use `var(--gradient-text)` correctly — this is the only place that doesn't.

**Fix:** Replace the hardcoded gradient with `background: var(--gradient-text);`

---

### BUG-02 🔴 Primary CTA buttons link to wrong domain

**Files:**
- `src/components/pages/Home.astro:33` — hero CTA
- `src/components/pages/Home.astro:183` — CTA strip
- `src/components/pages/WorkDetail.astro:60` — case study CTA
- `src/components/pages/Contact.astro:83` — contact sidebar LinkedIn link

All four link to `https://www.emilfreijd.se`. The button labels and architecture decision both say LinkedIn is the primary CTA. The correct URL (also in the JSON-LD schema) is `https://www.linkedin.com/in/emilfreijd`.

**Fix:** Replace `https://www.emilfreijd.se` with `https://www.linkedin.com/in/emilfreijd` across all four locations.

---

### BUG-03 🟡 OG image URL ignores base path

**File:** `src/layouts/BaseLayout.astro:20`

```ts
const ogImage = new URL('/og.png', Astro.site);
```

`Astro.site` is `https://emilfreijd.github.io` (origin only). `new URL('/og.png', ...)` produces `https://emilfreijd.github.io/og.png`, which ignores the `/EmilFreijd/` base path. The actual asset lives at `https://emilfreijd.github.io/EmilFreijd/og.png`.

Social share previews will show a broken image once the OG asset is added (tracked as SE6).

**Fix:**
```ts
const ogImage = new URL(`${import.meta.env.BASE_URL}og.png`, Astro.site);
```

---

### BUG-04 🟡 Ghost button hover effect invisible in light mode

**File:** `src/styles/global.css:143-146`

```css
.btn-ghost:hover {
  border-color: rgba(255,255,255,0.2);
  background: rgba(255,255,255,0.04);
}
```

Both values are white-based opacity, which only reads against a dark background. In light mode the button is already on a near-white surface, so neither the border nor the background change is perceivable — the hover state looks broken.

**Fix:** Add a light-mode override that uses dark-based opacity:
```css
[data-theme="light"] .btn-ghost:hover {
  border-color: rgba(0,0,0,0.15);
  background: rgba(0,0,0,0.04);
}
```

---

### BUG-05 🟡 About-teaser tags hardcoded in English

**File:** `src/components/pages/Home.astro:54-59`

Six skill tags are hardcoded strings in the component instead of going through `t()`. Swedish visitors at `/sv/` see English tags.

```astro
<span class="tag">Program Management</span>
<span class="tag">IT Leadership</span>
<!-- ... four more -->
```

**Fix:** Move the tag strings into `translations.ts` and render via `t()`, or (simpler) store them as a translated array under a single key.

---

### BUG-06 🟡 "Scroll" indicator hardcoded in English

**File:** `src/components/pages/Home.astro:40`

```astro
<div class="hero-scroll">
  <span>Scroll</span>
```

The word "Scroll" is not passed through `t()`. Swedish homepage shows English text.

**Fix:** Add `hero.scroll: 'Scroll'` / `'Scrolla'` to `translations.ts` and replace with `{t('hero.scroll')}`.

---

### BUG-07 🟢 `sector.replace()` only replaces first hyphen

**Files:**
- `src/components/pages/Work.astro:33`
- `src/components/pages/Home.astro:147`
- `src/components/pages/WorkDetail.astro:22`

`String.prototype.replace(string, string)` replaces only the first match. A sector value with two hyphens (e.g. `defence-tech-sector`) would render as `defence tech-sector`. The current enum values (`public-sector`, `defence-tech`, `enterprise-it`) are safe, but the bug is latent.

**Fix:** Use `replaceAll('-', ' ')` or `/- /g` regex in all three locations.

---

## Resolved bugs

| # | Description | Fixed in |
|---|-------------|----------|
| — | — | — |
