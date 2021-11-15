import { ProductTypeOrmRepository } from './ProductTypeOrmRepository';
import { ProductMongoRepository } from './ProductMongoRepository';
import { productPg } from '../../dto/product-pg.dto';
import { productMongo } from '../../dto/product-mongo.dto';
import { mappedQueryMongo } from '../../utils/mongo-product-query';
import { pgProductQuery } from '../../utils/pg-product-query';

export class ProductRepository {
  private readonly entity?: ProductTypeOrmRepository | ProductMongoRepository;

  constructor() {
    switch (process.env.DB) {
      case 'pg':
        this.entity = new ProductTypeOrmRepository();
        break;
      case 'mongo':
        this.entity = new ProductMongoRepository();
        break;
    }
  }

  async getProducts(
    entity: productPg & productMongo = {},
    keys?: string,
    populate?: boolean,
    skip?: number,
    limit?: number
  ) {
    return this.entity.getProducts(entity, keys, populate, skip, limit);
  }

  async getProductsByQuery(
    entity: mappedQueryMongo & pgProductQuery,
    keys?: string,
    populate?: boolean,
    skip?: number,
    limit?: number
  ) {
    return this.entity.getProductsByQuery(entity, keys);
  }

  async getProductById(id: string, keys?: string) {
    return this.entity.getProductById(id, keys);
  }

  async getProduct(entity: productPg & productMongo, keys?: string) {
    return this.entity.getProduct(entity, keys);
  }

  async createProduct(entity: productPg & productMongo) {
    return this.entity.createProduct(entity);
  }

  async updateProduct(entity: productPg & productMongo, dto: productPg & productMongo) {
    return this.entity.updateProduct(entity, dto);
  }

  async updateProductCategories(entity: productPg & productMongo, dto: productPg & productMongo) {
    return this.entity.updateProductCategories(entity, dto);
  }

  async deleteProduct(entity: productPg & productMongo) {
    return this.entity.deleteProduct(entity);
  }
}
