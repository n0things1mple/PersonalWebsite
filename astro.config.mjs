// @ts-check
import { defineConfig } from 'astro/config';

import react from '@astrojs/react';
import tailwindcss from '@tailwindcss/vite';
import mdx from '@astrojs/mdx';
import sitemap from '@astrojs/sitemap';

// https://astro.build/config
export default defineConfig({
  site: 'https://example.com', // TODO: 替换为你的域名
  integrations: [react(), mdx(), sitemap()],
  vite: {
    plugins: [tailwindcss()],
    ssr: {
      noExternal: ['framer-motion'],
    },
  },
});
