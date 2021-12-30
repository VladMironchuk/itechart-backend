import { NextFunction, Request } from 'express';
import mapQuery from '../utils/queries/mongo-product-query';
import mapQueryPg from '../utils/queries/pg-product-query';

export default async function(req: Request, _, next: NextFunction){
  switch (process.env.DB) {
    case 'mongo':
      req['validProductQuery'] = mapQuery(req.query);
      break;
    case 'pg':
      req['validProductQuery'] = mapQueryPg(req.query);
      break;
  }
  next()
}