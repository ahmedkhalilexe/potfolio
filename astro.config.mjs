import { defineConfig } from 'astro/config';
import tailwindcss from '@tailwindcss/vite';
import sitemap from '@astrojs/sitemap';

// https://astro.build/config
export default defineConfig({
  // PLACEHOLDER: Replace 'https://amrani.dev' with your real production domain or Cloudflare Pages URL (e.g. 'https://portfolio-xxx.pages.dev')
  site: 'https://amrani.dev',

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
