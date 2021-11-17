import 'reflect-metadata';
import express, { Application } from 'express';
import { ConnectionController } from './connection/connection';
import { router as productRouter } from './routes/product';
import { router as categoryRouter } from './routes/category';
import { errorLogger, logger, reqLogger } from './logger/logger';
import { serverConfig } from './config/server-config';
import errorHandler from './middlewares/error-handler'

const port = process.env.PORT ?? serverConfig.PORT;
const app: Application = express();

app.use(express.json());
app.use(reqLogger);

app.use('/products', productRouter);
app.use('/categories', categoryRouter);

app.use(errorHandler)
app.use(errorLogger)

async function start(): Promise<void> {
  try {
    await ConnectionController.createConnection();
    app.listen(port, (): void => {
      logger.info(`Server is running on http://localhost:${port}`);
    });
  } catch (e: unknown) {
    logger.error(e);
  }
}

start();
