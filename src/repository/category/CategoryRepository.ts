import { CategoryTypeOrmRepository } from './CategoryTypeOrmRepository';
import { CategoryMongoRepository } from './CategoryMongoRepository';
import { categoryMongo } from '../../dto/category-mongo.dto';
import { categoryPg } from '../../dto/category-pg.dto';

export class CategoryRepository {

  private readonly entity?: CategoryTypeOrmRepository | CategoryMongoRepository;

  constructor() {
    switch (process.env.DB) {
      case 'pg':
        this.entity = new CategoryTypeOrmRepository();
        break;
      case 'mongo':
        this.entity = new CategoryMongoRepository();
        break;
    }
  }

  async getCategories(entity: categoryMongo | categoryPg = {}, keys?: string, limit?: number, skip?: number) {
    return this.entity.getCategories(entity, keys);
  }

  async getCategoryById(id: string, keys?: string) {
    return this.entity.getCategoryById(id);
  }

  async getCategory(dto: categoryMongo | categoryPg, keys?: string) {
    return this.entity.getCategory(dto);
  }

  async createCategory(query: categoryMongo | categoryPg) {
    return this.entity.createCategory(query);
  }

  async updateCategory(query: categoryMongo | categoryPg, dto: categoryMongo | categoryPg) {
    return this.entity.updateCategory(query, dto);
  }

  async updateCategoryProducts(query: categoryPg, dto: categoryPg) {
    switch (process.env.DB) {
      case 'pg':
        return this.entity.updateCategoryProducts(query, dto)
    }
  }

  async deleteCategory(query: categoryMongo | categoryPg) {
    return this.entity.deleteCategory(query);
  }
}
