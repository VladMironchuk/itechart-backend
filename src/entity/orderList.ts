import { Column, Entity, OneToOne, PrimaryGeneratedColumn } from 'typeorm';
import { Product } from './product';

@Entity()
export class OrderList {
  @PrimaryGeneratedColumn('uuid')
  id: string;

  @Column()
  userId: string

  @OneToOne(() => Product, (product) => product.id)
  product: string
}
