import { logger } from '../logger/logger';

export default function (err, req, res) {
  res.status(err.errorStatus).send(err.message);
  logger.error(err.message);
}
