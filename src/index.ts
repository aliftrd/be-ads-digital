import { errorHandler } from './utils/exception';
import 'dotenv/config';
import * as express from 'express';
import helmet from 'helmet';
import productRoutes from './products/product.routes';

const app = express();
const port = process.env.PORT || 3000;

app.use(
  helmet({
    xXssProtection: true,
  }),
);

app.use(errorHandler);

// Register your route in here
app.use(productRoutes);

app.listen(port, () => {
  console.log('Server running in :', port);
});
