import rss from '@astrojs/rss';
import { getCollection } from 'astro:content';
import type { APIContext } from 'astro';
import { localizeStream } from '@/i18n/utils';

export async function GET(context: APIContext) {
  const all = await getCollection('stream', e => !e.data.draft);
  const items = localizeStream(all, 'sv');
  return rss({
    title: 'Emil Freijd — Flöde',
    description: 'Case, projekt och texter från Emil Freijd.',
    site: context.site!,
    items: items
      .sort((a, b) => b.data.date.getTime() - a.data.date.getTime())
      .map(e => ({
        title: e.data.title,
        pubDate: e.data.date,
        description: e.data.description,
        link: `/sv/stream/${e.id}/`,
      })),
    customData: '<language>sv</language>',
  });
}
