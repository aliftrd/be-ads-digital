import { errorHandler } from './utils/error.handler';
import 'dotenv/config';
import * as express from 'express';
import helmet from 'helmet';
import CategoryController from './category/category.controller';

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

// Global Error Handler
app.use(errorHandler);

app.listen(port, () => {
  console.log('Server running in :', port);
});
