import { Repository } from 'typeorm';
import { UserRatings } from '../../entity/userRatings';
import { ConnectionController } from '../../connection/connection';

export class UserRatingsTypeOrmRepository {

  private repository: Repository<UserRatings>

  constructor() {
    this.repository = ConnectionController.getConnection().getRepository(UserRatings)
  }

  async getUserRatings() {
    return await this.repository.find()
  }

  async addUserRating(userId: string, rating: number, comment?: string) {
    const userRating = new UserRatings()
    userRating.userId = userId
    userRating.rating = rating
    userRating.comment = comment

    await this.repository.save(userRating)
  }

  async getUserRating(userId: string) {
    await this.repository.findOne({userId})
  }

  async updateUserRating(userId: string, rating: number, comment?: string) {
    await this.repository.update({userId}, {rating, comment})
  }
}