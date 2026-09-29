import { defineCollection, z } from 'astro:content';
import { glob } from 'astro/loaders';

const projects = defineCollection({
  loader: glob({ pattern: '**/*.md', base: './src/content/projects' }),
  schema: z.object({
    title: z.string(),
    tagline: z.string(),
    role: z.string(),
    period: z.string(),
    status: z.enum(['Active', 'Completed', 'In Progress', 'Production']),
    featured: z.boolean().default(false),
    order: z.number().default(0),
    tags: z.array(z.string()),
    metrics: z.array(z.string()).optional(),
    github: z.string().optional(),
    liveUrl: z.string().optional(),
    architectureType: z.string().optional(),
  }),
});

export const collections = { projects };
