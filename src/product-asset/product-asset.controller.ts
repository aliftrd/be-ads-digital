import { Request, Response, Router } from 'express';
import * as multer from 'multer';
import { validate } from './../lib';
import * as ProductAssetSchema from './product-asset.schema';
import * as ProductAssetService from './product-asset.service';
const productAsset = Router();

const maxFileSize = parseInt(process.env.MAX_FILE_SIZE!) || 5;

const upload = multer({
  storage: multer.memoryStorage(),
  limits: {
    fileSize: maxFileSize * 1024 * 1024,
  },
});

productAsset.get('/product/assets', async (req: Request, res: Response) => {
  const resp = await ProductAssetService.get();

  return res.json(resp);
});

productAsset.post(
  '/product/assets',
  [upload.single('file'), validate('form', ProductAssetSchema.create)],
  async (req: Request, res: Response) => {
    const payload = req.body;
    const file = req.file;

    const resp = await ProductAssetService.create(payload, file!);

    return res.status(200).json(resp);
  },
);

productAsset.put(
  '/product/assets/:id',
  [
    upload.single('file'),
    validate('param', ProductAssetSchema.idParams),
    validate('form', ProductAssetSchema.create),
  ],
  async (req: Request, res: Response) => {
    const { id } = req.params;
    const payload = req.body;
    const file = req.file!;

    const resp = await ProductAssetService.update(parseInt(id), payload, file);

    return res.status(200).json(resp);
  },
);

productAsset.delete(
  '/product/assets/:id',
  validate('param', ProductAssetSchema.idParams),
  async (req: Request, res: Response) => {
    const { id } = req.params;

    await ProductAssetService.destroy(parseInt(id));

    return res.status(200).json({
      message: 'product asset has been deleted',
    });
  },
);

export default productAsset;
