import { OrderListMongoRepository } from './OrderListMongoRepository';
import { OrderListTypeOrmRepository } from './OrderListTypeOrmRepository';

export class OrderListRepository {

  private static entity?: OrderListMongoRepository | OrderListTypeOrmRepository

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

  static async getAll(userId: string) {
    return await this.entity.getAll(userId)
  }

  static async update(userId: string, products: any[]) {
    await this.entity.update(userId, products)
  }
}