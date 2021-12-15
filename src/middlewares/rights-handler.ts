import { NextFunction, Request, Response } from 'express';
import { UserRepository } from '../repository/user/UserRepository';

export default function (rights: ['buyer' | 'admin']) {
  return async function (req: Request, res: Response, next: NextFunction) {
    const user = await UserRepository.getOne({ id: req['userId'] });
    if (!rights.includes(user.role)) {
      res.status(403).send({ message: `Forbidden! Access only for ${rights.join(', ')}` });
    }
    next();
  };
}
