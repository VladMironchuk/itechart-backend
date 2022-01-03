import { Category } from '../entity/category';
import { Product } from '../entity/product';
import { ConnectionOptions } from 'typeorm';
import { User } from '../entity/user';
import { UserRatings } from '../entity/userRatings';
import { OrderList } from '../entity/order-list';
import { OrderListProduct } from '../entity/order-list-product';
import { LastRatings } from '../entity/last-ratings';

export const ormConfig: ConnectionOptions = {
  type: 'postgres',
  host: 'docker.host.internal',
  port: 5432,
  username: process.env.POSTGRES_USER,
  password: process.env.DB_PASSWORD,
  database: process.env.POSTGRES_DB,
  entities: [Category, Product, User, UserRatings, OrderList, OrderListProduct, LastRatings],
  synchronize: true,
  logging: false,
};
