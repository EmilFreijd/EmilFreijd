import rss from '@astrojs/rss';
import { getCollection } from 'astro:content';
import type { APIContext } from 'astro';

export async function GET(context: APIContext) {
  const items = await getCollection('stream', e => !e.data.draft && e.data.lang !== 'sv');
  return rss({
    title: 'Emil Freijd — Stream',
    description: 'Cases, projects, and essays from Emil Freijd.',
    site: context.site!,
    items: items
      .sort((a, b) => b.data.date.getTime() - a.data.date.getTime())
      .map(e => ({
        title: e.data.title,
        pubDate: e.data.date,
        description: e.data.description,
        link: `/stream/${e.id}/`,
      })),
    customData: '<language>en</language>',
  });
}
