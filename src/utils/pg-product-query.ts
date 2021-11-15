import { mapPriceQuery } from './validation/priceValidation';
import { productPg } from '../dto/product-pg.dto';
import { InvalidDataError } from './errors/invalidDataError';

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

const validateTotalRating = (totalRating: string): number => {
  if(!totalRating) {
    return 0
  }
  if (isNaN(+totalRating)) {
    throw new InvalidDataError(400, 'invalid data input');
  }
  return +totalRating;
};

const validateSortingFilter = (sortingFilter: string): ['' | keyof productPg, '' | pgSortCriteria] => {
  if (!sortingFilter) {
    return ['', ''];
  }

  const filter = sortingFilter.split(':')[0];
  if (!['displayName', 'createdAt', 'price', 'totalRating'].includes(filter)) {
    throw new InvalidDataError(400, 'invalid data input');
  }

  const value = sortingFilter.split(':')[1].toUpperCase();

  if (!['ASC', 'DESC'].includes(value)) {
    throw new InvalidDataError(400, 'invalid data input');
  }

  return [filter as keyof productPg, value as pgSortCriteria];
};

export default function (query): pgProductQuery {
  return {
    query: {
      displayName: query.displayName || '',
      price: mapPriceQuery(query.price),
      totalRating: validateTotalRating(query.totalRating),
    },
    sortBy: validateSortingFilter(query.sortBy),
  };
}
