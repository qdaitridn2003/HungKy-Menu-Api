import { Module } from '@nestjs/common';
import { MongooseModule } from '@nestjs/mongoose';

import { Ingredient, IngredientSchema } from '../../models';
import { IngredientController } from './ingredient.controller';
import { IngredientService } from './ingredient.service';

@Module({
  imports: [
    MongooseModule.forFeature([
      { schema: IngredientSchema, name: Ingredient.name },
    ]),
  ],
  controllers: [IngredientController],
  providers: [IngredientService],
})
export class IngredientModule {}
