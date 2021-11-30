import { userInfoDto } from '../../dto/user-info.dto';

export interface IUserRepository {
  create(username: string, password: string): Promise<void>

  update(entity: userInfoDto, dto: userInfoDto): Promise<void>

  getOne(entity: userInfoDto): any
}