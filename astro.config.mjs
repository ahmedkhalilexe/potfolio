import { defineConfig } from 'astro/config';
import tailwindcss from '@tailwindcss/vite';
import sitemap from '@astrojs/sitemap';

// https://astro.build/config
export default defineConfig({
  // Production Cloudflare Pages URL
  site: 'https://potfolio-khalil.pages.dev',

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
