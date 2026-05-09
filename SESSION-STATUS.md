# GALVEC Studio — Session Status

**Last updated**: 2026-05-09
**Skill in use**: `engineering-portfolio-builder`
**Stage reached**: Stage 3 complete (incl. all placeholders) · Pre-deploy phase active · Stage 4 queued

---

## Decisions locked in (no need to re-discuss)

| Item | Decision |
|---|---|
| Brand name | **GALVEC Studio** (G wordmark hides V = AAVL initials) |
| Tagline | Aluminum Engineering · Fabrication-ready 3D modeling and shop drawings |
| Palette | `--ink #1A1A1A` · `--paper #F5F5F0` · `--aluminum #B0BEC5` · `--accent #0A2540` |
| Type | Inter (body) · Space Grotesk (display) · IBM Plex Mono (technical) |
| Logo | `src/assets/galvec-icon.svg` + `src/assets/galvec-lockup.svg` |
| Framework | **Astro 5** (static, no SSR) |
| Hosting | **GitHub Pages** with custom domain `galvecstudio.com` |
| Form backend | **Formspree** form `galvec-contact` → `https://formspree.io/f/mdabpapq` |
| Site copy | Approved at end of Stage 2 — English, US/CA market |
| Positioning | B2B to fabrication shops in US/Canada — "the upstream engineer fab shops outsource modeling and shop drawings to" |
| Public identity | **C. Miranda** (initials only — operational privacy from current employer; no LinkedIn/GitHub in Footer) |
| Public location | "Remote-first" — Dallas residence not disclosed; Florida cities listed as project history only |

## User profile reminder

- Specialization: aluminum — staircases, curtain walls/façades, structural/custom, railings
- Experience: 7+ years (since 2019, primarily as employee at companies — now launching independent practice)
- Currently lives in Dallas, TX (not disclosed publicly); project history exclusively in Florida
- Stack: Inventor + SolidWorks (primary), Rhinoceros + KeyShot (secondary), AutoCAD + Illustrator + Bluebeam (output)
- Has: own renders, on-site photos, DWGs from real projects
- Constraint: holds a day job; does NOT want current employer to discover the side practice

---

## External assets — all secured

| Asset | Status |
|---|---|
| Domain `galvecstudio.com` | ✅ Purchased on Cloudflare Registrar ($10.46) |
| GitHub user `CEMG97` | ✅ Existing account (already runs `baleyawelding.com` — ex-client, no positioning impact) |
| Formspree form `galvec-contact` | ✅ Created — endpoint `https://formspree.io/f/mdabpapq` |
| `cm@galvecstudio.com` email | ⏳ Pending Cloudflare Email Routing setup (free, ~5 min) |
| GitHub repo `CEMG97/galvec-studio` | ⏳ Pending creation + first push |

---

## Build state

✅ `npm install` clean
✅ `npm run dev` runs
✅ All 20 files scaffolded
✅ All placeholders in source files replaced (verified by grep — no remaining `[CITY]`, `YOUR-USERNAME`, `REPLACE_WITH`, etc. in `src/`, `public/`)

---

## Next session — pre-deploy checklist (in order)

Pega esto en Claude Code mañana cuando abras el proyecto:

> Continuamos con GALVEC Studio. Lee `SESSION-STATUS.md`. Listo para fase pre-deploy.

Then we work through, in this order:

### A. Cloudflare Email Routing (~5 min)
- Cloudflare dashboard → galvecstudio.com → Email → Email Routing → enable
- Add custom address `cm@galvecstudio.com` → forward to your personal email
- Verify by sending a test email to `cm@galvecstudio.com`

### B. Local production build verify (~2 min)
- `npm run build` from project root
- Check `dist/sitemap-index.xml` exists and references `galvecstudio.com`
- `npm run preview` and click through all 5 pages locally

### C. Create GitHub repo + first push (~5 min)
- New public repo `CEMG97/galvec-studio` (no README/license — repo will be empty)
- From project root:
  ```bash
  git init
  git add .
  git commit -m "Initial GALVEC Studio site"
  git branch -M main
  git remote add origin https://github.com/CEMG97/galvec-studio.git
  git push -u origin main
  ```
- In repo Settings → Pages → Source: **GitHub Actions**
- Watch the deploy workflow run — should succeed in ~2 min
- Initial URL will be `https://CEMG97.github.io/galvec-studio` (broken images expected because BASE is `/`, not `/galvec-studio` — that's intentional, will resolve once custom domain is wired)

### D. Wire custom domain (~15 min + DNS propagation wait)
- Add `public/CNAME` file with single line `galvecstudio.com`
- Commit + push
- In GitHub repo Settings → Pages → Custom domain → enter `galvecstudio.com`
- In Cloudflare DNS for galvecstudio.com:
  - `A  @  185.199.108.153`  (proxy: DNS only)
  - `A  @  185.199.109.153`  (proxy: DNS only)
  - `A  @  185.199.110.153`  (proxy: DNS only)
  - `A  @  185.199.111.153`  (proxy: DNS only)
  - `CNAME  www  CEMG97.github.io`  (proxy: DNS only)
- Wait 5-10 min for propagation
- Back in GitHub Pages: enable **Enforce HTTPS**
- Verify `https://galvecstudio.com` loads with green padlock

### E. Smoke test live site (~10 min)
- Click through all 5 pages on production
- Submit a real test through the contact form — verify Formspree forwards to `cm@galvecstudio.com`
- Mobile check on a real phone (not just devtools emulation)
- `npx lighthouse https://galvecstudio.com --view` → confirm performance >90

---

## Stage 4 (queued — start after E passes)

- **Real case studies** — convert 3+ of your Florida projects (DWG/photos/renders) into `projects.json` entries with technical copy (specs + tolerances + outcome)
- **`og-cover.jpg`** — design 1200×630 image for LinkedIn/Slack previews
- **Localized SEO** — long-tail keywords for Florida fab shop market (e.g., "Miami aluminum staircase shop drawings", "South Florida curtain wall modeling")
- **Submit to Google Search Console** — verify `galvecstudio.com`, submit sitemap
- **Lighthouse re-audit** — score >90 on mobile post-content

---

## File map quick-ref

| Archivo | Para qué se edita |
|---|---|
| [astro.config.mjs](./astro.config.mjs) | Domain + base path (set: galvecstudio.com, /) |
| [src/data/projects.json](./src/data/projects.json) | Add/edit case studies |
| [src/pages/index.astro](./src/pages/index.astro) | Home — stats, hero |
| [src/pages/work.astro](./src/pages/work.astro) | Gallery (reads projects.json) |
| [src/pages/services.astro](./src/pages/services.astro) | 3 tiers + timeline |
| [src/pages/expertise.astro](./src/pages/expertise.astro) | Stack, standards, founder bio |
| [src/pages/contact.astro](./src/pages/contact.astro) | Form + SLA + Formspree |
| [src/components/Footer.astro](./src/components/Footer.astro) | Email + form link only (no socials) |
| [src/styles/global.css](./src/styles/global.css) | Design tokens |
| [README.md](./README.md) | Setup/deploy guide (snapshot of deployed values) |
