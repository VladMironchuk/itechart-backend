import { IUserRepository } from './IUserRepository';
import { userInfoDto } from '../../dto/user-info.dto';
import { UserRoles } from '../../dto/user-roles';
import User from '../../models/user';

export class UserMongoRepository implements IUserRepository {
  async create(username: string, password: string, role: UserRoles) {
    const user = new User({
      username,
      password,
      role
    });

    await user.save();
  }

  async update(entity: userInfoDto, dto: userInfoDto) {
    if (entity.id) {
      entity._id = entity.id;
      delete entity.id;
    }
    await User.updateOne({ ...entity }, { ...dto });
  }

  async getOne(entity: userInfoDto) {
    if (entity.id) {
      entity._id = entity.id;
      delete entity.id;
    }
    return User.findOne({ ...entity });
  }
}
