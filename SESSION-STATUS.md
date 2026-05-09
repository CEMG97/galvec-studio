# GALVEC Studio — Session Status

**Last updated**: 2026-05-09
**Skill in use**: `engineering-portfolio-builder`
**Stage reached**: Stage 3 ✅ + Pre-deploy ✅ → **SITE IS LIVE** 🟢 → Stage 4 queued

---

## 🟢 LIVE STATUS

- **Production URL**: https://galvecstudio.com (HTTPS valid, deployed via GitHub Actions)
- **Repo**: https://github.com/CEMG97/galvec-studio (public, main branch)
- **CDN/DNS**: Cloudflare (proxy: DNS only — required for GitHub Pages cert)
- **Email**: `cm@galvecstudio.com` → forwards to personal inbox via Cloudflare Email Routing
- **Form backend**: Formspree `galvec-contact` → `https://formspree.io/f/mdabpapq`
- **Deploy trigger**: Auto on push to `main` (workflow at `.github/workflows/deploy.yml`)

## What was achieved this session (2026-05-09)

1. ✅ All Stage 3 placeholders replaced with real values
2. ✅ Privacy decisions applied: public name `C. Miranda` only, no LinkedIn/GitHub in Footer, Dallas not disclosed
3. ✅ Bug fix: installed missing `lightningcss` devDependency (gap in original scaffold)
4. ✅ Cloudflare Email Routing configured (`cm@galvecstudio.com`)
5. ✅ GitHub repo `CEMG97/galvec-studio` created and pushed
6. ✅ Local git config set per-repo with pseudonymous identity (`C. Miranda` + GitHub noreply email) — global git config untouched
7. ✅ `*.zip` added to `.gitignore` to keep handoff archives out of repo
8. ✅ `public/CNAME` added for custom domain
9. ✅ Cloudflare DNS records configured (4× A + CNAME, proxy OFF)
10. ✅ GitHub Pages custom domain set + Enforce HTTPS enabled
11. ✅ Live smoke-test passed — site loads on HTTPS

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

## User profile reminder

- Specialization: aluminum — staircases, curtain walls/façades, structural/custom, railings
- Experience: 7+ years (since 2019, mostly as employee — launching independent now)
- Lives in Dallas, TX (private); project history exclusively Florida (Miami, WPB, Orlando, Tampa, Sarasota)
- Stack: Inventor + SolidWorks (primary), Rhinoceros + KeyShot (secondary), AutoCAD + Illustrator + Bluebeam (output)
- Has: own renders, on-site photos, DWGs from real projects
- Constraint: holds a day job; current employer must NOT discover the side practice

---

## Next session — Stage 4 checklist (in order)

Pega esto en Claude Code la próxima vez:

> Continuamos con GALVEC Studio. Lee `SESSION-STATUS.md`. Sitio live en galvecstudio.com. Arrancamos Stage 4.

Then we work through:

### Stage 4.A — End-to-end contact form test (~5 min)
- From a different email, submit the contact form on https://galvecstudio.com/contact
- Confirm Formspree forwards the submission to `cm@galvecstudio.com` → which forwards to personal inbox
- First Formspree submission will require email confirmation step (Formspree sends a "click to verify this form" link to the form-owner's email — one-time only)

### Stage 4.B — Real case studies in `projects.json` (variable time)
- Pick 3+ of your real Florida projects (DWG/photos/renders required)
- For each: Inventor model screenshot + 1-2 on-site photos + technical copy (specs + tolerances + outcome)
- Edit `src/data/projects.json` per the schema documented in README.md section 5
- Suggested first 3 categories: 1× staircase, 1× façade/curtain wall, 1× railing — to demo full range

### Stage 4.C — `og-cover.jpg` for social previews (~30 min design)
- 1200×630 px JPG, place in `public/og-cover.jpg`
- Should include: GALVEC wordmark, tagline, dominant aluminum render or photo from your portfolio
- Reference `src/layouts/Base.astro` for how the og:image meta tag picks it up

### Stage 4.D — Localized SEO (~1 hour copy work)
- Long-tail keywords for Florida fab shop market:
  - "Miami aluminum staircase shop drawings"
  - "South Florida curtain wall modeling"
  - "Tampa aluminum railing engineer"
  - "West Palm Beach structural aluminum"
- Weave 2-3 of these naturally into `index.astro` and `services.astro` copy
- Add `<meta name="keywords">` to Base.astro (low ranking signal but free to do)

### Stage 4.E — Google Search Console (~10 min)
- https://search.google.com/search-console → add `galvecstudio.com` as property
- Verification: add a TXT record in Cloudflare DNS (Google gives you the value)
- Submit `https://galvecstudio.com/sitemap-index.xml`
- Within ~3-7 days the site starts appearing in indexed pages

### Stage 4.F — Lighthouse audit (~5 min)
- `npx lighthouse https://galvecstudio.com --view` (locally — opens browser report)
- Target: Performance >90, Accessibility >95, Best Practices >95, SEO 100
- If anything is below target, fix before promoting the URL anywhere

---

## File map quick-ref

| Archivo | Para qué se edita |
|---|---|
| [src/data/projects.json](./src/data/projects.json) | Add/edit case studies (Stage 4.B) |
| [src/pages/index.astro](./src/pages/index.astro) | Home — hero + SEO copy |
| [src/pages/work.astro](./src/pages/work.astro) | Gallery (reads projects.json) |
| [src/pages/services.astro](./src/pages/services.astro) | 3 tiers + timeline + SEO copy |
| [src/pages/expertise.astro](./src/pages/expertise.astro) | Stack, standards, founder bio |
| [src/pages/contact.astro](./src/pages/contact.astro) | Form + SLA + Formspree |
| [src/layouts/Base.astro](./src/layouts/Base.astro) | Meta tags, og:image, fonts |
| [src/styles/global.css](./src/styles/global.css) | Design tokens |
| [public/og-cover.jpg](./public/og-cover.jpg) | TO BE CREATED for Stage 4.C |
| [README.md](./README.md) | Setup/deploy guide (snapshot of deployed values) |

---

## Deploy workflow — how to update the live site

After any local edit:

```bash
cd C:\Users\miran\OneDrive\Escritorio\Projects\galvec-studio
git add .
git commit -m "describe what changed"
git push
```

GitHub Actions auto-builds and deploys to galvecstudio.com in ~2 min. Watch progress at https://github.com/CEMG97/galvec-studio/actions
