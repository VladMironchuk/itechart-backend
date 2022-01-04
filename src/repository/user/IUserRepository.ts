import { userInfoDto } from '../../dto/user-info.dto';
import { UserRoles } from '../../dto/user-roles';

export interface IUserRepository {
  create(username: string, password: string, role: UserRoles): Promise<void>

  update(entity: userInfoDto, dto: userInfoDto): Promise<void>

  getOne(entity: userInfoDto): Promise<unknown>
}