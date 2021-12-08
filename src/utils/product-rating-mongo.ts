import { productMongo } from '../dto/product-mongo.dto';
import { ProductRepository } from '../repository/product/ProductRepository';

export const updateProductRatingMongo = async (
  product: productMongo,
  userId: string,
  rating: number,
  comment: string
): Promise<void> => {
  const users = product.ratings.map((rating) => rating.userId);
  if (users.includes(userId)) {
    product.ratings[users.indexOf(userId)].rating = rating;
    product.ratings[users.indexOf(userId)].comment = comment ?? product.ratings[users.indexOf(userId)].comment;
    product.ratings[users.indexOf(userId)].createdAt = new Date();
  } else {
    product.ratings.push({
      userId,
      rating,
      comment,
      createdAt: new Date()
    });
  }

  const totalRating = +(
    (product.totalRating * (product.ratings.length - 1) + rating) /
    product.ratings.length
  ).toPrecision(2);

  await ProductRepository.update(
    { displayName: product.displayName },
    {
      totalRating,
      ratings: product.ratings,
    }
  );
};
