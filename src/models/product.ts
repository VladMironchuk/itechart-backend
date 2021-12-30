import { prop, getModelForClass, Ref, modelOptions, Severity } from '@typegoose/typegoose';
import { Category } from './category';
import { mongoProductRatings } from '../dto/product/product-ratings-mongo.dto';

@modelOptions({
  options: {
    allowMixed: Severity.ALLOW
  },
})
export class Product {
  @prop({ required: true, type: () => String })
  public displayName: string;

  @prop({ required: true, type: () => Number })
  public totalRating: number;

  @prop({ required: true, type: () => Number })
  public price: number;

  @prop({ ref: () => Category })
  public categories: Ref<Category>[];

  @prop({ type: () => Object })
  public ratings: mongoProductRatings[];
}

export default getModelForClass(Product, {
  schemaOptions: {
    timestamps: true,
  },
});
