import 'reflect-metadata';
import express from 'express';
require('./utils/passport/passport');

import * as path from 'path';
import { ConnectionController } from './connection/connection';
import productRouter from './routes/product';
import categoryRouter from './routes/category';
import registerRouter from './routes/register';
import authRouter from './routes/authenticate';
import profileRouter from './routes/profile';
import tokenRouter from './routes/token';
import orderListRouter from './routes/order-list';
import adminProduct from './routes/admin/product';

import adminCategory from './routes/admin/category';
import lastRatings from './routes/last-ratings';
import { errorLogger, logger, reqLogger } from './logger/logger';

import { serverConfig } from './config/server-config';
import { task } from './utils/cron/last-ratings-job';
import errorHandler from './middlewares/error-handler';

import accessHandler from './middlewares/rights-handler';
import authHandler from './middlewares/user-auth';
import swaggerUI from 'swagger-ui-express';
import YAML from 'yamljs';
import cors from 'cors';

const port = process.env.PORT ?? serverConfig.PORT;
export const app = express();

const swaggerDocument = YAML.load(path.join(__dirname, '../doc/api.yaml'));

app.use(cors());
app.use(express.json());
app.use('/doc', swaggerUI.serve, swaggerUI.setup(swaggerDocument));
app.use(reqLogger);

app.use('/products', productRouter);
app.use('/categories', categoryRouter);
app.use('/register', registerRouter);
app.use('/authenticate', authRouter);

app.use(authHandler);

app.use('/profile', profileRouter);
app.use('/token', tokenRouter);
app.use('/order-list', orderListRouter);

app.use('/admin/products', accessHandler(['admin']), adminProduct);
app.use('/admin/categories', accessHandler(['admin']), adminCategory);

app.use('/last-ratings', lastRatings);

app.use(errorHandler);
app.use(errorLogger);

(async () => {
  try {
    await ConnectionController.createConnection();
    task.start();
    app.listen(port, (): void => {
      logger.info(`Server is running on http://localhost:${port}`);
    });
  } catch (e: unknown) {
    logger.error(e);
  }
})();
