import { prop, getModelForClass, Ref } from '@typegoose/typegoose';
import { Product } from './product';

export class User {
  @prop({required: true, type: () => String})
  public username: string

  @prop({required: true, type: () => String})
  public password: string

  @prop({required: true, ref: () => Product})
  public products: Ref<Product>[]
}

export default getModelForClass(User, {
  schemaOptions: {
    timestamps: true,
  }
})

