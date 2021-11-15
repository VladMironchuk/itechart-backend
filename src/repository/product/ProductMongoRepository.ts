import MongoProduct from '../../models/product';
import { productMongo } from '../../dto/product-mongo.dto';
import { mappedQueryMongo } from '../../utils/mongo-product-query';
import { InvalidDataError } from '../../utils/errors/invalidDataError';

const MONGO_DEFAULT_KEYS = '_id displayName totalRating price createdAt';

export class ProductMongoRepository {
  getProducts(
    query: productMongo,
    keys: string = MONGO_DEFAULT_KEYS,
    populate: boolean = true,
    skip: number = 0,
    limit: number = 0
  ) {
    return populate
      ? MongoProduct.find({ ...query }, keys)
          .populate('categories', 'id displayName')
          .skip(skip)
          .limit(limit)
      : MongoProduct.find({ ...query }, keys)
          .skip(skip)
          .limit(limit);
  }

  getProductsByQuery(
    query: mappedQueryMongo,
    keys: string = MONGO_DEFAULT_KEYS,
    populate: boolean = true,
    skip: number = 0,
    limit: number = 0
  ) {
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

  getProductById(id: string, keys: string = MONGO_DEFAULT_KEYS) {
    return MongoProduct.findOne({ id }, keys).populate('categories', 'id displayName');
  }

  getProduct(query: productMongo, keys: string = MONGO_DEFAULT_KEYS) {
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
