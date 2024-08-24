import { z } from 'zod';

const maxFileSize = parseInt(process.env.MAX_FILE_SIZE!) * 1024 * 1024;
const ACCEPTED_IMAGE_TYPES = ['image/jpeg', 'image/png', 'image/webp'];
const fileSchema = z
  .custom<Express.Multer.File | undefined>() // Custom validation for Multer file
  .refine((file) => file != null, 'Image is required.')
  .refine(
    (file) => file?.size !== undefined && file.size <= maxFileSize,
    `Max file size is ${process.env.MAX_FILE_SIZE}MB.`,
  )
  .refine(
    (file) => ACCEPTED_IMAGE_TYPES.includes(file?.mimetype || ''),
    '.jpg, .jpeg, .png, and .webp files are accepted.',
  );

export const create = z.object({
  product_id: z.string(),
  file: fileSchema,
});

export type Create = z.infer<typeof create>;

export const update = z.object({
  product_id: z.string(),
  file: fileSchema,
});

export type Update = z.infer<typeof update>;

export const idParams = z.object({
  id: z.coerce.number().int(),
});
