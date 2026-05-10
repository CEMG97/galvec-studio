# GALVEC Studio — Session Status

**Last updated**: 2026-05-09 (end of session 2)
**Skill in use**: `engineering-portfolio-builder`
**Stage reached**: Stage 3 ✅ + Pre-deploy ✅ + Real Gallery ✅ → **SITE IS LIVE WITH 8 REAL PROJECTS** 🟢 → Stage 4 polish queued

---

## 🟢 LIVE STATUS

- **Production URL**: https://galvecstudio.com (HTTPS valid)
- **Repo**: https://github.com/CEMG97/galvec-studio (public, main branch, auto-deploy on push)
- **Last commit**: `4a394f3` — "Add real project gallery with 8 case studies"
- **Pages live**: 13 total (5 main + 8 project detail pages at /work/&lt;slug&gt;)
- **Email**: `cm@galvecstudio.com` → forwards to personal inbox via Cloudflare Email Routing
- **Form backend**: Formspree `galvec-contact` → `https://formspree.io/f/mdabpapq` (NOT YET END-TO-END TESTED)

---

## What was achieved across both sessions (2026-05-09)

### Session 1 — Scaffold to Live
1. ✅ All Stage 3 placeholders replaced with real values
2. ✅ Privacy decisions applied: public name `C. Miranda` only, no LinkedIn/GitHub in Footer, Dallas not disclosed
3. ✅ Cloudflare Email Routing configured (`cm@galvecstudio.com`)
4. ✅ GitHub repo `CEMG97/galvec-studio` created and pushed
5. ✅ Local git config per-repo with pseudonymous identity (`C. Miranda` + GitHub noreply email)
6. ✅ Cloudflare DNS configured (4× A + CNAME, proxy OFF)
7. ✅ GitHub Pages custom domain + Enforce HTTPS enabled
8. ✅ Bug fix: installed missing `lightningcss` devDep

### Session 2 — Real Project Gallery
9. ✅ Inventoried `trabajos/` folder: 11 project subfolders, 178 PDF pages, dozens of renders/photos
10. ✅ Selected 8 viable projects (excluded `gavinetes-1` for 646MB AVI videos and `fence-1` for single PDF)
11. ✅ Installed Poppler (PDF tooling) via winget at user scope
12. ✅ Installed `sharp` as devDependency for image processing
13. ✅ Built `scripts/build-project-assets.mjs` — re-runnable asset pipeline that:
    - Resizes/compresses 44 renders + 13 site photos → web-ready JPGs
    - Extracts page 1 of weld/fab drawing PDFs at 200 DPI → JPG
    - Outputs to `public/projects/<slug>/`
    - Rewrites `src/data/projects.json` with the manifest
14. ✅ Refactored `/work` from placeholder cards → real gallery with hero images + category filter
15. ✅ Created dynamic route `src/pages/work/[slug].astro` — generates 8 project detail pages
16. ✅ Each detail page has: hero, renders grid, site photos grid, weld drawing, CTA
17. ✅ Added `trabajos/` and `*.zip` to `.gitignore` (raw assets stay local)
18. ✅ Total page weight: 8.9MB across all 65 processed images

---

## Decisions locked in (no need to re-discuss)

| Item | Decision |
|---|---|
| Brand name | **GALVEC Studio** (G wordmark hides V = AAVL initials) |
| Tagline | Aluminum Engineering · Fabrication-ready 3D modeling and shop drawings |
| Palette | `--ink #1A1A1A` · `--paper #F5F5F0` · `--aluminum #B0BEC5` · `--accent #0A2540` |
| Type | Inter (body) · Space Grotesk (display) · IBM Plex Mono (technical) |
| Public identity | **C. Miranda** (initials only — operational privacy from current employer) |
| Public location | "Remote-first" — Dallas residence not disclosed; Florida cities listed as project history only |
| Social links | None in Footer (intentional) |
| PDF download links | NOT shown publicly — only the selected drawing page is rendered as JPG |
| Architecture | Per-project detail pages at `/work/<slug>`, gallery overview at `/work` |

## User profile reminder

- Specialization: aluminum — staircases, curtain walls/façades, structural/custom, railings
- Experience: 7+ years (since 2019, mostly as employee — launching independent now)
- Lives in Dallas, TX (private); project history exclusively Florida (Miami, WPB, Orlando, Tampa, Sarasota)
- Stack: Inventor + SolidWorks (primary), Rhinoceros + KeyShot (secondary), AutoCAD + Illustrator + Bluebeam (output)
- Constraint: holds a day job; current employer must NOT discover the side practice

---

## Live project gallery — what's currently published

| Slug | Title | Category | Renders | Site photos | Drawing |
|---|---|---|---|---|---|
| `friendly-laundry-canopies` | Friendly Laundry — Aluminum Canopies | Custom | 12 | 0 | ✅ |
| `claredon-exterior-stair` | Claredon — Exterior Stair & Railing | Staircases | 0 | 3 | ✅ |
| `interior-stair-railing-i` | Interior Stair & Railing — Project I | Staircases | 7 | 0 | ✅ |
| `interior-stair-railing-ii` | Interior Stair II — Steel Substructure + Railing | Staircases | 0 | 10 | ✅ |
| `interior-stair-railing-iii` | Interior Stair & Railing — Project III | Staircases | 9 | 0 | ✅ |
| `interior-stair-railing-iv` | Interior Stair & Railing — Project IV | Staircases | 6 | 0 | ✅ |
| `balcony-railings` | Balcony Railings | Railings | 4 | 0 | ✅ |
| `friendly-laundry-roof-ladder` | Friendly Laundry — Roof Access Ladder | Custom | 6 | 0 | ✅ |

**Categories live**: Custom, Staircases, Railings (no Façades — filter shows what's available)

---

## ⚠️ Things to revisit when next session starts

**User has not visually verified the live site yet** — when next session opens, ask if everything looks right or if anything needs adjustment. Common things they might want to tweak:

1. **Project titles** — current titles for `interior-stair-railing-i` through `iv` are placeholders ("Project I", "Project II"...). User might want descriptive names if they remember real client/site context.
2. **Hero image per project** — script defaults to first render or first photo. Some heroes might not be the most compelling angle. Easy to change: edit `hero` field in `src/data/projects.json` to any filename listed under `renders`/`photos`.
3. **Summary copy** — placeholder summaries written by Claude based on file naming + image inspection. User might want to add real client names, locations, completion dates, specific specs.
4. **Drawing page selection** — every project shows page 1 of its PDF. User can pick a different page by editing `drawingPage: N` in `scripts/build-project-assets.mjs` and re-running it.
5. **Possible render pruning** — Friendly Laundry Canopies has 12 renders (C1_A/A1/B/B1/C/C1 + C2_A/A1/B/B1/C/C1). The A/A1 pairs may be alternate angles that feel redundant. Easy to prune by editing `projects.json`.

---

## How to update content (cheat sheet)

### Add new projects to the gallery
1. Drop new folder under `trabajos/<new-project>/` with PNG renders, JPEG site photos, PDF drawings
2. Edit the `projects` array at the top of `scripts/build-project-assets.mjs` to add a new entry
3. Run: `node scripts/build-project-assets.mjs`
4. Commit & push: `git add . && git commit -m "Add project X" && git push`

### Change hero image of a project
- Edit `src/data/projects.json` → find the project → set `"hero"` to any filename from its `renders` or `photos` arrays
- Commit & push (no script re-run needed)

### Change drawing page shown for a project
- Edit `scripts/build-project-assets.mjs` → find the project entry → change `drawingPage: N`
- Run: `node scripts/build-project-assets.mjs`
- Commit & push

### Refine project copy (titles, summaries)
- Edit fields in `scripts/build-project-assets.mjs` (source of truth)
- Run script to propagate to projects.json
- OR edit `src/data/projects.json` directly if you only want to change copy without re-running the script

### Verify a build before push
```powershell
cd C:\Users\miran\OneDrive\Escritorio\Projects\galvec-studio
npm.cmd run build
```
(use `npm.cmd` not `npm` due to PowerShell execution policy)

### Standard publish flow
```bash
git add .
git commit -m "describe what changed"
git push
```
GitHub Actions auto-deploys to galvecstudio.com in ~2-3 min.

---

## Stage 4 (still queued — do whenever)

### Stage 4.A — End-to-end contact form test (~5 min) ⚠️ NEVER DONE
- From a personal email different from the one cm@galvecstudio.com forwards to, submit the contact form on https://galvecstudio.com/contact
- First submission requires confirming the form ownership in Formspree (one-time link sent to the form-owner address)
- Subsequent submissions arrive cleanly in your inbox
- Verify file upload works (form accepts DWG, DXF, PDF, PNG, JPG)

### Stage 4.B — Refine project metadata (variable time)
- Replace placeholder titles "Project I/II/III/IV" with real names if known
- Add real client names where shareable
- Add completion year, location (city), specs (height, materials, finish) per project
- Decide if any redundant renders should be pruned

### Stage 4.C — `og-cover.jpg` for social previews (~30 min design)
- 1200×630 px JPG → `public/og-cover.jpg`
- Should include: GALVEC wordmark, tagline, dominant aluminum render or photo from your portfolio (the Claredon exterior stair would be excellent — it's already in the repo at `public/projects/claredon-exterior-stair/site-claredon1.jpg`)
- Reference `src/layouts/Base.astro` for how the og:image meta tag picks it up

### Stage 4.D — Localized SEO (~1 hour copy work)
- Long-tail keywords for Florida fab shop market:
  - "Miami aluminum staircase shop drawings"
  - "South Florida curtain wall modeling"
  - "Tampa aluminum railing engineer"
  - "West Palm Beach structural aluminum"
- Weave 2-3 of these naturally into `index.astro` and `services.astro` copy

### Stage 4.E — Google Search Console (~10 min)
- https://search.google.com/search-console → add `galvecstudio.com` as property
- Verification: add a TXT record in Cloudflare DNS (Google gives you the value)
- Submit `https://galvecstudio.com/sitemap-index.xml`
- Within ~3-7 days the site starts appearing in indexed pages

### Stage 4.F — Lighthouse audit (~5 min)
- `npx lighthouse https://galvecstudio.com --view` (locally — opens browser report)
- Target: Performance >90, Accessibility >95, Best Practices >95, SEO 100
- The new gallery may impact Performance — if so, we add image lazy-loading hints, AVIF/WebP conversion, or further compression

---

## File map quick-ref

| Archivo | Para qué se edita |
|---|---|
| [src/data/projects.json](./src/data/projects.json) | Live manifest of 8 projects (titles, summaries, hero, image arrays) — generated by script but editable directly for quick tweaks |
| [scripts/build-project-assets.mjs](./scripts/build-project-assets.mjs) | Source-of-truth pipeline: edit project metadata + drawing page selection here, then re-run |
| [src/pages/work.astro](./src/pages/work.astro) | Gallery overview page — 8 cards with category filter |
| [src/pages/work/\[slug\].astro](./src/pages/work/[slug].astro) | Dynamic detail page template — renders/photos/drawing per project |
| [src/pages/index.astro](./src/pages/index.astro) | Home — hero + SEO copy (no real project content yet — Stage 4.D) |
| [src/pages/services.astro](./src/pages/services.astro) | 3 tiers + timeline (no real project tie-ins yet) |
| [src/pages/expertise.astro](./src/pages/expertise.astro) | Stack, standards, founder bio |
| [src/pages/contact.astro](./src/pages/contact.astro) | Form (Formspree wired, NOT end-to-end tested) |
| [src/layouts/Base.astro](./src/layouts/Base.astro) | Meta tags, og:image, fonts |
| [public/projects/&lt;slug&gt;/](./public/projects/) | Processed assets — DO NOT edit by hand; regenerate via script |
| [trabajos/](./trabajos/) | Raw source assets — gitignored, kept local on OneDrive |
| [README.md](./README.md) | Setup/deploy reference (snapshot of deployed values) |

---

## Quick paste for next session

> Continuamos con GALVEC Studio. Leé `SESSION-STATUS.md` en la raíz del proyecto.

That sentence + the file reload everything: state, decisions, next steps, quick references.
