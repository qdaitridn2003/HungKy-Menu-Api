import { HttpException, HttpStatus, Injectable } from '@nestjs/common';
import { InjectModel } from '@nestjs/mongoose';
import { Model } from 'mongoose';

import { Food } from '../../models';
import { CreateFoodParam } from '../../types';

@Injectable({})
export class FoodService {
  constructor(@InjectModel(Food.name) private foodModel: Model<Food>) {}

  async addFood(param: CreateFoodParam) {
    try {
      const createdFood = await this.foodModel.create({
        name: param.name,
        description: param.description,
        image: param.image,
        details: param.details,
        category: param.category,
        ingredients: param.ingredients,
      });

      return {
        food: createdFood,
      };
    } catch (error) {
      return error;
    }
  }

  async fetchListFood(limit: number = 10, page: number = 1, name: string) {
    try {
      const offset = limit * (page - 1);
      const foodQuery = this.foodModel
        .find()
        .select({
          _id: true,
          name: true,
          image: true,
          description: true,
          isBestSeller: true,
        })
        .populate({
          path: 'category',
          select: { _id: true, name: true, description: true },
        });

      if (name) {
        foodQuery.and([{ name: { $regex: `.*${name}.*`, $options: 'i' } }]);
      }

      const totalFood = await foodQuery.clone().countDocuments();
      const listFood = await foodQuery.limit(limit).skip(offset).exec();

      return { listFood, totalFood };
    } catch (error) {
      return error;
    }
  }

  async fetchDetailFood(id: string) {
    try {
      const foundFood = await this.foodModel
        .findOne({ _id: id })
        .populate({
          path: 'ingredients',
          select: { _id: true, name: true, image: true, description: true },
        })
        .populate({
          path: 'category',
          select: { _id: true, name: true, description: true },
        });

      if (!foundFood) {
        throw new HttpException('This food is not exist', HttpStatus.NOT_FOUND);
      }

      return { food: foundFood };
    } catch (error) {
      return error;
    }
  }
}
