import { Repository } from 'typeorm';
import { OrderList } from '../../entity/orderList';
import { ConnectionController } from '../../connection/connection';
import { orderList } from '../../dto/order-list-mongo';
import { QueryDeepPartialEntity } from 'typeorm/query-builder/QueryPartialEntity';

export class OrderListTypeOrmRepository {
  private repository: Repository<OrderList>;

  constructor() {
    this.repository = ConnectionController.getConnection().getRepository(OrderList)
  }

  async getAll(userId: string) {
    return await this.repository.findOne({userId})
  }

  async update(userId: string, products: orderList) {
    await this.repository.update({userId}, {...products as QueryDeepPartialEntity<OrderList>})
  }
}