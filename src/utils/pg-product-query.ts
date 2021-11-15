import { mapPriceQuery } from './validation/priceValidation';
import { productPg } from '../dto/product-pg.dto';

type pgSortCriteria = 'ASC' | 'DESC';

export type pgProductQuery = {
  query: {
    displayName?: string;
    price?: {
      $gt: number;
      $lt?: number;
    };
    totalRating?: number;
  };
  sortBy?: [keyof productPg | '', pgSortCriteria | ''];
};


export default function (query): pgProductQuery {
  return {
    query: {
      displayName: query.displayName || '',
      price: mapPriceQuery(query.price),
      totalRating: +query.minRating || 0,
    },
    sortBy: [
      `${query.sortBy ? query.sortBy.split(':')[0] as keyof productPg: ''}`,
      `${query.sortBy ? (query.sortBy.split(':')[1].toUpperCase() as pgSortCriteria) : ''}`,
    ],
  };
}
