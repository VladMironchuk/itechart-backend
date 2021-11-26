import { CategoryTypeOrmRepository } from './CategoryTypeOrmRepository';
import { CategoryMongoRepository } from './CategoryMongoRepository';
import { categoryMongo } from '../../dto/category-mongo.dto';
import { categoryPg } from '../../dto/category-pg.dto';

export class CategoryRepository {

  private static entity?: CategoryTypeOrmRepository | CategoryMongoRepository;

  static init() {
    switch (process.env.DB) {
      case 'pg':
        CategoryRepository.entity = new CategoryTypeOrmRepository();
        break;
      case 'mongo':
        CategoryRepository.entity = new CategoryMongoRepository();
        break;
    }
  }

  static async getCategories(entity: categoryMongo | categoryPg = {}, keys?: string) {
    return this.entity.getCategories(entity, keys);
  }

  static async getCategoryById(id: string, keys?: string) {
    return this.entity.getCategoryById(id, keys);
  }

  static async getCategory(dto: categoryMongo | categoryPg, keys?: string) {
    return this.entity.getCategory(dto, keys);
  }

  static async createCategory(query: categoryMongo | categoryPg) {
    return this.entity.createCategory(query);
  }

  static async updateCategory(query: categoryMongo | categoryPg, dto: categoryMongo | categoryPg) {
    return this.entity.updateCategory(query, dto);
  }

  static async updateCategoryProducts(query: categoryPg, dto: categoryPg) {
    switch (process.env.DB) {
      case 'pg':
        return this.entity.updateCategoryProducts(query, dto)
    }
  }

  static async deleteCategory(query: categoryMongo | categoryPg) {
    return this.entity.deleteCategory(query);
  }
}
