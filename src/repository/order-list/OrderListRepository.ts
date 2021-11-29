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

  static async getList(userId: string) {
    return await this.entity.getList(userId)
  }

  static async updateList(userId: string, products: any[]) {
    await this.entity.updateList(userId, products)
  }
}