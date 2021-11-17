import MongoCategory from '../../models/category';
import { categoryMongo } from '../../dto/category-mongo.dto';

const DEFAULT_MONGO_KEYS = 'id displayName createdAt'

export class CategoryMongoRepository {
  getCategories(entity: categoryMongo, keys: string = DEFAULT_MONGO_KEYS) {
    return MongoCategory.find({...entity}, keys);
  }

  getCategoryById(id: string, keys: string = DEFAULT_MONGO_KEYS) {
    return MongoCategory.findOne({ _id: id }, keys);
  }

  getCategory(dto: categoryMongo, keys: string = DEFAULT_MONGO_KEYS) {
    return MongoCategory.findOne({ ...dto }, keys);
  }

  async updateCategory(query: categoryMongo, dto: categoryMongo) {
    await MongoCategory.updateOne({ ...query }, { ...dto });
  }

  async updateCategoryProducts() {}

  async createCategory(dto: categoryMongo) {
    const category = new MongoCategory(dto);
    await category.save();
  }

  async deleteCategory(query: categoryMongo) {
    await MongoCategory.deleteOne({ ...query });
  }
}
