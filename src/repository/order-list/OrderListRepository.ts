import { OrderListMongoRepository } from './OrderListMongoRepository';
import { OrderListTypeOrmRepository } from './OrderListTypeOrmRepository';
import { orderList } from '../../dto/order-list-mongo';

export class OrderListRepository {

  private static entity: OrderListMongoRepository | OrderListTypeOrmRepository

  static init() {
    switch (process.env.DB) {
      case 'pg':
        this.entity = new OrderListTypeOrmRepository();
        break;
      case 'mongo':
        this.entity = new OrderListMongoRepository();
        break;
    }
  }

  static async create(userId: string) {
    return await this.entity.create(userId)
  }

  static async getAll(userId: string) {
    return await this.entity.getAll(userId)
  }

  static async update(userId: string, products: orderList) {
    await this.entity.update(userId, products)
  }

  static async add(userId: string, products: orderList) {
    await this.entity.add(userId, products)
  }

  static async clear(userId: string) {
    await this.entity.clear(userId)
  }
}