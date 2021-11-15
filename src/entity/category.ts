import { Entity, Column, PrimaryGeneratedColumn, ManyToMany } from 'typeorm';
import { Product } from './product';
import { JoinTable } from 'typeorm';

@Entity()
export class Category {

  @PrimaryGeneratedColumn('uuid')
  id: string;

  @Column({length: 50})
  displayName: string;

  @Column({type: 'timestamptz'})
  createdAt: Date;

  @ManyToMany(() => Product, product => product.displayName)
  @JoinTable()
  products: Product[]
}