import { Repository } from 'typeorm';
import { Product } from '../../entity/product';
import { IProductRepository } from './IProductRepository';
import { productPg } from '../../dto/product-pg.dto';
import { ConnectionController } from '../../connection/connection';
import { pgProductQuery } from '../../utils/pg-product-query';

export class ProductTypeOrmRepository implements IProductRepository<Product, string, productPg> {
  private repository: Repository<Product>;

  constructor() {
    this.repository = ConnectionController.getConnection().getRepository(Product);
  }

  async getProducts(dto: productPg) {
    return await this.repository.find({ ...dto, relations: ['categories'] });
  }

  async getProductsByQuery(query: pgProductQuery) {
    let qb = this.repository.createQueryBuilder('product').leftJoinAndSelect('product.categories', 'category');
    qb = qb
      .where('product.price > :gt')
      .andWhere('product.totalRating > :minRating')
      .setParameters({
        gt: query.query.price.$gt,
        minRating: query.query.totalRating,
      });
    if(query.query.price.$lt) {
    qb = qb.andWhere('product.price < :lt')
      .setParameter('lt', query.query.price.$lt)
    }
    if (query.query.displayName) {
      qb = qb.andWhere('product.displayName like :name')
      .setParameter('name', `%${query.query.displayName}%`);
    }
    if (query.sortBy[1]) {
      qb.orderBy(`product.${query.sortBy[0]}`, `${query.sortBy[1]}`);
    }
    return await qb.getMany();
  }

  async getProductById(id: string) {
    return await this.repository.findOne({ id }, { relations: ['categories'] });
  }

  async getProduct(dto: productPg) {
    return await this.repository.findOne({ ...dto }, { relations: ['categories'] });
  }

  async updateProductCategories(query: productPg, dto: productPg) {
    const product = await this.repository.findOne({ ...query }, { relations: ['categories'] });
    product.categories.push(...dto.categories);
    await ConnectionController.getConnection().manager.save(product);
  }

  async updateProduct(query: productPg, dto: productPg) {
    await this.repository.update({ ...query }, { ...dto });
  }

  async deleteProduct(query: productPg) {
    await this.repository.delete({ ...query });
  }

  async createProduct(query: productPg) {
    const { displayName, price, totalRating, categories = [] } = query;
    const newProduct = new Product();
    newProduct.displayName = displayName;
    newProduct.price = price;
    newProduct.totalRating = totalRating;
    newProduct.categories = categories;
    newProduct.createdAt = new Date();
    await this.repository.save(newProduct);
  }
}
