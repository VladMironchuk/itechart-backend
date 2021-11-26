import MongoProduct from '../../models/product';
import { productMongo } from '../../dto/product-mongo.dto';
import { mappedQueryMongo } from '../../utils/queries/mongo-product-query';
import { Product } from '../../models/product';
import { IProductRepository } from './IProductRepository';

const MONGO_DEFAULT_KEYS = '_id displayName totalRating ratings price createdAt';

export class ProductMongoRepository implements IProductRepository<Product, string, productMongo>{
  async getProducts(
    query: productMongo,
    keys: string = MONGO_DEFAULT_KEYS,
    populate: boolean = true,
    skip: number = 0,
    limit: number = 0
  ): Promise<Product[]> {
    return populate
      ? MongoProduct.find({ ...query }, keys)
          .populate('categories', 'id displayName')
          .skip(skip)
          .limit(limit)
      : MongoProduct.find({ ...query }, keys)
          .skip(skip)
          .limit(limit);
  }

  async getProductsByQuery(
    query: mappedQueryMongo,
    keys: string = MONGO_DEFAULT_KEYS,
    populate: boolean = true,
    skip: number = 0,
    limit: number = 0
  ): Promise<Product[]> {
    return populate
      ? MongoProduct.find({ ...query.query }, keys)
          .sort({ ...query.sortBy })
          .populate('categories', 'id displayName')
          .skip(skip)
          .limit(limit)
      : MongoProduct.find({ ...query.query }, keys)
          .sort({ ...query.sortBy })
          .skip(skip)
          .limit(limit);
  }

  async getProductById(id: string, keys: string = MONGO_DEFAULT_KEYS): Promise<Product> {
    return MongoProduct.findOne({ id }, keys).populate('categories', 'id displayName');
  }

  async getProduct(query: productMongo, keys: string = MONGO_DEFAULT_KEYS): Promise<Product> {
    return MongoProduct.findOne({ ...query }, keys).populate('categories', 'id displayName');
  }

  async updateProduct(query: productMongo, dto: productMongo) {
    const product = await MongoProduct.findOne({ ...query });
    await product.updateOne({ ...(dto as typeof MongoProduct) });
  }

  async createProduct(dto: productMongo) {
    const product = new MongoProduct({ ...dto });
    await product.save();
  }

  updateProductCategories(query: productMongo, dto: productMongo) {}

  async deleteProduct(query: productMongo) {
    await MongoProduct.remove({ ...query });
  }
}
