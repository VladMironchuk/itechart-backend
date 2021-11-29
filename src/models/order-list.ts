import { getModelForClass, prop, Ref } from '@typegoose/typegoose';
import { User } from './user';

export class OrderList {
  @prop({ required: true, ref: () => User })
  public userId: Ref<User>;

  @prop({ type: () => Object })
  public products: {
    product: string;
    quantity: number;
  }[];
}

export default getModelForClass(OrderList, {
  schemaOptions: {
    timestamps: true,
  },
});
