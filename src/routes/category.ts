import { Router, Request, Response, NextFunction } from 'express';
import { CategoryRepository } from '../repository/category/CategoryRepository';
import mapCategoryQueryMongo from '../utils/queries/mongo-category-query'
import mapCategoryQueryPg from '../utils/queries/pg-category-query'

const router = Router();

router.get('/', async (req: Request, res: Response, next: NextFunction): Promise<void> => {
  try {
    const categories = await CategoryRepository.getAll()
    res.send(categories)
  } catch (e: unknown) {
    next(e)
  }
});

router.get('/:id', async (req: Request, res: Response, next: NextFunction): Promise<void> => {
  try {
    let category
    if(process.env.DB === 'mongo') {
      category = await mapCategoryQueryMongo(req.query, req.params.id)
    }
    if(process.env.DB === 'pg'){
      category = await mapCategoryQueryPg(req.query, req.params.id)
    }
    res.send(category)
  } catch (e: unknown) {
    next(e)
  }
});

export default router