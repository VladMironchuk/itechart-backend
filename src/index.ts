import 'reflect-metadata';
import express, { Application } from 'express';
import { ConnectionController } from './connection/connection';
import productRouter from './routes/product';
import categoryRouter  from './routes/category';
import registerRouter from './routes/register';
import authRouter from './routes/authenticate'
import profileRouter from './routes/profile'
import { errorLogger, logger, reqLogger } from './logger/logger';
import { serverConfig } from './config/server-config';
import errorHandler from './middlewares/error-handler'

const port = process.env.PORT ?? serverConfig.PORT;
const app: Application = express();

app.use(express.json());
app.use(reqLogger);

app.use('/products', productRouter);
app.use('/categories', categoryRouter);
app.use('/register', registerRouter)
app.use('/authenticate', authRouter)
app.use('/profile', profileRouter)

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
