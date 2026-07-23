import { defineConfig } from 'astro/config';
import mdx from '@astrojs/mdx';
import sitemap from '@astrojs/sitemap';
import { fileURLToPath } from 'node:url';
import {
  createStreamSitemapSerializer,
  loadStreamSitemapMetadata,
} from './scripts/sitemap-content.mjs';

const streamContentDirectory = fileURLToPath(new URL('./src/content/stream/', import.meta.url));
const streamSitemapMetadata = loadStreamSitemapMetadata(streamContentDirectory);

export default defineConfig({
  site: 'https://emilfreijd.se',
  base: '/',
  trailingSlash: 'always',
  i18n: {
    defaultLocale: 'en',
    locales: ['en', 'sv'],
    routing: { prefixDefaultLocale: false },
  },
  integrations: [
    mdx(),
    sitemap({
      i18n: {
        defaultLocale: 'en',
        locales: { en: 'en', sv: 'sv' },
      },
      serialize: createStreamSitemapSerializer(streamSitemapMetadata),
    }),
  ],
});
