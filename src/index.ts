import 'reflect-metadata';
import express, { Application } from 'express';
import { ConnectionController } from './connection/connection';
import { router as productRouter } from './routes/product';
import { router as categoryRouter } from './routes/category';
import { errorLogger, logger, reqLogger } from './logger/logger';
import { serverConfig } from './config/server-config';
import { ProductRepository } from './repository/product/ProductRepository';
import { Product } from './entity/product';

const port = process.env.PORT ?? serverConfig.PORT;
const app: Application = express();

app.use(express.json());
app.use(reqLogger);

app.use('/products', productRouter);
app.use('/categories', categoryRouter);

app.use(errorLogger)

async function start(): Promise<void> {
  try {
    await ConnectionController.createConnection();
    // const productRepository = new ProductRepository();
    // const fwewe =await ConnectionController.getConnection().getRepository(Product)
    //   .createQueryBuilder('product')
    //   .where('product.price < :price')
    //   .setParameter('price', Infinity)
    //   .getMany()
    // console.log(fwewe);
    // const categoryRepository = new CategoryRepository();
    // const categories = await categoryRepository.getCategories();
    // const products = await productRepository.getProducts();
    // console.log(products);
    // console.log(categories);
    app.listen(port, (): void => {
      logger.info(`Server is running on http://localhost:${port}`);
    });
  } catch (e: unknown) {
    logger.error(e);
  }
}

start();
