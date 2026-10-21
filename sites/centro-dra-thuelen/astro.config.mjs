import { defineConfig } from 'astro/config';
import sitemap from '@astrojs/sitemap';

// Trocar para o domínio próprio assim que ele for apontado na Netlify.
const SITE = process.env.SITE_URL || 'https://centrodrathuelen.netlify.app';

export default defineConfig({
  site: SITE,
  trailingSlash: 'always',
  build: { inlineStylesheets: 'always', format: 'directory' },
  compressHTML: true,
  integrations: [sitemap({ filter: (p) => !p.includes('/404') })],
});
