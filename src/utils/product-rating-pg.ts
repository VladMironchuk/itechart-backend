import { productPg } from '../dto/product/product-pg.dto';
import { UserRatingsTypeOrmRepository } from '../repository/user-ratings/UserRatingsTypeOrmRepository';
import { ProductRepository } from '../repository/product/ProductRepository';

export const updateProductRatingPg = async (
  product: productPg,
  userId: string,
  rating: number,
  comment: string
) => {
  const userRatingRepo = new UserRatingsTypeOrmRepository();
  const usersRatings = await userRatingRepo.getUserRating(product.id);

  const userIds = usersRatings.map((userRating) => userRating.userId);

  let totalRating: number;

  if (userIds.includes(userId)) {
    const curProduct = usersRatings[userIds.indexOf(userId)];

    totalRating = +(
      (product.totalRating * usersRatings.length - (curProduct.rating - rating)) /
      usersRatings.length
    ).toPrecision(2);

    await userRatingRepo.updateUserRating(userId, product.id, rating, comment ?? curProduct.comment);
  } else {
    await userRatingRepo.addUserRating(userId, product.id, rating, comment);
    totalRating = +((product.totalRating * usersRatings.length + rating) / (usersRatings.length + 1)).toPrecision(2);
  }
  await ProductRepository.update({ displayName: product.displayName }, { totalRating });
};
