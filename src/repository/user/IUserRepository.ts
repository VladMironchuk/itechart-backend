import { userInfoDto } from '../../dto/user-info.dto';

export interface IUserRepository {

  createUser(username: string, password: string): Promise<void>

  updateUser(entity: userInfoDto, dto: userInfoDto): Promise<void>

  getUser(entity: userInfoDto): any
}