import { NextFunction, Request, Response, Router } from 'express';
import { ProductRepository } from '../repository/product/ProductRepository';
import validateQuery from '../middlewares/products-query'
import { NotFoundError } from '../utils/errors/notFoundError';

export const router = Router();
router.get('/',validateQuery, async (req: Request, res: Response, next: NextFunction): Promise<void> => {
  try {
    const productRepository = new ProductRepository();
    const products = await productRepository.getProductsByQuery(req['validProductQuery']);
    if(!products.length) {
      throw new NotFoundError()
    }
    res.send(products);
  } catch (e: any) {
    next(e)
  }
});
