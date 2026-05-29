// Generates public/og.png (1200×630) — the social share / link-preview image.
// Mirrors the home hero: dark background, faint grid, purple glow, gradient name.
// Run from the repo root:  node scripts/generate-og.mjs
// Uses `sharp` (available via the Astro toolchain) to rasterise an inline SVG.
import sharp from 'sharp';

const W = 1200, H = 630;

// Grid lines matching .hero-grid (60px cells, faint white)
let grid = '';
for (let x = 0; x <= W; x += 60) grid += `<line x1="${x}" y1="0" x2="${x}" y2="${H}" stroke="#ffffff" stroke-width="1" opacity="0.025"/>`;
for (let y = 0; y <= H; y += 60) grid += `<line x1="0" y1="${y}" x2="${W}" y2="${y}" stroke="#ffffff" stroke-width="1" opacity="0.025"/>`;

const svg = `<svg width="${W}" height="${H}" viewBox="0 0 ${W} ${H}" xmlns="http://www.w3.org/2000/svg">
  <defs>
    <radialGradient id="glow1" cx="0" cy="0" r="1">
      <stop offset="0%" stop-color="#7c6af7" stop-opacity="0.45"/>
      <stop offset="60%" stop-color="#7c6af7" stop-opacity="0"/>
    </radialGradient>
    <radialGradient id="glow2" cx="1" cy="1" r="1">
      <stop offset="0%" stop-color="#a78bfa" stop-opacity="0.28"/>
      <stop offset="60%" stop-color="#a78bfa" stop-opacity="0"/>
    </radialGradient>
    <linearGradient id="name" x1="0" y1="0" x2="1" y2="1">
      <stop offset="30%" stop-color="#ffffff"/>
      <stop offset="100%" stop-color="#a78bfa"/>
    </linearGradient>
    <radialGradient id="gridmask" cx="0.5" cy="0.5" r="0.6">
      <stop offset="30%" stop-color="#000" stop-opacity="1"/>
      <stop offset="100%" stop-color="#000" stop-opacity="0"/>
    </radialGradient>
    <mask id="gm"><rect width="${W}" height="${H}" fill="url(#gridmask)"/></mask>
  </defs>

  <rect width="${W}" height="${H}" fill="#080810"/>
  <g mask="url(#gm)">${grid}</g>
  <ellipse cx="150" cy="60" rx="560" ry="520" fill="url(#glow1)"/>
  <ellipse cx="1080" cy="600" rx="480" ry="440" fill="url(#glow2)"/>

  <g font-family="Inter, 'DejaVu Sans', sans-serif">
    <rect x="90" y="150" width="430" height="50" rx="25" fill="#7c6af7" fill-opacity="0.12" stroke="#7c6af7" stroke-opacity="0.30"/>
    <circle cx="120" cy="175" r="5" fill="#a78bfa"/>
    <text x="140" y="182" font-size="22" font-weight="500" fill="#a78bfa" letter-spacing="0.5">Open for the right conversation</text>

    <text x="86" y="350" font-size="128" font-weight="800" fill="url(#name)" letter-spacing="-3">Emil Freijd</text>
    <text x="90" y="425" font-size="40" font-weight="500" fill="#9ca3af" letter-spacing="0.5">IT Leader · Platforms, Teams &amp; AI</text>
    <text x="90" y="560" font-size="26" font-weight="600" fill="#6b7280" letter-spacing="1">emilfreijd.se</text>
  </g>
</svg>`;

await sharp(Buffer.from(svg)).png().toFile('public/og.png');
console.log('public/og.png written');
