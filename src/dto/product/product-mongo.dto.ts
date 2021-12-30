import { Category as MongoCategory } from '../../models/category';
import { mongoProductRatings } from './product-ratings-mongo.dto';
import { product } from './product-base.dto';

export type productMongo = product & {
  categories?: MongoCategory[];
  createdAt?: Date;
  ratings?: mongoProductRatings[];
};
