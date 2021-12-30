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
  host: 'host.docker.internal',
  port: 5432,
  username: process.env.DB_USERNAME,
  password: process.env.DB_PASSWORD,
  database: 'store',
  entities: [Category, Product, User, UserRatings, OrderList, OrderListProduct, LastRatings],
  synchronize: true,
  logging: false,
};
