import { getModelForClass, modelOptions, prop, Ref, Severity } from '@typegoose/typegoose';
import { Product } from './product';
import { Types } from 'mongoose';

@modelOptions({
  options: {
    allowMixed: Severity.ALLOW
  },
})
export class OrderList {
  @prop()
  public products: {
    product: Ref<Product, Types.ObjectId>,
    quantity: number
  }[]
}

export default getModelForClass(OrderList, {
  schemaOptions: {
    timestamps: true,
  },
});
