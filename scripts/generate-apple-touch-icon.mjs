// Generates public/apple-touch-icon.png (180×180) — iOS home-screen icon.
// Brand-matched EF monogram on the dark surface colour. Run from repo root:
//   node scripts/generate-apple-touch-icon.mjs
import sharp from 'sharp';

const S = 180;
const svg = `<svg width="${S}" height="${S}" viewBox="0 0 ${S} ${S}" xmlns="http://www.w3.org/2000/svg">
  <defs>
    <linearGradient id="ef" x1="0" y1="0" x2="1" y2="1">
      <stop offset="20%" stop-color="#ffffff"/>
      <stop offset="100%" stop-color="#a78bfa"/>
    </linearGradient>
  </defs>
  <rect width="${S}" height="${S}" fill="#0f0f1a"/>
  <text x="50%" y="50%" dy="0.34em" text-anchor="middle"
    font-family="Inter, 'DejaVu Sans', system-ui, sans-serif"
    font-size="92" font-weight="800" letter-spacing="2" fill="url(#ef)">EF</text>
</svg>`;

await sharp(Buffer.from(svg)).png().toFile('public/apple-touch-icon.png');
console.log('public/apple-touch-icon.png written');
