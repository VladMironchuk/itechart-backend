import { NextFunction, Request, Response, Router } from 'express';
import { OrderListRepository } from '../repository/order-list/OrderListRepository';

const router = Router();

router.post('/', async (req: Request, res: Response, next: NextFunction) => {
  try {
    await OrderListRepository.add(req['userId'], req.body.orderList);
    res.send({ message: 'Order list was updated' });
  } catch (e) {
    next(e);
  }
});

router.post('/clear', async (req: Request, res: Response, next: NextFunction) => {
  try {
    await OrderListRepository.clear(req['userId']);
    res.send('Order list was cleared');
  } catch (e) {
    next(e);
  }
});

router.put('/', async (req: Request, res: Response, next: NextFunction) => {
  try {
    await OrderListRepository.update(req['userId'], req.body.orderList);
    res.send({ message: 'Order list was updated' });
  } catch (e) {
    next(e);
  }
});

export default router;
