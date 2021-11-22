import { NextFunction, Request, Response, Router } from 'express';
import * as jwt from 'jsonwebtoken';
const passport = require("passport");
import { serverConfig } from '../config/server-config';

const router = Router();


router.post('/', async (req: Request, res: Response, next: NextFunction) => {
  passport.authenticate('local', {session: false}, (err, user, { message }) => {
    if (err || !user) {
      return res.status(400).json({
        message
      });
    }

    const token = jwt.sign({ userId: user.id }, serverConfig.JWT_SECRET, {
      expiresIn: '1h',
    });

    return res.send({ userId: user.id, token });
  })(req, res);
});

export default router;
