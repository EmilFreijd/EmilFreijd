import { defineCollection } from 'astro:content';
import { z } from 'astro/zod';
import { glob } from 'astro/loaders';

const stream = defineCollection({
  loader: glob({ pattern: '**/*.mdx', base: './src/content/stream' }),
  schema: z.object({
    title:       z.string(),
    description: z.string(),
    date:        z.coerce.date(),
    kind:        z.enum(['case', 'project', 'essay', 'update']),
    timeless:    z.boolean().default(false),
    featured:    z.boolean().default(false),
    draft:       z.boolean().default(false),
    lang:        z.enum(['en', 'sv']).default('en'),
    sector:      z.enum(['public-sector', 'defence', 'enterprise', 'personal', 'other']).optional(),
    metrics:     z.array(z.object({ value: z.string(), label: z.string() })).optional(),
    tags:        z.array(z.string()).optional(),
  }),
});

export const collections = { stream };
