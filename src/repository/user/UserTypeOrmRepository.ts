import path from 'path';
import HandyStorage from 'handy-storage';
import * as bcrypt from 'bcryptjs'
import * as jwt from 'jsonwebtoken'
import { User } from '../../entity/user';
import { Repository } from 'typeorm';
import { userInfoDto } from '../../dto/user-info.dto';
import { IUserRepository } from './IUserRepository';
import { ConnectionController } from '../../connection/connection';
import { InvalidDataError } from '../../utils/errors/invalidDataError';
import { serverConfig } from '../../config/server-config';
import { NotAuthorizedError } from '../../utils/errors/notAuthorizedError';

const storage = new HandyStorage()
storage.connect(path.resolve(__dirname, '../../config', 'userdata.json'))

export class UserTypeOrmRepository implements IUserRepository{

  private repository: Repository<User>;

  constructor() {
    this.repository = ConnectionController.getConnection().getRepository(User);
  }

  async register(username: string, password: string): Promise<void> {
    const candidate = await this.repository.findOne({username})

    if(candidate) {
      throw new InvalidDataError('User exists');
    }

    const hashedPassword = await bcrypt.hash(password, 10)
    const user = new User()
    user.username = username
    user.password = hashedPassword
    user.firstName = ""
    user.lastName = ""
    user.products = []
    console.log(user);
    await this.repository.save(user)
  }

  async authenticate(username: string, password: string): Promise<any> {
    const user = await this.repository.findOne({username})

    if(!user) {
      throw new InvalidDataError('No such user');
    }

    const isMatch = await bcrypt.compare(password, user.password)

    if(!isMatch) {
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

    await this.repository.update({id: storage['state'].userdata.userId}, {...dto});
  }

  async changePassword(oldPassword: string, newPassword: string): Promise<void> {
    if (!storage['state'].userdata.token) {
      throw new NotAuthorizedError();
    }

    const user = await this.repository.findOne({id: storage['state'].userdata.userId})

    const isMath = await bcrypt.compare(oldPassword, user.password)

    if(!isMath){
      throw new InvalidDataError("wrong password")
    }
    
    user.password = await bcrypt.hash(newPassword, 10)

    await this.repository.save(user)
  }
}