import { defineConfig } from 'astro/config';
import mdx from '@astrojs/mdx';

export default defineConfig({
  site: 'https://emilfreijd.github.io',
  base: '/EmilFreijd',
  integrations: [mdx()],
});
