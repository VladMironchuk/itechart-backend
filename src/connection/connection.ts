import { ormConfig } from '../config/orm-config';
import { Connection, createConnection } from 'typeorm';
import { mongoose } from '@typegoose/typegoose';
import { ProductRepository } from '../repository/product/ProductRepository';
import { CategoryRepository } from '../repository/category/CategoryRepository';
import { UserRepository } from '../repository/user/UserRepository';
const exec = mongoose.Query.prototype.exec

mongoose.Query.prototype.exec = async function() {
  if(process.env.NODE_ENV === 'dev') {
    // console.log(arguments)
  }
  return exec.apply(this, arguments)
}

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
    ProductRepository.init()
    CategoryRepository.init()
    UserRepository.init()
  }

  static getConnection() {
    return ConnectionController.connection
  }
}
