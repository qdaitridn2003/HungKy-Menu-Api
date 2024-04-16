import { HttpException, HttpStatus, Injectable } from '@nestjs/common';
import { InjectModel } from '@nestjs/mongoose';
import { Model } from 'mongoose';

import { Topping } from '../../models';
import { CreateToppingParam } from '../../types';

@Injectable({})
export class ToppingService {
  constructor(
    @InjectModel(Topping.name) private toppingModel: Model<Topping>,
  ) {}

  async addTopping(param: CreateToppingParam) {
    try {
      const createdTopping = await this.toppingModel.create({
        name: param.name,
        description: param.description,
        price: param.price,
        currency: param.currency,
      });
      return { topping: createdTopping };
    } catch (error) {
      return error;
    }
  }

  async fetchDetailTopping(id: string) {
    try {
      const foundTopping = await this.toppingModel.findOne({ _id: id });
      if (!foundTopping) {
        throw new HttpException(
          'This topping is not exist',
          HttpStatus.NOT_FOUND,
        );
      }
      return { topping: foundTopping };
    } catch (error) {
      return error;
    }
  }

  async fetchListTopping(limit: number, page: number, name: string) {
    try {
      const offset = limit * (page - 1);
      const toppingQuery = this.toppingModel
        .find()
        .select({ _id: true, name: true, price: true, currency: true });

      if (name) {
        toppingQuery.and([{ name: { $regex: `.*${name}.*`, $options: 'i' } }]);
      }

      const totalTopping = await toppingQuery.clone().countDocuments();
      const listTopping = await toppingQuery.limit(limit).skip(offset).exec();

      return { listTopping, totalTopping };
    } catch (error) {
      return error;
    }
  }
}
