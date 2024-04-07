import { Body, Controller, Post } from '@nestjs/common';
import { ApiTags } from '@nestjs/swagger';

import { IngredientService } from './ingredient.service';
import { CreateIngredientDTO } from './ingredient.dto';

@ApiTags('Ingredient')
@Controller({ path: '/ingredient' })
export class IngredientController {
  constructor(private ingredientService: IngredientService) {}

  @Post('create-ingredient')
  async createIngredient(@Body() body: CreateIngredientDTO) {
    return await this.ingredientService.addIngredient(body);
  }
}
