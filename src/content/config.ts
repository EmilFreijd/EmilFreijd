import { defineCollection, z } from 'astro:content';

const work = defineCollection({
  type: 'content',
  schema: z.object({
    title:       z.string(),
    description: z.string(),
    sector:      z.enum(['public-sector', 'defence', 'enterprise', 'other']),
    year:        z.number(),
    tags:        z.array(z.string()),
    metrics:     z.array(z.object({ value: z.string(), label: z.string() })),
    featured:    z.boolean().default(false),
    draft:       z.boolean().default(false),
  }),
});

export const collections = { work };
