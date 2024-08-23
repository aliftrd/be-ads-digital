import { z } from 'zod';

export const create = z.object({
  name: z.string().max(50),
});

export type Create = z.infer<typeof create>;

export const update = z.object({
  name: z.string().max(50),
});

export type Update = z.infer<typeof update>;

export const idParam = z.object({
  id: z.coerce.number().int(),
});
