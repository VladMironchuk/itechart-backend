import { Request, Response, Router } from 'express';
import { UserRepository } from '../repository/user/UserRepository';

const router = Router();

router.get('/', async (req: Request, res: Response, _) => {
  res.send('hello');
});

router.post('/', async (req: Request, res: Response, next) => {
  try {
    const { password, username } = req.body;
    const userRepository = new UserRepository()
    await userRepository.register(username, password)
    res.status(201).send({ message: 'User was created' });
  } catch (e) {
    next(e);
  }
});

export default router
