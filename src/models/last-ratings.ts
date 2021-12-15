import { getModelForClass, prop, Ref } from '@typegoose/typegoose';
import { Product } from './product';
import { User } from './user';

export class LastRatings {
  @prop({ ref: () => Product })
  product: Ref<Product>;

  @prop({ ref: () => User })
  user: Ref<User>;

  @prop({ type: () => Number })
  rating: number;

  @prop({ type: () => String })
  comment?: string;

  @prop({type: () => Date})
  createdAt: Date
}

export default getModelForClass(LastRatings, {
  schemaOptions: {
    timestamps: true,
  },
});