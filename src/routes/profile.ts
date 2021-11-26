import { NextFunction, Request, Response, Router } from 'express';
import { UserRepository } from '../repository/user/UserRepository';
import * as bcrypt from 'bcryptjs';
import { InvalidDataError } from '../utils/errors/invalidDataError';

const router = Router();

router.put('/', async (req: Request, res: Response, next: NextFunction) => {
  try {
    await UserRepository.updateUser({ id: req['userId'] }, { ...req.body });
    res.send('User was updated');
  } catch (e) {
    next(e);
  }
});

router.post('/password', async (req, res, next) => {
  try {
    const { oldPassword, newPassword } = req.body;

    const user = await UserRepository.getUser({ id: req['userId'] });

    const isMatch = await bcrypt.compare(oldPassword, user.password);
    if (!isMatch) {
      throw new InvalidDataError('Wrong password');
    }

    const hashedNewPassword = await bcrypt.hash(newPassword, 10);
    await UserRepository.updateUser({ id: req['userId'] }, { password: hashedNewPassword });

    res.send({ message: 'password has changed' });
  } catch (e) {
    next(e);
  }
});

export default router;
