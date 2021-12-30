import { orderList } from '../../dto/order-list-mongo';
import UserMongo from '../../models/user';
import OrderListMongo from '../../models/order-list';
import { OrderList } from '../../models/order-list';
import { Ref } from '@typegoose/typegoose';
import { Types } from 'mongoose';
import { IOrderListRepository } from './IOrderListRepository';

const ORDER_LIST_MONGO_KEYS = 'id orderList';

export class OrderListMongoRepository implements IOrderListRepository<Ref<OrderList>, orderList>{
  async getAll(userId: string) {
    const user = await UserMongo.findOne({ _id: userId }, ORDER_LIST_MONGO_KEYS).populate('orderList');
    return user.orderList;
  }

  async update(userId: string, orderList: orderList) {
    const user = await UserMongo.findOne({ userId }, ORDER_LIST_MONGO_KEYS).populate('orderList');
    await OrderListMongo.updateOne(
      { _id: user.orderList['_id'] },
      {
        products: orderList.map((item) => ({
          product: new Types.ObjectId(item.product),
          quantity: +item.quantity,
        })),
      }
    );
  }

  async create(userId: string) {
    const user = await UserMongo.findOne({ userId }, ORDER_LIST_MONGO_KEYS).populate('orderList');
    const orderList = new OrderListMongo();
    orderList.products = [];
    user.orderList = await orderList.save();
    await user.save();
  }

  async add(userId: string, orderList: orderList) {
    const user = await UserMongo.findOne({ userId }, ORDER_LIST_MONGO_KEYS).populate('orderList');
    user.orderList['products'].push(
      ...orderList.map((item) => ({
        product: new Types.ObjectId(item.product),
        quantity: +item.quantity,
      }))
    );
    await OrderListMongo.updateOne(user.orderList as OrderList);
  }

  async clear(userId: string) {
    const user = await UserMongo.findOne({ userId }, ORDER_LIST_MONGO_KEYS).populate('orderList');
    user.orderList['products'] = [];
    await OrderListMongo.updateOne(user.orderList as OrderList);
  }
}
