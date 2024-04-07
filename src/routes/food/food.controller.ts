import {
  Body,
  Controller,
  Get,
  Param,
  ParseIntPipe,
  Post,
  Query,
} from '@nestjs/common';

import { FoodService } from './food.service';
import { ApiParam, ApiQuery, ApiTags } from '@nestjs/swagger';
import { CreateFoodDTO } from './food.dto';

@ApiTags('Food')
@Controller({ path: 'food' })
export class FoodController {
  constructor(private foodService: FoodService) {}

  @Post('/create-food')
  async createFood(@Body() body: CreateFoodDTO) {
    console.log('Create Food Body:', body);
    return await this.foodService.addFood(body);
  }

  @Get('/get-food')
  @ApiQuery({ type: 'number', example: '10', name: 'limit', required: false })
  @ApiQuery({ type: 'number', example: '1', name: 'page', required: false })
  @ApiQuery({
    type: 'string',
    example: 'example',
    name: 'name',
    required: false,
  })
  async getAllFood(
    @Query('limit', ParseIntPipe) limit: number,
    @Query('page', ParseIntPipe) page: number,
    @Query('name') name: string,
  ) {
    return await this.foodService.fetchListFood(limit, page, name);
  }

  @Get('/get-food/:id')
  @ApiParam({ type: 'string', example: '', name: 'id', required: true })
  async getDetailFood(@Param('id') id: string) {
    return await this.foodService.fetchDetailFood(id);
  }
}
