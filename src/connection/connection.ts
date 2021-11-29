import { ormConfig } from '../config/orm-config';
import { Connection, createConnection } from 'typeorm';
import { mongoose } from '@typegoose/typegoose';
import { ProductRepository } from '../repository/product/ProductRepository';
import { CategoryRepository } from '../repository/category/CategoryRepository';
import { UserRepository } from '../repository/user/UserRepository';
import { logger } from '../logger/logger';
import { OrderListRepository } from '../repository/order-list/OrderListRepository';
const exec = mongoose.Query.prototype.exec;

mongoose.Query.prototype.exec = async function () {
  if (process.env.NODE_ENV === 'dev') {
    mongoose.set('debug', async (collectionName, method, query, doc, options) => {
      logger.debug(
        `${collectionName}.${method}\n query: ${JSON.stringify(query)}\n doc: ${JSON.stringify(
          doc
        )}\n options: ${JSON.stringify(options)}`
      );
    });
  }
  return exec.apply(this, arguments);
};

export class ConnectionController {
  private static connection: Connection;

  static async createConnection() {
    switch (process.env.DB) {
      case 'pg':
        ConnectionController.connection = await createConnection(ormConfig);
        break;
      case 'mongo':
        await mongoose.connect(process.env.DB_CONN_STRING);

        break;
    }
    ProductRepository.init();
    CategoryRepository.init();
    UserRepository.init();
    OrderListRepository.init();
  }

  static getConnection() {
    return ConnectionController.connection;
  }
}
