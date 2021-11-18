import { Request, Response, Router } from 'express';
import * as bcrypt from 'bcryptjs';
import User from '../models/user';
import { InvalidDataError } from '../utils/errors/invalidDataError';

export const router = Router();

router.get('/', async (req: Request, res: Response, _) => {
  res.send(await User.find());
});

router.post('/', async (req: Request, res: Response, next) => {
  try {
    const { password, username } = req.body;
    const candidate = await User.findOne({ username });

    if (candidate) {
      throw new InvalidDataError('User exists');
    }

    const hashedPassword = await bcrypt.hash(password, 10);
    const user = new User({
      username,
      password: hashedPassword,
    });
    await user.save();
    res.status(201).send({ message: 'User was created' });
  } catch (e) {
    next(e);
  }
});
