import { IUserRepository } from './IUserRepository';
import { userInfoDto } from '../../dto/user-info.dto';
import User from '../../models/user';

export class UserMongoRepository implements IUserRepository {
  async create(username: string, password: string) {
    const user = new User({
      username,
      password,
    });

    await user.save();
  }

  async update(entity: userInfoDto, dto: userInfoDto) {
    if (entity.id) {
      entity._id = entity.id;
      delete entity.id;
    }
    await User.updateOne({ ...entity, _id: entity?.id }, { ...dto });
  }

  async getOne(entity: userInfoDto) {
    if (entity.id) {
      entity._id = entity.id;
      delete entity.id;
    }
    return User.findOne({ ...entity });
  }
}
