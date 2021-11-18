import { logger } from '../logger/logger';
import { NextFunction, Request, Response } from 'express';

export default function (err, req: Request, res: Response, _: NextFunction) {
  res.status(err.errorStatus).send(err.message);
  logger.error(err.message);
}
