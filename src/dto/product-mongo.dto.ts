import { Category as MongoCategory } from '../models/category';

export type productMongo = {
  id?: string;
  displayName?: string;
  totalRating?: number;
  price?: number;
  categories?: MongoCategory[];
  createdAt?: Date;
  ratings?: {
    userId: string;
    rating: number;
    comment?: string;
  }[];
};
