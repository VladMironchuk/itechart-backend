import { InvalidDataError } from '../errors/invalidDataError';

export const mapPriceQuery = (priceQuery: string) => {
  if (!priceQuery) {
   return {
     $gte: 0
   }
  }

  if(!priceQuery.includes(':')){
    throw new InvalidDataError("wrong format(must be min:max)");
  }

  const priceFilters = priceQuery.split(':').map((filter) => +filter);
  priceFilters.forEach((filter) => {
    if (isNaN(filter)) {
      throw new InvalidDataError("filters must be numbers");
    }
  });

  if((priceFilters[1] <= priceFilters[0]) && priceFilters[1]) {
    throw new InvalidDataError("min must be lower than max");
  }

  return priceFilters[1] === 0
    ? {
      $gte: priceFilters[0],
    }
    : {
      $gte: priceFilters[0],
      $lte: priceFilters[1],
    };
};