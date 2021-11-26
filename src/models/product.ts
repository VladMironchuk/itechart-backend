import { prop, getModelForClass, Ref } from '@typegoose/typegoose';
import { Category } from './category';

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
  public ratings: {
    userId: string;
    rating: number;
    comment?: string;
  }[];
}

export default getModelForClass(Product, {
  schemaOptions: {
    timestamps: true,
  },
});
