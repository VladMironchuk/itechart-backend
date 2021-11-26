import { UserMongoRepository } from './UserMongoRepository';
import { UserTypeOrmRepository } from './UserTypeOrmRepository';
import { userInfoDto } from '../../dto/user-info.dto';

export class UserRepository {
  private static entity?: UserMongoRepository | UserTypeOrmRepository

  static init() {
    switch (process.env.DB) {
      case 'pg':
        UserRepository.entity = new UserTypeOrmRepository();
        break;
      case 'mongo':
        UserRepository.entity = new UserMongoRepository();
        break;
    }
  }

  static async createUser(username: string, password: string) {
    await this.entity.createUser(username, password)
  }

  static async updateUser(entity: userInfoDto,dto: userInfoDto) {
    await this.entity.updateUser(entity, dto)
  }

  static async getUser(dto: userInfoDto){
    return await this.entity.getUser(dto)
  }

}