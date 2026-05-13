# GALVEC Studio — Session Status

**Last updated**: 2026-05-13 (end of session 3)
**Skill in use**: `engineering-portfolio-builder`
**Stage reached**: Stage 3 ✅ + Pre-deploy ✅ + Real Gallery v2 ✅ + Logo ✅ + Form fix ✅ + og-cover ✅ + SEO ✅ + Search Console ✅ + Lighthouse ✅ → **SITE IS LIVE — Stage 4 essentially complete** 🟢

---

## 🟢 LIVE STATUS

- **Production URL**: https://galvecstudio.com (HTTPS valid)
- **Repo**: https://github.com/CEMG97/galvec-studio (public, main branch, auto-deploy on push)
- **Last commit**: `bc77503` — "Perf: non-blocking fonts, explicit image dimensions, footer heading order"
- **Pages live**: 15 total (5 main + 10 project detail pages at /work/&lt;slug&gt;)
- **Email**: `cm@galvecstudio.com` → forwards to personal inbox via Cloudflare Email Routing
- **Form backend**: Formspree `galvec-contact` → `https://formspree.io/f/mdabpapq` (end-to-end VERIFIED 2026-05-13, no file uploads — free tier limitation)
- **Lighthouse**: Performance 87 · Accessibility 100 · Best Practices 100 · SEO 100 · Agentic Browsing 100
- **Google Search Console**: galvecstudio.com property verified, sitemap `sitemap-index.xml` submitted (indexing in 3-7 days)

---

## Session 3 (2026-05-13) — gallery rebuild + brand + SEO

### Gallery v2 (replaced everything from session 2)
1. ✅ Re-inventoried `trabajos/`: 10 project folders (2 new interior stairs: `-5`, `-6`)
2. ✅ User cleaned raw PDFs to keep only installation drawings per project
3. ✅ Build script rewritten — supports `drawingPdfs[]` (multi-PDF) and `excludeFiles[]`
4. ✅ Renders **all pages** of every installation PDF at 150 DPI / Q80 — 60 sheets total across 10 projects
5. ✅ Detail page: drawing grid + click-to-open lightbox (keyboard nav, prev/next, ESC)
6. ✅ Notice block on every detail page: *"Installation drawings shown. Every project ships with a complete fabrication-detailed shop drawing package…"*
7. ✅ New "Deliverables" section on `/services` contrasting installation drawings (published) vs fab package (delivered)

### Brand identity
8. ✅ User provided custom logo (serif G with embedded V monogram + "GALVEC STUDIO" wordmark)
9. ✅ Stripped wordmark from monogram → `public/galvec-monogram.svg` (4 KB)
10. ✅ Full lockup preserved → `public/galvec-lockup.svg` (20 KB)
11. ✅ Header now shows the monogram only (no text wordmark beside it)
12. ✅ Footer shows the full lockup (replacing the text wordmark)
13. ✅ favicon.svg replaced with monogram
14. ✅ `logo/` raw source folder added to .gitignore

### Contact form
15. ✅ Discovered Formspree free tier rejects file uploads
16. ✅ Removed file input, added explicit instruction: *"For DWG, DXF, PDF, or sketch references, email them directly to cm@galvecstudio.com after sending this form."*
17. ✅ Test submission verified end-to-end (user confirmed delivery)

### og-cover (social previews)
18. ✅ `scripts/build-og-cover.mjs` — reproducible 1200×630 composer (sharp + SVG overlay over Claredon stair photo)
19. ✅ `public/og-cover.jpg` (~110 KB) with monogram + headline "Fabrication-ready 3D modeling." + subhead + URL
20. ✅ Base.astro: added `twitter:image` meta (was missing for `summary_large_image`)

### SEO + Search Console
21. ✅ Index/services: title + description rewritten with Florida + service keywords
22. ✅ Home hero subhead now mentions staircases/railings/curtain walls + Florida-to-North-America market
23. ✅ New "Markets" section on home with the 5 Florida cities (Miami, WPB, Orlando, Tampa, Sarasota) as project history (NOT positioning as Florida-based)
24. ✅ ProfessionalService JSON-LD schema on home: areaServed = [US, Canada, Florida], knowsAbout = [AISC, AWS, Inventor, SolidWorks, ADM 2020, …]
25. ✅ Bug fix: featured project cards in `index.astro` referenced non-existent fields (`client_type`, `year`, `outcome`); now uses real hero image + drawing count, links to `/work/<slug>`
26. ✅ Google Search Console: domain property verified via Cloudflare TXT, sitemap submitted

### Lighthouse audit
27. ✅ Google Fonts switched to non-blocking load (preload + media=print onload trick + noscript fallback)
28. ✅ Explicit width/height on header monogram, footer lockup, and project card heroes
29. ✅ Footer column headings h4 → h3 (accessibility heading-order)
30. ✅ Accessibility went 98 → 100
31. ⚠️ Performance held at 87 — LCP ~3.2s in lab is mostly project-card thumbnails loaded at 1600px but displayed at ~280px (541 KB savings possible). User opted to NOT pursue further this session.

---

## Decisions locked in (no need to re-discuss)

| Item | Decision |
|---|---|
| Brand name | **GALVEC Studio** (G hides V = AAVL initials) |
| Tagline | Aluminum Engineering · Fabrication-ready 3D modeling and shop drawings |
| Palette | `--ink #1A1A1A` · `--paper #F5F5F0` · `--aluminum #B0BEC5` · `--accent #0A2540` |
| Type | Inter (body) · Space Grotesk (display) · IBM Plex Mono (technical) |
| Public identity | **C. Miranda** (initials only — operational privacy from current employer) |
| Public location | "Remote-first" — Dallas not disclosed; Florida cities listed as project history only |
| Social links | None in Footer (intentional) |
| Logo | Serif G+V monogram (header/favicon), full lockup with wordmark (footer/og-cover) |
| Drawing strategy | Public installation drawings only; complete fab package private (per-project notice + dedicated /services section) |
| Drawing rendering | 150 DPI Q80 JPG, all pages, sequential `drawing-NN.jpg`, lightbox grid with keyboard nav |
| Contact form | Formspree free tier, NO file uploads (visitors email DWG/PDF separately after submit) |
| Project naming | Interior Stair I–VI (roman numerals), Balcony Railings, Claredon Exterior Stair, Friendly Laundry Canopies + Roof Ladder |

## User profile reminder

- Specialization: aluminum — staircases, curtain walls/façades, structural/custom, railings
- Experience: 7+ years (since 2019, mostly as employee — launching independent now)
- Lives in Dallas, TX (private); project history exclusively Florida (Miami, WPB, Orlando, Tampa, Sarasota)
- Stack: Inventor + SolidWorks (primary), Rhinoceros + KeyShot (secondary), AutoCAD + Illustrator + Bluebeam (output)
- Constraint: holds a day job; current employer must NOT discover the side practice

---

## Live project gallery — what's currently published

| Slug | Title | Category | Renders | Site photos | Drawing pages |
|---|---|---|---|---|---|
| `friendly-laundry-canopies` | Friendly Laundry — Aluminum Canopies | Custom | 6 | 0 | 2 |
| `claredon-exterior-stair` | Claredon — Exterior Stair & Railing | Staircases | 0 | 3 | 10 |
| `interior-stair-railing-i` | Interior Stair & Railing — Project I | Staircases | 7 | 0 | 7 |
| `interior-stair-railing-ii` | Interior Stair II — Steel Substructure + Railing | Staircases | 0 | 10 | 8 |
| `interior-stair-railing-iii` | Interior Stair & Railing — Project III | Staircases | 9 | 0 | 1 |
| `interior-stair-railing-iv` | Interior Stair & Railing — Project IV | Staircases | 6 | 0 | 3 |
| `interior-stair-railing-v` | Interior Stair & Railing — Project V | Staircases | 6 | 0 | 2 |
| `interior-stair-railing-vi` | Interior Stair & Railing — Project VI | Staircases | 4 | 0 | 2 |
| `balcony-railings` | Balcony Railings | Railings | 4 | 0 | 24 |
| `friendly-laundry-roof-ladder` | Friendly Laundry — Roof Access Ladder | Custom | 3 | 0 | 1 |

**Categories live**: Custom, Staircases, Railings
**Total drawing pages**: 60 · **Repo weight on `public/projects/`**: ~17 MB

---

## What's NOT done — pending for future sessions

### Stage 4.B — Refine project metadata (whenever, ~30 min per pass)
- Titles "Interior Stair & Railing — Project I/II/III/IV/V/VI" are still generic
- Summaries are placeholder copy I wrote based on filename inspection
- No client names, completion dates, or city per project
- User has the real context; we can swap text in `scripts/build-project-assets.mjs` and re-run, or edit `src/data/projects.json` directly for copy-only tweaks

### Stage 4.G — Push Performance from 87 → 95+ (if/when it matters)
- LCP main offender: 3 project-card thumbnails loaded at 1600px but shown ~280px
- Quick fix: generate `-thumb.jpg` 800px variants and use those in home cards + work overview (~15 min, +5-8 pts)
- Bigger fix: full AVIF/WebP `<picture>` pipeline (~45 min, +10 pts but doubles repo image weight)

### Stage 4.H — Pending small UX items noticed during testing
- Mobile header sticky: monogram is taller than the old geometric icon; check that the mobile breakpoint padding still looks right
- Project card images in home are heavy; lazy-loaded but still a payload concern if you add 5+ featured projects

---

## How to update content (cheat sheet)

### Add new projects to the gallery
1. Drop new folder under `trabajos/<new-project>/` with PNG renders, JPEG site photos, and the installation PDF(s) — fab drawings should NOT be in this folder
2. Edit the `projects` array at the top of `scripts/build-project-assets.mjs` to add a new entry
3. Run: `node scripts/build-project-assets.mjs`
4. Commit & push: `git add . && git commit -m "Add project X" && git push`

### Change hero image of a project
- Edit `src/data/projects.json` → find the project → set `"hero"` to any filename from its `renders` or `photos` arrays
- Commit & push (no script re-run needed)

### Regenerate og-cover (if you want a different background photo or copy)
- Edit `scripts/build-og-cover.mjs` (BASE_PHOTO path, headline copy, etc.)
- Run: `node scripts/build-og-cover.mjs`
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

## File map quick-ref

| Archivo | Para qué se edita |
|---|---|
| [src/data/projects.json](./src/data/projects.json) | Live manifest of 10 projects — generated by script, editable directly for quick tweaks |
| [scripts/build-project-assets.mjs](./scripts/build-project-assets.mjs) | Source-of-truth pipeline: project metadata + drawing PDFs + excludeFiles + DPI/quality |
| [scripts/build-og-cover.mjs](./scripts/build-og-cover.mjs) | Composer for `public/og-cover.jpg` (social preview) |
| [src/pages/work.astro](./src/pages/work.astro) | Gallery overview page with category filter |
| [src/pages/work/\[slug\].astro](./src/pages/work/[slug].astro) | Detail page template with drawing grid + lightbox |
| [src/pages/index.astro](./src/pages/index.astro) | Home — hero, services preview, featured projects, **Markets section**, JSON-LD schema |
| [src/pages/services.astro](./src/pages/services.astro) | 3 tiers + **Deliverables (INST vs FAB) section** + timeline |
| [src/pages/expertise.astro](./src/pages/expertise.astro) | Stack, standards, founder bio |
| [src/pages/contact.astro](./src/pages/contact.astro) | Form (Formspree wired, file upload disabled, attach-note added) |
| [src/layouts/Base.astro](./src/layouts/Base.astro) | Meta tags, og:image, twitter:image, non-blocking font loading |
| [src/components/Header.astro](./src/components/Header.astro) | Monogram-only brand mark |
| [src/components/Footer.astro](./src/components/Footer.astro) | Full lockup + nav columns (h3 headings) |
| [public/galvec-monogram.svg](./public/galvec-monogram.svg) | G+V mark only (header + favicon) |
| [public/galvec-lockup.svg](./public/galvec-lockup.svg) | Full G+V + wordmark (footer + og-cover) |
| [public/og-cover.jpg](./public/og-cover.jpg) | 1200×630 social preview |
| [public/projects/&lt;slug&gt;/](./public/projects/) | Processed assets — regenerate via script |
| [trabajos/](./trabajos/) | Raw source assets — gitignored |
| [logo/](./logo/) | Raw logo source — gitignored |

---

## Quick paste for next session

> Continuamos con GALVEC Studio. Leé `SESSION-STATUS.md` en la raíz del proyecto.

That sentence + the file reload everything: state, decisions, what's published, what's pending, file map.
