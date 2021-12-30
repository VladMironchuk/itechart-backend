import { LastRatingsMongoRepository } from './LastRatingsMongoRepository';
import { LastRatingsTypeOrmRepository } from './LastRatingsTypeOrmRepository';

export class LastRatingsRepository {

  private static entity: LastRatingsMongoRepository | LastRatingsTypeOrmRepository

  static init() {
    switch (process.env.DB) {
      case 'pg':
        this.entity = new LastRatingsTypeOrmRepository();
        break;
      case 'mongo':
        this.entity = new LastRatingsMongoRepository();
        break;
    }
  }

  static async get() {
    return await this.entity.get()
  }

  static async add(productId: string, userId: string, rating: number, comment?: string) {
    await this.entity.add(productId, userId, rating, comment)
  }
}