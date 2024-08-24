import * as ProductAssetSchema from './product-asset.schema';
import * as ProductRepository from './product-asset.repository';
import { uploadFile } from './../s3';
import { tryit } from 'radash';

export async function get() {
  const productAssets = await ProductRepository.findAll();

  return { data: productAssets };
}

export async function create(
  payload: ProductAssetSchema.Create,
  file: Express.Multer.File,
) {
  const [errFileUpload, fileUrl] = await tryit(
    async () => await uploadFile(file),
  )();

  if (errFileUpload) {
    throw new Error('failed to upload file');
  }

  const productAsset = await ProductRepository.create({
    product_id: parseInt(payload.product_id),
    image: fileUrl,
  });

  return { message: 'new product has been created', data: productAsset };
}

export async function update(
  id: number,
  payload: ProductAssetSchema.Update,
  file: Express.Multer.File,
) {
  const [errFileUpload, fileUrl] = await tryit(
    async () => await uploadFile(file),
  )();

  if (errFileUpload) {
    throw new Error('failed to upload file');
  }

  await ProductRepository.update(id, {
    product_id: parseInt(payload.product_id),
    image: fileUrl,
  });

  return { essage: 'product has been updated' };
}

export async function destroy(id: number) {
  await ProductRepository.destroy(id);

  return { message: 'product has been deleted' };
}
