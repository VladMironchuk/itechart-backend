import MongoCategory from '../../models/category';
import { categoryMongo } from '../../dto/category/category-mongo.dto';
import ICategoryRepository from './ICategoryRepository';

const DEFAULT_MONGO_KEYS = 'id displayName createdAt products'

export class CategoryMongoRepository implements ICategoryRepository<string, categoryMongo>{
  getAll(entity: categoryMongo, keys: string = DEFAULT_MONGO_KEYS) {
    return MongoCategory.find({...entity}, keys);
  }

  getById(id: string, keys: string = DEFAULT_MONGO_KEYS) {
    return MongoCategory.findOne({ _id: id }, keys);
  }

  getOne(dto: categoryMongo, keys: string = DEFAULT_MONGO_KEYS) {
    return MongoCategory.findOne({ ...dto }, keys);
  }

  async update(query: categoryMongo, dto: categoryMongo) {
    await MongoCategory.updateOne({ ...query, _id: query.id }, { ...dto });
  }

  async updateProducts() {}

  async create(dto: categoryMongo) {
    const category = new MongoCategory(dto);
    await category.save();
  }

  async delete(query: categoryMongo) {
    await MongoCategory.deleteOne({ ...query, _id: query.id });
  }
}
