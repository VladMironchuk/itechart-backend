import ICategoryRepository from './ICategoryRepository';
import { Category } from '../../entity/category';
import { Repository } from 'typeorm';
import { categoryPg } from '../../dto/category/category-pg.dto';
import { ConnectionController } from '../../connection/connection';

export class CategoryTypeOrmRepository implements ICategoryRepository<string, categoryPg> {
  private repository: Repository<Category>;

  constructor() {
    this.repository = ConnectionController.getConnection().getRepository(Category);
  }

  async getAll() {
    return await this.repository.find({ relations: ['products'] });
  }

  async getById(id: string) {
    return await this.repository.findOne({ id }, { relations: ['products'] });
  }

  async getOne(dto: categoryPg, keys?: string) {
    return await this.repository.findOne({ ...dto }, { relations: ['products'] });
  }

  async update(query: categoryPg, dto: categoryPg) {
    await this.repository.update({ ...query }, { ...dto });
  }

  async updateProducts(query: categoryPg, dto: categoryPg) {
    const category = await this.repository.findOne({ ...query }, { relations: ['products'] });
    category.products.push(...dto.products);
    await ConnectionController.getConnection().manager.save(category);
  }

  async delete(query: categoryPg) {
    await this.repository.delete({ ...query });
  }

  async create(query: categoryPg) {
    const { displayName, products = [] } = query;
    const newCategory = new Category();
    newCategory.displayName = displayName;
    newCategory.products = products;
    newCategory.createdAt = new Date();
    await this.repository.save(newCategory);
  }
}
