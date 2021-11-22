import { UserMongoRepository } from './UserMongoRepository';
import { UserTypeOrmRepository } from './UserTypeOrmRepository';
import { userInfoDto } from '../../dto/user-info.dto';

export class UserRepository {
  private readonly entity?: UserMongoRepository | UserTypeOrmRepository

  constructor() {
    switch (process.env.DB) {
      case 'pg':
        this.entity = new UserTypeOrmRepository();
        break;
      case 'mongo':
        this.entity = new UserMongoRepository();
        break;
    }
  }

  async createUser(username: string, password: string) {
    await this.entity.createUser(username, password)
  }

  async updateUser(entity: userInfoDto,dto: userInfoDto) {
    await this.entity.updateUser(entity, dto)
  }

  async getUser(dto: userInfoDto){
    return await this.entity.getUser(dto)
  }

}