import { Module } from '@nestjs/common';
import { ConfigModule } from '@nestjs/config';
import { MongooseModule } from '@nestjs/mongoose';

import { CategoryModule, FoodModule, IngredientModule } from './routes';

@Module({
  imports: [
    ConfigModule.forRoot({ isGlobal: true }),
    MongooseModule.forRoot(process.env.MONGODB_URL),
    CategoryModule,
    FoodModule,
    IngredientModule,
  ],
  controllers: [],
  providers: [],
})
export class AppModule {}
