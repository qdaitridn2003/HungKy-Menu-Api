import { Prop, Schema, SchemaFactory } from '@nestjs/mongoose';
import { HydratedDocument } from 'mongoose';

export type ToppingDocument = HydratedDocument<Topping>;

@Schema({ timestamps: true })
export class Topping {
  @Prop()
  name: string;

  @Prop()
  description: string;

  @Prop()
  price: number;

  @Prop()
  currency: string;
}

export const ToppingSchema = SchemaFactory.createForClass(Topping);
