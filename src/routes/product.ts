import { NextFunction, Request, Response, Router } from 'express';
import { ProductRepository } from '../repository/product/ProductRepository';
import { InvalidDataError } from '../utils/errors/invalidDataError';
import validateQuery from '../middlewares/products-query'

export const router = Router();
router.get('/',validateQuery, async (req: Request, res: Response, next: NextFunction): Promise<void> => {
  try {
    const productRepository = new ProductRepository();
    const products = await productRepository.getProductsByQuery(req['validProductQuery']);
    if(!products.length) {
      throw new InvalidDataError(404, "No data found")
    }
    res.send(products);
  } catch (e: any) {
    next(e)
  }
});
