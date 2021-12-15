import { Column, Entity, JoinColumn, ManyToOne, PrimaryGeneratedColumn } from 'typeorm';
import { Product } from './product';
import { User } from './user';

@Entity()
export class LastRatings {
  @PrimaryGeneratedColumn('uuid')
  id: string;

  @ManyToOne((type) => Product, (product) => product.id)
  @JoinColumn()
  product: string;

  @ManyToOne((type) => User, (user) => user.id)
  @JoinColumn()
  user: string;

  @Column()
  rating: number;

  @Column()
  comment?: string;

  @Column({ type: 'timestamptz' })
  createdAt: Date;
}
