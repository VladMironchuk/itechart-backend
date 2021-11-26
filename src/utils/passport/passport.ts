import * as bcrypt from 'bcryptjs';
import { UserRepository } from '../../repository/user/UserRepository';
import { serverConfig } from '../../config/server-config';

const passport = require('passport');
const LocalStrategy = require('passport-local').Strategy;

const JWTStrategy = require('passport-jwt').Strategy;
const ExtractJWT = require('passport-jwt').ExtractJwt;

passport.use(
  new LocalStrategy(
    {
      usernameField: 'username',
      passwordField: 'password',
    },
    async function (username, password, cb) {
      try {
        const user = await UserRepository.getUser({username})

        if (!user) {
          return cb(null, false, { message: 'Incorrect username.' });
        }

        const isMatch = await bcrypt.compare(password, user.password);

        if (!isMatch) {
          return cb(null, false, { message: 'Incorrect password.' });
        }

        return cb(null, user, { message: 'Logged In Successfully' });
      } catch (e) {
        cb(e);
      }
    }
  )
);

passport.use(
  new JWTStrategy(
    {
      jwtFromRequest: ExtractJWT.fromAuthHeaderAsBearerToken(),
      secretOrKey: serverConfig.JWT_SECRET,
    },
    async function (jwtPayload, cb) {
      try {
        const user = await UserRepository.getUser({id: jwtPayload.userId})

        return cb(null, user)
      } catch (err) {
        return cb(err)
      }
    }
  )
);
