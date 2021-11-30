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

  static async getAll(entity: categoryMongo | categoryPg = {}, keys?: string) {
    return this.entity.getAll(entity, keys);
  }

  static async getById(id: string, keys?: string) {
    return this.entity.getById(id, keys);
  }

  static async getOne(dto: categoryMongo | categoryPg, keys?: string) {
    return this.entity.getOne(dto, keys);
  }

  static async create(query: categoryMongo | categoryPg) {
    return this.entity.create(query);
  }

  static async update(query: categoryMongo | categoryPg, dto: categoryMongo | categoryPg) {
    return this.entity.update(query, dto);
  }

  static async updateProducts(query: categoryPg, dto: categoryPg) {
    switch (process.env.DB) {
      case 'pg':
        return this.entity.updateProducts(query, dto)
    }
  }

  static async delete(query: categoryMongo | categoryPg) {
    return this.entity.delete(query);
  }
}
