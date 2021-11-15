import { InvalidDataError } from '../errors/invalidDataError';

export const mapPriceQuery = (priceQuery: string) => {
  if (!priceQuery) {
   return {
     $gt: 0
   }
  }

  if(!priceQuery.includes(':')){
    throw new InvalidDataError(400, 'invalid data input');
  }

  const priceFilters = priceQuery.split(':').map((filter) => +filter);
  priceFilters.forEach((filter) => {
    if (isNaN(filter)) {
      throw new InvalidDataError(400, 'invalid data input');
    }
  });

  if((priceFilters[1] <= priceFilters[0]) && priceFilters[1]) {
    throw new InvalidDataError(400, 'invalid data input');
  }

  return priceFilters[1] === 0
    ? {
      $gt: priceFilters[0],
    }
    : {
      $gt: priceFilters[0],
      $lt: priceFilters[1],
    };
};