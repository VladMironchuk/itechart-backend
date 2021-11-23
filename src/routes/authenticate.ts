import { NextFunction, Request, Response, Router } from 'express';
import * as jwt from 'jsonwebtoken';
const passport = require("passport");
import { serverConfig } from '../config/server-config';
import randtoken from 'rand-token'

const router = Router();
export const refreshTokens = {}

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

    const refreshToken = randtoken.uid(256)
    refreshTokens[refreshToken] = user.username

    return res.send({ userId: user.id, token, refreshToken });
  })(req, res);
});

export default router;
