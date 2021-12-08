import { Repository } from 'typeorm';
import { UserRatings } from '../../entity/userRatings';
import { ConnectionController } from '../../connection/connection';
import { ProductRepository } from '../product/ProductRepository';
import { Product } from '../../entity/product';

export class UserRatingsTypeOrmRepository {
  private repository: Repository<UserRatings>;

  constructor() {
    this.repository = ConnectionController.getConnection().getRepository(UserRatings);
  }

  async getUserRatings() {
    return await this.repository.find();
  }

  async addUserRating(userId: string, productId: string, rating: number, comment?: string) {
    const userRating = new UserRatings();
    userRating.userId = userId;
    userRating.product = productId;
    userRating.rating = rating;
    userRating.comment = comment;
    userRating.createdAt = new Date();
    await this.repository.manager.save(userRating);
  }

  async getUserRating(userId: string) {
    try {
      return await this.repository
        .createQueryBuilder('ur')
        .leftJoinAndSelect('ur.product', 'product')
        .where('ur.userId = :userId', { userId: userId })
        .getMany();
    } catch (e) {
      console.log(e);
    }
  }

  async updateUserRating(userId: string, productId: string, rating: number, comment?: string) {
    const product = await this.repository
      .createQueryBuilder('ur')
      .leftJoinAndSelect('ur.product', 'product')
      .where('ur.userId = :userId', { userId: userId })
      .andWhere('ur.product = :productId', { productId })
      .getOne();

    product.rating = rating
    product.comment = comment;
    await this.repository.save(product)
  }
}
