import { InvalidDataError } from '../errors/invalidDataError';
import { mapPriceQuery } from '../validation/priceValidation';

type sortCriteria = 'asc' | 'desc' | 'ascending' | 'descending' | 1 | -1;

const PRODUCT_FIELDS = ['createdAt', 'displayName', 'price', 'totalRating'];
const SORT_CRITERIA: sortCriteria[] = ['asc', 'desc', 'ascending', 'descending', 1, -1,];

export type mappedQueryMongo = {
  query: {
    displayName?: string | RegExp;
    price?: {
      $gt?: number;
      $lt?: number;
    };
    totalRating?: {
      $gt?: number;
    };
  };
  sortBy?: {
    createdAt?: sortCriteria;
    displayName?: sortCriteria;
    price?: sortCriteria;
    totalRating?: sortCriteria;
  };
};

const mapRatingQuery = (ratingQuery = '') => {
  if (isNaN(+ratingQuery)) {
    throw new InvalidDataError("rating must be a number");
  }

  return {
    $gt: +ratingQuery,
  };
};

const mapSortQuery = (sortQuery: string) => {
  if (!sortQuery) return;

  if(!sortQuery.includes(':')){
    throw new InvalidDataError("invalid format(must be filter:asc|desc)");
  }

  const filter = sortQuery.split(':')[0];
  if(!PRODUCT_FIELDS.includes(filter)) {
    throw new InvalidDataError("wrong filter");
  }

  const value = sortQuery.split(':')[1] as sortCriteria || 'asc';
  if(!SORT_CRITERIA.includes(value)) {
    throw new InvalidDataError("wrong comparator");
  }

  return {
    [filter]: value,
  };
};

export default function (reqQuery): mappedQueryMongo {
  return {
    query: {
      displayName: new RegExp(`.*${reqQuery.displayName || ''}.*`),
      price: mapPriceQuery(reqQuery.price),
      totalRating: mapRatingQuery(reqQuery.minRating),
    },
    sortBy: mapSortQuery(reqQuery.sortBy),
  };
}
