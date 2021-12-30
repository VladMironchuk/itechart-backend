import { Category as PgCategory } from '../../entity/category';
import { product } from './product-base.dto';

export type productPg = product & {
  categories?: PgCategory[]
};