import { NextFunction, Request, Response } from 'express';
const passport = require('passport')

export default function(req: Request, res: Response, next: NextFunction) {
  passport.authenticate('jwt', {session: false}, (err, user) => {
    if (err || !user) {
      return res.status(400).send({
        message: "Unauthorized"
      });
    }

    req['userId'] = user.id
    next()
  })(req, res)
}