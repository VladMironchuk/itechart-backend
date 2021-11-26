import { Column, Entity, PrimaryGeneratedColumn } from 'typeorm';

@Entity()
export class UserRatings {
  @PrimaryGeneratedColumn('uuid')
  id?: string;

  @Column()
  userId?: string;

  @Column()
  rating?: number;

  @Column()
  comment?: string
}