import { productPg } from '../dto/product-pg.dto';
import { UserRatingsTypeOrmRepository } from '../repository/user-ratings/UserRatingsTypeOrmRepository';
import { ProductRepository } from '../repository/product/ProductRepository';

export const updateProductRatingPg = async (
  product: productPg,
  userId: string,
  rating: number,
  comment: string
): Promise<void> => {
  const userRatingRepo = new UserRatingsTypeOrmRepository();
  const users = await userRatingRepo.getUserRatings();

  const usersId = users.map((user) => user.userId);

  if (usersId.includes(userId)) {
    await userRatingRepo.updateUserRating(userId, rating, comment ?? users[usersId.indexOf(userId)].comment);
  } else {
    await userRatingRepo.addUserRating(userId, rating, comment);
  }

  const totalRating = +((product.totalRating * users.length + rating) / (users.length + 1)).toPrecision(2)

  await ProductRepository.updateProduct(
    { displayName: product.displayName },
    { totalRating }
  );
};
