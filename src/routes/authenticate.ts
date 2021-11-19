import { NextFunction, Request, Response, Router } from 'express';
import HandyStorage from 'handy-storage'
import * as path from 'path';
import { UserRepository } from '../repository/user/UserRepository';

const router = Router();
const storage = new HandyStorage()
storage.connect(path.resolve(__dirname, '../config', 'userdata.json'))

router.get('/', (req: Request, res: Response, _: NextFunction) => {
  res.send('aloha');
});

router.post('/', async (req: Request, res: Response, next: NextFunction) => {
  try {
    const { username, password } = req.body;
    const userRepository = new UserRepository()
    const {token, id} = await userRepository.authenticate(username, password)
    res.send({ token, userId: id });
  } catch (e) {
    next(e)
  }
});

router.post('/logout', (req, res, _) => {
  storage.setState({userdata: {}})
  res.send("log out")
})

export default router;
