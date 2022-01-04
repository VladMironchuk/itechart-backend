export type sortCriteria = 'asc' | 'desc' | 'ascending' | 'descending' | 1 | -1;

export type mappedQueryMongo = {
  query: {
    displayName?: string | RegExp;
    price?: {
      $gte?: number;
      $lte?: number;
    };
    totalRating?: {
      $gte?: number;
    };
  };
  sortBy?: {
    createdAt?: sortCriteria;
    displayName?: sortCriteria;
    price?: sortCriteria;
    totalRating?: sortCriteria;
  };
};
