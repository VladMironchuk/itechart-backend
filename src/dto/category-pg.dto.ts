import { Product } from '../entity/product';

export type categoryPg = {
  id?: string;
  displayName?: string;
  products?: Product[];
};