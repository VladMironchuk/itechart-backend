import { User } from '../../entity/user';
import { Repository } from 'typeorm';
import { userInfoDto } from '../../dto/user-info.dto';
import { IUserRepository } from './IUserRepository';
import { ConnectionController } from '../../connection/connection';
import { UserRoles } from '../../dto/user-roles';

export class UserTypeOrmRepository implements IUserRepository {
  private repository: Repository<User>;

  constructor() {
    this.repository = ConnectionController.getConnection().getRepository(User);
  }

  async create(username: string, password: string, role: UserRoles) {
    const user = new User();
    user.username = username;
    user.password = password;
    user.role = role;
    user.firstName = '';
    user.lastName = '';
    await this.repository.save(user);
  }

  async getOne(entity: userInfoDto) {
    return await this.repository.findOne({ ...entity });
  }

  async update(entity: userInfoDto, dto: userInfoDto) {
    await this.repository.update({ ...entity }, { ...dto });
  }
}
