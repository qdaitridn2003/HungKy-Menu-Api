import { Injectable } from '@nestjs/common';
import { InjectModel } from '@nestjs/mongoose';
import { Model } from 'mongoose';

import { Ingredient } from '../../models';
import { CreatedIngredientParam } from '../../types';

@Injectable({})
export class IngredientService {
  constructor(
    @InjectModel(Ingredient.name) private ingredientModel: Model<Ingredient>,
  ) {}

  async addIngredient(param: CreatedIngredientParam) {
    const createdIngredient = await this.ingredientModel.create({ ...param });
    return { ingredient: createdIngredient };
  }
}
