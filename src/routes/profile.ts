import { NextFunction, Request, Response, Router } from 'express';
import HandyStorage from 'handy-storage';
import path from 'path';
import { UserRepository } from '../repository/user/UserRepository';

const router = Router();
const storage = new HandyStorage();
storage.connect(path.resolve(__dirname, '../config', 'userdata.json'));

router.put('/', async (req: Request, res: Response, next: NextFunction) => {
  try {
    const userRepository  = new UserRepository()
    await userRepository.changeUserProfile(req.body)
    res.send({message: "User was updated"})
  } catch (e) {
    next(e)
  }
});

router.post('/password', async (req, res, next) => {
  try {
    const { oldPassword, newPassword } = req.body;

    const userRepository = new UserRepository()
    await userRepository.changePassword(oldPassword, newPassword)
    res.send({message: "password has changed"})
  } catch (e) {
    next(e)
  }
})

export default router;
