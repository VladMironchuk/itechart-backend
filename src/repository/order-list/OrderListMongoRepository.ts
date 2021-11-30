import { IOrderListRepository } from './IOrderListRepository';
import { OrderList } from '../../models/order-list';
import OrderListMongo from '../../models/order-list';
import { orderList } from '../../dto/order-list-mongo';

const ORDER_LIST_MONGO_KEYS = 'id products userId';

export class OrderListMongoRepository implements IOrderListRepository<OrderList, orderList> {
  async getAll(userId: string): Promise<OrderList> {
    return OrderListMongo.findOne({ userId }, ORDER_LIST_MONGO_KEYS);
  }

  async update(userId: string, products: orderList[]) {
    await OrderListMongo.updateOne({ userId }, { ...products });
  }
}
