import { User } from '../../entity/user';
import { Repository } from 'typeorm';
import { userInfoDto } from '../../dto/user-info.dto';
import { IUserRepository } from './IUserRepository';
import { ConnectionController } from '../../connection/connection';

export class UserTypeOrmRepository implements IUserRepository{

  private repository: Repository<User>;

  constructor() {
    this.repository = ConnectionController.getConnection().getRepository(User);
  }

  async createUser(username: string, password: string) {
    const user = new User()
    user.username = username
    user.password = password
    user.firstName = ""
    user.lastName = ""
    user.products = []
    await this.repository.save(user)
  }

  async getUser(entity: userInfoDto) {
    return await this.repository.findOne({...entity})
  }

  async updateUser(entity:userInfoDto, dto: userInfoDto){
    await this.repository.update({...entity}, {...dto});
  }
}