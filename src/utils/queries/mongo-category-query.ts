import { ProductRepository } from '../../repository/product/ProductRepository';
import { CategoryRepository } from '../../repository/category/CategoryRepository';
import { Category } from '../../entity/category';
import { categoryMongo } from '../../dto/category-mongo.dto';

export default async function (reqQuery, id): Promise<categoryMongo> {
  const category = await CategoryRepository.getCategoryById(id);

  let mappedCategory = {
    ...category['_doc'],
  }

  if (reqQuery['includeProducts'] === 'true') {
    const products = await ProductRepository.getProducts(
      { categories: category as Category[] & Category },
      'displayName totalRating price', true
    );
    if (reqQuery['includeTop3Products'] === 'top') {
      products
        .slice(0, 3)
        .sort((firstProduct, secondProduct) => secondProduct.totalRating - firstProduct.totalRating);
    }
    mappedCategory = {
      ...mappedCategory,
      products
    }
  }
  return mappedCategory
}
