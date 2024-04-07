import { Module } from '@nestjs/common';
import { ConfigModule } from '@nestjs/config';
import { MongooseModule } from '@nestjs/mongoose';

import { CategoryModule, FoodModule, IngredientModule } from './routes';

@Module({
  imports: [
    ConfigModule.forRoot({ isGlobal: true }),
    MongooseModule.forRoot(
      'mongodb+srv://noreplyteamcook:bGiWILmAmDTi0WoH@hungkymenucluster.9de1hpt.mongodb.net/hungky_menu_database',
    ),
    CategoryModule,
    FoodModule,
    IngredientModule,
  ],
  controllers: [],
  providers: [],
})
export class AppModule {}
