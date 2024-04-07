import { Body, Controller, Post } from '@nestjs/common';
import { ApiTags } from '@nestjs/swagger';

import { CategoryService } from './category.service';
import { CreateCategoryDTO } from './category.dto';

@ApiTags('Category')
@Controller({ path: '/category' })
export class CategoryController {
  constructor(private categoryService: CategoryService) {}

  @Post('/create-category')
  async createCategory(@Body() body: CreateCategoryDTO) {
    return await this.categoryService.addCategory(body);
  }
}
