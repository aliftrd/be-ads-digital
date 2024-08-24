import { errorHandler } from './utils/error.handler';
import 'dotenv/config';
import * as express from 'express';
import helmet from 'helmet';
import CategoryController from './category/category.controller';
import ProductController from './product/product.controller';
import { log } from 'console';

const app = express();
const port = process.env.PORT || 3000;

app.use(
  helmet({
    xXssProtection: true,
  }),
);
app.use(express.json());

// Register your route in here
app.use(CategoryController);
app.use(ProductController);

// Global Error Handler
app.use(errorHandler);
app.use('*', (req, res) => {
  const method = req.method;
  const path = req.originalUrl;

  return res.status(404).json({
    message: `Route ${method} ${path} not found`,
  });
});

app.listen(port, () => {
  console.log('Server running in :', port);
});
