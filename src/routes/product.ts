import { Router } from 'express';
import { logger } from '../logger/logger';
import { ProductRepository } from '../repository/product/ProductRepository';
import mapQuery from '../utils/mongo-product-query';
import mapQueryPg from '../utils/pg-product-query';
import { InvalidDataError } from '../utils/errors/invalidDataError';

export const router = Router();

router.get('/', async (req, res): Promise<void> => {
  try {
    let mappedQuery;
    if (process.env.DB === 'mongo') {
      mappedQuery = mapQuery(req.query);
    }
    if (process.env.DB === 'pg') {
      mappedQuery = mapQueryPg(req.query);
    }
    console.log(mappedQuery);
    const productRepository = new ProductRepository();
    const products = await productRepository.getProductsByQuery(mappedQuery);
    if(!products.length) {
      throw new InvalidDataError(404, "No data found")
    }
    res.send(products);
  } catch (e: any) {
    res.status(e.errorStatus).send(e.message)
    logger.error(e.message);
  }
});
