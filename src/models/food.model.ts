import { Prop, Schema, SchemaFactory, raw } from '@nestjs/mongoose';
import { HydratedDocument, Schema as MongooseSchema } from 'mongoose';

import { DetailFood } from '../types';
import { Ingredient } from './ingredient.model';
import { Category } from './category.model';

export type FoodDocument = HydratedDocument<Food>;

@Schema({ timestamps: true })
export class Food {
  @Prop()
  name: string;

  @Prop()
  description: string;

  @Prop()
  image: string;

  @Prop()
  isBestSeller: boolean;

  @Prop(
    raw([
      {
        size: { type: String },
        price: { type: Number },
        currency: { type: String, default: 'VND' },
      },
    ]),
  )
  details: DetailFood[];

  @Prop({
    type: MongooseSchema.Types.ObjectId,
    ref: Category.name,
  })
  category: Category;

  @Prop({
    type: [{ type: MongooseSchema.Types.ObjectId, ref: Ingredient.name }],
  })
  ingredients: Ingredient[];
}

export const FoodSchema = SchemaFactory.createForClass(Food);
