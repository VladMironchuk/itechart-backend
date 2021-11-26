import { NextFunction, Request } from 'express';
import mapQuery from '../utils/queries/mongo-product-query';
import mapQueryPg from '../utils/queries/pg-product-query';

export default async function(req: Request, _, next: NextFunction){
  if (process.env.DB === 'mongo') {
    req['validProductQuery'] = mapQuery(req.query);
  }
  if (process.env.DB === 'pg') {
    req['validProductQuery'] = mapQueryPg(req.query);
  }
  next()
}