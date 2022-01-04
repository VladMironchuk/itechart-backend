import { mapPriceQuery } from '../validation/priceValidation';
import { productPg } from '../../dto/product/product-pg.dto';
import { InvalidDataError } from '../errors/invalidDataError';
import { pgProductQuery, pgSortCriteria } from '../../dto/query-pg';

const validateTotalRating = (totalRating: string): number => {
  if(!totalRating) {
    return 0
  }
  if (isNaN(+totalRating)) {
    throw new InvalidDataError("rating must be a number");
  }
  return +totalRating;
};

const validateSortingFilter = (sortingFilter: string): ['' | keyof productPg, '' | pgSortCriteria] => {
  if (!sortingFilter) {
    return ['', ''];
  }

  if(!sortingFilter.includes(':')){
    throw new InvalidDataError("invalid format(must be filter:asc|desc)");
  }

  const filter = sortingFilter.split(':')[0];
  if (!['displayName', 'createdAt', 'price', 'totalRating'].includes(filter)) {
    throw new InvalidDataError("wrong filter");
  }

  const value = sortingFilter.split(':')[1].toUpperCase();

  if (!['ASC', 'DESC'].includes(value)) {
    throw new InvalidDataError("wrong comparator");
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
