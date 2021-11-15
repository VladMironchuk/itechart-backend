import { Router } from 'express';
import { logger } from '../logger/logger';
import { CategoryRepository } from '../repository/category/CategoryRepository';
import mapCategoryQueryMongo from '../utils/mongo-category-query'
import mapCategoryQueryPg from '../utils/pg-category-query'

export const router = Router();

router.get('/', async (req, res): Promise<void> => {
  try {
    const categoryRepo = new CategoryRepository()
    const categories = await categoryRepo.getCategories()
    res.send(categories)
  } catch (e: unknown) {
    res.status(403);
    logger.error(e);
  }
});

router.get('/:id', async (req, res): Promise<void> => {
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
    res.status(403);
    logger.error(e);
  }
});