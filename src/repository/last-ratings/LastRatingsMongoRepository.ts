import MongoLastRatings from '../../models/last-ratings';
import { ILastRatingsRepository } from './ILastRatingsRepository';

export class LastRatingsMongoRepository implements ILastRatingsRepository{
  async get() {
    return MongoLastRatings.find({}, 'product rating comment user')
      .populate('product user', 'displayName username')
      .sort({createdAt: -1})
  }

  async add(product: string, user: string, rating: number, comment?: string) {
    const userRating = new MongoLastRatings({
      product,
      user,
      rating,
      comment: comment ?? ""
    })

    const allRatings = await this.get()

    if(allRatings.length === 10) {
      await MongoLastRatings.deleteOne({_id: allRatings.at(-1)._id})
    }

    await userRating.save()
  }
}