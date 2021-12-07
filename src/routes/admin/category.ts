import { NextFunction, Request, Response, Router } from 'express';
import { CategoryRepository } from '../../repository/category/CategoryRepository';

const router = Router()

router.get('/:id', async (req: Request, res: Response, next: NextFunction) => {
  try {
    res.send(await CategoryRepository.getById(req.params.id))
  } catch (e) {
    next(e)
  }
})

router.post('/', async (req: Request, res: Response, next: NextFunction) => {
  try {
    await CategoryRepository.create(req.body)
    res.status(201).send({message: 'Category was created'})
  } catch (e) {
    next(e)
  }
})

router.delete('/:id', async (req: Request, res: Response, next: NextFunction) => {
  try {
    await CategoryRepository.delete({ id: req.params.id })
    res.send({message: 'Category was deleted'})
  } catch (e) {
    next(e)
  }
})

router.patch('/:id', async (req: Request, res: Response, next: NextFunction) => {
  try {
    await CategoryRepository.update({id: req.params.id}, req.body)
    res.send({message: 'Category was updated'})
  } catch (e) {
    next(e)
  }
})

export default router