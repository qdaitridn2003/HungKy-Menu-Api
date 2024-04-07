import { Module } from '@nestjs/common';
import { MongooseModule } from '@nestjs/mongoose';

import { Food, FoodSchema } from '../../models';
import { FoodController } from './food.controller';
import { FoodService } from './food.service';

@Module({
  imports: [
    MongooseModule.forFeature([{ schema: FoodSchema, name: Food.name }]),
  ],
  controllers: [FoodController],
  providers: [FoodService],
})
export class FoodModule {}
