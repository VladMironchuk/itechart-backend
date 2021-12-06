import { Column, Entity, JoinColumn, ManyToOne, OneToOne, PrimaryGeneratedColumn } from 'typeorm';
import { Product } from './product';
import { OrderList } from './order-list';

@Entity()
export class OrderListProduct {
  @PrimaryGeneratedColumn('uuid')
  id: string;

  @OneToOne(type => Product, product => product.id)
  @JoinColumn()
  product: string;

  @Column()
  quantity: number;

  @ManyToOne(type => OrderList, orderList => orderList.id)
  orderList: string
}
