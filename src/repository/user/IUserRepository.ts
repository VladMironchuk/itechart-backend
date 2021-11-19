import { userInfoDto } from '../../dto/user-info.dto';

export interface IUserRepository {
  register(username: string, password: string): Promise<void>

  authenticate(username: string, password: string): Promise<any>

  changeUserProfile(dto: userInfoDto): Promise<void>

  changePassword(odlPassword: string, newPassword: string): Promise<void>
}