import { PutObjectCommand, S3Client } from '@aws-sdk/client-s3';
import { nanoid } from 'nanoid';

const client = new S3Client({
  forcePathStyle: true,
  region: process.env.SUPABASE_S3_REGION!,
  endpoint: process.env.SUPABASE_S3_URL!,
  credentials: {
    accessKeyId: process.env.SUPABASE_S3_ACCESS_KEY!,
    secretAccessKey: process.env.SUPABASE_S3_SECRET_KEY!,
  },
});

export const uploadFile = async (file: Express.Multer.File) => {
  const fileKey = nanoid(10) + '_' + file.originalname;

  const uploadCommand = new PutObjectCommand({
    Bucket: 'product-assets',
    Key: fileKey,
    Body: file.buffer,
    ContentType: file.mimetype,
  });

  await client.send(uploadCommand);

  const baseUrl = process.env.SUPABASE_S3_URL!.replace(
    's3',
    'object/public/avatar/',
  );
  const imageUrl = `${baseUrl}${fileKey}`;

  return imageUrl;
};
