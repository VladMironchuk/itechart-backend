import { NextFunction, Request, Response, Router } from 'express';
import { ProductRepository } from '../../repository/product/ProductRepository';

const router = Router()

router.get('/:id', async (req: Request, res: Response, next: NextFunction) => {
  try {
    res.send(await ProductRepository.getById(req.params.id))
  } catch (e) {
    next(e)
  }
})

router.post('/', async (req: Request, res: Response, next: NextFunction) => {
  try {
    await ProductRepository.create(req.body)
    res.status(201).send({message: 'Product was created'})
  } catch (e) {
    next(e)
  }
})

router.delete('/:id', async (req: Request, res: Response, next: NextFunction) => {
  try {
    await ProductRepository.delete({ id: req.params.id })
    res.send({message: 'Product was deleted'})
  } catch (e) {
    next(e)
  }
})

router.patch('/:id', async (req: Request, res: Response, next: NextFunction) => {
  try {
    await ProductRepository.update({id: req.params.id}, req.body)
    res.send({message: 'Product was updated'})
  } catch (e) {
    next(e)
  }
})

export default router
