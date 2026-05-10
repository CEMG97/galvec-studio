// One-shot pipeline: read raw assets from trabajos/, output web-ready JPGs to
// public/projects/<slug>/, and rewrite src/data/projects.json with the manifest.
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
    summary: 'Set of aluminum canopies for a commercial laundry facility in Florida. Parametric Inventor model + complete fabrication drawings including welded assembly details.',
    drawingPdf: 'Friendly Laundry - Canopies.pdf',
    drawingPage: 1
  },
  {
    slug: 'claredon-exterior-stair',
    folder: 'exterior_stair&railing-1',
    title: 'Claredon — Exterior Stair & Railing',
    category: 'Staircases',
    summary: 'Exterior steel stair with custom railing system. Fully welded assembly delivered with shop drawings and installation guide. Built and installed in Florida.',
    drawingPdf: 'SOLDADURA_DWGs(Rev02).pdf',
    drawingPage: 1
  },
  {
    slug: 'interior-stair-railing-i',
    folder: 'interior_stair_railing-1',
    title: 'Interior Stair & Railing — Project I',
    category: 'Staircases',
    summary: 'Modern interior stair with horizontal-bar aluminum railing. Multi-flight assembly with full dimensioning, base-plate detail callouts, and welding drawings.',
    drawingPdf: 'STR (WELD DWGs).pdf',
    drawingPage: 1
  },
  {
    slug: 'interior-stair-railing-ii',
    folder: 'interior_stair_railing-2',
    subfolders: ['steel structure', 'stair railing'],
    title: 'Interior Stair II — Steel Substructure + Railing',
    category: 'Staircases',
    summary: 'Full lifecycle delivery in two phases: first the structural steel substructure with welded neck connections, then the aluminum stair and railing assembly mounted on top. Both phases include complete welding and installation drawings.',
    drawingPdf: 'stair railing/R1.pdf',
    drawingPage: 1
  },
  {
    slug: 'interior-stair-railing-iii',
    folder: 'interior_stair_railing-3',
    title: 'Interior Stair & Railing — Project III',
    category: 'Staircases',
    summary: 'Modern residential stair with wood treads and stainless steel cable railing. Parametric Inventor model with structural details and section views.',
    drawingPdf: 'R1.pdf',
    drawingPage: 1
  },
  {
    slug: 'interior-stair-railing-iv',
    folder: 'interior_stair_railing-4',
    title: 'Interior Stair & Railing — Project IV',
    category: 'Staircases',
    summary: 'Interior staircase with custom aluminum railing. Includes installation drawings (INST_STR) and detailed section views (SEC-1, SEC-2).',
    drawingPdf: 'INST_STR.pdf',
    drawingPage: 1
  },
  {
    slug: 'balcony-railings',
    folder: 'railings-1',
    title: 'Balcony Railings',
    category: 'Railings',
    summary: 'Aluminum balcony railing system. Parametric model with full fabrication drawings, post connection details, and weld assembly callouts.',
    drawingPdf: 'R1_NEW.pdf',
    drawingPage: 1
  },
  {
    slug: 'friendly-laundry-roof-ladder',
    folder: 'roof_access_ladder-1',
    title: 'Friendly Laundry — Roof Access Ladder',
    category: 'Custom',
    summary: 'OSHA-compliant roof access ladder with safety cage. Parametric Inventor model with complete fabrication drawings (20-sheet set) including welded assembly and connection details.',
    drawingPdf: 'RAL (FAB DWGs).pdf',
    drawingPage: 1
  }
];

function slugify(name) {
  return name.toLowerCase()
    .replace(/[^a-z0-9.-]+/g, '-')
    .replace(/-+/g, '-')
    .replace(/^-|-$/g, '');
}

async function processImage(src, dst, maxWidth = 1600, quality = 82) {
  await sharp(src)
    .rotate()
    .resize({ width: maxWidth, withoutEnlargement: true })
    .jpeg({ quality, progressive: true, mozjpeg: true })
    .toFile(dst);
}

async function extractPdfPage(pdfPath, page, outBase) {
  const cmd = `"${PDFTOPPM}" -jpeg -jpegopt quality=88 -r 200 -f ${page} -l ${page} "${pdfPath}" "${outBase}"`;
  execSync(cmd, { stdio: 'pipe' });
}

async function processProject(p) {
  const projectOut = path.join(OUT, p.slug);
  await rm(projectOut, { recursive: true, force: true });
  await mkdir(projectOut, { recursive: true });

  const sourceFolder = path.join(TRABAJOS, p.folder);
  const subfolders = p.subfolders || [''];

  const renderFiles = [];
  const photoFiles = [];

  for (const sub of subfolders) {
    const dir = sub ? path.join(sourceFolder, sub) : sourceFolder;
    const files = await readdir(dir);
    for (const f of files) {
      const full = path.join(dir, f);
      const prefix = sub ? `${sub.replace(/\s+/g, '-')}-` : '';
      const lower = f.toLowerCase();
      if (lower.endsWith('.png')) {
        renderFiles.push({ src: full, name: prefix + f });
      } else if (lower.endsWith('.jpeg') || lower.endsWith('.jpg')) {
        photoFiles.push({ src: full, name: prefix + f });
      }
    }
  }

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

  let drawing = null;
  if (p.drawingPdf) {
    const pdfPath = path.join(sourceFolder, p.drawingPdf);
    const tmpBase = path.join(projectOut, '_dwg-tmp');
    await extractPdfPage(pdfPath, p.drawingPage, tmpBase);
    const candidates = (await readdir(projectOut)).filter(f => f.startsWith('_dwg-tmp-'));
    if (candidates.length) {
      const tmp = path.join(projectOut, candidates[0]);
      const final = 'drawing-1.jpg';
      await processImage(tmp, path.join(projectOut, final), 2000, 88);
      await rm(tmp);
      drawing = final;
    }
  }

  return { renders, photos, drawing };
}

async function main() {
  await mkdir(OUT, { recursive: true });

  const manifest = [];
  for (const p of projects) {
    process.stdout.write(`Processing ${p.slug} ... `);
    try {
      const { renders, photos, drawing } = await processProject(p);
      manifest.push({
        slug: p.slug,
        title: p.title,
        category: p.category,
        summary: p.summary,
        hero: renders[0] || photos[0],
        renders,
        photos,
        drawing
      });
      console.log(`${renders.length} renders, ${photos.length} photos, drawing: ${drawing ? 'yes' : 'no'}`);
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
