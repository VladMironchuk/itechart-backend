import { LastRatings } from '../../entity/last-ratings';
import { Repository } from 'typeorm';
import { ConnectionController } from '../../connection/connection';
import { ILastRatingsRepository } from './ILastRatingsRepository';

export class LastRatingsTypeOrmRepository implements ILastRatingsRepository{
  private repository: Repository<LastRatings>;

  constructor() {
    this.repository = ConnectionController.getConnection().getRepository(LastRatings);
  }

  async get() {
    return this.repository
      .createQueryBuilder('lr')
      .leftJoinAndSelect('lr.product', 'product')
      .leftJoinAndSelect('lr.user', 'user')
      .orderBy('lr.createdAt', 'DESC')
      .getMany();
  }

  async add(product: string, user: string, rating: number, comment?: string) {
    const userRating = new LastRatings();
    userRating.product = product;
    userRating.user = user;
    userRating.rating = rating;
    userRating.comment = comment ?? '';
    userRating.createdAt = new Date();

    const allRatings = await this.get()
    if(allRatings.length === 10) {
      await this.repository.delete({id: allRatings.at(-1).id})
    }

    await this.repository.save(userRating);
  }
}
