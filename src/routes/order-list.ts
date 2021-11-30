import { NextFunction, Request, Response, Router } from 'express';
import { OrderListRepository } from '../repository/order-list/OrderListRepository';
import { OrderList } from '../models/order-list';

const router = Router();

router.post('/', async (req: Request, res: Response, next: NextFunction) => {
  try {
    const { userOrder } = req.body;
    const orderList = (await OrderListRepository.getAll(req['userId'])) as OrderList;

    let products = orderList.products;
    const orderProducts = products.map((item) => item.product);

    userOrder.forEach((item) => {
      if (orderProducts.includes(item.product)) {
        products[orderProducts.indexOf(item.product)].quantity += +item.quantity;
      } else {
        products = [...products, { product: item.product, quantity: +item.quantity }];
      }
    });

    await OrderListRepository.update(req['userId'], products);
    res.send({ message: 'Order list was updated' });
  } catch (e) {
    next(e);
  }
});

router.post('/clear', async (req: Request, res: Response, next: NextFunction) => {
  try {
    await OrderListRepository.update(req['userId'], []);
    res.send('Order list was cleared');
  } catch (e) {
    next(e);
  }
});

export default router;
