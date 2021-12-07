import { prop, getModelForClass, Ref } from '@typegoose/typegoose';
import { OrderList } from './order-list';
import { UserRoles } from '../dto/user-roles';

export class User {
  @prop({ required: true, type: () => String })
  public username: string;

  @prop({ required: true, type: () => String })
  public password: string;

  @prop()
  public role: UserRoles

  @prop({ type: () => String })
  public firstName: string;

  @prop({ type: () => String })
  public lastName: string;

  @prop({ref: () => OrderList})
  public orderList: Ref<OrderList>
}

export default getModelForClass(User, {
  schemaOptions: {
    timestamps: true,
  },
});
