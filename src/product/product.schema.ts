import { z } from 'zod';

export const create = z.object({
  name: z.string(),
  price: z.number().int(),
  category_id: z.number().int(),
});

export type Create = z.infer<typeof create>;

export const update = z.object({
  name: z.string(),
  price: z.number().int(),
  category_id: z.number().int(),
});

export type Update = z.infer<typeof update>;

export const idParam = z.object({
  id: z.coerce.number().int(),
});

export const sortByPrice = z.object({
  price: z.enum(['asc', 'desc']).optional().default('asc'),
});
