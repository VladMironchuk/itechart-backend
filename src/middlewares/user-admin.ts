import { NextFunction, Request, Response } from 'express';
import { UserRepository } from '../repository/user/UserRepository';
import { UserRoles } from '../dto/user-roles';

export default async function(req: Request, res: Response, next: NextFunction) {
  const user = await UserRepository.getOne({id: req['userId']})
  if(user['role'] !== UserRoles.ADMIN) {
    res.status(403).send({message: "Forbidden! Access only for admin"})
  }
  next()
}