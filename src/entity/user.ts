import { Column, Entity, JoinColumn, OneToOne, PrimaryGeneratedColumn } from 'typeorm';
import { OrderList } from './order-list';

@Entity()
export class User {
  @PrimaryGeneratedColumn('uuid')
  id?: string;

  @Column({ length: 50 })
  username?: string;

  @Column()
  password?: string;

  @Column()
  firstName?: string;

  @Column()
  lastName?: string;

  @OneToOne((type) => OrderList, (orderList) => orderList.id)
  @JoinColumn()
  orderList: OrderList;
}
