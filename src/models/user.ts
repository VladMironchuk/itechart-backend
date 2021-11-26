import { prop, getModelForClass } from '@typegoose/typegoose';

export class User {
  @prop({ required: true, type: () => String })
  public username: string;

  @prop({ required: true, type: () => String })
  public password: string;

  @prop({ type: () => String })
  public firstName: string;

  @prop({ type: () => String })
  public lastName: string;
}

export default getModelForClass(User, {
  schemaOptions: {
    timestamps: true,
  },
});
