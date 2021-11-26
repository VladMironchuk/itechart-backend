import { ProductTypeOrmRepository } from './ProductTypeOrmRepository';
import { ProductMongoRepository } from './ProductMongoRepository';
import { productPg } from '../../dto/product-pg.dto';
import { productMongo } from '../../dto/product-mongo.dto';
import { mappedQueryMongo } from '../../utils/queries/mongo-product-query';
import { pgProductQuery } from '../../utils/queries/pg-product-query';
import { Product } from '../../entity/product';
import {Product as ProductMongo } from '../../models/product'

export class ProductRepository{
  private static entity?: ProductTypeOrmRepository | ProductMongoRepository;

  static init() {
    switch (process.env.DB) {
      case 'pg':
        this.entity = new ProductTypeOrmRepository();
        break;
      case 'mongo':
        this.entity = new ProductMongoRepository();
        break;
    }
  }

  static async getProducts(
    entity: productPg & productMongo = {},
    keys?: string,
    populate?: boolean,
    skip?: number,
    limit?: number
  ): Promise<productPg[] | ProductMongo[] | productMongo[]> {
    return this.entity.getProducts(entity, keys, populate, skip, limit);
  }

  static async getProductsByQuery(
    entity: mappedQueryMongo & pgProductQuery,
    keys?: string,
    populate?: boolean,
    skip?: number,
    limit?: number
  ): Promise<Product[] | ProductMongo[]>  {
    return this.entity.getProductsByQuery(entity, keys, populate, skip, limit);
  }

  static async getProductById(id: string, keys?: string): Promise<Product | ProductMongo | productMongo>  {
    return this.entity.getProductById(id, keys);
  }

  static async getProduct(entity: productPg & productMongo, keys?: string): Promise<Product | ProductMongo>  {
    return this.entity.getProduct(entity, keys);
  }

  static async createProduct(entity: productPg & productMongo) {
    return this.entity.createProduct(entity);
  }

  static async updateProduct(entity: productPg & productMongo, dto: productPg & productMongo) {
    return this.entity.updateProduct(entity, dto);
  }

  static async updateProductCategories(entity: productPg & productMongo, dto: productPg & productMongo) {
    return this.entity.updateProductCategories(entity, dto);
  }

  static async deleteProduct(entity: productPg & productMongo) {
    return this.entity.deleteProduct(entity);
  }
}
