import { Request, Response, Router } from 'express';
import { UserRepository } from '../repository/user/UserRepository';
import { InvalidDataError } from '../utils/errors/invalidDataError';
import * as bcrypt from 'bcryptjs'

const router = Router();

router.post('/', async (req: Request, res: Response, next) => {
  try {
    const { username, password, role } = req.body;

    const candidate = await UserRepository.getOne({ username });

    if (candidate) {
      throw new InvalidDataError('User exists');
    }

    const hashedPassword = await bcrypt.hash(password, 10)
    await UserRepository.create(username, hashedPassword, role);

    res.status(201).send({ message: 'User was created' });
  } catch (e) {
    next(e);
  }
});

export default router;
