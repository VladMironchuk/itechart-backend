import { ProductTypeOrmRepository } from './ProductTypeOrmRepository';
import { ProductMongoRepository } from './ProductMongoRepository';
import { productPg } from '../../dto/product-pg.dto';
import { productMongo } from '../../dto/product-mongo.dto';
import { mappedQueryMongo } from '../../utils/queries/mongo-product-query';
import { pgProductQuery } from '../../utils/queries/pg-product-query';
import { Product } from '../../entity/product';
import { Product as ProductMongo } from '../../models/product';
import { updateProductRatingMongo } from '../../utils/product-rating-mongo';
import { updateProductRatingPg } from '../../utils/product-rating-pg';

export class ProductRepository {
  private static entity?: ProductTypeOrmRepository | ProductMongoRepository;
  private static dbType: string

  static init() {
    switch (process.env.DB) {
      case 'pg':
        this.entity = new ProductTypeOrmRepository();
        this.dbType = 'pg'
        break;
      case 'mongo':
        this.entity = new ProductMongoRepository();
        this.dbType = 'mongo'
        break;
    }
  }

  static async getAll(
    entity: productPg & productMongo = {},
    keys?: string,
    populate?: boolean,
    skip?: number,
    limit?: number
  ): Promise<productPg[] | ProductMongo[] | productMongo[]> {
    return this.entity.getAll(entity, keys, populate, skip, limit);
  }

  static async getByQuery(
    entity: mappedQueryMongo & pgProductQuery,
    keys?: string,
    populate?: boolean,
    skip?: number,
    limit?: number
  ): Promise<Product[] | ProductMongo[]> {
    return this.entity.getByQuery(entity, keys, populate, skip, limit);
  }

  static async getById(id: string, keys?: string): Promise<Product | productMongo> {
    return this.entity.getById(id, keys);
  }

  static async getOne(entity: productPg & productMongo, keys?: string): Promise<Product | ProductMongo> {
    return this.entity.getOne(entity, keys);
  }

  static async create(entity: productPg & productMongo) {
    return this.entity.create(entity);
  }

  static async update(entity: productPg & productMongo, dto: productPg & productMongo) {
    return this.entity.update(entity, dto);
  }

  static async updateCategories(entity: productPg & productMongo, dto: productPg & productMongo) {
    return this.entity.updateCategories(entity, dto);
  }

  static async delete(entity: productPg & productMongo) {
    return this.entity.delete(entity);
  }

  static async addRating(id: string, userId: string,rating: number, comment?: string) {
    const product = await this.getById(id)
    switch (this.dbType) {
      case 'mongo':
        await updateProductRatingMongo(product as productMongo, userId, +rating, comment);
        break;
      case 'pg':
        await updateProductRatingPg(product as productPg, userId, +rating, comment);
    }
  }
}
