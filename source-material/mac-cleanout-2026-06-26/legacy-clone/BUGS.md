# Bug Tracker

Status key: 🔴 High · 🟡 Medium · 🟢 Low · ✅ Fixed

---

## Open bugs

### BUG-01 🔴 Sub-page headings invisible in light mode

**File:** `src/styles/global.css` — `.page-hero h1`

`.page-hero h1` hardcodes a white-to-purple gradient instead of using the `--gradient-text` token:

```css
/* current — broken in light mode */
.page-hero h1 {
  background: linear-gradient(135deg, #fff 30%, var(--accent-2) 100%);
  -webkit-background-clip: text;
  -webkit-text-fill-color: transparent;
}
```

In light mode the page background is `#ffffff`. Starting the gradient from `#fff` means the left 30% of the heading text is invisible. Affects the About, Stream, and Contact page headings.

The home hero (`hero-name`) and stream detail hero (`case-hero h1`) already use `var(--gradient-text)` correctly.

**Fix:** Replace the hardcoded gradient with `background: var(--gradient-text);`

---

### BUG-04 🟡 Ghost button hover effect invisible in light mode

**File:** `src/styles/global.css` — `.btn-ghost:hover`

```css
.btn-ghost:hover {
  border-color: rgba(255,255,255,0.2);
  background: rgba(255,255,255,0.04);
}
```

Both values are white-based opacity, only readable against a dark background. In light mode the hover state is imperceptible.

**Fix:**
```css
[data-theme="light"] .btn-ghost:hover {
  border-color: rgba(0,0,0,0.15);
  background: rgba(0,0,0,0.04);
}
```

---

### BUG-05 🟡 About-teaser skill tags hardcoded in English

**File:** `src/components/pages/Home.astro`

Skill tags in the about-teaser section are hardcoded strings rather than going through `t()`. Swedish visitors at `/sv/` see English tags.

**Fix:** Move the tag strings into `translations.ts` and render via `t()`, or store them as a translated array under a single key.

---

## Resolved bugs

| # | Description | Fixed in |
|---|-------------|----------|
| BUG-02 | Primary CTA buttons linked to wrong domain (`emilfreijd.se` instead of LinkedIn) — fixed with correct LinkedIn URLs in all components | Stream migration commit |
| BUG-03 | OG image URL ignored `/EmilFreijd/` base path — resolved when site moved to custom domain; `new URL('/og.png', Astro.site)` now produces the correct URL (`https://emilfreijd.se/og.png`) | Custom domain commit |
| BUG-06 | `hero.scroll` "Scroll" text hardcoded in English — fixed with `t('hero.scroll')` + SV translation `'Scrolla'` | Full page tree commit |
| BUG-07 | `sector.replace()` only replaced first hyphen — fixed with `replaceAll('-', ' ')` in Home.astro, Stream.astro, and StreamDetail.astro | Stream migration commit |
