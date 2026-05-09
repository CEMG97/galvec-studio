# GALVEC Studio — Portfolio Site

Aluminum engineering portfolio for GALVEC Studio. Built with [Astro](https://astro.build), deployed on GitHub Pages.

---

## 1. Local development

Requires Node 20+.

```bash
npm install
npm run dev
```

Open http://localhost:4321 (Astro will print the exact port).

```bash
npm run build       # production build to ./dist
npm run preview     # preview the production build locally
```

---

## 2. Configuration (snapshot of deployed values)

| Where | Value |
|---|---|
| `astro.config.mjs` SITE | `https://galvecstudio.com` |
| `astro.config.mjs` BASE | `/` |
| `contact.astro` FORMSPREE_ENDPOINT | `https://formspree.io/f/mdabpapq` (form `galvec-contact`) |
| Public email | `cm@galvecstudio.com` (Cloudflare Email Routing → personal inbox) |
| Public name | `C. Miranda` (initials only — operational privacy from current employer) |
| Social links in Footer | None — LinkedIn/GitHub intentionally omitted |
| Disponibilidad copy | `Currently accepting new projects` |
| Region copy | Florida cities listed (Miami, WPB, Orlando, Tampa, Sarasota); remote-first US/CA |

---

## 3. Deploying to GitHub Pages

1. Create a new GitHub repo named `galvec-studio` under user `CEMG97` (public).
2. Push the project:
   ```bash
   git init
   git add .
   git commit -m "Initial GALVEC Studio site"
   git branch -M main
   git remote add origin https://github.com/CEMG97/galvec-studio.git
   git push -u origin main
   ```
3. In the GitHub repo: **Settings → Pages → Source: GitHub Actions**.
4. The workflow at `.github/workflows/deploy.yml` runs automatically on every push to `main`.
5. First deploy takes ~2 minutes. URL is printed in the Actions tab.

### Custom domain (galvecstudio.com — already purchased on Cloudflare)

1. In GitHub: **Settings → Pages → Custom domain** → `galvecstudio.com`.
2. Add a `CNAME` file to `public/` containing the line `galvecstudio.com` (no protocol, no trailing slash).
3. In Cloudflare DNS, add these records (proxy OFF — set to "DNS only" for GitHub Pages):
   - `A  @  185.199.108.153`
   - `A  @  185.199.109.153`
   - `A  @  185.199.110.153`
   - `A  @  185.199.111.153`
   - `CNAME  www  CEMG97.github.io`
4. In GitHub Pages, enable **Enforce HTTPS** (becomes available after DNS propagates, ~10 min).
5. SSL cert provisions automatically via Let's Encrypt — usually <1 hour.

---

## 4. Project structure

```
galvec-studio/
├── public/                       # Static assets served at site root
│   ├── favicon.svg
│   └── robots.txt
├── src/
│   ├── assets/                   # Brand SVGs (icon + lockup)
│   ├── components/               # Header, Footer
│   ├── data/projects.json        # Project gallery data — edit to add case studies
│   ├── layouts/Base.astro        # HTML shell, meta tags, fonts
│   ├── pages/                    # Each .astro file becomes a route
│   │   ├── index.astro           # /
│   │   ├── work.astro            # /work
│   │   ├── services.astro        # /services
│   │   ├── expertise.astro       # /expertise
│   │   └── contact.astro         # /contact
│   └── styles/global.css         # Design tokens + base styles
├── .github/workflows/deploy.yml  # Auto-deploy on push to main
├── astro.config.mjs
└── package.json
```

---

## 5. Adding a new project to the gallery

Edit `src/data/projects.json`:

```json
{
  "slug": "your-project-slug",
  "title": "PROJECT NAME",
  "category": "Staircases",
  "client_type": "Residential",
  "year": 2025,
  "summary": "1-2 sentence technical description with specific specs.",
  "outcome": "What happened after fabrication.",
  "deliverables": ["Inventor model", "Shop drawings", "BOM"]
}
```

Categories: `Staircases`, `Façades`, `Railings`, `Custom`. The filter on `/work` updates automatically based on what categories appear in the JSON.

---

## 6. SEO checklist before launch

- [x] Replace all `[CITY]` and placeholder values
- [x] Footer social links — intentionally omitted (privacy)
- [ ] Configure Cloudflare Email Routing for `cm@galvecstudio.com` → personal inbox
- [ ] Generate `og-cover.jpg` (1200×630 px) and place in `public/`
- [ ] Add at least 3 real project case studies to `projects.json`
- [ ] Run `npm run build` and check `dist/sitemap-index.xml` exists
- [ ] Test the contact form end-to-end (Formspree should email confirmation to the form-owner)
- [ ] Submit `https://galvecstudio.com/sitemap-index.xml` to Google Search Console
- [ ] Verify Lighthouse mobile performance >90 (`npx lighthouse https://galvecstudio.com --view`)

### Primary SEO keywords (US market)

- `aluminum staircase design engineer`
- `shop drawings fabrication specialist`
- `Autodesk Inventor 3D modeling services`
- `aluminum railing system design`
- `custom aluminum fabrication drawings`
- `aluminum curtain wall shop drawings`
- `structural aluminum canopy design`
- `fabrication-ready 3D models AEC`

---

## 7. Brand reference

- **Name**: GALVEC Studio
- **Tagline**: Aluminum Engineering · Fabrication-ready 3D modeling and shop drawings
- **Colors**: `--ink #1A1A1A` · `--paper #F5F5F0` · `--aluminum #B0BEC5` · `--accent #0A2540`
- **Type**: Inter (body), Space Grotesk (display), IBM Plex Mono (technical accents)
- **Logo**: `src/assets/galvec-icon.svg` (square mark) + `src/assets/galvec-lockup.svg` (horizontal lockup)

---

## License

Site code: MIT. Brand assets (SVGs, copy, name): all rights reserved.
