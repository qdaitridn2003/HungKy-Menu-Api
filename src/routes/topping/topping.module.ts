import { Module } from '@nestjs/common';
import { MongooseModule } from '@nestjs/mongoose';

import { ToppingController } from './topping.controller';
import { Topping, ToppingSchema } from '../../models';
import { ToppingService } from './topping.service';

@Module({
  imports: [
    MongooseModule.forFeature([{ schema: ToppingSchema, name: Topping.name }]),
  ],
  controllers: [ToppingController],
  providers: [ToppingService],
})
export class ToppingModule {}
