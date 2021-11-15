import { prop, getModelForClass } from '@typegoose/typegoose';

export class Category {
  @prop({ required: true, type: () => String })
  public displayName!: string;

  @prop({type: () => Date})
  public createdAt?: Date
}

export default getModelForClass(Category, {
  schemaOptions: {
    timestamps: true,
  },
});
