import { createRequire } from 'node:module';
import { defineCollection } from 'astro:content';
import { z } from 'astro/zod';

const requireModule = createRequire(import.meta.url);
const { glob } = requireModule(
  'astro/loaders',
) as typeof import('astro/loaders');

const isoCalendarDate = /^\d{4}-(0[1-9]|1[0-2])-(0[1-9]|[12]\d|3[01])$/;

const updates = defineCollection({
  loader: glob({ pattern: '**/*.{md,mdx}', base: './src/content/updates' }),
  schema: z
    .object({
      title: z.string().min(1),
      description: z.string().min(1),
      slug: z.string().regex(/^[a-z0-9]+(?:-[a-z0-9]+)*$/),
      publishedAt: z.string().regex(isoCalendarDate),
      updatedAt: z.string().regex(isoCalendarDate).optional(),
      tags: z.array(z.string().min(1)).min(1),
      draft: z.boolean(),
    })
    .superRefine((data, context) => {
      if (data.updatedAt && data.updatedAt < data.publishedAt) {
        context.addIssue({
          code: 'custom',
          message: 'updatedAt must not precede publishedAt',
          path: ['updatedAt'],
        });
      }
    }),
});

export const collections = { updates };
