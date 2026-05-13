// Generate public/og-cover.jpg (1200x630) for social previews.
//
// Composition:
//   - Base: Claredon exterior stair photo, resized cover, slightly darkened
//   - Overlay: cinematic left-to-right tint gradient + monogram (top-left) +
//     "Aluminum Engineering" headline + tagline + footer line
//
// Run: node scripts/build-og-cover.mjs

import sharp from 'sharp';
import { readFile, writeFile } from 'node:fs/promises';
import path from 'node:path';

const ROOT = path.resolve(process.cwd());
const BASE_PHOTO = path.join(ROOT, 'public', 'projects', 'claredon-exterior-stair', 'site-claredon1.jpg');
const MONOGRAM_SVG = path.join(ROOT, 'public', 'galvec-monogram.svg');
const OUT = path.join(ROOT, 'public', 'og-cover.jpg');

const W = 1200;
const H = 630;

async function main() {
  // 1) Prep base photo to 1200x630 with slight darken
  const base = await sharp(BASE_PHOTO)
    .resize(W, H, { fit: 'cover', position: 'center' })
    .modulate({ brightness: 0.78, saturation: 0.92 })
    .toBuffer();

  // 2) Extract the inner content of the monogram SVG so we can re-color it
  // and place it scaled inside our overlay
  const monogramRaw = await readFile(MONOGRAM_SVG, 'utf-8');
  // Pull out everything between <svg ...> and </svg>
  const inner = monogramRaw
    .replace(/^[\s\S]*?<svg[^>]*>/, '')
    .replace(/<\/svg>\s*$/, '')
    // Recolor: every fill="#000000" → fill="#F5F5F0"
    .replace(/fill="#000000"/g, 'fill="#F5F5F0"');

  // 3) Compose overlay SVG
  // Monogram viewBox is 1500 x 1300. We want it ~110px tall in the cover.
  // 110 / 1300 ≈ 0.0846 scale.
  const monogramScale = 0.085;
  const monogramX = 72;
  const monogramY = 64;

  const overlaySvg = `<?xml version="1.0" encoding="UTF-8"?>
<svg xmlns="http://www.w3.org/2000/svg" width="${W}" height="${H}" viewBox="0 0 ${W} ${H}">
  <defs>
    <linearGradient id="tint" x1="0" y1="0" x2="1" y2="0">
      <stop offset="0%" stop-color="#1A1A1A" stop-opacity="0.92"/>
      <stop offset="45%" stop-color="#1A1A1A" stop-opacity="0.72"/>
      <stop offset="75%" stop-color="#1A1A1A" stop-opacity="0.32"/>
      <stop offset="100%" stop-color="#1A1A1A" stop-opacity="0.10"/>
    </linearGradient>
    <linearGradient id="bottomFade" x1="0" y1="0" x2="0" y2="1">
      <stop offset="0%" stop-color="#1A1A1A" stop-opacity="0"/>
      <stop offset="100%" stop-color="#1A1A1A" stop-opacity="0.55"/>
    </linearGradient>
  </defs>

  <rect width="${W}" height="${H}" fill="url(#tint)"/>
  <rect width="${W}" height="${H}" fill="url(#bottomFade)"/>

  <!-- Monogram, recolored to paper -->
  <g transform="translate(${monogramX}, ${monogramY}) scale(${monogramScale})">
    ${inner}
  </g>

  <!-- Eyebrow -->
  <text x="72" y="270"
        fill="#B0BEC5"
        font-family="'Courier New', monospace"
        font-size="16"
        letter-spacing="4"
        font-weight="500">GALVEC STUDIO · ALUMINUM ENGINEERING</text>

  <!-- Headline (two lines) -->
  <text x="72" y="345"
        fill="#F5F5F0"
        font-family="Georgia, 'Times New Roman', serif"
        font-size="68"
        font-weight="400">Fabrication-ready</text>
  <text x="72" y="420"
        fill="#F5F5F0"
        font-family="Georgia, 'Times New Roman', serif"
        font-size="68"
        font-weight="400"
        font-style="italic">3D modeling.</text>

  <!-- Subhead -->
  <text x="72" y="478"
        fill="#E5E7EB"
        font-family="Arial, Helvetica, sans-serif"
        font-size="22"
        font-weight="300">Inventor &amp; SolidWorks · AISC / AWS shop drawings</text>

  <!-- Footer URL -->
  <text x="72" y="568"
        fill="#F5F5F0"
        font-family="'Courier New', monospace"
        font-size="15"
        letter-spacing="3"
        font-weight="500">GALVECSTUDIO.COM</text>

  <!-- Right hairline accent -->
  <line x1="${W - 72}" y1="68" x2="${W - 72}" y2="${H - 68}"
        stroke="#F5F5F0" stroke-opacity="0.25" stroke-width="1"/>
</svg>`;

  // 4) Composite overlay on top of base
  await sharp(base)
    .composite([{ input: Buffer.from(overlaySvg), top: 0, left: 0 }])
    .jpeg({ quality: 88, progressive: true, mozjpeg: true })
    .toFile(OUT);

  console.log(`Wrote ${OUT}`);
}

main().catch(err => { console.error(err); process.exit(1); });
