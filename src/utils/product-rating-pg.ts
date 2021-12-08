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
  const usersRatings = await userRatingRepo.getUserRating(userId);

  const productsId = usersRatings.map((userRating) => userRating.product['id']);
  let totalRating: number;

  if (productsId.includes(product.id)) {
    const curProduct = usersRatings[productsId.indexOf(product.id)];
    await userRatingRepo.updateUserRating(userId, product.id, rating, comment ?? curProduct.comment);
    totalRating = +((curProduct.rating * usersRatings.length - (curProduct.rating - rating)) / usersRatings.length).toPrecision(2);
  } else {
    await userRatingRepo.addUserRating(userId, product.id, rating, comment);
    totalRating = +((product.totalRating * usersRatings.length + rating) / (usersRatings.length + 1)).toPrecision(2);
  }
  await ProductRepository.update({ displayName: product.displayName }, { totalRating });
};
