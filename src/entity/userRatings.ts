import { Column, Entity, JoinColumn, OneToOne, PrimaryGeneratedColumn } from 'typeorm';
import { Product } from './product';

@Entity()
export class UserRatings {
  @PrimaryGeneratedColumn('uuid')
  id?: string;

  @Column()
  userId?: string;

  @OneToOne(type => Product, product => product.id)
  @JoinColumn()
  product: string;

  @Column()
  rating?: number;

  @Column()
  comment?: string

  @Column({type: 'timestamptz'})
  createdAt: Date
}