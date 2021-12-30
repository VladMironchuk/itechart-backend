import { Router, Request, Response, NextFunction } from 'express';
import { CategoryRepository } from '../repository/category/CategoryRepository';
import mapCategoryQueryMongo from '../utils/queries/mongo-category-query';
import mapCategoryQueryPg from '../utils/queries/pg-category-query';
import { NotFoundError } from '../utils/errors/notFoundError';
import { categoryPg } from '../dto/category/category-pg.dto';
import { categoryMongo } from '../dto/category/category-mongo.dto';

const router = Router();

router.get('/', async (req: Request, res: Response, next: NextFunction): Promise<void> => {
  try {
    const categories = await CategoryRepository.getAll();
    if (!categories.length) {
      throw new NotFoundError();
    }
    res.send(categories);
  } catch (e: unknown) {
    next(e);
  }
});

router.get('/:id', async (req: Request, res: Response, next: NextFunction): Promise<void> => {
  try {
    let category: categoryPg | categoryMongo;
    switch (process.env.DB) {
      case 'mongo':
        category = await mapCategoryQueryMongo(req.query, req.params.id);
        break;
      case 'pg':
        category = await mapCategoryQueryPg(req.query, req.params.id);
        break;
    }
    res.send(category);
  } catch (e: unknown) {
    next(e);
  }
});

export default router;
