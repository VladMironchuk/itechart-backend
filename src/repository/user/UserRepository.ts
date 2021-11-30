import { UserMongoRepository } from './UserMongoRepository';
import { UserTypeOrmRepository } from './UserTypeOrmRepository';
import { userInfoDto } from '../../dto/user-info.dto';

export class UserRepository {
  private static entity?: UserMongoRepository | UserTypeOrmRepository;

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

  static async create(username: string, password: string) {
    await this.entity.create(username, password);
  }

  static async update(entity: userInfoDto, dto: userInfoDto) {
    await this.entity.update(entity, dto);
  }

  static async getOne(dto: userInfoDto) {
    return await this.entity.getOne(dto);
  }
}
