import { Repository } from 'typeorm';
import { Product } from '../../entity/product';
import { IProductRepository } from './IProductRepository';
import { productPg } from '../../dto/product-pg.dto';
import { ConnectionController } from '../../connection/connection';
import { pgProductQuery } from '../../utils/queries/pg-product-query';
import { CategoryRepository } from '../category/CategoryRepository';
import { Category } from '../../entity/category';

export class ProductTypeOrmRepository implements IProductRepository<Product, string, productPg> {
  private repository: Repository<Product>;

  constructor() {
    this.repository = ConnectionController.getConnection().getRepository(Product);
  }

  async getAll(dto: productPg) {
    return await this.repository.find({ ...dto, relations: ['categories'] });
  }

  async getByQuery(query: pgProductQuery) {
    let qb = this.repository.createQueryBuilder('product')
      .leftJoinAndSelect('product.categories', 'category')
      .leftJoinAndSelect('product.ratings', 'rating')


    qb = qb
      .where('product.price >= :gt')
      .andWhere('product.totalRating >= :minRating')
      .setParameters({
        gt: query.query.price.$gte,
        minRating: query.query.totalRating,
      });

    if(query.query.price.$lte) {
    qb = qb.andWhere('product.price <= :lt')
      .setParameter('lt', query.query.price.$lte)
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

  async getById(id: string) {
    return await this.repository.findOne({ id }, { relations: ['categories'] });
  }

  async getOne(dto: productPg) {
    return await this.repository.findOne({ ...dto }, { relations: ['categories'] });
  }

  async updateCategories(query: productPg, dto: productPg) {
    const product = await this.repository.findOne({ ...query }, { relations: ['categories'] });
    product.categories.push(...dto.categories);
    await ConnectionController.getConnection().manager.save(product);
  }

  async update(query: productPg, dto: productPg) {
    await this.repository.update({ ...query }, { ...dto });
  }

  async delete(query: productPg) {
    await this.repository.delete({ ...query });
  }

  async create(query: productPg) {
    const { displayName, price, totalRating, categories = [] as string[] } = query;
    const mappedCategories = await Promise.all(categories.map(item => CategoryRepository.getById(item))) as Category[]

    const newProduct = new Product();
    newProduct.displayName = displayName;
    newProduct.price = price;
    newProduct.totalRating = totalRating;
    newProduct.categories = mappedCategories
    newProduct.createdAt = new Date();

    mappedCategories.forEach(item => {
      item.products.push(newProduct)
    })

    await this.repository.save(newProduct);
    await this.repository.manager.save(mappedCategories)
  }
}
