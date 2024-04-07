import { ApiProperty } from '@nestjs/swagger';

export class DetailFood {
  @ApiProperty()
  currency: string;

  @ApiProperty()
  price: number;

  @ApiProperty()
  size: string;
}

export type CreateFoodParam = {
  name: string;
  description: string;
  image: string;
  details: DetailFood[];
  category: string;
  ingredients: string[];
};
