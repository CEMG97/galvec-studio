import { defineConfig } from 'astro/config';
import sitemap from '@astrojs/sitemap';

// Production: custom domain galvecstudio.com (purchased on Cloudflare).
// Repo: github.com/CEMG97/galvec-studio
const SITE = 'https://galvecstudio.com';
const BASE = '/';

export default defineConfig({
  site: SITE,
  base: BASE,
  trailingSlash: 'never',
  build: {
    format: 'directory',
    assets: '_assets'
  },
  integrations: [sitemap()],
  vite: {
    build: {
      cssMinify: 'lightningcss'
    }
  }
});
