import mdx from '@astrojs/mdx';
import { defineConfig } from 'astro/config';

export default defineConfig({
  site: 'https://axxessdenied.github.io',
  base: '/SolProject-website/',
  output: 'static',
  integrations: [mdx()],
  build: {
    format: 'directory',
  },
});
