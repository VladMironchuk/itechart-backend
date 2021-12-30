import { Repository } from 'typeorm';
import { OrderList } from '../../entity/order-list';
import { ConnectionController } from '../../connection/connection';
import { orderList } from '../../dto/order-list-mongo';
import { User } from '../../entity/user';
import { OrderListProduct } from '../../entity/order-list-product';
import { IOrderListRepository } from './IOrderListRepository';

export class OrderListTypeOrmRepository implements IOrderListRepository<OrderListProduct[], orderList>{
  private repository: Repository<User>;

  constructor() {
    this.repository = ConnectionController.getConnection().getRepository(User);
  }

  async getAll(userId: string) {
    const user = await this.repository.findOne({ id: userId }, { relations: ['orderList'] });
    if(!user.orderList) {
      return null
    }
    return await this.repository.manager
      .getRepository(OrderListProduct)
      .createQueryBuilder('order_list_product')
      .leftJoinAndSelect('order_list_product.orderList', 'order_list')
      .leftJoinAndSelect('order_list_product.product', 'product')
      .where('order_list_product.orderList.id = :order_id', { order_id: user.orderList.id })
      .getMany();
  }

  async add(userId: string, products: orderList) {
    const user = await this.repository.findOne({ id: userId }, { relations: ['orderList'] });
    await Promise.all(
      products.map((item) => {
        const product = new OrderListProduct();
        product.product = item.product;
        product.quantity = item.quantity;
        product.orderList = user.orderList.id;
        return ConnectionController.getConnection().getRepository(OrderListProduct).save(product);
      })
    );
    await this.repository.manager.save(user);
  }

  async create(userId: string) {
    const user = await this.repository.findOne({ id: userId }, { relations: ['orderList'] });
    const orderList = new OrderList();
    orderList.userId = user.id;
    user.orderList = await this.repository.manager.getRepository(OrderList).save(orderList);
    await this.repository.save(user);
  }

  async update(userId: string, products: orderList) {
    const orderList = await this.getAll(userId);
    const productsIds = products.map((product) => product.product);
    productsIds.forEach((product) => {
      orderList.find((item) => item.product['id'] === product).quantity =
        +products[productsIds.indexOf(product)].quantity;
    });
    await this.repository.manager.save(orderList);
  }

  async clear(userId: string) {
    const user = await this.repository.findOne({ id: userId }, { relations: ['orderList'] });
    await this.repository.manager
      .getRepository(OrderListProduct)
      .createQueryBuilder()
      .delete()
      .where('orderListId = :id', { id: user.orderList.id })
      .execute();
  }
}
