import { Router } from 'express';
import { getAllProduct } from './product.controller';
const router = Router();

router.get('/products', getAllProduct);

export default router;
