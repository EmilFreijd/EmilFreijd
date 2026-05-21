import { defineConfig } from 'astro/config';
import mdx from '@astrojs/mdx';

export default defineConfig({
  site: 'https://emilfreijd.github.io',
  base: '/EmilFreijd',
  trailingSlash: 'always',
  i18n: {
    defaultLocale: 'en',
    locales: ['en', 'sv'],
    routing: { prefixDefaultLocale: false },
  },
  integrations: [mdx()],
});
