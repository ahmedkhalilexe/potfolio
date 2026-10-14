import { defineConfig } from 'astro/config';
import tailwindcss from '@tailwindcss/vite';
import sitemap from '@astrojs/sitemap';

// https://astro.build/config
export default defineConfig({
  // Production Cloudflare URL (or your custom domain when attached)
  site: 'https://potfolio-khalil.amraniahmedkhalil.workers.dev',

  integrations: [sitemap()],

  vite: {
    plugins: [tailwindcss()],
  },

  markdown: {
    shikiConfig: {
      themes: {
        dark: 'tokyo-night',
        light: 'github-light',
      },
      wrap: true,
    },
  },
});
