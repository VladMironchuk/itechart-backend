import { ConnectionController } from '../connection/connection';
import { Category } from '../entity/category';

export default async function (reqQuery, id): Promise<Category> {
  let qb = ConnectionController.getConnection().getRepository(Category).createQueryBuilder('category');

  if (reqQuery['includeProducts']) {
    qb = qb.innerJoinAndSelect('category.products', 'product');
  }

  qb = qb.where(`category.id = :id`).setParameter('id', id);

  if (reqQuery['includeTop3Products']) {
    qb = qb.orderBy('product.totalRating', 'DESC').limit(3);
  }

  return await qb.getOne();
}
