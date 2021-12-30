import { Product } from '../../entity/product';
import { category } from './category-base.dto';


export type categoryPg = category & { products?: Product[] };
