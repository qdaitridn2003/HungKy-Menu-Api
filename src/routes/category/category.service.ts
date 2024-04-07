import { Injectable } from '@nestjs/common';
import { InjectModel } from '@nestjs/mongoose';
import { Model } from 'mongoose';

import { Category } from '../../models';
import { CreateCategoryParam } from '../../types';

@Injectable({})
export class CategoryService {
  constructor(
    @InjectModel(Category.name) private categoryModel: Model<Category>,
  ) {}

  async addCategory(param: CreateCategoryParam) {
    try {
      const createdCategory = await this.categoryModel.create({ ...param });
      return { category: createdCategory };
    } catch (error) {
      return error;
    }
  }
}
