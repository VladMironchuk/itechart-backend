import { productMongo } from '../dto/product-mongo.dto';
import { ProductRepository } from '../repository/product/ProductRepository';
import { Product } from '../models/product';

export const updateProductRatingMongo = async (
  product: productMongo | Product,
  userId: string,
  rating: number,
  comment: string
): Promise<void> => {
  const users = product.ratings.map((rating) => rating.userId);

  if (users.includes(userId)) {
    product.ratings[users.indexOf(userId)].rating = rating;
    product.ratings[users.indexOf(userId)].comment = comment;
  } else {
    product.ratings.push({
      userId,
      rating,
      comment,
    });
  }

  const totalRating = +(
    (product.totalRating * (product.ratings.length - 1) + rating) /
    product.ratings.length
  ).toPrecision(2);

  await ProductRepository.updateProduct(
    { displayName: product.displayName },
    {
      totalRating,
      ratings: product.ratings,
    }
  );
};
