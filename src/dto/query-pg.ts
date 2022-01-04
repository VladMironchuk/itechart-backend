import { productPg } from './product/product-pg.dto';

export type pgSortCriteria = 'ASC' | 'DESC';

export type pgProductQuery = {
  query: {
    displayName?: string;
    price?: {
      $gte: number;
      $lte?: number;
    };
    totalRating?: number;
  };
  sortBy?: [keyof productPg | '', pgSortCriteria | ''];
};