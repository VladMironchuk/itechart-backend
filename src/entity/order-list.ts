import { Entity, OneToMany, OneToOne, PrimaryGeneratedColumn } from 'typeorm';
import { User } from './user';
import { OrderListProduct } from './order-list-product';

@Entity()
export class OrderList {
  @PrimaryGeneratedColumn('uuid')
  id: string;

  @OneToOne(type => User, user => user.id)
  userId: string

  @OneToMany(type => OrderListProduct, orderListProduct => orderListProduct.id)
  products: OrderListProduct[]  
}