import { Entity, Column, PrimaryGeneratedColumn, JoinTable, ManyToMany } from 'typeorm';
import { Category } from './category';

@Entity()
export class Product {
  @PrimaryGeneratedColumn('uuid')
  id?: string;

  @Column({ length: 50 })
  displayName?: string;

  @Column('float')
  totalRating?: number;

  @Column('numeric')
  price?: number;

  @Column({ type: 'timestamptz' })
  createdAt?: Date;

  @ManyToMany(() => Category, (category) => category.displayName)
  @JoinTable()
  categories?: Category[];
}
