import { productMongo } from '../dto/product/product-mongo.dto';
import { ProductRepository } from '../repository/product/ProductRepository';

export const updateProductRatingMongo = async (
  product: productMongo,
  userId: string,
  rating: number,
  comment: string
) => {
  const users = product.ratings.map((rating) => rating.userId);

  let totalRating: number

  if (users.includes(userId)) {
    totalRating = +(
      (product.totalRating * product.ratings.length - (product.ratings[users.indexOf(userId)].rating - rating)) /
      product.ratings.length
    ).toPrecision(2);

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

    totalRating = +(
      (product.totalRating * (product.ratings.length - 1) + rating) /
      product.ratings.length
    ).toPrecision(2);
  }

  await ProductRepository.update(
    { displayName: product.displayName },
    {
      totalRating,
      ratings: product.ratings,
    }
  );
};
