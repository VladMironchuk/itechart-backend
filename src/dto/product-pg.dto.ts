import { Category } from '../entity/category';

export type productPg = {
  id?: string;
  displayName?: string;
  totalRating?: number;
  price?: number;
  categories?: Category[]
};