import {
  Body,
  Controller,
  Get,
  Param,
  ParseIntPipe,
  Post,
  Query,
} from '@nestjs/common';
import { ApiQuery, ApiTags } from '@nestjs/swagger';

import { ToppingService } from './topping.service';
import { CreateToppingDTO } from './topping.dto';

@ApiTags('Topping')
@Controller({ path: '/topping' })
export class ToppingController {
  constructor(private toppingService: ToppingService) {}

  @Post('/create-topping')
  async createTopping(@Body() body: CreateToppingDTO) {
    return await this.toppingService.addTopping(body);
  }

  @Get('/get-topping/:id')
  async getDetailTopping(@Param('id') id: string) {
    return await this.toppingService.fetchDetailTopping(id);
  }

  @Get('/get-topping')
  @ApiQuery({ type: 'number', example: '10', name: 'limit', required: false })
  @ApiQuery({ type: 'number', example: '1', name: 'page', required: false })
  @ApiQuery({
    type: 'string',
    example: 'example',
    name: 'name',
    required: false,
  })
  async getListTopping(
    @Query('limit', ParseIntPipe) limit: number,
    @Query('page', ParseIntPipe) page: number,
    @Query('name') name: string,
  ) {
    return await this.toppingService.fetchListTopping(limit, page, name);
  }
}
