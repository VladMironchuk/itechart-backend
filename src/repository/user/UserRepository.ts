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

  async register(username: string, password: string) {
    await this.entity.register(username, password)
  }

  authenticate(username: string, password: string) {
    return this.entity.authenticate(username, password)
  }

  async changeUserProfile(dto: userInfoDto) {
    await this.entity.changeUserProfile(dto)
  }

  async changePassword(odlPassword: string, newPassword: string) {
    await this.entity.changePassword(odlPassword, newPassword)
  }
}