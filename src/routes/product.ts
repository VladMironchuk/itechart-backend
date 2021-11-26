import { NextFunction, Request, Response, Router } from 'express';
import { ProductRepository } from '../repository/product/ProductRepository';
import { NotFoundError } from '../utils/errors/notFoundError';
import validateQuery from '../middlewares/products-query';
import authHandler from '../middlewares/user-auth';
import { updateProductRatingMongo } from '../utils/product-rating-mongo';
import { updateProductRatingPg } from '../utils/product-rating-pg';

const router = Router();

router.get('/', validateQuery, async (req: Request, res: Response, next: NextFunction): Promise<void> => {
  try {
    const products = await ProductRepository.getProductsByQuery(req['validProductQuery']);
    if (!products.length) {
      throw new NotFoundError();
    }
    res.send(products);
  } catch (e: unknown) {
    next(e);
  }
});

router.post('/:id/rate', authHandler, async (req: Request, res: Response, next: NextFunction) => {
  try {
    const { rating, comment } = req.body;
    const product = await ProductRepository.getProductById(req.params.id);
    if (!product) {
      throw new NotFoundError('No such product');
    }
    switch (process.env.DB) {
      case 'mongo':
        //@ts-ignore
        await updateProductRatingMongo(product, req['userId'], +rating, comment);
        break;
      case 'pg':
        //@ts-ignore
        await updateProductRatingPg(product, req['userId'], +rating, comment);
    }
    res.send({message: "Product was rated"})
  } catch (e: unknown) {
    next(e);
  }
});

export default router;
