// One-shot pipeline: read raw assets from trabajos/, output web-ready JPGs to
// public/projects/<slug>/, and rewrite src/data/projects.json with the manifest.
//
// Drawings convention:
//   - All pages of every PDF in `drawingPdfs` are rendered as drawing-NN.jpg
//     (zero-padded sequential numbering across the project, in PDF order).
//   - The published drawings are INSTALLATION drawings only; the complete
//     fabrication-detailed shop drawing package is delivered with each project.
//
// Run: node scripts/build-project-assets.mjs

import sharp from 'sharp';
import { execSync } from 'node:child_process';
import { mkdir, readdir, writeFile, rm } from 'node:fs/promises';
import path from 'node:path';

const ROOT = path.resolve(process.cwd());
const TRABAJOS = path.join(ROOT, 'trabajos');
const OUT = path.join(ROOT, 'public', 'projects');
const PDFTOPPM = 'C:/Users/miran/AppData/Local/Microsoft/WinGet/Packages/oschwartz10612.Poppler_Microsoft.Winget.Source_8wekyb3d8bbwe/poppler-25.07.0/Library/bin/pdftoppm.exe';

const projects = [
  {
    slug: 'friendly-laundry-canopies',
    folder: 'canopies-1',
    title: 'Friendly Laundry — Aluminum Canopies',
    category: 'Custom',
    summary: 'Set of aluminum canopies for a commercial laundry facility in Florida. Parametric Inventor model built to support a complete fabrication-drawing package, with welded assembly details delivered to the shop.',
    drawingPdfs: ['Friendly Laundry - Canopies.pdf']
  },
  {
    slug: 'claredon-exterior-stair',
    folder: 'exterior_stair&railing-1',
    title: 'Claredon — Exterior Stair & Railing',
    category: 'Staircases',
    summary: 'Exterior steel stair with custom railing system, built and installed in Florida. Engineered with a fully detailed fabrication package; the installation drawings reproduced here guided the on-site crew.',
    drawingPdfs: ['INSTALACION_DWGs.pdf']
  },
  {
    slug: 'interior-stair-railing-i',
    folder: 'interior_stair_railing-1',
    title: 'Interior Stair & Railing — Project I',
    category: 'Staircases',
    summary: 'Modern interior stair with horizontal-bar aluminum railing. Multi-flight assembly modeled in Inventor with a full fabrication package — base-plate callouts, weld details, and connection drawings — plus the installation set shown here.',
    drawingPdfs: ['STR (INST DWGs).pdf']
  },
  {
    slug: 'interior-stair-railing-ii',
    folder: 'interior_stair_railing-2',
    title: 'Interior Stair II — Steel Substructure + Railing',
    category: 'Staircases',
    summary: 'Two-phase delivery: first the steel substructure with welded neck connections embedded into the wood-finished base, then the aluminum stair and railing assembly mounted on top. Each phase shipped with its own complete fabrication package; the three installation sets are shown below in build order.',
    drawingPdfs: [
      'steel structure/LADO-6_WOOD.pdf',
      'steel structure/WELD_CUELLOS.pdf',
      'stair railing/INST_DWGs.pdf'
    ]
  },
  {
    slug: 'interior-stair-railing-iii',
    folder: 'interior_stair_railing-3',
    title: 'Interior Stair & Railing — Project III',
    category: 'Staircases',
    summary: 'Modern residential stair with cable-railing system. Modeled parametrically in Inventor and delivered with a full fabrication drawing package; the installation sheet shown here was the on-site reference.',
    drawingPdfs: ['STR_INST.pdf']
  },
  {
    slug: 'interior-stair-railing-iv',
    folder: 'interior_stair_railing-4',
    title: 'Interior Stair & Railing — Project IV',
    category: 'Staircases',
    summary: 'Interior staircase with custom aluminum railing. Parametric Inventor model fed a complete fabrication and section-view drawing package; the installation set (INST_STR) is reproduced below.',
    drawingPdfs: ['INST_STR.pdf']
  },
  {
    slug: 'interior-stair-railing-v',
    folder: 'interior_stair_railing-5',
    title: 'Interior Stair & Railing — Project V',
    category: 'Staircases',
    summary: 'Interior stair assembly with hardware-detailed connections. Full fabrication package developed in Inventor, delivered alongside the installation drawings shown below.',
    drawingPdfs: ['STR(Inst).pdf']
  },
  {
    slug: 'interior-stair-railing-vi',
    folder: 'interior_stair_railing-6',
    title: 'Interior Stair & Railing — Project VI',
    category: 'Staircases',
    summary: 'Interior stair and railing with structural and finish details modeled in Inventor. The complete fabrication package was issued to the shop; the installation set is reproduced below.',
    drawingPdfs: ['STR_REV00.pdf'],
    excludeFiles: ['TEST.png']
  },
  {
    slug: 'balcony-railings',
    folder: 'railings-1',
    title: 'Balcony Railings',
    category: 'Railings',
    summary: 'Aluminum balcony railing system spanning multiple balcony types. Parametric Inventor model produced a complete fabrication package with post-connection details and weld assembly callouts. Two installation drawing sets are reproduced below in sequence.',
    drawingPdfs: ['R1_NEW.pdf', 'R2_NEW.pdf']
  },
  {
    slug: 'friendly-laundry-roof-ladder',
    folder: 'roof_access_ladder-1',
    title: 'Friendly Laundry — Roof Access Ladder',
    category: 'Custom',
    summary: 'OSHA-compliant roof access ladder with safety cage. Engineered with a complete fabrication drawing package — welded assembly, cage details, and shop callouts; the installation sheet is reproduced below.',
    drawingPdfs: ['Friendly Laundry - Roof Access Ladder.pdf']
  }
];

function slugify(name) {
  return name.toLowerCase()
    .replace(/[^a-z0-9.-]+/g, '-')
    .replace(/-+/g, '-')
    .replace(/^-|-$/g, '');
}

function pad(n, width = 2) {
  return String(n).padStart(width, '0');
}

async function processImage(src, dst, maxWidth = 1600, quality = 82) {
  await sharp(src)
    .rotate()
    .resize({ width: maxWidth, withoutEnlargement: true })
    .jpeg({ quality, progressive: true, mozjpeg: true })
    .toFile(dst);
}

async function extractAllPdfPages(pdfPath, outBase) {
  // pdftoppm without -f/-l renders every page; outputs outBase-<N>.jpg with
  // padding determined by total page count.
  const cmd = `"${PDFTOPPM}" -jpeg -jpegopt "quality=80" -r 150 "${pdfPath}" "${outBase}"`;
  execSync(cmd, { stdio: 'pipe' });
}

async function processProject(p) {
  const projectOut = path.join(OUT, p.slug);
  await rm(projectOut, { recursive: true, force: true });
  await mkdir(projectOut, { recursive: true });

  const sourceFolder = path.join(TRABAJOS, p.folder);
  const excluded = new Set((p.excludeFiles || []).map(f => f.toLowerCase()));

  // Walk source folder + subfolders to find renders (.png) and photos (.jpg/.jpeg)
  const renderFiles = [];
  const photoFiles = [];

  async function walk(dir, prefix = '') {
    const entries = await readdir(dir, { withFileTypes: true });
    for (const e of entries) {
      const full = path.join(dir, e.name);
      if (e.isDirectory()) {
        const subPrefix = prefix ? `${prefix}${e.name}-` : `${e.name}-`;
        await walk(full, subPrefix);
        continue;
      }
      if (excluded.has(e.name.toLowerCase())) continue;
      const lower = e.name.toLowerCase();
      if (lower.endsWith('.png')) {
        renderFiles.push({ src: full, name: prefix + e.name });
      } else if (lower.endsWith('.jpeg') || lower.endsWith('.jpg')) {
        photoFiles.push({ src: full, name: prefix + e.name });
      }
    }
  }
  await walk(sourceFolder);

  // Sort for deterministic order
  renderFiles.sort((a, b) => a.name.localeCompare(b.name, 'en'));
  photoFiles.sort((a, b) => a.name.localeCompare(b.name, 'en'));

  const renders = [];
  const photos = [];

  for (const r of renderFiles) {
    const outName = 'render-' + slugify(r.name).replace(/\.png$/, '.jpg');
    await processImage(r.src, path.join(projectOut, outName), 1600, 82);
    renders.push(outName);
  }

  for (const ph of photoFiles) {
    const outName = 'site-' + slugify(ph.name).replace(/\.(jpeg|jpg)$/, '.jpg');
    await processImage(ph.src, path.join(projectOut, outName), 1600, 85);
    photos.push(outName);
  }

  // Render all pages of every drawing PDF, in listed order, into a single
  // sequential set drawing-01.jpg, drawing-02.jpg, ...
  const drawings = [];
  let drawingIdx = 1;

  for (const pdfRel of (p.drawingPdfs || [])) {
    const pdfPath = path.join(sourceFolder, pdfRel);
    const tmpBase = path.join(projectOut, `_dwg-tmp-${drawingIdx}`);
    await extractAllPdfPages(pdfPath, tmpBase);

    // Collect produced tmp files in numeric order
    const tmpFiles = (await readdir(projectOut))
      .filter(f => f.startsWith(`_dwg-tmp-${drawingIdx}-`) && f.endsWith('.jpg'))
      .sort((a, b) => {
        const na = Number(a.match(/-(\d+)\.jpg$/)?.[1] ?? 0);
        const nb = Number(b.match(/-(\d+)\.jpg$/)?.[1] ?? 0);
        return na - nb;
      });

    for (const tmp of tmpFiles) {
      const finalName = `drawing-${pad(drawingIdx)}.jpg`;
      const tmpPath = path.join(projectOut, tmp);
      const finalPath = path.join(projectOut, finalName);
      // Re-encode with mozjpeg, cap width at 2400px for legibility without bloat
      await processImage(tmpPath, finalPath, 2400, 82);
      await rm(tmpPath);
      drawings.push(finalName);
      drawingIdx++;
    }
  }

  return { renders, photos, drawings };
}

async function main() {
  await mkdir(OUT, { recursive: true });

  const manifest = [];
  for (const p of projects) {
    process.stdout.write(`Processing ${p.slug} ... `);
    try {
      const { renders, photos, drawings } = await processProject(p);
      manifest.push({
        slug: p.slug,
        title: p.title,
        category: p.category,
        summary: p.summary,
        hero: renders[0] || photos[0],
        renders,
        photos,
        drawings
      });
      console.log(`${renders.length} renders, ${photos.length} photos, ${drawings.length} drawing pages`);
    } catch (err) {
      console.log(`FAILED: ${err.message}`);
    }
  }

  await writeFile(
    path.join(ROOT, 'src', 'data', 'projects.json'),
    JSON.stringify(manifest, null, 2),
    'utf-8'
  );

  console.log(`\nWrote ${manifest.length} projects to src/data/projects.json`);
}

main().catch(err => { console.error(err); process.exit(1); });
