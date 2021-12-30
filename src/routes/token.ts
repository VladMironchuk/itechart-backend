import { Request, Response, NextFunction, Router } from 'express';
import { refreshTokens } from './authenticate';
import { UserRepository } from '../repository/user/UserRepository';
import { serverConfig } from '../config/server-config';
import * as jwt from 'jsonwebtoken';

const router = Router();

router.post('/', async (req: Request, res: Response, _: NextFunction) => {
  const { refreshToken } = req.body;
  const user = await UserRepository.getOne({ id: req['userId'] });

  if (refreshToken in refreshTokens && refreshTokens[refreshToken] === user.username) {
    const token = jwt.sign({ userId: user.id }, serverConfig.JWT_SECRET, {
      expiresIn: '1h',
    });
    res.status(200).send({ token });
  } else {
    res.status(401).send('Unauthorized');
  }
});

export default router;
