import { defineCollection, z } from 'astro:content';

const stream = defineCollection({
  type: 'content',
  schema: z.object({
    title:       z.string(),
    description: z.string(),
    date:        z.coerce.date(),
    kind:        z.enum(['case', 'project', 'essay', 'update']),
    timeless:    z.boolean().default(false),
    featured:    z.boolean().default(false),
    draft:       z.boolean().default(false),
    sector:      z.enum(['public-sector', 'defence', 'enterprise', 'personal', 'other']).optional(),
    metrics:     z.array(z.object({ value: z.string(), label: z.string() })).optional(),
    tags:        z.array(z.string()).optional(),
  }),
});

export const collections = { stream };
