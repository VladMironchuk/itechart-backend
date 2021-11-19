import { IUserRepository } from './IUserRepository';
import { userInfoDto } from '../../dto/user-info.dto';
import User from '../../models/user';
import { InvalidDataError } from '../../utils/errors/invalidDataError';
import * as bcrypt from 'bcryptjs'
import * as jwt from 'jsonwebtoken'
import { serverConfig } from '../../config/server-config';
import HandyStorage from 'handy-storage';
import path from 'path';
import { NotAuthorizedError } from '../../utils/errors/notAuthorizedError';

const storage = new HandyStorage()
storage.connect(path.join(__dirname, '../../config', 'userdata.json'))

export class UserMongoRepository implements IUserRepository{
  async register(username: string, password: string): Promise<void> {
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
  }

  async authenticate(username: string, password: string): Promise<any> {
    const user = await User.findOne({ username });

    if (!user) {
      throw new InvalidDataError('No such user');
    }

    const isMatch = await bcrypt.compare(password, user.password);

    if (!isMatch) {
      throw new InvalidDataError('Invalid password');
    }

    const token = jwt.sign({ userId: user.id }, serverConfig.JWT_SECRET, {
      expiresIn: '1h',
    });

    storage.setState({
      userdata: {
        userId: user.id,
        token
      }
    })

    return {
      token,
      id: user.id
    }
  }

  async changeUserProfile(dto: userInfoDto): Promise<void> {
    if (!storage['state'].userdata.token) {
      throw new NotAuthorizedError();
    }

    await User.updateOne({id: storage['state'].userdata.userId}, {...dto});
  }

  async changePassword(oldPassword: string, newPassword: string): Promise<void> {
    if (!storage['state'].userdata.token) {
      throw new NotAuthorizedError();
    }

    const user = await User.findOne({id: storage['state'].userdata.userId})

    const isMath = await bcrypt.compare(oldPassword, user.password)

    if(!isMath){
      throw new InvalidDataError("wrong password")
    }

    const hashedPassword = await bcrypt.hash(newPassword, 10)

    await user.updateOne({password: hashedPassword})
  }

}