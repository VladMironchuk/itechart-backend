import { IOrderListRepository } from './IOrderListRepository';
import { OrderList } from '../../models/order-list';
import OrderListMongo from '../../models/order-list';
import { orderListMongo } from '../../dto/order-list-mongo';
import { LeanDocument } from 'mongoose';

const ORDER_LIST_MONGO_KEYS = 'id products userId';

export class OrderListMongoRepository implements IOrderListRepository<OrderList, orderListMongo> {
  async getList(userId: string): Promise<OrderList> {
    return OrderListMongo.findOne({ userId }, ORDER_LIST_MONGO_KEYS);
  }

  async updateList(userId: string, products: orderListMongo[]) {
    await OrderListMongo.updateOne(
      { userId },
      { products: products as LeanDocument<{ product: string; quantity: number }>[] }
    );
  }

  async deleteList() {}
}
