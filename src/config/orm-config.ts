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
  host: 'ec2-34-230-133-163.compute-1.amazonaws.com',
  port: 5432,
  username: process.env.DB_USERNAME,
  password: process.env.DB_PASSWORD,
  database: 'dpjdsi12dd0ur',
  entities: [Category, Product, User, UserRatings, OrderList, OrderListProduct, LastRatings],
  synchronize: true,
  logging: false,
};
